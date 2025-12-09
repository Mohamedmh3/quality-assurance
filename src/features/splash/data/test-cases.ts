import type { TestCase } from '@/lib/types';

export const splashTestCases: TestCase[] = [
 // ============================================
 // AUTHENTICATION FLOW TESTS
 // ============================================
 {
  id: 'TC-SPLASH-001',
  title: 'Logged In User with Complete Profile Goes to Home',
  whatYoureTesting: 'Making sure that when someone who is already logged in (with their name, city, and gender filled in) opens the app, they go straight to the home screen.',
  whyItMatters: 'This is the most common scenario! Regular customers shouldn\'t have to wait or fill in anything - they should be able to start shopping immediately.',
  estimatedTime: '1-2 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-001', 'UC-SPLASH-003'],
  relatedEdgeCases: ['EC-SPLASH-005'],
  testSteps: [
   {
    step: 1,
    instruction: 'Make sure you have a test account that is fully set up',
    detailedSteps: [
     '1. You need an account that has: phone number verified, name filled in, city selected, and gender chosen',
     '2. If you don\'t have one, create a new account and complete ALL the profile fields',
     '3. Log in to this account and make sure you can see the home screen',
     '4. Close the app completely (swipe it away from recent apps)'
    ],
    whatYouShouldSee: 'A fully logged in account that shows the home screen',
    expectedResult: 'Test account ready with complete profile'
   },
   {
    step: 2,
    instruction: 'Open the app and watch the splash screen',
    detailedSteps: [
     '1. Find the BeeOrder app icon on your phone',
     '2. Tap once to open',
     '3. Watch the animated logo (don\'t tap anything)',
     '4. Count slowly: "one Mississippi, two Mississippi, three Mississippi..."'
    ],
    whatYouShouldSee: 'An animated bee/logo on a yellow/orange background. The animation should be smooth.',
    expectedResult: 'Splash animation plays for 2-4 seconds'
   },
   {
    step: 3,
    instruction: 'Verify you go directly to the home screen',
    detailedSteps: [
     '1. After the animation finishes, watch what screen appears',
     '2. You should NOT see any login screens',
     '3. You should NOT see any "complete your profile" screens',
     '4. You should go directly to the home screen with restaurants'
    ],
    whatYouShouldSee: 'The home screen with restaurants, categories, search bar, and your location at the top.',
    expectedResult: 'Home screen displayed, ready to browse restaurants'
   }
  ],
  successChecklist: [
   '✓ Splash animation played smoothly',
   '✓ Went directly to home screen (no login or profile screens)',
   '✓ Total time from app open to home was under 10 seconds',
   '✓ No error messages appeared'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'I was sent to a "Complete Your Profile" screen',
     whatToDo: 'Check if your test account has name, city, AND gender filled. All three are required.',
     technicalNote: 'decideNextRoute() checks user.name, user.gender, and user.city'
    },
    {
     problem: 'I was sent to a login screen',
     whatToDo: 'Your login might have expired. Log in again and retry.',
     technicalNote: 'Token may have been cleared from storage'
    }
   ]
  },
  preconditions: ['User logged in with token', 'Profile has name, city, and gender filled'],
  testData: 'Test account with completed profile',
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-002',
  title: 'Logged In User with Incomplete Profile Goes to User Info',
  whatYoureTesting: 'Making sure users who logged in but never finished their profile (missing name, city, or gender) are sent to complete it before shopping.',
  whyItMatters: 'We need this information to personalize the experience and deliver orders correctly. Users must complete their profile.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-003'],
  relatedEdgeCases: ['EC-SPLASH-005', 'EC-SPLASH-006'],
  testSteps: [
   {
    step: 1,
    instruction: 'Create an account with incomplete profile',
    detailedSteps: [
     '1. You need a test account that verified the phone number (received OTP)',
     '2. BUT did not fill in name, city, or gender',
     '3. If you don\'t have one: Create new account, verify OTP, then on the profile screen tap "Skip" or close the app before filling anything',
     '4. Close the app completely'
    ],
    whatYouShouldSee: 'An account that can log in but has missing profile information',
    expectedResult: 'Test account with token but incomplete profile'
   },
   {
    step: 2,
    instruction: 'Open the app and watch where it takes you',
    detailedSteps: [
     '1. Open the BeeOrder app',
     '2. Watch the splash animation',
     '3. After the animation finishes, see what screen appears'
    ],
    whatYouShouldSee: 'Instead of the home screen, you should see a "User Info" or "Complete Your Profile" screen asking for your name, city, and gender.',
    expectedResult: 'User Info screen displayed with empty fields'
   },
   {
    step: 3,
    instruction: 'Verify you cannot skip this screen',
    detailedSteps: [
     '1. Try pressing the back button on your phone',
     '2. Try swiping to go back',
     '3. Try any way to get past this screen without filling in info'
    ],
    whatYouShouldSee: 'There should be no way to reach the home screen without completing your profile',
    expectedResult: 'Cannot navigate away without filling required fields'
   }
  ],
  successChecklist: [
   '✓ App detected missing profile information',
   '✓ User Info screen was shown (not home screen)',
   '✓ Cannot bypass profile completion',
   '✓ Screen clearly shows what fields are needed'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App went to home screen even with missing profile',
     whatToDo: 'Check that name, city, AND gender are all missing. One missing should trigger this.',
     technicalNote: 'decideNextRoute() may not be checking all required fields correctly'
    }
   ]
  },
  preconditions: ['User has token but missing name, gender, or city'],
  testData: 'Test account that passed OTP but never completed profile',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-003',
  title: 'User Who Started Login but Didn\'t Verify OTP Goes to OTP Screen',
  whatYoureTesting: 'Making sure users who entered their phone number but never verified the code are taken back to enter the code (not start over).',
  whyItMatters: 'If someone started signing up but got interrupted, we should help them continue from where they left off.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-003'],
  relatedEdgeCases: ['EC-SPLASH-006'],
  testSteps: [
   {
    step: 1,
    instruction: 'Create a situation where phone is saved but OTP was never verified',
    detailedSteps: [
     '1. Open the app fresh (log out if needed)',
     '2. Go to the login screen',
     '3. Enter a phone number and submit it',
     '4. You\'ll receive an OTP code via SMS',
     '5. IMPORTANT: Do NOT enter the code!',
     '6. Close the app completely (swipe away)'
    ],
    whatYouShouldSee: 'You should have entered a phone number but NOT the verification code',
    expectedResult: 'Phone number saved locally, no token stored'
   },
   {
    step: 2,
    instruction: 'Reopen the app and watch where it goes',
    detailedSteps: [
     '1. Open the BeeOrder app again',
     '2. Watch the splash animation',
     '3. After the animation, see what screen appears'
    ],
    whatYouShouldSee: 'You should be taken to the OTP/verification code screen (not the phone number entry screen)',
    expectedResult: 'OTP screen displayed with option to enter code or resend'
   },
   {
    step: 3,
    instruction: 'Verify you can request a new code',
    detailedSteps: [
     '1. Look for a "Resend Code" or "Send Again" button',
     '2. Tap it and confirm a new code is sent'
    ],
    whatYouShouldSee: 'Option to resend the verification code',
    expectedResult: 'Can request new OTP from this screen'
   }
  ],
  successChecklist: [
   '✓ App remembered the phone number',
   '✓ Went to OTP screen (not phone number screen)',
   '✓ Can request a new OTP code'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App went to phone number screen instead of OTP',
     whatToDo: 'The phone number may not have been saved. Report as bug.',
     technicalNote: 'MOBILE_NUMBER preference may not be persisting'
    },
    {
     problem: 'App went to home screen',
     whatToDo: 'A token might exist when it shouldn\'t. Check and report.',
     technicalNote: 'Token cleanup issue'
    }
   ]
  },
  preconditions: ['Phone number entered but OTP never verified'],
  testData: 'Phone number that received OTP but never verified',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-004',
  title: 'Guest User (Not Logged In) Goes to Home',
  whatYoureTesting: 'Making sure people who have never logged in can still browse the app as a guest.',
  whyItMatters: 'New customers want to browse before creating an account. If we force login immediately, we lose potential customers.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-003', 'UC-SPLASH-008'],
  relatedEdgeCases: ['EC-SPLASH-014'],
  testSteps: [
   {
    step: 1,
    instruction: 'Make sure you\'re completely logged out',
    detailedSteps: [
     '1. Open the app',
     '2. If logged in, go to Profile > Settings > Logout',
     '3. Alternatively, you can reinstall the app for a fresh start',
     '4. Close the app completely'
    ],
    whatYouShouldSee: 'App should have no saved login information',
    expectedResult: 'Logged out state with no token'
   },
   {
    step: 2,
    instruction: 'Open the app and watch where it goes',
    detailedSteps: [
     '1. Open the BeeOrder app',
     '2. If it\'s your first time, you may see a welcome intro - complete it',
     '3. Watch where you end up after the splash'
    ],
    whatYouShouldSee: 'You should go to the home screen where you can browse restaurants (even without logging in)',
    expectedResult: 'Home screen displayed for guest browsing'
   },
   {
    step: 3,
    instruction: 'Verify you can browse as a guest',
    detailedSteps: [
     '1. Try scrolling through the restaurants',
     '2. Try tapping on a restaurant to see its menu',
     '3. You should be able to browse (login only required for ordering)'
    ],
    whatYouShouldSee: 'Ability to browse restaurants and menus without being forced to log in',
    expectedResult: 'Can browse restaurants and view menus as guest'
   }
  ],
  successChecklist: [
   '✓ App went to home screen (not login)',
   '✓ Can browse restaurants without logging in',
   '✓ Guest visit was registered (backend tracks this)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Was forced to log in before seeing home',
     whatToDo: 'Report as critical bug - guests should be able to browse.',
     technicalNote: 'decideNextRoute() should return HOME for no token'
    }
   ]
  },
  preconditions: ['No token in storage', 'No saved phone number'],
  testData: 'Clean app state or fresh install',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-005',
  title: 'First-Time User Sees Welcome Introduction',
  whatYoureTesting: 'Making sure that when someone opens the app for the very first time, they see a friendly welcome that explains how the app works.',
  whyItMatters: 'First impressions are everything! New users need to understand what the app does before diving in.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-002'],
  relatedEdgeCases: ['EC-SPLASH-012', 'EC-SPLASH-013'],
  testSteps: [
   {
    step: 1,
    instruction: 'Delete and reinstall the app for a fresh start',
    detailedSteps: [
     '1. Find the BeeOrder app on your phone',
     '2. Delete/uninstall it completely',
     '3. Go to App Store or Play Store',
     '4. Download and install BeeOrder fresh'
    ],
    whatYouShouldSee: 'Fresh installation with no previous data',
    expectedResult: 'Clean app installation'
   },
   {
    step: 2,
    instruction: 'Open the app for the first time',
    detailedSteps: [
     '1. Tap the BeeOrder icon',
     '2. Watch the splash animation',
     '3. After the animation, you should see a welcome/intro screen'
    ],
    whatYouShouldSee: 'A welcome screen with colorful graphics explaining the app. You might see multiple pages you can swipe through.',
    expectedResult: 'Welcome/onboarding intro displayed'
   },
   {
    step: 3,
    instruction: 'Complete the welcome introduction',
    detailedSteps: [
     '1. Swipe through or tap "Next" on each intro page',
     '2. When you reach the end, tap "Get Started" or "Done"',
     '3. The intro should close'
    ],
    whatYouShouldSee: 'After completing intro, you should go to the home screen or login',
    expectedResult: 'Intro completed, goes to next screen'
   },
   {
    step: 4,
    instruction: 'Close and reopen - intro should NOT show again',
    detailedSteps: [
     '1. Close the app completely',
     '2. Open it again',
     '3. The intro should NOT appear again'
    ],
    whatYouShouldSee: 'After seeing the intro once, you should skip directly to normal flow',
    expectedResult: 'Intro skipped on second launch'
   }
  ],
  successChecklist: [
   '✓ Welcome intro appeared on first launch',
   '✓ Intro was clear and easy to navigate',
   '✓ Intro only appeared once (not on relaunch)',
   '✓ App continued normally after intro'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No intro appeared for fresh install',
     whatToDo: 'Make sure you completely uninstalled. Report if still fails.',
     technicalNote: 'IS_FIRST_APP flag may not be initializing'
    },
    {
     problem: 'Intro appeared again after I saw it',
     whatToDo: 'Report as bug - intro should only show once.',
     technicalNote: 'setFirstVisitCompleted() not saving correctly'
    }
   ]
  },
  preconditions: ['Fresh app installation', 'Never opened before on this device'],
  testData: 'No data needed - clean install',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // APP UPDATE TESTS
 // ============================================
 {
  id: 'TC-SPLASH-006',
  title: 'Forced Update Blocks App Usage',
  whatYoureTesting: 'Making sure that when a critical update is required, users MUST update - they cannot skip it.',
  whyItMatters: 'Sometimes there are security fixes or breaking changes. Everyone needs to update for safety.',
  estimatedTime: '5-7 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-004'],
  relatedEdgeCases: ['EC-SPLASH-009'],
  testSteps: [
   {
    step: 1,
    instruction: 'Get an older version that requires forced update',
    detailedSteps: [
     '1. You need an older version of the app',
     '2. AND the server must be configured to require an update',
     '3. Ask a developer to help set this up for testing',
     '4. Install the older version on your phone'
    ],
    whatYouShouldSee: 'Older app version installed',
    expectedResult: 'Old version with forced update enabled on server'
   },
   {
    step: 2,
    instruction: 'Open the app and look for update screen',
    detailedSteps: [
     '1. Open the old version of the app',
     '2. Watch the splash animation',
     '3. After the animation, you should see an "Update Required" screen'
    ],
    whatYouShouldSee: 'A full-screen message saying you must update the app. There should be an "Update" button.',
    expectedResult: 'Forced update screen displayed'
   },
   {
    step: 3,
    instruction: 'Try to bypass the update screen',
    detailedSteps: [
     '1. Try pressing the phone\'s back button',
     '2. Try tapping outside the message',
     '3. Try pressing home and reopening the app',
     '4. Try every way you can think of to skip it'
    ],
    whatYouShouldSee: 'Nothing should work - you should stay on the update screen',
    expectedResult: 'Cannot bypass forced update'
   },
   {
    step: 4,
    instruction: 'Tap Update and verify it opens the store',
    detailedSteps: [
     '1. Tap the "Update" button',
     '2. You should be taken to App Store or Play Store',
     '3. You should see the BeeOrder app page'
    ],
    whatYouShouldSee: 'The app store opens to the BeeOrder app page',
    expectedResult: 'Store opens to correct app'
   }
  ],
  successChecklist: [
   '✓ Update required screen appeared',
   '✓ Could not skip or bypass the update',
   '✓ Update button opened the correct store page',
   '✓ Message was clear (not scary or confusing)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Could skip the forced update',
     whatToDo: 'Explain exactly how you bypassed it. Critical bug!',
     technicalNote: 'update_type=2 should block all go to'
    }
   ]
  },
  preconditions: ['Older app version', 'Server configured for forced update'],
  testData: 'isValidVersion.status=false, update_type=2',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires developer coordination to set up server config'
 },
 {
  id: 'TC-SPLASH-007',
  title: 'Optional Update Can Be Skipped',
  whatYoureTesting: 'Making sure non-critical updates show a dialog that users CAN skip if they want to update later.',
  whyItMatters: 'Not all updates are urgent. Users should have the choice to update when convenient.',
  estimatedTime: '5-7 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-005'],
  relatedEdgeCases: ['EC-SPLASH-010'],
  testSteps: [
   {
    step: 1,
    instruction: 'Get an older version with optional update',
    detailedSteps: [
     '1. You need an older version of the app',
     '2. The server must be configured for OPTIONAL (soft) update',
     '3. Ask a developer to help configure this'
    ],
    whatYouShouldSee: 'Older app installed with soft update enabled',
    expectedResult: 'Old version with soft update on server'
   },
   {
    step: 2,
    instruction: 'Open the app and see the update popup',
    detailedSteps: [
     '1. Open the app',
     '2. After the splash, a popup should appear',
     '3. It should have TWO buttons: "Update" and "No Thanks"'
    ],
    whatYouShouldSee: 'A popup saying an update is available with options to update OR skip',
    expectedResult: 'Soft update dialog with both options'
   },
   {
    step: 3,
    instruction: 'Tap "No Thanks" to skip',
    detailedSteps: [
     '1. Tap "No Thanks" or "Skip" or "Later"',
     '2. The popup should close',
     '3. You should continue to the home screen'
    ],
    whatYouShouldSee: 'Popup closes and you can use the app normally',
    expectedResult: 'Dialog dismissed, app continues'
   },
   {
    step: 4,
    instruction: 'Reopen and try tapping "Update"',
    detailedSteps: [
     '1. Close and reopen the app',
     '2. When the popup appears, tap "Update"',
     '3. Should open the app store'
    ],
    whatYouShouldSee: 'App store opens to BeeOrder page',
    expectedResult: 'Update button works correctly'
   }
  ],
  successChecklist: [
   '✓ Optional update popup appeared',
   '✓ Could skip with "No Thanks"',
   '✓ "Update" button opened the store',
   '✓ App worked normally after skipping'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No skip option - treated like forced update',
     whatToDo: 'Screenshot showing no skip option. Report as bug.',
     technicalNote: 'update_type=1 should be dismissable'
    }
   ]
  },
  preconditions: ['Older app version', 'Soft update enabled on server'],
  testData: 'isValidVersion.status=false, update_type=1',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires developer coordination'
 },

 // ============================================
 // NETWORK & ERROR TESTS
 // ============================================
 {
  id: 'TC-SPLASH-008',
  title: 'No Internet Shows Retry Option',
  whatYoureTesting: 'Making sure when there\'s no internet, users see a helpful message and can retry.',
  whyItMatters: 'People don\'t always have perfect internet. The app shouldn\'t crash - it should explain the problem and let them retry.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-006'],
  relatedEdgeCases: ['EC-SPLASH-001', 'EC-SPLASH-002'],
  testSteps: [
   {
    step: 1,
    instruction: 'Turn off all internet on your phone',
    detailedSteps: [
     '1. Turn on Airplane Mode (easiest way)',
     '2. OR turn off both WiFi and Mobile Data',
     '3. Try loading a website to confirm no internet'
    ],
    whatYouShouldSee: 'No internet connection - websites won\'t load',
    expectedResult: 'Internet fully disconnected'
   },
   {
    step: 2,
    instruction: 'Open the app with no internet',
    detailedSteps: [
     '1. Make sure internet is still OFF',
     '2. Open the BeeOrder app',
     '3. Watch the splash animation',
     '4. After the animation, watch what happens'
    ],
    whatYouShouldSee: 'A popup or screen saying "No Connection" or similar, with a "Retry" button',
    expectedResult: 'Error dialog with retry option'
   },
   {
    step: 3,
    instruction: 'Turn internet back on and tap Retry',
    detailedSteps: [
     '1. Turn OFF Airplane Mode (restore internet)',
     '2. Wait a few seconds for connection',
     '3. Tap the "Retry" button'
    ],
    whatYouShouldSee: 'App should reload and take you to the home screen',
    expectedResult: 'App loads successfully after retry'
   }
  ],
  successChecklist: [
   '✓ App didn\'t crash with no internet',
   '✓ Clear error message was shown',
   '✓ Retry button appeared and worked',
   '✓ Couldn\'t accidentally dismiss the error'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashed with no internet',
     whatToDo: 'Note phone model. Try 3 times. Report as critical bug.',
     technicalNote: 'NoInternetException not being caught'
    },
    {
     problem: 'Got stuck forever with no error message',
     whatToDo: 'Wait 30 seconds for debug menu to appear. Report as bug.',
     technicalNote: 'Error listener not triggering bottom sheet'
    }
   ]
  },
  preconditions: ['App installed', 'Ability to control internet'],
  testData: 'No special data needed',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-009',
  title: 'Slow Network Still Loads Eventually',
  whatYoureTesting: 'Making sure the app works even on slow connections, just takes longer.',
  whyItMatters: 'Many customers have slow internet. The app should work, just slower.',
  estimatedTime: '5-7 minutes',
  type: 'Performance',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-001'],
  relatedEdgeCases: ['EC-SPLASH-003'],
  testSteps: [
   {
    step: 1,
    instruction: 'Simulate slow internet',
    detailedSteps: [
     '1. Move far from your WiFi router, OR',
     '2. Use a slow mobile network (3G), OR',
     '3. Ask a developer to help throttle your connection',
     '4. Verify internet is very slow (websites take 10+ seconds)'
    ],
    whatYouShouldSee: 'Very slow but working internet connection',
    expectedResult: 'Slow network simulated'
   },
   {
    step: 2,
    instruction: 'Open the app and wait patiently',
    detailedSteps: [
     '1. Open the BeeOrder app',
     '2. Watch the splash - it will stay longer than usual',
     '3. Be patient - it might take 15-30 seconds',
     '4. Eventually it should load'
    ],
    whatYouShouldSee: 'Splash stays longer, but app eventually loads to home screen',
    expectedResult: 'App loads successfully despite slow network'
   }
  ],
  successChecklist: [
   '✓ App eventually loaded (didn\'t crash)',
   '✓ Loaded within 60 seconds',
   '✓ No timeout error (unless extremely slow)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashed or showed error before loading',
     whatToDo: 'Note how long you waited. Report as performance issue.',
     technicalNote: 'Timeout may be too aggressive'
    }
   ]
  },
  preconditions: ['Slow but working internet'],
  testData: 'Throttled or weak connection',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // ANIMATION & VISUAL TESTS
 // ============================================
 {
  id: 'TC-SPLASH-010',
  title: 'Splash Animation Plays Smoothly',
  whatYoureTesting: 'Making sure the animated logo looks professional and doesn\'t freeze or skip.',
  whyItMatters: 'The splash is the first thing customers see. A choppy animation looks unprofessional.',
  estimatedTime: '1-2 minutes',
  type: 'UI',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-001'],
  relatedEdgeCases: ['EC-SPLASH-016', 'EC-SPLASH-017'],
  testSteps: [
   {
    step: 1,
    instruction: 'Close and reopen the app',
    detailedSteps: [
     '1. Close the BeeOrder app completely',
     '2. Open it again',
     '3. Watch the splash animation very carefully'
    ],
    whatYouShouldSee: 'An animated bee/logo that moves smoothly on a colored background',
    expectedResult: 'Animation plays from start to finish'
   },
   {
    step: 2,
    instruction: 'Evaluate the animation quality',
    detailedSteps: [
     '1. Did it start immediately or was there a delay?',
     '2. Did it play smoothly (no freezing or jumping)?',
     '3. Did it look professional?',
     '4. Did the colors look correct?'
    ],
    whatYouShouldSee: 'Smooth, professional animation with correct branding colors',
    expectedResult: 'Animation is smooth and visually appealing'
   }
  ],
  successChecklist: [
   '✓ Animation started quickly (within 1 second)',
   '✓ Animation was smooth (no stuttering)',
   '✓ Colors matched brand (yellow/orange theme)',
   '✓ Animation completed (didn\'t stop midway)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Animation was choppy or stuttering',
     whatToDo: 'Note phone model. Try on another device. Report if consistent.',
     technicalNote: 'Lottie animation performance issue'
    },
    {
     problem: 'Saw static logo instead of animation',
     whatToDo: 'Animation file may be missing. Report as bug.',
     technicalNote: 'StaticData.splashLink is null, fallback showing'
    }
   ]
  },
  preconditions: ['App installed'],
  testData: 'None needed',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-011',
  title: 'Arabic vs English Animation Shows Correctly',
  whatYoureTesting: 'Making sure the correct animation shows based on language (Arabic users see Arabic animation).',
  whyItMatters: 'Arabic text reads right-to-left. The animation should match the user\'s language.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-007'],
  relatedEdgeCases: ['EC-SPLASH-016'],
  testSteps: [
   {
    step: 1,
    instruction: 'Set app language to Arabic',
    detailedSteps: [
     '1. Open the app',
     '2. Go to Profile > Settings > Language',
     '3. Select Arabic (العربية)',
     '4. The app should restart or update'
    ],
    whatYouShouldSee: 'App is now in Arabic (text reads right to left)',
    expectedResult: 'Arabic language active'
   },
   {
    step: 2,
    instruction: 'Close and reopen to see Arabic splash',
    detailedSteps: [
     '1. Close the app completely',
     '2. Open it again',
     '3. Watch the splash animation',
     '4. If there\'s text, it should be in Arabic'
    ],
    whatYouShouldSee: 'Animation appropriate for Arabic users',
    expectedResult: 'Arabic animation displayed'
   },
   {
    step: 3,
    instruction: 'Change to English and verify',
    detailedSteps: [
     '1. Change language to English',
     '2. Close and reopen the app',
     '3. Verify the animation is English-appropriate'
    ],
    whatYouShouldSee: 'Animation switches based on language',
    expectedResult: 'English animation displayed'
   }
  ],
  successChecklist: [
   '✓ Arabic setting showed Arabic animation',
   '✓ English setting showed English animation',
   '✓ Animations loaded correctly for both'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Same animation for both languages',
     whatToDo: 'May be intentional if animation has no text. Verify with design team.',
     technicalNote: 'Check SPLASH_LOCAL_AR vs SPLASH_LOCAL_EN'
    }
   ]
  },
  preconditions: ['Can change app language'],
  testData: 'Splash animations for both languages cached',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // DEBUG & RECOVERY TESTS
 // ============================================
 {
  id: 'TC-SPLASH-012',
  title: 'Debug Menu Appears After 30 Seconds',
  whatYoureTesting: 'Making sure testers can access a hidden debug menu if the splash gets stuck.',
  whyItMatters: 'Sometimes things break. Testers need a way to reset the app without reinstalling.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-010'],
  relatedEdgeCases: ['EC-SPLASH-018'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open the app and wait 30 seconds',
    detailedSteps: [
     '1. Disable internet (to keep splash showing)',
     '2. Open the app',
     '3. Start a timer or count to 30',
     '4. Don\'t tap anything'
    ],
    whatYouShouldSee: 'Splash screen with logo animation',
    expectedResult: 'Waiting on splash for 30 seconds'
   },
   {
    step: 2,
    instruction: 'Look for the debug menu icon',
    detailedSteps: [
     '1. After 30 seconds, look at the top-right corner',
     '2. You should see three dots (⋮) appear',
     '3. This is the debug menu'
    ],
    whatYouShouldSee: 'Three-dot menu icon in top-right corner',
    expectedResult: 'Debug menu icon visible'
   },
   {
    step: 3,
    instruction: 'Tap the menu and select Reset',
    detailedSteps: [
     '1. Tap the three dots',
     '2. Tap "Reset" from the menu',
     '3. Confirm when asked'
    ],
    whatYouShouldSee: 'Confirmation dialog, then app restarts fresh',
    expectedResult: 'App clears data and restarts'
   }
  ],
  successChecklist: [
   '✓ Debug menu appeared after 30 seconds',
   '✓ Reset option was available',
   '✓ Reset actually cleared data and restarted',
   '✓ Menu was hidden before 30 seconds'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Menu never appeared',
     whatToDo: 'Wait full 30 seconds without touching screen. Report if still missing.',
     technicalNote: 'startDebugMenuTimer() should emit showDebugMenu:true after 30s'
    }
   ]
  },
  preconditions: ['App installed'],
  testData: 'None needed',
  automatable: false,
  status: 'Not Started',
  notes: 'May need to disable internet to keep splash visible'
 },
 {
  id: 'TC-SPLASH-013',
  title: 'Debug Reset Clears All Data',
  whatYoureTesting: 'Making sure the debug reset actually clears everything and the app restarts fresh.',
  whyItMatters: 'When testing, sometimes you need to start completely fresh without reinstalling.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-010'],
  relatedEdgeCases: ['EC-SPLASH-018'],
  testSteps: [
   {
    step: 1,
    instruction: 'Log in and configure the app',
    detailedSteps: [
     '1. Log in with a test account',
     '2. Change some settings (language, etc.)',
     '3. Browse some restaurants',
     '4. Make sure you\'re clearly logged in'
    ],
    whatYouShouldSee: 'Logged in state with customized settings',
    expectedResult: 'App has stored data'
   },
   {
    step: 2,
    instruction: 'Trigger the debug reset',
    detailedSteps: [
     '1. Close the app',
     '2. Disable internet',
     '3. Open the app and wait 30 seconds',
     '4. Tap the three-dot menu > Reset > Confirm'
    ],
    whatYouShouldSee: 'App clears and restarts',
    expectedResult: 'Debug reset triggered'
   },
   {
    step: 3,
    instruction: 'Verify everything was cleared',
    detailedSteps: [
     '1. Enable internet',
     '2. Watch what screen appears',
     '3. You should be logged OUT',
     '4. If first-time intro appears, all data was cleared'
    ],
    whatYouShouldSee: 'App behaves like fresh install - logged out, potentially showing intro',
    expectedResult: 'All data cleared, logged out'
   }
  ],
  successChecklist: [
   '✓ Was logged out after reset',
   '✓ Settings were reset to defaults',
   '✓ No crash during reset process'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Still logged in after reset',
     whatToDo: 'Reset may not be clearing token. Report as bug.',
     technicalNote: 'debugClearCacheAndLogout() should call logout and clear prefs'
    }
   ]
  },
  preconditions: ['Logged in with data stored'],
  testData: 'Active session with preferences',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // DEEP LINK TESTS
 // ============================================
 {
  id: 'TC-SPLASH-014',
  title: 'App Opens from Deep Link Correctly',
  whatYoureTesting: 'Making sure when users tap a BeeOrder link (like in a message), the app opens to the right place.',
  whyItMatters: 'Marketing sends links to specific restaurants or deals. Customers expect to land on the right page.',
  estimatedTime: '3-5 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-009'],
  relatedEdgeCases: ['EC-SPLASH-011'],
  testSteps: [
   {
    step: 1,
    instruction: 'Get a deep link to test',
    detailedSteps: [
     '1. Ask a developer for a test deep link, OR',
     '2. Find a BeeOrder link from a promotion/message',
     '3. The link might look like: beeorder://restaurant/123 or https://beeorder.app/r/123'
    ],
    whatYouShouldSee: 'A link that should open inside the app',
    expectedResult: 'Have a deep link to test'
   },
   {
    step: 2,
    instruction: 'Close the app and tap the link',
    detailedSteps: [
     '1. Make sure BeeOrder is completely closed',
     '2. Tap the deep link (from a message, email, or browser)',
     '3. Watch what happens'
    ],
    whatYouShouldSee: 'App opens, shows splash briefly, then goes to the linked content',
    expectedResult: 'App opens to specific destination'
   },
   {
    step: 3,
    instruction: 'Verify you landed on the right page',
    detailedSteps: [
     '1. Check that you\'re on the expected page (restaurant, dish, etc.)',
     '2. Not on the home page or wrong page'
    ],
    whatYouShouldSee: 'The specific page the link was for',
    expectedResult: 'Correct destination reached'
   }
  ],
  successChecklist: [
   '✓ App opened from the link',
   '✓ Splash appeared briefly',
   '✓ Landed on the correct page',
   '✓ No error messages'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Went to home instead of linked page',
     whatToDo: 'Deep link may not be processed correctly. Report with the exact link used.',
     technicalNote: 'DeepLinkHandler.instance.takePendingColdStartRequest() may fail'
    },
    {
     problem: 'App didn\'t open at all',
     whatToDo: 'Deep link scheme may not be registered. Report as critical.',
     technicalNote: 'Check app\'s link scheme registration'
    }
   ]
  },
  preconditions: ['Have a valid deep link', 'App installed'],
  testData: 'Working deep link link',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // BACKGROUND DATA TESTS
 // ============================================
 {
  id: 'TC-SPLASH-015',
  title: 'FCM Token Refreshes When Changed',
  whatYoureTesting: 'Making sure push notifications work by updating the notification token when it changes.',
  whyItMatters: 'If the token is outdated, customers won\'t receive order updates or promotions.',
  estimatedTime: '5+ minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-007'],
  relatedEdgeCases: ['EC-SPLASH-007'],
  testSteps: [
   {
    step: 1,
    instruction: 'Make sure you\'re logged in',
    detailedSteps: [
     '1. Open the app and log in if needed',
     '2. Accept notification permissions if asked',
     '3. Close the app'
    ],
    whatYouShouldSee: 'Logged in with notifications enabled',
    expectedResult: 'Logged in state with notification permission'
   },
   {
    step: 2,
    instruction: 'Send a test push notification',
    detailedSteps: [
     '1. Ask a developer to send a test notification to your account',
     '2. You should receive it',
     '3. This confirms your token is working'
    ],
    whatYouShouldSee: 'Push notification received on your phone',
    expectedResult: 'Test notification received'
   }
  ],
  successChecklist: [
   '✓ Logged in user receives push notifications',
   '✓ Token is being sent to server correctly'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Never received the test notification',
     whatToDo: 'Check notification permissions. Ask dev to verify token on server.',
     technicalNote: 'refreshFcmTokenIfNeeded() may not be updating'
    }
   ]
  },
  preconditions: ['Logged in', 'Notifications enabled'],
  testData: 'Developer can send test notification',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires backend coordination to verify'
 },
 {
  id: 'TC-SPLASH-016',
  title: 'Guest Visit is Registered',
  whatYoureTesting: 'Making sure the app records when non-logged-in users visit (for analytics).',
  whyItMatters: 'Tracking guest visits helps understand how many people browse before creating accounts.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-008'],
  relatedEdgeCases: ['EC-SPLASH-014'],
  testSteps: [
   {
    step: 1,
    instruction: 'Log out or use fresh install',
    detailedSteps: [
     '1. Make sure you\'re NOT logged in',
     '2. Fresh install or logged out state'
    ],
    whatYouShouldSee: 'App with no active login',
    expectedResult: 'Guest/logged out state'
   },
   {
    step: 2,
    instruction: 'Open the app as a guest',
    detailedSteps: [
     '1. Open the app',
     '2. Complete the intro if shown',
     '3. Browse as a guest (don\'t log in)'
    ],
    whatYouShouldSee: 'Home screen accessible without login',
    expectedResult: 'Browsing as guest'
   },
   {
    step: 3,
    instruction: 'Verify with backend (requires dev help)',
    detailedSteps: [
     '1. Ask a developer to check if guest visit was logged',
     '2. The device ID should be recorded in the database'
    ],
    whatYouShouldSee: 'Backend shows guest visit from your device',
    expectedResult: 'Guest visit recorded in backend'
   }
  ],
  successChecklist: [
   '✓ Could browse as guest',
   '✓ Guest visit was recorded (verify with dev)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Guest visit not recorded',
     whatToDo: 'Ask dev to check device ID fetching. Report if failing.',
     technicalNote: 'FlutterUdid.consistentUdid may fail'
    }
   ]
  },
  preconditions: ['Not logged in', 'Internet available'],
  testData: 'None needed',
  automatable: false,
  status: 'Not Started',
  notes: 'Backend verification required'
 },

 // ============================================
 // POST-LOGIN TASKS TESTS
 // ============================================
 {
  id: 'TC-SPLASH-017',
  title: 'User Addresses Load After Login',
  whatYoureTesting: 'Making sure the app loads your saved delivery addresses after you log in.',
  whyItMatters: 'Customers expect their saved addresses to be ready when they want to order.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-003'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Log in with an account that has saved addresses',
    detailedSteps: [
     '1. Use an account that has at least one saved address',
     '2. Log in and wait for splash to complete'
    ],
    whatYouShouldSee: 'Successfully logged in',
    expectedResult: 'Login complete'
   },
   {
    step: 2,
    instruction: 'Check that addresses loaded',
    detailedSteps: [
     '1. Look at the top of the home screen',
     '2. You should see your default address',
     '3. Or go to Profile > My Addresses',
     '4. All your saved addresses should appear'
    ],
    whatYouShouldSee: 'Saved addresses visible immediately',
    expectedResult: 'Addresses loaded and displayed'
   }
  ],
  successChecklist: [
   '✓ Addresses loaded after splash',
   '✓ Default address showing on home',
   '✓ All addresses available in profile'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Addresses didn\'t load - had to refresh',
     whatToDo: 'Note that addresses weren\'t pre-loaded. Report as bug.',
     technicalNote: 'runPostLoginTasks() may not be calling getAddresses()'
    }
   ]
  },
  preconditions: ['Account with saved addresses'],
  testData: 'Test account with at least one address',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-SPLASH-018',
  title: 'Cart Loads for Logged In User',
  whatYoureTesting: 'Making sure if you had items in your cart before, they\'re still there when you reopen the app.',
  whyItMatters: 'Customers hate losing their cart. If they close the app and come back, their items should be waiting.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-SPLASH-003'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Add items to cart then close the app',
    detailedSteps: [
     '1. Log in to the app',
     '2. Add some items to your cart',
     '3. Note what items you added',
     '4. Close the app completely'
    ],
    whatYouShouldSee: 'Items in cart before closing',
    expectedResult: 'Cart has items'
   },
   {
    step: 2,
    instruction: 'Reopen and verify cart',
    detailedSteps: [
     '1. Open the app again',
     '2. Wait for splash to complete',
     '3. Go to your cart',
     '4. Verify the items are still there'
    ],
    whatYouShouldSee: 'Same items in cart as before',
    expectedResult: 'Cart items persisted'
   }
  ],
  successChecklist: [
   '✓ Cart items were saved',
   '✓ Items appeared after reopening',
   '✓ Quantities were correct'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Cart was empty after reopening',
     whatToDo: 'Items may not be syncing. Report as critical bug.',
     technicalNote: 'loadCartIfLoggedIn() may be failing'
    }
   ]
  },
  preconditions: ['Logged in', 'Items in cart'],
  testData: 'Account with items in cart',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // INTRO QUESTIONS TESTS
 // ============================================
 {
  id: 'TC-SPLASH-019',
  title: 'Intro Questions Shown When Enabled',
  whatYoureTesting: 'Making sure the "How did you hear about us?" questions appear when enabled.',
  whyItMatters: 'Marketing needs to know how customers found the app to optimize advertising.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-009'],
  relatedEdgeCases: ['EC-SPLASH-015'],
  testSteps: [
   {
    step: 1,
    instruction: 'Verify intro questions are enabled',
    detailedSteps: [
     '1. Ask a developer if intro questions (Know Us) feature is enabled',
     '2. Server setting "invite" must be true',
     '3. User must be logged in and have questions available'
    ],
    whatYouShouldSee: 'Feature is enabled on server',
    expectedResult: 'Intro questions feature active'
   },
   {
    step: 2,
    instruction: 'Log in and watch for questions',
    detailedSteps: [
     '1. Log in to the app',
     '2. After splash, if questions are available, you should see them',
     '3. Questions might ask "How did you hear about us?"'
    ],
    whatYouShouldSee: 'Intro questions screen (if enabled and available)',
    expectedResult: 'Questions displayed for qualifying users'
   }
  ],
  successChecklist: [
   '✓ Questions appeared when they should',
   '✓ Could answer and continue',
   '✓ Questions didn\'t appear again after answering'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Questions never appeared',
     whatToDo: 'Verify server has invite=true and user has pending questions.',
     technicalNote: 'shouldShowIntroQuestions() checks multiple conditions'
    }
   ]
  },
  preconditions: ['Logged in', 'Invite feature enabled', 'Questions available'],
  testData: 'Server with intro questions configured',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires specific server configuration'
 },

 // ============================================
 // ASSET DOWNLOAD TESTS
 // ============================================
 {
  id: 'TC-SPLASH-020',
  title: 'Language Files Update When Version Changes',
  whatYoureTesting: 'Making sure text translations update when a new version is released.',
  whyItMatters: 'If we fix a typo or add new text, customers should see the fix without reinstalling.',
  estimatedTime: '5+ minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-007'],
  relatedEdgeCases: ['EC-SPLASH-004'],
  testSteps: [
   {
    step: 1,
    instruction: 'Note current language version',
    detailedSteps: [
     '1. Ask a developer to tell you the current lang version',
     '2. Use the app and note any specific text',
     '3. Ask dev to update lang version on server'
    ],
    whatYouShouldSee: 'Current language files active',
    expectedResult: 'Baseline established'
   },
   {
    step: 2,
    instruction: 'Reopen app after version change',
    detailedSteps: [
     '1. After dev confirms new version is live',
     '2. Close and reopen the app',
     '3. New language files should download during splash'
    ],
    whatYouShouldSee: 'App downloads new language files',
    expectedResult: 'New translations applied'
   }
  ],
  successChecklist: [
   '✓ New language version was detected',
   '✓ Files downloaded during splash',
   '✓ Updated text visible in app'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Old text still showing',
     whatToDo: 'Language version may not be updating. Report as bug.',
     technicalNote: 'ensureLangFiles() version check may fail'
    }
   ]
  },
  preconditions: ['Server lang version updated'],
  testData: 'Server with new langVersion',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires backend coordination'
 },
 {
  id: 'TC-SPLASH-021',
  title: 'Image stored data Clears When Version Changes',
  whatYoureTesting: 'Making sure old cached images are cleared when server says new images are available.',
  whyItMatters: 'If restaurant photos change, customers should see the new ones, not old cached versions.',
  estimatedTime: '5+ minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-007'],
  relatedEdgeCases: ['EC-SPLASH-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Use app to stored data some images',
    detailedSteps: [
     '1. Open the app and browse restaurants',
     '2. Visit several restaurant pages',
     '3. Close the app'
    ],
    whatYouShouldSee: 'Images loaded and displayed',
    expectedResult: 'Images cached locally'
   },
   {
    step: 2,
    instruction: 'Ask dev to increment image version',
    detailedSteps: [
     '1. Developer increases imagesVersion on server',
     '2. Reopen the app',
     '3. During splash, stored data should clear'
    ],
    whatYouShouldSee: 'Images may reload from server (brief loading)',
    expectedResult: 'Image stored data cleared, fresh images loaded'
   }
  ],
  successChecklist: [
   '✓ New image version detected',
   '✓ stored data was cleared',
   '✓ Fresh images loaded from server'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Old images still showing',
     whatToDo: 'stored data may not be clearing. Report as bug.',
     technicalNote: 'ensureImagesVersion() stored data clear may fail'
    }
   ]
  },
  preconditions: ['Images cached', 'Server imagesVersion updated'],
  testData: 'Server with new imagesVersion',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires backend coordination'
 },

 // ============================================
 // CRASHLYTICS TESTS
 // ============================================
 {
  id: 'TC-SPLASH-022',
  title: 'Crashlytics User Identifier Set Correctly',
  whatYoureTesting: 'Making sure crash reports include user info so developers can help specific users.',
  whyItMatters: 'When crashes happen, devs need to know which user experienced it to help them.',
  estimatedTime: '5+ minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-SPLASH-001'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Log in and trigger a crash (dev help needed)',
    detailedSteps: [
     '1. Log in to the app',
     '2. Ask a developer to help trigger a test crash',
     '3. Or use a debug build with crash button'
    ],
    whatYouShouldSee: 'App crashes',
    expectedResult: 'Test crash triggered'
   },
   {
    step: 2,
    instruction: 'Verify crash report has user info',
    detailedSteps: [
     '1. Ask developer to check Firebase Crashlytics console',
     '2. Crash should be tagged with your phone number (logged in user)',
     '3. Or "guest" if not logged in'
    ],
    whatYouShouldSee: 'Crash report linked to user',
    expectedResult: 'User identifier present in crash report'
   }
  ],
  successChecklist: [
   '✓ Crash report received',
   '✓ User identifier attached',
   '✓ Can identify which user crashed'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No user identifier in crash',
     whatToDo: 'Crashlytics setup may be wrong. Report to dev.',
     technicalNote: 'initializeCrashlyticsUser() may not be called'
    }
   ]
  },
  preconditions: ['Firebase Crashlytics enabled'],
  testData: 'Test crash mechanism',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires developer help to verify'
 },

 // ============================================
 // LOCATION PERMISSION TESTS
 // ============================================
 {
  id: 'TC-SPLASH-023',
  title: 'Location Permission Routes Correctly',
  whatYoureTesting: 'Making sure users without location permission are sent to request it.',
  whyItMatters: 'We need location to show nearby restaurants and deliver accurately.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-SPLASH-003'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Deny location permission',
    detailedSteps: [
     '1. Go to phone Settings > Apps > BeeOrder > Permissions',
     '2. Deny location permission',
     '3. Close the app completely'
    ],
    whatYouShouldSee: 'Location permission denied',
    expectedResult: 'No location access'
   },
   {
    step: 2,
    instruction: 'Open the app and see what happens',
    detailedSteps: [
     '1. Open the app',
     '2. After splash, you may be sent to a permission request screen',
     '3. Or home screen with a prompt to enable location'
    ],
    whatYouShouldSee: 'Either permission screen or home with location prompt',
    expectedResult: 'App handles missing permission gracefully'
   },
   {
    step: 3,
    instruction: 'Grant permission and verify',
    detailedSteps: [
     '1. Grant location when asked (or from Settings)',
     '2. App should now work fully'
    ],
    whatYouShouldSee: 'Full functionality with location enabled',
    expectedResult: 'App works correctly with permission'
   }
  ],
  successChecklist: [
   '✓ App handled missing permission',
   '✓ User was prompted to grant permission',
   '✓ Worked normally after granting'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashed without location permission',
     whatToDo: 'Report as critical - should handle gracefully.',
     technicalNote: 'navigateToHome() permission check may throw'
    }
   ]
  },
  preconditions: ['Can control location permission'],
  testData: 'None needed',
  automatable: false,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // ANALYTICS TESTS
 // ============================================
 {
  id: 'TC-SPLASH-024',
  title: 'Screen Recording Starts When Enabled',
  whatYoureTesting: 'Making sure analytics screen recording starts if enabled in settings.',
  whyItMatters: 'Screen recordings help understand how users interact with the app to improve it.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: ['UC-SPLASH-001'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Verify recording is enabled on server',
    detailedSteps: [
     '1. Ask developer if enableRecordingAnalytics is true in settings',
     '2. This controls whether sessions are recorded'
    ],
    whatYouShouldSee: 'Server setting confirmation',
    expectedResult: 'Recording enabled in settings'
   },
   {
    step: 2,
    instruction: 'Open app and use it',
    detailedSteps: [
     '1. Open the app and use it normally',
     '2. Browse around, tap things',
     '3. Recording happens silently in background'
    ],
    whatYouShouldSee: 'Normal app usage',
    expectedResult: 'Session potentially recorded'
   },
   {
    step: 3,
    instruction: 'Verify with analytics dashboard',
    detailedSteps: [
     '1. Ask developer to check analytics dashboard',
     '2. Session recording should be visible'
    ],
    whatYouShouldSee: 'Recording in analytics dashboard',
    expectedResult: 'Session recorded successfully'
   }
  ],
  successChecklist: [
   '✓ Recording started when enabled',
   '✓ No performance impact noticed',
   '✓ Session visible in analytics'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Recording not showing in dashboard',
     whatToDo: 'May be analytics provider issue. Report to dev.',
     technicalNote: 'AnalyticsManager.startScreenRecording() may fail'
    }
   ]
  },
  preconditions: ['enableRecordingAnalytics = true on server'],
  testData: 'Server with recording enabled',
  automatable: false,
  status: 'Not Started',
  notes: 'Requires analytics dashboard access to verify'
 }
];
