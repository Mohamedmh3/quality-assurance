import type { TestCase } from '@/lib/types';

export const checkoutTestCases: TestCase[] = [
 // ============================================
 // CORE CHECKOUT FLOW TESTS (P0 - Critical)
 // ============================================
 {
  id: 'TC-CHECKOUT-001',
  title: 'Complete a Basic Checkout with Cash Payment',
  whatYoureTesting: 'Making sure customers can complete an order from start to finish using cash on delivery',
  whyItMatters: 'This is the most common order flow. If checkout doesn\'t work, nobody can order food!',
  estimatedTime: '5-6 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CHECKOUT-001', 'UC-CHECKOUT-002'],
  relatedEdgeCases: ['EC-CHECKOUT-001', 'EC-CHECKOUT-007'],
  testSteps: [
   {
    step: 1,
    instruction: 'Add items to cart and go to checkout',
    detailedSteps: [
     '1. Open a restaurant and add at least 2 items to your cart',
     '2. Look for the cart button at the bottom of the screen',
     '3. Tap on the cart button to view your cart',
     '4. Tap the "Checkout" or "Proceed to Checkout" button',
     '5. Wait for the checkout page to load'
    ],
    whatYouShouldSee: 'The checkout page opens showing your delivery address, delivery time options, payment methods, and order total.',
    expectedResult: 'Checkout page loads with all sections visible'
   },
   {
    step: 2,
    instruction: 'Verify the bill/price breakdown loads correctly',
    detailedSteps: [
     '1. Scroll down to find the "Invoice" or "Bill Details" section',
     '2. Wait for the numbers to load (you might see a loading animation briefly)',
     '3. Check that you can see: Subtotal, Delivery Fee, Tax, and Total',
     '4. Make sure the numbers look reasonable for what you ordered'
    ],
    whatYouShouldSee: 'A breakdown showing subtotal (price of your items), delivery fee, any tax, and the final total. Numbers should not be 0 or blank.',
    expectedResult: 'Bill calculation shows complete breakdown with accurate totals'
   },
   {
    step: 3,
    instruction: 'Select Cash on Delivery payment',
    detailedSteps: [
     '1. Look for the "Payment Method" section',
     '2. You should see payment options like "Cash" and possibly bank cards',
     '3. Tap on "Cash" or "Cash on Delivery"',
     '4. The cash option should appear highlighted or selected'
    ],
    whatYouShouldSee: 'Cash payment option is highlighted with a colored border. It should be the selected payment method.',
    expectedResult: 'Cash payment is selected'
   },
   {
    step: 4,
    instruction: 'Tap the Send Order button',
    detailedSteps: [
     '1. Scroll to the bottom of the checkout page',
     '2. Find the "Send Order" or "Place Order" button',
     '3. Make sure the button is orange/colored (not gray - gray means you can\'t tap it)',
     '4. Tap the button firmly'
    ],
    whatYouShouldSee: 'A popup or bottom sheet appears showing your order summary with restaurant name, items, delivery address, and total.',
    expectedResult: 'Order confirmation popup appears'
   },
   {
    step: 5,
    instruction: 'Confirm the order in the popup',
    detailedSteps: [
     '1. Review the order details in the popup',
     '2. Make sure everything looks correct',
     '3. Tap the "Confirm" button',
     '4. Wait for the order to be submitted (you\'ll see a loading indicator)'
    ],
    whatYouShouldSee: 'After confirming, a success screen appears with a happy mascot and message like "Great! Your order was submitted successfully".',
    expectedResult: 'Order is submitted and success screen appears'
   },
   {
    step: 6,
    instruction: 'Verify you\'re taken to order tracking',
    detailedSteps: [
     '1. The success screen disappears after a few seconds',
     '2. You should be automatically taken to the order tracking page',
     '3. You can see your order status',
     '4. Your cart should be empty now'
    ],
    whatYouShouldSee: 'Order tracking page shows your order with status "New" or "Pending". Going back to home shows empty cart.',
    expectedResult: 'going to order tracking, cart is cleared'
   }
  ],
  successChecklist: [
   '✓ Checkout page loaded completely',
   '✓ Bill calculation shows subtotal, delivery, tax, and total',
   '✓ Cash payment method is available and selectable',
   '✓ Send Order button is tappable (not gray)',
   '✓ Order confirmation popup shows correct details',
   '✓ Order submits successfully',
   '✓ Success screen appears',
   '✓ Cart is cleared after order',
   '✓ Go to order tracking'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Bill shows 0 or never loads',
     whatToDo: 'Wait 10 seconds. If still loading, check your internet. If connected, take screenshot and mark as FAILED.'
    },
    {
     problem: 'Send Order button is gray and can\'t be tapped',
     whatToDo: 'Scroll up and check if delivery address is set. If address is missing, add one. If address exists and button still gray, mark as FAILED.'
    },
    {
     problem: 'Order fails with an error message',
     whatToDo: 'Note the exact error message. Take screenshot. Mark as FAILED with the error message.'
    },
    {
     problem: 'App crashes when tapping Send Order',
     whatToDo: 'Note what happened right before crash. Mark as BLOCKED.'
    }
   ]
  },
  preconditions: [
   'You are logged into the app',
   'You have a saved delivery address',
   'You have items in your cart'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'This is the most important flow - test this first and most thoroughly.'
 },
 {
  id: 'TC-CHECKOUT-002',
  title: 'Bill Calculation Shows Correct Values',
  whatYoureTesting: 'Making sure the order total is calculated correctly with all fees and discounts',
  whyItMatters: 'If the bill is wrong, customers might pay too much or orders might fail.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P0',
  relatedUseCases: ['UC-CHECKOUT-001'],
  relatedEdgeCases: ['EC-CHECKOUT-001'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open checkout with items in cart',
    detailedSteps: [
     '1. Make sure you have at least 2 different items in your cart',
     '2. Note the prices of the items you added',
     '3. Go to checkout',
     '4. Wait for the bill to load'
    ],
    whatYouShouldSee: 'Checkout page with bill section loading',
    expectedResult: 'Checkout page opens'
   },
   {
    step: 2,
    instruction: 'Check the subtotal matches your items',
    detailedSteps: [
     '1. Look at the "Subtotal" line in the bill',
     '2. Add up the prices of your cart items in your head',
     '3. The subtotal should match (or be close to) your calculation',
     '4. If you added quantities, multiply price × quantity'
    ],
    whatYouShouldSee: 'Subtotal that equals the sum of your item prices times their quantities.',
    expectedResult: 'Subtotal is accurate'
   },
   {
    step: 3,
    instruction: 'Verify delivery fee is shown',
    detailedSteps: [
     '1. Look for "Delivery" or "Delivery Fee" line',
     '2. It should show a number (could be 0 if free delivery)',
     '3. The fee should be reasonable for your area'
    ],
    whatYouShouldSee: 'A delivery fee line with a number value.',
    expectedResult: 'Delivery fee is displayed'
   },
   {
    step: 4,
    instruction: 'Check the total/net total',
    detailedSteps: [
     '1. Look for "Total" or "Net Total" at the bottom',
     '2. This should be Subtotal + Delivery + Tax',
     '3. It\'s usually highlighted in a different color',
     '4. Make sure it\'s not blank or showing an error'
    ],
    whatYouShouldSee: 'A final total amount that is the sum of all components.',
    expectedResult: 'Net total is calculated and displayed'
   }
  ],
  successChecklist: [
   '✓ Subtotal matches cart items total',
   '✓ Delivery fee is shown',
   '✓ Tax is shown (if applicable)',
   '✓ Net total equals subtotal + fees',
   '✓ All numbers are reasonable (not 0, not blank, not negative)'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Subtotal doesn\'t match item prices',
     whatToDo: 'Double-check your math. If definitely wrong, take screenshot of cart and bill, mark as FAILED.'
    },
    {
     problem: 'Total shows 0',
     whatToDo: 'Wait 5 seconds. If still 0, scroll around. If persists, mark as FAILED.'
    },
    {
     problem: 'Error message appears instead of bill',
     whatToDo: 'Note the error message. Tap retry if available. Take screenshot, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'You have items in cart with known prices',
   'You are on the checkout page'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Do the math yourself to verify accuracy.'
 },
 {
  id: 'TC-CHECKOUT-003',
  title: 'Complete Checkout with Online Payment',
  whatYoureTesting: 'Making sure customers can pay using online banking or card payments',
  whyItMatters: 'Many customers prefer cashless payments. Online payment must work correctly.',
  estimatedTime: '5-7 minutes',
  type: 'Integration',
  priority: 'P0',
  relatedUseCases: ['UC-CHECKOUT-002', 'UC-CHECKOUT-013'],
  relatedEdgeCases: ['EC-CHECKOUT-007', 'EC-CHECKOUT-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Go to checkout with items in cart',
    detailedSteps: [
     '1. Add items to cart and go to checkout',
     '2. Wait for the page to fully load',
     '3. Make sure bill is calculated'
    ],
    whatYouShouldSee: 'Complete checkout page with all sections',
    expectedResult: 'Checkout page loads'
   },
   {
    step: 2,
    instruction: 'Select an online payment method',
    detailedSteps: [
     '1. Look at the payment methods section',
     '2. Scroll through the payment options horizontally',
     '3. Find a bank or card option (not "Cash")',
     '4. Tap on it to select it',
     '5. Make sure it shows as selected (highlighted border)'
    ],
    whatYouShouldSee: 'Online payment option highlighted. The card shows the bank/payment name.',
    expectedResult: 'Online payment method is selected'
   },
   {
    step: 3,
    instruction: 'Notice that Tips section appears',
    detailedSteps: [
     '1. With online payment selected, look for a "Tips" section',
     '2. It should show options like "$0", "$1", "$2", etc.',
     '3. This section only appears for online payments, not cash'
    ],
    whatYouShouldSee: 'A tips section with different tip amount buttons.',
    expectedResult: 'Tips section appears for online payment'
   },
   {
    step: 4,
    instruction: 'Send the order and watch for payment page',
    detailedSteps: [
     '1. Tap "Send Order" at the bottom',
     '2. Confirm in the popup',
     '3. Wait - instead of success screen, you should see a payment page',
     '4. This is usually a bank\'s website loaded in the app'
    ],
    whatYouShouldSee: 'A bank payment page appears (might show bank logo, card entry form, etc.)',
    expectedResult: 'Payment gateway page opens'
   },
   {
    step: 5,
    instruction: 'Complete or cancel the payment',
    detailedSteps: [
     '1. If this is a real test order, you can complete payment',
     '2. If testing, you might cancel and note that the page appeared',
     '3. Watch what happens after payment completes/fails'
    ],
    whatYouShouldSee: 'After successful payment: success screen. After failed/cancelled: error message.',
    expectedResult: 'Appropriate response based on payment outcome'
   }
  ],
  successChecklist: [
   '✓ Online payment methods are available',
   '✓ Selecting online payment shows Tips section',
   '✓ Confirming order opens payment gateway',
   '✓ Payment page loads correctly (not blank)',
   '✓ Success navigates appropriately',
   '✓ Failure shows error message'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No online payment methods shown',
     whatToDo: 'Check if this restaurant/region supports online payment. Try different restaurant. If none have it, mark as SKIP.'
    },
    {
     problem: 'Payment page never loads (blank screen)',
     whatToDo: 'Wait 15 seconds. Check internet. If still blank, mark as FAILED.'
    },
    {
     problem: 'Payment completes but stuck on payment page',
     whatToDo: 'Wait 30 seconds. The app should auto-detect payment. If not, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Online payment methods available for the restaurant',
   'Valid payment credentials (if testing real payment)'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Be careful with real payments - use test cards if available.'
 },
 {
  id: 'TC-CHECKOUT-004',
  title: 'Order Submission Handles Errors Gracefully',
  whatYoureTesting: 'Making sure the app doesn\'t crash if something goes wrong during order submission',
  whyItMatters: 'Network can fail anytime. Users should see helpful error messages, not crashes.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-002'],
  relatedEdgeCases: ['EC-CHECKOUT-007'],
  testSteps: [
   {
    step: 1,
    instruction: 'Prepare to simulate a network failure',
    detailedSteps: [
     '1. Go to checkout with items ready',
     '2. Fill out everything correctly',
     '3. Put your finger on the Send Order button but DON\'T tap yet',
     '4. Get ready to turn off WiFi/data immediately after tapping'
    ],
    whatYouShouldSee: 'Checkout page ready to submit',
    expectedResult: 'Ready to test error handling'
   },
   {
    step: 2,
    instruction: 'Tap Send Order and immediately turn off internet',
    detailedSteps: [
     '1. Tap the Send Order button',
     '2. Immediately swipe down for control center (or go to settings)',
     '3. Turn off WiFi AND mobile data',
     '4. Watch what happens in the app'
    ],
    whatYouShouldSee: 'App shows loading briefly, then an error message appears (not a crash)',
    expectedResult: 'Error message shown, app does not crash'
   },
   {
    step: 3,
    instruction: 'Verify you can recover',
    detailedSteps: [
     '1. Turn internet back on',
     '2. Make sure you\'re still on checkout page',
     '3. Your cart items should still be there',
     '4. Try tapping Send Order again'
    ],
    whatYouShouldSee: 'You can retry the order. Nothing was lost.',
    expectedResult: 'Order can be retried after error'
   }
  ],
  successChecklist: [
   '✓ App does not crash on network failure',
   '✓ Error message is shown (not blank screen)',
   '✓ Cart items are preserved',
   '✓ Order can be retried'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'App crashes',
     whatToDo: 'Note exactly when it crashed. Mark as BLOCKED.'
    },
    {
     problem: 'No error message - just stuck loading',
     whatToDo: 'Wait 30 seconds. If still stuck, force close app and check if order went through.'
    }
   ]
  },
  preconditions: [
   'Checkout page is ready',
   'You can quickly toggle internet off'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'This tests error handling - results may vary.'
 },

 // ============================================
 // PAYMENT METHOD TESTS (P1 - High)
 // ============================================
 {
  id: 'TC-CHECKOUT-005',
  title: 'Select Different Payment Methods',
  whatYoureTesting: 'Making sure all available payment methods can be selected and work correctly',
  whyItMatters: 'Customers need options for how to pay. All listed options should actually work.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-003'],
  relatedEdgeCases: ['EC-CHECKOUT-003', 'EC-CHECKOUT-017'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open checkout and find payment methods',
    detailedSteps: [
     '1. Go to checkout with items in cart',
     '2. Look for "Payment Method" section',
     '3. Count how many payment options are shown',
     '4. Note their names'
    ],
    whatYouShouldSee: 'A horizontal scrollable list of payment options like "Cash", bank names, or card icons.',
    expectedResult: 'Payment methods are visible'
   },
   {
    step: 2,
    instruction: 'Tap on each payment method one by one',
    detailedSteps: [
     '1. Start with Cash - tap it and see it highlights',
     '2. Then tap the next option - it should highlight instead',
     '3. Continue for all available options',
     '4. Watch the bill update as you switch'
    ],
    whatYouShouldSee: 'Each payment method highlights when tapped. The previously selected one unhighlights.',
    expectedResult: 'All payment methods are selectable'
   },
   {
    step: 3,
    instruction: 'Check if any payment methods are grayed out',
    detailedSteps: [
     '1. Look for any payment options that look faded or grayed',
     '2. Try tapping on a grayed option',
     '3. You should see a message explaining why it\'s unavailable'
    ],
    whatYouShouldSee: 'Inactive payment methods have lighter colors. Tapping shows explanation message.',
    expectedResult: 'Inactive methods show appropriate message'
   }
  ],
  successChecklist: [
   '✓ All payment methods are visible',
   '✓ Active methods can be selected',
   '✓ Selection is clearly indicated (border/highlight)',
   '✓ Only one can be selected at a time',
   '✓ Inactive methods explain why unavailable'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can\'t see any payment methods',
     whatToDo: 'Wait for page to load. If still missing after 10 seconds, mark as FAILED.'
    },
    {
     problem: 'Tapping does nothing',
     whatToDo: 'Make sure you\'re tapping directly on the payment card. If still nothing, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'You are on checkout page'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Test all payment methods shown, even if you won\'t use them all.'
 },
 {
  id: 'TC-CHECKOUT-006',
  title: 'Unavailable Payment Method Shows Message',
  whatYoureTesting: 'Making sure grayed-out payment methods explain why they can\'t be used',
  whyItMatters: 'Users need to understand why an option isn\'t available so they can take action.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-003'],
  relatedEdgeCases: ['EC-CHECKOUT-004'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a grayed-out payment method',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look at payment methods',
     '3. Find one that looks faded/grayed/disabled',
     '4. If all look active, this test may not apply'
    ],
    whatYouShouldSee: 'A payment method that looks lighter/faded compared to others',
    expectedResult: 'Found inactive payment method (or none exist)'
   },
   {
    step: 2,
    instruction: 'Tap on the inactive payment method',
    detailedSteps: [
     '1. Tap directly on the grayed-out option',
     '2. Watch for a popup or message',
     '3. Read what it says'
    ],
    whatYouShouldSee: 'A bottom sheet or popup explaining why this payment method is unavailable.',
    expectedResult: 'Explanation message appears'
   }
  ],
  successChecklist: [
   '✓ Inactive payment methods look different from active',
   '✓ Tapping inactive shows explanation',
   '✓ Message is understandable'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No inactive payment methods to test',
     whatToDo: 'Mark as SKIP - this depends on restaurant/region settings.'
    }
   ]
  },
  preconditions: [
   'Checkout has at least one inactive payment method'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'This test depends on having inactive payment methods available.'
 },

 // ============================================
 // VOUCHER TESTS (P1 - High)
 // ============================================
 {
  id: 'TC-CHECKOUT-007',
  title: 'Apply a Valid Voucher Code',
  whatYoureTesting: 'Making sure customers can enter a voucher code and get a discount',
  whyItMatters: 'Vouchers drive sales and customer loyalty. They must work correctly.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-004'],
  relatedEdgeCases: ['EC-CHECKOUT-005', 'EC-CHECKOUT-006'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find the voucher section on checkout',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look for a section that says "Voucher", "Promo Code", or "Discount"',
     '3. There should be a way to add or enter a code',
     '4. Tap on it to open voucher options'
    ],
    whatYouShouldSee: 'A voucher section with input field or list of available vouchers.',
    expectedResult: 'Voucher section is accessible'
   },
   {
    step: 2,
    instruction: 'Enter a voucher code',
    detailedSteps: [
     '1. Look for a text field to type a code',
     '2. Enter a valid voucher code (ask your team for a test code)',
     '3. Tap the "Apply" or "Add" button',
     '4. Wait for validation'
    ],
    whatYouShouldSee: 'Code is entered. After tapping apply, you see a success message or animation.',
    expectedResult: 'Voucher code is accepted'
   },
   {
    step: 3,
    instruction: 'Verify discount appears in bill',
    detailedSteps: [
     '1. Look at the bill breakdown',
     '2. There should be a "Discount" line now',
     '3. The net total should be reduced',
     '4. Check that the discount amount makes sense'
    ],
    whatYouShouldSee: 'Bill shows discount amount. Net total is lower than before applying voucher.',
    expectedResult: 'Discount is reflected in bill'
   }
  ],
  successChecklist: [
   '✓ Voucher section is accessible',
   '✓ Code can be entered',
   '✓ Valid code shows success message',
   '✓ Discount appears in bill breakdown',
   '✓ Net total is reduced'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No voucher section visible',
     whatToDo: 'Vouchers might be disabled for this restaurant. Try another restaurant.'
    },
    {
     problem: 'Code says invalid but it\'s correct',
     whatToDo: 'Check if code is expired or for different restaurant. Note exact error, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'You have a valid test voucher code',
   'Voucher is valid for the restaurant in your cart'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'You need a valid test voucher code to run this test.'
 },
 {
  id: 'TC-CHECKOUT-008',
  title: 'Invalid Voucher Code Shows Error',
  whatYoureTesting: 'Making sure invalid voucher codes show a helpful error message',
  whyItMatters: 'Users who mistype a code need to know what went wrong.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-004'],
  relatedEdgeCases: ['EC-CHECKOUT-005'],
  testSteps: [
   {
    step: 1,
    instruction: 'Open voucher entry and enter invalid code',
    detailedSteps: [
     '1. Go to the voucher section on checkout',
     '2. Type something random like "FAKECOODE123"',
     '3. Tap Apply',
     '4. Watch for error message'
    ],
    whatYouShouldSee: 'An error message explaining the code is invalid or not found.',
    expectedResult: 'Error message displayed'
   },
   {
    step: 2,
    instruction: 'Verify bill is unchanged',
    detailedSteps: [
     '1. Check the bill breakdown',
     '2. There should be no discount applied',
     '3. Net total should be the same as before',
     '4. You should be able to try another code'
    ],
    whatYouShouldSee: 'Bill shows no discount. You can still enter a different code.',
    expectedResult: 'Bill unchanged, can retry'
   }
  ],
  successChecklist: [
   '✓ Invalid code shows error message',
   '✓ Error message is clear (not technical jargon)',
   '✓ Bill is not affected',
   '✓ Can try different code'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No error shown - just nothing happens',
     whatToDo: 'Wait 5 seconds. If still no feedback, mark as FAILED.'
    },
    {
     problem: 'App crashes when entering invalid code',
     whatToDo: 'Mark as BLOCKED. Note the code you entered.'
    }
   ]
  },
  preconditions: [
   'Checkout page is open'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Use obviously fake codes like "TESTINVALID123".'
 },

 // ============================================
 // DELIVERY TIME TESTS (P1 - High)
 // ============================================
 {
  id: 'TC-CHECKOUT-009',
  title: 'Select ASAP Delivery Time',
  whatYoureTesting: 'Making sure customers can choose ASAP (as soon as possible) delivery',
  whyItMatters: 'Most customers want their food quickly. ASAP must be the default and work correctly.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-005'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Check delivery time options on checkout',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look for "Delivery Time" or "When do you want it?" section',
     '3. You should see two options: "ASAP" and "Scheduled"',
     '4. ASAP should be selected by default (highlighted)'
    ],
    whatYouShouldSee: 'Two buttons/options - ASAP is highlighted in the app\'s primary color.',
    expectedResult: 'ASAP is default and visible'
   },
   {
    step: 2,
    instruction: 'Tap ASAP to confirm selection',
    detailedSteps: [
     '1. If ASAP is already selected, tap it anyway',
     '2. It should remain highlighted',
     '3. No additional time picker should appear'
    ],
    whatYouShouldSee: 'ASAP stays selected. No time picker opens.',
    expectedResult: 'ASAP selection works'
   },
   {
    step: 3,
    instruction: 'Complete order with ASAP',
    detailedSteps: [
     '1. Keep ASAP selected',
     '2. Complete the checkout',
     '3. Your order should be for immediate delivery'
    ],
    whatYouShouldSee: 'Order is placed without scheduled time.',
    expectedResult: 'Order submitted with ASAP delivery'
   }
  ],
  successChecklist: [
   '✓ ASAP option is visible',
   '✓ ASAP is default selection',
   '✓ ASAP can be tapped/selected',
   '✓ Order can be placed with ASAP'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No delivery time options shown',
     whatToDo: 'The restaurant might not have these options. Try different restaurant.'
    }
   ]
  },
  preconditions: [
   'Checkout page is open'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'ASAP should be the default option.'
 },
 {
  id: 'TC-CHECKOUT-010',
  title: 'Schedule Order for Later',
  whatYoureTesting: 'Making sure customers can schedule delivery for a specific future time',
  whyItMatters: 'Customers may want to order ahead for a party or specific mealtime.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-005'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Find and tap Scheduled Order option',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look at delivery time options',
     '3. Tap "Scheduled Order" or "Schedule for Later"',
     '4. A time picker should appear'
    ],
    whatYouShouldSee: 'A new screen or popup opens with date/time selection.',
    expectedResult: 'Scheduled picker opens'
   },
   {
    step: 2,
    instruction: 'Select a date and time',
    detailedSteps: [
     '1. Choose a date (today or future)',
     '2. Select a time slot from available options',
     '3. Times should only show when restaurant is open',
     '4. Tap confirm or done'
    ],
    whatYouShouldSee: 'Calendar and time slots. Only valid times are selectable.',
    expectedResult: 'Date and time selected'
   },
   {
    step: 3,
    instruction: 'Verify scheduled time shows on checkout',
    detailedSteps: [
     '1. After selecting, you return to checkout',
     '2. The scheduled time should now be displayed',
     '3. It should show the date and time you chose'
    ],
    whatYouShouldSee: 'Below the delivery time options, you see your selected date and time.',
    expectedResult: 'Scheduled time is displayed'
   }
  ],
  successChecklist: [
   '✓ Scheduled option opens time picker',
   '✓ Only valid times are shown',
   '✓ Can select a future time',
   '✓ Selected time is displayed on checkout',
   '✓ Can change time by tapping again'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No scheduled option available',
     whatToDo: 'Restaurant might not support scheduling. Try different restaurant. Mark as SKIP if none support it.'
    },
    {
     problem: 'Time picker shows no available times',
     whatToDo: 'Try selecting a different date. Restaurant might be closed today.'
    }
   ]
  },
  preconditions: [
   'Restaurant supports scheduled orders'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Not all restaurants support scheduled orders.'
 },

 // ============================================
 // TIPS TESTS (P2 - Medium)
 // ============================================
 {
  id: 'TC-CHECKOUT-011',
  title: 'Add Driver Tip with Online Payment',
  whatYoureTesting: 'Making sure tips can be added for delivery drivers when paying online',
  whyItMatters: 'Customers want to tip drivers. Tips should only appear for online payments.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-006'],
  relatedEdgeCases: ['EC-CHECKOUT-015'],
  testSteps: [
   {
    step: 1,
    instruction: 'Select an online payment method',
    detailedSteps: [
     '1. Go to checkout',
     '2. Select any online payment method (not Cash)',
     '3. Look for a "Tips" section to appear',
     '4. It should show tip amount options'
    ],
    whatYouShouldSee: 'After selecting online payment, a Tips section appears with options like $0, $1, $2, etc.',
    expectedResult: 'Tips section appears'
   },
   {
    step: 2,
    instruction: 'Select a tip amount',
    detailedSteps: [
     '1. Look at the tip options',
     '2. Tap on a non-zero amount (like $1 or $2)',
     '3. The selected option should highlight',
     '4. Watch the total update'
    ],
    whatYouShouldSee: 'Selected tip highlights. Net total increases by the tip amount.',
    expectedResult: 'Tip is added to bill'
   },
   {
    step: 3,
    instruction: 'Switch to Cash and verify tips disappear',
    detailedSteps: [
     '1. Now select Cash payment',
     '2. The Tips section should disappear',
     '3. The total should decrease (no tip included)'
    ],
    whatYouShouldSee: 'Tips section is hidden. Total goes back to original amount without tip.',
    expectedResult: 'Tips hidden for cash payment'
   }
  ],
  successChecklist: [
   '✓ Tips only appear for online payments',
   '✓ Multiple tip amounts available',
   '✓ Selecting tip updates the total',
   '✓ Tips disappear when switching to cash'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No tips section even with online payment',
     whatToDo: 'Tips might be disabled for this region. Mark as SKIP if not available.'
    },
    {
     problem: 'Total doesn\'t change when adding tip',
     whatToDo: 'Wait for bill to recalculate. If still wrong, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Online payment methods available',
   'Order is for delivery (not pickup)'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Tips are only for delivery orders with online payment.'
 },

 // ============================================
 // GIFT ORDER TESTS (P2 - Medium)
 // ============================================
 {
  id: 'TC-CHECKOUT-012',
  title: 'Enable Gift Order and Fill Recipient Info',
  whatYoureTesting: 'Making sure customers can send food as a gift to someone else',
  whyItMatters: 'Gift orders let customers surprise friends/family. This is a special feature.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-007'],
  relatedEdgeCases: ['EC-CHECKOUT-009', 'EC-CHECKOUT-020'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find and enable the gift order toggle',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look for "Send as Gift" section with a toggle switch',
     '3. Tap the toggle to turn it ON',
     '4. The section should expand with more fields'
    ],
    whatYouShouldSee: 'A gift icon section with a toggle. When toggled on, fields for recipient name, phone appear.',
    expectedResult: 'Gift order form appears'
   },
   {
    step: 2,
    instruction: 'Enter recipient name and phone',
    detailedSteps: [
     '1. Tap on the "Recipient Name" field',
     '2. Type a name (like "Test Person")',
     '3. Tap on "Recipient Phone" field',
     '4. Type a phone number (like "0912345678")'
    ],
    whatYouShouldSee: 'Both fields accept text input. No validation errors yet.',
    expectedResult: 'Recipient info entered'
   },
   {
    step: 3,
    instruction: 'Try the contact picker (optional)',
    detailedSteps: [
     '1. Look for a contacts icon near the name field',
     '2. Tap it to open your phone contacts',
     '3. Select any contact',
     '4. Fields should auto-fill with contact info'
    ],
    whatYouShouldSee: 'Contact picker opens. Selecting a contact fills the name and phone fields.',
    expectedResult: 'Contact picker works (if available)'
   },
   {
    step: 4,
    instruction: 'Notice Cash is hidden for gift orders',
    detailedSteps: [
     '1. Look at payment methods',
     '2. "Cash" option should not be visible',
     '3. Only online payment methods should be shown'
    ],
    whatYouShouldSee: 'Cash payment option is hidden. Only bank/card options visible.',
    expectedResult: 'Cash hidden for gift orders'
   }
  ],
  successChecklist: [
   '✓ Gift toggle exists and works',
   '✓ Form fields appear when enabled',
   '✓ Name and phone fields accept input',
   '✓ Contact picker works (if available)',
   '✓ Cash payment is hidden'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No gift section visible',
     whatToDo: 'Gift orders might be disabled. Mark as SKIP if not available.'
    },
    {
     problem: 'Contact picker doesn\'t open',
     whatToDo: 'App might not have contacts permission. Grant permission and retry.'
    }
   ]
  },
  preconditions: [
   'Gift order feature is enabled'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Gift order availability depends on settings.'
 },
 {
  id: 'TC-CHECKOUT-013',
  title: 'Gift Order Validates Required Fields',
  whatYoureTesting: 'Making sure gift orders require recipient name and phone before submitting',
  whyItMatters: 'Without recipient info, the order can\'t be delivered correctly.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-007'],
  relatedEdgeCases: ['EC-CHECKOUT-009'],
  testSteps: [
   {
    step: 1,
    instruction: 'Enable gift order but leave fields empty',
    detailedSteps: [
     '1. Enable the gift order toggle',
     '2. DON\'T fill in the name or phone',
     '3. Try to tap "Send Order"'
    ],
    whatYouShouldSee: 'The app prevents submission and shows validation errors.',
    expectedResult: 'Validation errors appear'
   },
   {
    step: 2,
    instruction: 'Check validation error messages',
    detailedSteps: [
     '1. Look at the gift form fields',
     '2. There should be error messages under the empty fields',
     '3. The page might auto-scroll to the gift section',
     '4. Messages should say something like "Name required"'
    ],
    whatYouShouldSee: 'Red error text under empty fields explaining what\'s missing.',
    expectedResult: 'Clear error messages shown'
   },
   {
    step: 3,
    instruction: 'Fill in the fields and verify errors clear',
    detailedSteps: [
     '1. Enter a name in the name field',
     '2. The name error should disappear',
     '3. Enter a phone number',
     '4. The phone error should disappear'
    ],
    whatYouShouldSee: 'Error messages disappear as you fill in valid information.',
    expectedResult: 'Errors clear when fields filled'
   }
  ],
  successChecklist: [
   '✓ Empty fields prevent order submission',
   '✓ Error messages are shown for empty fields',
   '✓ Errors are clear about what\'s needed',
   '✓ Filling fields clears errors',
   '✓ Can submit after filling all fields'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can submit with empty gift fields',
     whatToDo: 'That\'s a bug - mark as FAILED. Validation is missing.'
    },
    {
     problem: 'No error messages shown',
     whatToDo: 'Mark as FAILED - users need to know what\'s wrong.'
    }
   ]
  },
  preconditions: [
   'Gift order feature is enabled'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Testing validation prevents incomplete gift orders.'
 },

 // ============================================
 // DELIVERY INSTRUCTION TESTS (P2 - Medium)
 // ============================================
 {
  id: 'TC-CHECKOUT-014',
  title: 'Add Delivery Instructions',
  whatYoureTesting: 'Making sure customers can add special instructions for the driver',
  whyItMatters: 'Delivery instructions help drivers find the address and follow customer preferences.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-008'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Find delivery instructions section',
    detailedSteps: [
     '1. Go to checkout (make sure it\'s a delivery order, not pickup)',
     '2. Look for "Delivery Instructions" or "Notes for Driver"',
     '3. Tap on it to open options'
    ],
    whatYouShouldSee: 'A section for delivery instructions with preset options or text field.',
    expectedResult: 'Delivery instructions section accessible'
   },
   {
    step: 2,
    instruction: 'Select or enter delivery notes',
    detailedSteps: [
     '1. If there are preset options (like "Leave at door", "Ring doorbell"), tap one',
     '2. If there\'s a text field, type something like "Please call when arriving"',
     '3. Save or confirm your selection'
    ],
    whatYouShouldSee: 'Your selection or text is saved. The section shows what you entered.',
    expectedResult: 'Instructions are saved'
   },
   {
    step: 3,
    instruction: 'Verify instructions show on checkout',
    detailedSteps: [
     '1. Look at the delivery instructions section',
     '2. Your selected/entered notes should be visible',
     '3. You should be able to edit if needed'
    ],
    whatYouShouldSee: 'Your delivery instructions are displayed on the checkout page.',
    expectedResult: 'Instructions visible on checkout'
   }
  ],
  successChecklist: [
   '✓ Delivery instructions section exists (for delivery orders)',
   '✓ Can select preset options or type custom note',
   '✓ Instructions are saved and displayed',
   '✓ Can edit instructions if needed'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No delivery instructions section',
     whatToDo: 'Make sure it\'s a delivery order, not pickup. If delivery and still missing, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Order is for delivery (not pickup)'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Only available for delivery orders.'
 },

 // ============================================
 // ADDRESS TESTS (P1 - High)
 // ============================================
 {
  id: 'TC-CHECKOUT-015',
  title: 'Change Delivery Address During Checkout',
  whatYoureTesting: 'Making sure customers can change their delivery address on the checkout page',
  whyItMatters: 'Customers might realize they selected the wrong address and need to change it.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-009'],
  relatedEdgeCases: ['EC-CHECKOUT-002'],
  testSteps: [
   {
    step: 1,
    instruction: 'View current address on checkout',
    detailedSteps: [
     '1. Go to checkout',
     '2. Find the "Delivery Address" section',
     '3. You should see your current/default address',
     '4. There should be a way to change it (tap the card or edit button)'
    ],
    whatYouShouldSee: 'Your delivery address is shown. Should be tappable or have edit option.',
    expectedResult: 'Current address is displayed'
   },
   {
    step: 2,
    instruction: 'Tap to change the address',
    detailedSteps: [
     '1. Tap on the address card or change button',
     '2. A list of your saved addresses should appear',
     '3. You might also see option to add new address'
    ],
    whatYouShouldSee: 'Bottom sheet or page with your saved addresses.',
    expectedResult: 'Address selection opens'
   },
   {
    step: 3,
    instruction: 'Select a different address',
    detailedSteps: [
     '1. Choose a different address from the list',
     '2. Tap to select it',
     '3. The bottom sheet should close',
     '4. Your new address should show on checkout'
    ],
    whatYouShouldSee: 'Address changes to the one you selected. Checkout shows new address.',
    expectedResult: 'New address is selected'
   },
   {
    step: 4,
    instruction: 'Verify bill recalculates',
    detailedSteps: [
     '1. After changing address, watch the bill section',
     '2. It might reload briefly',
     '3. Delivery fee might change based on new address',
     '4. Total should update accordingly'
    ],
    whatYouShouldSee: 'Bill recalculates. Delivery fee may be different for new address.',
    expectedResult: 'Bill updates with new delivery fee'
   }
  ],
  successChecklist: [
   '✓ Current address is shown',
   '✓ Can tap to change address',
   '✓ Address list appears with options',
   '✓ Selecting new address updates checkout',
   '✓ Bill recalculates with new delivery fee'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can\'t tap to change address',
     whatToDo: 'Look for an edit icon or try tapping different parts of the address card.'
    },
    {
     problem: 'Only one address available',
     whatToDo: 'Add another address first in your profile, then test.'
    },
    {
     problem: 'Bill doesn\'t update after address change',
     whatToDo: 'Wait 5-10 seconds. If still same, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'You have multiple saved addresses',
   'Order is for delivery'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Need at least 2 addresses to test changing.'
 },
 {
  id: 'TC-CHECKOUT-016',
  title: 'Checkout Without Address Shows Prompt',
  whatYoureTesting: 'Making sure checkout prompts user to add address if none selected',
  whyItMatters: 'Users who haven\'t added an address need to be guided to add one.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-009'],
  relatedEdgeCases: ['EC-CHECKOUT-002'],
  testSteps: [
   {
    step: 1,
    instruction: 'Go to checkout without a saved address',
    detailedSteps: [
     '1. If you have addresses, delete them in your profile first',
     '2. Add items to cart and go to checkout',
     '3. Watch what happens'
    ],
    whatYouShouldSee: 'A message or prompt asking you to add a delivery address.',
    expectedResult: 'Add address prompt appears'
   },
   {
    step: 2,
    instruction: 'Try to send order without address',
    detailedSteps: [
     '1. Without adding address, try to tap Send Order',
     '2. The button might be disabled (gray)',
     '3. Or if you can tap it, an error message should appear'
    ],
    whatYouShouldSee: 'Either button is disabled, or error message says address is required.',
    expectedResult: 'Cannot submit without address'
   }
  ],
  successChecklist: [
   '✓ Checkout indicates address is needed',
   '✓ Cannot submit order without address',
   '✓ Clear guidance on how to add address'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can submit order without address',
     whatToDo: 'That\'s a serious bug - mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'No delivery address saved'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'May need to delete addresses to test this scenario.'
 },

 // ============================================
 // DELIVERY FEE TESTS (P2 - Medium)
 // ============================================
 {
  id: 'TC-CHECKOUT-017',
  title: 'Select Delivery Fee Option',
  whatYoureTesting: 'Making sure customers can choose between different delivery fee options',
  whyItMatters: 'Some areas offer standard vs express delivery at different prices.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-010'],
  relatedEdgeCases: ['EC-CHECKOUT-019'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find delivery fee options on checkout',
    detailedSteps: [
     '1. Go to checkout',
     '2. Look for a "Delivery Fee" section with selectable options',
     '3. This might show Standard and Priority/Express options',
     '4. If no options shown, this feature might be disabled'
    ],
    whatYouShouldSee: 'Multiple delivery fee options with different prices and times.',
    expectedResult: 'Delivery fee options visible (if available)'
   },
   {
    step: 2,
    instruction: 'Select a different delivery fee option',
    detailedSteps: [
     '1. Tap on a different option than default',
     '2. It should become selected (highlighted)',
     '3. Watch the total update'
    ],
    whatYouShouldSee: 'Selected option highlights. Bill updates with new delivery fee.',
    expectedResult: 'Delivery fee option changed'
   },
   {
    step: 3,
    instruction: 'Verify bill reflects new fee',
    detailedSteps: [
     '1. Look at the delivery fee in bill breakdown',
     '2. It should match your selected option',
     '3. Total should have adjusted accordingly'
    ],
    whatYouShouldSee: 'Bill shows the delivery fee from your selected option.',
    expectedResult: 'Bill updated correctly'
   }
  ],
  successChecklist: [
   '✓ Delivery fee options are visible (if enabled)',
   '✓ Options can be selected',
   '✓ Bill updates when option changes',
   '✓ Total reflects correct delivery fee'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No delivery fee options shown',
     whatToDo: 'This feature might be disabled in your area. Mark as SKIP.'
    }
   ]
  },
  preconditions: [
   'Delivery fee options feature is enabled',
   'Restaurant/area supports multiple fee options'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Availability depends on region/restaurant settings.'
 },

 // ============================================
 // WARNING/CONFIRMATION TESTS (P2 - Medium)
 // ============================================
 {
  id: 'TC-CHECKOUT-018',
  title: 'Multiple Active Orders Warning',
  whatYoureTesting: 'Making sure users with active orders see a warning before placing another',
  whyItMatters: 'Prevents accidental duplicate orders. Users should be aware they have pending orders.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-011'],
  relatedEdgeCases: ['EC-CHECKOUT-011'],
  testSteps: [
   {
    step: 1,
    instruction: 'Place an order first',
    detailedSteps: [
     '1. Complete a normal order',
     '2. Make sure it\'s still active (not delivered)',
     '3. Now add new items to cart and go to checkout again'
    ],
    whatYouShouldSee: 'You\'re on checkout for a new order while having an active order.',
    expectedResult: 'Ready to test with active order'
   },
   {
    step: 2,
    instruction: 'Try to submit new order',
    detailedSteps: [
     '1. Fill out checkout normally',
     '2. Tap Send Order',
     '3. A warning popup should appear mentioning active orders'
    ],
    whatYouShouldSee: 'A bottom sheet or popup warning about existing active orders.',
    expectedResult: 'Warning about active orders appears'
   },
   {
    step: 3,
    instruction: 'Wait or confirm to proceed',
    detailedSteps: [
     '1. The warning might have a countdown timer',
     '2. Wait for timer to complete',
     '3. Then you can tap Confirm to proceed',
     '4. Or tap Cancel to not place the order'
    ],
    whatYouShouldSee: 'Timer counts down. After timer, you can confirm or cancel.',
    expectedResult: 'Can confirm after acknowledgment'
   }
  ],
  successChecklist: [
   '✓ Warning appears when user has active orders',
   '✓ Warning explains the situation',
   '✓ Timer prevents accidental confirmation',
   '✓ Can still proceed after timer',
   '✓ Can cancel if desired'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No warning even with active order',
     whatToDo: 'Confirm you really have an active order. If yes and no warning, mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'You have an active (pending/processing) order',
   'You\'re trying to place a new order'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Need an active order to test this.'
 },
 {
  id: 'TC-CHECKOUT-019',
  title: 'Order Summary Shows Correct Details',
  whatYoureTesting: 'Making sure the order summary popup shows accurate order information',
  whyItMatters: 'Users need to verify their order before confirming. Wrong info leads to wrong orders.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-012'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Get to order confirmation popup',
    detailedSteps: [
     '1. Fill out checkout completely',
     '2. Tap Send Order',
     '3. The order summary popup should appear'
    ],
    whatYouShouldSee: 'A bottom sheet showing your order summary.',
    expectedResult: 'Order summary popup appears'
   },
   {
    step: 2,
    instruction: 'Verify restaurant name is correct',
    detailedSteps: [
     '1. Look for the restaurant name in the summary',
     '2. It should match the restaurant you ordered from'
    ],
    whatYouShouldSee: 'Correct restaurant name displayed.',
    expectedResult: 'Restaurant name matches'
   },
   {
    step: 3,
    instruction: 'Verify items are listed correctly',
    detailedSteps: [
     '1. Look at the list of items',
     '2. Check that all your cart items are there',
     '3. Quantities should be correct',
     '4. Item photos should match'
    ],
    whatYouShouldSee: 'All your cart items with photos, names, quantities.',
    expectedResult: 'Items list is accurate'
   },
   {
    step: 4,
    instruction: 'Verify delivery address and payment',
    detailedSteps: [
     '1. Check the delivery address shown',
     '2. Check the payment method shown',
     '3. Check the total amount',
     '4. Everything should match what you selected'
    ],
    whatYouShouldSee: 'Correct delivery address, payment method, and total.',
    expectedResult: 'All details are accurate'
   }
  ],
  successChecklist: [
   '✓ Restaurant name is correct',
   '✓ All items are listed',
   '✓ Quantities are accurate',
   '✓ Delivery address matches selection',
   '✓ Payment method matches selection',
   '✓ Total matches bill calculation'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Wrong items or quantities shown',
     whatToDo: 'Take screenshot comparing summary to cart. Mark as FAILED.'
    },
    {
     problem: 'Wrong address or payment shown',
     whatToDo: 'Take screenshot. Mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Checkout is filled out correctly'
  ],
  automatable: true,
  status: 'Not Started',
  notes: 'Compare summary to actual cart and selections.'
 },

 // ============================================
 // ONLINE PAYMENT TESTS (P0 - Critical)
 // ============================================
 {
  id: 'TC-CHECKOUT-020',
  title: 'Online Payment Gateway Loads',
  whatYoureTesting: 'Making sure the bank payment page opens correctly after confirming order',
  whyItMatters: 'If payment page doesn\'t load, customers can\'t complete online payments.',
  estimatedTime: '3-4 minutes',
  type: 'Integration',
  priority: 'P0',
  relatedUseCases: ['UC-CHECKOUT-013'],
  relatedEdgeCases: ['EC-CHECKOUT-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Submit order with online payment',
    detailedSteps: [
     '1. Go to checkout and select online payment',
     '2. Complete all fields',
     '3. Tap Send Order and confirm',
     '4. Wait for the payment page to appear'
    ],
    whatYouShouldSee: 'After confirmation, a payment gateway page opens (might take 2-5 seconds).',
    expectedResult: 'Payment page opens'
   },
   {
    step: 2,
    instruction: 'Verify payment page loaded correctly',
    detailedSteps: [
     '1. Check that the page is not blank',
     '2. You should see bank branding or payment form',
     '3. There might be card entry fields or bank options'
    ],
    whatYouShouldSee: 'A proper payment page with bank logo and payment options.',
    expectedResult: 'Payment page is functional'
   },
   {
    step: 3,
    instruction: 'Note the order amount shown',
    detailedSteps: [
     '1. Look for the amount displayed on payment page',
     '2. It should match your order total',
     '3. If different, there\'s a problem'
    ],
    whatYouShouldSee: 'Payment amount matches your order total.',
    expectedResult: 'Amount is correct'
   }
  ],
  successChecklist: [
   '✓ Payment page opens after confirmation',
   '✓ Page is not blank (bank content loads)',
   '✓ Payment amount is correct',
   '✓ Can interact with payment form'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Blank payment page',
     whatToDo: 'Wait 15 seconds. If still blank, check internet. Mark as FAILED.'
    },
    {
     problem: 'Wrong amount on payment page',
     whatToDo: 'Take screenshot. This is critical - mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Online payment selected',
   'Order confirmed'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Don\'t actually pay unless testing real transactions.'
 },
 {
  id: 'TC-CHECKOUT-021',
  title: 'Handle Payment Failure',
  whatYoureTesting: 'Making sure payment failures are handled gracefully',
  whyItMatters: 'Payments can fail for many reasons. Users need clear info about what happened.',
  estimatedTime: '3-4 minutes',
  type: 'Functional',
  priority: 'P1',
  relatedUseCases: ['UC-CHECKOUT-013'],
  relatedEdgeCases: ['EC-CHECKOUT-008'],
  testSteps: [
   {
    step: 1,
    instruction: 'Reach payment page and cancel/fail payment',
    detailedSteps: [
     '1. Submit order with online payment',
     '2. When payment page opens, look for Cancel or Back',
     '3. Cancel the payment or let it timeout',
     '4. Return to the app'
    ],
    whatYouShouldSee: 'After canceling, you should return to the app.',
    expectedResult: 'Returned to app after cancellation'
   },
   {
    step: 2,
    instruction: 'Check what happens in the app',
    detailedSteps: [
     '1. Look for error message or notification',
     '2. Your cart should still have items',
     '3. You should be able to try again'
    ],
    whatYouShouldSee: 'Error message about payment failure. Cart preserved.',
    expectedResult: 'Error shown, cart preserved'
   },
   {
    step: 3,
    instruction: 'Verify you can retry',
    detailedSteps: [
     '1. Dismiss any error messages',
     '2. Try tapping Send Order again',
     '3. You should be able to attempt payment again'
    ],
    whatYouShouldSee: 'Can initiate another payment attempt.',
    expectedResult: 'Can retry payment'
   }
  ],
  successChecklist: [
   '✓ Payment failure shows error message',
   '✓ Cart is NOT cleared on failure',
   '✓ Can retry the order',
   '✓ App doesn\'t crash'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Cart is cleared after failed payment',
     whatToDo: 'That\'s a bug - user loses their cart. Mark as FAILED.'
    },
    {
     problem: 'No error message - just returns silently',
     whatToDo: 'Users need feedback. Mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Payment page is open'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Test by canceling payment, not by using invalid cards.'
 },

 // ============================================
 // MISCELLANEOUS TESTS (P2-P3)
 // ============================================
 {
  id: 'TC-CHECKOUT-022',
  title: 'Dynamic Rewards Shows on Checkout',
  whatYoureTesting: 'Making sure loyalty rewards progress is visible during checkout',
  whyItMatters: 'Rewards encourage larger orders. Users should see how close they are to rewards.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: ['UC-CHECKOUT-014'],
  relatedEdgeCases: [],
  testSteps: [
   {
    step: 1,
    instruction: 'Go to checkout and look for rewards section',
    detailedSteps: [
     '1. Go to checkout',
     '2. Scroll through the page',
     '3. Look for a rewards progress section',
     '4. It might show "X left to earn Y"'
    ],
    whatYouShouldSee: 'A rewards element showing progress toward next reward tier.',
    expectedResult: 'Rewards section visible (if enabled)'
   }
  ],
  successChecklist: [
   '✓ Rewards section appears (if feature enabled)',
   '✓ Progress is clear and readable',
   '✓ Amount needed is shown'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No rewards section',
     whatToDo: 'Rewards might be disabled. Mark as SKIP.'
    }
   ]
  },
  preconditions: [
   'Dynamic rewards feature enabled'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Feature availability depends on configuration.'
 },
 {
  id: 'TC-CHECKOUT-023',
  title: 'Far Address Warning Appears',
  whatYoureTesting: 'Making sure users are warned if their delivery address is far from their location',
  whyItMatters: 'Prevents users from accidentally ordering to wrong address with high delivery fee.',
  estimatedTime: '3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: ['UC-CHECKOUT-015'],
  relatedEdgeCases: ['EC-CHECKOUT-013'],
  testSteps: [
   {
    step: 1,
    instruction: 'Set delivery address far from current location',
    detailedSteps: [
     '1. Make sure your physical location is different from delivery address',
     '2. This might require being away from home',
     '3. Or set a delivery address in a different area'
    ],
    whatYouShouldSee: 'Your delivery address is in a different area than you are.',
    expectedResult: 'Setup for far address test'
   },
   {
    step: 2,
    instruction: 'Try to submit order',
    detailedSteps: [
     '1. Complete checkout',
     '2. Tap Send Order',
     '3. Watch for a warning about the address distance'
    ],
    whatYouShouldSee: 'A popup warning that the address is far from current location.',
    expectedResult: 'Far address warning appears'
   },
   {
    step: 3,
    instruction: 'Choose to change or continue',
    detailedSteps: [
     '1. Read the warning carefully',
     '2. You should see options to change address or continue',
     '3. The delivery fee should be shown'
    ],
    whatYouShouldSee: 'Options to change address or proceed anyway, with delivery fee shown.',
    expectedResult: 'User can make informed choice'
   }
  ],
  successChecklist: [
   '✓ Warning appears for far addresses',
   '✓ Address and delivery fee shown in warning',
   '✓ Can choose to change or continue',
   '✓ Warning is clear and helpful'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No warning even though address is far',
     whatToDo: 'The threshold might be configured high. This may be acceptable behavior.'
    }
   ]
  },
  preconditions: [
   'Delivery address is far from current location'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Requires being physically away from delivery address.'
 },
 {
  id: 'TC-CHECKOUT-024',
  title: 'Location Services Required Message',
  whatYoureTesting: 'Making sure users without location services enabled get appropriate message',
  whyItMatters: 'App needs location for accurate delivery. Users should be prompted to enable it.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: [],
  relatedEdgeCases: ['EC-CHECKOUT-010'],
  testSteps: [
   {
    step: 1,
    instruction: 'Disable location services',
    detailedSteps: [
     '1. Go to device settings',
     '2. Turn off Location Services for the app',
     '3. Return to the app checkout'
    ],
    whatYouShouldSee: 'Location services are disabled for the app.',
    expectedResult: 'Location disabled'
   },
   {
    step: 2,
    instruction: 'Try to submit order',
    detailedSteps: [
     '1. Complete checkout',
     '2. Tap Send Order',
     '3. Watch for location-related message'
    ],
    whatYouShouldSee: 'A message asking to enable location services.',
    expectedResult: 'Location required message appears'
   }
  ],
  successChecklist: [
   '✓ App detects location is disabled',
   '✓ Clear message about enabling location',
   '✓ User understands what to do'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Order goes through without location',
     whatToDo: 'App might use saved address location. This could be acceptable.'
    }
   ]
  },
  preconditions: [
   'Location services can be disabled'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Remember to re-enable location after test.'
 },
 {
  id: 'TC-CHECKOUT-025',
  title: 'Cannot Leave During Order Submission',
  whatYoureTesting: 'Making sure users can\'t accidentally leave while order is being submitted',
  whyItMatters: 'Leaving during submission could result in duplicate orders or lost orders.',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P2',
  relatedUseCases: [],
  relatedEdgeCases: ['EC-CHECKOUT-012'],
  testSteps: [
   {
    step: 1,
    instruction: 'Start order submission',
    detailedSteps: [
     '1. Fill out checkout completely',
     '2. Tap Send Order and confirm',
     '3. While the loading spinner is showing (order being sent)...'
    ],
    whatYouShouldSee: 'Loading indicator while order is being created.',
    expectedResult: 'Order submission in progress'
   },
   {
    step: 2,
    instruction: 'Try to press back button',
    detailedSteps: [
     '1. While order is loading, press the back button',
     '2. The app should prevent you from leaving',
     '3. A message should appear'
    ],
    whatYouShouldSee: 'Message saying you can\'t leave while order is being submitted.',
    expectedResult: 'Going to blocked with message'
   }
  ],
  successChecklist: [
   '✓ Back button is blocked during submission',
   '✓ Clear message explains why',
   '✓ User stays on checkout until complete'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can navigate away during submission',
     whatToDo: 'This could cause issues. Mark as FAILED.'
    }
   ]
  },
  preconditions: [
   'Order is being submitted'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Timing is tricky - submission happens fast.'
 },
 {
  id: 'TC-CHECKOUT-026',
  title: 'Bill Warning Message Display',
  whatYoureTesting: 'Making sure special warnings from the server are shown to users',
  whyItMatters: 'Server might send important messages about delays, restrictions, etc.',
  estimatedTime: '2 minutes',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: [],
  relatedEdgeCases: ['EC-CHECKOUT-014'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find a scenario with warning message',
    detailedSteps: [
     '1. This depends on server configuration',
     '2. Some orders might trigger warnings',
     '3. Check if any warning appears before confirmation'
    ],
    whatYouShouldSee: 'If configured, a warning message appears before order confirmation.',
    expectedResult: 'Warning shown (if applicable)'
   },
   {
    step: 2,
    instruction: 'Acknowledge warning to proceed',
    detailedSteps: [
     '1. Read the warning message',
     '2. Tap Confirm to acknowledge',
     '3. Order should proceed to confirmation'
    ],
    whatYouShouldSee: 'Can proceed after acknowledging warning.',
    expectedResult: 'Can continue after acknowledgment'
   }
  ],
  successChecklist: [
   '✓ Warning displayed when applicable',
   '✓ Can acknowledge and proceed',
   '✓ Can cancel if desired'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'No warnings to test',
     whatToDo: 'This depends on server config. Mark as SKIP if no warnings trigger.'
    }
   ]
  },
  preconditions: [
   'Bill has warning message from server'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Warning messages depend on server configuration.'
 },
 {
  id: 'TC-CHECKOUT-027',
  title: 'Forced Gift Order Mode',
  whatYoureTesting: 'Making sure orders outside delivery area force gift order mode',
  whyItMatters: 'Some orders can only be completed as gifts (e.g., international orders).',
  estimatedTime: '2-3 minutes',
  type: 'Functional',
  priority: 'P3',
  relatedUseCases: ['UC-CHECKOUT-007'],
  relatedEdgeCases: ['EC-CHECKOUT-016'],
  testSteps: [
   {
    step: 1,
    instruction: 'Find scenario where gift is forced',
    detailedSteps: [
     '1. This might require ordering to specific areas',
     '2. Look for "Just Gifting" scenario',
     '3. The gift toggle might be auto-enabled and locked'
    ],
    whatYouShouldSee: 'Gift order is enabled and cannot be disabled. Warning message shown.',
    expectedResult: 'Gift mode is forced (if applicable)'
   },
   {
    step: 2,
    instruction: 'Verify cannot disable gift mode',
    detailedSteps: [
     '1. Try tapping the gift toggle to disable',
     '2. It should remain on',
     '3. A message explains why'
    ],
    whatYouShouldSee: 'Toggle doesn\'t change. Explanation shown about why gift is required.',
    expectedResult: 'Cannot disable when forced'
   }
  ],
  successChecklist: [
   '✓ Gift mode auto-enabled for applicable orders',
   '✓ Cannot be disabled',
   '✓ Clear explanation provided'
  ],
  ifThisFails: {
   commonIssues: [
    {
     problem: 'Can disable gift mode when shouldn\'t',
     whatToDo: 'Mark as FAILED if this causes order issues.'
    }
   ]
  },
  preconditions: [
   'Order triggers justGifting mode'
  ],
  automatable: false,
  status: 'Not Started',
  notes: 'Specific scenarios trigger this - may be rare.'
 }
];





