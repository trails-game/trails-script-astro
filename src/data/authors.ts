import { withBase } from '../utils/paths';

export interface AuthorProfile {
	name: string;
	avatar: string;
	link: string;
}

export const AUTHOR_INFO: Record<string, AuthorProfile> = {
	冰镇南瓜汁: {
		name: '冰镇南瓜汁',
		avatar: withBase('/images/contributors/冰镇南瓜汁.webp'),
		link: 'https://trails-game.com/about/team/',
	},
	CC: {
		name: 'C.C.',
		avatar: withBase('/images/contributors/cc.webp'),
		link: 'https://trails-game.com/about/team/',
	},
	Winston: {
		name: 'Winston',
		avatar: withBase('/images/contributors/winston.webp'),
		link: 'https://space.bilibili.com/392143020',
	},
	Rieveldt: {
		name: 'Rieveldt624',
		avatar: withBase('/images/contributors/Rieveldt624.webp'),
		link: 'https://trails-game.com/about/team/',
	},
	linsage: {
		name: 'linsage',
		avatar: withBase('/images/contributors/linsage.webp'),
		link: 'https://trails-game.com/about/team/',
	},
	XDi: {
		name: 'XDi',
		avatar: withBase('/images/contributors/XDi.webp'),
		link: 'https://space.bilibili.com/10822381',
	},
	Flytutu: {
		name: 'Flytutu',
		avatar: withBase('/images/contributors/flytutu.webp'),
		link: 'https://trails-game.com/about/team/',
	},
	无始无过亦无终: {
		name: '无始无过亦无终',
		avatar: withBase('/images/contributors/无始无过亦无终.webp'),
		link: 'https://space.bilibili.com/13364946',
	},
};
