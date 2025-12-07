import type { EdgeCase } from '@/lib/types';

export const checkoutEdgeCases: EdgeCase[] = [
  {
    id: 'EC-CHECKOUT-001',
    title: 'Bill Calculation Failure - Network Error',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Critical',
    triggerCondition: 'calculateBill() API call throws Exception or returns Status.ERROR',
    expectedBehavior: 'App catches exception, shows error banner with retry button. User cannot proceed until bill is calculated.',
    uiHandling: {
      errorMessage: 'Exception message from server or "Failed to calculate bill"',
      recoveryOptions: [
        'User can tap retry button to recalculate',
        'User can check internet connection',
        'User can go back and try again'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:926-933',
        'checkout/service/checkout_service.dart:93-101'
      ],
      validationRules: ['Bill must be calculated before order submission'],
      apiErrorCodes: ['Network timeout', 'Server error', '500']
    },
    relatedTestCases: ['TC-CHECKOUT-002']
  },
  {
    id: 'EC-CHECKOUT-002',
    title: 'No Delivery Address Selected',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'userAddressController.isCurrentLocation == true (no saved address)',
    expectedBehavior: 'App shows dialog asking user to add address. Bill calculation and order submission are blocked.',
    uiHandling: {
      errorMessage: '"please_add_address".locale',
      recoveryOptions: [
        'User can tap to add a new address',
        'User can select from existing addresses'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:840-851',
        'checkout/view/checkout_view.dart:346-355'
      ],
      validationRules: ['Valid address required for delivery orders']
    },
    relatedTestCases: ['TC-CHECKOUT-015']
  },
  {
    id: 'EC-CHECKOUT-003',
    title: 'No Payment Method Selected',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'viewModel.selectedPaymentMethod.id == -1',
    expectedBehavior: 'App shows toast message asking user to select payment method. Fetches payment methods again if needed.',
    uiHandling: {
      errorMessage: '"please_choose_payment_method".locale',
      recoveryOptions: [
        'User can select from available payment methods',
        'App auto-fetches payment methods'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/view/checkout_view.dart:357-368'],
      validationRules: ['Payment method must be selected']
    },
    relatedTestCases: ['TC-CHECKOUT-005']
  },
  {
    id: 'EC-CHECKOUT-004',
    title: 'Inactive Payment Method Selected',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'paymentMethod.active == false when user taps payment option',
    expectedBehavior: 'App shows bottom sheet explaining that payment method is unavailable.',
    uiHandling: {
      errorMessage: '"this_payment_method_unvalide".locale',
      recoveryOptions: [
        'User can dismiss and select different payment method',
        'User can try again later'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/widget/payments_widget/payment_method_selector_widget.dart:145-157'],
      validationRules: ['Only active payment methods can be selected']
    },
    relatedTestCases: ['TC-CHECKOUT-006']
  },
  {
    id: 'EC-CHECKOUT-005',
    title: 'Voucher Validation Failure',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'validateVoucher() returns success = false',
    expectedBehavior: 'Error message displayed to user. Voucher is not applied, bill remains unchanged.',
    uiHandling: {
      errorMessage: 'Server-provided validation message (resp.message)',
      recoveryOptions: [
        'User can try different voucher code',
        'User can proceed without voucher',
        'User can check voucher requirements'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:1001-1003',
        'checkout/service/checkout_service.dart:210-218'
      ],
      validationRules: ['Voucher must be valid for restaurant and order amount']
    },
    relatedTestCases: ['TC-CHECKOUT-008']
  },
  {
    id: 'EC-CHECKOUT-006',
    title: 'Empty Voucher Code Entered',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'voucher == "" in validateCodeVoucher()',
    expectedBehavior: 'Function returns early with failure response. No API call made.',
    uiHandling: {
      errorMessage: 'No error - empty input ignored',
      recoveryOptions: [
        'User can enter a valid voucher code'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/viewmodel/checkout_viewmodel.dart:975-978'],
      validationRules: ['Empty string check before API call']
    },
    relatedTestCases: ['TC-CHECKOUT-007']
  },
  {
    id: 'EC-CHECKOUT-007',
    title: 'Order Creation Failure',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'createOrder() throws Exception or returns success = false',
    expectedBehavior: 'Error message shown to user. Loading state cleared. User can try again.',
    uiHandling: {
      errorMessage: 'Exception message from server',
      recoveryOptions: [
        'User can retry order submission',
        'User can check internet connection',
        'User can modify order and try again'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/service/checkout_service.dart:140-141',
        'checkout/view/checkout_view.dart:535-538'
      ],
      validationRules: ['Order creation response checked for success']
    },
    relatedTestCases: ['TC-CHECKOUT-004']
  },
  {
    id: 'EC-CHECKOUT-008',
    title: 'Online Payment Gateway Failure',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Critical',
    triggerCondition: 'Payment notification type == PAYMENT_FAILED_NOTIFICATION',
    expectedBehavior: 'Snackbar with error message shown. Cart is NOT cleared. User can retry payment.',
    uiHandling: {
      errorMessage: 'ntfData["ntf_text"] - Server-provided failure message',
      recoveryOptions: [
        'User can dismiss error and retry',
        'User can choose different payment method',
        'User can cancel and try later'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/viewmodel/checkout_viewmodel.dart:455-473'],
      validationRules: ['Payment notification type checked']
    },
    relatedTestCases: ['TC-CHECKOUT-021']
  },
  {
    id: 'EC-CHECKOUT-009',
    title: 'Gift Order Without Valid Recipient Info',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'giftOrder.isGiftOrder == true AND giftingFormKey.currentState?.validate() returns false',
    expectedBehavior: 'Form validation errors shown. Screen scrolls to gift form. Order not submitted.',
    uiHandling: {
      errorMessage: '"recipient_name_required".locale or "recipient_phone_required".locale',
      recoveryOptions: [
        'User must fill in recipient name',
        'User must fill in recipient phone',
        'User can disable gift order'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/widget/checkout_body_widget.dart:658-669',
        'checkout/widget/gift_order/gift_toggle_widget.dart:313-316'
      ],
      validationRules: ['Gift orders require name and phone']
    },
    relatedTestCases: ['TC-CHECKOUT-013']
  },
  {
    id: 'EC-CHECKOUT-010',
    title: 'Location Services Disabled',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'isLocationOn == false when trying to submit order',
    expectedBehavior: 'Toast message shown asking user to enable location.',
    uiHandling: {
      errorMessage: '"please_turn_on_location".locale',
      recoveryOptions: [
        'User can enable location services in device settings',
        'User can use saved address location'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/view/checkout_view.dart:394-402'],
      validationRules: ['Location required for accurate delivery']
    },
    relatedTestCases: ['TC-CHECKOUT-024']
  },
  {
    id: 'EC-CHECKOUT-011',
    title: 'User Has Active Orders - Confirmation Required',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'currentOrderCheckModel.hasOrders == true',
    expectedBehavior: 'Confirmation timer bottom sheet shown. User must wait or confirm before proceeding.',
    uiHandling: {
      errorMessage: 'currentOrderCheckModel.message - Warning about active orders',
      recoveryOptions: [
        'User can wait for timer',
        'User can confirm after timer',
        'User can cancel order submission'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/view/checkout_view.dart:440-456',
        'checkout/widget/confirmation_widgets/confirmation_timer_bottom_sheet.dart'
      ],
      validationRules: ['Active orders trigger confirmation flow']
    },
    relatedTestCases: ['TC-CHECKOUT-018']
  },
  {
    id: 'EC-CHECKOUT-012',
    title: 'Back Press During Order Creation',
    category: 'State',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'User presses back when orderCreationLoading == true',
    expectedBehavior: 'Toast message shown. Navigation blocked until order completes.',
    uiHandling: {
      errorMessage: '"you_can_not_leave_while_sending_the_order".locale',
      recoveryOptions: [
        'User must wait for order to complete',
        'User cannot navigate away'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:1514-1524',
        'checkout/view/checkout_view.dart:252-265'
      ],
      validationRules: ['Navigation blocked during order submission']
    },
    relatedTestCases: ['TC-CHECKOUT-025']
  },
  {
    id: 'EC-CHECKOUT-013',
    title: 'Far Address Distance Warning',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Distance to address >= SettingManager.instance.address_threshold',
    expectedBehavior: 'Warning bottom sheet shown with address and delivery fee. User can change address or continue.',
    uiHandling: {
      errorMessage: '"are_you_sure_address".locale with address name and "far_address_warning".locale',
      recoveryOptions: [
        'User can change address',
        'User can proceed with current address',
        'User can see delivery fee before deciding'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/viewmodel/checkout_viewmodel.dart:1411-1503'],
      validationRules: ['Distance check uses Geolocator.distanceBetween()']
    },
    relatedTestCases: ['TC-CHECKOUT-023']
  },
  {
    id: 'EC-CHECKOUT-014',
    title: 'Bill Warning Message Present',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'bill.warningMessage != null && bill.warningMessage!.isNotEmpty',
    expectedBehavior: 'Warning bottom sheet shown before order confirmation. User must acknowledge warning.',
    uiHandling: {
      errorMessage: 'bill.warningMessage - Server-provided warning',
      recoveryOptions: [
        'User can acknowledge and proceed',
        'User can cancel and modify order'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/view/checkout_view.dart:405-438',
        'checkout/widget/warning_message_bottom_sheet.dart'
      ],
      validationRules: ['Warning message checked before confirmation']
    },
    relatedTestCases: ['TC-CHECKOUT-026']
  },
  {
    id: 'EC-CHECKOUT-015',
    title: 'Tips Not Available for Cash Payment',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'selectedPaymentMethod.id == 0 || selectedPaymentMethod.id == -1',
    expectedBehavior: 'Tips selector is hidden. Tips are reset to 0.',
    uiHandling: {
      errorMessage: 'No error - tips section simply hidden',
      recoveryOptions: [
        'User can select online payment to add tips',
        'User can proceed without tips'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/widget/checkout_body_widget.dart:210-218',
        'checkout/viewmodel/checkout_viewmodel.dart:703-705'
      ],
      validationRules: ['Tips only shown for online payments']
    },
    relatedTestCases: ['TC-CHECKOUT-011']
  },
  {
    id: 'EC-CHECKOUT-016',
    title: 'Just Gifting Mode - Gift Required',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'bill.justGifting == true',
    expectedBehavior: 'Gift order is automatically enabled and cannot be disabled. Warning message shown.',
    uiHandling: {
      errorMessage: '"out_of_syria_warning".locale with shimmer animation',
      recoveryOptions: [
        'User must send as gift order',
        'User cannot disable gift mode'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:915-920',
        'checkout/widget/checkout_body_widget.dart:371-379'
      ],
      validationRules: ['justGifting flag forces gift order mode']
    },
    relatedTestCases: ['TC-CHECKOUT-027']
  },
  {
    id: 'EC-CHECKOUT-017',
    title: 'Bank List Empty or Fetch Failure',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'fetchBanks() throws Exception',
    expectedBehavior: 'Error message shown. Payment methods list may be empty.',
    uiHandling: {
      errorMessage: 'Exception message from server',
      recoveryOptions: [
        'User can pull to refresh',
        'User can wait and try again'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/service/checkout_service.dart:244-246'],
      validationRules: ['Exception handling for bank fetch']
    },
    relatedTestCases: ['TC-CHECKOUT-005']
  },
  {
    id: 'EC-CHECKOUT-018',
    title: 'Voucher Already Applied via Auto-Apply',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'cartController.currentBasket.voucherCode != null && voucherCode != ""',
    expectedBehavior: 'Auto-applied voucher is validated and applied. User sees voucher already applied.',
    uiHandling: {
      errorMessage: 'No error - voucher automatically applied',
      recoveryOptions: [
        'User can remove voucher and apply different one',
        'User can proceed with auto-applied voucher'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'checkout/viewmodel/checkout_viewmodel.dart:367-378',
        'checkout/viewmodel/checkout_viewmodel.dart:611-625'
      ],
      validationRules: ['Auto-apply voucher validated on checkout load']
    },
    relatedTestCases: ['TC-CHECKOUT-007']
  },
  {
    id: 'EC-CHECKOUT-019',
    title: 'Delivery Fee Coupon Applied - Fee Options Hidden',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'bill.hadDeliveryCoupon == true',
    expectedBehavior: 'Delivery fee selector is hidden since delivery is free.',
    uiHandling: {
      errorMessage: 'No error - delivery fee section hidden',
      recoveryOptions: [
        'User enjoys free delivery',
        'No action needed'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/widget/checkout_body_widget.dart:414-420'],
      validationRules: ['Delivery fee options hidden when delivery coupon applied']
    },
    relatedTestCases: ['TC-CHECKOUT-017']
  },
  {
    id: 'EC-CHECKOUT-020',
    title: 'Contact Picker Permission Denied',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Contact picker throws exception (permission denied)',
    expectedBehavior: 'Error snackbar shown. User must manually enter recipient info.',
    uiHandling: {
      errorMessage: '"error_selecting_contact".locale',
      recoveryOptions: [
        'User can manually enter contact info',
        'User can grant permission and try again'
      ]
    },
    implementationNotes: {
      flutterFiles: ['checkout/widget/gift_order/gift_toggle_widget.dart:103-113'],
      validationRules: ['Exception handling for contact picker']
    },
    relatedTestCases: ['TC-CHECKOUT-012']
  }
];

