// Global types for the documentation portal

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type UserType = 'End User' | 'Admin' | 'API Consumer' | 'System';
export type EdgeCaseCategory = 'Validation' | 'Network' | 'State' | 'Concurrency' | 'Data' | 'UI' | 'Performance';
export type Likelihood = 'High' | 'Medium' | 'Low';
export type TestCaseType = 'Functional' | 'Integration' | 'Accessibility' | 'Performance' | 'Security' | 'UI';
export type TestPriority = 'P0' | 'P1' | 'P2' | 'P3';
export type TestStatus = 'Not Started' | 'In Progress' | 'Pass' | 'Fail' | 'Blocked' | 'Skip';
export type ArchitectureType = 'MVVM' | 'Clean Architecture';
export type FeatureStatus = 'Stable' | 'Beta' | 'Legacy' | 'Deprecated';

export interface UseCaseStep {
  step: number;
  action: string;
  expectedResult: string;
  uiState: string;
  flutterFile?: string;
}

export interface UseCase {
  id: string;
  title: string;
  priority: Priority;
  userType: UserType;
  description: string;
  preconditions: string[];
  steps: UseCaseStep[];
  postconditions: string[];
  successCriteria: string[];
  relatedTestCases: string[];
}

export interface EdgeCaseUIHandling {
  errorMessage: string;
  recoveryOptions: string[];
  visualExample?: string;
}

export interface EdgeCaseImplementation {
  flutterFiles: string[];
  validationRules?: string[];
  apiErrorCodes?: string[];
}

export interface EdgeCase {
  id: string;
  title: string;
  category: EdgeCaseCategory;
  likelihood: Likelihood;
  impact: Priority;
  triggerCondition: string;
  expectedBehavior: string;
  uiHandling: EdgeCaseUIHandling;
  implementationNotes: EdgeCaseImplementation;
  relatedTestCases: string[];
}

export interface TestStep {
  step: number;
  instruction: string;
  detailedSteps?: string[]; // NEW: Step-by-step breakdown for non-technical users
  whatYouShouldSee?: string; // NEW: Visual description of what should appear
  expectedResult: string;
  actualResult?: string;
}

export interface FailureIssue {
  problem: string;
  whatToDo: string;
  technicalNote?: string; // Optional: Technical context for developers
  commonErrorMessages?: string[]; // Optional: List of actual error messages from code
}

export interface FailureHandling {
  commonIssues: FailureIssue[];
}

export interface TestCase {
  id: string;
  title: string;
  // NEW: Context fields for non-technical users
  whatYoureTesting?: string; // Plain-language description of what's being tested
  whyItMatters?: string; // Why this test is important
  estimatedTime?: string; // How long this test should take (e.g., "2-3 minutes")
  type: TestCaseType;
  priority: TestPriority;
  relatedUseCases: string[];
  relatedEdgeCases: string[];
  testSteps: TestStep[];
  // NEW: Success criteria
  successChecklist?: string[]; // List of things to verify (e.g., "✓ You see the dish name")
  // NEW: Failure handling
  ifThisFails?: FailureHandling; // What to do if the test fails
  preconditions: string[];
  testData?: string;
  automatable: boolean;
  status: TestStatus;
  notes: string;
  lastTested?: string;
  testedBy?: string;
}

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestSchema?: object;
  responseSchema?: object;
  errorCodes?: { code: string; description: string }[];
  authRequired: boolean;
}

export interface DataModel {
  name: string;
  description: string;
  flutterFile: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
}

export interface FlutterFile {
  path: string;
  purpose: string;
  keyMethods?: string[];
}

export interface FeatureData {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  architectureType: ArchitectureType;
  folderPath: string;
  files: FlutterFile[];
  dependencies: string[];
  useCaseCount: number;
  edgeCaseCount: number;
  icon: string;
  color: string;
}

