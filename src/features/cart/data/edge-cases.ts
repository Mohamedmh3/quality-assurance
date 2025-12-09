import type { EdgeCase } from '@/lib/types';

export const cartEdgeCases: EdgeCase[] = [
  {
    id: 'EC-CART-001',
    title: 'Empty Cart - No Items Added',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'myCartViewModel.currentBasket.carts.isEmpty',
    expectedBehavior: 'User is shown message and cannot proceed to checkout',
    uiHandling: {
      errorMessage: 'your_cart_empty',
      recoveryOptions: [
        'Go back to restaurant menu to add items',
        'Browse other restaurants'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:185-196'],
      validationRules: ['Cart must have at least one item to proceed'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-023']
  },
  {
    id: 'EC-CART-002',
    title: 'User Not Logged In at Checkout',
    category: 'Validation',
    likelihood: 'High',
    impact: 'High',
    triggerCondition: '!UserManager.instance.isLoggedIn()',
    expectedBehavior: 'Login prompt is shown before proceeding to checkout',
    uiHandling: {
      errorMessage: 'cart_continue_desc',
      recoveryOptions: [
        'Login to continue',
        'Skip login (cannot proceed)'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:226-248'],
      validationRules: ['User must be authenticated to checkout'],
      apiErrorCodes: ['401']
    },
    relatedTestCases: ['TC-CART-024']
  },
  {
    id: 'EC-CART-003',
    title: 'Out of Stock Items in Cart',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'cart.outOfStock == true',
    expectedBehavior: 'Dialog shows which items are out of stock, user must remove them',
    uiHandling: {
      errorMessage: 'Products [dish names] are out of stock',
      recoveryOptions: [
        'Remove out of stock items',
        'Choose replacement items',
        'Wait for items to be restocked'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:249-314'],
      validationRules: ['All cart items must be available'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-025']
  },
  {
    id: 'EC-CART-004',
    title: 'No Delivery Address Set',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Get.find<UserAddressViewModel>().userAddresses.defaultAddress == null',
    expectedBehavior: 'Address selection bottom sheet appears before checkout',
    uiHandling: {
      errorMessage: 'to_continue_to_checkout_please_add_an_address',
      recoveryOptions: [
        'Add new address',
        'Select existing address',
        'Use current location'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:316-341'],
      validationRules: ['Delivery address required for non-vending orders'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-026']
  },
  {
    id: 'EC-CART-005',
    title: 'Restaurant is Offline',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Critical',
    triggerCondition: 'basket!.restaurantStatus == false',
    expectedBehavior: 'Cannot open cart, message shown that restaurant is offline',
    uiHandling: {
      errorMessage: 'restaurant_offline',
      recoveryOptions: [
        'Wait for restaurant to come online',
        'Choose a different restaurant',
        'Delete cart and start over'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/view/my_carts.dart:351-355'],
      validationRules: ['Restaurant must be online to proceed'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-027']
  },
  {
    id: 'EC-CART-006',
    title: 'Maximum Basket Limit Reached',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'baskets.length >= maxBasket (5)',
    expectedBehavior: 'User must delete an old cart before adding new one',
    uiHandling: {
      errorMessage: 'add_more_than_5_cart',
      recoveryOptions: [
        'Delete oldest cart',
        'Complete an existing order',
        'Merge items into existing cart'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:451-454', 'cart/cart_page/view/cart_view.dart:664-687'],
      validationRules: ['Maximum 5 carts allowed at once'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-028']
  },
  {
    id: 'EC-CART-007',
    title: 'Vending Machine Single Item Limit',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'currentRestaurant?.isVending == true && (carts.length > 1 || carts.first.quantity > 1)',
    expectedBehavior: 'Error message shown, cannot proceed with multiple items',
    uiHandling: {
      errorMessage: 'note_add_one_item_only',
      recoveryOptions: [
        'Remove extra items',
        'Place separate orders'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:197-219'],
      validationRules: ['Vending machines only allow one item per order'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-029']
  },
  {
    id: 'EC-CART-008',
    title: 'Market Order Without Note Selection',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'isMarket == true && selectedNoteId == null && additionalNote.text.trim().isEmpty && defaultNoteId == null',
    expectedBehavior: 'User must select a note for item substitution preference',
    uiHandling: {
      errorMessage: 'please_select_note_in_case_there_is_no_item',
      recoveryOptions: [
        'Select a preset note',
        'Write custom instructions',
        'Use default if available'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:150-183'],
      validationRules: ['Market orders require substitution instructions'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-030']
  },
  {
    id: 'EC-CART-009',
    title: 'Cart Older Than 2 Days',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'element.date!.isBefore(DateTime.now().subtract(Duration(days: 2)))',
    expectedBehavior: 'Old carts are automatically removed from My Carts',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Create a new cart',
        'Reorder from order history'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:959'],
      validationRules: ['Carts expire after 2 days'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-031']
  },
  {
    id: 'EC-CART-010',
    title: 'Item Quantity Exceeds Maximum',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'dish.quantity < currentCount',
    expectedBehavior: 'Plus button is disabled, cannot add more of that item',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Keep current quantity',
        'Choose different item'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:369-396', 'cart/cart_page/view/cart_view.dart:896-905'],
      validationRules: ['Cannot exceed item quantity limit'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-032']
  },
  {
    id: 'EC-CART-011',
    title: 'Topping Selection Below Minimum',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'countOfToppingsBelongToSameGroup < minGroupElementCount',
    expectedBehavior: 'Cannot add to cart, prompted to select required toppings',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Select required toppings',
        'Scroll to missing topping group'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:308-343'],
      validationRules: ['Minimum toppings per group must be met'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-033']
  },
  {
    id: 'EC-CART-012',
    title: 'Topping Selection Exceeds Maximum',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'topping.selectLimit! <= groupCount',
    expectedBehavior: 'Returns true indicating limit reached, cannot add more toppings',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Remove a topping to add another',
        'Keep current selection'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:913-924'],
      validationRules: ['Cannot exceed topping group limit'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-034']
  },
  {
    id: 'EC-CART-013',
    title: 'Restaurant Marked as Busy',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'isBusy == true',
    expectedBehavior: 'Cart is overlaid with busy message, cannot proceed',
    uiHandling: {
      errorMessage: 'busy_market',
      recoveryOptions: [
        'Wait for restaurant to be less busy',
        'Delete cart and choose another restaurant'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/view/my_carts.dart:356-367', 'cart/sub_pages/my_carts/view/my_carts.dart:384-401'],
      validationRules: ['Cannot order from busy restaurant'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-035']
  },
  {
    id: 'EC-CART-014',
    title: 'Dish Options Changed Since Added',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Options mismatch when filling basket from dishes',
    expectedBehavior: 'Warning screen shown, user must re-select options for each affected dish',
    uiHandling: {
      errorMessage: 'option_change_warning',
      recoveryOptions: [
        'Re-select options for each dish',
        'Remove affected items'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:1159-1182', 'cart/sub_pages/widget/option_warning_changes.dart:11-82'],
      validationRules: ['Options must match current dish configuration'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-036']
  },
  {
    id: 'EC-CART-015',
    title: 'Network Error Loading Cart Data',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Exception during API call',
    expectedBehavior: 'Error message shown, retry option available',
    uiHandling: {
      errorMessage: 'Network error or server unavailable',
      recoveryOptions: [
        'Retry loading',
        'Check internet connection',
        'Use cached data if available'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:438-441', 'cart/cart_page/service/service_service.dart:46-48'],
      validationRules: ['Handle network failures gracefully'],
      apiErrorCodes: ['500', '503']
    },
    relatedTestCases: ['TC-CART-037']
  },
  {
    id: 'EC-CART-016',
    title: 'Cart Data Corruption in Local Storage',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Exception during basket deserialization',
    expectedBehavior: 'All corrupted carts are deleted, user starts fresh',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Carts are automatically cleared',
        'Recreate carts manually'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:962-966'],
      validationRules: ['Recover gracefully from storage corruption'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-038']
  },
  {
    id: 'EC-CART-017',
    title: 'Pickup Order Without Services',
    category: 'State',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'currentBasket.isPickUp == true',
    expectedBehavior: 'Services section is not shown for pickup orders',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/viewmodel/cart_viewmodel.dart:190-197'],
      validationRules: ['Services only available for delivery'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-039']
  },
  {
    id: 'EC-CART-018',
    title: 'Required Options Not Selected',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'selectedOptions.length != dishModel.options!.length',
    expectedBehavior: 'Returns 0 indicating options are missing',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Select required options before adding to cart'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:260-264', 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:308-312'],
      validationRules: ['All required options must be selected'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-040']
  },
  {
    id: 'EC-CART-019',
    title: 'Returning from Checkout with Empty Cart',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'myCartViewModel.currentBasket.carts.isEmpty after navigation',
    expectedBehavior: 'User is automatically navigated back from cart',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: [
        'Navigate to restaurant to add items',
        'Go to home screen'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:410-418', 'cart/cart_page/view/cart_view.dart:980-995'],
      validationRules: ['Cannot view empty cart'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-041']
  },
  {
    id: 'EC-CART-020',
    title: 'Deep Link Reorder Source Handling',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'DeepLinkManager.instance.source == "reorder"',
    expectedBehavior: 'Special back navigation handling, confirmation on exit',
    uiHandling: {
      errorMessage: 'menu_close_popup',
      recoveryOptions: [
        'Confirm to keep cart',
        'Deny to discard cart'
      ]
    },
    implementationNotes: {
      flutterFiles: ['cart/cart_page/view/cart_view.dart:647-724'],
      validationRules: ['Reorder carts require confirmation to exit'],
      apiErrorCodes: []
    },
    relatedTestCases: ['TC-CART-042']
  }
];



