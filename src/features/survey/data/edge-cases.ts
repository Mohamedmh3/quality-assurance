import { EdgeCase } from '@/lib/types';

export const surveyEdgeCases: EdgeCase[] = [
  {
    id: 'EC-SURVEY-001',
    title: 'Survey Fails to Load from API',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'API request to fetch surveys fails',
    expectedBehavior: 'App should continue with locally stored surveys, error should be handled silently',
    uiHandling: {
      errorMessage: 'Error is caught silently, app continues with cached surveys',
      recoveryOptions: [
        'Use locally stored surveys',
        'Retry API call on next app launch',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:70-99'],
      validationRules: ['Handle API errors gracefully'],
    },
    relatedTestCases: ['TC-SURVEY-008'],
  },
  {
    id: 'EC-SURVEY-002',
    title: 'No Survey Available for Page',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User navigates to page but no survey exists for that page',
    expectedBehavior: 'Survey bottom sheet should not appear',
    uiHandling: {
      errorMessage: 'No survey appears, user continues normal flow',
      recoveryOptions: [
        'Continue normal page flow',
        'No action needed',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:371-381'],
      validationRules: ['Check if survey exists before showing'],
    },
    relatedTestCases: ['TC-SURVEY-001'],
  },
  {
    id: 'EC-SURVEY-003',
    title: 'Single Choice Answer Not Persisting',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Selected answer is lost or not stored correctly',
    expectedBehavior: 'Answer should persist until survey is submitted or changed',
    uiHandling: {
      errorMessage: 'Answer might disappear or not be saved',
      recoveryOptions: [
        'Ensure answer is stored in userAnswerList',
        'Verify UI reflects stored answer',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:163-194'],
      validationRules: ['Maintain answer state correctly'],
    },
    relatedTestCases: ['TC-SURVEY-002'],
  },
  {
    id: 'EC-SURVEY-004',
    title: 'Multiple Choice Answers Not Persisting',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Multiple selected answers are lost or not stored correctly',
    expectedBehavior: 'All selected answers should persist',
    uiHandling: {
      errorMessage: 'Some answers might disappear',
      recoveryOptions: [
        'Ensure all answers are stored in userAnswerList',
        'Verify UI reflects all selections',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:197-218'],
      validationRules: ['Maintain multiple answer state correctly'],
    },
    relatedTestCases: ['TC-SURVEY-003'],
  },
  {
    id: 'EC-SURVEY-005',
    title: 'Rating Value Not Stored Correctly',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Rating value is not stored or stored incorrectly',
    expectedBehavior: 'Rating value should be stored as double and converted to int for answersIds',
    uiHandling: {
      errorMessage: 'Rating might not be saved or saved incorrectly',
      recoveryOptions: [
        'Verify ratingValue and answersIds are set correctly',
        'Ensure proper type conversion',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:221-257'],
      validationRules: ['Store rating as double, convert to int for answersIds'],
    },
    relatedTestCases: ['TC-SURVEY-004'],
  },
  {
    id: 'EC-SURVEY-006',
    title: 'Note Not Saved with Answer',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Note text is not associated with answer',
    expectedBehavior: 'Note should be saved with the answer using copyWith',
    uiHandling: {
      errorMessage: 'Note might not be saved or associated with wrong answer',
      recoveryOptions: [
        'Verify note is added using copyWith',
        'Ensure answer is updated correctly',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:260-274'],
      validationRules: ['Update answer with note using copyWith'],
    },
    relatedTestCases: ['TC-SURVEY-005'],
  },
  {
    id: 'EC-SURVEY-007',
    title: 'Survey Submission Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'API request to submit survey fails',
    expectedBehavior: 'Error should be caught, loading state cleared, survey remains available for retry',
    uiHandling: {
      errorMessage: 'Error dialog might appear or error is handled silently',
      recoveryOptions: [
        'Show error message',
        'Allow retry',
        'Keep survey available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:338-358'],
      validationRules: ['Handle submission errors gracefully'],
    },
    relatedTestCases: ['TC-SURVEY-006', 'TC-SURVEY-014'],
  },
  {
    id: 'EC-SURVEY-008',
    title: 'Survey Submission Times Out',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Survey submission request times out',
    expectedBehavior: 'Timeout should be handled, loading state cleared, user can retry',
    uiHandling: {
      errorMessage: 'Timeout error appears or request hangs',
      recoveryOptions: [
        'Handle timeout',
        'Show timeout message',
        'Allow retry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:338-358'],
      validationRules: ['Handle timeout scenarios'],
    },
    relatedTestCases: ['TC-SURVEY-006', 'TC-SURVEY-014'],
  },
  {
    id: 'EC-SURVEY-009',
    title: 'Submit Button Enabled with Empty Answers',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Submit button is enabled even when no questions are answered',
    expectedBehavior: 'Submit should check if userAnswerList is not empty before allowing submission',
    uiHandling: {
      errorMessage: 'Submit might be enabled incorrectly',
      recoveryOptions: [
        'Validate userAnswerList is not empty',
        'Show error message if empty',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:138-152'],
      validationRules: ['Check userAnswerList.isEmpty before submission'],
    },
    relatedTestCases: ['TC-SURVEY-007'],
  },
  {
    id: 'EC-SURVEY-010',
    title: 'Local Storage Fails to Save Surveys',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Local storage write operation fails',
    expectedBehavior: 'App should continue working, surveys might not persist after app restart',
    uiHandling: {
      errorMessage: 'Surveys might not be saved locally',
      recoveryOptions: [
        'Handle storage errors gracefully',
        'Continue with in-memory surveys',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:91-94'],
      validationRules: ['Handle local storage errors'],
    },
    relatedTestCases: ['TC-SURVEY-008'],
  },
  {
    id: 'EC-SURVEY-011',
    title: 'Local Storage Fails to Load Surveys',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Local storage read operation fails',
    expectedBehavior: 'App should start with empty survey list, fetch from API',
    uiHandling: {
      errorMessage: 'Surveys might not load from local storage',
      recoveryOptions: [
        'Start with empty list',
        'Fetch from API',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:75-85'],
      validationRules: ['Handle local storage read errors'],
    },
    relatedTestCases: ['TC-SURVEY-008'],
  },
  {
    id: 'EC-SURVEY-012',
    title: 'Text-Only Question Not Added to Answers',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Text-only questions are not automatically added to userAnswerList',
    expectedBehavior: 'Text-only questions should be added automatically when survey is displayed',
    uiHandling: {
      errorMessage: 'Text-only questions might not be included in submission',
      recoveryOptions: [
        'Ensure text-only questions are added in run() method',
        'Verify they are included in submission',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:117-128'],
      validationRules: ['Add text-only questions to userAnswerList automatically'],
    },
    relatedTestCases: ['TC-SURVEY-009'],
  },
  {
    id: 'EC-SURVEY-013',
    title: 'Bottom Sheet Can Be Dismissed',
    category: 'UI',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'User can dismiss survey bottom sheet by swiping or tapping outside',
    expectedBehavior: 'Bottom sheet should not be dismissible, PopScope should prevent dismissal',
    uiHandling: {
      errorMessage: 'Bottom sheet might be dismissible when it should not be',
      recoveryOptions: [
        'Ensure PopScope canPop is false',
        'Prevent swipe dismissal',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_bottom_sheet.dart:30-32'],
      validationRules: ['Prevent bottom sheet dismissal'],
    },
    relatedTestCases: ['TC-SURVEY-010'],
  },
  {
    id: 'EC-SURVEY-014',
    title: 'Completed Survey Appears Again',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Survey that was completed appears again after navigation',
    expectedBehavior: 'Completed surveys should be removed from feedbackModel and not appear again',
    uiHandling: {
      errorMessage: 'Survey might appear again after completion',
      recoveryOptions: [
        'Ensure survey is removed from feedbackModel',
        'Update local storage',
        'Verify removal in getHomeDatum',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:361-369'],
      validationRules: ['Remove survey from list after completion'],
    },
    relatedTestCases: ['TC-SURVEY-011'],
  },
  {
    id: 'EC-SURVEY-015',
    title: 'Survey Appears Immediately Without Delay',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Survey appears immediately when page loads instead of after delay',
    expectedBehavior: 'Survey should appear after 1 second delay',
    uiHandling: {
      errorMessage: 'Survey might appear too quickly',
      recoveryOptions: [
        'Ensure Future.delayed is used',
        'Verify delay duration',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:114'],
      validationRules: ['Add 1 second delay before showing survey'],
    },
    relatedTestCases: ['TC-SURVEY-012'],
  },
  {
    id: 'EC-SURVEY-016',
    title: 'Survey Appears for Guest Users',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Surveys are fetched or displayed for guest users',
    expectedBehavior: 'Surveys should only be fetched and displayed for logged-in users',
    uiHandling: {
      errorMessage: 'Surveys might appear for guest users',
      recoveryOptions: [
        'Check UserManager.instance.isLoggedIn() before fetching',
        'Prevent survey display for guests',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:71'],
      validationRules: ['Only fetch surveys for logged-in users'],
    },
    relatedTestCases: ['TC-SURVEY-013'],
  },
  {
    id: 'EC-SURVEY-017',
    title: 'Answer List Becomes Corrupted',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'userAnswerList becomes corrupted or contains invalid data',
    expectedBehavior: 'Answer list should be validated before submission',
    uiHandling: {
      errorMessage: 'Submission might fail or send invalid data',
      recoveryOptions: [
        'Validate answer list before submission',
        'Clear corrupted answers',
        'Reset answer list if needed',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:338-358'],
      validationRules: ['Validate answer list before submission'],
    },
    relatedTestCases: ['TC-SURVEY-006'],
  },
  {
    id: 'EC-SURVEY-018',
    title: 'Multiple Surveys for Same Page',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Multiple surveys exist for the same page name',
    expectedBehavior: 'First matching survey should be returned, or all surveys should be handled',
    uiHandling: {
      errorMessage: 'Multiple surveys might cause confusion',
      recoveryOptions: [
        'Return first matching survey',
        'Handle multiple surveys appropriately',
      ],
    },
    implementationNotes: {
      flutterFiles: ['survey_viewmodel.dart:371-381'],
      validationRules: ['Handle multiple surveys for same page'],
    },
    relatedTestCases: ['TC-SURVEY-001'],
  },
];

