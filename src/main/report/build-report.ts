import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { loadReportData } from "./store.js";
import { logger } from "../utils/logger/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_PATH = path.resolve(__dirname, "./report.html");
const OUT_PATH = path.resolve(__dirname, "../../dist/report.html");

/**
 * Builds a monthly report based on the data stored in the report store.
 * Creates a new directory if the output path does not exist.
 * Injects the data into the report template and writes the resulting HTML to the output path.
 */
export function buildReport(): void {
  const { reportMonth, reportStore } = loadReportData();

  if (!fs.existsSync(path.dirname(OUT_PATH))) {
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  }

  let html = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  const dataJson = JSON.stringify({
    month: reportMonth,
    runs: reportStore.runs,
  });

  html = html.replace(
    "const DATA = window.__REPORT_DATA__ || generateSampleData();",
    `const DATA = window.__REPORT_DATA__ || ${dataJson};`,
  );

  fs.writeFileSync(OUT_PATH, html, "utf-8");
  logger.info(`Report built → ${OUT_PATH}`);
  logger.info(`   Month: ${reportMonth}`);
  logger.info(`   Runs:  ${reportStore.runs.length}`);
}

// Run directly
buildReport();
