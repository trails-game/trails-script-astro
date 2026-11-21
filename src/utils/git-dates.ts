import { spawnSync } from 'node:child_process';

export interface DocGitDates {
	latestCommitDate?: Date;
	firstCommitDate?: Date;
}

const INITIAL_IMPORT_PREFIX = '989a62c';

let cachedMap: Map<string, DocGitDates> | null = null;

function normalizeDocPath(filePath: string): string {
	return filePath.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^\/+/, '');
}

export function parseGitLogOutput(stdout: string): Map<string, DocGitDates> {
	const map = new Map<string, DocGitDates>();
	let currentHash = '';
	let currentDate: Date | null = null;

	for (const rawLine of stdout.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line) continue;

		if (line.startsWith('COMMIT ')) {
			const parts = line.split(' ');
			currentHash = parts[1] || '';
			const epochSec = Number(parts[2]);
			currentDate = Number.isFinite(epochSec) && epochSec > 0 ? new Date(epochSec * 1000) : null;
			continue;
		}

		if (!currentDate || currentHash.startsWith(INITIAL_IMPORT_PREFIX)) {
			continue;
		}

		const normPath = normalizeDocPath(line);
		const existing = map.get(normPath);
		if (!existing) {
			map.set(normPath, {
				latestCommitDate: currentDate,
				firstCommitDate: currentDate,
			});
		} else {
			if (!existing.latestCommitDate || currentDate.getTime() > existing.latestCommitDate.getTime()) {
				existing.latestCommitDate = currentDate;
			}
			if (!existing.firstCommitDate || currentDate.getTime() < existing.firstCommitDate.getTime()) {
				existing.firstCommitDate = currentDate;
			}
		}
	}

	return map;
}

function getGitDatesMap(): Map<string, DocGitDates> {
	if (cachedMap) return cachedMap;
	try {
		const res = spawnSync(
			'git',
			['-c', 'core.quotepath=false', 'log', '--format=COMMIT %H %ct', '--name-only', '--', 'src/content/docs'],
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
