/**
 * store.ts — Monthly run data store.
 *
 * Environment routing:
 *   - CI  (GITHUB_ACTIONS=true)  → reads/writes JSON files via GitHub API
 *   - Local                      → reads/writes JSON files from data/ on disk
 *
 * Both paths expose the same public API surface so callers never have to care
 * which backend is in use.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { RunResult, MonthlyStore } from "./types.js";
import { logger } from "../utils/logger/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Local filesystem paths ──────────────────────────────────────────────────
const STORE_DIR = path.resolve(__dirname, "../../../data");

/**
 * Ensure the data/ directory exists, creating it if necessary.
 *
 * This directory is used for local run data storage when the CI environment
 * variable is not set.
 */
function ensureStoreDir(): void {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
}


/**
 * Returns the absolute path to a JSON file containing run data for a given month.
 *
 * The file path is constructed by joining the data/ directory with the
 * month string and appending a .json extension.
 *
 * @param {string} month - The month string in the format "YYYY-MM".
 * @returns {string} - The absolute path to the JSON file.
 */
function storeFilePath(month: string): string {
  return path.join(STORE_DIR, `${month}.json`);
}


/**
 * Loads a MonthlyStore from a local JSON file.
 *
 * @param {string} month - The month string in the format "YYYY-MM".
 * @returns {MonthlyStore} - The loaded MonthlyStore if the file exists, otherwise
 *   a new MonthlyStore with an empty runs array.
 */
function localLoadStore(month: string): MonthlyStore {
  const file = storeFilePath(month);
  if (!fs.existsSync(file)) return { month, runs: [] };
  return JSON.parse(fs.readFileSync(file, "utf-8")) as MonthlyStore;
}

/**
 * Saves a MonthlyStore to a local JSON file.
 *
 * The file path is constructed by joining the data/ directory with the
 * month string and appending a .json extension.
 *
 * @param {MonthlyStore} store - The MonthlyStore to be saved.
 */
function localSaveStore(store: MonthlyStore): void {
  ensureStoreDir();
  fs.writeFileSync(
    storeFilePath(store.month),
    JSON.stringify(store, null, 2),
    "utf-8",
  );
}

// ── CI detection ────────────────────────────────────────────────────────────
/**
 * Returns true if the code is running in a GitHub Actions (CI) environment,
 * and false otherwise.
 *
 * This is a convenience function to simplify code that needs to adapt
 * behavior to the environment in which it is running.
 *
 * @returns {boolean} - True if running in CI, false otherwise.
 */
function isCI(): boolean {
  return process.env.GITHUB_ACTIONS === "true";
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Append a run to the current month's store.
 *
 * In CI:    reads the file from GitHub, pushes the run, writes back to GitHub.
 * Locally:  reads the file from data/, pushes the run, writes back to data/.
 *           Rotates: keeps only current and previous month files locally.
 */
export async function appendRun(run: RunResult): Promise<void> {
  if (isCI()) {
    // Dynamic import keeps the GitHub client out of the local bundle entirely
    const { githubAppendRun } = await import("./github-store.ts");
    await githubAppendRun(run);
    return;
  }

  // Local path
  const currentMonth = run.month;
  const [year, month] = currentMonth.split("-").map(Number);
  const prevDate = new Date(year, month - 2, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

  const store = localLoadStore(currentMonth);
  store.runs.push(run);
  localSaveStore(store);

  // Prune files older than previous month (local only)
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
 * Load stored data for report generation.
 *
 * Returns:
 *   reportMonth  — the previous calendar month (what gets displayed on the report)
 *   reportStore  — that month's accumulated runs
 *   currentMonth — the current calendar month
 *   currentStore — runs collected so far this month
 */
export async function loadReportData(): Promise<{
  reportMonth: string;
  reportStore: MonthlyStore;
  currentMonth: string;
  currentStore: MonthlyStore;
}> {
  if (isCI()) {
    const { githubLoadReportData } = await import("./github-store.ts");
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
 * List all available store months on disk (local only — for debugging).
 */
export function listStoredMonths(): string[] {
  ensureStoreDir();
  return fs
    .readdirSync(STORE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""))
    .sort();
}
