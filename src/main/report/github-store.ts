import { MonthlyStore, RunResult } from "./types.js";
import { logger } from "../utils/logger/logger.js";

const GITHUB_API = "https://api.github.com";
const REPO_OWNER = process.env.DATA_REPO_OWNER ?? "Phillmon8917";
const REPO_NAME = process.env.DATA_REPO_NAME ?? "phptravels-reports";
const REPO_BRANCH = process.env.DATA_REPO_BRANCH ?? "main";
const TOKEN = process.env.DATA_REPO_TOKEN ?? "";

const KNOWN_IDS_PATH = "data/known-test-ids.json";

/**
 * Returns authenticated headers for GitHub API requests.
 * @throws {Error} If DATA_REPO_TOKEN is not set.
 * @returns {Record<string, string>} HTTP headers.
 */
function headers(): Record<string, string> {
  if (!TOKEN) {
    throw new Error(
      "[github-store] DATA_REPO_TOKEN env var is not set — cannot call GitHub API. " +
        "Ensure DATA_REPO_TOKEN is set in the workflow step env.",
    );
  }
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/**
 * Returns the repo-relative path to a monthly JSON file.
 * @param {string} month - Month in YYYY-MM format.
 * @returns {string} Repo path e.g. "data/2026-04.json".
 */
function dataPath(month: string): string {
  return `data/${month}.json`;
}

/**
 * Fetches a monthly JSON store file from the GitHub repo.
 * Returns an empty store if the file does not exist yet.
 * @param {string} month - Month in YYYY-MM format.
 * @returns {Promise<{ store: MonthlyStore; sha: string | null }>}
 */
export async function githubLoadStore(
  month: string,
): Promise<{ store: MonthlyStore; sha: string | null }> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dataPath(month)}?ref=${REPO_BRANCH}`;

  logger.info(`[github-store] GET ${url}`);
  const res = await fetch(url, { headers: headers() });
  logger.info(`[github-store] Response: ${res.status} ${res.statusText}`);

  if (res.status === 404) {
    logger.info(
      `[github-store] ${month}.json not found — will create on first write`,
    );
    return { store: { month, runs: [] }, sha: null };
  }

  if (res.status === 401 || res.status === 403) {
    const body = await res.text();
    throw new Error(
      `[github-store] Auth error fetching ${month}.json (${res.status}). ` +
        `Check that DATA_REPO_TOKEN has Contents read+write on ${REPO_OWNER}/${REPO_NAME}.\n${body}`,
    );
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `[github-store] Failed to fetch ${month}.json: ${res.status} ${res.statusText}\n${body}`,
    );
  }

  const json = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(
    json.content.replace(/\s/g, ""),
    "base64",
  ).toString("utf-8");
  const store = JSON.parse(content) as MonthlyStore;

  logger.info(
    `[github-store] Loaded ${month}.json (sha: ${json.sha.slice(0, 7)}, runs: ${store.runs.length})`,
  );
  return { store, sha: json.sha };
}

/**
 * Writes a monthly JSON store file to the GitHub repo, creating or updating it.
 * @param {MonthlyStore} store - The store to write.
 * @param {string | null} sha - Existing file SHA for updates, or null to create.
 */
export async function githubSaveStore(
  store: MonthlyStore,
  sha: string | null,
): Promise<void> {
  const month = store.month;
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dataPath(month)}`;
  const content = Buffer.from(JSON.stringify(store, null, 2), "utf-8").toString(
    "base64",
  );

  const body: Record<string, unknown> = {
    message: `ci: append run to ${month}.json [skip ci]`,
    content,
    branch: REPO_BRANCH,
  };
  if (sha) body["sha"] = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `[github-store] Failed to save ${month}.json: ${res.status} ${res.statusText}\n${text}`,
    );
  }

  logger.info(`[github-store] Saved ${month}.json to repo`);
}

/**
 * Appends a run to the correct monthly file in GitHub, creating it if needed.
 * @param {RunResult} run - The run result to append.
 */
export async function githubAppendRun(run: RunResult): Promise<void> {
  const { store, sha } = await githubLoadStore(run.month);
  store.runs.push(run);
  await githubSaveStore(store, sha);
  logger.info(
    `[github-store] Run ${run.runId} appended to ${run.month}.json in GitHub`,
  );
}

/**
 * Loads the previous and current month stores from GitHub for report generation.
 * @returns Report month, report store, current month, and current store.
 */
export async function githubLoadReportData(): Promise<{
  reportMonth: string;
  reportStore: MonthlyStore;
  currentMonth: string;
  currentStore: MonthlyStore;
}> {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const reportMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

  logger.info(
    `[github-store] Loading report data — reportMonth: ${reportMonth}, currentMonth: ${currentMonth}`,
  );

  const [{ store: reportStore }, { store: currentStore }] = await Promise.all([
    githubLoadStore(reportMonth),
    githubLoadStore(currentMonth),
  ]);

  logger.info(
    `[github-store] reportStore runs: ${reportStore.runs.length}, currentStore runs: ${currentStore.runs.length}`,
  );

  return { reportMonth, reportStore, currentMonth, currentStore };
}

/**
 * Loads the persisted known test IDs from GitHub.
 * Returns an empty set if the file does not exist yet.
 * @returns {Promise<Set<string>>} Set of previously seen test IDs.
 */
export async function githubLoadKnownTestIds(): Promise<Set<string>> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${KNOWN_IDS_PATH}?ref=${REPO_BRANCH}`;

  logger.info(`[github-store] GET ${url}`);
  const res = await fetch(url, { headers: headers() });
  logger.info(`[github-store] Response: ${res.status} ${res.statusText}`);

  if (res.status === 404) {
    logger.info(
      `[github-store] known-test-ids.json not found — all tests will be treated as new on first run`,
    );
    return new Set();
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `[github-store] Failed to fetch known-test-ids.json: ${res.status} ${res.statusText}\n${body}`,
    );
  }

  const json = (await res.json()) as { content: string };
  const content = Buffer.from(json.content, "base64").toString("utf-8");
  const ids = JSON.parse(content) as string[];

  logger.info(`[github-store] Loaded ${ids.length} known test IDs`);
  return new Set(ids);
}

/**
 * Saves the full set of known test IDs to GitHub.
 * Creates or updates data/known-test-ids.json in the reports repo.
 * @param {Set<string>} ids - The complete set of known test IDs.
 */
export async function githubSaveKnownTestIds(ids: Set<string>): Promise<void> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${KNOWN_IDS_PATH}`;

  let sha: string | null = null;
  const getRes = await fetch(`${url}?ref=${REPO_BRANCH}`, {
    headers: headers(),
  });
  if (getRes.ok) {
    const json = (await getRes.json()) as { sha: string };
    sha = json.sha;
  }

  const content = Buffer.from(
    JSON.stringify([...ids], null, 2),
    "utf-8",
  ).toString("base64");

  const body: Record<string, unknown> = {
    message: `ci: update known-test-ids.json [skip ci]`,
    content,
    branch: REPO_BRANCH,
  };
  if (sha) body["sha"] = sha;

  const res = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `[github-store] Failed to save known-test-ids.json: ${res.status} ${res.statusText}\n${text}`,
    );
  }

  logger.info(`[github-store] Saved ${ids.size} known test IDs to repo`);
}
