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
 * Builds the monthly HTML report from the previous month's run data.
 * Reads the HTML template, injects report data as a window variable,
 * and writes the output to dist/report.html.
 * In CI the data comes from GitHub; locally it comes from data/ on disk.
 * @returns {Promise<void>}
 * @throws {Error} If the HTML template is missing a </head> tag.
 */
export async function buildReport(): Promise<void> {
  const { reportMonth, reportStore } = await loadReportData();

  logger.info(
    `Building report for month: ${reportMonth}, runs: ${reportStore.runs.length}`,
  );

  if (!fs.existsSync(path.dirname(OUT_PATH))) {
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  }

  let html = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  const dataJson = JSON.stringify({
    month: reportMonth,
    runs: reportStore.runs,
  });
  const injectedScript = `<script>window.__REPORT_DATA__ = ${dataJson};</script>`;

  if (!html.includes("</head>")) {
    throw new Error("Template missing </head> — cannot inject report data");
  }

  html = html.replace("</head>", `${injectedScript}\n</head>`);

  fs.writeFileSync(OUT_PATH, html, "utf-8");
  logger.info(`Report built → ${OUT_PATH}`);
  logger.info(`   Month : ${reportMonth}`);
  logger.info(`   Runs  : ${reportStore.runs.length}`);
}

buildReport().catch((err) => {
  logger.error(err instanceof Error ? err.message : String(err));
  if (err instanceof Error && err.stack) {
    logger.error(err.stack);
  }
  process.exit(1);
});
