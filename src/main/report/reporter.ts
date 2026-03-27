import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult as PWTestResult,
} from "@playwright/test/reporter";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { RunResult, TestResult } from "./types.js";
import { logger } from "../utils/logger/logger.ts";

const knownTests: Set<string> = new Set();
const reportDir = "playwright-report";

export default class MonthlyReporter implements Reporter {
  private results: TestResult[] = [];
  private startTime!: number;
  private previousTestIds: Set<string> = new Set();

  /**
   * Called when the test run begins. Records the start time and initial test IDs.
   * @param _config The full configuration object.
   * @param suite The suite being executed.
   */
  onBegin(_config: FullConfig, suite: Suite): void {
    this.startTime = Date.now();
    this.previousTestIds = new Set(knownTests);
    this.collectTestIds(suite);
  }

  /**
   * Recursively traverse the suite and collect all test IDs.
   * @param suite The suite to traverse.
   */
  private collectTestIds(suite: Suite): void {
    for (const child of suite.allTests()) {
      knownTests.add(child.id);
    }
  }

  /**
   * Attempts to get the current branch of the repository.
   * Returns the abbreviated ref name (e.g. "main") if successful, or "unknown" if not.
   * @returns {string} The current branch name, or "unknown" if not found.
   */
  private getCurrentBranch(): string {
    try {
      return execSync("git rev-parse --abbrev-ref HEAD", {
        encoding: "utf-8",
      }).trim();
    } catch {
      return "unknown";
    }
  }

  /**
   * Attempts to get the current commit SHA of the repository.
   * Returns the 7-character short SHA if successful, or "unknown" if not.
   * @returns {string} The current commit SHA, or "unknown" if not found.
   */
  private getCurrentCommitSha(): string {
    try {
      return execSync("git rev-parse --short HEAD", {
        encoding: "utf-8",
      }).trim();
    } catch {
      return "unknown";
    }
  }

  /**
   * Collects test results for the current test run.
   *
   * @param test - The test case that has finished execution.
   * @param result - The result of the test execution.
   *
   * The test results are accumulated in the `results` property of the reporter.
   * The `results` property is an array of objects with the following properties:
   * - `id`: The unique ID of the test case.
   * - `title`: The title of the test case.
   * - `fullTitle`: The full title of the test case, including its parent suite.
   * - `file`: The file where the test case is located.
   * - `suite`: The title of the parent suite of the test case.
   * - `status`: The status of the test execution.
   * - `duration`: The duration of the test execution in milliseconds.
   * - `retries`: The number of times the test was retried.
   * - `error`: The error message of the test execution if it failed.
   * - `tags`: An array of tags associated with the test case.
   * - `isNew`: A boolean indicating whether the test case is new or not.
   */
  onTestEnd(test: TestCase, result: PWTestResult): void {
    type Status = "passed" | "failed" | "skipped" | "timedOut";
    const status: Status =
      result.status === "timedOut" ? "timedOut" : (result.status as Status);

    this.results.push({
      id: test.id,
      title: test.title,
      fullTitle: test.titlePath().join(" > "),
      file: test.location.file,
      suite: test.parent.title || "root",
      status,
      duration: result.duration,
      retries: result.retry,
      error: result.errors[0]?.message,
      tags: test.annotations.map((a) => a.type),
      isNew: !this.previousTestIds.has(test.id),
    });
  }

  /**
   * Saves the run results to a file in the "playwright-report" directory.
   * The file name is in the format of "run-{runId}.json".
   * The saved run results include the run ID, timestamp, date, month, branch, commit SHA, environment, total tests, passed tests, failed tests, skipped tests, timed out tests, duration, new tests, and test results.
   * The results are saved in a JSON format with indentation of 2 spaces.
   */
  async onEnd(): Promise<void> {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
    const date = now.toISOString().split("T")[0];

    const passed = this.results.filter((r) => r.status === "passed").length;
    const failed = this.results.filter((r) => r.status === "failed").length;
    const skipped = this.results.filter((r) => r.status === "skipped").length;
    const timedOut = this.results.filter((r) => r.status === "timedOut").length;
    const newTests = this.results.filter((r) => r.isNew).length;

    const branch =
      process.env.GIT_BRANCH ||
      process.env.GITHUB_REF_NAME ||
      this.getCurrentBranch();

    const allowedBranches = ["qa", "develop"];
    const resolvedBranch = allowedBranches.includes(branch)
      ? branch
      : branch.startsWith("feature/") ||
          branch.startsWith("bugfix/") ||
          branch.startsWith("hotfix/")
        ? branch
        : "qa";

    const commitSha =
      process.env.GIT_SHA ||
      process.env.GITHUB_SHA?.slice(0, 7) ||
      this.getCurrentCommitSha();

    const environment =
      process.env.TEST_ENV ?? (resolvedBranch === "qa" ? "qa" : "develop");

    const runId = process.env.GITHUB_RUN_ID || uuidv4();

    const run: RunResult = {
      runId,
      timestamp: now.toISOString(),
      date,
      month,
      branch: resolvedBranch,
      commitSha,
      environment,
      totalTests: this.results.length,
      passed,
      failed,
      skipped,
      timedOut,
      duration: Date.now() - this.startTime,
      newTests,
      tests: this.results,
    };

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const filePath = path.join(reportDir, `run-${runId}.json`);

    fs.writeFileSync(filePath, JSON.stringify(run, null, 2));

    logger.info(
      `Run saved ${runId} | Branch: ${resolvedBranch} | Env: ${environment} | Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}, TimedOut: ${timedOut}`,
    );
  }
}
