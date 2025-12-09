import { EdgeCase } from '@/lib/types';

export const phoneNumberEdgeCases: EdgeCase[] = [
  {
    id: 'EC-PHONE-001',
    title: 'No Previous Phone Numbers Available',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User opens phone number screen but has no previous phone numbers stored',
    expectedBehavior: 'Phone number entry form should appear directly without showing previous numbers list',
    uiHandling: {
      errorMessage: 'Previous numbers list might appear empty or cause UI issues',
      recoveryOptions: [
        'Hide previous numbers section if list is empty',
        'Show phone entry form directly',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:30-71'],
      validationRules: ['Check if userPhones list is empty before displaying'],
    },
    relatedTestCases: ['TC-PHONE-002'],
  },
  {
    id: 'EC-PHONE-002',
    title: 'Country Code Picker Fails to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Country code picker fails to load countries list due to network error',
    expectedBehavior: 'Error message should appear with retry option',
    uiHandling: {
      errorMessage: 'Picker might not open or show empty list',
      recoveryOptions: [
        'Show error state and allow retry',
        'Display cached countries if available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:30-71'],
      validationRules: ['Handle network failures gracefully'],
    },
    relatedTestCases: ['TC-PHONE-004'],
  },
  {
    id: 'EC-PHONE-003',
    title: 'Phone Number Validation Fails After Country Change',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Phone number becomes invalid when country code is changed',
    expectedBehavior: 'Phone number should be re-validated according to new country rules',
    uiHandling: {
      errorMessage: 'Validation might not update immediately or show incorrect state',
      recoveryOptions: [
        'Re-validate phone number immediately when country changes',
        'Clear validation state on country change',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:90-94', 'phone_number_text_field.dart'],
      validationRules: ['Update validation rules when country code changes'],
    },
    relatedTestCases: ['TC-PHONE-004'],
  },
  {
    id: 'EC-PHONE-004',
    title: 'Terms and Privacy Policy Fail to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Terms and privacy policy content fails to load from server',
    expectedBehavior: 'Error message should appear with retry option',
    uiHandling: {
      errorMessage: 'Bottom sheet might show empty content or fail to open',
      recoveryOptions: [
        'Show cached terms if available',
        'Allow retry',
        'Show error message',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:73-82'],
      validationRules: ['Handle network failures for terms loading'],
    },
    relatedTestCases: ['TC-PHONE-007'],
  },
  {
    id: 'EC-PHONE-005',
    title: 'Multiple Rapid Country Code Changes',
    category: 'Performance',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User rapidly changes country code multiple times',
    expectedBehavior: 'App should handle rapid changes smoothly',
    uiHandling: {
      errorMessage: 'App might lag or show incorrect country code',
      recoveryOptions: [
        'Debounce country code changes',
        'Show loading state during changes',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:90-94'],
      validationRules: ['Debounce country code updates'],
    },
    relatedTestCases: ['TC-PHONE-004'],
  },
  {
    id: 'EC-PHONE-006',
    title: 'Phone Number Input with Special Characters',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User tries to enter special characters in phone number field',
    expectedBehavior: 'Field should only accept digits',
    uiHandling: {
      errorMessage: 'Special characters might be accepted or cause validation issues',
      recoveryOptions: [
        'Use input formatters to restrict to digits only',
        'Show validation error for invalid input',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_text_field.dart'],
      validationRules: ['Filter input to digits only'],
    },
    relatedTestCases: ['TC-PHONE-008'],
  },
  {
    id: 'EC-PHONE-007',
    title: 'Submit Button Tapped Multiple Times',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User taps Submit button multiple times rapidly',
    expectedBehavior: 'Only one login request should be sent',
    uiHandling: {
      errorMessage: 'Multiple login requests might be sent',
      recoveryOptions: [
        'Disable button during loading state',
        'Prevent multiple simultaneous requests',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:96-119'],
      validationRules: ['Check loading state before sending request'],
    },
    relatedTestCases: ['TC-PHONE-001'],
  },
  {
    id: 'EC-PHONE-008',
    title: 'Confirmation Dialog Closed Without Action',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User closes confirmation dialog without confirming or editing',
    expectedBehavior: 'Dialog should close and return to phone entry screen',
    uiHandling: {
      errorMessage: 'Dialog might close but state might be inconsistent',
      recoveryOptions: [
        'Ensure state is reset when dialog is dismissed',
        'Return to phone entry screen',
      ],
    },
    implementationNotes: {
      flutterFiles: ['show_confirm_number_dialog.dart'],
      validationRules: ['Handle dialog dismissal properly'],
    },
    relatedTestCases: ['TC-PHONE-005'],
  },
  {
    id: 'EC-PHONE-009',
    title: 'Guest Button Tapped During Loading',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User taps Continue as Guest while initial data is loading',
    expectedBehavior: 'Guest mode should activate after loading completes or immediately',
    uiHandling: {
      errorMessage: 'Button might not respond or cause navigation issues',
      recoveryOptions: [
        'Handle guest navigation appropriately during loading',
        'Show loading indicator',
      ],
    },
    implementationNotes: {
      flutterFiles: ['guest_button_widget.dart'],
      validationRules: ['Handle navigation during loading state'],
    },
    relatedTestCases: ['TC-PHONE-003'],
  },
  {
    id: 'EC-PHONE-010',
    title: 'Previous Phone Number Selection with Network Error',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'User selects previous phone number but network fails during login',
    expectedBehavior: 'Error message should appear with retry option',
    uiHandling: {
      errorMessage: 'Error might not be handled gracefully',
      recoveryOptions: [
        'Show clear error message',
        'Allow retry',
        'Return to phone entry screen',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:96-119'],
      validationRules: ['Handle network errors during login'],
    },
    relatedTestCases: ['TC-PHONE-002', 'TC-PHONE-011'],
  },
  {
    id: 'EC-PHONE-011',
    title: 'Phone Number Field Maximum Length Exceeded',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User tries to enter more digits than maximum allowed',
    expectedBehavior: 'Field should prevent entering more than maximum digits',
    uiHandling: {
      errorMessage: 'Field might accept extra digits or show validation error',
      recoveryOptions: [
        'Enforce maximum length with input formatters',
        'Show validation error',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_text_field.dart'],
      validationRules: ['Enforce maxLength property'],
    },
    relatedTestCases: ['TC-PHONE-008'],
  },
  {
    id: 'EC-PHONE-012',
    title: 'Country Code Default Not Available',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Default country code from server is not in available countries list',
    expectedBehavior: 'Fallback to app default country code',
    uiHandling: {
      errorMessage: 'Invalid country code might be displayed',
      recoveryOptions: [
        'Validate default country code against available list',
        'Use fallback country code',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:30-71'],
      validationRules: ['Validate default country code'],
    },
    relatedTestCases: ['TC-PHONE-004'],
  },
  {
    id: 'EC-PHONE-013',
    title: 'Terms Bottom Sheet Cannot Be Dismissed',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User cannot dismiss terms bottom sheet without accepting',
    expectedBehavior: 'Bottom sheet should be dismissible or require explicit action',
    uiHandling: {
      errorMessage: 'Bottom sheet might be stuck or not dismissible',
      recoveryOptions: [
        'Allow dismissal',
        'Provide clear cancel option',
      ],
    },
    implementationNotes: {
      flutterFiles: ['open_terms_bottom_sheet.dart'],
      validationRules: ['Ensure bottom sheet is dismissible'],
    },
    relatedTestCases: ['TC-PHONE-007'],
  },
  {
    id: 'EC-PHONE-014',
    title: 'Phone Number Persists After App Restart',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Phone number entered persists in field after app is closed and reopened',
    expectedBehavior: 'Phone number field should be empty (security/privacy)',
    uiHandling: {
      errorMessage: 'Phone number might persist in field',
      recoveryOptions: [
        'Clear phone number field on screen initialization',
        'Do not persist phone number in state',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:42-50'],
      validationRules: ['Initialize phone number as empty string'],
    },
    relatedTestCases: ['TC-PHONE-001'],
  },
  {
    id: 'EC-PHONE-015',
    title: 'Device ID Generation Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Device ID cannot be generated for guest users',
    expectedBehavior: 'Fallback device ID should be generated or error handled',
    uiHandling: {
      errorMessage: 'Guest mode might fail or app might crash',
      recoveryOptions: [
        'Handle device ID generation failure gracefully',
        'Use fallback ID generation',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:33-37'],
      validationRules: ['Handle UDID generation errors'],
    },
    relatedTestCases: ['TC-PHONE-014'],
  },
  {
    id: 'EC-PHONE-016',
    title: 'Previous Numbers List Shows Wrong Numbers',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Previous phone numbers list shows numbers from different device',
    expectedBehavior: 'Only numbers associated with current device ID should be shown',
    uiHandling: {
      errorMessage: 'Numbers from other devices might appear',
      recoveryOptions: [
        'Ensure device ID matching for previous numbers',
        'Validate device ID before showing numbers',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_viewmodel.dart:30-71'],
      validationRules: ['Match device ID when fetching previous numbers'],
    },
    relatedTestCases: ['TC-PHONE-002'],
  },
  {
    id: 'EC-PHONE-017',
    title: 'Phone Number Validation Updates Slowly',
    category: 'Performance',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Phone number validation takes too long to update',
    expectedBehavior: 'Validation should update immediately as user types',
    uiHandling: {
      errorMessage: 'Validation might lag behind input',
      recoveryOptions: [
        'Optimize validation logic',
        'Debounce appropriately',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_text_field.dart', 'phone_number_viewmodel.dart:84-88'],
      validationRules: ['Optimize validation performance'],
    },
    relatedTestCases: ['TC-PHONE-001'],
  },
  {
    id: 'EC-PHONE-018',
    title: 'Country Code Picker Search Not Working',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Search functionality in country code picker fails',
    expectedBehavior: 'Search should filter countries as user types',
    uiHandling: {
      errorMessage: 'Search might not work or show all countries',
      recoveryOptions: [
        'Fix search functionality',
        'Allow manual scrolling',
      ],
    },
    implementationNotes: {
      flutterFiles: ['phone_number_text_field.dart'],
      validationRules: ['Ensure country picker search works'],
    },
    relatedTestCases: ['TC-PHONE-004'],
  },
];
