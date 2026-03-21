import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { RunResult, MonthlyStore } from './types.js';
import { logger } from '../utils/logger/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_DIR = path.resolve(__dirname, '../../../data');

/**
 * Ensures that the report store directory exists.
 * If the directory does not exist, it is created recursively.
 */
function ensureStoreDir(): void {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
}

/**
 * Returns the path to the store file for the given month.
 * The file name is in the format of <month>.json
 * @param {string} month - The month to get the store file path for.
 * @returns {string} - The path to the store file for the given month.
 */
function storeFilePath(month: string): string {
  return path.join(STORE_DIR, `${month}.json`);
}

/**
 * Loads the stored data for the given month.
 * If the file does not exist, it will return an empty store.
 * @param {string} month - The month to load the stored data for.
 * @returns {MonthlyStore} - The loaded stored data for the given month.
 */
function loadStore(month: string): MonthlyStore {
  const file = storeFilePath(month);
  if (!fs.existsSync(file)) return { month, runs: [] };
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as MonthlyStore;
}

/**
 * Saves the given store to the corresponding month's file.
 * Ensures that the store directory exists before writing the file.
 * Writes the store as a JSON string with indentation of 2 spaces.
 * @param {MonthlyStore} store - The store to be written to disk.
 */
function saveStore(store: MonthlyStore): void {
  ensureStoreDir();
  fs.writeFileSync(storeFilePath(store.month), JSON.stringify(store, null, 2), 'utf-8');
}

/**
 * Append a run result to the current month's store.
 * Rotates: keeps only current and previous month, deletes older files.
 */
export function appendRun(run: RunResult): void {
  const currentMonth = run.month;
  const [year, month] = currentMonth.split('-').map(Number);

  // Compute previous month
  const prevDate = new Date(year, month - 2, 1); 
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const current = loadStore(currentMonth);
  current.runs.push(run);
  saveStore(current);

  const files = fs.readdirSync(STORE_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const filMonth = file.replace('.json', '');
    if (filMonth !== currentMonth && filMonth !== prevMonth) {
      fs.unlinkSync(path.join(STORE_DIR, file));
      logger.info(`[store] Deleted old store: ${file}`);
    }
  }

  logger.info(`[store] Run ${run.runId} saved to ${currentMonth}.json`);
}

/**
 * Load stored data for report generation.
 * Returns { reportMonth, reportStore, currentMonth, currentStore }
 * reportMonth = previous month (what's shown on the report)
 * currentMonth = this month (accumulating runs)
 */
export function loadReportData(): {
  reportMonth: string;
  reportStore: MonthlyStore;
  currentMonth: string;
  currentStore: MonthlyStore;
} {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const reportMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  return {
    reportMonth,
    reportStore: loadStore(reportMonth),
    currentMonth,
    currentStore: loadStore(currentMonth),
  };
}

/**
 * List all available store months on disk.
 */
export function listStoredMonths(): string[] {
  ensureStoreDir();
  return fs.readdirSync(STORE_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .sort();
}
