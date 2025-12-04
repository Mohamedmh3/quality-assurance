// Enhanced QA Testing Types for Non-Technical Testers

export type TestComplexity = 'Easy' | 'Medium' | 'Complex';
export type TestResultStatus = 'Pass' | 'Fail' | 'Blocked' | 'Not Sure';

export interface TestPrerequisites {
  whatYouNeed: string[];
  requiredTestData?: Record<string, string>;
}

export interface DetailedTestStep {
  stepNumber: number;
  instruction: string;
  howToDoIt: string[];
  whatYouShouldSee: string;
  referenceScreenshot?: string;
  videoGuide?: string;
  howToKnowItWorked: string[];
  commonMistakes?: {
    mistake: string;
    solution: string;
  }[];
}

export interface SuccessCriterion {
  criterion: string;
  howToVerify: string;
  visualCue: string;
}

export interface FailureScenario {
  whatHappened: string;
  severity: string;
  whatToReport: string;
  howToDocument: string;
}

export interface TroubleshootingIssue {
  problem: string;
  possibleCauses: string[];
  whatToDo: string[];
}

export interface EnhancedTestCase {
  // Original fields
  id: string;
  title: string;
  type: string;
  priority: string;
  testSteps?: Array<{ step: number; instruction: string; expectedResult: string }>;
  testData?: string;
  
  // NEW: Plain-language enhancements
  whatYoureTesting: string;
  whyItMatters: string;
  complexity: TestComplexity;
  estimatedTime: string;
  
  // NEW: Prerequisites
  prerequisites: TestPrerequisites;
  
  // Enhanced steps
  detailedSteps: DetailedTestStep[];
  
  // NEW: Success criteria
  successCriteria: {
    title: string;
    checklist: SuccessCriterion[];
  };
  
  // NEW: Failure indicators
  failureIndicators: {
    title: string;
    scenarios: FailureScenario[];
  };
  
  // NEW: Troubleshooting
  troubleshooting: {
    title: string;
    commonIssues: TroubleshootingIssue[];
  };
  
  // Original fields (kept for compatibility)
  relatedUseCases?: string[];
  relatedEdgeCases?: string[];
  preconditions?: string[];
  automatable?: boolean;
}

export interface TestEnvironmentSetup {
  accountSetup: {
    title: string;
    steps: {
      step: string;
      instructions: string[];
      estimatedTime: string;
      importantNote?: string;
    }[];
  };
  testData: {
    title: string;
    dataTable: {
      whatItIsFor: string;
      dataToUse: string;
      whereToFindIt: string;
    }[];
  };
  deviceRequirements: {
    title: string;
    requirements: {
      requirement: string;
      minimum: string;
      howToCheck: string;
    }[];
  };
}

export interface TestScenario {
  scenarioId: string;
  scenarioName: string;
  scenarioDescription: string;
  userStory: string;
  context: {
    customerType: string;
    customerGoal: string;
    businessImportance: string;
    realWorldExample: string;
  };
  beforeYouBegin: string[];
  testCases: string[];
  scenarioSuccess: string;
  scenarioReflection: {
    questions: string[];
    purpose: string;
  };
}

export interface VisualScreenReference {
  screenName: string;
  screenshot: string;
  annotations: {
    element: string;
    location: string;
    whatToCheck: string;
  }[];
}

export interface CommonUIElement {
  element: string;
  description: string;
  whenYouSeeIt: string;
  howLongItShouldLast?: string;
  whatToDo?: string;
  image?: string;
}

export interface TesterFAQ {
  question: string;
  answer: string;
  importance: 'high' | 'medium' | 'low';
}

export interface BugReportData {
  whatWentWrong: string;
  whatExpected: string;
  canReproduce: 'yes' | 'sometimes' | 'once';
  importance: 'critical' | 'high' | 'medium' | 'low';
  screenshots: File[];
}

export interface TestSession {
  sessionId: string;
  testerName: string;
  startedAt: string;
  deviceInfo: {
    deviceType: string;
    osVersion: string;
    appVersion: string;
  };
}

export interface TestProgress {
  testsTotal: number;
  testsCompleted: number;
  testsPassed: number;
  testsFailed: number;
  testsBlocked: number;
  percentComplete: number;
  estimatedTimeRemaining: string;
}

