import type { EdgeCase } from '../types';

export const splashEdgeCases: EdgeCase[] = [
  // ============================================
  // NETWORK & CONNECTIVITY EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-001',
    title: 'No Internet Connection on App Launch',
    category: 'Network',
    likelihood: 'High',
    impact: 'Critical',
    triggerCondition: 'User opens the app with no WiFi or mobile data connection',
    expectedBehavior: 'Show retry dialog with "No Connection" message and "Retry" button that cannot be dismissed',
    uiHandling: {
      errorMessage: 'no_connection (localized)',
      recoveryOptions: [
        'User taps "Retry" button after reconnecting to internet',
        'App checks connection again and proceeds if successful'
      ],
      visualExample: 'Bottom sheet with error icon, message, and single "Retry" button'
    },
    implementationNotes: {
      flutterFiles: [
        'splash/view_model/splash_viewmodel.dart:161-177',
        'presentation/splash/splash_screen.dart:129-144'
      ],
      validationRules: [
        'NoInternetException caught from authService.getAppSetting()',
        'isDismissible: false prevents bypassing the retry'
      ],
      apiErrorCodes: ['NETWORK_ERROR', 'NO_INTERNET']
    },
    relatedTestCases: ['TC-SPLASH-012', 'TC-SPLASH-013']
  },
  {
    id: 'EC-SPLASH-002',
    title: 'Server Timeout During Settings Load',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Server takes too long to respond when fetching app settings',
    expectedBehavior: 'Retry the request automatically or show timeout error with retry option',
    uiHandling: {
      errorMessage: 'Connection timed out',
      recoveryOptions: [
        'Automatic retry after timeout',
        'Manual retry via button if auto-retry fails'
      ],
      visualExample: 'Same retry dialog as no internet, but with timeout-specific message'
    },
    implementationNotes: {
      flutterFiles: [
        'service/authentication_service.dart:402-409',
        'presentation/splash/splash_viewmodel.dart:50-62'
      ],
      validationRules: [
        'TimeoutException caught with automatic retry logic',
        'requestTimeout and responseTimeout from settings control duration'
      ],
      apiErrorCodes: ['TIMEOUT', '504']
    },
    relatedTestCases: ['TC-SPLASH-025']
  },
  {
    id: 'EC-SPLASH-003',
    title: 'Server Error (500) During Launch',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'Server returns 500 Internal Server Error when fetching settings',
    expectedBehavior: 'Show generic error with retry option',
    uiHandling: {
      errorMessage: 'Something went wrong. Please try again.',
      recoveryOptions: [
        'Retry loading settings',
        'Wait for server to recover'
      ],
      visualExample: 'Error bottom sheet with retry button'
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:54-57',
        'data/repository/auth_repository.dart:211-219'
      ],
      validationRules: [
        'Generic exception handling shows error message from failure'
      ],
      apiErrorCodes: ['500', 'SERVER_ERROR']
    },
    relatedTestCases: ['TC-SPLASH-026']
  },
  {
    id: 'EC-SPLASH-004',
    title: 'Intermittent Connection Loss',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Connection drops briefly during background data loading (FCM, splash assets, etc.)',
    expectedBehavior: 'Background tasks fail silently without blocking main flow; app continues normally',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'App proceeds without the failed data',
        'Data will be retried on next launch'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_config_service.dart:37-39',
        'service/app_config_service.dart:101-103',
        'presentation/splash/splash_viewmodel.dart:103-105'
      ],
      validationRules: [
        'try-catch blocks around non-critical operations',
        'AppLogger.print(e) logs errors without crashing'
      ]
    },
    relatedTestCases: ['TC-SPLASH-027']
  },

  // ============================================
  // AUTHENTICATION & TOKEN EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-005',
    title: 'Token Exists But User Info is Incomplete',
    category: 'State',
    likelihood: 'High',
    impact: 'High',
    triggerCondition: 'User logged in previously but never completed profile (name, gender, city missing)',
    expectedBehavior: 'Navigate to User Info screen instead of Home to complete profile',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User completes profile and proceeds to home'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:194-199',
        'splash/view_model/splash_viewmodel.dart:813-819'
      ],
      validationRules: [
        'Check: UserManager.instance.user?.name == null || name == ""',
        'Check: UserManager.instance.user?.gender == null',
        'Check: UserManager.instance.user?.city == null'
      ]
    },
    relatedTestCases: ['TC-SPLASH-007']
  },
  {
    id: 'EC-SPLASH-006',
    title: 'Mobile Number Stored But No Token',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User started login (entered phone) but never verified OTP, or session expired',
    expectedBehavior: 'Navigate to OTP screen to complete verification',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User receives new OTP and completes verification'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:186-189',
        'splash/view_model/splash_viewmodel.dart:771-773'
      ],
      validationRules: [
        'token.isEmpty && mobileNumber.isNotEmpty → Navigate to OTP_VIEW'
      ]
    },
    relatedTestCases: ['TC-SPLASH-006']
  },
  {
    id: 'EC-SPLASH-007',
    title: 'Stored Token is Invalid or Expired',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Token stored locally is no longer valid on the server (expired or revoked)',
    expectedBehavior: 'API calls will fail with 401, user should be logged out and redirected to login',
    uiHandling: {
      errorMessage: 'Session expired. Please log in again.',
      recoveryOptions: [
        'User re-authenticates via phone number'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'data/repository/auth_repository.dart:61-67',
        'core/init/network/http_manager.dart'
      ],
      validationRules: [
        '401 response triggers UserManager.instance.logOut()',
        'LocaleManager.instance.clearAll() clears stored data'
      ],
      apiErrorCodes: ['401', 'UNAUTHORIZED', 'TOKEN_EXPIRED']
    },
    relatedTestCases: ['TC-SPLASH-028']
  },
  {
    id: 'EC-SPLASH-008',
    title: 'Corrupted User Data in Local Storage',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'User info JSON in SharedPreferences is malformed or corrupted',
    expectedBehavior: 'Return null from getUserInfo(), treat as no user data (may redirect to profile)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'App treats as incomplete profile',
        'User may need to re-enter profile information'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'data/local/auth_local_storage.dart:21-25',
        'data/repository/auth_repository.dart:305-323'
      ],
      validationRules: [
        'LocaleManager.getJson() returns null if parsing fails',
        '_syncUserFromLocal() handles null gracefully'
      ]
    },
    relatedTestCases: ['TC-SPLASH-029']
  },

  // ============================================
  // APP VERSION & UPDATE EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-009',
    title: 'Forced Update Required (update_type = 2)',
    category: 'State',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'Server returns isValidVersion.status = false with update_type = 2',
    expectedBehavior: 'Navigate to update screen that cannot be bypassed',
    uiHandling: {
      errorMessage: 'Update Required - A new version is available',
      recoveryOptions: [
        'User must update app from store to continue'
      ],
      visualExample: 'Full-screen update page with prominent "Update" button linking to app store'
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:113-119',
        'splash/view_model/splash_viewmodel.dart:591-597'
      ],
      validationRules: [
        'checkAppVersionUpdateType() returns 2 for forced update',
        'NavigationConstants.UPDATE_APP route used'
      ]
    },
    relatedTestCases: ['TC-SPLASH-008', 'TC-SPLASH-009']
  },
  {
    id: 'EC-SPLASH-010',
    title: 'Soft Update Available (update_type = 1)',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Server returns isValidVersion.status = false with update_type = 1',
    expectedBehavior: 'Show dismissable dialog with update suggestion',
    uiHandling: {
      errorMessage: 'Update Available - A new version is available with improvements',
      recoveryOptions: [
        'User taps "Update" to go to store',
        'User taps "No Thanks" to continue using current version'
      ],
      visualExample: 'Bottom sheet with Lottie animation, message, "Update" and "No Thanks" buttons'
    },
    implementationNotes: {
      flutterFiles: [
        'splash/view_model/splash_viewmodel.dart:599-660',
        'presentation/splash/splash_viewmodel.dart:120-123'
      ],
      validationRules: [
        'checkAppVersionUpdateType() returns 1 for soft update',
        'Dialog can be dismissed with "No Thanks"',
        'App continues after dialog regardless of choice'
      ]
    },
    relatedTestCases: ['TC-SPLASH-010', 'TC-SPLASH-011']
  },
  {
    id: 'EC-SPLASH-011',
    title: 'Version Check Returns Null',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'isValidVersion is null or status is true (no update needed)',
    expectedBehavior: 'Continue normal flow without showing any update prompt',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:86-91'
      ],
      validationRules: [
        'if (isValidVersion == null || isValidVersion.status == true) return null'
      ]
    },
    relatedTestCases: ['TC-SPLASH-030']
  },

  // ============================================
  // FIRST-TIME USER EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-012',
    title: 'First App Launch (Fresh Install)',
    category: 'State',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'IS_FIRST_APP preference is false (never set)',
    expectedBehavior: 'Show BeeIntro onboarding screens before proceeding',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User completes intro and is marked as having seen it'
      ],
      visualExample: 'Full-screen onboarding with swipeable pages and "Get Started" button'
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:153-158',
        'presentation/splash/splash_screen.dart:176-181',
        'splash/splash_view.dart:52-54'
      ],
      validationRules: [
        'isFirstVisitRegistered() checks IS_FIRST_APP bool preference',
        'shouldShowFirstVisitUI returns opposite of isFirstVisitRegistered'
      ]
    },
    relatedTestCases: ['TC-SPLASH-003', 'TC-SPLASH-004']
  },
  {
    id: 'EC-SPLASH-013',
    title: 'User Kills App During Intro',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User force-closes app while viewing BeeIntro screens',
    expectedBehavior: 'Intro will show again on next launch (flag not yet set)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User sees intro again and can complete it'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:178-180',
        'splash/splash_view.dart:98-101'
      ],
      validationRules: [
        'IS_FIRST_APP is only set to true in the callback after user completes intro',
        'Callback must be triggered for flag to be saved'
      ]
    },
    relatedTestCases: ['TC-SPLASH-031']
  },

  // ============================================
  // ANIMATION & UI EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-014',
    title: 'Splash Animation Fails to Load',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Custom Lottie animation file is corrupted or fails to parse',
    expectedBehavior: 'Show static logo fallback (WhiteLogoWidget) and clear cached animation',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Fallback to static logo',
        'Clear corrupted cache files'
      ],
      visualExample: 'Static Bee logo on primary color background'
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:225-243',
        'splash/splash_view.dart:158-198'
      ],
      validationRules: [
        'FutureBuilder handles null composition',
        'If showDebugMenu, clearSplashCache() called'
      ]
    },
    relatedTestCases: ['TC-SPLASH-032']
  },
  {
    id: 'EC-SPLASH-015',
    title: 'Animation Completes Before Settings Load',
    category: 'State',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Lottie animation finishes but settings API call is still pending',
    expectedBehavior: 'Wait for settings to complete before initializing and navigating',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Animation simply completes, no action until settings ready'
      ],
      visualExample: 'Static final frame of animation shown while waiting'
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:200-202',
        'presentation/splash/splash_viewmodel.dart:66-68'
      ],
      validationRules: [
        '_onAnimationComplete checks _animationCompleted flag',
        'initialize() called only once',
        'initialize() checks if settings data is null before proceeding'
      ]
    },
    relatedTestCases: ['TC-SPLASH-033']
  },
  {
    id: 'EC-SPLASH-016',
    title: 'Settings Load Before Animation Completes',
    category: 'State',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Settings API returns quickly but animation is still playing',
    expectedBehavior: 'Wait for animation to complete before navigating (smooth UX)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:197-202',
        'splash/splash_view.dart:57-75'
      ],
      validationRules: [
        'Animation completion triggers initialize()',
        'Legacy: Timer.periodic polls for settings before calling appInitialize()'
      ]
    },
    relatedTestCases: ['TC-SPLASH-034']
  },
  {
    id: 'EC-SPLASH-017',
    title: 'Long Animation Duration',
    category: 'Performance',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Lottie animation file has very long duration (>5 seconds)',
    expectedBehavior: 'Animation plays fully; if settings ready, initialize immediately after',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Debug menu appears after 30 seconds if stuck'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:44-47',
        'splash/splash_view.dart:282-285'
      ],
      validationRules: [
        'startDebugMenuTimer() shows menu after 30 seconds',
        'Allows user to reset if splash seems stuck'
      ]
    },
    relatedTestCases: ['TC-SPLASH-035']
  },

  // ============================================
  // DEEP LINK EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-018',
    title: 'Deep Link on Cold Start',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'App opened via deep link when not already running',
    expectedBehavior: 'Complete normal splash flow then navigate to deep link destination',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'If deep link invalid, fallback to normal flow'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:107-125'
      ],
      validationRules: [
        'DeepLinkHandler.instance.takePendingColdStartRequest() captures link',
        'DeepLinkExecutor.execute() handles navigation after splash'
      ]
    },
    relatedTestCases: ['TC-SPLASH-020', 'TC-SPLASH-021']
  },
  {
    id: 'EC-SPLASH-019',
    title: 'Invalid Deep Link Parameters',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Deep link contains invalid or missing parameters',
    expectedBehavior: 'Fall back to normal navigation route',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Navigate to default screen (Home or appropriate based on user state)'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:114-119'
      ],
      validationRules: [
        'try-catch around DeepLinkExecutor.execute()',
        'On error, navigate to state.nextRoute (normal flow)'
      ]
    },
    relatedTestCases: ['TC-SPLASH-036']
  },

  // ============================================
  // GUEST USER EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-020',
    title: 'Guest Visit Registration Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'addGuestVisit API call fails for non-logged-in user',
    expectedBehavior: 'Continue with default guest settings without blocking app',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Guest can continue using app with default restrictions'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:99-106',
        'service/app_config_service.dart:238-249'
      ],
      validationRules: [
        'Empty catch block prevents failure from blocking flow',
        'try-catch around device ID fetch and API call'
      ]
    },
    relatedTestCases: ['TC-SPLASH-037']
  },
  {
    id: 'EC-SPLASH-021',
    title: 'Device ID Retrieval Fails',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'FlutterUdid.consistentUdid throws exception',
    expectedBehavior: 'Skip guest visit registration, continue with app flow',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:100-105'
      ],
      validationRules: [
        'try-catch around FlutterUdid.consistentUdid',
        'Failure logged but does not block initialization'
      ]
    },
    relatedTestCases: ['TC-SPLASH-038']
  },

  // ============================================
  // POST-LOGIN TASKS EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-022',
    title: 'Post-Login Task Fails (Address Load)',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'UserAddressViewModel.getAddresses() fails during splash',
    expectedBehavior: 'Continue to home; user may need to retry loading addresses',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Addresses can be loaded from profile screen later'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/post_login_tasks_service.dart:38-39'
      ],
      validationRules: [
        'try-catch around each post-login task',
        'Individual task failures do not block others'
      ]
    },
    relatedTestCases: ['TC-SPLASH-039']
  },
  {
    id: 'EC-SPLASH-023',
    title: 'Cart Load Fails for Logged-In User',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'MyCartViewModel.getBaskets() throws exception',
    expectedBehavior: 'Continue to home with empty cart; cart can be loaded later',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Cart page will attempt to load again when visited'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:229-236'
      ],
      validationRules: [
        'try-catch around cart loading',
        'Failure does not block navigation'
      ]
    },
    relatedTestCases: ['TC-SPLASH-040']
  },
  {
    id: 'EC-SPLASH-024',
    title: 'ViewModel Not Registered (GetX)',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Get.find<SomeViewModel>() fails because ViewModel not yet registered',
    expectedBehavior: 'Catch exception and skip that task; log error for debugging',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/post_login_tasks_service.dart:22-63'
      ],
      validationRules: [
        'Each Get.find call wrapped in try-catch',
        'Comment: // ViewModel not found or error'
      ]
    },
    relatedTestCases: ['TC-SPLASH-041']
  },

  // ============================================
  // LANGUAGE & LOCALIZATION EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-025',
    title: 'Language Sync Fails',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'EasyLocalization.setLocale() throws exception',
    expectedBehavior: 'Continue with current locale; user can change language in settings',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User can manually change language in settings'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:159-174',
        'presentation/splash/splash_viewmodel.dart:196-217'
      ],
      validationRules: [
        'try-catch around locale operations',
        'Failure logged but does not crash app'
      ]
    },
    relatedTestCases: ['TC-SPLASH-042']
  },
  {
    id: 'EC-SPLASH-026',
    title: 'Language File Download Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Language file download fails (ar.json or en.json)',
    expectedBehavior: 'Use existing local files; version not updated so retry on next launch',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_config_service.dart:106-170'
      ],
      validationRules: [
        'Version only updated if both files download successfully',
        'Partial failure leaves version unchanged for retry'
      ]
    },
    relatedTestCases: ['TC-SPLASH-043']
  },

  // ============================================
  // INTRO QUESTIONS EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-027',
    title: 'Intro Questions Available',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User is logged in, invite enabled, and has unanswered "Know Us" questions',
    expectedBehavior: 'Navigate to intro questions screen instead of home',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'User completes questions and proceeds to home'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:126-132',
        'service/app_initialization_service.dart:162-175'
      ],
      validationRules: [
        'shouldShowIntroQuestions() checks invite enabled and questions available',
        'Navigate to NavigationConstants.introQuestions if true'
      ]
    },
    relatedTestCases: ['TC-SPLASH-044']
  },
  {
    id: 'EC-SPLASH-028',
    title: 'KnowUsViewModel Not Found',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'Get.find<KnowUsViewModel>() fails when checking for intro questions',
    expectedBehavior: 'Return false (no intro questions), continue normal flow',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:169-174'
      ],
      validationRules: [
        'try-catch returns false on exception'
      ]
    },
    relatedTestCases: ['TC-SPLASH-045']
  },

  // ============================================
  // DEBUG/MAINTENANCE EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-029',
    title: 'Debug Cache Clear Fails',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'One or more directory deletions fail during debug clear',
    expectedBehavior: 'Continue clearing what is possible; log errors',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Partial clear may leave some data',
        'User may need to manually reinstall app'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'data/repository/auth_repository.dart:362-391'
      ],
      validationRules: [
        'Each directory deletion in separate try-catch',
        'Errors logged with AppLogger.print'
      ]
    },
    relatedTestCases: ['TC-SPLASH-046']
  },
  {
    id: 'EC-SPLASH-030',
    title: 'Logout API Fails During Debug Clear',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'logout() API call fails when doing debug clear',
    expectedBehavior: 'Still clear local data and restart app',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Local logout performed even if server logout fails'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_viewmodel.dart:254-262'
      ],
      validationRules: [
        'failure fold still calls UserManager.instance.logOut()',
        'Navigate to splash regardless of API result'
      ]
    },
    relatedTestCases: ['TC-SPLASH-047']
  },

  // ============================================
  // FCM & NOTIFICATIONS EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-031',
    title: 'FCM Token Retrieval Fails',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'FirebaseMessaging.instance.getToken() throws exception',
    expectedBehavior: 'Continue without updating FCM token; push notifications may not work',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Token can be retrieved and updated on next launch'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_config_service.dart:28-39'
      ],
      validationRules: [
        'try-catch around Firebase call',
        'AppLogger.print(e) logs error'
      ]
    },
    relatedTestCases: ['TC-SPLASH-048']
  },
  {
    id: 'EC-SPLASH-032',
    title: 'FCM Token Update API Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'updateFcmToken() API call fails',
    expectedBehavior: 'Log error and continue; token will be retried on next launch',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_config_service.dart:34-39',
        'data/repository/auth_repository.dart:339-342'
      ],
      validationRules: [
        'Error caught and logged',
        'Does not block app flow'
      ]
    },
    relatedTestCases: ['TC-SPLASH-049']
  },

  // ============================================
  // PLATFORM-SPECIFIC EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-033',
    title: 'iOS vs Android Splash Animation Difference',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'App running on iOS vs Android uses different animation files',
    expectedBehavior: 'Load correct animation based on platform (AppLinks.isIos)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'presentation/splash/splash_screen.dart:191-194',
        'splash/splash_view.dart:128-131'
      ],
      validationRules: [
        'AppLinks.isIos ? "ios_Splash.json" : "android_splash.json"'
      ]
    },
    relatedTestCases: ['TC-SPLASH-050']
  },
  {
    id: 'EC-SPLASH-034',
    title: 'Version Check Differs by Platform',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'iOS and Android versions have different update requirements',
    expectedBehavior: 'Parse correct platform section of isValidVersion response',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'splash/model/setting_model.dart:343-347'
      ],
      validationRules: [
        'fromJsonIsValidVersion checks AppLinks.isIos',
        'Returns ValidVersionModel.fromJson(json["ios"]) or json["android"]'
      ]
    },
    relatedTestCases: ['TC-SPLASH-051']
  },

  // ============================================
  // CRASHLYTICS EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-035',
    title: 'Crashlytics Initialization on Web',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'App running on web platform',
    expectedBehavior: 'Skip Firebase Crashlytics calls (kIsWeb check)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_initialization_service.dart:216-217',
        'splash/view_model/splash_viewmodel.dart:764'
      ],
      validationRules: [
        'if (kIsWeb) return early',
        'Crashlytics not available on web'
      ]
    },
    relatedTestCases: ['TC-SPLASH-052']
  },

  // ============================================
  // IMAGE CACHE EDGE CASES
  // ============================================
  {
    id: 'EC-SPLASH-036',
    title: 'Images Version Requires Cache Clear',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Server imagesVersion is higher than local cached version',
    expectedBehavior: 'Clear image cache to force reload of updated images',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'service/app_config_service.dart:173-193'
      ],
      validationRules: [
        'Compare local vs server imagesVersion',
        'CustomCacheManager.instance.emptyCache() if outdated'
      ]
    },
    relatedTestCases: ['TC-SPLASH-053']
  }
];



