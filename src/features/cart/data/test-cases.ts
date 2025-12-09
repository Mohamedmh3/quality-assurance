import type { TestCase } from '@/lib/types';

export const cartTestCases: TestCase[] = [
 {
  id: 'TC-CART-001',
  title: 'Open Your Shopping Cart and See Items',
  whatYoureTesting: 'Making sure customers can see their shopping cart with all the items they added',
  whyItMatters: 'This is how customers review what they want to order before paying. If they cannot see their cart, they cannot order.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CART-001'],
  relatedEdgeCases: ['EC-CART-001'],
  testSteps: [
   {
    step: 1,
    instruction: 'Add something to your cart first',
    detailedSteps: [
     '1. Open the app and go to any restaurant',
     '2. Look at the menu and pick any dish you like',
     '3. Tap on the dish to see its details',
     '4. Tap the "Add to Cart" button at the bottom',
     '5. You should see a small number appear on the cart icon'
    ],
    whatYouShouldSee: 'A small red or colored badge on the cart icon showing "1" (or whatever number of items you added)',
    expectedResult: 'Item is added to cart and badge shows on cart icon'
   },
   {
    step: 2,
    instruction: 'Open your shopping cart',
    detailedSteps: [
     '1. Look for the cart icon - usually at the bottom right or top right of the screen',
     '2. Tap on the cart icon',
     '3. Wait a moment for the cart page to open',
     '4. You should now see your cart screen'
    ],
    whatYouShouldSee: 'A new screen opens showing: the restaurant name and logo at the top, then a list of all items you added with their names, pictures, and prices',
    expectedResult: 'Cart screen opens with all added items visible'
   },
   {
    step: 3,
    instruction: 'Check the total price at the bottom',
    detailedSteps: [
     '1. Scroll to the bottom of your cart if needed',
     '2. Look for the word "Total" or a similar label',
     '3. Next to it, you should see the total price',
     '4. Make sure the number looks right based on what you added'
    ],
    whatYouShouldSee: 'The total price displayed clearly, usually in a colored font (like orange or green), with the currency symbol (like $ or your local currency)',
    expectedResult: 'Total price is shown and matches the sum of all items'
   }
  ],
  preconditions: [
   'You have the app installed and open',
   'You can see at least one restaurant',
   'You are logged in (or not - we will test both)'
  ],
  testData: 'Any restaurant with available items',
  automatable: true,
  status: 'Not Started',
  notes: 'This is the most basic cart functionality - if this does not work, customers cannot order at all.',
  successChecklist: [
   '✓ Cart screen opens without crashing',
   '✓ Restaurant name and logo are shown',
   '✓ All added items are listed',
   '✓ Each item shows name, picture, and price',
   '✓ Total price is displayed at bottom',
   '✓ Continue button is visible'
  ]},
 {
  id: 'TC-CART-002',
  title: 'Change How Many of Something You Want',
  whatYoureTesting: 'Making sure customers can increase or decrease the quantity of items in their cart',
  whyItMatters: 'Customers often want to order 2 or 3 of the same thing, or change their mind and want less. This needs to work smoothly.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CART-003'],
  relatedEdgeCases: ['EC-CART-010'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open your cart with at least one item',
    detailedSteps: [
     '1. Make sure you have added at least one item to cart',
     '2. Open your cart by tapping the cart icon',
     '3. Find the item you want to change'
    ],
    whatYouShouldSee: 'Your item with a number (probably "1") and plus/minus buttons next to it',
    expectedResult: 'Cart opens showing your item with quantity controls'
   },
   {
    step: 2,
    instruction: 'Tap the plus button to add more',
    detailedSteps: [
     '1. Find the plus (+) button next to your item',
     '2. Tap it once',
     '3. Watch the number change from 1 to 2',
     '4. Watch the total price at the bottom update too'
    ],
    whatYouShouldSee: 'The number changes to 2, and the total price goes up (it should roughly double if you only had one item)',
    expectedResult: 'Quantity increases and total price updates immediately'
   },
   {
    step: 3,
    instruction: 'Tap the minus button to reduce quantity',
    detailedSteps: [
     '1. Find the minus (-) button next to your item',
     '2. Tap it once',
     '3. Watch the number go back down to 1',
     '4. Watch the total price decrease'
    ],
    whatYouShouldSee: 'The number changes back to 1, and the total price goes back to the original amount',
    expectedResult: 'Quantity decreases and total price updates immediately'
   },
   {
    step: 4,
    instruction: 'Try to reduce below 1 - see what happens',
    detailedSteps: [
     '1. When the quantity is at 1, tap the minus button again',
     '2. The minus button should turn into a trash/delete icon',
     '3. If you tap it, you should see a confirmation asking if you want to remove the item'
    ],
    whatYouShouldSee: 'Instead of going to 0, you should see a delete icon and a popup asking "Are you sure you want to remove this?"',
    expectedResult: 'Delete confirmation appears instead of reducing to 0'
   }
  ],
  preconditions: [
   'You have at least one item in your cart',
   'You are on the cart screen'
  ],
  testData: 'Any item from any restaurant',
  automatable: true,
  status: 'Not Started',
  notes: 'Price should update instantly - no need to refresh or tap anywhere else.',
  successChecklist: [
   '✓ Plus button increases quantity',
   '✓ Minus button decreases quantity',
   '✓ Number updates immediately when tapped',
   '✓ Total price recalculates automatically',
   '✓ Cannot go below 1 without confirmation',
   '✓ Delete confirmation appears at quantity 1'
  ]},
 {
  id: 'TC-CART-003',
  title: 'Remove an Item from Your Cart',
  whatYoureTesting: 'Making sure customers can remove items they do not want anymore',
  whyItMatters: 'People change their minds! They need to be able to remove things easily without restarting their whole order.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CART-004'],
  relatedEdgeCases: ['EC-CART-019'],
  testSteps: [
   {
    step: 1,
    instruction: 'Have at least 2 items in your cart',
    detailedSteps: [
     '1. Add two different items from a restaurant to your cart',
     '2. Open your cart',
     '3. Make sure you see both items listed'
    ],
    whatYouShouldSee: 'Two items in your cart, each with their own price and quantity controls',
    expectedResult: 'Cart shows two separate items'
   },
   {
    step: 2,
    instruction: 'Remove one item by reducing its quantity',
    detailedSteps: [
     '1. Find one of the items',
     '2. Make sure its quantity is at 1',
     '3. Tap the minus button (it should look like a trash can when at 1)',
     '4. A popup should appear asking if you really want to remove it'
    ],
    whatYouShouldSee: 'A popup or bottom sheet asking "Remove [item name]?" with OK and Cancel buttons',
    expectedResult: 'Confirmation dialog appears before removing'
   },
   {
    step: 3,
    instruction: 'Confirm the removal',
    detailedSteps: [
     '1. In the popup, tap "OK" or "Confirm" or "Remove"',
     '2. The popup should close',
     '3. The item should disappear from your cart',
     '4. Now you should only see 1 item'
    ],
    whatYouShouldSee: 'The item is gone! Your cart now shows only the remaining item, and the total price has been updated.',
    expectedResult: 'Item is removed, cart updates to show remaining items'
   }
  ],
  preconditions: [
   'You have at least 2 items in cart',
   'You can see the cart screen'
  ],
  testData: 'Any two items from the same restaurant',
  automatable: true,
  status: 'Not Started',
  notes: 'Always ask for confirmation before deleting - never delete instantly without asking.',
  successChecklist: [
   '✓ Minus button at quantity 1 shows delete icon',
   '✓ Confirmation popup appears',
   '✓ Cancel keeps the item',
   '✓ Confirm removes the item',
   '✓ Other items remain unchanged',
   '✓ Total price updates correctly'
  ]},
 {
  id: 'TC-CART-004',
  title: 'View All Your Saved Carts (My Carts)',
  whatYoureTesting: 'Making sure customers can see all their saved shopping carts from different restaurants',
  whyItMatters: 'Customers might add items from multiple restaurants and come back later. They need to find their old carts.',
  estimatedTime: '4-5 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-005'],
  relatedEdgeCases: ['EC-CART-006', 'EC-CART-009'],
  testSteps: [
   {
    step: 1,
    instruction: 'Create carts at two different restaurants',
    detailedSteps: [
     '1. Go to one restaurant and add something to cart',
     '2. Do NOT checkout - just leave that restaurant',
     '3. Go to a DIFFERENT restaurant',
     '4. Add something from this second restaurant',
     '5. Again, do NOT checkout'
    ],
    whatYouShouldSee: 'You should have items from two different restaurants waiting in your carts',
    expectedResult: 'Two separate carts are created for two restaurants'
   },
   {
    step: 2,
    instruction: 'Go to the My Carts screen',
    detailedSteps: [
     '1. Look for "My Carts" in the menu or profile area',
     '2. It might be under your profile, or in the bottom menu',
     '3. Tap on it to see all your saved carts'
    ],
    whatYouShouldSee: 'A list showing both restaurants you added items from. Each one should show: the restaurant logo, name, how many items, and the total price.',
    expectedResult: 'My Carts screen shows both saved carts'
   },
   {
    step: 3,
    instruction: 'Check the status of each restaurant',
    detailedSteps: [
     '1. Look at each cart card',
     '2. You should see either a green dot (online) or gray dot (offline) near each one',
     '3. This tells you if the restaurant is currently accepting orders'
    ],
    whatYouShouldSee: 'A small colored circle next to each restaurant name - green means open, gray means closed',
    expectedResult: 'Restaurant status is shown for each cart'
   },
   {
    step: 4,
    instruction: 'Tap on one cart to open it',
    detailedSteps: [
     '1. Tap anywhere on one of the cart cards',
     '2. It should open that specific cart',
     '3. You should see the items you added earlier'
    ],
    whatYouShouldSee: 'The cart opens showing all the items you added from that restaurant, with the ability to edit or checkout',
    expectedResult: 'Tapping a cart opens it for viewing/editing'
   }
  ],
  preconditions: [
   'You have created carts at multiple restaurants',
   'The carts are less than 2 days old'
  ],
  testData: 'Items from at least 2 different restaurants',
  automatable: true,
  status: 'Not Started',
  notes: 'Carts older than 2 days will automatically disappear. Maximum 5 carts can be saved at once.',
  successChecklist: [
   '✓ My Carts screen is accessible',
   '✓ Both carts appear in the list',
   '✓ Restaurant name and logo shown',
   '✓ Item count is correct',
   '✓ Total price is shown',
   '✓ Online/offline status is visible',
   '✓ Can tap to open each cart'
  ]},
 {
  id: 'TC-CART-005',
  title: 'Delete an Entire Cart from My Carts',
  whatYoureTesting: 'Making sure customers can delete a whole cart they no longer want',
  whyItMatters: 'If someone changed their mind about ordering from a restaurant, they should be able to clear that cart easily.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-006'],
  relatedEdgeCases: ['EC-CART-006'],
  testSteps: [
   {
    step: 1,
    instruction: 'Go to My Carts with at least one saved cart',
    detailedSteps: [
     '1. Make sure you have at least one cart saved',
     '2. Go to the My Carts screen',
     '3. Find the cart you want to delete'
    ],
    whatYouShouldSee: 'At least one cart card with a trash/delete icon somewhere on it',
    expectedResult: 'My Carts shows at least one cart with delete option'
   },
   {
    step: 2,
    instruction: 'Tap the delete button on a cart',
    detailedSteps: [
     '1. Look for a trash can icon on the cart card',
     '2. It is usually in the bottom right corner',
     '3. Tap on it',
     '4. A confirmation popup should appear'
    ],
    whatYouShouldSee: 'A popup asking something like "Are you sure you want to delete this cart?" with Confirm and Cancel options',
    expectedResult: 'Confirmation dialog appears before deleting'
   },
   {
    step: 3,
    instruction: 'Confirm the deletion',
    detailedSteps: [
     '1. In the popup, tap Confirm or OK or Delete',
     '2. The cart should disappear from the list',
     '3. If it was your only cart, you should see an empty state with a message'
    ],
    whatYouShouldSee: 'The cart is gone. If you had multiple carts, the others remain. If it was the only one, you see a message like "No carts" with maybe a picture.',
    expectedResult: 'Cart is deleted, list updates, other carts remain'
   }
  ],
  preconditions: [
   'You have at least one cart in My Carts',
   'You are on the My Carts screen'
  ],
  testData: 'At least one saved cart',
  automatable: true,
  status: 'Not Started',
  notes: 'Deleting a cart cannot be undone, so confirmation is important.',
  successChecklist: [
   '✓ Delete icon is visible on cart card',
   '✓ Tapping delete shows confirmation',
   '✓ Cancel keeps the cart',
   '✓ Confirm deletes the cart',
   '✓ Cart disappears from list',
   '✓ Empty state shows when no carts remain'
  ]},
 {
  id: 'TC-CART-006',
  title: 'Continue to Checkout from Cart',
  whatYoureTesting: 'Making sure customers can proceed from their cart to the payment/checkout screen',
  whyItMatters: 'This is the critical step before paying! If customers cannot get to checkout, they cannot place an order.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CART-007'],
  relatedEdgeCases: ['EC-CART-001', 'EC-CART-002', 'EC-CART-004'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open your cart with items and make sure you are logged in',
    detailedSteps: [
     '1. Make sure you are logged into your account',
     '2. Add at least one item to your cart',
     '3. Open the cart screen',
     '4. Verify items are showing'
    ],
    whatYouShouldSee: 'Your cart with items listed and a Continue button at the bottom',
    expectedResult: 'Cart is ready with items and Continue button visible'
   },
   {
    step: 2,
    instruction: 'Tap the Continue button',
    detailedSteps: [
     '1. Look at the very bottom of the cart screen',
     '2. There should be a big Continue button',
     '3. Tap it',
     '4. Wait a moment for the next screen'
    ],
    whatYouShouldSee: 'The screen changes to the Checkout page where you can choose payment method, delivery address, and see your final total',
    expectedResult: 'Navigate successfully to checkout screen'
   },
   {
    step: 3,
    instruction: 'Verify you are on the checkout screen',
    detailedSteps: [
     '1. Look for sections like: Delivery Address, Payment Method, Order Summary',
     '2. You should see your delivery address (or option to add one)',
     '3. You should see payment options',
     '4. There should be a Place Order or Confirm button somewhere'
    ],
    whatYouShouldSee: 'A checkout screen with your order summary, delivery details, and payment options. The total should match what you saw in the cart.',
    expectedResult: 'Checkout screen displays with all necessary sections'
   }
  ],
  preconditions: [
   'You are logged into your account',
   'You have items in your cart',
   'Items are in stock',
   'Restaurant is online/open'
  ],
  testData: 'Valid cart from an online restaurant',
  automatable: true,
  status: 'Not Started',
  notes: 'This test requires being logged in. If not logged in, a login prompt should appear.',
  successChecklist: [
   '✓ Continue button is tappable',
   '✓ Loading indicator appears briefly',
   '✓ Checkout screen opens',
   '✓ Order summary matches cart',
   '✓ Delivery options are visible',
   '✓ Payment methods are available'
  ]},
 {
  id: 'TC-CART-007',
  title: 'Try to Checkout Without Logging In',
  whatYoureTesting: 'Making sure the app asks customers to log in before they can checkout',
  whyItMatters: 'We need customer information to deliver orders. They must be logged in to complete a purchase.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-007'],
  relatedEdgeCases: ['EC-CART-002'],
  testSteps: [
   {
    step: 1,
    instruction: 'Log out of your account first',
    detailedSteps: [
     '1. Go to your profile or settings',
     '2. Find the Logout or Sign Out button',
     '3. Tap it to log out',
     '4. Confirm you are logged out (might see Login button instead)'
    ],
    whatYouShouldSee: 'You are now logged out - the app might show a Login button or guest mode indicator',
    expectedResult: 'You are successfully logged out'
   },
   {
    step: 2,
    instruction: 'Add something to cart while logged out',
    detailedSteps: [
     '1. Browse restaurants and find something you like',
     '2. Add it to your cart',
     '3. The app should let you add items without being logged in'
    ],
    whatYouShouldSee: 'Items are added to cart even without being logged in',
    expectedResult: 'Can add items to cart as guest'
   },
   {
    step: 3,
    instruction: 'Try to continue to checkout',
    detailedSteps: [
     '1. Open your cart',
     '2. Tap the Continue button',
     '3. Wait and see what happens'
    ],
    whatYouShouldSee: 'A popup or screen asking you to log in. It should NOT take you to checkout. It should say something like "Please log in to continue" with a Login button.',
    expectedResult: 'Login prompt appears instead of going to checkout'
   },
   {
    step: 4,
    instruction: 'Log in and try again',
    detailedSteps: [
     '1. Tap the Login button in the popup',
     '2. Enter your phone number and verify',
     '3. After logging in, you should be taken back to your cart',
     '4. Tap Continue again'
    ],
    whatYouShouldSee: 'After logging in, you should now be able to proceed to checkout',
    expectedResult: 'After login, checkout works normally'
   }
  ],
  preconditions: [
   'You have an account to log back into',
   'You start this test logged out'
  ],
  testData: 'Any items, must have account credentials ready',
  automatable: true,
  status: 'Not Started',
  notes: 'Cart should be preserved after logging in - items should not disappear.',
  successChecklist: [
   '✓ Can add items while logged out',
   '✓ Continue button triggers login prompt',
   '✓ Cannot bypass to checkout without login',
   '✓ Login prompt is clear',
   '✓ Cart preserved after login',
   '✓ Can checkout after logging in'
  ]},
 {
  id: 'TC-CART-008',
  title: 'Try to Checkout Without a Delivery Address',
  whatYoureTesting: 'Making sure the app requires a delivery address before checkout',
  whyItMatters: 'We cannot deliver food without knowing where to send it! Address must be set first.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-007'],
  relatedEdgeCases: ['EC-CART-004'],
  testSteps: [
   {
    step: 1,
    instruction: 'Remove all saved addresses',
    detailedSteps: [
     '1. Go to your profile or settings',
     '2. Find "My Addresses" or "Saved Addresses"',
     '3. Delete all your saved addresses',
     '4. Make sure no default address is set'
    ],
    whatYouShouldSee: 'Your address list should be empty',
    expectedResult: 'No delivery addresses saved'
   },
   {
    step: 2,
    instruction: 'Add items to cart and try to checkout',
    detailedSteps: [
     '1. Go to a restaurant and add something to cart',
     '2. Open your cart',
     '3. Make sure you are logged in',
     '4. Tap the Continue button'
    ],
    whatYouShouldSee: 'Instead of going to checkout, you should see a popup or screen asking you to add a delivery address first',
    expectedResult: 'Address selection prompt appears'
   },
   {
    step: 3,
    instruction: 'Add an address when prompted',
    detailedSteps: [
     '1. In the popup, tap to add a new address',
     '2. Enter your address details',
     '3. Save the address',
     '4. The app should now let you continue to checkout'
    ],
    whatYouShouldSee: 'After adding address, checkout screen should open with your new address selected',
    expectedResult: 'Checkout opens after address is added'
   }
  ],
  preconditions: [
   'You are logged in',
   'You have no saved addresses',
   'You have items in cart'
  ],
  testData: 'Any items, prepare a valid address',
  automatable: false,
  status: 'Not Started',
  notes: 'This test requires removing addresses first. Make sure to add them back after testing.',
  successChecklist: [
   '✓ Continue triggers address check',
   '✓ Address prompt appears when none set',
   '✓ Can add new address from prompt',
   '✓ Checkout opens after address added',
   '✓ New address is saved for future use'
  ]},
 {
  id: 'TC-CART-009',
  title: 'Handle Out of Stock Items',
  whatYoureTesting: 'Making sure the app properly handles items that became unavailable',
  whyItMatters: 'Menu items can run out. Customers need to know before they try to order so they are not disappointed.',
  estimatedTime: '4-5 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-007'],
  relatedEdgeCases: ['EC-CART-003'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find an item that is out of stock (or simulate it)',
    detailedSteps: [
     '1. This test may need help from someone who can mark items as out of stock',
     '2. Or wait until an item in your cart naturally becomes unavailable',
     '3. The item should show some indication that it is unavailable'
    ],
    whatYouShouldSee: 'An item marked as "Out of Stock" or grayed out in your cart',
    expectedResult: 'Out of stock item is visually indicated'
   },
   {
    step: 2,
    instruction: 'Try to tap on the out of stock item',
    detailedSteps: [
     '1. Tap on the unavailable item in your cart',
     '2. Instead of opening the edit screen, you should see a message'
    ],
    whatYouShouldSee: 'A toast message or popup saying something like "[Item name] is out of stock"',
    expectedResult: 'Cannot edit out of stock items, message shown'
   },
   {
    step: 3,
    instruction: 'Try to continue to checkout',
    detailedSteps: [
     '1. With the out of stock item still in cart, tap Continue',
     '2. The app should stop you and show a message about the unavailable item'
    ],
    whatYouShouldSee: 'A popup listing which items are out of stock, asking you to remove them before continuing',
    expectedResult: 'Cannot proceed with out of stock items, prompted to remove them'
   }
  ],
  preconditions: [
   'Have an item that is or can be marked out of stock',
   'Item is in your cart'
  ],
  testData: 'Need access to mark items unavailable or find one that is',
  automatable: false,
  status: 'Not Started',
  notes: 'This test may require backend access to mark items as out of stock.',
  successChecklist: [
   '✓ Out of stock items are visually marked',
   '✓ Cannot edit out of stock items',
   '✓ Toast/message shown when tapping unavailable item',
   '✓ Continue blocked with out of stock items',
   '✓ Clear list of problematic items shown',
   '✓ Can remove and continue successfully'
  ]},
 {
  id: 'TC-CART-010',
  title: 'Add Special Instructions for Market Orders',
  whatYoureTesting: 'Making sure customers can tell the market what to do if an item is unavailable',
  whyItMatters: 'When ordering groceries, items might be out. Customers need to say: cancel it, replace it, or call me.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-009'],
  relatedEdgeCases: ['EC-CART-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Order from a market/grocery store',
    detailedSteps: [
     '1. Find a market or grocery store (not a restaurant)',
     '2. Add some items to your cart',
     '3. Open your cart'
    ],
    whatYouShouldSee: 'In addition to your items, you should see a section asking "In case there is no item" or similar about substitutions',
    expectedResult: 'Cart shows special instructions section for market orders'
   },
   {
    step: 2,
    instruction: 'Tap on the instructions section',
    detailedSteps: [
     '1. Find the section about "If item is unavailable" or similar',
     '2. Tap on it',
     '3. A popup or bottom sheet should appear with options'
    ],
    whatYouShouldSee: 'Options like: "Cancel the item", "Replace with similar", "Contact me" - plus maybe a text box for custom notes',
    expectedResult: 'Instruction options appear in a popup'
   },
   {
    step: 3,
    instruction: 'Select an option or write custom instructions',
    detailedSteps: [
     '1. Tap on one of the preset options, OR',
     '2. Type your own instructions in the text box',
     '3. Save or confirm your selection',
     '4. The selected option should now show in the cart'
    ],
    whatYouShouldSee: 'Your selected option is now displayed in the cart, probably in a colored tag or badge',
    expectedResult: 'Selected instruction is saved and displayed'
   }
  ],
  preconditions: [
   'Market store is available in your area',
   'You have items from a market in cart'
  ],
  testData: 'Items from a market/grocery store',
  automatable: true,
  status: 'Not Started',
  notes: 'This only appears for market orders, not regular restaurants.',
  successChecklist: [
   '✓ Instructions section visible for market orders',
   '✓ Can tap to open options',
   '✓ Preset options are available',
   '✓ Can write custom note',
   '✓ Selection is saved and displayed',
   '✓ Can proceed to checkout with selection'
  ]},
 {
  id: 'TC-CART-011',
  title: 'See Free Delivery Progress',
  whatYoureTesting: 'Making sure customers can see how close they are to getting free delivery',
  whyItMatters: 'Free delivery motivates customers to add more items. They need to see the progress clearly.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-011'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a restaurant with free delivery threshold',
    detailedSteps: [
     '1. Look for a restaurant that offers free delivery above a certain amount',
     '2. This might be shown as "Free delivery over $25" or similar',
     '3. Add a small item to test (something below the threshold)'
    ],
    whatYouShouldSee: 'In the cart, you should see a progress bar or message showing how much more you need to spend for free delivery',
    expectedResult: 'Free delivery progress indicator is visible'
   },
   {
    step: 2,
    instruction: 'Add more items and watch the progress',
    detailedSteps: [
     '1. Go back to the restaurant menu',
     '2. Add more items to your cart',
     '3. Watch the progress bar fill up',
     '4. It should update as your total increases'
    ],
    whatYouShouldSee: 'The progress bar fills up as you add more items. You might see a message like "Add $X more for free delivery"',
    expectedResult: 'Progress updates in real-time as items are added'
   },
   {
    step: 3,
    instruction: 'Reach the free delivery threshold',
    detailedSteps: [
     '1. Keep adding items until you reach or exceed the threshold',
     '2. Watch what happens when you cross that line'
    ],
    whatYouShouldSee: 'A celebration! You might see confetti, a checkmark, or a message saying "Congrats! Free delivery!" The progress bar should show 100%.',
    expectedResult: 'Celebration animation when threshold reached'
   }
  ],
  preconditions: [
   'Restaurant has free delivery threshold',
   'You start with a small order'
  ],
  testData: 'Restaurant with free delivery threshold configured',
  automatable: true,
  status: 'Not Started',
  notes: 'Not all restaurants have this feature. Find one that advertises free delivery over a certain amount.',
  successChecklist: [
   '✓ Progress indicator visible',
   '✓ Progress updates when items added',
   '✓ Shows amount needed for free delivery',
   '✓ Celebration when threshold reached',
   '✓ Progress shows 100% after threshold',
   '✓ Free delivery applies at checkout'
  ]},
 {
  id: 'TC-CART-012',
  title: 'Cannot Order from Offline Restaurant',
  whatYoureTesting: 'Making sure customers cannot place orders at restaurants that are closed',
  whyItMatters: 'If a restaurant is not accepting orders, customers should know before wasting time.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-005'],
  relatedEdgeCases: ['EC-CART-005'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a cart from a restaurant that is now offline',
    detailedSteps: [
     '1. Create a cart at any restaurant',
     '2. Wait for the restaurant to close (or have someone mark it offline)',
     '3. Go to My Carts',
     '4. Look at the status of your cart'
    ],
    whatYouShouldSee: 'The cart should show a gray dot or "Offline" status next to the restaurant name',
    expectedResult: 'Offline status is clearly visible'
   },
   {
    step: 2,
    instruction: 'Try to open the offline cart',
    detailedSteps: [
     '1. Tap on the cart card for the offline restaurant',
     '2. Instead of opening the cart, you should get a message'
    ],
    whatYouShouldSee: 'A popup or toast saying "Restaurant is offline" or "This restaurant is not accepting orders now"',
    expectedResult: 'Cannot open cart, message explains why'
   },
   {
    step: 3,
    instruction: 'Wait for restaurant to come back online',
    detailedSteps: [
     '1. Wait for the restaurant to reopen',
     '2. Pull to refresh or leave and return to My Carts',
     '3. The status should update to show green/online',
     '4. Now you should be able to open the cart'
    ],
    whatYouShouldSee: 'Status changes to green/online, and tapping the cart now opens it',
    expectedResult: 'Cart accessible when restaurant comes back online'
   }
  ],
  preconditions: [
   'Have a saved cart',
   'Restaurant becomes offline'
  ],
  testData: 'Cart at restaurant that can be toggled offline',
  automatable: false,
  status: 'Not Started',
  notes: 'This may require coordination to mark a restaurant offline.',
  successChecklist: [
   '✓ Offline status clearly shown',
   '✓ Cannot open cart when offline',
   '✓ Error message is helpful',
   '✓ Cart preserved during offline',
   '✓ Cart accessible when back online',
   '✓ Can delete cart while offline'
  ]},
 {
  id: 'TC-CART-013',
  title: 'Maximum 5 Carts Limit',
  whatYoureTesting: 'Making sure the app enforces the 5 cart limit and handles it gracefully',
  whyItMatters: 'We limit carts to prevent abandoned orders piling up. Users need clear feedback when they hit the limit.',
  estimatedTime: '8-10 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-002', 'UC-CART-005'],
  relatedEdgeCases: ['EC-CART-006'],
  testSteps: [
   {
    step: 1,
    instruction: 'Create 5 different carts',
    detailedSteps: [
     '1. Go to 5 different restaurants',
     '2. Add at least one item from each',
     '3. Do NOT checkout any of them',
     '4. Go to My Carts and verify you have 5'
    ],
    whatYouShouldSee: '5 different cart cards in My Carts, one for each restaurant',
    expectedResult: '5 carts are saved successfully'
   },
   {
    step: 2,
    instruction: 'Try to create a 6th cart',
    detailedSteps: [
     '1. Go to a 6th restaurant (different from the 5 you already have)',
     '2. Try to add an item to cart',
     '3. Watch what happens'
    ],
    whatYouShouldSee: 'A message should appear saying you have reached the maximum number of carts and asking if you want to delete the oldest one',
    expectedResult: 'Warning about maximum carts reached'
   },
   {
    step: 3,
    instruction: 'Confirm to delete oldest cart',
    detailedSteps: [
     '1. In the popup, confirm that you want to replace the oldest cart',
     '2. The oldest cart should be deleted',
     '3. Your new 6th cart should now be saved'
    ],
    whatYouShouldSee: 'You should now have 5 carts again - the oldest one replaced by the new one',
    expectedResult: 'Oldest cart deleted, new cart created, still have 5 total'
   }
  ],
  preconditions: [
   'You can access at least 6 different restaurants',
   'You start with 0 or few carts'
  ],
  testData: '6 different restaurants',
  automatable: true,
  status: 'Not Started',
  notes: 'This test takes time because you need to create 5 carts first.',
  successChecklist: [
   '✓ Can create up to 5 carts',
   '✓ 6th cart triggers warning',
   '✓ Warning explains the limit',
   '✓ Option to delete oldest cart',
   '✓ Option to cancel and keep current carts',
   '✓ After deletion, new cart is created'
  ]},
 {
  id: 'TC-CART-014',
  title: 'Vending Machine Single Item Limit',
  whatYoureTesting: 'Making sure vending machines only allow one item per order',
  whyItMatters: 'Vending machines can only dispense one item at a time. Multiple items would break the process.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-007'],
  relatedEdgeCases: ['EC-CART-007'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a vending machine location',
    detailedSteps: [
     '1. Look for vending machines in the app (might be under a special category)',
     '2. Open one that has items available'
    ],
    whatYouShouldSee: 'A vending machine "restaurant" with snacks or drinks',
    expectedResult: 'Found a vending machine listing'
   },
   {
    step: 2,
    instruction: 'Add one item and try to add more',
    detailedSteps: [
     '1. Add any item to cart',
     '2. Try to add a second different item',
     '3. OR try to increase quantity of first item to 2'
    ],
    whatYouShouldSee: 'You should get a message saying only one item is allowed per vending order',
    expectedResult: 'Cannot add multiple items to vending cart'
   },
   {
    step: 3,
    instruction: 'Try to checkout with multiple items (if possible)',
    detailedSteps: [
     '1. If you somehow got multiple items, try to Continue to checkout',
     '2. The app should block you'
    ],
    whatYouShouldSee: 'Message saying "Please add only one item" or similar, cannot proceed',
    expectedResult: 'Checkout blocked for multiple vending items'
   }
  ],
  preconditions: [
   'Vending machine available in app',
   'Vending machine has items'
  ],
  testData: 'Vending machine location',
  automatable: true,
  status: 'Not Started',
  notes: 'Vending machines might not be available in all areas.',
  successChecklist: [
   '✓ Can add one item from vending',
   '✓ Cannot add second item',
   '✓ Cannot increase quantity to 2',
   '✓ Clear error message when trying',
   '✓ Single item order works'
  ]},
 {
  id: 'TC-CART-015',
  title: 'Edit a Cart Item (Change Options)',
  whatYoureTesting: 'Making sure customers can edit items they already added to change toppings or options',
  whyItMatters: 'Customers might want to change their pizza toppings or drink size after adding. They should not have to delete and re-add.',
  estimatedTime: '4-5 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-008'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Add an item with customizable options',
    detailedSteps: [
     '1. Find an item with options (like pizza with toppings, or drink with size)',
     '2. Select some options when adding',
     '3. Add it to cart',
     '4. Open your cart'
    ],
    whatYouShouldSee: 'The item in your cart should show the options you selected (like "Large" or "Extra cheese")',
    expectedResult: 'Item with options is in cart'
   },
   {
    step: 2,
    instruction: 'Tap on the item to edit it',
    detailedSteps: [
     '1. Tap on the item card (not on the +/- buttons)',
     '2. The item detail page should open',
     '3. Your previous selections should be pre-selected'
    ],
    whatYouShouldSee: 'The dish page opens with your previously selected options already highlighted/checked',
    expectedResult: 'Edit screen opens with current selections'
   },
   {
    step: 3,
    instruction: 'Change the options and save',
    detailedSteps: [
     '1. Change some options (like size or toppings)',
     '2. The price should update',
     '3. Tap Update Cart or Save button',
     '4. Go back to cart'
    ],
    whatYouShouldSee: 'Back in cart, the item now shows your NEW selections, and the price reflects the changes',
    expectedResult: 'Item updated with new options, price recalculated'
   }
  ],
  preconditions: [
   'Item with customizable options exists',
   'Item is in cart'
  ],
  testData: 'Customizable item (pizza, drink, etc.)',
  automatable: true,
  status: 'Not Started',
  notes: 'The edit should update the existing item, not create a duplicate.',
  successChecklist: [
   '✓ Can tap item to edit',
   '✓ Previous options pre-selected',
   '✓ Can change options',
   '✓ Price updates with changes',
   '✓ Save updates existing item',
   '✓ No duplicate created',
   '✓ Cart total updated'
  ]},
 {
  id: 'TC-CART-016',
  title: 'Reorder a Previous Order',
  whatYoureTesting: 'Making sure customers can quickly reorder something they ordered before',
  whyItMatters: 'Repeat customers love convenience. Reordering their usual saves time and increases orders.',
  estimatedTime: '4-5 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-010'],
  relatedEdgeCases: ['EC-CART-014'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a previous order in your order history',
    detailedSteps: [
     '1. Go to your order history',
     '2. Find an order you placed before',
     '3. Look for a "Reorder" button'
    ],
    whatYouShouldSee: 'Your past orders with a Reorder button on each one',
    expectedResult: 'Found previous order with reorder option'
   },
   {
    step: 2,
    instruction: 'Tap Reorder',
    detailedSteps: [
     '1. Tap the Reorder button',
     '2. Wait for it to load',
     '3. You should be taken to a cart with the same items'
    ],
    whatYouShouldSee: 'Cart opens with the same items you ordered before, including any toppings/options you had',
    expectedResult: 'Cart created with items from previous order'
   },
   {
    step: 3,
    instruction: 'Check the items and options',
    detailedSteps: [
     '1. Look at each item in the reordered cart',
     '2. Verify the toppings and options match your original order',
     '3. Note that prices might have changed since then'
    ],
    whatYouShouldSee: 'Items match what you ordered before. If any options changed (like menu was updated), you might see a warning.',
    expectedResult: 'Items match or warning shown for changes'
   },
   {
    step: 4,
    instruction: 'Proceed to checkout',
    detailedSteps: [
     '1. If everything looks good, tap Continue',
     '2. If there were warnings about options, you might need to reselect some items'
    ],
    whatYouShouldSee: 'Either go to checkout, or if options changed, see a screen to re-select options',
    expectedResult: 'Can proceed to checkout or handle option changes'
   }
  ],
  preconditions: [
   'You have at least one previous order',
   'Restaurant from that order still exists'
  ],
  testData: 'Previous order from an available restaurant',
  automatable: true,
  status: 'Not Started',
  notes: 'Prices in the reorder will be current prices, not what you paid before.',
  successChecklist: [
   '✓ Reorder button works',
   '✓ Cart created with same items',
   '✓ Toppings/options included',
   '✓ Current prices are used',
   '✓ Unavailable items are flagged',
   '✓ Can proceed to checkout'
  ]},
 {
  id: 'TC-CART-017',
  title: 'See Dynamic Rewards While Shopping',
  whatYoureTesting: 'Making sure customers see reward tiers that encourage them to order more',
  whyItMatters: 'Showing rewards like "Spend $5 more and get free fries" increases order value and customer satisfaction.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-012'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a restaurant with dynamic rewards',
    detailedSteps: [
     '1. Look for restaurants that show reward badges or special offers',
     '2. Add items to cart from that restaurant',
     '3. Open your cart'
    ],
    whatYouShouldSee: 'At the bottom of the cart (above the Continue button), you might see a rewards section showing tier levels',
    expectedResult: 'Rewards element visible in cart if available'
   },
   {
    step: 2,
    instruction: 'Check which reward tier you are at',
    detailedSteps: [
     '1. Look at the rewards display',
     '2. It should show your current tier based on cart total',
     '3. It might show "Spend $X more to unlock..." next reward'
    ],
    whatYouShouldSee: 'A display showing reward tiers, with your current one highlighted and next tier showing how much more to spend',
    expectedResult: 'Current reward tier highlighted based on cart total'
   },
   {
    step: 3,
    instruction: 'Add more items and watch tier change',
    detailedSteps: [
     '1. Add more items to increase your total',
     '2. Come back to cart',
     '3. The reward tier should update'
    ],
    whatYouShouldSee: 'As you add more, you climb to higher reward tiers. The highlight moves to show your new tier.',
    expectedResult: 'Reward tier updates with cart total'
   }
  ],
  preconditions: [
   'Restaurant has dynamic rewards configured',
   'Feature is enabled'
  ],
  testData: 'Restaurant with active reward tiers',
  automatable: true,
  status: 'Not Started',
  notes: 'Not all restaurants have this feature. Look for ones with "Rewards" or special offers.',
  successChecklist: [
   '✓ Rewards element loads',
   '✓ Current tier is highlighted',
   '✓ Shows amount to next tier',
   '✓ Updates when cart changes',
   '✓ Reward applied at checkout'
  ]},
 {
  id: 'TC-CART-018',
  title: 'See Trending Dishes Recommendations',
  whatYoureTesting: 'Making sure customers see suggestions to add more items',
  whyItMatters: 'Recommending popular dishes can increase order value and help customers discover new favorites.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-014'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Open your cart from a restaurant',
    detailedSteps: [
     '1. Add at least one item from a restaurant',
     '2. Open your cart',
     '3. Scroll down past your items'
    ],
    whatYouShouldSee: 'Below your items, you might see a "Why not try" or "You might also like" section with dish recommendations',
    expectedResult: 'Trending dishes section visible in cart'
   },
   {
    step: 2,
    instruction: 'Look at the recommended dishes',
    detailedSteps: [
     '1. Scroll through the recommendations',
     '2. They should be from the same restaurant',
     '3. They should not include items already in your cart'
    ],
    whatYouShouldSee: 'Dish cards showing popular items you have not added yet, with photos, names, and prices',
    expectedResult: 'Recommendations are relevant and not duplicates'
   },
   {
    step: 3,
    instruction: 'Tap on a recommendation',
    detailedSteps: [
     '1. Tap on one of the recommended dishes',
     '2. It should take you to that dish\'s detail page',
     '3. You can add it from there'
    ],
    whatYouShouldSee: 'Dish detail page opens where you can view options and add to cart',
    expectedResult: 'Can Go to and add recommended dishes'
   }
  ],
  preconditions: [
   'Restaurant has trending dishes configured',
   'At least one item in cart'
  ],
  testData: 'Restaurant with trending dishes',
  automatable: true,
  status: 'Not Started',
  notes: 'Section might not appear if restaurant has not configured trending dishes.',
  successChecklist: [
   '✓ Recommendations section visible',
   '✓ Shows dishes not in cart',
   '✓ Photos and prices shown',
   '✓ Can tap to view dish',
   '✓ Can add from detail page'
  ]},
 {
  id: 'TC-CART-019',
  title: 'Cart Auto-Saves Your Items',
  whatYoureTesting: 'Making sure cart items are saved even if you close the app',
  whyItMatters: 'Customers might get interrupted. Their cart should still be there when they come back.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CART-002'],
  relatedEdgeCases: ['EC-CART-016'],
  testSteps: [
   {
    step: 1,
    instruction: 'Add items to cart and note what you added',
    detailedSteps: [
     '1. Go to a restaurant and add a few items',
     '2. Note the restaurant name and what items you added',
     '3. Check that items show in your cart'
    ],
    whatYouShouldSee: 'Your items in the cart',
    expectedResult: 'Cart has items you added'
   },
   {
    step: 2,
    instruction: 'Completely close the app',
    detailedSteps: [
     '1. Press the home button (do not just minimize)',
     '2. Swipe the app away to close it completely',
     '3. Make sure the app is really closed (not running in background)'
    ],
    whatYouShouldSee: 'App is closed',
    expectedResult: 'App fully closed'
   },
   {
    step: 3,
    instruction: 'Reopen the app and check your cart',
    detailedSteps: [
     '1. Open the app again',
     '2. Go to your cart or My Carts',
     '3. Look for your items'
    ],
    whatYouShouldSee: 'All the items you added should still be there, with correct quantities and options',
    expectedResult: 'Cart items preserved after app restart'
   }
  ],
  preconditions: [
   'You can add items to cart',
   'You can fully close the app'
  ],
  testData: 'Any items from any restaurant',
  automatable: false,
  status: 'Not Started',
  notes: 'Cart data is saved locally on your device.',
  successChecklist: [
   '✓ Items added to cart',
   '✓ App fully closed',
   '✓ App reopened',
   '✓ Items still in cart',
   '✓ Correct quantities',
   '✓ Options preserved'
  ]},
 {
  id: 'TC-CART-020',
  title: 'Pickup Orders Hide Delivery Services',
  whatYoureTesting: 'Making sure extra services (like cutlery) do not show for pickup orders',
  whyItMatters: 'Services like napkins make sense for delivery but not when you pick up and eat at the restaurant.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CART-013'],
  relatedEdgeCases: ['EC-CART-017'],
  testSteps: [
   {
    step: 1,
    instruction: 'Switch to pickup mode',
    detailedSteps: [
     '1. In the app, find where you switch between Delivery and Pickup',
     '2. Switch to Pickup mode',
     '3. Add items to cart from a restaurant that supports pickup'
    ],
    whatYouShouldSee: 'You are now in Pickup mode, ordering for pickup',
    expectedResult: 'App is in pickup mode'
   },
   {
    step: 2,
    instruction: 'Open cart and look for services section',
    detailedSteps: [
     '1. Open your cart',
     '2. Scroll through the cart',
     '3. Look for any "Services" or "Add extras" section'
    ],
    whatYouShouldSee: 'The services section should NOT appear for pickup orders. You should only see your food items.',
    expectedResult: 'Services section is hidden for pickup'
   },
   {
    step: 3,
    instruction: 'Switch to delivery and check again',
    detailedSteps: [
     '1. Switch back to Delivery mode',
     '2. Go to cart again',
     '3. Look for services section now'
    ],
    whatYouShouldSee: 'For delivery, you should now see the services section (if the restaurant has services)',
    expectedResult: 'Services section appears for delivery mode'
   }
  ],
  preconditions: [
   'App supports both delivery and pickup',
   'Restaurant has services configured'
  ],
  testData: 'Restaurant that supports both modes and has services',
  automatable: true,
  status: 'Not Started',
  notes: 'Services are typically things like cutlery, napkins, and similar extras.',
  successChecklist: [
   '✓ Can switch to pickup mode',
   '✓ Services not shown in pickup cart',
   '✓ Can switch to delivery mode',
   '✓ Services shown in delivery cart'
  ]}
];





