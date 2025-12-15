import { EdgeCase } from '@/lib/types';

export const userInfoEdgeCases: EdgeCase[] = [
  {
    id: 'EC-USER-INFO-001',
    title: 'Cities List Fails to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Cities list fails to load due to network error',
    expectedBehavior: 'Error message should appear with retry option',
    uiHandling: {
      errorMessage: 'City dropdown might be empty or error widget appears',
      recoveryOptions: [
        'Show error state and allow retry',
        'Display cached cities if available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:27-61'],
      validationRules: ['Handle network failures gracefully'],
    },
    relatedTestCases: ['TC-USER-INFO-006', 'TC-USER-INFO-007'],
  },
  {
    id: 'EC-USER-INFO-002',
    title: 'Existing User Info Fails to Load',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Existing user info fails to load',
    expectedBehavior: 'Form should still be usable with empty fields',
    uiHandling: {
      errorMessage: 'Form appears empty instead of pre-filled',
      recoveryOptions: [
        'Allow user to enter information manually',
        'Show error but allow form submission',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:27-61'],
      validationRules: ['Handle partial data loading'],
    },
    relatedTestCases: ['TC-USER-INFO-002', 'TC-USER-INFO-006'],
  },
  {
    id: 'EC-USER-INFO-003',
    title: 'Name Validation Allows Invalid Characters',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'User enters invalid characters in name field',
    expectedBehavior: 'Name field should reject or filter invalid characters',
    uiHandling: {
      errorMessage: 'Invalid characters might be accepted or cause validation issues',
      recoveryOptions: [
        'Use input formatters to restrict invalid characters',
        'Show validation error for invalid input',
      ],
    },
    implementationNotes: {
      flutterFiles: ['name_section_widget.dart', 'user_info_viewmodel.dart:98-104'],
      validationRules: ['Enforce name validation rules'],
    },
    relatedTestCases: ['TC-USER-INFO-003'],
  },
  {
    id: 'EC-USER-INFO-004',
    title: 'Gender Selection Becomes Unselected',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Gender selection is lost or becomes null',
    expectedBehavior: 'Gender should remain selected or show error',
    uiHandling: {
      errorMessage: 'Gender might become unselected unexpectedly',
      recoveryOptions: [
        'Maintain gender selection state',
        'Show validation error if gender is required but not selected',
      ],
    },
    implementationNotes: {
      flutterFiles: ['gender_section_widget.dart', 'user_info_viewmodel.dart:111-114'],
      validationRules: ['Maintain gender selection state'],
    },
    relatedTestCases: ['TC-USER-INFO-004'],
  },
  {
    id: 'EC-USER-INFO-005',
    title: 'City Selection Becomes Unselected',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'City selection is lost or becomes null',
    expectedBehavior: 'City should remain selected or show error',
    uiHandling: {
      errorMessage: 'City might become unselected unexpectedly',
      recoveryOptions: [
        'Maintain city selection state',
        'Show validation error if city is required but not selected',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:377-434', 'user_info_viewmodel.dart:116-119'],
      validationRules: ['Maintain city selection state'],
    },
    relatedTestCases: ['TC-USER-INFO-005'],
  },
  {
    id: 'EC-USER-INFO-006',
    title: 'Initial Data Loading Times Out',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Initial data loading takes too long or times out',
    expectedBehavior: 'Timeout error should appear with retry option',
    uiHandling: {
      errorMessage: 'Loading might hang indefinitely or timeout error appears',
      recoveryOptions: [
        'Show timeout error message',
        'Allow retry',
        'Display cached data if available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:27-61'],
      validationRules: ['Handle timeout scenarios'],
    },
    relatedTestCases: ['TC-USER-INFO-006', 'TC-USER-INFO-007'],
  },
  {
    id: 'EC-USER-INFO-007',
    title: 'Partial Data Loading',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Some data loads successfully but other data fails',
    expectedBehavior: 'Form should work with available data, show error for failed data',
    uiHandling: {
      errorMessage: 'Some fields might be available while others show error',
      recoveryOptions: [
        'Show partial data',
        'Display error for failed data',
        'Allow retry for failed data',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:27-61'],
      validationRules: ['Handle partial data loading'],
    },
    relatedTestCases: ['TC-USER-INFO-006'],
  },
  {
    id: 'EC-USER-INFO-008',
    title: 'Submission Fails After Validation',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Form submission fails after client-side validation passes',
    expectedBehavior: 'Error message should appear with retry option',
    uiHandling: {
      errorMessage: 'Error dialog appears showing error description',
      recoveryOptions: [
        'Show clear error message',
        'Allow retry',
        'Keep form data intact',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:63-92'],
      validationRules: ['Handle submission errors'],
    },
    relatedTestCases: ['TC-USER-INFO-008'],
  },
  {
    id: 'EC-USER-INFO-009',
    title: 'Navigation Flow Interrupted',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Navigation flow is interrupted or fails',
    expectedBehavior: 'User should be navigated to appropriate screen or error handled',
    uiHandling: {
      errorMessage: 'Navigation might fail or user might be stuck',
      recoveryOptions: [
        'Handle navigation errors gracefully',
        'Fallback to home screen',
        'Show error message',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:110-160'],
      validationRules: ['Handle navigation errors'],
    },
    relatedTestCases: ['TC-USER-INFO-009', 'TC-USER-INFO-010'],
  },
  {
    id: 'EC-USER-INFO-010',
    title: 'From Cart Flag Not Handled Correctly',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'User came from cart but navigation doesn\'t return to cart',
    expectedBehavior: 'User should be navigated back to cart if fromCart flag is true',
    uiHandling: {
      errorMessage: 'User might be navigated to home instead of cart',
      recoveryOptions: [
        'Check fromCart flag correctly',
        'Navigate to cart if flag is true',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:136-159'],
      validationRules: ['Handle fromCart flag correctly'],
    },
    relatedTestCases: ['TC-USER-INFO-010'],
  },
  {
    id: 'EC-USER-INFO-011',
    title: 'Intro Questions Check Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Intro questions check fails or times out',
    expectedBehavior: 'Navigation should continue without intro questions',
    uiHandling: {
      errorMessage: 'Intro questions check might fail silently',
      recoveryOptions: [
        'Continue navigation if check fails',
        'Skip intro questions screen',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:129-134'],
      validationRules: ['Handle intro questions check failure'],
    },
    relatedTestCases: ['TC-USER-INFO-011'],
  },
  {
    id: 'EC-USER-INFO-012',
    title: 'Language Update Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Language preference update fails',
    expectedBehavior: 'App should continue with current language',
    uiHandling: {
      errorMessage: 'Language might not update or error occurs',
      recoveryOptions: [
        'Continue with current language',
        'Handle language update errors gracefully',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:81-97'],
      validationRules: ['Handle language update errors'],
    },
    relatedTestCases: ['TC-USER-INFO-012'],
  },
  {
    id: 'EC-USER-INFO-013',
    title: 'Form Validation Updates Slowly',
    category: 'Performance',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Form validation takes too long to update',
    expectedBehavior: 'Validation should update immediately as user types or selects',
    uiHandling: {
      errorMessage: 'Validation might lag behind input',
      recoveryOptions: [
        'Optimize validation logic',
        'Debounce appropriately',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:98-104'],
      validationRules: ['Optimize validation performance'],
    },
    relatedTestCases: ['TC-USER-INFO-013'],
  },
  {
    id: 'EC-USER-INFO-014',
    title: 'City Dropdown Empty or Not Populated',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'City dropdown is empty or cities list is not populated',
    expectedBehavior: 'Error message should appear or dropdown should be disabled',
    uiHandling: {
      errorMessage: 'City dropdown might be empty or not clickable',
      recoveryOptions: [
        'Show error message',
        'Disable city dropdown',
        'Allow retry',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart:27-61'],
      validationRules: ['Check if cities list is empty'],
    },
    relatedTestCases: ['TC-USER-INFO-014'],
  },
  {
    id: 'EC-USER-INFO-015',
    title: 'Continue Button Tapped Multiple Times',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User taps Continue button multiple times rapidly',
    expectedBehavior: 'Only one submission request should be sent',
    uiHandling: {
      errorMessage: 'Multiple submission requests might be sent',
      recoveryOptions: [
        'Disable button during loading state',
        'Prevent multiple simultaneous requests',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_screen.dart:293-324', 'user_info_viewmodel.dart:73'],
      validationRules: ['Check loading state before sending request'],
    },
    relatedTestCases: ['TC-USER-INFO-001'],
  },
  {
    id: 'EC-USER-INFO-016',
    title: 'Form State Lost on Screen Rotation',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User rotates device while filling form',
    expectedBehavior: 'Form state should be preserved',
    uiHandling: {
      errorMessage: 'Form data might be lost on rotation',
      recoveryOptions: [
        'Preserve form state on rotation',
        'Restore form data after rotation',
      ],
    },
    implementationNotes: {
      flutterFiles: ['user_info_viewmodel.dart'],
      validationRules: ['Preserve state on configuration changes'],
    },
    relatedTestCases: ['TC-USER-INFO-001'],
  },
  {
    id: 'EC-USER-INFO-017',
    title: 'Gender Buttons Not Responding',
    category: 'UI',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Gender buttons fail to respond to taps',
    expectedBehavior: 'Gender buttons should respond and update selection',
    uiHandling: {
      errorMessage: 'Gender buttons might not respond or show incorrect state',
      recoveryOptions: [
        'Restart gender widget',
        'Show error message',
        'Allow alternative selection method',
      ],
    },
    implementationNotes: {
      flutterFiles: ['gender_section_widget.dart'],
      validationRules: ['Ensure gender buttons are responsive'],
    },
    relatedTestCases: ['TC-USER-INFO-001'],
  },
  {
    id: 'EC-USER-INFO-018',
    title: 'Name Field Loses Focus Unexpectedly',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Name input field loses focus while user is typing',
    expectedBehavior: 'Name field should maintain focus while user is typing',
    uiHandling: {
      errorMessage: 'Keyboard might close unexpectedly',
      recoveryOptions: [
        'Maintain focus while typing',
        'Allow user to refocus field',
      ],
    },
    implementationNotes: {
      flutterFiles: ['name_section_widget.dart'],
      validationRules: ['Handle focus management properly'],
    },
    relatedTestCases: ['TC-USER-INFO-001'],
  },
];


