import type { EnhancedTestCase } from '@/lib/enhanced-qa-types';

// Sample enhanced test cases - fully detailed for non-technical testers
export const enhancedDishTestCases: EnhancedTestCase[] = [
  {
    id: 'TC-DISH-001',
    title: 'Add a Basic Dish to Cart',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure customers can add a dish to their cart',
    whyItMatters: 'This is the core action that starts a customer\'s order. If this doesn\'t work, customers can\'t buy anything.',
    complexity: 'Easy',
    estimatedTime: '2 minutes',
    prerequisites: {
      whatYouNeed: [
        'A phone or computer with the app installed',
        'A test account (username: testuser+[yourname]@example.com, password: Test123!)',
        'Internet connection'
      ],
      requiredTestData: {
        dishName: 'Margherita Pizza',
        dishId: '12345',
        expectedPrice: '$12.99'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Open the app and find the Margherita Pizza',
        howToDoIt: [
          '1. Tap the app icon on your phone to open it',
          '2. Look at the bottom of the screen - you\'ll see icons for Home, Search, Cart, and Profile',
          '3. Tap the "Search" icon (it looks like a magnifying glass)',
          '4. Type "Margherita Pizza" in the search box at the top',
          '5. Tap the blue "Search" button on your keyboard',
          '6. You should see a list of results - tap on "Margherita Pizza" to open it'
        ],
        whatYouShouldSee: 'A page with a large photo of the pizza at the top, the price ($12.99) below it, and a green "Add to Cart" button at the bottom',
        referenceScreenshot: 'screenshots/dish-detail-page.png',
        howToKnowItWorked: [
          '✓ You see the pizza photo clearly',
          '✓ The price shows $12.99',
          '✓ There\'s a green "Add to Cart" button you can tap'
        ],
        commonMistakes: [
          {
            mistake: 'Can\'t find the Search icon',
            solution: 'Look at the very bottom of your screen - it\'s the second icon from the left'
          },
          {
            mistake: 'Search results are empty',
            solution: 'Make sure you spelled "Margherita" correctly, or try searching just "Pizza"'
          }
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Tap the "Add to Cart" button',
        howToDoIt: [
          '1. Scroll down on the dish page if needed to see the button',
          '2. Look for a large green button at the bottom that says "Add to Cart" or "Add for $12.99"',
          '3. Tap the button once',
          '4. Wait 1-2 seconds'
        ],
        whatYouShouldSee: 'A green message appears at the top of the screen saying "Added to cart!" or "Item added successfully"',
        howToKnowItWorked: [
          '✓ A green message appears at the top',
          '✓ The message says something like "Added to cart!"',
          '✓ The cart icon at the bottom now shows a small red circle with the number "1" in it'
        ],
        commonMistakes: [
          {
            mistake: 'Nothing happens when you tap the button',
            solution: 'Make sure you have internet connection. If still nothing, take a screenshot and report this as a bug'
          },
          {
            mistake: 'An error message appears',
            solution: 'Take a screenshot of the error message and report it immediately'
          }
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Check that the dish is in your cart',
        howToDoIt: [
          '1. Tap the "Cart" icon at the bottom of the screen (it looks like a shopping bag)',
          '2. You should see the cart page open',
          '3. Look for "Margherita Pizza" in the list'
        ],
        whatYouShouldSee: 'The cart page showing "Margherita Pizza" with a quantity of 1 and a total price of $12.99',
        howToKnowItWorked: [
          '✓ You see "Margherita Pizza" listed in the cart',
          '✓ The quantity shows "1"',
          '✓ The price shows $12.99',
          '✓ The total at the bottom shows $12.99'
        ],
        commonMistakes: [
          {
            mistake: 'The cart is empty',
            solution: 'Go back to the dish page and try adding again. If it still doesn\'t work, report this as a bug'
          },
          {
            mistake: 'The price is different',
            solution: 'Take screenshots of both the dish page and cart page showing different prices and report this'
          }
        ]
      }
    ],
    successCriteria: {
      title: 'You\'ll know this test PASSED if:',
      checklist: [
        {
          criterion: 'The dish appears in your cart',
          howToVerify: 'Tap the Cart icon at the bottom of the screen. You should see "Margherita Pizza" listed.',
          visualCue: 'The cart icon should show a small red circle with the number "1" in it'
        },
        {
          criterion: 'The cart total is correct',
          howToVerify: 'Look at the bottom of the cart page. The subtotal should say "$12.99"',
          visualCue: 'The price is shown in large, bold numbers'
        },
        {
          criterion: 'You see a confirmation message',
          howToVerify: 'Right after tapping "Add to Cart", a green message pops up at the top that says "Added to cart!"',
          visualCue: 'The message appears for 2-3 seconds then disappears'
        }
      ]
    },
    failureIndicators: {
      title: 'You\'ll know this test FAILED if:',
      scenarios: [
        {
          whatHappened: 'Nothing happens when you tap "Add to Cart"',
          severity: 'Critical - STOP testing and report immediately',
          whatToReport: 'The button doesn\'t respond to taps',
          howToDocument: 'Take a screenshot of the button and note what time you tried this'
        },
        {
          whatHappened: 'An error message appears saying "Something went wrong"',
          severity: 'High - Report this issue',
          whatToReport: 'Error message appeared instead of adding to cart',
          howToDocument: 'Take a screenshot of the error message'
        },
        {
          whatHappened: 'The cart shows a different price than expected',
          severity: 'High - Report this issue',
          whatToReport: 'Price in cart ($XX.XX) doesn\'t match dish price ($12.99)',
          howToDocument: 'Take two screenshots: one of the dish page showing the price, one of the cart showing the different price'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong:',
      commonIssues: [
        {
          problem: 'The app crashed or closed',
          possibleCauses: [
            'Your internet connection was lost',
            'The app had a technical error',
            'Your phone\'s memory is full'
          ],
          whatToDo: [
            '1. Check your internet connection (open a web browser and see if websites load)',
            '2. Close the app completely (swipe up from the bottom of your phone and swipe the app away)',
            '3. Open the app again',
            '4. Try the test again',
            '5. If it crashes again, take a screenshot and report the issue'
          ]
        },
        {
          problem: 'The dish page won\'t load',
          possibleCauses: [
            'Slow internet connection',
            'The dish is no longer available',
            'Server is temporarily down'
          ],
          whatToDo: [
            '1. Wait 10 seconds to see if it loads',
            '2. Pull down on the screen to refresh',
            '3. If still not loading, tap the back button and try searching again',
            '4. If it never loads, report this issue with the dish name and time'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-DISH-001'],
    relatedEdgeCases: ['EC-DISH-030', 'EC-DISH-032'],
    preconditions: ['Restaurant is online', 'Dish is available', 'User is logged in'],
    automatable: true
  },
  {
    id: 'TC-DISH-004',
    title: 'Select Required Option',
    type: 'Functional',
    priority: 'P0',
    whatYoureTesting: 'Making sure customers can choose required options (like pizza size)',
    whyItMatters: 'Some dishes require you to pick an option before adding to cart. If this doesn\'t work, customers can\'t customize their order.',
    complexity: 'Medium',
    estimatedTime: '3 minutes',
    prerequisites: {
      whatYouNeed: [
        'A phone with the app installed',
        'A test account logged in',
        'A dish that has required options (like pizza size)'
      ],
      requiredTestData: {
        dishName: 'Custom Pizza',
        requiredOption: 'Size (Small, Medium, Large)'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Open a dish that has required options',
        howToDoIt: [
          '1. Search for "Custom Pizza" or any pizza dish',
          '2. Tap on the dish to open it',
          '3. Scroll down to find the "Size" section'
        ],
        whatYouShouldSee: 'A section labeled "Size" with options like "Small", "Medium", "Large" and a "Required" badge',
        howToKnowItWorked: [
          '✓ You see a "Size" section',
          '✓ There\'s a red "Required" badge or text',
          '✓ You see options like Small, Medium, Large'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Try to add to cart without selecting an option',
        howToDoIt: [
          '1. Scroll down to the "Add to Cart" button',
          '2. Try to tap the button without selecting a size'
        ],
        whatYouShouldSee: 'The button should be disabled (grayed out) or show an error message',
        howToKnowItWorked: [
          '✓ The button is grayed out and you can\'t tap it, OR',
          '✓ An error message appears saying "Please select a size"'
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Select a size option',
        howToDoIt: [
          '1. Go back to the Size section',
          '2. Tap on "Medium" (or any size option)',
          '3. You should see a checkmark or the option highlighted'
        ],
        whatYouShouldSee: 'The selected option is highlighted or shows a checkmark, and the "Required" badge disappears',
        howToKnowItWorked: [
          '✓ The option you tapped is now highlighted',
          '✓ The "Required" badge is gone',
          '✓ The price might update to show the new total'
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Now add to cart',
        howToDoIt: [
          '1. Scroll down to the "Add to Cart" button',
          '2. The button should now be green and tappable',
          '3. Tap the button'
        ],
        whatYouShouldSee: 'The dish is added to cart with the selected size option',
        howToKnowItWorked: [
          '✓ The button works now',
          '✓ You see a success message',
          '✓ The cart shows the dish with the size you selected'
        ]
      }
    ],
    successCriteria: {
      title: 'You\'ll know this test PASSED if:',
      checklist: [
        {
          criterion: 'You can\'t add to cart without selecting an option',
          howToVerify: 'The Add to Cart button is disabled or shows an error when no option is selected',
          visualCue: 'Button is grayed out or error message appears'
        },
        {
          criterion: 'Selecting an option enables the button',
          howToVerify: 'After selecting a size, the Add to Cart button becomes active',
          visualCue: 'Button changes from gray to green'
        },
        {
          criterion: 'The selected option is saved',
          howToVerify: 'Check the cart - it should show the dish with the size you selected',
          visualCue: 'Cart shows "Custom Pizza - Medium" (or whatever size you picked)'
        }
      ]
    },
    failureIndicators: {
      title: 'You\'ll know this test FAILED if:',
      scenarios: [
        {
          whatHappened: 'You can add to cart without selecting an option',
          severity: 'Critical - This is a major bug',
          whatToReport: 'Required options are not being enforced',
          howToDocument: 'Take screenshots showing you added to cart without selecting an option'
        },
        {
          whatHappened: 'The option selection doesn\'t work',
          severity: 'High - Report this issue',
          whatToReport: 'Tapping an option doesn\'t select it or the button stays disabled',
          howToDocument: 'Take a screenshot and describe which option you tried to select'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong:',
      commonIssues: [
        {
          problem: 'Can\'t find the options section',
          possibleCauses: [
            'The dish doesn\'t have required options',
            'You need to scroll down more'
          ],
          whatToDo: [
            '1. Try a different dish that definitely has options (like pizza)',
            '2. Scroll down more on the dish page',
            '3. If you still can\'t find it, note this in your test results'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-DISH-005'],
    relatedEdgeCases: ['EC-DISH-006', 'EC-DISH-008'],
    preconditions: ['Dish has required options'],
    automatable: true
  },
  {
    id: 'TC-DISH-010',
    title: 'Add Dish to Cart with Customizations',
    type: 'Functional',
    priority: 'P1',
    whatYoureTesting: 'Making sure customers can add customizations (like extra cheese, no onions) to their dish',
    whyItMatters: 'Customers want to personalize their orders. If customizations don\'t work, customers can\'t get exactly what they want.',
    complexity: 'Medium',
    estimatedTime: '4 minutes',
    prerequisites: {
      whatYouNeed: [
        'A phone with the app installed',
        'A test account logged in',
        'A dish that allows customizations (like pizza with toppings)'
      ],
      requiredTestData: {
        dishName: 'Custom Pizza',
        customization1: 'Extra Cheese',
        customization2: 'No Onions'
      }
    },
    detailedSteps: [
      {
        stepNumber: 1,
        instruction: 'Open a dish that allows customizations',
        howToDoIt: [
          '1. Search for a pizza or customizable dish',
          '2. Tap on it to open the dish page',
          '3. Scroll down to find the "Toppings" or "Customizations" section'
        ],
        whatYouShouldSee: 'A section with checkboxes or toggle switches for different toppings/customizations',
        howToKnowItWorked: [
          '✓ You see options like "Extra Cheese", "No Onions", etc.',
          '✓ Each option has a checkbox or toggle switch',
          '✓ You can see prices for some options (like +$2.00 for Extra Cheese)'
        ]
      },
      {
        stepNumber: 2,
        instruction: 'Select "Extra Cheese"',
        howToDoIt: [
          '1. Find the "Extra Cheese" option',
          '2. Tap the checkbox or toggle switch next to it',
          '3. You should see it get checked or turn on'
        ],
        whatYouShouldSee: 'The Extra Cheese option is now checked, and the total price updates to include the extra cost',
        howToKnowItWorked: [
          '✓ There\'s a checkmark in the Extra Cheese box',
          '✓ The price at the bottom increases (if Extra Cheese costs extra)',
          '✓ The option is highlighted or shows as selected'
        ]
      },
      {
        stepNumber: 3,
        instruction: 'Select "No Onions"',
        howToDoIt: [
          '1. Find the "No Onions" option (might be in a "Remove" or "Exclude" section)',
          '2. Tap the checkbox or toggle switch',
          '3. Make sure it\'s checked'
        ],
        whatYouShouldSee: 'The No Onions option is checked',
        howToKnowItWorked: [
          '✓ The No Onions option is checked',
          '✓ You might see a note that onions will be removed'
        ]
      },
      {
        stepNumber: 4,
        instruction: 'Add the customized dish to cart',
        howToDoIt: [
          '1. Scroll down to the "Add to Cart" button',
          '2. Make sure the price shows the correct total (including Extra Cheese cost)',
          '3. Tap "Add to Cart"'
        ],
        whatYouShouldSee: 'The dish is added to cart with your customizations',
        howToKnowItWorked: [
          '✓ You see a success message',
          '✓ The cart icon shows a number'
        ]
      },
      {
        stepNumber: 5,
        instruction: 'Verify customizations are saved in cart',
        howToDoIt: [
          '1. Tap the Cart icon',
          '2. Find your dish in the cart',
          '3. Look for details showing your customizations'
        ],
        whatYouShouldSee: 'The cart shows the dish with "Extra Cheese" and "No Onions" listed',
        howToKnowItWorked: [
          '✓ The dish name shows in the cart',
          '✓ You see "Extra Cheese" listed',
          '✓ You see "No Onions" or "Exclude: Onions" listed',
          '✓ The price includes the Extra Cheese cost'
        ]
      }
    ],
    successCriteria: {
      title: 'You\'ll know this test PASSED if:',
      checklist: [
        {
          criterion: 'Customizations can be selected',
          howToVerify: 'You can check/uncheck customization options',
          visualCue: 'Checkboxes respond when you tap them'
        },
        {
          criterion: 'Price updates correctly',
          howToVerify: 'When you add a paid customization, the total price increases',
          visualCue: 'Price at bottom of screen updates immediately'
        },
        {
          criterion: 'Customizations are saved in cart',
          howToVerify: 'Check the cart - it should list all your customizations',
          visualCue: 'Cart shows "Extra Cheese" and "No Onions" under the dish name'
        }
      ]
    },
    failureIndicators: {
      title: 'You\'ll know this test FAILED if:',
      scenarios: [
        {
          whatHappened: 'Customizations don\'t save in cart',
          severity: 'High - Report this issue',
          whatToReport: 'Selected customizations don\'t appear in the cart',
          howToDocument: 'Take screenshots: one showing customizations selected, one showing cart without them'
        },
        {
          whatHappened: 'Price doesn\'t update when adding customizations',
          severity: 'High - Report this issue',
          whatToReport: 'Price stays the same even after selecting paid customizations',
          howToDocument: 'Take screenshots showing the customization selected but price unchanged'
        }
      ]
    },
    troubleshooting: {
      title: 'If something goes wrong:',
      commonIssues: [
        {
          problem: 'Can\'t find customization options',
          possibleCauses: [
            'The dish doesn\'t allow customizations',
            'You need to scroll down more'
          ],
          whatToDo: [
            '1. Try a different dish (pizza usually has lots of customization options)',
            '2. Scroll down more on the dish page',
            '3. Look for sections labeled "Toppings", "Customize", or "Add-ons"'
          ]
        }
      ]
    },
    relatedUseCases: ['UC-DISH-006'],
    relatedEdgeCases: ['EC-DISH-010'],
    preconditions: ['Dish allows customizations'],
    automatable: false
  }
];




