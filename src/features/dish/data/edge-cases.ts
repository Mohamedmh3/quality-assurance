import type { EdgeCase } from '../types';

export const dishEdgeCases: EdgeCase[] = [
  // ============================================
  // DATA & VALIDATION EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-001',
    title: 'Invalid Dish ID',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Deep link contains non-existent dish ID, or dish was deleted after link creation',
    expectedBehavior: 'System should show error state and allow user to navigate back or to home',
    uiHandling: {
      errorMessage: 'This dish is no longer available',
      recoveryOptions: [
        'Navigate to restaurant menu',
        'Go to home feed',
        'Use search to find similar dishes'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'dish/services/dish_service.dart:47-66',
        'dish/viewmodel/dish_page_viewmodel.dart:289-330'
      ],
      validationRules: ['dishId must be positive integer', 'fetchDish returns empty DishModel on failure'],
      apiErrorCodes: ['404 - Dish not found', '400 - Invalid dish ID format']
    },
    relatedTestCases: ['TC-DISH-018']
  },
  {
    id: 'EC-DISH-002',
    title: 'Missing Dish Image',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Dish has no imagePath or imagePath is empty/null',
    expectedBehavior: 'Display placeholder image or restaurant logo as fallback',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Show default placeholder image', 'Use restaurant logo']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/cover_dish_widget.dart:15-16',
        'core/widget/image/custom_image_view.dart'
      ],
      validationRules: ['AppImageDefaultWidget handles null/empty URLs'],
    },
    relatedTestCases: ['TC-DISH-030']
  },
  {
    id: 'EC-DISH-003',
    title: 'Null Dish Price',
    category: 'Data',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Dish.price is null from API response',
    expectedBehavior: 'Default to price of 1, calculation should still work',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Display price as configured default']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:332',
        'dish/viewmodel/dish_page_viewmodel.dart:385'
      ],
      validationRules: ['totalPrice = dishModel!.price ?? 1'],
    },
    relatedTestCases: ['TC-DISH-028']
  },
  {
    id: 'EC-DISH-004',
    title: 'Empty Options List',
    category: 'Data',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Dish has no customization options (dish.options is null or empty)',
    expectedBehavior: 'Options section should not be rendered, no validation needed',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:275-280',
        'dish/view/dish_page_view.dart:157-163'
      ],
      validationRules: ['isThereOptions() returns false', 'optionsContainer returns empty Container()'],
    },
    relatedTestCases: ['TC-DISH-003']
  },
  {
    id: 'EC-DISH-005',
    title: 'Empty Toppings List',
    category: 'Data',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Dish has no available toppings (dish.toppings is null or empty)',
    expectedBehavior: 'Toppings section should not be rendered, no validation needed',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:267-273',
        'dish/view/dish_page_view.dart:167-173'
      ],
      validationRules: ['isThereTopping() returns false', 'toppingContainer returns empty Container()'],
    },
    relatedTestCases: ['TC-DISH-005']
  },

  // ============================================
  // OPTIONS VALIDATION EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-006',
    title: 'Required Option Not Selected',
    category: 'Validation',
    likelihood: 'High',
    impact: 'High',
    triggerCondition: 'User tries to add to cart without selecting all required options',
    expectedBehavior: 'Block add to cart, scroll to first unselected option, highlight it',
    uiHandling: {
      errorMessage: 'Required field (shown as red badge)',
      recoveryOptions: ['Auto-scroll to missing option', 'User selects an option']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:89-94',
        'dish/widget/options_dish_widget.dart:37-58',
        'dish/viewmodel/dish_page_viewmodel.dart:170-200'
      ],
      validationRules: [
        'checkToppingOptionsAvaliblity() must return -1',
        'selectedOptions must contain all option.name keys'
      ],
    },
    relatedTestCases: ['TC-DISH-011', 'TC-DISH-021']
  },
  {
    id: 'EC-DISH-007',
    title: 'Option with Default Selection',
    category: 'State',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Option has an opt with isDefault=1',
    expectedBehavior: 'Pre-select the default option on page load, include in price calculation',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['User can change selection if desired']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:348-356'
      ],
      validationRules: ['firstWhereOrNull with isDefault == 1', 'selectedOptions[name] = defaultOpt'],
    },
    relatedTestCases: ['TC-DISH-022']
  },
  {
    id: 'EC-DISH-008',
    title: 'Option Price is Zero',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Option choice (opt) has price of 0 or null',
    expectedBehavior: 'Do not display price indicator for this option (show empty string)',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/options_dish_widget.dart:430-434'
      ],
      validationRules: ['opt.price! > 0 check before displaying price'],
    },
    relatedTestCases: ['TC-DISH-004']
  },
  {
    id: 'EC-DISH-009',
    title: 'Option Points is Null',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Option has no loyalty points defined (opt.points is null)',
    expectedBehavior: 'Default to 0 points, lookup from opts list if available',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:401-416'
      ],
      validationRules: ['If points null, lookup from option.opts.firstWhere', 'Default to 0 if not found'],
    },
    relatedTestCases: ['TC-DISH-029']
  },

  // ============================================
  // TOPPINGS VALIDATION EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-010',
    title: 'Topping Minimum Not Met',
    category: 'Validation',
    likelihood: 'High',
    impact: 'High',
    triggerCondition: 'Topping group has selectMin > 0 and user selected fewer toppings',
    expectedBehavior: 'Block add to cart, scroll to topping group, show required indicator',
    uiHandling: {
      errorMessage: 'Required (topping_required)',
      recoveryOptions: ['Auto-scroll to topping group', 'Select minimum required toppings']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:95-97',
        'dish/viewmodel/dish_page_viewmodel.dart:104-123',
        'dish/widget/topping_widget.dart:117-152'
      ],
      validationRules: ['Count selected toppings by groupId', 'Compare against selectMin'],
    },
    relatedTestCases: ['TC-DISH-023']
  },
  {
    id: 'EC-DISH-011',
    title: 'Topping Maximum Exceeded',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User tries to add topping when selectLimit already reached for group',
    expectedBehavior: 'Show dialog explaining limit, do not add topping',
    uiHandling: {
      errorMessage: "You can't select more than {limit}",
      recoveryOptions: ['Dismiss dialog', 'Deselect another topping first']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/topping_widget.dart:264-276'
      ],
      validationRules: ['addTopping() returns true if limit reached', 'showMessageDialog called'],
    },
    relatedTestCases: ['TC-DISH-024']
  },
  {
    id: 'EC-DISH-012',
    title: 'Topping with Zero Price',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Topping has price of 0 or price is hidden by settings',
    expectedBehavior: 'Do not display price, or hide based on StaticData.settingModel.hideToppingPrice',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/topping_widget.dart:219-238'
      ],
      validationRules: ['topping.price != null && topping.price != 0 && hideToppingPrice check'],
    },
    relatedTestCases: ['TC-DISH-005']
  },
  {
    id: 'EC-DISH-013',
    title: 'Same Min and Max Topping Limit',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'Topping group has selectMin == selectLimit (must choose exactly N)',
    expectedBehavior: 'Display "Choose X just" message, enforce exact count',
    uiHandling: {
      errorMessage: 'Choose {N} just',
      recoveryOptions: ['Select exactly the required number']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/topping_widget.dart:415-436'
      ],
      validationRules: ['min == max case in toppingState()'],
    },
    relatedTestCases: ['TC-DISH-023', 'TC-DISH-024']
  },
  {
    id: 'EC-DISH-014',
    title: 'Topping with Null Group ID',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Topping has groupId = null (orphan topping)',
    expectedBehavior: 'Group by null key, show without group name, no min/max validation',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/topping_widget.dart:23-32'
      ],
      validationRules: ['groupedToppings[null] holds orphan toppings', 'Default to groupId 0 in generateToppingKeyList'],
    },
    relatedTestCases: ['TC-DISH-005']
  },

  // ============================================
  // QUANTITY EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-015',
    title: 'Quantity Cannot Go Below 1',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User tries to decrement quantity when already at 1',
    expectedBehavior: 'Quantity stays at 1, cannot order 0 items',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Minus button may appear disabled']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:436-440'
      ],
      validationRules: ['quantity = max(1, quantity - 1)'],
    },
    relatedTestCases: ['TC-DISH-008']
  },
  {
    id: 'EC-DISH-016',
    title: 'Quantity Exceeds Inventory',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'User tries to increase quantity beyond dish.quantity (inventory limit)',
    expectedBehavior: 'Block increment, plus button appears disabled/gray',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Button disabled when at limit', 'Order available quantity']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/quantity_selector_widget.dart:49-77',
        'dish/widget/add_cart_buttom.dart:60-70'
      ],
      validationRules: ['isOverQuantity() checks total vs dish.quantity', 'Accounts for existing cart items'],
    },
    relatedTestCases: ['TC-DISH-025']
  },
  {
    id: 'EC-DISH-017',
    title: 'Null Quantity Limit',
    category: 'Data',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Dish has no quantity limit defined (dish.quantity is null)',
    expectedBehavior: 'Allow unlimited quantity ordering',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/quantity_selector_widget.dart:50-53'
      ],
      validationRules: ['dish.quantity != null check before limit validation'],
    },
    relatedTestCases: ['TC-DISH-007']
  },
  {
    id: 'EC-DISH-018',
    title: 'Quantity with Existing Cart Items',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Same dish already in cart, total would exceed inventory',
    expectedBehavior: 'Include existing cart quantity when checking limit',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Reduce quantity or remove from cart first']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/quantity_selector_widget.dart:55-70',
        'dish/widget/add_cart_buttom.dart:63-69'
      ],
      validationRules: ['quantity limit = dish.quantity + cartObject.quantity'],
    },
    relatedTestCases: ['TC-DISH-025']
  },

  // ============================================
  // NETWORK & API EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-019',
    title: 'Network Error During Dish Load',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'API call to fetchDish() fails due to network issues',
    expectedBehavior: 'Show error message via showMessage(), return empty DishModel',
    uiHandling: {
      errorMessage: 'Network error message from exception',
      recoveryOptions: ['Retry button', 'Check internet connection', 'Navigate back']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/services/dish_service.dart:48-65',
        'core/constants/enums/network_helper.dart'
      ],
      apiErrorCodes: ['NETWORK_ERROR', 'TIMEOUT', '500 - Server error'],
    },
    relatedTestCases: ['TC-DISH-019']
  },
  {
    id: 'EC-DISH-020',
    title: 'Favorite Toggle API Failure',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'API call to updateDishFave() fails after optimistic UI update',
    expectedBehavior: 'Revert favorite state to original, keep UI consistent',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['State reverted automatically', 'User can try again']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/viewmodel/dish_page_viewmodel.dart:471-483',
        'dish/services/dish_service.dart:92-119'
      ],
      validationRules: ['If !response, call _changeFavState() to revert'],
      apiErrorCodes: ['Network failure', '401 - Unauthorized', '500 - Server error'],
    },
    relatedTestCases: ['TC-DISH-026']
  },
  {
    id: 'EC-DISH-021',
    title: 'Restaurant Offline During Add',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Restaurant goes offline after dish page loaded but before add to cart',
    expectedBehavior: 'Show toast warning, still add to cart (order may fail later)',
    uiHandling: {
      errorMessage: 'Restaurant is offline',
      recoveryOptions: ['Toast shown', 'Order still queued for when restaurant online']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:125-137'
      ],
      validationRules: ['restaurantStatus != ONLINE.index && !isBusy'],
    },
    relatedTestCases: ['TC-DISH-012', 'TC-DISH-020']
  },

  // ============================================
  // NAVIGATION EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-022',
    title: 'Deep Link from Cold Start',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'App opened via deep link (DeepLinkManager.fromLaunch = true)',
    expectedBehavior: 'Back button navigates to splash/home instead of previous screen',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Navigate to splash view on back']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/view/dish_page_view.dart:91-99'
      ],
      validationRules: ['Check DeepLinkManager.screen == "dish" && fromLaunch'],
    },
    relatedTestCases: ['TC-DISH-002', 'TC-DISH-027']
  },
  {
    id: 'EC-DISH-023',
    title: 'Cart Conflict - Different Restaurant',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'User has items from Restaurant A, tries to add from Restaurant B via deep link',
    expectedBehavior: 'System should warn about clearing cart or handle multi-restaurant',
    uiHandling: {
      errorMessage: 'Adding items from a different restaurant will clear your cart',
      recoveryOptions: ['Clear cart and add new item', 'Cancel and keep existing cart']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/view/dish_page_view.dart:217-231',
        'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart'
      ],
      validationRules: ['Check currentRestaurant.id vs dishModel.restaurantId'],
    },
    relatedTestCases: ['TC-DISH-027']
  },
  {
    id: 'EC-DISH-024',
    title: 'fromRestaurant Navigation Flag',
    category: 'State',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Dish accessed from restaurant menu (fromRestaurant = true)',
    expectedBehavior: 'Back button pops instead of pushing restaurant menu again',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/dish_page_appbar.dart:70-77'
      ],
      validationRules: ['If fromRestaurant == true, Navigator.pop(); else popAndPushNamed'],
    },
    relatedTestCases: ['TC-DISH-001']
  },

  // ============================================
  // RESTAURANT STATUS EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-025',
    title: 'Restaurant is Offline',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'restaurantStatus != ONLINE.index',
    expectedBehavior: 'Show toast warning but allow add to cart',
    uiHandling: {
      errorMessage: 'Restaurant is offline',
      recoveryOptions: ['Order queued', 'Check back later']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:125-137'
      ],
      validationRules: ['Check RestaurantStatus.ONLINE.index'],
    },
    relatedTestCases: ['TC-DISH-012']
  },
  {
    id: 'EC-DISH-026',
    title: 'Restaurant is Busy',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Restaurant has isBusy flag set to true',
    expectedBehavior: 'Different handling - may skip offline warning',
    uiHandling: {
      errorMessage: 'Restaurant is currently busy',
      recoveryOptions: ['Wait for availability', 'Choose another restaurant']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:126'
      ],
      validationRules: ['!viewModel.restaurantModel!.isBusy check'],
    },
    relatedTestCases: ['TC-DISH-012']
  },
  {
    id: 'EC-DISH-027',
    title: 'Vending Machine Mode',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Restaurant has isVending = true',
    expectedBehavior: 'Always show bottom sheet, special navigation after add',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/view/dish_page_view.dart:114-115',
        'dish/widget/add_cart_buttom.dart:158-163'
      ],
      validationRules: ['isVending check for bottom sheet visibility'],
    },
    relatedTestCases: ['TC-DISH-032']
  },
  {
    id: 'EC-DISH-028',
    title: 'Dine-In Mode Hides Bottom Sheet',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'dinInRestarunat = true and not vending',
    expectedBehavior: 'Bottom sheet (add to cart) not shown for dine-in',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Use in-restaurant ordering system']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/view/dish_page_view.dart:113-120'
      ],
      validationRules: ['myCartViewModel.dinInRestarunat == false || isVending'],
    },
    relatedTestCases: ['TC-DISH-032']
  },

  // ============================================
  // UI & STATE EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-029',
    title: 'Keyboard Open - Hide Add Button',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'User is typing in notes field, keyboard visible',
    expectedBehavior: 'Hide AddCartButton to avoid overlap, show again when dismissed',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Tap outside to dismiss keyboard', 'Button reappears']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:49-53',
        'dish/view/dish_page_view.dart:82-85'
      ],
      validationRules: ['MediaQuery.of(context).viewInsets.bottom != 0'],
    },
    relatedTestCases: ['TC-DISH-033']
  },
  {
    id: 'EC-DISH-030',
    title: 'Dish Loading State',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Dish details being fetched from API',
    expectedBehavior: 'Show BeeLoaderWidget, hide options/toppings until loaded',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Wait for loading to complete']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/view/dish_page_view.dart:142-144',
        'dish/viewmodel/dish_page_viewmodel.dart:283-287'
      ],
      validationRules: ['dishLoading observable controls loading state'],
    },
    relatedTestCases: ['TC-DISH-001']
  },
  {
    id: 'EC-DISH-031',
    title: 'Add to Cart Button Disabled',
    category: 'UI',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'Quantity is 0 or isOverQuantity returns true',
    expectedBehavior: 'Button appears disabled, cannot add to cart',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Adjust quantity', 'Check inventory']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:59-70'
      ],
      validationRules: ['selectedQuantity > 0 && !isOverQuantity()'],
    },
    relatedTestCases: ['TC-DISH-010', 'TC-DISH-025']
  },
  {
    id: 'EC-DISH-032',
    title: 'Dish Model is Null',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Critical',
    triggerCondition: 'DishModel not loaded or initialization failed',
    expectedBehavior: 'Bottom sheet returns null, button returns SizedBox.shrink',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Navigate back', 'Retry loading']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/dish_bottom_sheet.dart:32-33',
        'dish/widget/add_cart_buttom.dart:50-52'
      ],
      validationRules: ['dishModel == null || dishModel.id == null checks'],
    },
    relatedTestCases: ['TC-DISH-018']
  },

  // ============================================
  // PRICE & POINTS EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-033',
    title: 'Discounted Price Display',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Dish has oldPrice set and is greater than current price',
    expectedBehavior: 'Show old price with strikethrough, new price, and discount percentage',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/price_point_container.dart:82-170'
      ],
      validationRules: ['oldPrice != null && price < oldPrice', 'getOfferValue() calculates discount %'],
    },
    relatedTestCases: ['TC-DISH-028']
  },
  {
    id: 'EC-DISH-034',
    title: 'No Points Value',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Dish has no loyalty points defined (points is null or 0)',
    expectedBehavior: 'Do not display points information',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/price_point_container.dart:51-74'
      ],
      validationRules: ['getTotalPoint() != null && points != null check'],
    },
    relatedTestCases: ['TC-DISH-029']
  },
  {
    id: 'EC-DISH-035',
    title: 'Price Greater Than Old Price',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'oldPrice is set but price >= oldPrice (data error)',
    expectedBehavior: 'Do not show discount percentage, show empty SizedBox',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/price_point_container.dart:143-146'
      ],
      validationRules: ['price >= oldPrice returns SizedBox()'],
    },
    relatedTestCases: ['TC-DISH-028']
  },

  // ============================================
  // LOCALIZATION EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-036',
    title: 'RTL Layout (Arabic)',
    category: 'UI',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'UserManager.instance.lang == "ar"',
    expectedBehavior: 'Text alignment changes to right for Arabic',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/options_dish_widget.dart:420-423',
        'dish/widget/topping_widget.dart:209-216'
      ],
      validationRules: ['TextAlign.right for Arabic, TextAlign.left otherwise'],
    },
    relatedTestCases: ['TC-DISH-035']
  },
  {
    id: 'EC-DISH-037',
    title: 'Currency Symbol Position',
    category: 'UI',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'Different currencies may position symbol differently',
    expectedBehavior: 'Format price with SettingManager.getCurrency()',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/price_point_container.dart:40-41',
        'dish/widget/options_dish_widget.dart:432-433'
      ],
      validationRules: ['Use SettingManager.instance.getCurrency() for consistent formatting'],
    },
    relatedTestCases: ['TC-DISH-028']
  },

  // ============================================
  // SERVICE MODE EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-038',
    title: 'Service Mode - No Quantity Selector',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'isServices = true',
    expectedBehavior: 'Hide quantity selector in bottom sheet',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/dish_bottom_sheet.dart:37'
      ],
      validationRules: ['if(widget.isServices != true) show quantity selector'],
    },
    relatedTestCases: ['TC-DISH-031']
  },
  {
    id: 'EC-DISH-039',
    title: 'Service Mode - Different Cart Flow',
    category: 'State',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Adding service item to cart',
    expectedBehavior: 'Use addServiceToCart() or updateService() instead of regular cart methods',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/add_cart_buttom.dart:100-117'
      ],
      validationRules: ['isService == true triggers service-specific methods'],
    },
    relatedTestCases: ['TC-DISH-031']
  },

  // ============================================
  // SHARE FEATURE EDGE CASES
  // ============================================
  {
    id: 'EC-DISH-040',
    title: 'Share Feature Disabled',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'AppLinks.isShareEnabled = false or AppLinks.isInvite = false',
    expectedBehavior: 'Share button not shown in app bar',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: []
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/dish_page_appbar.dart:45-64'
      ],
      validationRules: ['if (AppLinks.isInvite && AppLinks.isShareEnabled)'],
    },
    relatedTestCases: ['TC-DISH-014']
  },
  {
    id: 'EC-DISH-041',
    title: 'Share Button Disabled During Loading',
    category: 'UI',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'viewModel.dataLoading = true',
    expectedBehavior: 'Share button is disabled (gray), onPressed is null',
    uiHandling: {
      errorMessage: '',
      recoveryOptions: ['Wait for data to load']
    },
    implementationNotes: {
      flutterFiles: [
        'dish/widget/dish_page_appbar.dart:51-62'
      ],
      validationRules: ['onPressed: viewModel.dataLoading ? null : ...'],
    },
    relatedTestCases: ['TC-DISH-014']
  }
];
