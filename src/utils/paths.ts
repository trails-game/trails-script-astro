const rawBase = import.meta.env.BASE_URL || '/';
const normalizedBase = rawBase === '/' ? '' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export function withBase(path: string): string {
	if (!path.startsWith('/') || path.startsWith('//')) {
		return path;
	}
	if (!normalizedBase) {
		return path;
	}
	if (path === normalizedBase || path.startsWith(`${normalizedBase}/`)) {
		return path;
	}
	return `${normalizedBase}${path}`;
}

export function stripBase(pathname: string): string {
	if (!normalizedBase) {
		return pathname || '/';
	}
	if (pathname === normalizedBase || pathname === `${normalizedBase}/`) {
		return '/';
	}
	if (pathname.startsWith(`${normalizedBase}/`)) {
		return pathname.slice(normalizedBase.length);
	}
	return pathname || '/';
}
