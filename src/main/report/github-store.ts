/**
 * GitHub API adapter for reading/writing monthly JSON data files
 * in the phptravels-reports repository.
 *
 * Used only in CI (when GITHUB_ACTIONS=true).
 * Locally, store.ts falls back to the filesystem.
 */

import { MonthlyStore, RunResult } from './types.js';
import { logger } from '../utils/logger/logger.js';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = process.env.DATA_REPO_OWNER ?? 'Phillmon8917';
const REPO_NAME  = process.env.DATA_REPO_NAME  ?? 'phptravels-reports';
const REPO_BRANCH = process.env.DATA_REPO_BRANCH ?? 'main';
const TOKEN       = process.env.GITHUB_TOKEN ?? '';

/**
 * Returns a Record<string, string> containing the headers to send with
 * every GitHub API request. The headers include an Authorization Bearer
 * token, an Accept header for the GitHub API v3 JSON format, and
 * an X-GitHub-Api-Version header for the GitHub API version to use.
 *
 * @returns {Record<string, string>} - A Record<string, string> containing the
 *   headers to send with every GitHub API request.
 */
function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept:        'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

/**
 * Returns a string representing the path to a monthly JSON file in the
 * GitHub repo. The path is in the format "data/<month>.json", where
 * <month> is the month string in the format "YYYY-MM".
 *
 * @param {string} month - The month string in the format "YYYY-MM".
 * @returns {string} - The path to the monthly JSON file in the GitHub repo.
 */
function dataPath(month: string): string {
  return `data/${month}.json`;
}

/**
 * Fetch a monthly JSON file from the GitHub repo.
 * Returns { store, sha } — sha is needed to update the file later.
 * If the file does not exist, returns an empty store with sha = null.
 */
export async function githubLoadStore(month: string): Promise<{ store: MonthlyStore; sha: string | null }> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dataPath(month)}?ref=${REPO_BRANCH}`;

  const res = await fetch(url, { headers: headers() });

  if (res.status === 404) {
    logger.info(`[github-store] ${month}.json not found in repo — will create on first write`);
    return { store: { month, runs: [] }, sha: null };
  }

  if (!res.ok) {
    throw new Error(`[github-store] Failed to fetch ${month}.json: ${res.status} ${res.statusText}`);
  }

  const json = await res.json() as { content: string; sha: string };
  const content = Buffer.from(json.content, 'base64').toString('utf-8');
  const store   = JSON.parse(content) as MonthlyStore;

  logger.info(`[github-store] Loaded ${month}.json (sha: ${json.sha.slice(0, 7)})`);
  return { store, sha: json.sha };
}

/**
 * Write (create or update) a monthly JSON file in the GitHub repo.
 * @param store  The full month store to write.
 * @param sha    The SHA of the existing file, or null to create a new file.
 */
export async function githubSaveStore(store: MonthlyStore, sha: string | null): Promise<void> {
  const month   = store.month;
  const url     = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dataPath(month)}`;
  const content = Buffer.from(JSON.stringify(store, null, 2), 'utf-8').toString('base64');

  const body: Record<string, unknown> = {
    message: `ci: append run to ${month}.json [skip ci]`,
    content,
    branch: REPO_BRANCH,
  };
  if (sha) body['sha'] = sha;

  const res = await fetch(url, {
    method:  'PUT',
    headers: headers(),
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[github-store] Failed to save ${month}.json: ${res.status} ${res.statusText}\n${text}`);
  }

  logger.info(`[github-store] Saved ${month}.json to repo`);
}

/**
 * Append a run to the correct monthly file in GitHub, creating the file if needed.
 */
export async function githubAppendRun(run: RunResult): Promise<void> {
  const { store, sha } = await githubLoadStore(run.month);
  store.runs.push(run);
  await githubSaveStore(store, sha);
  logger.info(`[github-store] Run ${run.runId} appended to ${run.month}.json in GitHub`);
}

/**
 * Load the previous month's data from GitHub for report generation.
 */
export async function githubLoadReportData(): Promise<{
  reportMonth: string;
  reportStore: MonthlyStore;
  currentMonth: string;
  currentStore: MonthlyStore;
}> {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate     = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const reportMonth  = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const [{ store: reportStore }, { store: currentStore }] = await Promise.all([
    githubLoadStore(reportMonth),
    githubLoadStore(currentMonth),
  ]);

  return { reportMonth, reportStore, currentMonth, currentStore };
}