import type { UseCase } from '../types';

export const dishUseCases: UseCase[] = [
  // ============================================
  // NAVIGATION & LOADING USE CASES
  // ============================================
  {
    id: 'UC-DISH-001',
    title: 'View Dish from Restaurant Menu',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer navigates to dish details page from the restaurant menu to view dish information and customize their order.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant is online',
      'Dish is available'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on a dish item from the menu',
        expectedResult: 'Navigation to DishPageView is triggered',
        uiState: 'Menu item shows tap feedback',
        flutterFile: 'menu_restaurant/view/menu_restaurant_view.dart'
      },
      {
        step: 2,
        action: 'System initializes DishPageViewModel',
        expectedResult: 'ViewModel is created with dish data, services initialized',
        uiState: 'Loading indicator may appear briefly',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:157-166'
      },
      {
        step: 3,
        action: 'System calls initDish() with dish model',
        expectedResult: 'If withData=true, fetches full dish details from API',
        uiState: 'BeeLoaderWidget displayed while loading',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:289-371'
      },
      {
        step: 4,
        action: 'System initializes cart with dish data',
        expectedResult: 'Cart controller initialized, default options pre-selected',
        uiState: 'Full dish page displayed with image, title, options, toppings',
        flutterFile: 'dish/view/dish_page_view.dart:228-231'
      }
    ],
    postconditions: [
      'Dish details are displayed',
      'Default options are pre-selected (if isDefault=1)',
      'Total price is calculated',
      'Favorite status is loaded'
    ],
    successCriteria: [
      'Dish image, name, description, price displayed correctly',
      'Options and toppings sections rendered if available',
      'Bottom sheet with quantity selector and add to cart button visible'
    ],
    relatedTestCases: ['TC-DISH-001', 'TC-DISH-002']
  },
  {
    id: 'UC-DISH-002',
    title: 'Access Dish via Deep Link',
    priority: 'High',
    userType: 'End User',
    description: 'Customer opens a shared dish link from outside the app, launching directly to the dish page.',
    preconditions: [
      'User has received a deep link (https://beeorder.com/app?screen=dish&dd={dishId})',
      'App is installed on device'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on shared deep link',
        expectedResult: 'DeepLinkManager captures the link parameters',
        uiState: 'App launches or comes to foreground',
        flutterFile: 'core/manager/deep_link_manager.dart'
      },
      {
        step: 2,
        action: 'System parses screen=dish and dd={dishId}',
        expectedResult: 'DeepLinkManager.screen set to "dish", param set to dishId',
        uiState: 'Splash or loading screen shown',
        flutterFile: 'dish/view/dish_page_view.dart:91-99'
      },
      {
        step: 3,
        action: 'System fetches dish details using dishId',
        expectedResult: 'DishService.fetchDish() called with parsed ID',
        uiState: 'Loading indicator shown',
        flutterFile: 'dish/services/dish_service.dart:47-66'
      },
      {
        step: 4,
        action: 'System initializes restaurant from dish data',
        expectedResult: 'Restaurant context created from dish.restaurantId',
        uiState: 'Full dish page displayed',
        flutterFile: 'dish/view/dish_page_view.dart:217-226'
      }
    ],
    postconditions: [
      'User sees dish from shared link',
      'DeepLinkManager.fromLaunch is true',
      'Back button navigates to splash (not back in stack)'
    ],
    successCriteria: [
      'Dish loads successfully from deep link',
      'Restaurant context is properly initialized',
      'User can add dish to cart and continue ordering'
    ],
    relatedTestCases: ['TC-DISH-002', 'TC-DISH-027']
  },
  {
    id: 'UC-DISH-003',
    title: 'View Dish from Home Feed (Trending)',
    priority: 'High',
    userType: 'End User',
    description: 'Customer accesses a dish from the home feed or trending section without being in a restaurant context.',
    preconditions: [
      'User is on home/trending page',
      'Dish is displayed in feed'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on dish in home feed',
        expectedResult: 'Navigation with fromHome=true flag',
        uiState: 'Dish card shows tap feedback',
        flutterFile: 'home_feed/home_feed_view_page/view/home_feed_view.dart'
      },
      {
        step: 2,
        action: 'System clears any existing cart data',
        expectedResult: 'cartController.clearCurrentData() called because not fromHome context',
        uiState: 'Transition to dish page',
        flutterFile: 'dish/view/dish_page_view.dart:203-205'
      },
      {
        step: 3,
        action: 'System creates restaurant context from dish model',
        expectedResult: 'RestaurantModel created with id, name, logo from dish',
        uiState: 'Restaurant logo visible in app bar',
        flutterFile: 'dish/view/dish_page_view.dart:217-226'
      },
      {
        step: 4,
        action: 'System sets isFromTrending flag',
        expectedResult: 'myCartViewModel.isFromTrending = true',
        uiState: 'Cart prepared for new order flow',
        flutterFile: 'dish/view/dish_page_view.dart:229'
      }
    ],
    postconditions: [
      'Dish displayed with restaurant context',
      'After add to cart, navigates to restaurant menu (not back)',
      'Cart is initialized fresh'
    ],
    successCriteria: [
      'Dish loads from home feed context',
      'Restaurant info displayed correctly',
      'Add to cart redirects to restaurant menu'
    ],
    relatedTestCases: ['TC-DISH-003', 'TC-DISH-015']
  },
  {
    id: 'UC-DISH-004',
    title: 'Edit Existing Cart Item',
    priority: 'High',
    userType: 'End User',
    description: 'Customer modifies an item already in their cart by accessing the dish page from the cart.',
    preconditions: [
      'User has items in cart',
      'User is viewing cart page'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps edit on cart item',
        expectedResult: 'Navigation with cartObject populated',
        uiState: 'Cart item shows edit option',
        flutterFile: 'cart/cart_page/view/cart_view.dart'
      },
      {
        step: 2,
        action: 'System loads dish with existing selections',
        expectedResult: 'Options and toppings pre-selected from cartObject',
        uiState: 'Dish shows with previous customizations',
        flutterFile: 'dish/view/dish_page_view.dart:53'
      },
      {
        step: 3,
        action: 'System sets quantity from cart item',
        expectedResult: 'quantity matches cartObject.quantity',
        uiState: 'Quantity selector shows existing value',
        flutterFile: 'dish/view/dish_page_view.dart:56'
      },
      {
        step: 4,
        action: 'User modifies selections and taps "Edit Cart"',
        expectedResult: 'myCartViewModel.updateCart() called instead of addToCart',
        uiState: 'Button shows "Edit Cart" instead of "Add to Cart"',
        flutterFile: 'dish/widget/add_cart_buttom.dart:56-57'
      }
    ],
    postconditions: [
      'Cart item is updated with new selections',
      'Navigation returns to cart view',
      'Total is recalculated'
    ],
    successCriteria: [
      'Existing selections are pre-loaded',
      'Changes are saved correctly',
      'Cart total updates accurately'
    ],
    relatedTestCases: ['TC-DISH-015', 'TC-DISH-016']
  },

  // ============================================
  // OPTIONS SELECTION USE CASES
  // ============================================
  {
    id: 'UC-DISH-005',
    title: 'Select Required Option',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer must select from required options (e.g., size, type) before adding dish to cart.',
    preconditions: [
      'Dish has options defined',
      'User is on dish page'
    ],
    steps: [
      {
        step: 1,
        action: 'System displays option groups with radio buttons',
        expectedResult: 'Each option group shown with name and required indicator',
        uiState: '"Required" badge shown in red if not selected',
        flutterFile: 'dish/widget/options_dish_widget.dart:154-206'
      },
      {
        step: 2,
        action: 'User taps on an option choice',
        expectedResult: '_handleOptionSelection() triggered',
        uiState: 'Radio button fills, selection highlighted',
        flutterFile: 'dish/widget/options_dish_widget.dart:247-278'
      },
      {
        step: 3,
        action: 'System updates selectedOptions map',
        expectedResult: 'myCartViewModel.changeOption() and viewModel.changeOption() called',
        uiState: 'Required badge disappears, option shows selected',
        flutterFile: 'dish/widget/options_dish_widget.dart:262-263'
      },
      {
        step: 4,
        action: 'System recalculates price',
        expectedResult: 'calculatePrice() includes option price modifier',
        uiState: 'Total price updates in bottom sheet',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:384-420'
      }
    ],
    postconditions: [
      'Option is saved to selectedOptions',
      'Required indicator removed',
      'Price includes option modifier'
    ],
    successCriteria: [
      'Only one option per group can be selected',
      'Price updates immediately',
      'Selection persists until changed'
    ],
    relatedTestCases: ['TC-DISH-003', 'TC-DISH-004']
  },
  {
    id: 'UC-DISH-006',
    title: 'Auto-Scroll to Missing Required Option',
    priority: 'High',
    userType: 'End User',
    description: 'When user tries to add to cart without selecting all required options, system scrolls to first missing option.',
    preconditions: [
      'Dish has required options',
      'Not all options are selected',
      'User taps Add to Cart'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps Add to Cart button',
        expectedResult: 'checkToppingOptionsAvaliblity() returns 0 (option missing)',
        uiState: 'Button tap initiated',
        flutterFile: 'dish/widget/add_cart_buttom.dart:89-94'
      },
      {
        step: 2,
        action: 'System identifies first unselected required option',
        expectedResult: 'scrollToSpecificOption() called',
        uiState: 'Page begins scrolling animation',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:170-200'
      },
      {
        step: 3,
        action: 'System scrolls to option group position',
        expectedResult: 'ScrollController animates to target offset with 100.h padding',
        uiState: 'Smooth scroll animation (600ms, easeInOutCubic)',
        flutterFile: 'dish/widget/options_dish_widget.dart:60-98'
      },
      {
        step: 4,
        action: 'System highlights the required option',
        expectedResult: 'Option container shows red border and highlight',
        uiState: 'Option group pulses red, "Required" badge emphasized',
        flutterFile: 'dish/widget/options_dish_widget.dart:169-205'
      }
    ],
    postconditions: [
      'Dish not added to cart',
      'User can see the required option',
      'Highlight removed after selection or timeout'
    ],
    successCriteria: [
      'Scroll animation is smooth',
      'Correct option is highlighted',
      'User understands what action is needed'
    ],
    relatedTestCases: ['TC-DISH-011', 'TC-DISH-021']
  },
  {
    id: 'UC-DISH-007',
    title: 'Pre-Select Default Option',
    priority: 'Medium',
    userType: 'System',
    description: 'When dish loads, system automatically selects options marked as default (isDefault=1).',
    preconditions: [
      'Dish has options with isDefault=1 set',
      'Dish page is loading'
    ],
    steps: [
      {
        step: 1,
        action: 'System calls initDish() during page load',
        expectedResult: 'Iterates through dish.options',
        uiState: 'Options loading',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:335-357'
      },
      {
        step: 2,
        action: 'System finds option.opts with isDefault==1',
        expectedResult: 'firstWhereOrNull finds default option',
        uiState: 'Processing default selections',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:348-356'
      },
      {
        step: 3,
        action: 'System sets selectedOptions[option.name] = defaultOpt',
        expectedResult: 'Default option stored in selection map',
        uiState: 'Option appears pre-selected',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:352-355'
      },
      {
        step: 4,
        action: 'System calculates initial price with default',
        expectedResult: 'Price includes default option price modifier',
        uiState: 'Total shows correct initial price',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:384-420'
      }
    ],
    postconditions: [
      'Default options are selected on load',
      'User can change selection if desired',
      'Price reflects default option cost'
    ],
    successCriteria: [
      'All default options are pre-selected',
      'Radio button shows selected state',
      'No "Required" badge for pre-selected options'
    ],
    relatedTestCases: ['TC-DISH-022']
  },

  // ============================================
  // TOPPINGS USE CASES
  // ============================================
  {
    id: 'UC-DISH-008',
    title: 'Add Topping to Dish',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer adds optional toppings/extras to customize their dish.',
    preconditions: [
      'Dish has toppings available',
      'User is on dish page'
    ],
    steps: [
      {
        step: 1,
        action: 'System displays toppings grouped by groupId',
        expectedResult: 'Toppings organized by group with name, min/max labels',
        uiState: 'Topping groups visible with +/check buttons',
        flutterFile: 'dish/widget/topping_widget.dart:18-33'
      },
      {
        step: 2,
        action: 'User taps + button on topping',
        expectedResult: 'myCartViewModel.addTopping() called',
        uiState: 'Button changes from + to checkmark',
        flutterFile: 'dish/widget/topping_widget.dart:258-287'
      },
      {
        step: 3,
        action: 'System validates against selectLimit',
        expectedResult: 'If limit not exceeded, topping added to selectedToppings',
        uiState: 'Topping shows selected state',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart'
      },
      {
        step: 4,
        action: 'System updates price with topping cost',
        expectedResult: 'totalPrice += topping.price * quantity',
        uiState: 'Bottom sheet price updates',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:390-395'
      }
    ],
    postconditions: [
      'Topping added to selection',
      'Price includes topping cost',
      'Required topping indicator may clear'
    ],
    successCriteria: [
      'Topping selection persists',
      'Multiple toppings can be selected within limits',
      'Price calculation is accurate'
    ],
    relatedTestCases: ['TC-DISH-005', 'TC-DISH-006']
  },
  {
    id: 'UC-DISH-009',
    title: 'Remove Topping from Dish',
    priority: 'High',
    userType: 'End User',
    description: 'Customer removes a previously added topping from their order.',
    preconditions: [
      'Topping has been selected',
      'User is on dish page'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps checkmark on selected topping',
        expectedResult: 'isSelected detected as true, remove flow triggered',
        uiState: 'Topping button shows checkmark (selected)',
        flutterFile: 'dish/widget/topping_widget.dart:259-262'
      },
      {
        step: 2,
        action: 'System calls myCartViewModel.removeTopping()',
        expectedResult: 'Topping removed from selectedToppings list',
        uiState: 'Button changes from checkmark to +',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:455-458'
      },
      {
        step: 3,
        action: 'System recalculates price',
        expectedResult: 'totalPrice -= topping.price * quantity',
        uiState: 'Price decreases in bottom sheet',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:384-420'
      }
    ],
    postconditions: [
      'Topping removed from selection',
      'Price updated accordingly',
      'Required indicator may reappear if min not met'
    ],
    successCriteria: [
      'Topping is fully removed',
      'UI reflects deselected state',
      'Price is accurate'
    ],
    relatedTestCases: ['TC-DISH-006']
  },
  {
    id: 'UC-DISH-010',
    title: 'Topping Limit Validation',
    priority: 'High',
    userType: 'End User',
    description: 'System prevents adding more toppings than the selectLimit allows for a topping group.',
    preconditions: [
      'Topping group has selectLimit defined',
      'User has selected selectLimit number of toppings',
      'User tries to add another topping from same group'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps + on another topping in same group',
        expectedResult: 'addTopping() checks count against selectLimit',
        uiState: 'Tap initiated',
        flutterFile: 'dish/widget/topping_widget.dart:264-268'
      },
      {
        step: 2,
        action: 'System detects limit would be exceeded',
        expectedResult: 'addTopping() returns true (indicating limit reached)',
        uiState: 'No visual change to topping',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart'
      },
      {
        step: 3,
        action: 'System shows limit message dialog',
        expectedResult: 'showMessageDialog with "you_cant_select_more_than {limit}"',
        uiState: 'Alert dialog appears',
        flutterFile: 'dish/widget/topping_widget.dart:269-276'
      }
    ],
    postconditions: [
      'New topping NOT added',
      'User informed of limit',
      'Existing selections preserved'
    ],
    successCriteria: [
      'Limit is enforced correctly',
      'Message is clear and localized',
      'User can still deselect and reselect'
    ],
    relatedTestCases: ['TC-DISH-024']
  },
  {
    id: 'UC-DISH-011',
    title: 'Required Topping Validation',
    priority: 'High',
    userType: 'End User',
    description: 'System enforces minimum topping selection (selectMin) before allowing add to cart.',
    preconditions: [
      'Topping group has selectMin > 0',
      'User has not selected minimum toppings',
      'User taps Add to Cart'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps Add to Cart',
        expectedResult: 'checkToppingOptionsAvaliblity() checks topping minimums',
        uiState: 'Button tap initiated',
        flutterFile: 'dish/widget/add_cart_buttom.dart:89-98'
      },
      {
        step: 2,
        action: 'System finds topping group below minimum',
        expectedResult: 'Returns groupId of first failing group',
        uiState: 'Add to cart blocked',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart'
      },
      {
        step: 3,
        action: 'System scrolls to topping group',
        expectedResult: 'scrollToSpecificTopping(groupId) called',
        uiState: 'Page scrolls to topping section',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:104-123'
      },
      {
        step: 4,
        action: 'System highlights required topping group',
        expectedResult: 'Group shows "Required" badge in red',
        uiState: 'Topping group visually emphasized',
        flutterFile: 'dish/widget/topping_widget.dart:117-152'
      }
    ],
    postconditions: [
      'Dish not added to cart',
      'User sees required topping group',
      'Can complete selection and retry'
    ],
    successCriteria: [
      'Minimum is enforced correctly',
      'Scroll targets correct group',
      'Required indicator is visible'
    ],
    relatedTestCases: ['TC-DISH-023']
  },

  // ============================================
  // QUANTITY USE CASES
  // ============================================
  {
    id: 'UC-DISH-012',
    title: 'Increment Quantity',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer increases the quantity of the dish they want to order.',
    preconditions: [
      'User is on dish page',
      'Bottom sheet is visible'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps + button in quantity selector',
        expectedResult: 'myCartViewModel.incrementQuantity() called',
        uiState: 'Plus button tapped',
        flutterFile: 'dish/widget/quantity_selector_widget.dart:75-77'
      },
      {
        step: 2,
        action: 'System checks inventory limit (if defined)',
        expectedResult: 'isOverQuantity() returns false if under limit',
        uiState: 'Quantity increases by 1',
        flutterFile: 'dish/widget/quantity_selector_widget.dart:65-74'
      },
      {
        step: 3,
        action: 'System updates quantity and recalculates',
        expectedResult: 'quantity += 1, calculatePrice() called',
        uiState: 'Number display updates, price updates',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:431-434'
      }
    ],
    postconditions: [
      'Quantity increased by 1',
      'Total price = base price * quantity',
      'Points = base points * quantity'
    ],
    successCriteria: [
      'Quantity updates immediately',
      'Price calculation is accurate',
      'Visual feedback on button press'
    ],
    relatedTestCases: ['TC-DISH-007']
  },
  {
    id: 'UC-DISH-013',
    title: 'Decrement Quantity (with minimum)',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer decreases quantity, but cannot go below minimum of 1.',
    preconditions: [
      'User is on dish page',
      'Quantity is >= 1'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps - button in quantity selector',
        expectedResult: 'myCartViewModel.decrementQuantity() called',
        uiState: 'Minus button tapped',
        flutterFile: 'dish/widget/quantity_selector_widget.dart:23-27'
      },
      {
        step: 2,
        action: 'System enforces minimum of 1',
        expectedResult: 'quantity = max(1, quantity - 1)',
        uiState: 'If qty=1, stays at 1',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:436-440'
      },
      {
        step: 3,
        action: 'System recalculates price',
        expectedResult: 'calculatePrice() updates total',
        uiState: 'Price decreases (unless at minimum)',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:384-420'
      }
    ],
    postconditions: [
      'Quantity decreased or stays at 1',
      'Cannot order zero quantity',
      'Price reflects new quantity'
    ],
    successCriteria: [
      'Minimum of 1 enforced',
      'Minus button may appear disabled at qty=1',
      'Price is accurate'
    ],
    relatedTestCases: ['TC-DISH-008']
  },
  {
    id: 'UC-DISH-014',
    title: 'Quantity Inventory Limit',
    priority: 'High',
    userType: 'End User',
    description: 'System prevents ordering more than available inventory (dish.quantity).',
    preconditions: [
      'Dish has quantity limit defined (dish.quantity != null)',
      'User is increasing quantity'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps + button',
        expectedResult: 'isOverQuantity() check performed',
        uiState: 'Plus button tapped',
        flutterFile: 'dish/widget/quantity_selector_widget.dart:65-74'
      },
      {
        step: 2,
        action: 'System compares new qty against dish.quantity + existing cart qty',
        expectedResult: 'Accounts for items already in cart for this dish',
        uiState: 'Validation runs',
        flutterFile: 'dish/widget/add_cart_buttom.dart:60-70'
      },
      {
        step: 3,
        action: 'If at limit, increment blocked',
        expectedResult: 'Function returns early, no quantity change',
        uiState: 'Plus button appears gray/disabled',
        flutterFile: 'dish/widget/quantity_selector_widget.dart:49-63'
      }
    ],
    postconditions: [
      'Cannot exceed inventory',
      'Existing cart quantity considered',
      'User sees visual indication of limit'
    ],
    successCriteria: [
      'Inventory limit respected',
      'Plus button disabled when at limit',
      'Error message may be shown'
    ],
    relatedTestCases: ['TC-DISH-025']
  },

  // ============================================
  // CART ACTIONS USE CASES
  // ============================================
  {
    id: 'UC-DISH-015',
    title: 'Add Dish to Cart',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer completes customization and adds the configured dish to their cart.',
    preconditions: [
      'All required options selected',
      'All required toppings selected',
      'Quantity >= 1',
      'User taps Add to Cart button'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps "Add to Cart" button',
        expectedResult: 'Button onPressed triggered',
        uiState: 'Button shows loading or feedback',
        flutterFile: 'dish/widget/add_cart_buttom.dart:88-175'
      },
      {
        step: 2,
        action: 'System validates options and toppings',
        expectedResult: 'checkToppingOptionsAvaliblity() returns -1 (all valid)',
        uiState: 'Validation passes',
        flutterFile: 'dish/widget/add_cart_buttom.dart:89-98'
      },
      {
        step: 3,
        action: 'System adds dish to cart',
        expectedResult: 'myCartViewModel.addToCart(dishModel) creates cart item',
        uiState: 'Cart updated',
        flutterFile: 'dish/widget/add_cart_buttom.dart:112-114'
      },
      {
        step: 4,
        action: 'System checks restaurant status',
        expectedResult: 'If offline and not busy, show toast warning',
        uiState: 'Toast: "Restaurant is offline"',
        flutterFile: 'dish/widget/add_cart_buttom.dart:125-137'
      },
      {
        step: 5,
        action: 'System navigates appropriately',
        expectedResult: 'If fromHome, go to restaurant menu; else pop back',
        uiState: 'Navigation occurs',
        flutterFile: 'dish/widget/add_cart_buttom.dart:145-172'
      }
    ],
    postconditions: [
      'Dish with selections added to cart',
      'Cart total updated',
      'User returned to appropriate screen'
    ],
    successCriteria: [
      'Cart item contains all selections',
      'Quantity is correct',
      'Price matches what was displayed'
    ],
    relatedTestCases: ['TC-DISH-010', 'TC-DISH-011']
  },
  {
    id: 'UC-DISH-016',
    title: 'Add Special Note',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer adds special instructions or notes to their order (e.g., "no onions please").',
    preconditions: [
      'User is on dish page',
      'Notes section is visible'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on notes text field',
        expectedResult: 'Keyboard opens, focus on field',
        uiState: 'Text field becomes active',
        flutterFile: 'dish/widget/dish_note_widget.dart:15-33'
      },
      {
        step: 2,
        action: 'User types special instructions',
        expectedResult: 'myCartViewModel.selectedNote updated',
        uiState: 'Text appears in field',
        flutterFile: 'dish/widget/dish_note_widget.dart:19'
      },
      {
        step: 3,
        action: 'User dismisses keyboard',
        expectedResult: 'Note saved to cart controller',
        uiState: 'Keyboard dismissed, note visible',
        flutterFile: 'dish/view/dish_page_view.dart:82-85'
      }
    ],
    postconditions: [
      'Note saved with cart item',
      'Note visible in cart view',
      'Note sent with order to restaurant'
    ],
    successCriteria: [
      'Note persists after leaving page',
      'Note included in order',
      'Placeholder text is helpful'
    ],
    relatedTestCases: ['TC-DISH-009']
  },

  // ============================================
  // FAVORITES & SHARING USE CASES
  // ============================================
  {
    id: 'UC-DISH-017',
    title: 'Toggle Favorite Status',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer marks or unmarks a dish as favorite for quick access later.',
    preconditions: [
      'User is on dish page',
      'User is logged in'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps heart icon in app bar',
        expectedResult: 'updateFavouriteStatus() called',
        uiState: 'Heart icon tapped',
        flutterFile: 'dish/widget/dish_page_appbar.dart:31-43'
      },
      {
        step: 2,
        action: 'System optimistically updates UI',
        expectedResult: 'isFav toggled immediately (_changeFavState)',
        uiState: 'Heart fills/unfills instantly',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:466-468'
      },
      {
        step: 3,
        action: 'System sends API request',
        expectedResult: 'dishService.updateDishFave() called',
        uiState: 'Network request in background',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:471-483'
      },
      {
        step: 4,
        action: 'If API fails, revert UI',
        expectedResult: 'isFav toggled back on failure',
        uiState: 'Heart returns to previous state',
        flutterFile: 'dish/viewmodel/dish_page_viewmodel.dart:480-482'
      }
    ],
    postconditions: [
      'Favorite status persisted to server',
      'UI reflects final state',
      'Dish appears/disappears from favorites list'
    ],
    successCriteria: [
      'Optimistic UI provides instant feedback',
      'API failure reverts correctly',
      'Favorites list is updated'
    ],
    relatedTestCases: ['TC-DISH-013', 'TC-DISH-026']
  },
  {
    id: 'UC-DISH-018',
    title: 'Share Dish via Deep Link',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer shares a dish with friends via generated deep link.',
    preconditions: [
      'User is on dish page',
      'Share feature is enabled (AppLinks.isShareEnabled)',
      'Invite feature is enabled (AppLinks.isInvite)'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps share icon in app bar',
        expectedResult: 'Share.share() called with deep link',
        uiState: 'Share sheet appears',
        flutterFile: 'dish/widget/dish_page_appbar.dart:45-64'
      },
      {
        step: 2,
        action: 'System generates deep link URL',
        expectedResult: 'URL: https://beeorder.com/app?screen=dish&dd={dishId}',
        uiState: 'URL prepared for sharing',
        flutterFile: 'dish/widget/dish_page_appbar.dart:55-57'
      },
      {
        step: 3,
        action: 'System opens native share sheet',
        expectedResult: 'Device share options displayed',
        uiState: 'User can choose app to share via',
        flutterFile: 'dish/widget/dish_page_appbar.dart:54-58'
      }
    ],
    postconditions: [
      'Link can be opened by recipient',
      'Link contains dish ID',
      'Share analytics may be logged'
    ],
    successCriteria: [
      'Link is valid and functional',
      'Share button disabled during loading',
      'All share options available'
    ],
    relatedTestCases: ['TC-DISH-014']
  },

  // ============================================
  // SPECIAL MODE USE CASES
  // ============================================
  {
    id: 'UC-DISH-019',
    title: 'Add Service to Cart (Service Mode)',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer adds a service item (not a dish) to cart with different handling.',
    preconditions: [
      'Dish is marked as service (isServices=true)',
      'User is on dish page in service context'
    ],
    steps: [
      {
        step: 1,
        action: 'System detects isService=true',
        expectedResult: 'Quantity selector hidden',
        uiState: 'No quantity controls shown',
        flutterFile: 'dish/widget/dish_bottom_sheet.dart:37'
      },
      {
        step: 2,
        action: 'User taps Add to Cart',
        expectedResult: 'myCartViewModel.addServiceToCart() called',
        uiState: 'Service added flow',
        flutterFile: 'dish/widget/add_cart_buttom.dart:100-109'
      },
      {
        step: 3,
        action: 'System sets restaurant name from model',
        expectedResult: 'dishModel.restaurantName assigned',
        uiState: 'Cart shows correct restaurant',
        flutterFile: 'dish/widget/add_cart_buttom.dart:104-106'
      },
      {
        step: 4,
        action: 'Navigation returns and resets quantity',
        expectedResult: 'Pop and reset selectedQuantity to 1',
        uiState: 'Return to previous screen',
        flutterFile: 'dish/widget/add_cart_buttom.dart:142-144'
      }
    ],
    postconditions: [
      'Service added to cart',
      'Different cart handling than regular dishes',
      'Quantity reset for next item'
    ],
    successCriteria: [
      'Service appears in cart correctly',
      'Price is service price',
      'No quantity manipulation for services'
    ],
    relatedTestCases: ['TC-DISH-031']
  },
  {
    id: 'UC-DISH-020',
    title: 'Vending Machine Mode',
    priority: 'Medium',
    userType: 'End User',
    description: 'Special handling when dish is from a vending machine restaurant.',
    preconditions: [
      'Restaurant has isVending=true',
      'User is on dish page'
    ],
    steps: [
      {
        step: 1,
        action: 'System checks isVending flag',
        expectedResult: 'Special UI/flow enabled for vending',
        uiState: 'Bottom sheet visible (even for dine-in)',
        flutterFile: 'dish/view/dish_page_view.dart:114-115'
      },
      {
        step: 2,
        action: 'User adds to cart',
        expectedResult: 'Standard add to cart flow',
        uiState: 'Cart updated',
        flutterFile: 'dish/widget/add_cart_buttom.dart:158-163'
      },
      {
        step: 3,
        action: 'After add, navigation differs',
        expectedResult: 'If isGrid or new cart, pop; else go to cart view',
        uiState: 'Navigate based on context',
        flutterFile: 'dish/widget/add_cart_buttom.dart:157-170'
      }
    ],
    postconditions: [
      'Vending machine order processed',
      'Special navigation flow',
      'Bottom sheet always visible'
    ],
    successCriteria: [
      'Vending mode detected correctly',
      'UI adapts appropriately',
      'Order can be completed'
    ],
    relatedTestCases: ['TC-DISH-032']
  },

  // ============================================
  // NAVIGATION USE CASES
  // ============================================
  {
    id: 'UC-DISH-021',
    title: 'Navigate to Restaurant from Dish',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer taps restaurant logo/name to view full restaurant menu.',
    preconditions: [
      'User is on dish page',
      'Restaurant information available'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps restaurant logo/name in app bar',
        expectedResult: 'onTap triggered on LogoContainer',
        uiState: 'Tap feedback on logo',
        flutterFile: 'dish/widget/dish_page_appbar.dart:66-77'
      },
      {
        step: 2,
        action: 'System checks fromRestaurant flag',
        expectedResult: 'If true, simple pop; else push restaurant menu',
        uiState: 'Navigation decision',
        flutterFile: 'dish/widget/dish_page_appbar.dart:70-77'
      },
      {
        step: 3,
        action: 'System navigates to restaurant menu',
        expectedResult: 'popAndPushNamed to REST_MENU_VIEW with restaurant ID',
        uiState: 'Restaurant menu displayed',
        flutterFile: 'dish/widget/dish_page_appbar.dart:72-76'
      }
    ],
    postconditions: [
      'User is on restaurant menu page',
      'Can browse other dishes',
      'Cart preserved'
    ],
    successCriteria: [
      'Navigation works correctly',
      'Restaurant loaded properly',
      'Cart items maintained'
    ],
    relatedTestCases: ['TC-DISH-017']
  },
  {
    id: 'UC-DISH-022',
    title: 'Report Issue for Dish',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer reports a problem with the dish (wrong info, allergens, etc.).',
    preconditions: [
      'User is on dish page',
      'Report feature enabled (SettingManager.showReport=true)'
    ],
    steps: [
      {
        step: 1,
        action: 'User scrolls to report section',
        expectedResult: 'DishReportWidget visible at bottom',
        uiState: 'Report card with arrow visible',
        flutterFile: 'dish/view/dish_page_view.dart:183-187'
      },
      {
        step: 2,
        action: 'User taps report card',
        expectedResult: 'Navigation to ReportIssueScreen',
        uiState: 'Report form opens',
        flutterFile: 'dish/view/dish_page_view.dart:252-260'
      },
      {
        step: 3,
        action: 'System passes dish and restaurant info',
        expectedResult: 'dishModel and restId passed to report screen',
        uiState: 'Report pre-filled with dish context',
        flutterFile: 'dish/view/dish_page_view.dart:257-258'
      }
    ],
    postconditions: [
      'User can submit issue report',
      'Report includes dish context',
      'Can return to dish after reporting'
    ],
    successCriteria: [
      'Report feature visible when enabled',
      'Navigation successful',
      'Dish info passed correctly'
    ],
    relatedTestCases: ['TC-DISH-017']
  },

  // ============================================
  // UI INTERACTION USE CASES
  // ============================================
  {
    id: 'UC-DISH-023',
    title: 'Zoom Dish Image',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer taps on dish image to view full-size zoomable version.',
    preconditions: [
      'User is on dish page',
      'Dish has image'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on dish cover image',
        expectedResult: 'WidgetZoom activated',
        uiState: 'Image becomes interactive',
        flutterFile: 'dish/widget/cover_dish_widget.dart:17-27'
      },
      {
        step: 2,
        action: 'System shows hero animation',
        expectedResult: 'heroAnimationTag used for smooth transition',
        uiState: 'Image animates to fullscreen',
        flutterFile: 'dish/widget/cover_dish_widget.dart:18-19'
      },
      {
        step: 3,
        action: 'User can pinch to zoom',
        expectedResult: 'widget_zoom package handles zoom gestures',
        uiState: 'Image scales with pinch',
        flutterFile: 'dish/widget/cover_dish_widget.dart'
      }
    ],
    postconditions: [
      'User can inspect dish visually',
      'Can return to normal view',
      'Image loads in full resolution'
    ],
    successCriteria: [
      'Zoom is smooth',
      'Hero animation works',
      'Back gesture dismisses zoom'
    ],
    relatedTestCases: ['TC-DISH-030']
  },
  {
    id: 'UC-DISH-024',
    title: 'Keyboard Handling',
    priority: 'Low',
    userType: 'End User',
    description: 'System handles keyboard appearance/disappearance properly when editing notes.',
    preconditions: [
      'User is on dish page',
      'User taps on notes field'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps notes field',
        expectedResult: 'Keyboard opens',
        uiState: 'Bottom sheet may be obscured',
        flutterFile: 'dish/widget/dish_note_widget.dart'
      },
      {
        step: 2,
        action: 'System checks viewInsets.bottom',
        expectedResult: 'If keyboard open, hide add cart button',
        uiState: 'AddCartButton returns SizedBox.shrink()',
        flutterFile: 'dish/widget/add_cart_buttom.dart:49-53'
      },
      {
        step: 3,
        action: 'User taps outside to dismiss keyboard',
        expectedResult: 'GestureDetector unfocuses',
        uiState: 'Keyboard dismissed, button reappears',
        flutterFile: 'dish/view/dish_page_view.dart:82-85'
      }
    ],
    postconditions: [
      'Keyboard doesn\'t overlap add button',
      'User can still add to cart after typing',
      'UI remains usable'
    ],
    successCriteria: [
      'Button hidden when keyboard open',
      'Tap outside dismisses keyboard',
      'resizeToAvoidBottomInset works'
    ],
    relatedTestCases: ['TC-DISH-033']
  }
];
