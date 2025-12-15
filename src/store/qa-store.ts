import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestCase, TestStatus } from '@/lib/types';
import { readQAStorage } from '@/lib/qa-storage';
import { debouncedSync, forceSync } from '@/lib/qa-sync';

interface TestResult {
  testId: string;
  status: TestStatus;
  notes: string;
  lastTested?: string;
  testedBy?: string;
  actualResults: Record<number, string>;
}

interface QAStore {
  testResults: Record<string, TestResult>;
  isInitialized: boolean;
  isLoading: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  initialize: () => Promise<void>;
  updateTestStatus: (testId: string, status: TestStatus) => void;
  updateTestNotes: (testId: string, notes: string) => void;
  updateStepResult: (testId: string, stepNumber: number, actualResult: string) => void;
  markTestComplete: (testId: string, testedBy: string) => void;
  resetTest: (testId: string) => void;
  resetAllTests: () => void;
  getTestResult: (testId: string) => TestResult | undefined;
  getProgress: (testCases: TestCase[]) => { completed: number; total: number; percentage: number };
  manualSync: () => Promise<void>;
}

const defaultTestResult: TestResult = {
  testId: '',
  status: 'Not Started',
  notes: '',
  actualResults: {},
};

// Helper function to sync after state update
const syncAfterUpdate = (testResults: Record<string, TestResult>) => {
  // Debounced sync to avoid too many requests
  debouncedSync(testResults);
};

export const useQAStore = create<QAStore>()(
  persist(
    (set, get) => ({
      testResults: {},
      isInitialized: false,
      isLoading: false,
      syncStatus: 'idle',

      initialize: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });
        try {
          const storageData = await readQAStorage();
          
          // Merge with existing localStorage data (localStorage takes precedence for user's current session)
          const currentResults = get().testResults;
          const mergedResults = {
            ...storageData.testResults,
            ...currentResults, // Local changes override server data
          };

          set({
            testResults: mergedResults,
            isInitialized: true,
            isLoading: false,
          });

          // Sync current state to server if we have local changes
          if (Object.keys(currentResults).length > 0) {
            syncAfterUpdate(mergedResults);
          }
        } catch (error) {
          console.error('Failed to initialize QA store:', error);
          set({ isLoading: false, isInitialized: true });
        }
      },

      updateTestStatus: (testId, status) => {
        const newState = {
          testResults: {
            ...get().testResults,
            [testId]: {
              ...defaultTestResult,
              ...get().testResults[testId],
              testId,
              status,
            },
          },
        };
        set(newState);
        syncAfterUpdate(newState.testResults);
      },

      updateTestNotes: (testId, notes) => {
        const newState = {
          testResults: {
            ...get().testResults,
            [testId]: {
              ...defaultTestResult,
              ...get().testResults[testId],
              testId,
              notes,
            },
          },
        };
        set(newState);
        syncAfterUpdate(newState.testResults);
      },

      updateStepResult: (testId, stepNumber, actualResult) => {
        const newState = {
          testResults: {
            ...get().testResults,
            [testId]: {
              ...defaultTestResult,
              ...get().testResults[testId],
              testId,
              actualResults: {
                ...(get().testResults[testId]?.actualResults || {}),
                [stepNumber]: actualResult,
              },
            },
          },
        };
        set(newState);
        syncAfterUpdate(newState.testResults);
      },

      markTestComplete: (testId, testedBy) => {
        const passStatus: TestStatus = 'Pass';
        const newState = {
          testResults: {
            ...get().testResults,
            [testId]: {
              ...defaultTestResult,
              ...get().testResults[testId],
              testId,
              status: passStatus,
              lastTested: new Date().toISOString(),
              testedBy,
            },
          },
        };
        set(newState);
        syncAfterUpdate(newState.testResults);
      },

      resetTest: (testId) => {
        const newState = {
          testResults: (() => {
            const { [testId]: _, ...rest } = get().testResults;
            return rest;
          })(),
        };
        set(newState);
        syncAfterUpdate(newState.testResults);
      },

      resetAllTests: () => {
        set({ testResults: {} });
        syncAfterUpdate({});
      },

      getTestResult: (testId) => get().testResults[testId],

      getProgress: (testCases) => {
        const results = get().testResults;
        const completed = testCases.filter(
          (tc) => results[tc.id]?.status === 'Pass' || results[tc.id]?.status === 'Fail'
        ).length;
        return {
          completed,
          total: testCases.length,
          percentage: testCases.length > 0 ? Math.round((completed / testCases.length) * 100) : 0,
        };
      },

      manualSync: async () => {
        set({ syncStatus: 'syncing' });
        try {
          const success = await forceSync(get().testResults);
          set({ syncStatus: success ? 'success' : 'error' });
          
          // Reset status after 3 seconds
          setTimeout(() => {
            set({ syncStatus: 'idle' });
          }, 3000);
        } catch (error) {
          console.error('Manual sync failed:', error);
          set({ syncStatus: 'error' });
          setTimeout(() => {
            set({ syncStatus: 'idle' });
          }, 3000);
        }
      },
    }),
    {
      name: 'beeorder-qa-checklist',
    }
  )
);
