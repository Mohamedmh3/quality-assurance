/**
 * QA Storage Service
 * Handles reading and writing QA test results to/from a JSON file
 * The JSON file is stored in the public directory so it can be served statically
 */

export interface TestResult {
  testId: string;
  status: 'Not Started' | 'In Progress' | 'Pass' | 'Fail' | 'Blocked' | 'Skip';
  notes: string;
  lastTested?: string;
  testedBy?: string;
  actualResults: Record<number, string>;
}

export interface QAStorageData {
  testResults: Record<string, TestResult>;
  lastUpdated: string;
  version: string;
}

const STORAGE_PATH = '/data/qa-results.json';
const STORAGE_VERSION = '1.0.0';

/**
 * Read QA results from JSON file
 */
export async function readQAStorage(): Promise<QAStorageData> {
  try {
    const response = await fetch(STORAGE_PATH, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      // If file doesn't exist, return empty data
      if (response.status === 404) {
        return {
          testResults: {},
          lastUpdated: new Date().toISOString(),
          version: STORAGE_VERSION,
        };
      }
      throw new Error(`Failed to read QA storage: ${response.statusText}`);
    }

    const data: QAStorageData = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading QA storage:', error);
    // Return empty data on error
    return {
      testResults: {},
      lastUpdated: new Date().toISOString(),
      version: STORAGE_VERSION,
    };
  }
}

/**
 * Write QA results to JSON file (via API endpoint)
 * Note: In a static frontend, we can't directly write to files
 * This will be handled by the sync service which POSTs to a server endpoint
 */
export function prepareQAStorageData(testResults: Record<string, TestResult>): QAStorageData {
  return {
    testResults,
    lastUpdated: new Date().toISOString(),
    version: STORAGE_VERSION,
  };
}

/**
 * Get the storage path (useful for sync service)
 */
export function getStoragePath(): string {
  return STORAGE_PATH;
}

