export type TestStatus = 'passed' | 'failed' | 'skipped' | 'timedOut';

export interface TestResult {
  id: string;
  title: string;
  fullTitle: string;
  file: string;
  suite: string;
  status: TestStatus;
  duration: number; // ms
  retries: number;
  error?: string;
  tags?: string[];
  isNew?: boolean; // first time this test ran (newly added)
}

export interface RunResult {
  runId: string;
  timestamp: string; // ISO
  date: string;      // YYYY-MM-DD
  month: string;     // YYYY-MM
  branch?: string;
  commitSha?: string;
  environment: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  timedOut: number;
  duration: number; // ms total
  newTests: number; // tests added this run vs last run
  tests: TestResult[];
}

export interface MonthlyStore {
  month: string; 
  runs: RunResult[];
}
