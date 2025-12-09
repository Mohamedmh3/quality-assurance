import type { UseCase } from '../types';

export const splashUseCases: UseCase[] = [
  // ============================================
  // APP INITIALIZATION USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-001',
    title: 'App Launch and Settings Load',
    priority: 'Critical',
    userType: 'System',
    description: 'When the app opens, the splash screen shows a logo animation while the app loads all the settings it needs from the server to work properly.',
    preconditions: [
      'App has just been opened',
      'Device has internet connection',
      'Server is available'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on the app icon to open the app',
        expectedResult: 'Splash screen is displayed with the app logo animation',
        uiState: 'App logo with Lottie animation appears centered on a colored background',
        flutterFile: 'presentation/splash/splash_screen.dart:81-95'
      },
      {
        step: 2,
        action: 'System starts the logo animation and begins loading settings',
        expectedResult: 'getAppSetting() is called to fetch configuration from server',
        uiState: 'Animation plays while loading happens in background',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:50-62'
      },
      {
        step: 3,
        action: 'Server responds with app settings (SettingModel)',
        expectedResult: 'Settings are saved and synced to local storage and managers',
        uiState: 'Animation continues, no visible change',
        flutterFile: 'data/repository/auth_repository.dart:211-239'
      },
      {
        step: 4,
        action: 'System initializes user data from local storage',
        expectedResult: 'Token, mobile number, and user info are loaded into UserManager',
        uiState: 'Animation continues',
        flutterFile: 'data/repository/auth_repository.dart:257-284'
      }
    ],
    postconditions: [
      'App settings are loaded and available',
      'User authentication status is determined',
      'Static data (token, mobile) is initialized',
      'App is ready to navigate to the next screen'
    ],
    successCriteria: [
      'Logo animation plays smoothly',
      'Settings are fetched successfully from server',
      'No error messages appear',
      'App proceeds to the next screen within 5-10 seconds'
    ],
    relatedTestCases: ['TC-SPLASH-001', 'TC-SPLASH-002']
  },
  {
    id: 'UC-SPLASH-002',
    title: 'First-Time User Introduction Flow',
    priority: 'Critical',
    userType: 'End User',
    description: 'When someone opens the app for the very first time after installing it, they see a welcome introduction (BeeIntro) before the regular splash flow continues.',
    preconditions: [
      'App is freshly installed',
      'User has never opened the app before (IS_FIRST_APP flag is false)'
    ],
    steps: [
      {
        step: 1,
        action: 'System checks if this is the first time opening the app',
        expectedResult: 'isFirstVisitRegistered() returns false',
        uiState: 'Brief splash shown',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:153-158'
      },
      {
        step: 2,
        action: 'System displays the BeeIntro welcome screen',
        expectedResult: 'BeeIntro widget is shown with onboarding content',
        uiState: 'Welcome introduction screens with colorful graphics and "Get Started" buttons',
        flutterFile: 'presentation/splash/splash_screen.dart:176-181'
      },
      {
        step: 3,
        action: 'User taps "Get Started" or completes the introduction',
        expectedResult: 'Callback triggers setFirstVisitCompleted() and initialize()',
        uiState: 'Transition from intro to app loading',
        flutterFile: 'presentation/splash/splash_screen.dart:178-180'
      },
      {
        step: 4,
        action: 'System marks first visit as complete',
        expectedResult: 'IS_FIRST_APP preference set to true',
        uiState: 'App continues with normal initialization',
        flutterFile: 'data/local/auth_local_storage.dart:55-56'
      }
    ],
    postconditions: [
      'First visit flag is saved',
      'User will not see intro on next launch',
      'Normal splash flow continues',
      'App settings are loaded'
    ],
    successCriteria: [
      'Introduction screens are displayed on first launch only',
      'User can navigate through intro smoothly',
      'After completing intro, app continues to home or login',
      'On second launch, intro is skipped automatically'
    ],
    relatedTestCases: ['TC-SPLASH-003', 'TC-SPLASH-004']
  },
  {
    id: 'UC-SPLASH-003',
    title: 'Check User Login Status and Navigate',
    priority: 'Critical',
    userType: 'System',
    description: 'After loading settings, the app checks if the user is logged in and decides where to go next - either to the home screen, login screen, or user profile completion screen.',
    preconditions: [
      'App settings have been loaded successfully',
      'Logo animation has completed'
    ],
    steps: [
      {
        step: 1,
        action: 'Animation completes, system calls initialize()',
        expectedResult: 'Full initialization sequence begins',
        uiState: 'Animation completes, brief pause',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:66-149'
      },
      {
        step: 2,
        action: 'System retrieves stored authentication token from local storage',
        expectedResult: 'Token string retrieved (may be empty)',
        uiState: 'No visible change, processing in background',
        flutterFile: 'service/app_initialization_service.dart:180-181'
      },
      {
        step: 3,
        action: 'System evaluates token and user data',
        expectedResult: 'Decision made based on: token present, user info complete',
        uiState: 'No visible change',
        flutterFile: 'service/app_initialization_service.dart:179-203'
      },
      {
        step: 4,
        action: 'System navigates to the appropriate screen',
        expectedResult: 'Navigation triggered to HOME, OTP_VIEW, or USER_INFO_VIEW',
        uiState: 'Screen transition to the next page',
        flutterFile: 'presentation/splash/splash_screen.dart:100-125'
      }
    ],
    postconditions: [
      'User is navigated to the correct screen based on their state',
      'Splash screen is no longer visible',
      'User can begin using the app'
    ],
    successCriteria: [
      'Logged-in users with complete profile go to Home',
      'Logged-in users with incomplete profile go to User Info screen',
      'Users with mobile but no token go to OTP screen',
      'New users go to Home (as guest) or Phone Number screen'
    ],
    relatedTestCases: ['TC-SPLASH-005', 'TC-SPLASH-006', 'TC-SPLASH-007']
  },

  // ============================================
  // APP UPDATE USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-004',
    title: 'Forced App Update Required',
    priority: 'Critical',
    userType: 'System',
    description: 'When the server indicates a mandatory update is required (update_type = 2), the app shows an update screen that blocks access until the user updates.',
    preconditions: [
      'App settings loaded successfully',
      'isValidVersion.status is false',
      'isValidVersion.update_type is 2'
    ],
    steps: [
      {
        step: 1,
        action: 'System checks app version validity from settings',
        expectedResult: 'checkAppVersionUpdateType() returns 2 (forced)',
        uiState: 'Splash still visible',
        flutterFile: 'service/app_initialization_service.dart:86-92'
      },
      {
        step: 2,
        action: 'System navigates to Update App screen',
        expectedResult: 'Navigation to UPDATE_APP route with update data',
        uiState: 'Update required screen appears',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:113-119'
      },
      {
        step: 3,
        action: 'Update screen shows message and update button',
        expectedResult: 'User sees "Update Required" message with link to app store',
        uiState: 'Full-screen update prompt with "Update" button',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:593-597'
      },
      {
        step: 4,
        action: 'User taps "Update" button',
        expectedResult: 'App store (Play Store / App Store) opens to app page',
        uiState: 'Device switches to app store',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:632-637'
      }
    ],
    postconditions: [
      'User cannot proceed in the app without updating',
      'User is directed to download the new version',
      'App remains on update screen if user returns'
    ],
    successCriteria: [
      'Update screen appears for forced updates',
      'User cannot bypass the update screen',
      'Update button opens correct app store link',
      'Message clearly explains why update is needed'
    ],
    relatedTestCases: ['TC-SPLASH-008', 'TC-SPLASH-009']
  },
  {
    id: 'UC-SPLASH-005',
    title: 'Optional App Update Available',
    priority: 'High',
    userType: 'System',
    description: 'When a newer version is available but not mandatory (update_type = 1), the app shows a dismissable dialog suggesting the user update.',
    preconditions: [
      'App settings loaded successfully',
      'isValidVersion.status is false',
      'isValidVersion.update_type is 1'
    ],
    steps: [
      {
        step: 1,
        action: 'System checks app version validity from settings',
        expectedResult: 'checkAppVersionUpdateType() returns 1 (soft update)',
        uiState: 'Splash visible',
        flutterFile: 'service/app_initialization_service.dart:86-92'
      },
      {
        step: 2,
        action: 'System shows soft update bottom sheet dialog',
        expectedResult: 'Bottom sheet with update message, "Update" and "No Thanks" buttons',
        uiState: 'Dialog slides up from bottom of screen',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:602-660'
      },
      {
        step: 3,
        action: 'User taps "Update" or "No Thanks"',
        expectedResult: 'If Update: open app store. If No Thanks: dismiss and continue',
        uiState: 'Dialog dismisses, navigation continues',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:632-650'
      }
    ],
    postconditions: [
      'User informed about available update',
      'User can choose to update or continue',
      'App proceeds with normal flow after dialog'
    ],
    successCriteria: [
      'Dialog appears with update information',
      'User can dismiss and continue using app',
      'Update button opens app store correctly',
      'App continues normally after dismissal'
    ],
    relatedTestCases: ['TC-SPLASH-010', 'TC-SPLASH-011']
  },

  // ============================================
  // NETWORK & ERROR USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-006',
    title: 'Handle No Internet Connection',
    priority: 'Critical',
    userType: 'System',
    description: 'When the app cannot connect to the server due to no internet, it shows a retry dialog so the user can try again once connected.',
    preconditions: [
      'App has been opened',
      'No internet connection available'
    ],
    steps: [
      {
        step: 1,
        action: 'System attempts to load settings from server',
        expectedResult: 'Network request fails with NoInternetException',
        uiState: 'Animation plays, loading in background',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:161-162'
      },
      {
        step: 2,
        action: 'System catches the network error',
        expectedResult: 'Error state emitted with error message',
        uiState: 'Splash visible',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:54-57'
      },
      {
        step: 3,
        action: 'Error listener triggers retry dialog',
        expectedResult: 'Bottom sheet with "No Connection" message and "Retry" button',
        uiState: 'Error dialog appears with retry option',
        flutterFile: 'presentation/splash/splash_screen.dart:129-144'
      },
      {
        step: 4,
        action: 'User taps "Retry" button',
        expectedResult: 'getAppSetting() called again',
        uiState: 'Dialog dismisses, loading restarts',
        flutterFile: 'presentation/splash/splash_screen.dart:140-142'
      }
    ],
    postconditions: [
      'User is informed about connection issue',
      'User can retry when connection is restored',
      'App does not crash or freeze'
    ],
    successCriteria: [
      'Clear error message is displayed',
      'Retry button works correctly',
      'App loads normally once connection restored',
      'Dialog cannot be dismissed without action'
    ],
    relatedTestCases: ['TC-SPLASH-012', 'TC-SPLASH-013']
  },

  // ============================================
  // BACKGROUND DATA LOADING USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-007',
    title: 'Load Post-Login Data for Logged-In Users',
    priority: 'High',
    userType: 'System',
    description: 'For users who are already logged in, the splash screen pre-loads important data like addresses, cart items, and user tickets in the background.',
    preconditions: [
      'User is logged in (token exists)',
      'App settings loaded successfully'
    ],
    steps: [
      {
        step: 1,
        action: 'System confirms user is logged in',
        expectedResult: 'UserManager.instance.isLoggedIn() returns true',
        uiState: 'Splash animation visible',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:99-100'
      },
      {
        step: 2,
        action: 'System runs post-login tasks service',
        expectedResult: 'PostLoginTasksService.run() executes all background tasks',
        uiState: 'Loading continues in background',
        flutterFile: 'service/post_login_tasks_service.dart:18-64'
      },
      {
        step: 3,
        action: 'Individual tasks fetch data in parallel',
        expectedResult: 'User tickets, tutorials, addresses, surveys loaded',
        uiState: 'No visible change, data loading',
        flutterFile: 'service/post_login_tasks_service.dart:22-57'
      },
      {
        step: 4,
        action: 'System loads cart data',
        expectedResult: 'MyCartViewModel.getBaskets() fetches user cart',
        uiState: 'Cart data ready for when user reaches home',
        flutterFile: 'service/app_initialization_service.dart:229-236'
      }
    ],
    postconditions: [
      'User addresses are cached',
      'Cart is pre-loaded',
      'Tutorial data is ready',
      'Home feed can load faster'
    ],
    successCriteria: [
      'All background tasks complete without errors',
      'Data is available when user reaches home screen',
      'Failed tasks do not block app navigation',
      'User experience is seamless'
    ],
    relatedTestCases: ['TC-SPLASH-014', 'TC-SPLASH-015']
  },
  {
    id: 'UC-SPLASH-008',
    title: 'Register Guest Visit for Non-Logged-In Users',
    priority: 'Medium',
    userType: 'System',
    description: 'For users who are not logged in, the app registers their device as a guest visit for analytics and to provide limited access to features.',
    preconditions: [
      'User is not logged in (no token)',
      'App settings loaded successfully'
    ],
    steps: [
      {
        step: 1,
        action: 'System confirms user is not logged in',
        expectedResult: 'UserManager.instance.isLoggedIn() returns false',
        uiState: 'Splash animation visible',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:99-100'
      },
      {
        step: 2,
        action: 'System retrieves device unique ID',
        expectedResult: 'FlutterUdid.consistentUdid provides device identifier',
        uiState: 'Processing in background',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:101-102'
      },
      {
        step: 3,
        action: 'System calls addGuestVisitIfNeeded()',
        expectedResult: 'Guest visit registered with server',
        uiState: 'No visible change',
        flutterFile: 'service/app_config_service.dart:238-249'
      },
      {
        step: 4,
        action: 'Server returns guest permissions model',
        expectedResult: 'GuestModel with allowed counts stored in StaticData',
        uiState: 'Guest restrictions applied',
        flutterFile: 'splash/view_model/splash_viewmodel.dart:211-221'
      }
    ],
    postconditions: [
      'Guest visit is tracked',
      'Guest limitations are applied',
      'Device ID is associated with visit',
      'Analytics can track guest behavior'
    ],
    successCriteria: [
      'Guest visit API called successfully',
      'Guest access limits are respected',
      'App continues to home as guest',
      'Failed guest registration does not block app'
    ],
    relatedTestCases: ['TC-SPLASH-016']
  },

  // ============================================
  // CONFIGURATION SYNC USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-009',
    title: 'Sync FCM Token for Push Notifications',
    priority: 'High',
    userType: 'System',
    description: 'The app checks if the Firebase Cloud Messaging token has changed and updates the server so push notifications reach the correct device.',
    preconditions: [
      'User is logged in',
      'App settings loaded with current FCM token',
      'Firebase Messaging is configured'
    ],
    steps: [
      {
        step: 1,
        action: 'System retrieves current FCM token from Firebase',
        expectedResult: 'FirebaseMessaging.instance.getToken() returns token',
        uiState: 'Processing in background',
        flutterFile: 'service/app_config_service.dart:28-31'
      },
      {
        step: 2,
        action: 'System compares with token stored on server',
        expectedResult: 'Checks if token != setting.fcmToken',
        uiState: 'No visible change',
        flutterFile: 'service/app_config_service.dart:34-35'
      },
      {
        step: 3,
        action: 'If different, system updates server with new token',
        expectedResult: 'updateFcmToken() API call sends new token',
        uiState: 'Background API call',
        flutterFile: 'service/app_config_service.dart:35-36'
      }
    ],
    postconditions: [
      'Server has current FCM token for user',
      'Push notifications will be delivered correctly',
      'Token sync happens silently'
    ],
    successCriteria: [
      'FCM token retrieved successfully',
      'Server updated only if token changed',
      'Push notifications work correctly',
      'Errors do not block app flow'
    ],
    relatedTestCases: ['TC-SPLASH-017']
  },
  {
    id: 'UC-SPLASH-010',
    title: 'Download and Cache Splash Animation',
    priority: 'Low',
    userType: 'System',
    description: 'The app downloads updated splash animation files from the server when a new version is available, storing them locally for faster loading next time.',
    preconditions: [
      'App settings loaded',
      'splashVersion from server is higher than local version'
    ],
    steps: [
      {
        step: 1,
        action: 'System compares local splash version with server version',
        expectedResult: 'If server version > local, proceed with download',
        uiState: 'Processing in background',
        flutterFile: 'service/app_config_service.dart:50-65'
      },
      {
        step: 2,
        action: 'System downloads Arabic and English splash animations',
        expectedResult: 'JSON Lottie files downloaded for both languages',
        uiState: 'Background download',
        flutterFile: 'service/app_config_service.dart:68-93'
      },
      {
        step: 3,
        action: 'System saves files to app documents directory',
        expectedResult: 'Files saved as splash_animation_ar.json and splash_animation_en.json',
        uiState: 'File write operations',
        flutterFile: 'service/app_config_service.dart:74-93'
      },
      {
        step: 4,
        action: 'System updates local version number',
        expectedResult: 'SPLASH_VERSION preference updated',
        uiState: 'Preference saved',
        flutterFile: 'service/app_config_service.dart:95-99'
      }
    ],
    postconditions: [
      'New splash animation cached locally',
      'Will be used on next app launch',
      'Version number updated to prevent re-download'
    ],
    successCriteria: [
      'Files download successfully',
      'Both language versions are cached',
      'Version tracking prevents redundant downloads',
      'Download failures do not break app'
    ],
    relatedTestCases: ['TC-SPLASH-018']
  },
  {
    id: 'UC-SPLASH-011',
    title: 'Sync Language Translation Files',
    priority: 'Medium',
    userType: 'System',
    description: 'The app downloads updated translation files when a new version is available, ensuring users see the latest text in their language.',
    preconditions: [
      'App settings loaded',
      'langVersion from server is higher than local version'
    ],
    steps: [
      {
        step: 1,
        action: 'System compares local language version with server version',
        expectedResult: 'If server version > local, proceed with download',
        uiState: 'Background processing',
        flutterFile: 'service/app_config_service.dart:106-126'
      },
      {
        step: 2,
        action: 'System downloads Arabic and English language files',
        expectedResult: 'ar.json and en.json files downloaded',
        uiState: 'Background download',
        flutterFile: 'service/app_config_service.dart:128-134'
      },
      {
        step: 3,
        action: 'System saves files to lang directory',
        expectedResult: 'Files saved to lang/ folder in app documents',
        uiState: 'File write operations',
        flutterFile: 'service/app_config_service.dart:136-156'
      },
      {
        step: 4,
        action: 'System updates language version preference',
        expectedResult: 'LANG_VERSION and APP_VERSION_ON_LAST_LANG_VERSION updated',
        uiState: 'Preferences saved',
        flutterFile: 'service/app_config_service.dart:158-167'
      }
    ],
    postconditions: [
      'Updated translations are cached',
      'App will use new text on screen refresh',
      'Version prevents redundant downloads'
    ],
    successCriteria: [
      'Language files download correctly',
      'Both Arabic and English files updated',
      'App text updates to new translations',
      'Download failures use existing translations'
    ],
    relatedTestCases: ['TC-SPLASH-019']
  },

  // ============================================
  // DEEP LINK USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-012',
    title: 'Handle Deep Link on Cold Start',
    priority: 'High',
    userType: 'System',
    description: 'When the app is opened via a deep link (like a shared restaurant or dish link), the splash screen processes it and navigates to the correct screen.',
    preconditions: [
      'App was opened via deep link (not already running)',
      'Deep link contains valid screen and parameters'
    ],
    steps: [
      {
        step: 1,
        action: 'App launches from deep link',
        expectedResult: 'DeepLinkHandler captures the pending cold-start request',
        uiState: 'Splash screen appears',
        flutterFile: 'presentation/splash/splash_screen.dart:107-108'
      },
      {
        step: 2,
        action: 'Splash completes normal initialization',
        expectedResult: 'Settings loaded, user state determined',
        uiState: 'Animation completes',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:66-97'
      },
      {
        step: 3,
        action: 'Navigation listener checks for pending deep link',
        expectedResult: 'takePendingColdStartRequest() returns the deep link request',
        uiState: 'About to navigate',
        flutterFile: 'presentation/splash/splash_screen.dart:107-108'
      },
      {
        step: 4,
        action: 'System executes the deep link',
        expectedResult: 'DeepLinkExecutor.execute() navigates to deep linked screen',
        uiState: 'Navigates to intended destination (restaurant, dish, etc.)',
        flutterFile: 'presentation/splash/splash_screen.dart:113-114'
      }
    ],
    postconditions: [
      'User arrives at deep-linked destination',
      'Normal app initialization completed',
      'Deep link request is consumed (not re-executed)'
    ],
    successCriteria: [
      'Deep link is properly captured on cold start',
      'User lands on correct screen',
      'App state is properly initialized',
      'Invalid deep links fallback to normal flow'
    ],
    relatedTestCases: ['TC-SPLASH-020', 'TC-SPLASH-021']
  },

  // ============================================
  // DEBUG/MAINTENANCE USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-013',
    title: 'Debug: Clear Cache and Reset App',
    priority: 'Low',
    userType: 'Admin',
    description: 'After 30 seconds on splash, a debug menu appears allowing testers to completely clear the app cache and data for testing purposes.',
    preconditions: [
      'User has been on splash screen for 30+ seconds',
      'Debug menu timer has expired'
    ],
    steps: [
      {
        step: 1,
        action: 'User waits 30 seconds on splash screen',
        expectedResult: 'Debug timer fires, showDebugMenu becomes true',
        uiState: 'Three-dot menu icon appears in top-right corner',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:44-47'
      },
      {
        step: 2,
        action: 'User taps the menu icon',
        expectedResult: 'Popup menu shows "Reset" option',
        uiState: 'Popup menu appears',
        flutterFile: 'presentation/splash/splash_screen.dart:251-275'
      },
      {
        step: 3,
        action: 'User taps "Reset" option',
        expectedResult: 'Confirmation bottom sheet appears',
        uiState: 'Dialog asks "Are you sure to clear?"',
        flutterFile: 'presentation/splash/splash_screen.dart:60-78'
      },
      {
        step: 4,
        action: 'User confirms the reset',
        expectedResult: 'debugClearCacheAndLogout() clears all data and navigates to splash',
        uiState: 'App restarts fresh',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:250-269'
      }
    ],
    postconditions: [
      'All local data is cleared',
      'Cache directories are deleted',
      'User is logged out',
      'App returns to initial state'
    ],
    successCriteria: [
      'Menu appears after 30 seconds',
      'Confirmation prevents accidental resets',
      'All data is completely cleared',
      'App starts fresh after reset'
    ],
    relatedTestCases: ['TC-SPLASH-022']
  },

  // ============================================
  // LANGUAGE SYNC USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-014',
    title: 'Sync App Language with User Preference',
    priority: 'Medium',
    userType: 'System',
    description: 'When the app starts, it syncs the display language with the user\'s saved preference to ensure consistent language throughout the app.',
    preconditions: [
      'App settings loaded',
      'User has a saved language preference'
    ],
    steps: [
      {
        step: 1,
        action: 'System retrieves target locale from user preferences',
        expectedResult: 'getTargetLocale() returns Arabic or English locale',
        uiState: 'Processing in background',
        flutterFile: 'service/app_initialization_service.dart:78-81'
      },
      {
        step: 2,
        action: 'System compares with current app locale',
        expectedResult: 'Checks if targetLocale != currentLocale',
        uiState: 'No visible change',
        flutterFile: 'presentation/splash/splash_screen.dart:166-172'
      },
      {
        step: 3,
        action: 'If different, emit shouldSyncLanguage flag',
        expectedResult: 'State emits with shouldSyncLanguage = true',
        uiState: 'App prepares to change language',
        flutterFile: 'presentation/splash/splash_viewmodel.dart:75-78'
      },
      {
        step: 4,
        action: 'Language sync listener updates EasyLocalization',
        expectedResult: 'easyLoc.setLocale(targetLocale) called',
        uiState: 'App text updates to user\'s preferred language',
        flutterFile: 'presentation/splash/splash_screen.dart:163-174'
      }
    ],
    postconditions: [
      'App displays in user\'s preferred language',
      'All text is properly localized',
      'Language preference is respected'
    ],
    successCriteria: [
      'Language syncs without visible flicker',
      'All screens show correct language',
      'RTL/LTR layout adjusts correctly for Arabic',
      'Language persists across sessions'
    ],
    relatedTestCases: ['TC-SPLASH-023']
  },

  // ============================================
  // ANALYTICS USE CASES
  // ============================================
  {
    id: 'UC-SPLASH-015',
    title: 'Initialize Analytics and Screen Recording',
    priority: 'Low',
    userType: 'System',
    description: 'If screen recording analytics is enabled in settings, the app initializes the recording session for user behavior tracking.',
    preconditions: [
      'App settings loaded',
      'enableRecordingAnalytics is true'
    ],
    steps: [
      {
        step: 1,
        action: 'System logs splash screen visit',
        expectedResult: 'AnalyticsManager.logScreen(name: "/splash_screen") called',
        uiState: 'No visible change',
        flutterFile: 'presentation/splash/splash_screen.dart:87'
      },
      {
        step: 2,
        action: 'Settings load listener checks recording flag',
        expectedResult: 'enableRecordingAnalytics == true triggers recording',
        uiState: 'No visible change',
        flutterFile: 'presentation/splash/splash_screen.dart:150-155'
      },
      {
        step: 3,
        action: 'System starts screen recording session',
        expectedResult: 'AnalyticsManager.startScreenRecording(context) called',
        uiState: 'Recording indicator may appear (if configured)',
        flutterFile: 'presentation/splash/splash_screen.dart:153'
      }
    ],
    postconditions: [
      'Analytics tracking is active',
      'Screen recording captures user journey',
      'Session is associated with user/device'
    ],
    successCriteria: [
      'Analytics initialized without errors',
      'Screen recording starts if enabled',
      'User privacy preferences respected',
      'Recording does not impact performance'
    ],
    relatedTestCases: ['TC-SPLASH-024']
  }
];



