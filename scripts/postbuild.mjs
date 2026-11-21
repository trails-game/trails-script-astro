import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const publicDir = resolve(root, 'public');
const distDir = resolve(root, 'dist');

if (!existsSync(distDir)) {
	console.error(`Error: build output directory not found: ${distDir}`);
	process.exit(1);
}

for (const name of ['.htaccess', 'googlee6574b95bbae1639.html', 'robots.txt']) {
	const src = resolve(publicDir, name);
	const dst = resolve(distDir, name);
	if (!existsSync(src)) {
		console.error(`Error: required static file missing in public/: ${src}`);
		process.exit(1);
	}
	copyFileSync(src, dst);
}

const sitemapIndex = resolve(distDir, 'sitemap-index.xml');
const sitemapXml = resolve(distDir, 'sitemap.xml');
if (existsSync(sitemapIndex)) {
	copyFileSync(sitemapIndex, sitemapXml);
} else {
	console.error(`Error: ${sitemapIndex} was not generated.`);
	process.exit(1);
}

const pagefindJs = resolve(distDir, 'pagefind', 'pagefind.js');
if (!existsSync(pagefindJs)) {
	console.error(`Error: Pagefind search index missing: ${pagefindJs}`);
	process.exit(1);
}

console.log('postbuild: verified .htaccess, Google verification, robots.txt, sitemap.xml, and pagefind index.');
