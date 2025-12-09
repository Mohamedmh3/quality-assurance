import type { UseCase } from '@/lib/types';

export const checkoutUseCases: UseCase[] = [
  {
    id: 'UC-CHECKOUT-001',
    title: 'Calculate Order Bill',
    priority: 'Critical',
    userType: 'End User',
    description: 'When customer opens checkout, the app calculates the total bill including subtotal, delivery fee, tax, tips, discounts, and net total based on the cart items and selected options.',
    preconditions: [
      'User has items in cart',
      'User has selected a delivery address',
      'User is on checkout page'
    ],
    steps: [
      {
        step: 1,
        action: 'App calls calcBill() method with cart data and user selections',
        expectedResult: 'API request is made to calculate the order total',
        uiState: 'Bill section shows loading shimmer',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:838-937'
      },
      {
        step: 2,
        action: 'App checks if user has a valid address selected',
        expectedResult: 'If no address, shows popup asking user to add address',
        uiState: 'Dialog appears if address missing',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:840-852'
      },
      {
        step: 3,
        action: 'App sends bill calculation request with all parameters',
        expectedResult: 'Server returns calculated bill with all components',
        uiState: 'Loading indicator shown during API call',
        flutterFile: 'checkout/service/checkout_service.dart:31-105'
      },
      {
        step: 4,
        action: 'App processes and displays bill breakdown',
        expectedResult: 'Bill shows subtotal, delivery, tax, discount, net total',
        uiState: 'OrderPriceWidget displays all bill components',
        flutterFile: 'checkout/widget/bill_details/order_price_widget.dart:33-96'
      },
      {
        step: 5,
        action: 'If bill calculation fails, app shows error with retry option',
        expectedResult: 'Error message displayed, user can tap retry',
        uiState: 'Error banner with retry button shown',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:549-606'
      }
    ],
    postconditions: [
      'Bill is calculated and displayed',
      'User can see breakdown of all charges',
      'Send Order button becomes enabled'
    ],
    successCriteria: [
      'Bill loads within 3 seconds',
      'All price components are visible',
      'Net total is accurate',
      'Error handling works if API fails'
    ],
    relatedTestCases: ['TC-CHECKOUT-001', 'TC-CHECKOUT-002']
  },
  {
    id: 'UC-CHECKOUT-002',
    title: 'Create and Submit Order',
    priority: 'Critical',
    userType: 'End User',
    description: 'When customer confirms their order, the app creates the order in the system. This includes cash and online payment options.',
    preconditions: [
      'Bill is calculated successfully',
      'User has selected payment method',
      'User has valid delivery address',
      'Cart has items'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps Send Order button',
        expectedResult: 'Order confirmation validation begins',
        uiState: 'Button shows loading state',
        flutterFile: 'checkout/view/checkout_view.dart:341-459'
      },
      {
        step: 2,
        action: 'App validates gift order form if enabled',
        expectedResult: 'If gift order invalid, scrolls to form and shows errors',
        uiState: 'Form validation errors displayed',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:656-674'
      },
      {
        step: 3,
        action: 'App shows order summary confirmation bottom sheet',
        expectedResult: 'User sees order details before confirming',
        uiState: 'OrderSummaryBottomSheet displayed',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1328-1390'
      },
      {
        step: 4,
        action: 'App calls createOrder() with all order data',
        expectedResult: 'Order is created on server',
        uiState: 'Full screen loading overlay',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1048-1122'
      },
      {
        step: 5,
        action: 'For cash: Navigate to success screen. For online: Open payment gateway',
        expectedResult: 'Appropriate flow based on payment method',
        uiState: 'Success screen or EpaymentView',
        flutterFile: 'checkout/view/checkout_view.dart:470-533'
      }
    ],
    postconditions: [
      'Order is created in the system',
      'Cart is cleared',
      'User navigates to order tracking or payment'
    ],
    successCriteria: [
      'Order is submitted successfully',
      'Correct navigation based on payment type',
      'Cart is cleared after success',
      'User can track the order'
    ],
    relatedTestCases: ['TC-CHECKOUT-003', 'TC-CHECKOUT-004']
  },
  {
    id: 'UC-CHECKOUT-003',
    title: 'Select Payment Method',
    priority: 'High',
    userType: 'End User',
    description: 'Customer can choose from available payment methods including cash on delivery and various online payment options.',
    preconditions: [
      'User is on checkout page',
      'Payment methods have been fetched'
    ],
    steps: [
      {
        step: 1,
        action: 'App fetches available payment methods on checkout load',
        expectedResult: 'Payment methods list is populated',
        uiState: 'Payment methods shown as horizontal scrollable cards',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1167-1196'
      },
      {
        step: 2,
        action: 'User taps on a payment method card',
        expectedResult: 'Payment method is selected',
        uiState: 'Selected card shows highlighted border',
        flutterFile: 'checkout/widget/payments_widget/payment_method_selector_widget.dart:144-161'
      },
      {
        step: 3,
        action: 'App calls changeSelectedPayment() with selected method',
        expectedResult: 'Payment method is updated, bill recalculated, tips fetched',
        uiState: 'Bill updates with any payment-specific fees',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:700-709'
      },
      {
        step: 4,
        action: 'If inactive payment method tapped, show message',
        expectedResult: 'Bottom sheet explains unavailability',
        uiState: 'Message dialog displayed',
        flutterFile: 'checkout/widget/payments_widget/payment_method_selector_widget.dart:149-157'
      }
    ],
    postconditions: [
      'Payment method is selected',
      'Bill reflects payment method choice',
      'Tips options update based on payment type'
    ],
    successCriteria: [
      'All active payment methods are selectable',
      'Inactive methods show appropriate message',
      'Selection persists during checkout',
      'Bill recalculates on change'
    ],
    relatedTestCases: ['TC-CHECKOUT-005', 'TC-CHECKOUT-006']
  },
  {
    id: 'UC-CHECKOUT-004',
    title: 'Apply Voucher Code',
    priority: 'High',
    userType: 'End User',
    description: 'Customer can apply a voucher/promo code to get a discount on their order. The app validates the code and updates the bill.',
    preconditions: [
      'User is on checkout page',
      'User has a valid voucher code or selects from available vouchers'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on voucher section',
        expectedResult: 'Voucher bottom sheet opens',
        uiState: 'VoucherBottomSheet displayed with available vouchers',
        flutterFile: 'checkout/widget/voucher_apply/voucher_bottom_sheet.dart:20-155'
      },
      {
        step: 2,
        action: 'User enters voucher code or selects from list',
        expectedResult: 'Voucher code is captured',
        uiState: 'Input field shows code or voucher card highlighted',
        flutterFile: 'checkout/widget/voucher_apply/show_add_voucher_dialog_body.dart'
      },
      {
        step: 3,
        action: 'App calls validateVoucher() or validateCodeVoucher()',
        expectedResult: 'Server validates voucher for restaurant and order amount',
        uiState: 'Loading indicator shown',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:939-1007'
      },
      {
        step: 4,
        action: 'If valid, voucher applied and bill recalculated',
        expectedResult: 'Discount shown in bill, confetti animation plays',
        uiState: 'Voucher card shows applied, discount in bill',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:954-963'
      },
      {
        step: 5,
        action: 'If invalid, show error message',
        expectedResult: 'Error message explains why voucher failed',
        uiState: 'Error text displayed',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1001-1003'
      }
    ],
    postconditions: [
      'Valid voucher is applied',
      'Bill shows discount amount',
      'Net total is reduced'
    ],
    successCriteria: [
      'Valid vouchers apply successfully',
      'Invalid vouchers show clear error',
      'Discount is reflected in bill',
      'Voucher persists during checkout'
    ],
    relatedTestCases: ['TC-CHECKOUT-007', 'TC-CHECKOUT-008']
  },
  {
    id: 'UC-CHECKOUT-005',
    title: 'Select Delivery Time',
    priority: 'High',
    userType: 'End User',
    description: 'Customer can choose between ASAP delivery or schedule the order for a specific time.',
    preconditions: [
      'User is on checkout page',
      'Restaurant supports scheduled orders (if choosing scheduled)'
    ],
    steps: [
      {
        step: 1,
        action: 'User sees delivery time options (ASAP and Scheduled)',
        expectedResult: 'Two delivery time options displayed',
        uiState: 'ASAP selected by default, both options visible',
        flutterFile: 'checkout/widget/delivery_time_widgets/delivery_time_widget.dart:23-137'
      },
      {
        step: 2,
        action: 'User taps ASAP option',
        expectedResult: 'ASAP delivery is selected',
        uiState: 'ASAP button highlighted',
        flutterFile: 'checkout/widget/delivery_time_widgets/delivery_time_widget.dart:44-49'
      },
      {
        step: 3,
        action: 'User taps Scheduled Order option',
        expectedResult: 'Scheduled order picker screen opens',
        uiState: 'ScheduledOrderPicker page displayed',
        flutterFile: 'checkout/widget/delivery_time_widgets/delivery_time_widget.dart:56-70'
      },
      {
        step: 4,
        action: 'User selects date and time',
        expectedResult: 'Scheduled time is saved',
        uiState: 'Selected time shown below delivery options',
        flutterFile: 'checkout/widget/delivery_time_widgets/delivery_time_widget.dart:77-129'
      }
    ],
    postconditions: [
      'Delivery time preference is saved',
      'Order will be delivered at selected time'
    ],
    successCriteria: [
      'Both ASAP and Scheduled options work',
      'Scheduled time picker shows valid times only',
      'Selected time is clearly displayed',
      'Time persists through checkout'
    ],
    relatedTestCases: ['TC-CHECKOUT-009', 'TC-CHECKOUT-010']
  },
  {
    id: 'UC-CHECKOUT-006',
    title: 'Add Driver Tip',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer can add a tip for the delivery driver. Tips are only available for online payment methods.',
    preconditions: [
      'User is on checkout page',
      'Online payment method is selected',
      'Not a pickup order'
    ],
    steps: [
      {
        step: 1,
        action: 'Tips section appears when online payment selected',
        expectedResult: 'Tips options are displayed',
        uiState: 'TipsSelectorWidget shown',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:210-217'
      },
      {
        step: 2,
        action: 'App fetches available tip amounts',
        expectedResult: 'Tip options populated',
        uiState: 'Multiple tip amount buttons shown',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1125-1133'
      },
      {
        step: 3,
        action: 'User taps on a tip amount',
        expectedResult: 'Tip is selected and bill recalculates',
        uiState: 'Selected tip highlighted, bill updates',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:717-720'
      }
    ],
    postconditions: [
      'Tip amount is added to order',
      'Bill reflects tip amount',
      'Driver will receive the tip'
    ],
    successCriteria: [
      'Tips show only for online payments',
      'Selecting tip updates the bill',
      'Tip amount is included in order'
    ],
    relatedTestCases: ['TC-CHECKOUT-011']
  },
  {
    id: 'UC-CHECKOUT-007',
    title: 'Enable Gift Order',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer can send the order as a gift to another person by providing recipient details.',
    preconditions: [
      'User is on checkout page',
      'Gift order feature is enabled in settings'
    ],
    steps: [
      {
        step: 1,
        action: 'User sees gift order toggle',
        expectedResult: 'Gift toggle is visible',
        uiState: 'GiftToggleWidget displayed with toggle switch',
        flutterFile: 'checkout/widget/gift_order/gift_toggle_widget.dart:156-289'
      },
      {
        step: 2,
        action: 'User toggles gift order ON',
        expectedResult: 'Gift order form appears',
        uiState: 'Recipient name, phone, address fields shown',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:749-771'
      },
      {
        step: 3,
        action: 'User fills in recipient name and phone',
        expectedResult: 'Gift info is validated and saved',
        uiState: 'Form fields show values, validation runs',
        flutterFile: 'checkout/widget/gift_order/gift_toggle_widget.dart:290-490'
      },
      {
        step: 4,
        action: 'User can pick from contacts',
        expectedResult: 'Contact picker opens, fills form',
        uiState: 'Native contact picker shown',
        flutterFile: 'checkout/widget/gift_order/gift_toggle_widget.dart:70-115'
      },
      {
        step: 5,
        action: 'Cash payment is hidden when gift is enabled',
        expectedResult: 'Only online payment methods available',
        uiState: 'Cash payment option hidden',
        flutterFile: 'checkout/widget/payments_widget/payment_method_selector_widget.dart:44-47'
      }
    ],
    postconditions: [
      'Gift order is enabled',
      'Recipient info is saved',
      'Order will be delivered to recipient'
    ],
    successCriteria: [
      'Toggle enables/disables gift mode',
      'Form validation works correctly',
      'Contact picker fills form correctly',
      'Payment methods adjust for gift orders'
    ],
    relatedTestCases: ['TC-CHECKOUT-012', 'TC-CHECKOUT-013']
  },
  {
    id: 'UC-CHECKOUT-008',
    title: 'Add Delivery Instructions',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer can add special instructions for the delivery driver such as building entrance codes or delivery preferences.',
    preconditions: [
      'User is on checkout page',
      'Order is for delivery (not pickup)'
    ],
    steps: [
      {
        step: 1,
        action: 'User sees delivery instructions section',
        expectedResult: 'Delivery instructions card visible',
        uiState: 'AddDeliveryInstruction widget shown',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:199-203'
      },
      {
        step: 2,
        action: 'User taps to add instructions',
        expectedResult: 'Instructions bottom sheet opens',
        uiState: 'AddDeliveryInstructionsBottomSheet displayed',
        flutterFile: 'checkout/widget/delivery_instruction/add_delivery_instructions_bottom_sheet.dart'
      },
      {
        step: 3,
        action: 'User selects from preset notes or writes custom note',
        expectedResult: 'Notes are saved to the order',
        uiState: 'Selected notes shown on card',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:693-695'
      }
    ],
    postconditions: [
      'Delivery instructions saved',
      'Driver will see instructions'
    ],
    successCriteria: [
      'Instructions can be selected and saved',
      'Custom notes work correctly',
      'Instructions show on order card'
    ],
    relatedTestCases: ['TC-CHECKOUT-014']
  },
  {
    id: 'UC-CHECKOUT-009',
    title: 'Change Delivery Address',
    priority: 'High',
    userType: 'End User',
    description: 'Customer can change or add a delivery address during checkout.',
    preconditions: [
      'User is on checkout page',
      'Order is for delivery (not pickup)'
    ],
    steps: [
      {
        step: 1,
        action: 'User sees current delivery address',
        expectedResult: 'Address displayed with change option',
        uiState: 'AddressWidget shows current address',
        flutterFile: 'checkout/widget/address_checkout_widget/address_checkout_widget.dart'
      },
      {
        step: 2,
        action: 'User taps to change address',
        expectedResult: 'Address selection opens',
        uiState: 'Address bottom sheet displayed',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:685-689'
      },
      {
        step: 3,
        action: 'User selects new address or adds new one',
        expectedResult: 'Address is updated, bill recalculates',
        uiState: 'New address shown, delivery fee may change',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1425-1430'
      }
    ],
    postconditions: [
      'New address is selected',
      'Bill recalculated with new delivery fee'
    ],
    successCriteria: [
      'Address change works correctly',
      'Bill updates with new delivery fee',
      'Far address warning shown if needed'
    ],
    relatedTestCases: ['TC-CHECKOUT-015', 'TC-CHECKOUT-016']
  },
  {
    id: 'UC-CHECKOUT-010',
    title: 'Select Delivery Fee Option',
    priority: 'Medium',
    userType: 'End User',
    description: 'When enabled, customer can choose from different delivery fee options (standard vs priority/express).',
    preconditions: [
      'Delivery fee options feature is enabled',
      'Restaurant has multiple delivery options',
      'Order is for delivery (not pickup)'
    ],
    steps: [
      {
        step: 1,
        action: 'App fetches delivery fee options',
        expectedResult: 'Options are loaded',
        uiState: 'DeliveryFeeSelectorWidget shown if options available',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1136-1142'
      },
      {
        step: 2,
        action: 'User sees available delivery fee options',
        expectedResult: 'Options displayed with prices',
        uiState: 'Multiple fee options shown as selectable cards',
        flutterFile: 'checkout/widget/delivery_fee_selector_widget.dart'
      },
      {
        step: 3,
        action: 'User selects a delivery fee option',
        expectedResult: 'Fee is updated, bill recalculates',
        uiState: 'Selected option highlighted, bill updates',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:723-726'
      }
    ],
    postconditions: [
      'Delivery fee option is selected',
      'Bill reflects selected fee'
    ],
    successCriteria: [
      'Options are displayed when available',
      'Selection updates the bill',
      'Default option is auto-selected'
    ],
    relatedTestCases: ['TC-CHECKOUT-017']
  },
  {
    id: 'UC-CHECKOUT-011',
    title: 'Handle Multiple Active Orders Warning',
    priority: 'Medium',
    userType: 'End User',
    description: 'When user already has active orders, the app shows a warning before allowing them to place a new order.',
    preconditions: [
      'User has existing active orders',
      'User tries to submit new order'
    ],
    steps: [
      {
        step: 1,
        action: 'App checks for active orders on checkout load',
        expectedResult: 'Active orders status is known',
        uiState: 'No visible change, data stored',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1681-1683'
      },
      {
        step: 2,
        action: 'User tries to send order when active orders exist',
        expectedResult: 'Confirmation timer bottom sheet appears',
        uiState: 'ConfirmationTimerBottomSheet with countdown',
        flutterFile: 'checkout/view/checkout_view.dart:440-456'
      },
      {
        step: 3,
        action: 'User waits for timer or confirms',
        expectedResult: 'Order proceeds or is cancelled',
        uiState: 'Timer counts down, confirm button appears',
        flutterFile: 'checkout/widget/confirmation_widgets/confirmation_timer_bottom_sheet.dart'
      }
    ],
    postconditions: [
      'User is warned about multiple orders',
      'User can proceed after confirmation'
    ],
    successCriteria: [
      'Warning appears for users with active orders',
      'Timer prevents accidental confirmations',
      'User can cancel if needed'
    ],
    relatedTestCases: ['TC-CHECKOUT-018']
  },
  {
    id: 'UC-CHECKOUT-012',
    title: 'View Order Summary Before Confirmation',
    priority: 'High',
    userType: 'End User',
    description: 'Before final submission, customer sees a complete summary of their order including items, delivery details, and total.',
    preconditions: [
      'User taps Send Order button',
      'All validations pass'
    ],
    steps: [
      {
        step: 1,
        action: 'App builds order summary data',
        expectedResult: 'Summary includes all order details',
        uiState: 'OrderSummaryBottomSheet prepares to display',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1333-1368'
      },
      {
        step: 2,
        action: 'Bottom sheet displays order summary',
        expectedResult: 'User sees complete order breakdown',
        uiState: 'OrderSummaryBottomSheet shows restaurant, items, payment, total',
        flutterFile: 'checkout/widget/order_summary/order_summary_bottom_sheet.dart'
      },
      {
        step: 3,
        action: 'User reviews and taps Confirm',
        expectedResult: 'Order submission proceeds',
        uiState: 'Bottom sheet closes, order is created',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1384-1388'
      }
    ],
    postconditions: [
      'User has reviewed order',
      'Order proceeds to creation'
    ],
    successCriteria: [
      'Summary shows all relevant details',
      'Items are listed correctly',
      'Total matches bill calculation',
      'Confirm triggers order creation'
    ],
    relatedTestCases: ['TC-CHECKOUT-019']
  },
  {
    id: 'UC-CHECKOUT-013',
    title: 'Handle Online Payment Flow',
    priority: 'Critical',
    userType: 'End User',
    description: 'When customer chooses online payment, the app opens the payment gateway and handles success/failure notifications.',
    preconditions: [
      'User has selected online payment method',
      'Order is created successfully'
    ],
    steps: [
      {
        step: 1,
        action: 'Order creation returns checkout link',
        expectedResult: 'Payment gateway URL is available',
        uiState: 'Order created, preparing payment view',
        flutterFile: 'checkout/service/checkout_service.dart:129-135'
      },
      {
        step: 2,
        action: 'App opens EpaymentView with payment URL',
        expectedResult: 'Payment gateway loads in webview',
        uiState: 'EpaymentView displays bank payment page',
        flutterFile: 'checkout/widget/payments_widget/epayment_page.dart'
      },
      {
        step: 3,
        action: 'User completes payment on gateway',
        expectedResult: 'Payment notification received',
        uiState: 'Webview shows bank confirmation',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:426-479'
      },
      {
        step: 4,
        action: 'On payment success, navigate to success screen',
        expectedResult: 'User sees order confirmation',
        uiState: 'PaymentSuccess screen displayed, cart cleared',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:449-451'
      },
      {
        step: 5,
        action: 'On payment failure, show error message',
        expectedResult: 'User informed of failure',
        uiState: 'Snackbar with error message',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:455-473'
      }
    ],
    postconditions: [
      'Payment is processed',
      'Order status is updated',
      'User navigates appropriately'
    ],
    successCriteria: [
      'Payment gateway loads correctly',
      'Success navigates to confirmation',
      'Failure shows clear error message',
      'Cart is cleared on success'
    ],
    relatedTestCases: ['TC-CHECKOUT-020', 'TC-CHECKOUT-021']
  },
  {
    id: 'UC-CHECKOUT-014',
    title: 'View Dynamic Rewards Progress',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer can see their progress toward earning loyalty rewards based on their current order total.',
    preconditions: [
      'Dynamic rewards feature is enabled',
      'User is on checkout page'
    ],
    steps: [
      {
        step: 1,
        action: 'App fetches dynamic rewards data',
        expectedResult: 'Rewards information loaded',
        uiState: 'DynamicRewardsWidget displayed if available',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:223-226'
      },
      {
        step: 2,
        action: 'User sees rewards progress',
        expectedResult: 'Progress bar and message shown',
        uiState: 'Shows "X left to earn Y reward"',
        flutterFile: 'checkout/widget/checkout_body_widget.dart:483-495'
      }
    ],
    postconditions: [
      'User informed of potential rewards',
      'May encourage larger orders'
    ],
    successCriteria: [
      'Rewards section shows when applicable',
      'Progress updates with order total',
      'Clear messaging about reward tiers'
    ],
    relatedTestCases: ['TC-CHECKOUT-022']
  },
  {
    id: 'UC-CHECKOUT-015',
    title: 'Handle Far Address Warning',
    priority: 'Medium',
    userType: 'End User',
    description: 'When user\'s selected address is far from their current location, the app warns them to verify the address.',
    preconditions: [
      'User is on checkout page',
      'Selected address distance exceeds threshold'
    ],
    steps: [
      {
        step: 1,
        action: 'User tries to submit order',
        expectedResult: 'Distance check performed',
        uiState: 'Distance calculated from current location',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1399-1411'
      },
      {
        step: 2,
        action: 'If distance exceeds threshold, show warning',
        expectedResult: 'Bottom sheet with address warning appears',
        uiState: 'Warning shows address and asks to change or continue',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1414-1503'
      },
      {
        step: 3,
        action: 'User can change address or continue',
        expectedResult: 'User makes informed decision',
        uiState: 'Address selector or confirmation proceeds',
        flutterFile: 'checkout/viewmodel/checkout_viewmodel.dart:1424-1440'
      }
    ],
    postconditions: [
      'User is warned about far address',
      'User can change address if needed'
    ],
    successCriteria: [
      'Warning shows for far addresses',
      'Delivery fee is displayed in warning',
      'User can change or proceed',
      'Gift orders skip this warning'
    ],
    relatedTestCases: ['TC-CHECKOUT-023']
  }
];




