import type { EdgeCase } from '../types';

export const friendInviteEdgeCases: EdgeCase[] = [
  {
    id: 'EC-FRIEND-INVITE-001',
    title: 'Friend Invite Screen Fails to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'Screen initialization fails or navigation error occurs',
    expectedBehavior: 'Error message displayed or fallback navigation. User can retry or continue.',
    uiHandling: {
      errorMessage: 'Error message: "Unable to load screen" or navigation error',
      recoveryOptions: [
        'User can navigate back',
        'User can retry navigation',
        'User can restart app',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_screen.dart:35-79'],
      validationRules: ['Screen initialization handled, error caught'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-001'],
  },
  {
    id: 'EC-FRIEND-INVITE-002',
    title: 'Input Field Not Responding',
    category: 'UI',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Input field widget fails to initialize or becomes unresponsive',
    expectedBehavior: 'Input field shows error state or app restarts input widget. User can retry.',
    uiHandling: {
      errorMessage: 'Input field may not respond to taps or show error state',
      recoveryOptions: [
        'User can navigate back and return',
        'User can restart app',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['code_section_widget.dart:22-52'],
      validationRules: ['Input widget initialization handled'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-002'],
  },
  {
    id: 'EC-FRIEND-INVITE-003',
    title: 'Code Validation Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Validation logic fails or state update fails',
    expectedBehavior: 'Apply button remains disabled or shows error. User can retry entering code.',
    uiHandling: {
      errorMessage: 'Button state may not update correctly',
      recoveryOptions: [
        'User can clear and re-enter code',
        'User can navigate back and return',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:20-22', 'code_section_widget.dart:43-49'],
      validationRules: ['Validation state properly managed'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-003'],
  },
  {
    id: 'EC-FRIEND-INVITE-004',
    title: 'Apply Code API Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'applyInviteCode API call fails (network error, timeout, or server error)',
    expectedBehavior: 'Error message displayed. Loading state cleared. User can retry.',
    uiHandling: {
      errorMessage: 'Error message from API or "Failed to apply code. Please try again."',
      recoveryOptions: [
        'User can retry applying code',
        'User can check internet connection',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:24-47'],
      validationRules: ['Error caught in fold, error state emitted'],
      apiErrorCodes: ['Network errors, 500, timeout'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-004', 'TC-FRIEND-INVITE-009'],
  },
  {
    id: 'EC-FRIEND-INVITE-005',
    title: 'Invalid Code Format',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'User enters code with invalid format (special characters, too short, too long)',
    expectedBehavior: 'Code validation fails. Apply button remains disabled. User can correct code.',
    uiHandling: {
      errorMessage: 'No error shown, button simply remains disabled',
      recoveryOptions: [
        'User can correct code format',
        'User can clear and re-enter',
      ],
    },
    implementationNotes: {
      flutterFiles: ['code_section_widget.dart:43-49'],
      validationRules: ['Code format validated before enabling button'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-003'],
  },
  {
    id: 'EC-FRIEND-INVITE-006',
    title: 'Code Already Used',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User enters a code that has already been used by another user',
    expectedBehavior: 'Error message displayed: "Code already used" or similar. User can try different code.',
    uiHandling: {
      errorMessage: 'Error message: "This code has already been used" or "Code already redeemed"',
      recoveryOptions: [
        'User can try a different code',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:41-47'],
      validationRules: ['API returns error for used codes'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-010'],
  },
  {
    id: 'EC-FRIEND-INVITE-007',
    title: 'Code Expired',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User enters a code that has expired',
    expectedBehavior: 'Error message displayed: "Code expired" or similar. User can try different code.',
    uiHandling: {
      errorMessage: 'Error message: "This code has expired" or "Code is no longer valid"',
      recoveryOptions: [
        'User can try a different code',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:41-47'],
      validationRules: ['API returns error for expired codes'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-005'],
  },
  {
    id: 'EC-FRIEND-INVITE-008',
    title: 'Empty Code Submission Attempt',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'User tries to submit empty code (should be prevented by UI)',
    expectedBehavior: 'Apply button remains disabled. No API call made. User must enter code.',
    uiHandling: {
      errorMessage: 'No error shown, button simply disabled',
      recoveryOptions: [
        'User must enter code to proceed',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:24-37', 'add_invite_friend_code_screen.dart:216'],
      validationRules: ['Empty code validation prevents submission'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-006'],
  },
  {
    id: 'EC-FRIEND-INVITE-009',
    title: 'Skip Navigation Fails',
    category: 'Navigation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Skip navigation logic fails or target screen unavailable',
    expectedBehavior: 'Error message displayed or fallback navigation. User can retry skip or enter code.',
    uiHandling: {
      errorMessage: 'Navigation error or "Unable to continue" message',
      recoveryOptions: [
        'User can retry skip',
        'User can enter code instead',
        'User can navigate back',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_screen.dart:278-313'],
      validationRules: ['Navigation error handled'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-007'],
  },
  {
    id: 'EC-FRIEND-INVITE-010',
    title: 'Success Navigation Fails',
    category: 'Navigation',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Code applied successfully but navigation after success fails',
    expectedBehavior: 'Success state maintained. Error message shown. User can manually navigate.',
    uiHandling: {
      errorMessage: 'Navigation error or "Unable to continue" message',
      recoveryOptions: [
        'User can manually navigate',
        'User can restart app',
        'User can check if code was applied',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_screen.dart:81-116'],
      validationRules: ['Navigation error handled, success state preserved'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-008'],
  },
  {
    id: 'EC-FRIEND-INVITE-011',
    title: 'Network Timeout During Application',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'applyInviteCode API call times out',
    expectedBehavior: 'Timeout error displayed. Loading state cleared. User can retry.',
    uiHandling: {
      errorMessage: 'Error message: "Request timed out" or "Please check your connection"',
      recoveryOptions: [
        'User can retry applying code',
        'User can check internet connection',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:41-47'],
      validationRules: ['Timeout handled, error state emitted'],
      apiErrorCodes: ['Timeout errors'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-009'],
  },
  {
    id: 'EC-FRIEND-INVITE-012',
    title: 'Code Not Found',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User enters a code that does not exist in the system',
    expectedBehavior: 'Error message displayed: "Code not found" or "Invalid code". User can try different code.',
    uiHandling: {
      errorMessage: 'Error message: "Code not found" or "Invalid code"',
      recoveryOptions: [
        'User can try a different code',
        'User can skip code entry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_viewmodel.dart:41-47'],
      validationRules: ['API returns error for non-existent codes'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-005'],
  },
  {
    id: 'EC-FRIEND-INVITE-013',
    title: 'Multiple Rapid Apply Attempts',
    category: 'Concurrency',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User rapidly taps Apply button multiple times',
    expectedBehavior: 'Only one API call made. Loading state prevents multiple submissions. No duplicate rewards.',
    uiHandling: {
      errorMessage: 'No error, button disabled during loading prevents multiple taps',
      recoveryOptions: [
        'User waits for response',
        'User can cancel and retry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['add_invite_friend_code_screen.dart:216', 'add_invite_friend_code_viewmodel.dart:39'],
      validationRules: ['Loading state prevents multiple submissions'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-004'],
  },
  {
    id: 'EC-FRIEND-INVITE-014',
    title: 'Code Input Field Loses Focus Unexpectedly',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Input field loses focus while user is typing',
    expectedBehavior: 'Field can be refocused. Text remains. User can continue typing.',
    uiHandling: {
      errorMessage: 'No error, field simply loses focus',
      recoveryOptions: [
        'User can tap field again to refocus',
        'User can continue typing',
      ],
    },
    implementationNotes: {
      flutterFiles: ['code_section_widget.dart:22-52'],
      validationRules: ['Focus management handled'],
    },
    relatedTestCases: ['TC-FRIEND-INVITE-002'],
  },
];

