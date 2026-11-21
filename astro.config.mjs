import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMkdocsCompat from './src/plugins/remark-mkdocs-compat.mjs';
import navigation from './src/data/navigation.json';

export default defineConfig({
	site: 'https://book.trails-game.com',
	prefetch: {
		defaultStrategy: 'hover',
	},
	markdown: {
		remarkPlugins: [remarkMkdocsCompat],
	},
	integrations: [
		starlight({
			title: '咖啡屋 | 轨迹系列 - Cafe',
			description: '轨迹游戏剧情和脚本',
			logo: {
				src: './src/assets/logo.webp',
				alt: '咖啡屋',
			},
			favicon: '/images/webicons/favicon-32x32.png',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/trails-game/trails-script-astro',
				},
			],
			lastUpdated: true,
			credits: false,
			pagefind: true,
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'author',
						content: '轨迹系列 - Cafe',
					},
				},
				{
					tag: 'script',
					content: `try{var p=JSON.parse(localStorage.getItem('trails-reader-prefs')||'{}');var r=document.documentElement;if(p.font)r.dataset.readerFont=p.font;if(p.width)r.dataset.readerWidth=p.width;if(p.mode)r.dataset.scriptMode=p.mode;}catch(e){}`,
				},
				{
					tag: 'script',
					content: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?ver=2&id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K6VQFRC');
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ event: 'pageview' });`,
				},
			],
			sidebar: navigation.sections.map((section) => section.sidebar),
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
				LastUpdated: './src/components/LastUpdated.astro',
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
