/**
 * QA Sync Service
 * Handles syncing QA test results to a remote server
 * When changes are made locally, they are automatically synced to the server
 */

import type { TestResult } from './qa-storage';
import { prepareQAStorageData, getStoragePath } from './qa-storage';

// Get API endpoint from environment variable or use default
const getApiEndpoint = (): string => {
  // In production, this should be set via environment variable
  // For Docker, it can be passed as a build arg or runtime env var
  const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
  return `${apiUrl}/api/qa-results`;
};

let syncQueue: Array<Record<string, TestResult>> = [];
let isSyncing = false;
let syncTimer: number | null = null;

/**
 * Sync QA results to remote server
 */
export async function syncToServer(testResults: Record<string, TestResult>): Promise<boolean> {
  try {
    const apiEndpoint = getApiEndpoint();
    const data = prepareQAStorageData(testResults);

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        storagePath: getStoragePath(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }

    console.log('QA results synced to server successfully');
    return true;
  } catch (error) {
    console.error('Error syncing to server:', error);
    // Queue the sync for retry
    queueSync(testResults);
    return false;
  }
}

/**
 * Queue a sync operation (for retry on failure)
 */
function queueSync(testResults: Record<string, TestResult>) {
  syncQueue.push(testResults);
  
  // Retry sync after a delay
  if (syncTimer) {
    clearTimeout(syncTimer);
  }
  
  syncTimer = window.setTimeout(() => {
    retrySync();
  }, 5000); // Retry after 5 seconds
}

/**
 * Retry failed sync operations
 */
async function retrySync() {
  if (isSyncing || syncQueue.length === 0) {
    return;
  }

  isSyncing = true;
  const latestResults = syncQueue[syncQueue.length - 1]; // Get the most recent state
  syncQueue = []; // Clear queue

  const success = await syncToServer(latestResults);
  isSyncing = false;

  if (!success && syncQueue.length === 0) {
    // If still failing and no new updates, schedule another retry
    syncTimer = window.setTimeout(() => {
      retrySync();
    }, 30000); // Retry after 30 seconds
  }
}

/**
 * Debounced sync - waits for a pause in updates before syncing
 */
let debounceTimer: number | null = null;
const DEBOUNCE_DELAY = 2000; // Wait 2 seconds after last update

export function debouncedSync(testResults: Record<string, TestResult>) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(() => {
    syncToServer(testResults);
    debounceTimer = null;
  }, DEBOUNCE_DELAY);
}

/**
 * Force immediate sync (useful for manual sync button)
 */
export async function forceSync(testResults: Record<string, TestResult>): Promise<boolean> {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  return syncToServer(testResults);
}

/**
 * Check if sync is in progress
 */
export function isSyncInProgress(): boolean {
  return isSyncing;
}

