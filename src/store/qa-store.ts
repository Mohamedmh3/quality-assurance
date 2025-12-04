import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestCase, TestStatus } from '@/lib/types';

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
  updateTestStatus: (testId: string, status: TestStatus) => void;
  updateTestNotes: (testId: string, notes: string) => void;
  updateStepResult: (testId: string, stepNumber: number, actualResult: string) => void;
  markTestComplete: (testId: string, testedBy: string) => void;
  resetTest: (testId: string) => void;
  resetAllTests: () => void;
  getTestResult: (testId: string) => TestResult | undefined;
  getProgress: (testCases: TestCase[]) => { completed: number; total: number; percentage: number };
}

const defaultTestResult: TestResult = {
  testId: '',
  status: 'Not Started',
  notes: '',
  actualResults: {},
};

export const useQAStore = create<QAStore>()(
  persist(
    (set, get) => ({
      testResults: {},

      updateTestStatus: (testId, status) =>
        set((state) => ({
          testResults: {
            ...state.testResults,
            [testId]: {
              ...defaultTestResult,
              ...state.testResults[testId],
              testId,
              status,
            },
          },
        })),

      updateTestNotes: (testId, notes) =>
        set((state) => ({
          testResults: {
            ...state.testResults,
            [testId]: {
              ...defaultTestResult,
              ...state.testResults[testId],
              testId,
              notes,
            },
          },
        })),

      updateStepResult: (testId, stepNumber, actualResult) =>
        set((state) => ({
          testResults: {
            ...state.testResults,
            [testId]: {
              ...defaultTestResult,
              ...state.testResults[testId],
              testId,
              actualResults: {
                ...(state.testResults[testId]?.actualResults || {}),
                [stepNumber]: actualResult,
              },
            },
          },
        })),

      markTestComplete: (testId, testedBy) =>
        set((state) => ({
          testResults: {
            ...state.testResults,
            [testId]: {
              ...defaultTestResult,
              ...state.testResults[testId],
              testId,
              status: 'Pass',
              lastTested: new Date().toISOString(),
              testedBy,
            },
          },
        })),

      resetTest: (testId) =>
        set((state) => {
          const { [testId]: _, ...rest } = state.testResults;
          return { testResults: rest };
        }),

      resetAllTests: () => set({ testResults: {} }),

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
    }),
    {
      name: 'beeorder-qa-checklist',
    }
  )
);

