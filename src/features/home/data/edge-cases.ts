import type { EdgeCase } from '@/lib/types';

export const homeEdgeCases: EdgeCase[] = [
  {
    id: 'EC-HOME-001',
    title: 'Location Permission Denied',
    category: 'State',
    likelihood: 'High',
    impact: 'High',
    triggerCondition: 'User denies location permission when requested',
    expectedBehavior: 'App shows LocationPermissionsView explaining why location is needed and providing option to enable it',
    uiHandling: {
      errorMessage: 'location_permission or ios_location_permission locale string',
      recoveryOptions: [
        'Tap button to open device settings',
        'Use saved addresses instead',
        'Continue with default location',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/view/home_view.dart:231-237', 'home/view/home_permission_view.dart:23-63'],
      validationRules: ['currentLocation.latLng == defaultLatLng indicates permission denied or not obtained'],
    },
    relatedTestCases: ['TC-HOME-003', 'TC-HOME-004'],
  },
  {
    id: 'EC-HOME-002',
    title: 'Location Outside Delivery Coverage',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'User location is in an area where delivery service is not available',
    expectedBehavior: 'Show VoteLocationWidget or AddAddressView allowing user to request service expansion',
    uiHandling: {
      errorMessage: 'Out of coverage area message',
      recoveryOptions: [
        'Vote/notify to request service in area',
        'Add a different address within coverage',
        'Switch to pickup mode if available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:444-449', 'home/service/home_service.dart:124-151'],
      validationRules: ['checkLocationAvailable() returns false when OutOfCoverageException thrown'],
      apiErrorCodes: ['OutOfCoverageException'],
    },
    relatedTestCases: ['TC-HOME-009'],
  },
  {
    id: 'EC-HOME-003',
    title: 'Guest User Accessing My Orders',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'Non-logged-in user taps My Orders tab',
    expectedBehavior: 'Login prompt bottom sheet displayed instead of navigating to My Orders',
    uiHandling: {
      errorMessage: 'welcome! and my_order_login_desc locale strings',
      recoveryOptions: [
        'Tap "Login Now" to start login flow',
        'Dismiss and continue browsing as guest',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:418-434'],
      validationRules: ['UserManager.instance.isLoggedIn() must return true for My Orders access'],
    },
    relatedTestCases: ['TC-HOME-010', 'TC-HOME-011'],
  },
  {
    id: 'EC-HOME-004',
    title: 'Notification with Missing or Invalid Data',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Push notification received with malformed or missing payload fields',
    expectedBehavior: 'App should handle gracefully without crashing, may show generic notification dialog',
    uiHandling: {
      errorMessage: 'Notification title and body from payload',
      recoveryOptions: [
        'Show notification with available data',
        'Dismiss notification',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:82-214'],
      validationRules: ['Null checks on data fields before parsing', 'Try-catch around int.parse operations'],
    },
    relatedTestCases: ['TC-HOME-005'],
  },
  {
    id: 'EC-HOME-005',
    title: 'Spinner No Trials Remaining',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'User tries to spin wheel but trailsCount is 0',
    expectedBehavior: 'Spin button is disabled and shows (0) count, tapping shows message about no remaining trials',
    uiHandling: {
      errorMessage: 'you_dont_have_spin_trails locale string',
      recoveryOptions: [
        'Enter a promotional code for more trials',
        'Wait for promotional campaigns',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/spinner/view/spinner_view.dart:337-373', 'home/spinner/controller/spinner_viewmodel.dart:106'],
      validationRules: ['viewModel.model.trailsCount > 0 required to spin'],
    },
    relatedTestCases: ['TC-HOME-015'],
  },
  {
    id: 'EC-HOME-006',
    title: 'Guest User Trying to Spin Wheel',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Non-logged-in user attempts to use spinner feature',
    expectedBehavior: 'Login prompt displayed before allowing spin',
    uiHandling: {
      errorMessage: 'spinner_login_title locale string',
      recoveryOptions: [
        'Login to continue with spinner',
        'Dismiss and browse other features',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/spinner/view/spinner_view.dart:339-356'],
      validationRules: ['UserManager.instance.isLoggedIn() checked before spin'],
    },
    relatedTestCases: ['TC-HOME-014'],
  },
  {
    id: 'EC-HOME-007',
    title: 'Invalid Spin Code Entered',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User enters invalid or expired promotional code for spinner trials',
    expectedBehavior: 'Error message shown, trials count not updated',
    uiHandling: {
      errorMessage: 'API error message',
      recoveryOptions: [
        'Try a different code',
        'Check code for typos',
        'Dismiss and continue',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/spinner/controller/spinner_viewmodel.dart:90-103', 'home/service/home_service.dart:166-185'],
      validationRules: ['API validates code server-side'],
    },
    relatedTestCases: ['TC-HOME-016'],
  },
  {
    id: 'EC-HOME-008',
    title: 'Network Error During Location Check',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Network unavailable when checking location availability',
    expectedBehavior: 'Error handled gracefully, may default to showing home feed',
    uiHandling: {
      errorMessage: 'Network error message',
      recoveryOptions: [
        'Retry when network available',
        'Use cached data if available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/service/home_service.dart:124-151'],
      validationRules: ['Try-catch around network calls', 'Return true as default to allow basic functionality'],
    },
    relatedTestCases: ['TC-HOME-021'],
  },
  {
    id: 'EC-HOME-009',
    title: 'Spinner API Failure During Spin',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Network fails or API returns error during makeSpin call',
    expectedBehavior: 'Error dialog shown, wheel does not spin, trial not consumed',
    uiHandling: {
      errorMessage: 'Exception message shown in dialog',
      recoveryOptions: [
        'Try spinning again',
        'Check network connection',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/spinner/controller/spinner_viewmodel.dart:106-121'],
      validationRules: ['showMessageDialog called with error on exception'],
    },
    relatedTestCases: ['TC-HOME-022'],
  },
  {
    id: 'EC-HOME-010',
    title: 'App Resumed Multiple Times Quickly',
    category: 'Concurrency',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User rapidly switches between app and other apps',
    expectedBehavior: 'Location check only happens once per resume cycle, location update has 60 second cooldown',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'System handles automatically',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/view/home_view.dart:53-57', 'home/view/home_view.dart:106-111'],
      validationRules: ['_hasCheckedLocationOnResume flag prevents infinite permission loops', '_locationUpdateCooldown of 60 seconds prevents API spam'],
    },
    relatedTestCases: ['TC-HOME-020'],
  },
  {
    id: 'EC-HOME-011',
    title: 'Tutorial Coach Mark Active During Navigation',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User presses back or navigates while tutorial is showing',
    expectedBehavior: 'Tutorial is finished/dismissed before navigation proceeds',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Tutorial automatically dismissed',
        'User can restart tutorial from settings',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:468-471'],
      validationRules: ['Check if HomeFeedViewModel registered and tutorialCoachMark not null', 'Call finish() on coach mark'],
    },
    relatedTestCases: ['TC-HOME-012'],
  },
  {
    id: 'EC-HOME-012',
    title: 'Wallet Tab Hidden Based on Settings',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'App settings have hideUserWallet = true or invite feature disabled',
    expectedBehavior: 'Wallet/BeePay tab not shown in bottom navigation, indices adjusted',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Feature simply not available',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:66-67', 'home/widget_home_bottom_navigation_bar.dart:101-121'],
      validationRules: ['StaticData.settingModel.hideUserWallet and AppLinks.isInvite checked'],
    },
    relatedTestCases: ['TC-HOME-023'],
  },
  {
    id: 'EC-HOME-013',
    title: 'Deep Link Launch With Pending Notification',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'App launched from notification while deep link processing is also needed',
    expectedBehavior: 'Both are processed in order - notification handling after addresses loaded',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'System handles sequentially',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/view/home_view.dart:293-295'],
      validationRules: ['DeepLinkManager.instance.fromLaunch checked', 'Addresses loaded before notification processing'],
    },
    relatedTestCases: ['TC-HOME-007'],
  },
  {
    id: 'EC-HOME-014',
    title: 'Address Loading State on First Launch',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'App starting up and loading addresses/location for first time',
    expectedBehavior: 'Loading screen with location image and message shown while waiting',
    uiHandling: {
      errorMessage: 'location_wait_message and location_warning locale strings',
      recoveryOptions: [
        'Wait for loading to complete',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/view/home_view.dart:184-230'],
      validationRules: ['isLoading true and selectedAddressId null shows loading view'],
    },
    relatedTestCases: ['TC-HOME-024'],
  },
  {
    id: 'EC-HOME-015',
    title: 'Empty Spinner Rewards List',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'API returns spinner model with empty rewards array',
    expectedBehavior: 'Spinner wheel may not display properly or show empty state',
    uiHandling: {
      errorMessage: 'No explicit error handling',
      recoveryOptions: [
        'Refresh spinner page',
        'Contact support if persists',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/spinner/view/spinner_view.dart:79'],
      validationRules: ['viewModel.rewards.isNotEmpty checked before rendering wheel'],
    },
    relatedTestCases: ['TC-HOME-025'],
  },
  {
    id: 'EC-HOME-016',
    title: 'Notification Navigation to Restaurant with Voucher',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Notification contains both restaurant_id and voucher_code',
    expectedBehavior: 'Voucher is applied to cart before navigating to restaurant menu',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Voucher auto-applied',
        'User can remove voucher if needed',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:376-394'],
      validationRules: ['voucherCode set on currentBasket if present', 'initRestaurant called with withCheckNearest'],
    },
    relatedTestCases: ['TC-HOME-006'],
  },
  {
    id: 'EC-HOME-017',
    title: 'Returning to Cart After Location Permission',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'User was in cart, needed location permission, then granted it',
    expectedBehavior: 'After permission granted and navigating to home, user is returned to their cart',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Automatic navigation back to cart',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/view/home_permission_view.dart:50-60'],
      validationRules: ['StaticData.fromCart flag checked after navigation'],
    },
    relatedTestCases: ['TC-HOME-026'],
  },
  {
    id: 'EC-HOME-018',
    title: 'Bottom Sheet Already Open When Notification Arrives',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Push notification arrives while another bottom sheet is visible',
    expectedBehavior: 'Static flag tracks open state, new dialogs may queue or replace',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Dismiss current dialog first',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:218', 'home/viewmodel/home_viewmodel.dart:297'],
      validationRules: ['StaticData.isThereAnyBottomSheetOpen managed on open/close'],
    },
    relatedTestCases: ['TC-HOME-027'],
  },
  {
    id: 'EC-HOME-019',
    title: 'Scroll Controller Disposed During Back Navigation',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'HomeFeedViewModel scroll controller is null or disposed when back pressed',
    expectedBehavior: 'Try-catch prevents crash, falls through to exit logic',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'App handles gracefully',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:476-491'],
      validationRules: ['scrollController null check', 'Empty catch block for dispose exceptions'],
    },
    relatedTestCases: ['TC-HOME-013'],
  },
  {
    id: 'EC-HOME-020',
    title: 'Points Notification with String Instead of Number',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'new_point field in notification is a string representation of number',
    expectedBehavior: 'Value is parsed correctly whether string or number',
    uiHandling: {
      errorMessage: 'No error shown',
      recoveryOptions: [
        'Automatic type handling',
      ],
    },
    implementationNotes: {
      flutterFiles: ['home/viewmodel/home_viewmodel.dart:136-140', 'home/viewmodel/home_viewmodel.dart:205-208'],
      validationRules: ['Ternary checks if data is String then parses, otherwise uses directly'],
    },
    relatedTestCases: ['TC-HOME-008'],
  },
];


