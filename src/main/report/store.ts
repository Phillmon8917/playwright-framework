import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { RunResult, MonthlyStore } from "./types.js";
import { logger } from "../utils/logger/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_DIR = path.resolve(__dirname, "../../../data");
const KNOWN_IDS_FILE = "known-test-ids.json";

/**
 * Ensures the local data/ directory exists.
 */
function ensureStoreDir(): void {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
}

/**
 * Returns the absolute path to a monthly JSON store file.
 * @param {string} month - Month in YYYY-MM format.
 * @returns {string} Absolute file path.
 */
function storeFilePath(month: string): string {
  return path.join(STORE_DIR, `${month}.json`);
}

/**
 * Loads a MonthlyStore from disk. Returns an empty store if the file does not exist.
 * @param {string} month - Month in YYYY-MM format.
 * @returns {MonthlyStore} The loaded store or an empty one.
 */
function localLoadStore(month: string): MonthlyStore {
  const file = storeFilePath(month);
  if (!fs.existsSync(file)) return { month, runs: [] };
  return JSON.parse(fs.readFileSync(file, "utf-8")) as MonthlyStore;
}

/**
 * Saves a MonthlyStore to disk.
 * @param {MonthlyStore} store - The store to save.
 */
function localSaveStore(store: MonthlyStore): void {
  ensureStoreDir();
  fs.writeFileSync(
    storeFilePath(store.month),
    JSON.stringify(store, null, 2),
    "utf-8",
  );
}

/**
 * Returns true when running inside GitHub Actions.
 * @returns {boolean}
 */
function isCI(): boolean {
  return process.env.GITHUB_ACTIONS === "true";
}

/**
 * Appends a run result to the correct monthly store.
 * In CI writes to GitHub; locally writes to disk and prunes old files.
 * @param {RunResult} run - The run result to append.
 */
export async function appendRun(run: RunResult): Promise<void> {
  if (isCI()) {
    const { githubAppendRun } = await import("./github-store.js");
    await githubAppendRun(run);
    return;
  }

  const currentMonth = run.month;
  const [year, month] = currentMonth.split("-").map(Number);
  const prevDate = new Date(year, month - 2, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

  const store = localLoadStore(currentMonth);
  store.runs.push(run);
  localSaveStore(store);

  const files = fs.readdirSync(STORE_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const fileMonth = file.replace(".json", "");
    if (fileMonth !== currentMonth && fileMonth !== prevMonth) {
      fs.unlinkSync(path.join(STORE_DIR, file));
      logger.info(`[store] Deleted old local store: ${file}`);
    }
  }

  logger.info(`[store] Run ${run.runId} saved to ${currentMonth}.json`);
}

/**
 * Loads the report data for the previous and current months.
 * In CI reads from GitHub; locally reads from disk.
 * @returns Report month, report store, current month, and current store.
 */
export async function loadReportData(): Promise<{
  reportMonth: string;
  reportStore: MonthlyStore;
  currentMonth: string;
  currentStore: MonthlyStore;
}> {
  if (isCI()) {
    const { githubLoadReportData } = await import("./github-store.js");
    return githubLoadReportData();
  }

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const reportMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

  return {
    reportMonth,
    reportStore: localLoadStore(reportMonth),
    currentMonth,
    currentStore: localLoadStore(currentMonth),
  };
}

/**
 * Loads the persisted set of known test IDs.
 * In CI reads from GitHub; locally reads from disk.
 * @returns {Promise<Set<string>>} Set of previously seen test IDs.
 */
export async function loadKnownTestIds(): Promise<Set<string>> {
  if (isCI()) {
    const { githubLoadKnownTestIds } = await import("./github-store.js");
    return githubLoadKnownTestIds();
  }

  const file = path.join(STORE_DIR, KNOWN_IDS_FILE);
  if (!fs.existsSync(file)) return new Set();
  const ids = JSON.parse(fs.readFileSync(file, "utf-8")) as string[];
  return new Set(ids);
}

/**
 * Persists the full set of known test IDs.
 * In CI writes to GitHub; locally writes to disk.
 * @param {Set<string>} ids - The complete set of known test IDs to save.
 */
export async function saveKnownTestIds(ids: Set<string>): Promise<void> {
  if (isCI()) {
    const { githubSaveKnownTestIds } = await import("./github-store.js");
    await githubSaveKnownTestIds(ids);
    return;
  }

  ensureStoreDir();
  fs.writeFileSync(
    path.join(STORE_DIR, KNOWN_IDS_FILE),
    JSON.stringify([...ids], null, 2),
    "utf-8",
  );
  logger.info(`[store] Saved ${ids.size} known test IDs locally`);
}

/**
 * Lists all stored months on disk. For local debugging only.
 * @returns {string[]} Sorted array of month strings in YYYY-MM format.
 */
export function listStoredMonths(): string[] {
  ensureStoreDir();
  return fs
    .readdirSync(STORE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""))
    .sort();
}
