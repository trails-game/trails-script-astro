declare module 'virtual:starlight/user-config' {
	import type { StarlightConfig } from '@astrojs/starlight/types';
	const config: StarlightConfig;
	export default config;
}

declare module 'virtual:starlight/components/*' {
	import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
	const component: AstroComponentFactory;
	export default component;
}
