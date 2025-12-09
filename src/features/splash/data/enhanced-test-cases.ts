import type { EnhancedTestCase } from '@/lib/enhanced-qa-types';

export const enhancedSplashTestCases: EnhancedTestCase[] = [
  // ============================================
  // HAPPY PATH TEST CASES
  // ============================================
  {
    id: 'TC-SPLASH-001',
    title: 'Fresh App Launch - Logged In User Goes to Home',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure that when someone who is already logged in opens the app, they see the logo animation and then go straight to the home screen where they can start shopping.',
    whyItMatters: 'This is the most common thing that happens every day! Customers who already have an account shouldn\'t have to log in again. They should be able to start shopping right away.',
    complexity: 'Easy',
    estimatedTime: '1-2 minutes',
    prerequisites: {
      whatYouNeed: [
        'A phone with the BeeOrder app installed',
        'An account that you\'ve already logged into before (you\'ve used the app and placed an order)',
        'WiFi or mobile data turned on'
      ],
      requiredTestData: {
        accountStatus: 'Already logged in with a complete profile (name, city, and gender filled out)',
        expectedDestination: 'Home screen with restaurants and food'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Make sure you\'re completely logged out of the app before starting',
        howToDoIt: [
          '1. Open the BeeOrder app',
          '2. If you see the home screen with restaurants, that means you\'re logged in - perfect!',
          '3. If you see a login or phone number screen, log in first with your test account',
          '4. Once logged in, close the app completely (don\'t just press the home button)',
          '   - On iPhone: Swipe up from the bottom and swipe the app away',
          '   - On Android: Tap the recent apps button and swipe the app away'
        ],
        whatYouShouldSee: 'The app should close completely - you won\'t see it running anymore',
        howToKnowItWorked: [
          '✓ The app is no longer visible in your recent apps list',
          '✓ You\'re back at your phone\'s home screen or wherever you were before'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Open the app and watch the splash screen carefully',
        howToDoIt: [
          '1. Find the BeeOrder app icon on your phone (it has a yellow/orange bee)',
          '2. Tap the icon once to open the app',
          '3. Watch what happens - don\'t tap anything!',
          '4. You should see the BeeOrder logo appear with an animation (it might zoom in, fade in, or have some movement)',
          '5. Count slowly in your head: "one Mississippi, two Mississippi, three Mississippi..."'
        ],
        whatYouShouldSee: 'An animated logo on a colored background (usually yellow/orange). The animation should be smooth and look professional - not choppy or frozen.',
        referenceScreenshot: 'screenshots/splash-animation.png',
        howToKnowItWorked: [
          '✓ You see the Bee logo clearly in the center of the screen',
          '✓ The animation plays smoothly (no freezing or jumping)',
          '✓ The background color looks normal (yellow/orange/primary color)',
          '✓ The animation lasts about 2-4 seconds'
        ],
        commonMistakes: [
          {
            mistake: 'The screen is completely white or black',
            solution: 'This is a problem! Take a screenshot and count to 10. If it\'s still white/black, force close the app and try again. If it happens twice, report it as a bug.'
          },
          {
            mistake: 'The animation looks choppy or frozen',
            solution: 'This might happen on older phones. Note what phone you\'re using and report this - the animation should be smooth.'
          }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Wait for the app to take you to the home screen',
        howToDoIt: [
          '1. Keep watching - don\'t tap anything',
          '2. After the animation finishes, the screen should change by itself',
          '3. You should see the home screen appear with restaurants and food options',
          '4. This should happen within about 5-10 seconds of opening the app'
        ],
        whatYouShouldSee: 'The home screen with: restaurant names and pictures, categories of food, possibly some promotions or featured items at the top, and a search bar.',
        howToKnowItWorked: [
          '✓ You see restaurant names and pictures',
          '✓ You can see categories like "Restaurants", "Markets", etc.',
          '✓ There\'s a search bar you could use to find food',
          '✓ You did NOT see any login screen or error message',
          '✓ The bottom of the screen has icons for Home, Search, Cart, Profile'
        ],
        commonMistakes: [
          {
            mistake: 'I see a screen asking for my phone number',
            solution: 'This means you weren\'t logged in! That\'s a problem if you were logged in before. Take a screenshot and report this - logged in users shouldn\'t see the login screen.'
          },
          {
            mistake: 'I see a screen asking me to fill in my name/city',
            solution: 'This means your profile isn\'t complete. This is expected if you never filled in your profile. Fill it in and try the test again.'
          },
          {
            mistake: 'The app is stuck on the splash screen forever',
            solution: 'Wait 30 seconds. If nothing happens, check your internet (try opening a website). If internet works, report this as a bug.'
          }
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'The splash animation played smoothly',
          howToVerify: 'The logo appeared and animated without freezing or looking choppy',
          visualCue: 'Smooth movement of the Bee logo'
        },
        {
          criterion: 'You went directly to the home screen',
          howToVerify: 'After the animation, you see restaurants and food - not a login screen',
          visualCue: 'Restaurant pictures and names are visible'
        },
        {
          criterion: 'It took less than 10 seconds total',
          howToVerify: 'From tapping the app icon to seeing home screen was quick',
          visualCue: 'Felt fast and responsive, not sluggish'
        },
        {
          criterion: 'No error messages appeared',
          howToVerify: 'You didn\'t see any popup boxes saying "Error" or "Something went wrong"',
          visualCue: 'Clean, smooth experience from start to finish'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'The splash screen was blank (white or black) instead of showing the logo',
          severity: 'High - This looks unprofessional and confusing',
          whatToReport: 'Splash screen shows blank/white screen instead of logo animation',
          howToDocument: 'Take a screenshot of the blank screen. Write down what phone you\'re using (like "iPhone 12" or "Samsung Galaxy S21").'
        },
        {
          whatHappened: 'I was sent to a login screen even though I was logged in before',
          severity: 'Critical - This means users might have been logged out unexpectedly',
          whatToReport: 'App sent logged-in user to login screen instead of home',
          howToDocument: 'Take a screenshot of the login screen. Note that you were previously logged in and had used the app before.'
        },
        {
          whatHappened: 'The app crashed or closed by itself',
          severity: 'Critical - App shouldn\'t crash on startup',
          whatToReport: 'App crashes immediately after splash screen',
          howToDocument: 'Write down: when exactly it crashed (during animation? after?), your phone model, and try opening it 3 times to see if it happens every time.'
        },
        {
          whatHappened: 'The splash screen stayed for more than 30 seconds',
          severity: 'High - App is stuck',
          whatToReport: 'App gets stuck on splash screen',
          howToDocument: 'Check if you have internet. Take a screenshot. Note how long you waited.'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'The app takes forever to load (more than 30 seconds)',
          possibleCauses: [
            'Your internet might be slow or disconnected',
            'The app\'s server might be having problems',
            'Your phone might be running low on memory'
          ],
          whatToDo: [
            '1. Check if you have internet: Open Safari/Chrome and see if Google.com loads',
            '2. If no internet: Turn on WiFi or check your mobile data is on',
            '3. If internet is fine: Close the app completely and try again',
            '4. If still stuck: Restart your phone and try again',
            '5. Still not working? Report it as a bug - mention your internet is working but app is stuck'
          ]
        },
        {
          problem: 'I was logged out even though I didn\'t log out',
          possibleCauses: [
            'Your login session might have expired (it\'s been a very long time)',
            'You might have cleared your phone\'s data',
            'There might be a bug in the app'
          ],
          whatToDo: [
            '1. Try logging in again with your phone number',
            '2. If you can log in successfully, that\'s fine - sessions do expire sometimes',
            '3. If this happens often (like every time you open the app), that\'s a bug - report it!'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-001', 'UC-SPLASH-003'],
    relatedEdgeCases: ['EC-SPLASH-005', 'EC-SPLASH-015'],
    preconditions: ['User is logged in with complete profile', 'Internet connection available'],
    automatable: true
  },
  {
    id: 'TC-SPLASH-003',
    title: 'First-Time User Sees Welcome Introduction',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure that when someone installs the app for the very first time and opens it, they see a friendly welcome introduction that explains how the app works.',
    whyItMatters: 'First impressions matter! New users need to understand what the app does and how to use it. Without a good welcome, they might get confused and delete the app.',
    complexity: 'Medium',
    estimatedTime: '2-3 minutes',
    prerequisites: {
      whatYouNeed: [
        'The BeeOrder app freshly installed (like you just downloaded it)',
        'This should be the FIRST time you\'ve ever opened this app on this phone',
        'WiFi or mobile data turned on'
      ],
      requiredTestData: {
        appState: 'Brand new installation - never opened before',
        expectedScreen: 'Welcome/onboarding screens with colorful graphics'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Make sure this is a completely fresh installation',
        howToDoIt: [
          '1. If you\'ve opened the app before on this phone, you need to delete it first',
          '   - On iPhone: Press and hold the app icon, tap "Remove App", then "Delete App"',
          '   - On Android: Press and hold the app icon, drag to "Uninstall"',
          '2. Go to the App Store (iPhone) or Play Store (Android)',
          '3. Search for "BeeOrder" and install it fresh',
          '4. Wait for the download to complete'
        ],
        whatYouShouldSee: 'The app icon appears on your home screen after installation',
        howToKnowItWorked: [
          '✓ You see the BeeOrder app icon on your phone',
          '✓ You haven\'t opened it yet - this will be the first time'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Open the app for the very first time',
        howToDoIt: [
          '1. Find the BeeOrder app icon on your phone',
          '2. Tap it once to open',
          '3. Watch carefully - you should see the logo animation first',
          '4. Then, instead of going to a home screen, you should see a welcome/introduction screen'
        ],
        whatYouShouldSee: 'After the logo animation, a welcome screen appears with colorful graphics explaining what the app does. You might see pages you can swipe through, or a "Get Started" button.',
        referenceScreenshot: 'screenshots/first-time-intro.png',
        howToKnowItWorked: [
          '✓ You see a welcome message (might say "Welcome" or "Get Started" or show the app features)',
          '✓ There are colorful pictures or illustrations',
          '✓ You see buttons like "Next", "Continue", or "Get Started"',
          '✓ This is different from the regular home screen with restaurants'
        ],
        commonMistakes: [
          {
            mistake: 'I went straight to the home screen with restaurants',
            solution: 'This is WRONG for a first-time user! Take a screenshot and report this bug. New users should see a welcome introduction first.'
          },
          {
            mistake: 'I saw a login screen immediately',
            solution: 'This might be intentional, but ideally new users should see a welcome first. Take a screenshot and note this in your report.'
          }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Complete the welcome introduction',
        howToDoIt: [
          '1. If there are multiple pages, swipe left or tap "Next" to see each one',
          '2. Read what each page says (this helps you understand the app)',
          '3. When you reach the last page, tap "Get Started" or "Finish" or whatever button is there',
          '4. The introduction should close and you should move to the next part of the app'
        ],
        whatYouShouldSee: 'After completing the introduction, you should see either: the home screen with restaurants, OR a login/signup screen asking for your phone number.',
        howToKnowItWorked: [
          '✓ You were able to go through all the welcome pages',
          '✓ After finishing, you moved to a new screen',
          '✓ The welcome screens don\'t come back if you close and reopen the app'
        ],
        commonMistakes: [
          {
            mistake: 'The buttons didn\'t work',
            solution: 'Try tapping different parts of the screen. If nothing works, take a screenshot and report as a bug.'
          },
          {
            mistake: 'I couldn\'t finish the introduction',
            solution: 'If you\'re stuck on a screen with no way forward, report this immediately - users can\'t use the app!'
          }
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Verify the introduction doesn\'t show again',
        howToDoIt: [
          '1. Close the app completely (swipe it away from recent apps)',
          '2. Open the app again',
          '3. Watch what happens after the logo animation'
        ],
        whatYouShouldSee: 'The welcome introduction should NOT appear again. You should go to wherever you were before (home screen or login).',
        howToKnowItWorked: [
          '✓ The introduction did NOT show a second time',
          '✓ The app remembered you\'ve already seen the welcome',
          '✓ You went straight to the home screen or login'
        ],
        commonMistakes: [
          {
            mistake: 'I saw the introduction again',
            solution: 'This might be a bug - the app should remember you\'ve seen it. Report this!'
          }
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'Welcome screens appeared for first-time user',
          howToVerify: 'After the logo animation, you saw welcome/introduction screens - not the home screen directly',
          visualCue: 'Colorful welcome graphics with "Get Started" type buttons'
        },
        {
          criterion: 'Introduction was easy to understand and navigate',
          howToVerify: 'You could read what it said and easily tap buttons to move forward',
          visualCue: 'Clear buttons, smooth transitions between pages'
        },
        {
          criterion: 'Introduction only showed once',
          howToVerify: 'When you closed and reopened the app, the introduction didn\'t show again',
          visualCue: 'App skips intro and goes to regular flow on second launch'
        },
        {
          criterion: 'App continued normally after introduction',
          howToVerify: 'After completing intro, you could use the app (see home screen or login)',
          visualCue: 'You\'re now in the "real" app, not stuck on intro'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'No welcome introduction appeared for a brand new installation',
          severity: 'High - New users miss important information',
          whatToReport: 'First-time user went straight to home/login without seeing welcome introduction',
          howToDocument: 'Confirm you deleted and reinstalled the app. Take a screenshot of what you saw instead.'
        },
        {
          whatHappened: 'Introduction appeared again after I\'d already seen it',
          severity: 'Medium - Annoying for users',
          whatToReport: 'Welcome introduction keeps showing every time app opens',
          howToDocument: 'Note that you completed the intro, closed the app, and it showed again on reopen.'
        },
        {
          whatHappened: 'Got stuck on an intro screen with no way to continue',
          severity: 'Critical - Users can\'t use the app at all!',
          whatToReport: 'Welcome screen has no working buttons - user is stuck',
          howToDocument: 'Take a screenshot showing the stuck screen. Describe what buttons you tried to tap.'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'I\'m not sure if my installation is "fresh"',
          possibleCauses: [
            'You might have opened the app before',
            'Your phone might be keeping old data even after reinstall'
          ],
          whatToDo: [
            '1. Delete the app completely',
            '2. On iPhone: Go to Settings > General > iPhone Storage > BeeOrder > Delete App',
            '3. On Android: Go to Settings > Apps > BeeOrder > Clear Data, then Uninstall',
            '4. Restart your phone',
            '5. Install the app again from the store',
            '6. Now open it - it should be truly fresh'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-002'],
    relatedEdgeCases: ['EC-SPLASH-012', 'EC-SPLASH-013'],
    preconditions: ['Fresh app installation', 'Never opened on this device before'],
    automatable: false
  },
  {
    id: 'TC-SPLASH-012',
    title: 'App Handles No Internet Connection Gracefully',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure that when someone opens the app with no internet, they see a helpful message and can retry once they have a connection - instead of the app crashing or getting stuck.',
    whyItMatters: 'People don\'t always have perfect internet! The app shouldn\'t crash or freeze when there\'s no connection. Users need to know what\'s wrong and how to fix it.',
    complexity: 'Medium',
    estimatedTime: '3-4 minutes',
    prerequisites: {
      whatYouNeed: [
        'A phone with the BeeOrder app installed',
        'The ability to turn off your internet (WiFi and mobile data)',
        'Knowledge of how to turn internet back on quickly'
      ],
      requiredTestData: {
        networkState: 'No internet connection (airplane mode or WiFi/data off)',
        expectedBehavior: 'Error message with retry button'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Turn off all internet connections on your phone',
        howToDoIt: [
          '1. The easiest way: Turn on Airplane Mode',
          '   - iPhone: Swipe down from top-right, tap the airplane icon',
          '   - Android: Swipe down from top, tap the airplane icon',
          '2. Make sure BOTH WiFi and mobile data are off',
          '3. You can verify by trying to open a website - it shouldn\'t load'
        ],
        whatYouShouldSee: 'Airplane mode icon in your status bar, websites won\'t load',
        howToKnowItWorked: [
          '✓ You see the airplane icon at the top of your screen',
          '✓ Opening Safari/Chrome shows "No Internet Connection"'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Close the BeeOrder app completely (if it\'s open)',
        howToDoIt: [
          '1. Swipe up from the bottom of your screen (or press the recent apps button)',
          '2. Find the BeeOrder app',
          '3. Swipe it away to close it completely'
        ],
        whatYouShouldSee: 'The app is no longer in your recent apps',
        howToKnowItWorked: [
          '✓ BeeOrder is not visible in recent apps anymore'
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Open the app with no internet',
        howToDoIt: [
          '1. Make sure airplane mode is still ON (no internet)',
          '2. Find and tap the BeeOrder app icon',
          '3. Watch what happens',
          '4. You should see the logo animation start',
          '5. After the animation, you should see an error message'
        ],
        whatYouShouldSee: 'After the logo animation, a popup or screen should appear saying something like "No Connection" or "Can\'t connect to server". There should be a "Retry" button.',
        referenceScreenshot: 'screenshots/no-internet-error.png',
        howToKnowItWorked: [
          '✓ The app didn\'t crash',
          '✓ You see an error message about connection',
          '✓ There\'s a "Retry" button you can tap',
          '✓ The message is clear and helpful (not confusing technical jargon)'
        ],
        commonMistakes: [
          {
            mistake: 'The app crashed or closed immediately',
            solution: 'This is a bug! The app should never crash. Report this immediately with your phone model.'
          },
          {
            mistake: 'The app got stuck on splash forever with no message',
            solution: 'Wait 30 seconds. If no message appears, that\'s a bug - the app should tell you there\'s no internet.'
          },
          {
            mistake: 'The error message is confusing or in code language',
            solution: 'Take a screenshot - error messages should be in plain language that anyone can understand.'
          }
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Turn internet back on and tap Retry',
        howToDoIt: [
          '1. Turn OFF Airplane Mode (tap the airplane icon again)',
          '2. Wait a few seconds for your connection to come back',
          '3. Now tap the "Retry" button in the app',
          '4. Watch what happens'
        ],
        whatYouShouldSee: 'The app should try to load again and this time succeed. You should see the normal home screen or wherever you would normally go.',
        howToKnowItWorked: [
          '✓ The error message went away',
          '✓ The app loaded successfully',
          '✓ You can see the home screen with restaurants',
          '✓ Everything works normally now'
        ],
        commonMistakes: [
          {
            mistake: 'The Retry button didn\'t do anything',
            solution: 'Make sure your internet is really back (test by opening a website). If internet works but Retry doesn\'t, that\'s a bug.'
          },
          {
            mistake: 'The error message came back even with internet',
            solution: 'Check if your internet is slow. If you have good internet but keep seeing the error, report this bug.'
          }
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'App didn\'t crash with no internet',
          howToVerify: 'The app stayed open (didn\'t close by itself) when there was no internet',
          visualCue: 'You\'re still looking at the app, it didn\'t disappear'
        },
        {
          criterion: 'Clear error message was shown',
          howToVerify: 'You saw a message explaining there\'s no connection (not technical gibberish)',
          visualCue: 'Message says something like "No internet connection" or "Can\'t connect"'
        },
        {
          criterion: 'Retry button worked',
          howToVerify: 'After turning internet back on, tapping Retry made the app load successfully',
          visualCue: 'You ended up on the home screen after tapping Retry'
        },
        {
          criterion: 'Error couldn\'t be accidentally dismissed',
          howToVerify: 'You couldn\'t just tap outside the message to make it go away (had to tap Retry)',
          visualCue: 'Tapping elsewhere on the screen didn\'t close the error'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'The app crashed when there was no internet',
          severity: 'Critical - Apps should never crash',
          whatToReport: 'App crashes immediately when opened without internet',
          howToDocument: 'Note your phone model, try it 3 times to confirm it crashes consistently.'
        },
        {
          whatHappened: 'App got stuck forever on splash with no error message',
          severity: 'High - User has no idea what\'s wrong',
          whatToReport: 'App stuck on splash screen with no internet - no error message shown',
          howToDocument: 'Wait at least 30 seconds before reporting. Note that no message ever appeared.'
        },
        {
          whatHappened: 'Error message was confusing or scary',
          severity: 'Medium - Bad user experience',
          whatToReport: 'Error message says [exact text] which is confusing',
          howToDocument: 'Take a screenshot and explain why the message is confusing.'
        },
        {
          whatHappened: 'Retry button didn\'t work even with good internet',
          severity: 'High - User is stuck',
          whatToReport: 'Retry button doesn\'t work - can\'t proceed even after restoring internet',
          howToDocument: 'Confirm your internet works (test a website), then report this.'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'I can\'t figure out how to turn off internet',
          possibleCauses: [
            'Settings are different on every phone'
          ],
          whatToDo: [
            '1. Look for "Settings" app on your phone',
            '2. Search for "Airplane mode" or look in Network settings',
            '3. Or ask someone for help with your specific phone'
          ]
        },
        {
          problem: 'Internet came back on by itself',
          possibleCauses: [
            'Your phone might auto-connect to known WiFi',
            'Airplane mode might have turned off'
          ],
          whatToDo: [
            '1. Double-check that airplane mode is still on',
            '2. If your phone auto-connected to WiFi, go to Settings > WiFi and turn WiFi off',
            '3. Make sure mobile data is also off'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-006'],
    relatedEdgeCases: ['EC-SPLASH-001', 'EC-SPLASH-002'],
    preconditions: ['App installed', 'Ability to control internet connection'],
    automatable: false
  },
  {
    id: 'TC-SPLASH-008',
    title: 'Forced Update Blocks App Usage',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure that when a critical update is required, users can\'t skip it - they must update the app before continuing.',
    whyItMatters: 'Sometimes there are critical security fixes or breaking changes that require everyone to update. If users could skip important updates, they might have a broken or unsafe experience.',
    complexity: 'Complex',
    estimatedTime: '5-7 minutes',
    prerequisites: {
      whatYouNeed: [
        'An OLDER version of the app (not the latest)',
        'This test requires help from a developer to set up the "forced update" flag on the server',
        'WiFi or mobile data'
      ],
      requiredTestData: {
        appVersion: 'Old version that triggers forced update',
        serverConfig: 'isValidVersion.status = false, update_type = 2'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Confirm you have an older version of the app that requires update',
        howToDoIt: [
          '1. You need an older version of the app that the server says must be updated',
          '2. This usually requires a developer to help set this up',
          '3. Or you might need to install an older APK/IPA file',
          '4. Ask your test coordinator if this test is ready to run'
        ],
        whatYouShouldSee: 'You have the app installed and a developer confirmed the forced update is enabled',
        howToKnowItWorked: [
          '✓ Developer confirmed the test is ready',
          '✓ You have the correct old version installed'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Open the app and observe the update screen',
        howToDoIt: [
          '1. Tap the app icon to open',
          '2. Watch the logo animation',
          '3. After the animation, you should see an update required screen',
          '4. This screen should explain that you need to update'
        ],
        whatYouShouldSee: 'A full-screen message saying "Update Required" with an "Update" button that takes you to the app store.',
        howToKnowItWorked: [
          '✓ You see a clear "Update Required" message',
          '✓ There\'s a button to update (goes to app store)',
          '✓ You cannot dismiss this screen or continue using the app'
        ],
        commonMistakes: [
          {
            mistake: 'The app let me continue without updating',
            solution: 'This is a CRITICAL bug for forced updates! Users should not be able to skip. Report immediately.'
          }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Try to dismiss or bypass the update screen',
        howToDoIt: [
          '1. Try pressing the back button on your phone',
          '2. Try tapping outside the message',
          '3. Try pressing the home button and reopening the app'
        ],
        whatYouShouldSee: 'Nothing should work - you should stay on the update screen or see it again when you reopen.',
        howToKnowItWorked: [
          '✓ Back button doesn\'t close the update screen',
          '✓ Tapping outside doesn\'t dismiss it',
          '✓ Reopening the app shows the update screen again'
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Tap the Update button',
        howToDoIt: [
          '1. Tap the "Update" button on the update screen',
          '2. You should be taken to the App Store (iPhone) or Play Store (Android)',
          '3. You should see the BeeOrder app page where you can update'
        ],
        whatYouShouldSee: 'The store opens directly to the BeeOrder app page',
        howToKnowItWorked: [
          '✓ Store opened (you left the BeeOrder app)',
          '✓ You\'re on the BeeOrder page in the store',
          '✓ You could tap "Update" in the store to get the new version'
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'Update screen appeared and couldn\'t be skipped',
          howToVerify: 'No way to continue using the app without updating',
          visualCue: 'Every attempt to bypass leads back to update screen'
        },
        {
          criterion: 'Update button went to the correct app store',
          howToVerify: 'Tapping Update opens the store to the right app page',
          visualCue: 'You see BeeOrder in the App Store or Play Store'
        },
        {
          criterion: 'Message was clear and not scary',
          howToVerify: 'The message explained WHY an update is needed and was friendly',
          visualCue: 'Professional, reassuring message about improvements or important changes'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'User could skip the forced update and use the app',
          severity: 'Critical - Defeats the purpose of forced updates',
          whatToReport: 'Forced update can be bypassed - user can continue without updating',
          howToDocument: 'Explain exactly how you bypassed it (back button? tap outside? etc.)'
        },
        {
          whatHappened: 'Update button went to wrong app or didn\'t work',
          severity: 'High - User can\'t update even if they want to',
          whatToReport: 'Update button doesn\'t open app store correctly',
          howToDocument: 'Note what happened when you tapped it (nothing? wrong app? error?)'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'I don\'t see an update screen - the app works normally',
          possibleCauses: [
            'Your app version might not be old enough',
            'The forced update flag might not be set on the server'
          ],
          whatToDo: [
            '1. Check with a developer that the forced update is enabled',
            '2. Verify you have the correct old version of the app',
            '3. This test might not be runnable right now - skip and note it'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-004'],
    relatedEdgeCases: ['EC-SPLASH-009'],
    preconditions: ['Old app version installed', 'Forced update enabled on server'],
    automatable: false
  },
  {
    id: 'TC-SPLASH-010',
    title: 'Optional Update Can Be Skipped',
    type: 'Functional',
    priority: 'P1',
    whatYoureTesting: 'Making sure that when a non-critical update is available, users can choose to update OR skip it and continue using the app.',
    whyItMatters: 'Not all updates are critical. Sometimes users are busy and want to update later. They should have the choice.',
    complexity: 'Complex',
    estimatedTime: '5-7 minutes',
    prerequisites: {
      whatYouNeed: [
        'An older version of the app (not the latest)',
        'Server configured with optional/soft update flag',
        'WiFi or mobile data'
      ],
      requiredTestData: {
        appVersion: 'Slightly old version that triggers soft update',
        serverConfig: 'isValidVersion.status = false, update_type = 1'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Open the app with an older version',
        howToDoIt: [
          '1. Make sure you have an older version that triggers the optional update',
          '2. Open the app and wait for the logo animation',
          '3. After the animation, a popup should appear about an available update'
        ],
        whatYouShouldSee: 'A popup or bottom sheet saying "Update Available" with TWO buttons: "Update" and "No Thanks" (or similar)',
        howToKnowItWorked: [
          '✓ You see a message about an available update',
          '✓ There\'s an "Update" button',
          '✓ There\'s a "Skip" or "No Thanks" button'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Tap "No Thanks" to skip the update',
        howToDoIt: [
          '1. Find the "No Thanks" or "Skip" button',
          '2. Tap it',
          '3. The popup should close and the app should continue normally'
        ],
        whatYouShouldSee: 'The popup closes and you go to the home screen or wherever you would normally go.',
        howToKnowItWorked: [
          '✓ The update popup went away',
          '✓ You can now use the app normally',
          '✓ You see the home screen with restaurants'
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Close and reopen - tap "Update" this time',
        howToDoIt: [
          '1. Close the app completely',
          '2. Open it again',
          '3. When the update popup appears, tap "Update" this time'
        ],
        whatYouShouldSee: 'The app store opens to the BeeOrder page',
        howToKnowItWorked: [
          '✓ Store opened to the correct app page',
          '✓ You could update if you wanted to'
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'Update popup appeared',
          howToVerify: 'You saw a popup about an available update',
          visualCue: 'Dialog with update message and options'
        },
        {
          criterion: '"No Thanks" let you continue',
          howToVerify: 'Tapping "No Thanks" closed the popup and let you use the app',
          visualCue: 'Home screen visible after dismissing'
        },
        {
          criterion: '"Update" opened the store',
          howToVerify: 'Tapping "Update" took you to the app store',
          visualCue: 'Store opened to BeeOrder page'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'Optional update couldn\'t be skipped',
          severity: 'High - Users are forced to update when they shouldn\'t be',
          whatToReport: 'Soft update has no skip option - behaving like forced update',
          howToDocument: 'Screenshot the popup showing no skip/dismiss option'
        },
        {
          whatHappened: 'No update popup appeared at all',
          severity: 'Medium - Update notification not working',
          whatToReport: 'No soft update popup shown for older app version',
          howToDocument: 'Confirm with developer that soft update should be enabled'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'Can\'t tell if this is a soft update or forced update',
          possibleCauses: [
            'The server config might be set wrong'
          ],
          whatToDo: [
            '1. A soft update MUST have a way to dismiss/skip',
            '2. If there\'s no skip option, it\'s behaving like a forced update',
            '3. Check with developer what type of update is configured'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-005'],
    relatedEdgeCases: ['EC-SPLASH-010'],
    preconditions: ['Older app version', 'Soft update enabled on server'],
    automatable: false
  },
  {
    id: 'TC-SPLASH-022',
    title: 'Debug Menu Appears After 30 Seconds',
    type: 'Functional',
    priority: 'P2',
    whatYoureTesting: 'Making sure testers can access a hidden debug menu if the splash screen is stuck, allowing them to reset the app.',
    whyItMatters: 'Sometimes the splash can get stuck due to bugs or server issues. Testers need a way to recover without reinstalling the entire app.',
    complexity: 'Easy',
    estimatedTime: '2-3 minutes',
    prerequisites: {
      whatYouNeed: [
        'The BeeOrder app installed',
        'A timer or clock to count 30 seconds',
        'Patience!'
      ],
      requiredTestData: {
        waitTime: '30 seconds on splash screen',
        expectedFeature: 'Three-dot menu appears in top-right corner'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Open the app and start a timer',
        howToDoIt: [
          '1. Open the BeeOrder app',
          '2. As soon as you see the splash screen with the logo, start counting',
          '3. You can use a stopwatch or just count "one Mississippi, two Mississippi..."',
          '4. Wait for 30 seconds without touching anything'
        ],
        whatYouShouldSee: 'The splash screen with the logo animation',
        howToKnowItWorked: [
          '✓ You\'re on the splash screen',
          '✓ You\'re counting/timing'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Look for a menu icon after 30 seconds',
        howToDoIt: [
          '1. After 30 seconds, look at the top-right corner of the screen',
          '2. You should see three dots (⋮) appear - this is the debug menu',
          '3. It might be subtle, so look carefully'
        ],
        whatYouShouldSee: 'A three-dot menu icon (⋮) in the top-right corner of the screen',
        howToKnowItWorked: [
          '✓ You can see a small menu icon in the corner',
          '✓ It appeared after about 30 seconds',
          '✓ It\'s tappable'
        ],
        commonMistakes: [
          {
            mistake: 'I don\'t see any menu icon',
            solution: 'Wait a bit longer - make sure it\'s been a full 30 seconds. The icon might be small and white, hard to see.'
          },
          {
            mistake: 'The app navigated away before 30 seconds',
            solution: 'The app might have loaded faster than expected. You might need to simulate slow internet to keep it on splash longer.'
          }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Tap the menu and select "Reset"',
        howToDoIt: [
          '1. Tap the three-dot menu icon',
          '2. A menu should appear with a "Reset" option',
          '3. Tap "Reset"',
          '4. You should see a confirmation asking if you\'re sure'
        ],
        whatYouShouldSee: 'A menu with "Reset" option, then a confirmation dialog',
        howToKnowItWorked: [
          '✓ Menu appeared when you tapped the icon',
          '✓ "Reset" option is available',
          '✓ Confirmation dialog appears when you tap Reset'
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Confirm the reset and observe',
        howToDoIt: [
          '1. Tap "Confirm" or "Yes" on the dialog',
          '2. The app should clear all data and restart',
          '3. You might see the app reload from the beginning'
        ],
        whatYouShouldSee: 'The app restarts fresh, like it was just installed',
        howToKnowItWorked: [
          '✓ The app restarted',
          '✓ You might see the first-time introduction again',
          '✓ Your login was cleared (you\'ll need to log in again)'
        ]
      }
    ],
    successCriteria: {
      title: 'This test PASSED if all of these are true:',
      checklist: [
        {
          criterion: 'Debug menu appeared after 30 seconds',
          howToVerify: 'You saw the three-dot menu icon appear',
          visualCue: 'Small icon visible in top-right area'
        },
        {
          criterion: 'Reset option worked',
          howToVerify: 'Tapping Reset cleared the app and restarted it',
          visualCue: 'App went back to initial state'
        },
        {
          criterion: 'Menu is only visible after waiting',
          howToVerify: 'Menu was NOT visible immediately - only after 30 seconds',
          visualCue: 'Users wouldn\'t accidentally see this in normal use'
        }
      ]
    },
    failureIndicators: {
      title: 'This test FAILED if any of these happened:',
      scenarios: [
        {
          whatHappened: 'Debug menu never appeared',
          severity: 'Low - Testers have less options for recovery',
          whatToReport: 'Debug menu doesn\'t appear after 30+ seconds on splash',
          howToDocument: 'Note how long you waited, and confirm you didn\'t touch the screen'
        },
        {
          whatHappened: 'Reset button didn\'t work',
          severity: 'Low - Debug feature not functioning',
          whatToReport: 'Debug Reset option doesn\'t clear app data',
          howToDocument: 'Describe what happened when you tapped Reset'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong, try these fixes:',
      commonIssues: [
        {
          problem: 'App navigated away too fast to see the menu',
          possibleCauses: [
            'App loaded successfully before 30 seconds'
          ],
          whatToDo: [
            '1. Turn on airplane mode (no internet)',
            '2. Open the app',
            '3. Now it will be stuck on splash, giving you time to wait for the menu',
            '4. After menu appears, you can test the Reset function'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-SPLASH-013'],
    relatedEdgeCases: ['EC-SPLASH-029', 'EC-SPLASH-030'],
    preconditions: ['App installed'],
    automatable: false
  }
];




