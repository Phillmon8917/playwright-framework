import {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult as PWTestResult,
} from "@playwright/test/reporter";
import { appendRun } from "./store.js";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { RunResult, TestResult } from "./types.js";
import { logger } from "../utils/logger/logger.ts";

const knownTests: Set<string> = new Set();

export default class MonthlyReporter implements Reporter {
  private results: TestResult[] = [];
  private startTime!: number;
  private previousTestIds: Set<string> = new Set();

  onBegin(_config: FullConfig, suite: Suite): void {
    this.startTime = Date.now();
    this.previousTestIds = new Set(knownTests);
    this.collectTestIds(suite);
  }

  private collectTestIds(suite: Suite): void {
    for (const child of suite.allTests()) {
      knownTests.add(child.id);
    }
  }

  private getCurrentBranch(): string {
    try {
      return execSync("git rev-parse --abbrev-ref HEAD", {
        encoding: "utf-8",
      }).trim();
    } catch {
      return "unknown";
    }
  }

  private getCurrentCommitSha(): string {
    try {
      return execSync("git rev-parse --short HEAD", {
        encoding: "utf-8",
      }).trim();
    } catch {
      return "unknown";
    }
  }

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

  async onEnd(): Promise<void> {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
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

    appendRun(run);

    logger.info(
      `Run appended ${runId} | Month: ${month} | Branch: ${resolvedBranch} | Env: ${environment} | Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}, TimedOut: ${timedOut}`,
    );
  }
}
