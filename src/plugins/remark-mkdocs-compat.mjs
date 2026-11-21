import { visit } from 'unist-util-visit';

/**
 * Parse attr_list strings like `{.imgLightbox tag=1 loading=lazy}` or `{:target="_blank"}`
 * ONLY when attached directly after a Markdown image or link node.
 * Preserves inline dialogue/furigana braces such as `《漂泊的魔王{范格兰茨·赛恩}》`.
 */
function parseAttrList(raw) {
	const normalized = raw
		.replace(/[\u201C\u201D]/g, '"')
		.replace(/[\u2018\u2019]/g, "'");
	const classes = [];
	const attrs = {};
	const tokenRe = /([.:]?[A-Za-z0-9_-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s}]+)))?/g;
	let match;
	while ((match = tokenRe.exec(normalized)) !== null) {
		const keyToken = match[1];
		const val = match[2] ?? match[3] ?? match[4] ?? true;
		if (keyToken.startsWith('.')) {
			classes.push(keyToken.slice(1));
		} else {
			const cleanKey = keyToken.startsWith(':') ? keyToken.slice(1) : keyToken;
			attrs[cleanKey] = val;
		}
	}
	return { classes, attrs };
}

function applyAttrsToNode(child, parent, index, classes, attrs) {
	if (child.type === 'image' && classes.includes('authors')) {
		parent.children.splice(index, 1);
		return index - 1;
	}

	child.data ??= {};
	child.data.hProperties ??= {};
	const prevClasses = Array.isArray(child.data.hProperties.className)
		? child.data.hProperties.className
		: child.data.hProperties.className
			? [child.data.hProperties.className]
			: [];
	const mergedClasses = [...new Set([...prevClasses, ...classes])];
	if (mergedClasses.length > 0) {
		child.data.hProperties.className = mergedClasses;
	}

	if (child.type === 'image') {
		if (classes.includes('imgLightbox')) {
			child.data.hProperties.loading =
				typeof attrs.loading === 'string' ? attrs.loading : 'lazy';
			child.data.hProperties['data-gallery'] = `t${attrs.tag ?? '1'}`;
			if (typeof attrs.title === 'string') {
				child.data.hProperties.title = attrs.title;
			} else if (child.title) {
				child.data.hProperties.title = child.title;
			}
		}
	} else if (child.type === 'link') {
		if (attrs.target === '_blank') {
			child.data.hProperties.target = '_blank';
			child.data.hProperties.rel = 'noopener noreferrer';
		}
	}

	return index;
}

function prefixRootPath(url, basePrefix) {
	if (!basePrefix || typeof url !== 'string') return url;
	if (!url.startsWith('/') || url.startsWith('//')) return url;
	if (url === basePrefix || url.startsWith(`${basePrefix}/`)) return url;
	return `${basePrefix}${url}`;
}

export default function remarkMkdocsCompat(options = {}) {
	const rawBase = options.base || process.env.ASTRO_BASE || '/';
	const basePrefix = rawBase === '/' ? '' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

	return (tree) => {
		visit(tree, (node) => {
			if (!Array.isArray(node.children)) return;

			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (child.type !== 'image' && child.type !== 'link') continue;

				const next = node.children[i + 1];
				if (!next) continue;

				// Case A: single text node `{...}`
				if (next.type === 'text') {
					const attrMatch = next.value.match(/^\{([.:][^}\n]+)\}/);
					if (attrMatch) {
						const { classes, attrs } = parseAttrList(attrMatch[1]);
						const remainder = next.value.slice(attrMatch[0].length);
						if (remainder) {
							next.value = remainder;
						} else {
							node.children.splice(i + 1, 1);
						}
						i = applyAttrsToNode(child, node, i, classes, attrs);
						continue;
					}
				}

				// Case B: remark-directive splits `{:target="_blank"}` into `{` + textDirective(target) + `="_blank"}`
				if (
					next.type === 'text' &&
					next.value === '{' &&
					node.children[i + 2]?.type === 'textDirective'
				) {
					let rawInner = '';
					let remainder = '';
					let closedIndex = -1;
					const limit = Math.min(node.children.length - 1, i + 6);

					for (let k = i + 2; k <= limit; k++) {
						const part = node.children[k];
						if (part.type === 'textDirective') {
							rawInner += `:${part.name}`;
						} else if (part.type === 'text') {
							const closeIdx = part.value.indexOf('}');
							if (closeIdx !== -1) {
								if (part.value.slice(0, closeIdx).includes('\n')) break;
								rawInner += part.value.slice(0, closeIdx);
								remainder = part.value.slice(closeIdx + 1);
								closedIndex = k;
								break;
							}
							if (part.value.includes('\n')) break;
							rawInner += part.value;
						} else {
							break;
						}
					}

					if (closedIndex !== -1 && (rawInner.startsWith(':') || rawInner.startsWith('.'))) {
						const { classes, attrs } = parseAttrList(rawInner);
						const replacement = remainder ? [{ type: 'text', value: remainder }] : [];
						node.children.splice(i + 1, closedIndex - i, ...replacement);
						i = applyAttrsToNode(child, node, i, classes, attrs);
					}
				}
			}
		});

		visit(tree, 'text', (node) => {
			if (node.value.includes(':heavy_check_mark:') || node.value.includes(':o:')) {
				node.value = node.value
					.replaceAll(':heavy_check_mark:', '✔️')
					.replaceAll(':o:', '⭕');
			}
		});

		if (basePrefix) {
			visit(tree, (node) => {
				if (node.type === 'image' || node.type === 'link') {
					node.url = prefixRootPath(node.url, basePrefix);
				} else if (node.type === 'html' && typeof node.value === 'string') {
					node.value = node.value.replace(
						/(\b(?:src|href)\s*=\s*)(["'])(\/[^"']*)\2/gi,
						(_full, attr, quote, url) => `${attr}${quote}${prefixRootPath(url, basePrefix)}${quote}`
					);
				}
			});
		}
	};
}
