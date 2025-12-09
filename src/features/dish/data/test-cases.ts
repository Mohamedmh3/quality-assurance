import type { TestCase } from '@/lib/types';

export const dishTestCases: TestCase[] = [
 // ============================================
 // go to & LOADING TESTS
 // ============================================
 {
  id: 'TC-DISH-001',
  title: 'Load Dish from Restaurant Menu',
  whatYoureTesting: 'Making sure you can open a dish page from a restaurant menu and see all the dish information',
  whyItMatters: 'This is the first step in ordering food. If dishes don\'t load properly, customers can\'t see what they\'re ordering.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-001'],
  relatedEdgeCases: ['EC-DISH-030', 'EC-DISH-032'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open a restaurant menu page',
    detailedSteps: [
     '1. Open the BeeOrder app on your phone',
     '2. Make sure you\'re logged in (if not, log in first)',
     '3. Tap on "Restaurants" or "Browse" at the bottom of the screen',
     '4. Find and tap on any restaurant (try one that\'s currently open)',
     '5. You should now see the restaurant\'s menu page with a list of dishes'
    ],
    whatYouShouldSee: 'A page showing the restaurant name at the top, and below it a list of dishes with photos, names, and prices',
    expectedResult: 'Restaurant menu page opens and displays all available dishes'
   },
   {
    step: 2,
    instruction: 'Tap on any dish item to open it',
    detailedSteps: [
     '1. Scroll through the menu to find a dish (any dish is fine)',
     '2. Tap on the dish card (the box showing the dish photo and name)',
     '3. Watch the screen - you might see a loading spinner briefly'
    ],
    whatYouShouldSee: 'The screen transitions to a new page, and you might see a loading spinner (a spinning circle) for 1-2 seconds',
    expectedResult: 'Dish page starts to open with a loading indicator'
   },
   {
    step: 3,
    instruction: 'Wait for the dish page to fully load',
    detailedSteps: [
     '1. Wait 2-3 seconds for everything to load',
     '2. Look at the top of the screen - you should see a large photo of the dish',
     '3. Below the photo, you should see the dish name in large, bold text',
     '4. Below the name, you should see a description of the dish',
     '5. You should also see the price clearly displayed (usually in a prominent location)'
    ],
    whatYouShouldSee: 'A full dish page with: a large dish photo at the top, the dish name below it, a description, and the price clearly visible',
    expectedResult: 'All dish information displays correctly: image, name, description, and price'
   },
   {
    step: 4,
    instruction: 'Check if there are options to select (like size, type, etc.)',
    detailedSteps: [
     '1. Scroll down on the dish page',
     '2. Look for sections labeled "Options" or "Choose your..."',
     '3. If you see options, check if any have a red "Required" badge or label',
     '4. If there are no options, that\'s fine - just note it and move to the next step'
    ],
    whatYouShouldSee: 'If options exist: they appear as selectable choices (like radio buttons or checkboxes), and required ones are clearly marked with "Required"',
    expectedResult: 'Options section displays correctly with required indicators if applicable'
   },
   {
    step: 5,
    instruction: 'Check if there are toppings available',
    detailedSteps: [
     '1. Continue scrolling down the dish page',
     '2. Look for a section called "Toppings" or "Add-ons"',
     '3. If toppings exist, they should be grouped by category (like "Cheese", "Vegetables", etc.)',
     '4. Each topping should have a + button or checkbox next to it',
     '5. If there are no toppings, that\'s normal - just note it'
    ],
    whatYouShouldSee: 'If toppings exist: they appear in organized groups with + buttons or checkboxes next to each one',
    expectedResult: 'Toppings section displays correctly, grouped by category if applicable'
   },
   {
    step: 6,
    instruction: 'Check the bottom section with quantity and Add to Cart',
    detailedSteps: [
     '1. Scroll all the way to the bottom of the dish page',
     '2. You should see a section that stays at the bottom (it might be sticky)',
     '3. Look for a quantity selector with a - and + button, showing a number (usually "1")',
     '4. Look for a green or prominent "Add to Cart" button',
     '5. The button might show the total price, like "Add for $12.99"'
    ],
    whatYouShouldSee: 'At the bottom: a quantity selector (showing "1" with - and + buttons) and a green "Add to Cart" button (possibly showing the price)',
    expectedResult: 'Bottom sheet/action bar displays with quantity selector and Add to Cart button visible'
   }
  ],
  successChecklist: [
   '✓ The dish photo loaded clearly (not a broken image icon)',
   '✓ The dish name is visible and readable',
   '✓ The price is clearly displayed',
   '✓ The description text is visible',
   '✓ The quantity selector shows at the bottom',
   '✓ The "Add to Cart" button is visible and looks clickable',
   '✓ If options/toppings exist, they display correctly',
   '✓ The page loaded within 3-5 seconds (not too slow)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'The dish page never loads - just shows a loading spinner forever',
     whatToDo: 'Wait 10 seconds. If still loading, take a screenshot, mark as FAILED, and note "Page stuck on loading"'
    },
    {
     problem: 'The dish photo is broken (shows a placeholder or error icon)',
     whatToDo: 'Take a screenshot showing the broken image, mark as FAILED, and note "Dish image failed to load"'
    },
    {
     problem: 'The app crashes when you tap on a dish',
     whatToDo: 'Close and reopen the app, try again. If it crashes again, take a screenshot of the crash screen, mark as BLOCKED, and note "App crashes when opening dish"'
    },
    {
     problem: 'The price is missing or shows as $0.00',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Price not displayed correctly"'
    },
    {
     problem: 'The "Add to Cart" button is missing or grayed out',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Add to Cart button not visible or disabled"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'The restaurant is online (not closed)',
   'The dish you\'re testing is available (not sold out)'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-002',
  title: 'Open Dish from a Shared Link',
  whatYoureTesting: 'Making sure the app opens correctly when someone shares a dish link with you (like via WhatsApp, email, or text message)',
  whyItMatters: 'People often share dishes they like with friends. When you click a shared link, the app should open directly to that dish page, not crash or show an error.',
  estimatedTime: '2 minutes',
  type: 'Integration',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-002'],
  relatedEdgeCases: ['EC-DISH-022', 'EC-DISH-023'],
  testSteps: [
   {
    step: 1,
    instruction: 'Get a shared dish link from someone',
    detailedSteps: [
     '1. Ask a friend or colleague to share a dish link with you',
     '2. They can share it via WhatsApp, text message, email, or any messaging app',
     '3. The link will look something like: "Check out this dish: [link]" or just a clickable link',
     '4. If you don\'t have someone to share with, you can test by:',
     '  - Opening the app, finding a dish, and using the "Share" button',
     '  - Copy the link it gives you',
     '  - Send it to yourself via email or messaging app',
     '  - Then click the link you sent yourself'
    ],
    whatYouShouldSee: 'A clickable link in your message/email that mentions a dish or the BeeOrder app',
    expectedResult: 'You have a shared dish link ready to click'
   },
   {
    step: 2,
    instruction: 'Close the app completely before clicking the link',
    detailedSteps: [
     '1. On your phone, open the app switcher (swipe up from bottom and hold, or tap the recent apps button)',
     '2. Find the BeeOrder app in the list',
     '3. Swipe the app up and away to completely close it',
     '4. Verify the app is not running (it won\'t appear in the app switcher anymore)'
    ],
    whatYouShouldSee: 'The app is completely closed - not visible in your recent apps',
    expectedResult: 'App is fully closed so we can test opening it fresh from a link'
   },
   {
    step: 3,
    instruction: 'Click the shared link',
    detailedSteps: [
     '1. Go to your message/email where the link was shared',
     '2. Tap on the link',
     '3. Your phone might ask "Open with BeeOrder app?" - tap "Open" or "Yes"',
     '4. Watch what happens - the app should launch automatically',
     '5. The app should open directly to the dish page (not the home screen)'
    ],
    whatYouShouldSee: 'The app launches automatically and opens directly to the dish page. You should see the dish photo, name, and details loading',
    expectedResult: 'App launches and opens directly to the correct dish page'
   },
   {
    step: 4,
    instruction: 'Verify the correct dish loaded',
    detailedSteps: [
     '1. Wait 2-3 seconds for the dish page to fully load',
     '2. Check the dish name at the top - does it match what was shared?',
     '3. Verify you can see the dish photo, price, and description',
     '4. Try scrolling down to see options and toppings',
     '5. Everything should work normally'
    ],
    whatYouShouldSee: 'The dish page loads completely with all information. The dish name, image, price, description, and all options are visible and correct',
    expectedResult: 'Correct dish is displayed with all details loaded correctly'
   },
   {
    step: 5,
    instruction: 'Press the back button to test go to',
    detailedSteps: [
     '1. Tap the back button (or swipe back gesture on your phone)',
     '2. Watch where the app takes you',
     '3. It should go to the home screen or splash screen',
     '4. It should NOT crash or show a blank screen',
     '5. The app should work normally after this'
    ],
    whatYouShouldSee: 'When you press back, the app goes to the home screen (not crashing). This is normal because the app was opened from a link when it wasn\'t running, so it goes to home instead of trying to go "back" to a previous screen',
    expectedResult: 'going to screen works correctly - goes to home screen without crashing'
   }
  ],
  successChecklist: [
   '✓ App launches automatically when you click the shared link',
   '✓ App opens directly to the dish page (not home screen first)',
   '✓ The correct dish loads (matches what was shared)',
   '✓ All dish information displays correctly (photo, name, price, description)',
   '✓ You can interact with the dish page normally (scroll, select options)',
   '✓ Pressing back goes to home screen (doesn\'t crash)',
   '✓ No error messages or blank screens'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'The app doesn\'t open when you click the link',
     whatToDo: 'Check if the BeeOrder app is installed. If installed, try clicking the link again. If still doesn\'t work, take a screenshot, mark as FAILED, and note "App doesn\'t open from shared link"'
    },
    {
     problem: 'The app opens but shows the wrong dish',
     whatToDo: 'Take a screenshot showing the wrong dish, mark as FAILED, and note "Wrong dish loaded from shared link - expected [dish name] but got [actual dish name]"'
    },
    {
     problem: 'The app crashes when you click the link',
     whatToDo: 'CRITICAL BUG - Take a screenshot of the crash, mark as BLOCKED, and note "App crashes when opening from shared link"'
    },
    {
     problem: 'The app opens but shows a blank screen or error',
     whatToDo: 'Take a screenshot of the blank screen or error message, mark as FAILED, and note "App shows blank screen/error when opening from shared link"'
    },
    {
     problem: 'Pressing back crashes the app or shows blank screen',
     whatToDo: 'CRITICAL BUG - Take a screenshot, mark as FAILED, and note "App crashes or shows blank screen when pressing back after opening from shared link"'
    }
   ]
  },
  preconditions: [
   'You have a shared dish link (from a friend or shared by yourself)',
   'The BeeOrder app is installed on your device',
   'You can close the app completely',
   'You have internet connection'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'To get a test link: Open the app, find any dish, tap the Share button, copy the link, and send it to yourself'
 },
 {
  id: 'TC-DISH-003',
  title: 'Load Dish from Home Feed',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-003'],
  relatedEdgeCases: ['EC-DISH-004', 'EC-DISH-005'],
  testSteps: [
   { step: 1, instruction: 'Go to home/trending section', expectedResult: 'Home feed displayed with dish cards' },
   { step: 2, instruction: 'Tap on a dish in the feed', expectedResult: 'Dish page opens with restaurant info' },
   { step: 3, instruction: 'Verify restaurant logo in app bar', expectedResult: 'Restaurant logo and name visible' },
   { step: 4, instruction: 'Add dish to cart', expectedResult: 'Redirects to restaurant menu (not back)' }
  ],
  preconditions: ['User on home page', 'Dishes in feed'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // OPTIONS TESTS
 // ============================================
 {
  id: 'TC-DISH-004',
  title: 'Select Required Option',
  whatYoureTesting: 'Making sure you can select required options (like size, type, etc.) and the app properly validates your selection',
  whyItMatters: 'Many dishes require you to choose options (like pizza size or coffee type). If this doesn\'t work, customers can\'t complete their order.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-005'],
  relatedEdgeCases: ['EC-DISH-006', 'EC-DISH-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open a dish that has required options',
    detailedSteps: [
     '1. Open the app and Go to a restaurant menu',
     '2. Look for a dish that has options (common examples: pizza with size options, coffee with type options, burger with patty options)',
     '3. Tap on the dish to open its page',
     '4. Scroll down to find the "Options" section',
     '5. Look for a red "Required" badge or label next to an option group'
    ],
    whatYouShouldSee: 'An options section with one or more option groups, and at least one group should have a red "Required" badge',
    expectedResult: 'Options section displays with "Required" badge visible on required option groups'
   },
   {
    step: 2,
    instruction: 'Check the initial state of the options',
    detailedSteps: [
     '1. Look at the required option group',
     '2. Check if any option is already selected (has a filled circle with primary color)',
     '3. If nothing is selected, the radio buttons should be empty (just gray circles)',
     '4. If one is already selected, that\'s okay - it means there\'s a default option that was automatically chosen for you'
    ],
    whatYouShouldSee: 'Either: all radio buttons are empty (unselected), OR one option is already selected (filled circle with primary color) if there\'s a default option',
    expectedResult: 'No option is selected initially (unless there\'s a default option that was automatically chosen for you)'
   },
   {
    step: 3,
    instruction: 'Select an option by tapping on it',
    detailedSteps: [
     '1. Tap on one of the option choices (for example, if it\'s pizza size, tap "Large")',
     '2. Watch what happens to the radio button - it should fill in with the primary color',
     '3. Check if the "Required" badge disappears (the red "option_required" badge should vanish)',
     '4. The selected option should now have a filled circle with primary color and white checkmark icon',
     '5. Only ONE option in the group should be selected (radio button behavior)'
    ],
    whatYouShouldSee: 'The radio button you tapped fills in (becomes a filled circle with the app\'s main color and white checkmark), and the "Required" badge disappears. The option section changes from red to normal background color',
    expectedResult: 'Option is selected successfully, radio button fills, and "Required" badge disappears indicating the requirement is met'
   },
   {
    step: 4,
    instruction: 'Check if the price updated after selecting the option',
    detailedSteps: [
     '1. Look at the bottom of the screen where the price is shown',
     '2. Note the current price displayed on the "Add to Cart" button',
     '3. If the option you selected has a different price (like "Large" costs more than "Small"), the total price should have changed immediately',
     '4. The price updates automatically when you select an option'
    ],
    whatYouShouldSee: 'The total price on the "Add to Cart" button updates immediately to reflect the selected option. If the option costs extra, the price increases. If it costs less, the price decreases. The calculation is: (base dish price + option price) × quantity',
    expectedResult: 'Total price recalculates automatically and includes the price for the selected option multiplied by the quantity'
   }
  ],
  successChecklist: [
   '✓ The "Required" badge is visible before selecting an option',
   '✓ You can tap on an option and it becomes selected (filled circle)',
   '✓ The "Required" badge disappears after selecting an option',
   '✓ The price updates correctly when you select an option',
   '✓ Only one option can be selected at a time (radio button behavior)',
   '✓ The selected option is clearly highlighted'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'The "Required" badge doesn\'t disappear after selecting an option',
     whatToDo: 'Take a screenshot showing the selected option with the badge still visible, mark as FAILED, and note "Required badge not clearing after selection - the badge should disappear when you select an option"'
    },
    {
     problem: 'Tapping on an option doesn\'t select it (nothing happens)',
     whatToDo: 'Try tapping a few times. If still nothing, take a screenshot, mark as FAILED, and note "Options not selectable - tapping on an option should select it"'
    },
    {
     problem: 'The price doesn\'t update after selecting an option',
     whatToDo: 'Note the price before and after selection. Take a screenshot, mark as FAILED, and note "Price not updating when option selected - the price should change immediately when you select an option"'
    },
    {
     problem: 'Multiple options can be selected at once (should only be one)',
     whatToDo: 'Take a screenshot showing multiple selections in the same group, mark as FAILED, and note "Multiple options selectable when should be single choice - you should only be able to pick one option per group"'
    },
    {
     problem: 'The app crashes when you tap an option',
     whatToDo: 'Close and reopen the app, try again. If it crashes again, take a screenshot, mark as BLOCKED, and note "App crashes when selecting option - the app should handle errors gracefully without crashing"'
    },
    {
     problem: 'Default option is not pre-selected when page loads',
     whatToDo: 'Check if the dish has a default option that should be pre-selected. If yes but it\'s not selected, mark as FAILED and note "Default option not automatically selected when page loads"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'You\'ve found a dish that has required options (like pizza with size options)',
   'The dish page is open and loaded'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-005',
  title: 'Change Option Selection',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-005'],
  relatedEdgeCases: ['EC-DISH-007'],
  testSteps: [
   { step: 1, instruction: 'Select an option in a group', expectedResult: 'Option is selected' },
   { step: 2, instruction: 'Select a different option in same group', expectedResult: 'New option selected, old one deselected' },
   { step: 3, instruction: 'Verify only one option per group', expectedResult: 'Radio button behavior maintained' },
   { step: 4, instruction: 'Verify price recalculates', expectedResult: 'Price reflects new option price' }
  ],
  preconditions: ['Dish has multiple option choices'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-006',
  title: 'Auto-Scroll to Missing Option',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-006'],
  relatedEdgeCases: ['EC-DISH-006'],
  testSteps: [
   { step: 1, instruction: 'Open dish with required options', expectedResult: 'Options displayed' },
   { step: 2, instruction: 'Do NOT select any option', expectedResult: '"Required" badge visible' },
   { step: 3, instruction: 'Tap Add to Cart button', expectedResult: 'Page scrolls to first unselected option' },
   { step: 4, instruction: 'Verify option is highlighted', expectedResult: 'Red border/highlight on option group' }
  ],
  preconditions: ['Dish has required options', 'Options not selected'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-007',
  title: 'Default Option Pre-Selection',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-007'],
  relatedEdgeCases: ['EC-DISH-007'],
  testSteps: [
   { step: 1, instruction: 'Open dish with default option (isDefault=1)', expectedResult: 'Default option pre-selected on load' },
   { step: 2, instruction: 'Verify radio button is filled', expectedResult: 'Default option shows selected state' },
   { step: 3, instruction: 'Verify no "Required" badge', expectedResult: 'Option group shows as complete' },
   { step: 4, instruction: 'Verify price includes default option', expectedResult: 'Total reflects default option price' }
  ],
  preconditions: ['Dish has option with isDefault=1'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // TOPPINGS TESTS
 // ============================================
 {
  id: 'TC-DISH-008',
  title: 'Add Topping to Dish',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-008'],
  relatedEdgeCases: ['EC-DISH-012'],
  testSteps: [
   { step: 1, instruction: 'Open dish with available toppings', expectedResult: 'Toppings section visible' },
   { step: 2, instruction: 'Tap + button on a topping', expectedResult: 'Button changes to checkmark' },
   { step: 3, instruction: 'Verify price updates', expectedResult: 'Total includes topping price × quantity' },
   { step: 4, instruction: 'Add another topping', expectedResult: 'Multiple toppings can be selected' }
  ],
  preconditions: ['Dish has toppings'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-009',
  title: 'Remove Topping from Dish',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-009'],
  relatedEdgeCases: ['EC-DISH-010'],
  testSteps: [
   { step: 1, instruction: 'Add a topping to dish', expectedResult: 'Topping selected, shows checkmark' },
   { step: 2, instruction: 'Tap checkmark button', expectedResult: 'Topping deselected, shows + button' },
   { step: 3, instruction: 'Verify price decreases', expectedResult: 'Topping price removed from total' }
  ],
  preconditions: ['Dish has toppings', 'Topping selected'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-010',
  title: 'Topping Maximum Limit',
  whatYoureTesting: 'Making sure the app prevents selecting more toppings than allowed in a group',
  whyItMatters: 'Some topping groups have limits (like "choose up to 3"). If users can exceed this, orders become invalid.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-010'],
  relatedEdgeCases: ['EC-DISH-011'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a topping group with a selection limit',
    detailedSteps: [
     '1. Open a dish that has toppings',
     '2. Scroll to the toppings section',
     '3. Look for a group that says "choose up to X" (where X is a number like 2, 3, or 4)',
     '4. Note the limit number (for example, "choose up to 3")'
    ],
    whatYouShouldSee: 'A topping group with text like "choose up to 3" showing the maximum number of toppings you can select from that group',
    expectedResult: 'Topping group displays with selectLimit information showing maximum allowed selections'
   },
   {
    step: 2,
    instruction: 'Select toppings up to the limit',
    detailedSteps: [
     '1. Tap the + button on the first topping in the group',
     '2. Watch it change to a checkmark (selected)',
     '3. Continue selecting toppings until you reach the limit',
     '4. For example, if limit is 3, select exactly 3 toppings'
    ],
    whatYouShouldSee: 'Each topping you tap changes from a + button to a checkmark. The selected toppings show with the app\'s main color background and white checkmark icon',
    expectedResult: 'All selections up to the limit are successful - toppings are added to selectedToppings list'
   },
   {
    step: 3,
    instruction: 'Try to add one more topping beyond the limit',
    detailedSteps: [
     '1. After selecting the maximum allowed (e.g., 3 toppings), try to tap the + button on another topping in the same group',
     '2. Watch what happens - a dialog should appear',
     '3. Read the error message in the dialog'
    ],
    whatYouShouldSee: 'A dialog popup appears with a message like: "You can\'t select more than 3" (the number matches the limit for that topping group)',
    expectedResult: 'Dialog shows error message: "you_cant_select_more_than" + selectLimit, and the topping is NOT added to the selection'
   },
   {
    step: 4,
    instruction: 'Dismiss the dialog and verify the limit is enforced',
    detailedSteps: [
     '1. Tap "OK" or dismiss the dialog',
     '2. Count how many toppings are selected in that group',
     '3. Verify it matches the limit (not one more)',
     '4. Try tapping another + button - the dialog should appear again'
    ],
    whatYouShouldSee: 'After dismissing the dialog, the number of selected toppings in that group equals the limit (not more). Trying to add more shows the same error dialog again',
    expectedResult: 'Limit is enforced - topping not added, selection count stays at limit, dialog appears on each attempt to exceed limit'
   }
  ],
  successChecklist: [
   '✓ The topping group shows "choose up to X" text clearly',
   '✓ You can select toppings up to the limit successfully',
   '✓ When you try to exceed the limit, a dialog appears',
   '✓ The error message says "You can\'t select more than X" (where X is the limit)',
   '✓ The topping is NOT added when you exceed the limit',
   '✓ The selection count stays at the limit',
   '✓ The dialog appears every time you try to exceed the limit'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'You can select more toppings than the limit allows',
     whatToDo: 'CRITICAL BUG - Validation is broken. Take a screenshot showing more selections than the limit, mark as FAILED, and note "Topping limit not enforced - you should not be able to select more than the limit"'
    },
    {
     problem: 'Wrong error message appears',
     whatToDo: 'Screenshot the error message. If it doesn\'t say something like "You can\'t select more than X" (where X is the limit number), mark as FAILED and note "Wrong error message shown"'
    },
    {
     problem: 'No dialog appears, but topping is not added',
     whatToDo: 'This might be acceptable if the button just doesn\'t respond. Take a screenshot, mark as FAILED, and note "No feedback when limit exceeded - you should see a message telling you why you can\'t select more"'
    },
    {
     problem: 'The limit text is not displayed',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Topping limit not displayed to user - you should see text like \'choose up to X\' showing the limit"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'You\'ve found a dish with a topping group that has selectLimit set (e.g., selectLimit = 3)',
   'The dish page is open and loaded'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-011',
  title: 'Required Topping Validation',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-011'],
  relatedEdgeCases: ['EC-DISH-010'],
  testSteps: [
   { step: 1, instruction: 'Find topping group with selectMin > 0', expectedResult: 'Group shows "Required" badge' },
   { step: 2, instruction: 'Do NOT select minimum toppings', expectedResult: '"Required" badge visible' },
   { step: 3, instruction: 'Tap Add to Cart', expectedResult: 'Page scrolls to topping group' },
   { step: 4, instruction: 'Verify group is highlighted', expectedResult: 'Visual emphasis on required group' }
  ],
  preconditions: ['Topping group has selectMin > 0'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // QUANTITY TESTS
 // ============================================
 {
  id: 'TC-DISH-012',
  title: 'Increment Quantity',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-012'],
  relatedEdgeCases: ['EC-DISH-016', 'EC-DISH-017'],
  testSteps: [
   { step: 1, instruction: 'Open dish page', expectedResult: 'Quantity shows 1' },
   { step: 2, instruction: 'Tap + button', expectedResult: 'Quantity increases to 2' },
   { step: 3, instruction: 'Verify price doubles', expectedResult: 'Total = base price × 2' },
   { step: 4, instruction: 'Continue incrementing', expectedResult: 'Quantity increases accordingly' }
  ],
  preconditions: ['Dish page open'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-013',
  title: 'Decrement Quantity Minimum',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-013'],
  relatedEdgeCases: ['EC-DISH-015'],
  testSteps: [
   { step: 1, instruction: 'Set quantity to 3', expectedResult: 'Quantity shows 3' },
   { step: 2, instruction: 'Tap - button', expectedResult: 'Quantity decreases to 2' },
   { step: 3, instruction: 'Continue to quantity 1', expectedResult: 'Quantity at minimum' },
   { step: 4, instruction: 'Tap - button again', expectedResult: 'Quantity stays at 1 (cannot go to 0)' }
  ],
  preconditions: ['Quantity > 1'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-014',
  title: 'Quantity Inventory Limit',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-014'],
  relatedEdgeCases: ['EC-DISH-016', 'EC-DISH-018'],
  testSteps: [
   { step: 1, instruction: 'Find dish with limited inventory (quantity set)', expectedResult: 'Dish page opens' },
   { step: 2, instruction: 'Increment quantity to limit', expectedResult: 'Quantity reaches max' },
   { step: 3, instruction: 'Try to increment beyond limit', expectedResult: '+ button disabled/grayed' },
   { step: 4, instruction: 'Verify cannot exceed inventory', expectedResult: 'Quantity stays at limit' }
  ],
  preconditions: ['Dish has quantity limit'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // ADD TO CART TESTS
 // ============================================
 {
  id: 'TC-DISH-015',
  title: 'Add to Cart Success',
  whatYoureTesting: 'Making sure you can successfully add a fully configured dish to your shopping cart',
  whyItMatters: 'This is the core purchase action. If adding to cart fails, customers can\'t buy anything. This must work perfectly.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-015'],
  relatedEdgeCases: ['EC-DISH-025', 'EC-DISH-031'],
  testSteps: [
   {
    step: 1,
    instruction: 'Configure the dish with all required selections',
    detailedSteps: [
     '1. Open a dish page (any dish is fine)',
     '2. Scroll down and check if there are any required options (marked with "Required" badge)',
     '3. If there are required options, tap to select one for each required group',
     '4. Check if there are required toppings (marked with "Required")',
     '5. If there are required toppings, tap the + button to add at least the minimum required',
     '6. Make sure all "Required" badges have disappeared (meaning you\'ve met all requirements)'
    ],
    whatYouShouldSee: 'All required options and toppings are selected, and no "Required" badges are visible anymore',
    expectedResult: 'All required selections are made - options selected, required toppings added, no "Required" badges remaining'
   },
   {
    step: 2,
    instruction: 'Set the quantity you want to order',
    detailedSteps: [
     '1. Look at the bottom of the screen for the quantity selector',
     '2. It should show a number (usually "1") with a - button on the left and + button on the right',
     '3. If you want more than 1, tap the + button to increase the quantity',
     '4. Watch the number increase (2, 3, etc.)',
     '5. Verify the quantity displayed matches what you want to order'
    ],
    whatYouShouldSee: 'The quantity selector shows the correct number (1, 2, 3, etc.) that matches how many dishes you want',
    expectedResult: 'Quantity is set correctly and displayed in the quantity selector'
   },
   {
    step: 3,
    instruction: 'Tap the "Add to Cart" button',
    detailedSteps: [
     '1. Scroll to the bottom of the dish page if needed',
     '2. Find the "Add to Cart" button (it should show the total price like "Add for $XX.XX" if quantity > 0)',
     '3. Make sure the button is ENABLED (not grayed out) - it should only be enabled if quantity > 0 and not over inventory limit',
     '4. Tap the button once',
     '5. Watch what happens - the app will first check if all required options/toppings are selected',
     '6. If everything is valid, the screen should navigate away (usually back to the restaurant menu or cart)',
     '7. If restaurant is offline, you\'ll see a toast message at the bottom saying "restaurant_offline" but the dish will still be added to cart'
    ],
    whatYouShouldSee: 'If everything is valid: The screen goes to restaurant menu (if you came from home feed) or back to previous screen (if you came from restaurant menu). If restaurant is offline: A gray message appears at the bottom saying the restaurant is offline, but the dish will still be added to your cart',
    expectedResult: 'Button checks that all required options and toppings are selected, then adds the dish to cart, then goes to the appropriate screen based on where you came from'
   },
   {
    step: 4,
    instruction: 'Verify the dish was added to your cart',
    detailedSteps: [
     '1. Look at the bottom of the screen for the cart icon (shopping bag icon)',
     '2. Check if there\'s a small red circle with a number on the cart icon (this shows how many items are in your cart)',
     '3. Tap on the cart icon to open your cart',
     '4. Look through the cart items to find the dish you just added',
     '5. Verify the dish name, quantity, and any options/toppings you selected are shown correctly',
     '6. Check that the price in the cart matches what you expected'
    ],
    whatYouShouldSee: 'The cart icon shows a number badge (like "1" or "2"), and when you open the cart, you see the dish you added with all your selections and the correct quantity',
    expectedResult: 'Cart contains the configured dish with correct options, toppings, quantity, and price'
   }
  ],
  successChecklist: [
   '✓ The "Add to Cart" button responded when you tapped it',
   '✓ You saw a loading indicator briefly (or the button changed appearance)',
   '✓ You were navigated to another screen (menu or cart)',
   '✓ The cart icon at the bottom now shows a number badge (like "1")',
   '✓ When you open the cart, the dish you added is listed',
   '✓ The cart shows the correct dish name',
   '✓ The cart shows the correct quantity you selected',
   '✓ The cart shows any options/toppings you selected',
   '✓ The cart shows the correct total price',
   '✓ No error messages appeared'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'The "Add to Cart" button doesn\'t respond when you tap it (nothing happens)',
     whatToDo: 'This is a CRITICAL bug. Take a screenshot of the button, note the time, mark as FAILED, and note "Add to Cart button not responding - tapping the button should add the dish to cart"'
    },
    {
     problem: 'The button is grayed out/disabled when it shouldn\'t be',
     whatToDo: 'Check: Is quantity greater than 0? Is quantity over the inventory limit? Take a screenshot, mark as FAILED, and note "Button disabled incorrectly - button should be enabled when quantity is greater than 0 and not over inventory limit"'
    },
    {
     problem: 'An error message appears instead of adding to cart',
     whatToDo: 'Screenshot the exact error message, mark as FAILED, and write down exactly what the error says. Common errors: "restaurant_offline" toast (if restaurant offline), "you_cant_select_more_than X" dialog (if topping limit exceeded)',
     commonErrorMessages: [
      '"Restaurant is offline" - This message appears when the restaurant is not currently open, but your dish will still be added to cart for later',
      '"You can\'t select more than X" - This message appears when you try to select more toppings than allowed in a group'
     ]
    },
    {
     problem: 'The app crashes when you tap "Add to Cart"',
     whatToDo: 'Close and reopen the app, try again. If it crashes again, screenshot the crash screen, mark as BLOCKED, and note "App crashes when adding to cart"'
    },
    {
     problem: 'The dish appears in cart but with wrong options/toppings',
     whatToDo: 'Take screenshots: one of the dish page showing your selections, one of the cart showing wrong selections. Mark as FAILED and note "Cart shows incorrect selections"'
    },
    {
     problem: 'The dish appears in cart but with wrong price',
     whatToDo: 'Take screenshots: one showing the price on the dish page, one showing the wrong price in cart. Mark as FAILED and note "Price mismatch between dish page and cart"'
    },
    {
     problem: 'The cart icon doesn\'t show a number badge after adding',
     whatToDo: 'Open the cart manually. If the item is there, this might be a display bug. Take a screenshot, mark as FAILED, and note "Cart badge not updating"'
    },
    {
     problem: 'The button shows loading forever and never completes',
     whatToDo: 'Wait 10 seconds. If still loading, take a screenshot, mark as FAILED, and note "Add to Cart stuck on loading"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'The restaurant is online (not closed)',
   'The dish is available (not sold out)',
   'You\'ve selected all required options and toppings (if any)',
   'You\'ve set the quantity you want'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-016',
  title: 'Add to Cart - Missing Required Options',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-006', 'UC-DISH-015'],
  relatedEdgeCases: ['EC-DISH-006'],
  testSteps: [
   { step: 1, instruction: 'Open dish with required options', expectedResult: 'Required options visible' },
   { step: 2, instruction: 'Do NOT select required option', expectedResult: '"Required" badge visible' },
   { step: 3, instruction: 'Tap "Add to Cart"', expectedResult: 'Page scrolls to first missing option' },
   { step: 4, instruction: 'Verify dish NOT added', expectedResult: 'Cart unchanged' }
  ],
  preconditions: ['Dish has required options'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-017',
  title: 'Add to Cart - Restaurant Offline',
  type: 'Integration',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-015'],
  relatedEdgeCases: ['EC-DISH-021', 'EC-DISH-025'],
  testSteps: [
   { step: 1, instruction: 'Configure dish for cart', expectedResult: 'Ready to add' },
   { step: 2, instruction: 'Ensure restaurant is offline', expectedResult: 'Status is not ONLINE' },
   { step: 3, instruction: 'Tap "Add to Cart"', expectedResult: 'Toast: "Restaurant is offline"' },
   { step: 4, instruction: 'Verify dish still added', expectedResult: 'Cart contains dish (for later)' }
  ],
  preconditions: ['Restaurant offline'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // EDIT CART TESTS
 // ============================================
 {
  id: 'TC-DISH-018',
  title: 'Edit Cart Item - Load Existing',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-004'],
  relatedEdgeCases: ['EC-DISH-032'],
  testSteps: [
   { step: 1, instruction: 'Add dish to cart with selections', expectedResult: 'Cart item created' },
   { step: 2, instruction: 'Go to cart and tap edit', expectedResult: 'Dish page opens in edit mode' },
   { step: 3, instruction: 'Verify selections pre-loaded', expectedResult: 'Previous options/toppings selected' },
   { step: 4, instruction: 'Verify quantity matches', expectedResult: 'Quantity shows cart item quantity' }
  ],
  preconditions: ['Item in cart'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-019',
  title: 'Edit Cart Item - Save Changes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-004'],
  relatedEdgeCases: [],
  testSteps: [
   { step: 1, instruction: 'Open dish in edit mode', expectedResult: 'Edit mode active' },
   { step: 2, instruction: 'Change option selection', expectedResult: 'New option selected' },
   { step: 3, instruction: 'Change quantity', expectedResult: 'New quantity displayed' },
   { step: 4, instruction: 'Tap "Edit Cart"', expectedResult: 'Cart item updated, Go to cart' }
  ],
  preconditions: ['Dish in edit mode'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // NOTES TESTS
 // ============================================
 {
  id: 'TC-DISH-020',
  title: 'Add Special Note',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-016'],
  relatedEdgeCases: ['EC-DISH-029'],
  testSteps: [
   { step: 1, instruction: 'Scroll to notes section', expectedResult: 'Notes input field visible' },
   { step: 2, instruction: 'Tap on notes field', expectedResult: 'Keyboard opens' },
   { step: 3, instruction: 'Type: "No onions please"', expectedResult: 'Text appears in field' },
   { step: 4, instruction: 'Add to cart and verify', expectedResult: 'Note saved with cart item' }
  ],
  preconditions: ['Dish page open'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // FAVORITES TESTS
 // ============================================
 {
  id: 'TC-DISH-021',
  title: 'Add Dish to Favorites',
  whatYoureTesting: 'Making sure you can add a dish to your favorites list by tapping the heart icon',
  whyItMatters: 'Customers use favorites to quickly find dishes they like. If this doesn\'t work, they can\'t save their preferred dishes.',
  estimatedTime: '1 minute',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-017'],
  relatedEdgeCases: ['EC-DISH-020'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open a dish page and find the heart icon',
    detailedSteps: [
     '1. Open any dish page',
     '2. Look at the top of the screen in the app bar (header area)',
     '3. Find the heart icon (usually on the right side)',
     '4. Check if the heart is empty (outline) or filled (solid)'
    ],
    whatYouShouldSee: 'A heart icon in the top right area of the screen. If the dish is not in favorites, the heart should be empty (just an outline)',
    expectedResult: 'Heart icon is visible in the app bar, showing empty if dish is not favorited'
   },
   {
    step: 2,
    instruction: 'Tap the heart icon to add to favorites',
    detailedSteps: [
     '1. Tap the heart icon once',
     '2. Watch what happens - the heart should fill in immediately',
     '3. The heart should change from empty (outline) to filled (solid)'
    ],
    whatYouShouldSee: 'The heart icon fills in immediately when you tap it, changing from an empty outline to a filled, solid heart',
    expectedResult: 'Heart icon fills in immediately when tapped'
   },
   {
    step: 3,
    instruction: 'Wait a moment and verify it stays filled',
    detailedSteps: [
     '1. Wait 2-3 seconds after tapping',
     '2. Check if the heart is still filled',
     '3. If it reverts back to empty, that means there was an error'
    ],
    whatYouShouldSee: 'The heart stays filled after a few seconds. If it goes back to empty, that means something went wrong',
    expectedResult: 'Heart stays filled, indicating the dish was successfully added to favorites'
   },
   {
    step: 4,
    instruction: 'Check your favorites list to confirm',
    detailedSteps: [
     '1. Go to your profile or favorites section (usually in the app menu)',
     '2. Look for your favorites list',
     '3. Check if the dish you just favorited appears in the list'
    ],
    whatYouShouldSee: 'The dish you favorited should appear in your favorites list with its name, photo, and other details',
    expectedResult: 'Dish appears in favorites list, confirming it was successfully saved'
   }
  ],
  successChecklist: [
   '✓ Heart icon is visible in the app bar',
   '✓ Heart fills in immediately when you tap it',
   '✓ Heart stays filled (doesn\'t revert to empty)',
   '✓ Dish appears in your favorites list',
   '✓ No error messages appeared'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Heart icon is not visible',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Heart icon not visible in app bar"'
    },
    {
     problem: 'Heart doesn\'t fill when you tap it',
     whatToDo: 'Try tapping a few times. If still nothing, take a screenshot, mark as FAILED, and note "Heart icon not responding to taps"'
    },
    {
     problem: 'Heart fills but then goes back to empty',
     whatToDo: 'This means the save failed. Take a screenshot, mark as FAILED, and note "Heart reverts to empty - favorite not saved"'
    },
    {
     problem: 'Dish doesn\'t appear in favorites list',
     whatToDo: 'Wait a few seconds and refresh the favorites list. If still not there, take a screenshot, mark as FAILED, and note "Dish not appearing in favorites list"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'The dish is not already in your favorites',
   'The dish page is open'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-022',
  title: 'Favorite Fails When Internet is Off',
  whatYoureTesting: 'Making sure the app handles errors gracefully when you try to favorite a dish without internet',
  whyItMatters: 'If the internet is slow or disconnected, the app should tell you what went wrong instead of just failing silently.',
  estimatedTime: '2 minutes',
  type: 'Integration',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-017'],
  relatedEdgeCases: ['EC-DISH-020'],
  testSteps: [
   {
    step: 1,
    instruction: 'Turn off your internet connection',
    detailedSteps: [
     '1. Open your phone settings',
     '2. Turn off Wi-Fi',
     '3. Turn off mobile data',
     '4. Verify you have no internet (try opening a website)'
    ],
    whatYouShouldSee: 'Your phone has no internet connection - websites won\'t load',
    expectedResult: 'Internet connection is disabled'
   },
   {
    step: 2,
    instruction: 'Open a dish page and tap the heart icon',
    detailedSteps: [
     '1. Open the BeeOrder app (it should still work, just can\'t save to server)',
     '2. Go to any dish page',
     '3. Tap the heart icon to try to favorite it',
     '4. Watch what happens'
    ],
    whatYouShouldSee: 'The heart might fill in briefly (the app tries to be responsive), but then it should revert back to empty because it can\'t save without internet',
    expectedResult: 'Heart fills briefly then reverts to empty when save fails'
   },
   {
    step: 3,
    instruction: 'Check if you see an error message',
    detailedSteps: [
     '1. Look for any error messages on the screen',
     '2. Check if there\'s a toast message (a small message that appears briefly)',
     '3. Note what the message says, if any'
    ],
    whatYouShouldSee: 'You might see an error message telling you that the action failed, or the heart just reverts to empty without a message',
    expectedResult: 'App handles the error - either shows a message or reverts the heart icon'
   },
   {
    step: 4,
    instruction: 'Turn internet back on and verify the dish is not in favorites',
    detailedSteps: [
     '1. Turn Wi-Fi or mobile data back on',
     '2. Go to your favorites list',
     '3. Check if the dish you tried to favorite is there'
    ],
    whatYouShouldSee: 'The dish should NOT be in your favorites list because the save failed when internet was off',
    expectedResult: 'Dish is not in favorites list, confirming the save did not happen'
   }
  ],
  successChecklist: [
   '✓ Heart icon reverts to empty when save fails',
   '✓ App doesn\'t crash when internet is off',
   '✓ Dish is not saved to favorites when internet is off',
   '✓ App handles the error gracefully (either shows message or just reverts)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashes when you tap heart with no internet',
     whatToDo: 'CRITICAL BUG - Take a screenshot, mark as BLOCKED, and note "App crashes when trying to favorite without internet - app should handle this error without crashing"'
    },
    {
     problem: 'Heart stays filled even though save failed',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Heart stays filled when save failed - should revert to empty"'
    },
    {
     problem: 'Dish appears in favorites even though internet was off',
     whatToDo: 'This might mean it was cached. Check if it disappears when you refresh. Mark as FAILED and note "Dish saved to favorites without internet connection"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You can turn internet on/off',
   'The dish page is open',
   'Internet is turned off'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Requires ability to control internet connection'
 },

 // ============================================
 // SHARE TESTS
 // ============================================
 {
  id: 'TC-DISH-023',
  title: 'Share Dish',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: ['UC-DISH-018'],
  relatedEdgeCases: ['EC-DISH-040', 'EC-DISH-041'],
  testSteps: [
   { step: 1, instruction: 'Open dish page', expectedResult: 'Share icon in app bar' },
   { step: 2, instruction: 'Tap share icon', expectedResult: 'Native share sheet opens' },
   { step: 3, instruction: 'Verify link format', expectedResult: 'link contains dish ID' },
   { step: 4, instruction: 'Share to another device and open', expectedResult: 'Dish opens correctly' }
  ],
  preconditions: ['Share feature enabled'],
  automatable: false,
  status: 'Not Started',
  notes: 'Requires manual verification of share flow'
 },

 // ============================================
 // ERROR HANDLING TESTS
 // ============================================
 {
  id: 'TC-DISH-024',
  title: 'Invalid Dish ID',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-002'],
  relatedEdgeCases: ['EC-DISH-001'],
  testSteps: [
   { step: 1, instruction: 'Go to dish with invalid ID', expectedResult: 'Error state displayed' },
   { step: 2, instruction: 'Verify error message', expectedResult: 'Appropriate error shown' },
   { step: 3, instruction: 'Try go to options', expectedResult: 'Can navigate away' }
  ],
  preconditions: ['Invalid dish ID'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-025',
  title: 'Network Error During Load',
  type: 'Integration',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-001'],
  relatedEdgeCases: ['EC-DISH-019'],
  testSteps: [
   { step: 1, instruction: 'Disable network', expectedResult: 'No internet' },
   { step: 2, instruction: 'Try to load dish', expectedResult: 'Error message displayed' },
   { step: 3, instruction: 'Enable network', expectedResult: 'Connection restored' },
   { step: 4, instruction: 'Retry loading', expectedResult: 'Dish loads successfully' }
  ],
  preconditions: ['Network can be toggled'],
  automatable: false,
  status: 'Not Started',
  notes: 'Requires network control'
 },

 // ============================================
 // PRICE CALCULATION TESTS
 // ============================================
 {
  id: 'TC-DISH-026',
  title: 'Price Calculation Accuracy',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-012', 'UC-DISH-008'],
  relatedEdgeCases: ['EC-DISH-003', 'EC-DISH-033'],
  testSteps: [
   { step: 1, instruction: 'Note base dish price (e.g., $10)', expectedResult: 'Base price recorded' },
   { step: 2, instruction: 'Select option with +$2', expectedResult: 'Total = $12' },
   { step: 3, instruction: 'Add topping with +$1.50', expectedResult: 'Total = $13.50' },
   { step: 4, instruction: 'Set quantity to 2', expectedResult: 'Total = $27.00' },
   { step: 5, instruction: 'Verify calculation', expectedResult: '(base + option + topping) × qty' }
  ],
  preconditions: ['Dish with options and toppings'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-027',
  title: 'Points Calculation',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-012'],
  relatedEdgeCases: ['EC-DISH-034'],
  testSteps: [
   { step: 1, instruction: 'Note dish points (e.g., 100)', expectedResult: 'Base points recorded' },
   { step: 2, instruction: 'Add topping with +20 points', expectedResult: 'Points = 120' },
   { step: 3, instruction: 'Set quantity to 2', expectedResult: 'Points = 240' },
   { step: 4, instruction: 'Verify in "Get X points" display', expectedResult: 'Matches calculation' }
  ],
  preconditions: ['Dish has points', 'Loyalty enabled'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // SPECIAL MODE TESTS
 // ============================================
 {
  id: 'TC-DISH-028',
  title: ' Mode Add',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-019'],
  relatedEdgeCases: ['EC-DISH-038', 'EC-DISH-039'],
  testSteps: [
   { step: 1, instruction: 'Open dish in mode', expectedResult: 'Dish page with context' },
   { step: 2, instruction: 'Verify no quantity selector', expectedResult: 'Quantity section hidden' },
   { step: 3, instruction: 'Add to cart', expectedResult: 'addServiceToCart() flow used' },
   { step: 4, instruction: 'Verify cart shows ', expectedResult: ' item in cart' }
  ],
  preconditions: [' mode enabled'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-029',
  title: 'Vending Machine Mode',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-020'],
  relatedEdgeCases: ['EC-DISH-027', 'EC-DISH-028'],
  testSteps: [
   { step: 1, instruction: 'Open dish from vending restaurant', expectedResult: 'isVending = true' },
   { step: 2, instruction: 'Verify bottom sheet visible', expectedResult: 'Add to cart always shown' },
   { step: 3, instruction: 'Add to cart', expectedResult: 'Special go to flow' },
   { step: 4, instruction: 'Verify dine-in mode handled', expectedResult: 'Works despite dine-in' }
  ],
  preconditions: ['Vending machine restaurant'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // UI TESTS
 // ============================================
 {
  id: 'TC-DISH-030',
  title: 'Image Load Failure Fallback',
  type: 'UI',
  priority: 'P3',
  relatedUseCases: ['UC-DISH-023'],
  relatedEdgeCases: ['EC-DISH-002'],
  testSteps: [
   { step: 1, instruction: 'Open dish with broken image link', expectedResult: 'Fallback image shown' },
   { step: 2, instruction: 'Verify no crash or blank area', expectedResult: 'Placeholder visible' },
   { step: 3, instruction: 'Try to zoom fallback', expectedResult: 'Graceful handling' }
  ],
  preconditions: ['Dish with invalid image link'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-031',
  title: 'Keyboard Handling',
  type: 'UI',
  priority: 'P3',
  relatedUseCases: ['UC-DISH-024'],
  relatedEdgeCases: ['EC-DISH-029'],
  testSteps: [
   { step: 1, instruction: 'Tap on notes field', expectedResult: 'Keyboard opens' },
   { step: 2, instruction: 'Verify Add to Cart button hidden', expectedResult: 'Button not visible' },
   { step: 3, instruction: 'Tap outside field', expectedResult: 'Keyboard dismisses' },
   { step: 4, instruction: 'Verify button reappears', expectedResult: 'Add to Cart visible again' }
  ],
  preconditions: ['Dish page open'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-032',
  title: 'Accessibility - Screen Reader',
  type: 'Accessibility',
  priority: 'P2',
  relatedUseCases: [],
  relatedEdgeCases: [],
  testSteps: [
   { step: 1, instruction: 'Enable screen reader (TalkBack/VoiceOver)', expectedResult: 'Screen reader active' },
   { step: 2, instruction: 'Navigate dish page', expectedResult: 'All elements announced' },
   { step: 3, instruction: 'Interact with options', expectedResult: 'Selection announced' },
   { step: 4, instruction: 'Add to cart', expectedResult: 'Action confirmed by reader' }
  ],
  preconditions: ['Screen reader available'],
  automatable: false,
  status: 'Not Started',
  notes: 'Manual testing with assistive technology'
 },
 {
  id: 'TC-DISH-033',
  title: 'RTL Layout (Arabic)',
  type: 'UI',
  priority: 'P2',
  relatedUseCases: [],
  relatedEdgeCases: ['EC-DISH-036'],
  testSteps: [
   { step: 1, instruction: 'Set language to Arabic', expectedResult: 'RTL layout active' },
   { step: 2, instruction: 'Open dish page', expectedResult: 'Elements aligned right' },
   { step: 3, instruction: 'Verify text direction', expectedResult: 'Arabic text reads right-to-left' },
   { step: 4, instruction: 'Verify buttons placement', expectedResult: 'Consistent with RTL' }
  ],
  preconditions: ['Arabic language supported'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // go to TESTS
 // ============================================
 {
  id: 'TC-DISH-034',
  title: 'Report Issue go to',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: ['UC-DISH-022'],
  relatedEdgeCases: [],
  testSteps: [
   { step: 1, instruction: 'Scroll to report section', expectedResult: 'Report card visible' },
   { step: 2, instruction: 'Tap report card', expectedResult: 'Going to report screen' },
   { step: 3, instruction: 'Verify dish info passed', expectedResult: 'Report form has dish context' },
   { step: 4, instruction: 'Navigate back', expectedResult: 'Return to dish page' }
  ],
  preconditions: ['Report feature enabled'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-035',
  title: 'Go to Restaurant',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-021'],
  relatedEdgeCases: ['EC-DISH-024'],
  testSteps: [
   { step: 1, instruction: 'Tap restaurant logo in app bar', expectedResult: 'Going to restaurant menu' },
   { step: 2, instruction: 'Verify restaurant loads', expectedResult: 'Full menu displayed' },
   { step: 3, instruction: 'Verify correct restaurant', expectedResult: 'Same as dish\'s restaurant' }
  ],
  preconditions: ['Dish has restaurant info'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-036',
  title: 'Add Dish from Different Restaurant When Cart Has Items',
  whatYoureTesting: 'Making sure the app handles the situation when you have items in your cart from one restaurant, then try to add a dish from a different restaurant',
  whyItMatters: 'You can only order from one restaurant at a time. If you have items from Restaurant A in your cart and try to add from Restaurant B, the app should warn you and let you decide what to do.',
  estimatedTime: '3 minutes',
  type: 'Integration',
  priority: 'P2',
  relatedUseCases: ['UC-DISH-002'],
  relatedEdgeCases: ['EC-DISH-023'],
  testSteps: [
   {
    step: 1,
    instruction: 'Add items to your cart from Restaurant A',
    detailedSteps: [
     '1. Open the BeeOrder app',
     '2. Find and open any restaurant (let\'s call this Restaurant A)',
     '3. Add at least one dish to your cart',
     '4. Check your cart to confirm items are there',
     '5. Remember which restaurant this is'
    ],
    whatYouShouldSee: 'Your cart has items from Restaurant A. You can see them when you open the cart',
    expectedResult: 'Cart contains items from Restaurant A'
   },
   {
    step: 2,
    instruction: 'Get a shared link for a dish from a different restaurant',
    detailedSteps: [
     '1. Find a different restaurant (Restaurant B) - it must be a different restaurant, not just a different dish from the same restaurant',
     '2. Open any dish from Restaurant B',
     '3. Use the Share button to get a link to this dish',
     '4. Copy the link or send it to yourself',
     '5. Click the link to open it (or if you\'re already on the dish page, that\'s fine too)'
    ],
    whatYouShouldSee: 'The dish page for Restaurant B opens. You can see it\'s a different restaurant (different name, different menu)',
    expectedResult: 'Dish page from Restaurant B opens (different from Restaurant A)'
   },
   {
    step: 3,
    instruction: 'Try to add the Restaurant B dish to your cart',
    detailedSteps: [
     '1. On the Restaurant B dish page, select any required options',
     '2. Tap the "Add to Cart" button',
     '3. Watch what happens - you should see a warning message',
     '4. The warning should tell you that you have items from a different restaurant in your cart'
    ],
    whatYouShouldSee: 'A warning message appears telling you that you have items from a different restaurant in your cart. It should ask if you want to clear your current cart and add this new dish, or cancel',
    expectedResult: 'Warning message appears about cart conflict between restaurants'
   },
   {
    step: 4,
    instruction: 'Choose what to do with the warning',
    detailedSteps: [
     '1. Read the warning message carefully',
     '2. You should see options like "Clear Cart and Add" or "Cancel"',
     '3. First, try tapping "Cancel" - your cart should remain unchanged',
     '4. Then try again and this time tap "Clear Cart and Add" - your old items should be removed and the new dish added'
    ],
    whatYouShouldSee: 'When you tap "Cancel", nothing changes and you stay on the dish page. When you tap "Clear Cart and Add", your old cart items disappear and the new dish is added',
    expectedResult: 'Warning dialog works correctly - you can choose to clear cart or cancel'
   }
  ],
  successChecklist: [
   '✓ Cart has items from Restaurant A',
   '✓ Dish page from Restaurant B opens correctly',
   '✓ Warning message appears when trying to add from different restaurant',
   '✓ Warning message is clear and easy to understand',
   '✓ "Cancel" option keeps your current cart unchanged',
   '✓ "Clear Cart and Add" option removes old items and adds new dish',
   '✓ No crashes or errors'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No warning appears - dish from different restaurant is added to cart',
     whatToDo: 'CRITICAL BUG - Take a screenshot showing both restaurants\' items in cart, mark as FAILED, and note "No warning when adding dish from different restaurant - cart should only have items from one restaurant"'
    },
    {
     problem: 'Warning message is confusing or hard to understand',
     whatToDo: 'Take a screenshot of the warning, mark as FAILED, and note "Warning message is unclear - users might not understand what will happen"'
    },
    {
     problem: 'App crashes when you tap "Clear Cart and Add"',
     whatToDo: 'CRITICAL BUG - Take a screenshot of the crash, mark as BLOCKED, and note "App crashes when clearing cart to add dish from different restaurant"'
    },
    {
     problem: 'Old items are not removed when you choose "Clear Cart and Add"',
     whatToDo: 'Take a screenshot showing both restaurants\' items still in cart, mark as FAILED, and note "Old cart items not removed when clearing cart for different restaurant"'
    }
   ]
  },
  preconditions: [
   'You have items in your cart from Restaurant A',
   'You can access a dish from Restaurant B (different restaurant)',
   'You have internet connection',
   'Both restaurants are available'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Make sure Restaurant A and Restaurant B are actually different restaurants, not just different dishes from the same restaurant'
 },

 // ============================================
 // DISCOUNT TESTS
 // ============================================
 {
  id: 'TC-DISH-037',
  title: 'Discount Price Display',
  type: 'UI',
  priority: 'P2',
  relatedUseCases: [],
  relatedEdgeCases: ['EC-DISH-033', 'EC-DISH-035'],
  testSteps: [
   { step: 1, instruction: 'Open dish with discount (oldPrice set)', expectedResult: 'Discount visible' },
   { step: 2, instruction: 'Verify old price with strikethrough', expectedResult: 'Old price shown crossed out' },
   { step: 3, instruction: 'Verify new price highlighted', expectedResult: 'Current price prominent' },
   { step: 4, instruction: 'Verify discount percentage', expectedResult: 'Discount % calculated correctly' }
  ],
  preconditions: ['Dish has oldPrice > price'],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },

 // ============================================
 // NEW TEST CASES - Based on Code Analysis
 // ============================================
 {
  id: 'TC-DISH-038',
  title: 'Add to Cart Button Enabled/Disabled States',
  whatYoureTesting: 'Verifying the Add to Cart button is correctly enabled or disabled based on quantity and inventory limits',
  whyItMatters: 'The button should be disabled when quantity is 0 or over inventory limit to prevent invalid orders. Users need clear visual feedback.',
  estimatedTime: '3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-DISH-015'],
  relatedEdgeCases: ['EC-DISH-016', 'EC-DISH-017'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open a dish page and check initial button state',
    detailedSteps: [
     '1. Open any dish page',
     '2. Look at the "Add to Cart" button at the bottom',
     '3. Check if the button is enabled (clickable) or disabled (grayed out)',
     '4. Note the current quantity (should be 1 by default)'
    ],
    whatYouShouldSee: 'The "Add to Cart" button should be ENABLED (clickable, shows price) when quantity is 1 and not over inventory limit. Button shows the total price like "Add for $12.99"',
    expectedResult: 'Button is enabled when quantity is greater than 0 and not over the inventory limit'
   },
   {
    step: 2,
    instruction: 'Try to disable the button by setting quantity to 0',
    detailedSteps: [
     '1. Tap the - button repeatedly to decrease quantity',
     '2. Watch what happens - quantity should stop at 1 (minimum)',
     '3. The - button should become ineffective at quantity 1',
     '4. Check if the Add to Cart button is still enabled'
    ],
    whatYouShouldSee: 'Quantity cannot go below 1 - the minus button stops working when you reach 1. The Add to Cart button should remain enabled since quantity is still 1',
    expectedResult: 'Quantity minimum is enforced at 1, button stays enabled'
   },
   {
    step: 3,
    instruction: 'Test button disabled state with inventory limit',
    detailedSteps: [
     '1. Find a dish with limited inventory (quantity field set, e.g., quantity = 5)',
     '2. Increment quantity using the + button until you reach the inventory limit',
     '3. Try to increment one more time - the + button should become grayed out',
     '4. Check if the Add to Cart button is still enabled',
     '5. If you already have some of this dish in your cart, the limit considers that too'
    ],
    whatYouShouldSee: 'When quantity reaches the inventory limit, the + button becomes grayed out (disabled). The Add to Cart button should still be enabled if quantity is greater than 0. The button color changes to gray when disabled',
    expectedResult: 'Button disabled when quantity would exceed the inventory limit, considering both what\'s already in your cart and what you\'re trying to add'
   },
   {
    step: 4,
    instruction: 'Verify button shows price when enabled',
    detailedSteps: [
     '1. With quantity > 0, check the Add to Cart button text',
     '2. It should show the total price, like "Add for $25.98"',
     '3. The price should update as you change quantity, options, or toppings'
    ],
    whatYouShouldSee: 'When enabled (quantity greater than 0), the button displays the button text plus the total price plus currency symbol. Example: "Add to Cart" + " $25.98" + currency symbol',
    expectedResult: 'Button shows formatted price when selectedQuantity > 0'
   }
  ],
  successChecklist: [
   '✓ Button is enabled when quantity = 1 (default)',
   '✓ Button is enabled when quantity > 1 and not over inventory limit',
   '✓ Button is disabled (grayed out) when quantity would exceed inventory limit',
   '✓ + button becomes grayed out when at inventory limit',
   '✓ Button shows total price when enabled',
   '✓ Button text changes based on context ("add_cart" or "edit_cart")',
   '✓ Quantity cannot go below 1 (minimum enforced)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Button is disabled when it should be enabled (quantity > 0, not over limit)',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Button incorrectly disabled - button should be enabled when quantity is greater than 0 and not over inventory limit"'
    },
    {
     problem: 'Button is enabled when it should be disabled (over inventory limit)',
     whatToDo: 'CRITICAL BUG - Take a screenshot, mark as FAILED, and note "Button enabled when over inventory limit - button should be disabled when you try to add more than what\'s available"'
    },
    {
     problem: 'Button doesn\'t show price when enabled',
     whatToDo: 'Take a screenshot, mark as FAILED, and note "Price not displayed on button - the button should show the total price when quantity is greater than 0"'
    },
    {
     problem: 'Quantity can go below 1',
     whatToDo: 'CRITICAL BUG - Take a screenshot, mark as FAILED, and note "Quantity can go below 1 - the minimum quantity should always be 1"'
    }
   ]
  },
  preconditions: [
   'You\'re logged into a test account',
   'You have internet connection',
   'The dish page is open',
   'For inventory limit test: find a dish with quantity field set (limited inventory)'
  ],
  automatable: true,
  status: 'Not Started',
  notes: ''
 },
 {
  id: 'TC-DISH-039',
  title: 'Open Dish Link When App is Closed',
  whatYoureTesting: 'Making sure the app opens correctly when you click a shared dish link while the app is completely closed (not running in the background)',
  whyItMatters: 'Sometimes people click shared links when the app isn\'t running. The app should launch smoothly and open directly to the dish, then handle go to correctly when you press back.',
  estimatedTime: '3 minutes',
  type: 'Integration',
  priority: 'P1',
  relatedUseCases: ['UC-DISH-002'],
  relatedEdgeCases: ['EC-DISH-022', 'EC-DISH-023'],
  testSteps: [
   {
    step: 1,
    instruction: 'Close the app completely',
    detailedSteps: [
     '1. On your phone, open the app switcher:',
     '  - iPhone: Swipe up from the bottom and hold',
     '  - Android: Tap the recent apps button (square icon)',
     '2. Find the BeeOrder app in the list of open apps',
     '3. Swipe the app up and away to completely close it',
     '4. Verify the app is not running - it won\'t appear in the app switcher anymore'
    ],
    whatYouShouldSee: 'The app is completely closed - not visible in your recent apps list',
    expectedResult: 'App is fully closed so we can test opening it fresh from a link'
   },
   {
    step: 2,
    instruction: 'Get a shared dish link and click it',
    detailedSteps: [
     '1. Get a shared dish link (from a friend, or share one yourself):',
     '  - Open the app, find any dish, tap Share button',
     '  - Copy the link or send it to yourself via message/email',
     '2. Go to where the link is (message, email, browser)',
     '3. Tap on the link',
     '4. Your phone might ask "Open with BeeOrder app?" - tap "Open"',
     '5. Watch what happens - the app should launch automatically'
    ],
    whatYouShouldSee: 'The app launches automatically and opens directly to the dish page. You should see the dish photo, name, and details starting to load',
    expectedResult: 'App launches and opens directly to the dish page'
   },
   {
    step: 3,
    instruction: 'Verify the dish loads correctly',
    detailedSteps: [
     '1. Wait 2-3 seconds for the dish page to fully load',
     '2. Check the dish name at the top - does it match what was in the link?',
     '3. Verify you can see:',
     '  - Dish photo (not broken image)',
     '  - Dish name',
     '  - Price',
     '  - Description',
     '4. Try scrolling down - can you see options and toppings?',
     '5. Try interacting with the page - does everything work?'
    ],
    whatYouShouldSee: 'The dish page loads completely with all information. Everything is visible and you can interact with it normally',
    expectedResult: 'Dish loads correctly with all information displayed and page is fully interactive'
   },
   {
    step: 4,
    instruction: 'Press the back button and see where it takes you',
    detailedSteps: [
     '1. Tap the back button on your phone (or use swipe back gesture)',
     '2. Watch where the app navigates',
     '3. It should go to the home screen or splash screen',
     '4. It should NOT crash or show a blank screen',
     '5. The app should work normally after this'
    ],
    whatYouShouldSee: 'When you press back, the app goes to the home screen (not crashing). This is normal because the app was opened from a link when it wasn\'t running, so it goes to home instead of trying to go "back" to a previous screen',
    expectedResult: 'going to screen works correctly - goes to home screen without crashing or showing blank screen'
   }
  ],
  successChecklist: [
   '✓ App launches automatically when you click the link',
   '✓ App opens directly to the dish page (not home screen first)',
   '✓ The correct dish loads (matches what was in the link)',
   '✓ All dish information displays correctly',
   '✓ You can interact with the dish page normally',
   '✓ Pressing back goes to home screen (doesn\'t crash)',
   '✓ No error messages, blank screens, or crashes'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashes when you click the link',
     whatToDo: 'CRITICAL BUG - Take a screenshot of the crash, mark as BLOCKED, and note "App crashes when opening from shared link while app is closed"'
    },
    {
     problem: 'Wrong dish loads (different from what was in the link)',
     whatToDo: 'Take a screenshot showing the wrong dish, mark as FAILED, and note "Wrong dish loaded from shared link - expected [dish name] but got [actual dish name]"'
    },
    {
     problem: 'App opens but shows blank screen or error',
     whatToDo: 'Take a screenshot of the blank screen or error, mark as FAILED, and note "App shows blank screen/error when opening from shared link"'
    },
    {
     problem: 'Pressing back crashes the app or shows blank screen',
     whatToDo: 'CRITICAL BUG - Take a screenshot, mark as FAILED, and note "App crashes or shows blank screen when pressing back after opening from shared link"'
    },
    {
     problem: 'The app doesn\'t open when you click the link',
     whatToDo: 'Check if the BeeOrder app is installed. If installed, try clicking the link again. If still doesn\'t work, take a screenshot, mark as FAILED, and note "App doesn\'t open from shared link"'
    }
   ]
  },
  preconditions: [
   'You have a shared dish link (from a friend or shared by yourself)',
   'The BeeOrder app is installed on your device',
   'You can close the app completely',
   'You have internet connection'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'To get a test link: Open the app, find any dish, tap Share button, copy the link, send it to yourself, then close the app completely before clicking it'
 },
];
