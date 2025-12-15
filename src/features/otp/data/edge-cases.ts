import type { EdgeCase } from '../types';

export const otpEdgeCases: EdgeCase[] = [
  {
    id: 'EC-OTP-001',
    title: 'OTP Screen Fails to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'Screen initialization fails or navigation error occurs',
    expectedBehavior: 'Error message displayed or fallback navigation. User can retry.',
    uiHandling: {
      errorMessage: 'Error message: "Unable to load screen" or navigation error',
      recoveryOptions: [
        'User can navigate back',
        'User can retry navigation',
        'User can restart app',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_screen.dart:60-110'],
      validationRules: ['Screen initialization handled, error caught'],
    },
    relatedTestCases: ['TC-OTP-001'],
  },
  {
    id: 'EC-OTP-002',
    title: 'OTP Input Fields Not Responding',
    category: 'UI',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Input field widget fails to initialize or becomes unresponsive',
    expectedBehavior: 'Input fields show error state or app restarts input widget. User can retry.',
    uiHandling: {
      errorMessage: 'Input fields may not respond to taps or show error state',
      recoveryOptions: [
        'User can navigate back and return',
        'User can restart app',
        'User can use SMS autofill',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_text_form_widget.dart:20-74'],
      validationRules: ['Input widget initialization handled'],
    },
    relatedTestCases: ['TC-OTP-002'],
  },
  {
    id: 'EC-OTP-003',
    title: 'OTP State Update Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'State update fails when user types digits',
    expectedBehavior: 'State may not update but input still works. User can continue typing.',
    uiHandling: {
      errorMessage: 'No error shown, state simply may not update',
      recoveryOptions: [
        'User can continue typing',
        'User can navigate back and return',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:29-34'],
      validationRules: ['State update handled, fallback to controller'],
    },
    relatedTestCases: ['TC-OTP-003'],
  },
  {
    id: 'EC-OTP-004',
    title: 'Auto-Verification Fails to Trigger',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Auto-verification logic fails when 6 digits entered',
    expectedBehavior: 'Verification may not start automatically. User can manually trigger or re-enter code.',
    uiHandling: {
      errorMessage: 'No error shown, verification simply may not start',
      recoveryOptions: [
        'User can clear and re-enter code',
        'User can navigate back and return',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_screen.dart:186-194'],
      validationRules: ['Auto-verification logic checked, length validation'],
    },
    relatedTestCases: ['TC-OTP-004'],
  },
  {
    id: 'EC-OTP-005',
    title: 'SMS Autofill Fails',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'SMS autofill does not work (permissions, device support, or SMS format)',
    expectedBehavior: 'Autofill does not work but manual entry still available. User can type manually.',
    uiHandling: {
      errorMessage: 'No error shown, autofill simply does not work',
      recoveryOptions: [
        'User can enter code manually',
        'User can check SMS permissions',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_screen.dart:36-56'],
      validationRules: ['SMS autofill handled gracefully, manual entry always available'],
    },
    relatedTestCases: ['TC-OTP-005'],
  },
  {
    id: 'EC-OTP-006',
    title: 'Verify OTP API Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'verifyOtp API call fails (network error, timeout, or server error)',
    expectedBehavior: 'Error message displayed. Loading state cleared. User can retry.',
    uiHandling: {
      errorMessage: 'Error message from API or "Failed to verify code. Please try again."',
      recoveryOptions: [
        'User can retry with same code',
        'User can check internet connection',
        'User can resend new code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:95-106'],
      validationRules: ['Error caught in fold, error state emitted'],
      apiErrorCodes: ['Network errors, 500, timeout'],
    },
    relatedTestCases: ['TC-OTP-006', 'TC-OTP-012'],
  },
  {
    id: 'EC-OTP-007',
    title: 'Invalid OTP Code Format',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User enters code with wrong format (less than 6 digits, non-numeric)',
    expectedBehavior: 'Code validation prevents submission. User must enter 6 digits.',
    uiHandling: {
      errorMessage: 'No error shown, input simply does not accept non-numeric or incomplete codes',
      recoveryOptions: [
        'User must enter 6 digits',
        'User can clear and re-enter',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_text_form_widget.dart:52-73'],
      validationRules: ['Input accepts only numeric, length limited to 6'],
    },
    relatedTestCases: ['TC-OTP-003'],
  },
  {
    id: 'EC-OTP-008',
    title: 'Invalid OTP Code',
    category: 'Data',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User enters wrong OTP code (does not match sent code)',
    expectedBehavior: 'Error message displayed: "Invalid code" or similar. User can retry.',
    uiHandling: {
      errorMessage: 'Error message: "Invalid code" or "Code does not match"',
      recoveryOptions: [
        'User can try again with correct code',
        'User can resend new code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:95-106'],
      validationRules: ['API returns error for invalid codes'],
    },
    relatedTestCases: ['TC-OTP-007'],
  },
  {
    id: 'EC-OTP-009',
    title: 'OTP Code Already Used',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User enters OTP code that was already used',
    expectedBehavior: 'Error message displayed: "Code already used" or similar. User must resend.',
    uiHandling: {
      errorMessage: 'Error message: "This code has already been used" or "Code already verified"',
      recoveryOptions: [
        'User must resend new code',
        'User cannot reuse old code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:95-106'],
      validationRules: ['API returns error for used codes'],
    },
    relatedTestCases: ['TC-OTP-007'],
  },
  {
    id: 'EC-OTP-010',
    title: 'Resend OTP API Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'resendOtp API call fails (network error, timeout, or server error)',
    expectedBehavior: 'Error message displayed. Loading state cleared. User can retry.',
    uiHandling: {
      errorMessage: 'Error message from API or "Failed to resend code. Please try again."',
      recoveryOptions: [
        'User can retry resend',
        'User can check internet connection',
        'User can try phone call option',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:108-129'],
      validationRules: ['Error caught in fold, error state emitted'],
      apiErrorCodes: ['Network errors, 500, timeout'],
    },
    relatedTestCases: ['TC-OTP-008', 'TC-OTP-014'],
  },
  {
    id: 'EC-OTP-011',
    title: 'Resend Rate Limit Exceeded',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User requests too many resends in short time period',
    expectedBehavior: 'Error message displayed: "Too many requests" or similar. User must wait.',
    uiHandling: {
      errorMessage: 'Error message: "Too many requests. Please wait before resending."',
      recoveryOptions: [
        'User must wait before resending',
        'User can try again later',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:108-129'],
      validationRules: ['API returns rate limit error'],
    },
    relatedTestCases: ['TC-OTP-008'],
  },
  {
    id: 'EC-OTP-012',
    title: 'Phone Call Resend Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Phone call resend API call fails or call service unavailable',
    expectedBehavior: 'Error message displayed. User can try SMS resend instead.',
    uiHandling: {
      errorMessage: 'Error message: "Unable to send call" or "Call service unavailable"',
      recoveryOptions: [
        'User can try SMS resend',
        'User can retry call later',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:108-129'],
      validationRules: ['Error caught, SMS option still available'],
    },
    relatedTestCases: ['TC-OTP-009'],
  },
  {
    id: 'EC-OTP-013',
    title: 'Timer Fails to Start or Update',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Countdown timer fails to start or update after resend',
    expectedBehavior: 'Timer may not display but resend still works. User can resend again.',
    uiHandling: {
      errorMessage: 'No error shown, timer simply may not work',
      recoveryOptions: [
        'User can still resend',
        'User can navigate back and return',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:51-87'],
      validationRules: ['Timer logic handled, fallback if timer fails'],
    },
    relatedTestCases: ['TC-OTP-010'],
  },
  {
    id: 'EC-OTP-014',
    title: 'Back Navigation Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Back navigation logic fails or target screen unavailable',
    expectedBehavior: 'Error message displayed or fallback navigation. User can retry.',
    uiHandling: {
      errorMessage: 'Navigation error or "Unable to go back" message',
      recoveryOptions: [
        'User can retry back navigation',
        'User can restart app',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_screen.dart:138-144'],
      validationRules: ['Navigation error handled'],
    },
    relatedTestCases: ['TC-OTP-011'],
  },
  {
    id: 'EC-OTP-015',
    title: 'Network Timeout During Verification',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'verifyOtp API call times out',
    expectedBehavior: 'Timeout error displayed. Loading state cleared. User can retry.',
    uiHandling: {
      errorMessage: 'Error message: "Request timed out" or "Please check your connection"',
      recoveryOptions: [
        'User can retry verification',
        'User can check internet connection',
        'User can resend new code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:95-106'],
      validationRules: ['Timeout handled, error state emitted'],
      apiErrorCodes: ['Timeout errors'],
    },
    relatedTestCases: ['TC-OTP-012'],
  },
  {
    id: 'EC-OTP-016',
    title: 'Expired OTP Code',
    category: 'Data',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User enters OTP code that has expired',
    expectedBehavior: 'Error message displayed: "Code expired" or similar. User must resend.',
    uiHandling: {
      errorMessage: 'Error message: "This code has expired. Please request a new one."',
      recoveryOptions: [
        'User must resend new code',
        'User cannot use expired code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:95-106'],
      validationRules: ['API returns error for expired codes'],
    },
    relatedTestCases: ['TC-OTP-013'],
  },
  {
    id: 'EC-OTP-017',
    title: 'Multiple Rapid Verification Attempts',
    category: 'Concurrency',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User rapidly enters codes or verification triggered multiple times',
    expectedBehavior: 'Only one verification call made. Loading state prevents multiple submissions.',
    uiHandling: {
      errorMessage: 'No error, loading state prevents multiple calls',
      recoveryOptions: [
        'User waits for response',
        'User can cancel and retry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_screen.dart:186-194', 'otp_viewmodel.dart:95'],
      validationRules: ['Loading state prevents multiple submissions'],
    },
    relatedTestCases: ['TC-OTP-006'],
  },
  {
    id: 'EC-OTP-018',
    title: 'SMS Not Received',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'SMS with OTP code is not delivered to user',
    expectedBehavior: 'User can use resend option. Alternative phone call option available.',
    uiHandling: {
      errorMessage: 'No error shown, user simply does not receive SMS',
      recoveryOptions: [
        'User can resend via SMS',
        'User can request via phone call',
        'User can check phone number',
      ],
    },
    implementationNotes: {
      flutterFiles: ['otp_viewmodel.dart:108-129'],
      validationRules: ['Resend options available, phone call alternative'],
    },
    relatedTestCases: ['TC-OTP-008', 'TC-OTP-009'],
  },
];


