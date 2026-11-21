import navigation from './navigation.json';
import { stripBase, withBase } from '../utils/paths';

export type ArcId = 'liberl' | 'crossbell' | 'erebonia' | 'reverie' | 'calvard';

export interface ArcMeta {
	id: ArcId;
	name: string;
	nameEn: string;
	years: string;
	summary: string;
	color: string;
}

export interface QuickLink {
	label: string;
	href: string;
}

export interface GameMeta {
	prefix: string;
	title: string;
	subtitle: string;
	year: string;
	arcId: ArcId;
	summaryDone: boolean;
	scriptDone: boolean;
	tagline: string;
	quickLinks: QuickLink[];
}

export const ARCS: ArcMeta[] = [
	{
		id: 'liberl',
		name: '利贝尔王国篇',
		nameEn: 'Liberl Arc',
		years: 'S.1202 – S.1203',
		summary: '导力革命发源地，游击士艾丝蒂尔与约修亚围绕「辉之环」展开的旅途。',
		color: '#38bdf8',
	},
	{
		id: 'crossbell',
		name: '克洛斯贝尔自治州篇',
		nameEn: 'Crossbell Arc',
		years: 'S.1204',
		summary: '列强夹缝中的魔都，特别任务支援科跨越「障壁」追寻真相的记录。',
		color: '#10b981',
	},
	{
		id: 'erebonia',
		name: '埃雷波尼亚帝国篇',
		nameEn: 'Erebonia Arc',
		years: 'S.1204 – S.1206',
		summary: '铁血与诅咒笼罩的巨大帝国，托尔兹军官学院新旧《Ⅶ班》的激荡年代。',
		color: '#f43f5e',
	},
	{
		id: 'reverie',
		name: '塞姆利亚交错篇',
		nameEn: 'Crossroads Arc',
		years: 'S.1207',
		summary: '三条路线交汇于克洛斯贝尔再独立之日，迈向大陆后半篇的转折点。',
		color: '#a78bfa',
	},
	{
		id: 'calvard',
		name: '卡尔瓦德共和国篇',
		nameEn: 'Calvard Arc',
		years: 'S.1208 – S.1209',
		summary: '多民族共和之国与战术导力器《Xipha》时代，地下万事屋范恩的灰色轨迹。',
		color: '#22d3ee',
	},
];

export const ARC_BY_ID: Record<ArcId, ArcMeta> = Object.fromEntries(
	ARCS.map((arc) => [arc.id, arc])
) as Record<ArcId, ArcMeta>;

const RAW_GAMES: Record<string, GameMeta> = {
	'sora-fc': {
		prefix: 'sora-fc',
		title: '空之轨迹FC',
		subtitle: 'Trails in the Sky FC',
		year: 'S.1202',
		arcId: 'liberl',
		summaryDone: true,
		scriptDone: true,
		tagline: '少女艾丝蒂尔与少年约修亚周游利贝尔五座城市的游击士修行之旅。',
		quickLinks: [
			{ label: '剧情简介', href: '/sora-fc/summary/' },
			{ label: '序章「父亲，启程」', href: '/sora-fc/chapter-0/' },
		],
	},
	'sora-sc': {
		prefix: 'sora-sc',
		title: '空之轨迹SC',
		subtitle: 'Trails in the Sky SC',
		year: 'S.1202–1203',
		arcId: 'liberl',
		summaryDone: true,
		scriptDone: true,
		tagline: '直面结社《噬身之蛇》的福音计划，追寻昔日家人与光辉的答案。',
		quickLinks: [
			{ label: '剧情简介', href: '/sora-sc/summary/' },
			{ label: '序章「少女的决意」', href: '/sora-sc/chapter-0/' },
		],
	},
	'sora-3rd': {
		prefix: 'sora-3rd',
		title: '空之轨迹3RD',
		subtitle: 'Trails in the Sky the 3rd',
		year: 'S.1203',
		arcId: 'liberl',
		summaryDone: true,
		scriptDone: true,
		tagline: '星杯骑士凯文与莉丝深入《影之国》，开启连接大陆未来的星、月、太阳之门。',
		quickLinks: [
			{ label: '剧情简介', href: '/sora-3rd/summary/' },
			{ label: '第零话「星杯骑士」', href: '/sora-3rd/chapter-0/' },
			{ label: '星之门', href: '/sora-3rd/star/' },
		],
	},
	zero: {
		prefix: 'zero',
		title: '零之轨迹',
		subtitle: 'Trails from Zero',
		year: 'S.1204',
		arcId: 'crossbell',
		summaryDone: true,
		scriptDone: true,
		tagline: '新人搜查官罗伊德加入《特别任务支援科》，揭开魔都暗影下的教团阴谋。',
		quickLinks: [
			{ label: '剧情简介', href: '/zero/summary/' },
			{ label: '序章「特别任务支援科」', href: '/zero/prologue/' },
		],
	},
	aoi: {
		prefix: 'aoi',
		title: '碧之轨迹',
		subtitle: 'Trails to Azure',
		year: 'S.1204',
		arcId: 'crossbell',
		summaryDone: true,
		scriptDone: true,
		tagline: '西塞姆利亚通商会议召开，围绕《零之至宝》掀起的自治州最漫长风暴。',
		quickLinks: [
			{ label: '剧情简介', href: '/aoi/summary/' },
			{ label: '序章「D之残影」', href: '/aoi/prologue/' },
		],
	},
	sen1: {
		prefix: 'sen1',
		title: '闪之轨迹Ⅰ',
		subtitle: 'Trails of Cold Steel',
		year: 'S.1204',
		arcId: 'erebonia',
		summaryDone: true,
		scriptDone: true,
		tagline: '托尔兹军官学院特科《Ⅶ班》成立，黎恩等人在特别实习中见证帝国暗流。',
		quickLinks: [
			{ label: '剧情简介', href: '/sen1/summary/' },
			{ label: '序章「托尔兹军官学院」', href: '/sen1/chapter-0/' },
			{ label: '全羁绊事件', href: '/sen1/bond-events/' },
		],
	},
	sen2: {
		prefix: 'sen2',
		title: '闪之轨迹Ⅱ',
		subtitle: 'Trails of Cold Steel II',
		year: 'S.1204–1205',
		arcId: 'erebonia',
		summaryDone: true,
		scriptDone: true,
		tagline: '灰之骑神苏醒后的帝国内战，散落的《Ⅶ班》伙伴乘红翼再度集结。',
		quickLinks: [
			{ label: '剧情简介', href: '/sen2/summary/' },
			{ label: '序章「归乡～失意的尽头～」', href: '/sen2/chapter-0/' },
			{ label: '全羁绊事件', href: '/sen2/bond-events/' },
		],
	},
	sen3: {
		prefix: 'sen3',
		title: '闪之轨迹Ⅲ',
		subtitle: 'Trails of Cold Steel III',
		year: 'S.1206',
		arcId: 'erebonia',
		summaryDone: true,
		scriptDone: false,
		tagline: '灰色骑士黎恩就任托尔兹第Ⅱ分校教官，率领新《Ⅶ班》迎向帝国巨变前夜。',
		quickLinks: [
			{ label: '剧情简介', href: '/sen3/summary/' },
			{ label: '序章「春日再临」', href: '/sen3/chapter-0/' },
		],
	},
	sen4: {
		prefix: 'sen4',
		title: '闪之轨迹Ⅳ',
		subtitle: 'Trails of Cold Steel IV',
		year: 'S.1206',
		arcId: 'erebonia',
		summaryDone: true,
		scriptDone: false,
		tagline: '《巨硕黄昏》降临全大陆，利贝尔、克洛斯贝尔与帝国英雄跨越国境集结。',
		quickLinks: [{ label: '剧情简介', href: '/sen4/summary/' }],
	},
	hajimari: {
		prefix: 'hajimari',
		title: '创之轨迹',
		subtitle: 'Trails into Reverie',
		year: 'S.1207',
		arcId: 'reverie',
		summaryDone: true,
		scriptDone: true,
		tagline: '英雄、解放者与隐者三条路线交织，在《真·梦幻回廊》揭开西塞姆利亚终幕。',
		quickLinks: [
			{ label: '剧情简介', href: '/hajimari/summary/' },
			{ label: '序章「克洛斯贝尔解放作战」', href: '/hajimari/chapter-0/' },
			{ label: '追忆石盘', href: '/hajimari/episode/' },
		],
	},
	kuro: {
		prefix: 'kuro',
		title: '黎之轨迹',
		subtitle: 'Trails through Daybreak',
		year: 'S.1208',
		arcId: 'calvard',
		summaryDone: true,
		scriptDone: true,
		tagline: '伊帝斯旧市街的《地下万事屋》接下寻找八个古董导力器《创世》的委托。',
		quickLinks: [
			{ label: '剧情简介', href: '/kuro/summary/' },
			{ label: '序章「旧市街的地下万事屋」', href: '/kuro/chapter-0/' },
			{ label: '连结事件', href: '/kuro/bond-events/' },
		],
	},
	kuro2: {
		prefix: 'kuro2',
		title: '黎之轨迹Ⅱ',
		subtitle: 'Trails through Daybreak II',
		year: 'S.1209',
		arcId: 'calvard',
		summaryDone: true,
		scriptDone: true,
		tagline: '绯红魔装鬼引发连环惨剧，借由第八创世跨越因果死局的共和国新篇章。',
		quickLinks: [
			{ label: '剧情简介', href: '/kuro2/summary/' },
			{ label: '序幕「绯红咆哮」', href: '/kuro2/chapter-0/' },
			{ label: '连结事件', href: '/kuro2/bond-events/' },
		],
	},
};

export const GAMES: Record<string, GameMeta> = Object.fromEntries(
	Object.entries(RAW_GAMES).map(([key, game]) => [
		key,
		{
			...game,
			quickLinks: game.quickLinks.map((ql) => ({
				...ql,
				href: withBase(ql.href),
			})),
		},
	])
);

// Derived in chronological order from RAW_GAMES
export const GAMES_CHRONOLOGICAL: GameMeta[] = Object.values(GAMES);

interface NavItem {
	slug?: string;
	items?: NavItem[];
}

export function countItems(items: NavItem[]): number {
	let total = 0;
	for (const item of items) {
		if (item.slug) {
			total += 1;
		} else if (Array.isArray(item.items)) {
			total += countItems(item.items);
		}
	}
	return total;
}

export const CHAPTER_COUNTS: Record<string, number> = Object.fromEntries(
	navigation.sections.map((section) => [section.prefix, countItems(section.sidebar.items)])
);

export const TOTAL_CHAPTERS: number = Object.values(CHAPTER_COUNTS).reduce((a, b) => a + b, 0);

export function getGameByPathname(
	pathname: string
): { game: GameMeta; arc: ArcMeta } | null {
	const clean = stripBase(pathname).replace(/^\/+/, '');
	const prefix = clean.split('/')[0];
	if (!prefix) return null;
	const game = GAMES[prefix];
	if (!game) return null;
	return { game, arc: ARC_BY_ID[game.arcId] };
}
