import { spawnSync } from 'node:child_process';

export interface DocGitDates {
	latestCommitDate?: Date;
	firstCommitDate?: Date;
}

const IGNORED_COMMIT_PREFIXES = ['989a62c', 'e0e964a'];
const SKIP_DATE_MARKER = '[skip-date]';
const DOC_PREFIX = 'src/content/docs/';
const HOME_DOC_PATH = 'src/content/docs/index.md';
const HOME_PROGRESS_SOURCES = new Set(['README.md', 'src/data/games.ts']);

let cachedMap: Map<string, DocGitDates> | null = null;

function normalizeDocPath(filePath: string): string {
	return filePath.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '');
}

function recordDate(
	map: Map<string, DocGitDates>,
	docPath: string,
	date: Date,
	includeCreated: boolean
): void {
	const existing = map.get(docPath);
	if (!existing) {
		map.set(docPath, {
			latestCommitDate: date,
			...(includeCreated ? { firstCommitDate: date } : {}),
		});
		return;
	}
	if (!existing.latestCommitDate || date.getTime() > existing.latestCommitDate.getTime()) {
		existing.latestCommitDate = date;
	}
	if (
		includeCreated &&
		(!existing.firstCommitDate || date.getTime() < existing.firstCommitDate.getTime())
	) {
		existing.firstCommitDate = date;
	}
}

export function parseGitLogOutput(stdout: string): Map<string, DocGitDates> {
	const map = new Map<string, DocGitDates>();
	let currentDate: Date | null = null;

	for (const rawLine of stdout.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line) continue;

		if (line.startsWith('COMMIT ')) {
			const match = line.match(/^COMMIT\s+([0-9a-f]+)\s+(\d+)(?:\s+(.*))?$/i);
			if (!match) {
				currentDate = null;
				continue;
			}
			const hash = match[1];
			const epochSec = Number(match[2]);
			const subject = match[3] || '';
			const ignored =
				IGNORED_COMMIT_PREFIXES.some((prefix) => hash.startsWith(prefix)) ||
				subject.includes(SKIP_DATE_MARKER);
			currentDate =
				!ignored && Number.isFinite(epochSec) && epochSec > 0
					? new Date(epochSec * 1000)
					: null;
			continue;
		}

		if (!currentDate) {
			continue;
		}

		const normPath = normalizeDocPath(line);
		if (normPath.startsWith(DOC_PREFIX)) {
			recordDate(map, normPath, currentDate, true);
		} else if (HOME_PROGRESS_SOURCES.has(normPath)) {
			recordDate(map, HOME_DOC_PATH, currentDate, false);
		}
	}

	return map;
}

function getGitDatesMap(): Map<string, DocGitDates> {
	if (cachedMap) return cachedMap;
	try {
		const res = spawnSync(
			'git',
			[
				'-c',
				'core.quotepath=false',
				'log',
				'--format=COMMIT %H %ct %s',
				'--name-only',
				'--',
				'src/content/docs',
				'README.md',
				'src/data/games.ts',
			],
			{
				cwd: process.cwd(),
				encoding: 'utf-8',
				maxBuffer: 16 * 1024 * 1024,
			}
		);
		if (res.status === 0 && typeof res.stdout === 'string') {
			cachedMap = parseGitLogOutput(res.stdout);
			return cachedMap;
		}
	} catch {
		// Fall back gracefully when git is not installed in container
	}
	cachedMap = new Map();
	return cachedMap;
}

export function getGitDatesForDoc(filePath?: string): DocGitDates | undefined {
	if (!filePath) return undefined;
	return getGitDatesMap().get(normalizeDocPath(filePath));
}
