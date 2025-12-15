import type { EdgeCase } from '../types';

export const menuRestaurantEdgeCases: EdgeCase[] = [
  {
    id: 'EC-MENU-REST-001',
    title: 'Menu Load Failure - Network Error',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Critical',
    triggerCondition: 'Network request to fetchRestaurantMenu() throws Exception',
    expectedBehavior: 'App catches exception, shows error message to user, and allows retry. Menu does not load.',
    uiHandling: {
      errorMessage: 'Exception message from server (e.toString())',
      recoveryOptions: [
        'User can retry by pulling to refresh',
        'User can go back and try again',
        'User can check internet connection'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/service/menu_restaurant_service.dart:194-196'],
      validationRules: ['All API calls wrapped in try-catch'],
      apiErrorCodes: ['Network timeout', 'Connection refused', '500 Internal Server Error']
    },
    relatedTestCases: ['TC-MENU-REST-017']
  },
  {
    id: 'EC-MENU-REST-002',
    title: 'Empty Menu Categories',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'Menu response contains categories with no dishes and no sub-menus (sub.dishes == null && sub.subMenus == null)',
    expectedBehavior: 'Empty categories are filtered out and not displayed to user. Only categories with content are shown.',
    uiHandling: {
      errorMessage: 'No error message - empty categories are silently hidden',
      recoveryOptions: [
        'User sees only categories with dishes',
        'If all categories empty, user sees empty state'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'menu_restaurant/view/market_view/market_view.dart:107-108',
        'menu_restaurant/model/sub_menu_model.dart:24-38'
      ],
      validationRules: ['Categories checked for isEmptySubMenu() and isEmptySubMenus()']
    },
    relatedTestCases: ['TC-MENU-REST-018']
  },
  {
    id: 'EC-MENU-REST-003',
    title: 'Guest User Reaches Dish Limit',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User not logged in AND total dishes viewed >= maxDishes (allowedRestaurantDishesCountForGuest or allowedMarketDishesCountForGuest)',
    expectedBehavior: 'App stops adding dishes to allowedDishesInGuestMode list once limit reached. Shows "Login to see more" message.',
    uiHandling: {
      errorMessage: '"Login to see more" message displayed (showLoginToSeeMore = true)',
      recoveryOptions: [
        'User can log in to see all dishes',
        'User can continue with limited dish view'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:265-321'],
      validationRules: [
        'maxDishes set based on restaurant type and login status',
        'Dish count tracked in total variable',
        'Only dishes within limit added to allowedDishesInGuestMode'
      ]
    },
    relatedTestCases: ['TC-MENU-REST-015']
  },
  {
    id: 'EC-MENU-REST-004',
    title: 'Favorite Update Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'updatedFavouriteRestaurant() API call returns success = false or throws Exception',
    expectedBehavior: 'App reverts favorite icon state to previous value. User sees favorite icon return to original state.',
    uiHandling: {
      errorMessage: 'No error message shown - state is silently reverted',
      recoveryOptions: [
        'User can try tapping favorite again',
        'User can check internet connection'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:381-383'],
      validationRules: ['Optimistic update with rollback on failure']
    },
    relatedTestCases: ['TC-MENU-REST-010']
  },
  {
    id: 'EC-MENU-REST-005',
    title: 'User Not Logged In When Adding Favorite',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'User taps favorite icon AND UserManager.instance.isLoggedIn() returns false',
    expectedBehavior: 'App shows login dialog with message "please_loggin". Favorite state does not change.',
    uiHandling: {
      errorMessage: '"please_loggin".locale',
      recoveryOptions: [
        'User can tap "Login Now" to go to login screen',
        'User can dismiss dialog and continue browsing'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:366-369'],
      validationRules: ['Login check before API call']
    },
    relatedTestCases: ['TC-MENU-REST-010']
  },
  {
    id: 'EC-MENU-REST-006',
    title: 'Pickup/Delivery Toggle Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'togglePickUpService() throws Exception when switching to delivery',
    expectedBehavior: 'App catches exception, sets loading states to false, and does not change order type. User remains on current order type.',
    uiHandling: {
      errorMessage: 'Exception message may be shown (commented out in code: // showMessageDialog(scaffoldKey, e.toString()))',
      recoveryOptions: [
        'User can try toggling again',
        'User can check internet connection',
        'User can continue with current order type'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:418-423'],
      validationRules: ['Exception handling with state cleanup']
    },
    relatedTestCases: ['TC-MENU-REST-008', 'TC-MENU-REST-009']
  },
  {
    id: 'EC-MENU-REST-007',
    title: 'Restaurant Change Required on Pickup/Delivery Toggle',
    category: 'State',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'togglePickUpService() returns changeOrderTypeModel with newRestaurantModel != null',
    expectedBehavior: 'App shows popup message explaining restaurant change, removes current basket, loads new restaurant menu, and initializes new cart.',
    uiHandling: {
      errorMessage: 'Popup message: changeOrderTypeModel?.newRestaurantMessage',
      recoveryOptions: [
        'User can continue with new restaurant',
        'User can go back and choose different restaurant'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:426-446'],
      validationRules: [
        'Basket removed before restaurant change',
        'Menu reloaded for new restaurant',
        'Cart initialized for new restaurant'
      ]
    },
    relatedTestCases: ['TC-MENU-REST-008', 'TC-MENU-REST-009']
  },
  {
    id: 'EC-MENU-REST-008',
    title: 'Search Returns Empty Results',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'searchMarketItems() called with query that matches no dishes (marketItems.length == 0)',
    expectedBehavior: 'App displays empty search results. User sees "No results" or empty state message.',
    uiHandling: {
      errorMessage: 'No explicit error - empty results list displayed',
      recoveryOptions: [
        'User can try different search terms',
        'User can clear search and browse categories',
        'User can check spelling'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:60-61'],
      validationRules: ['Empty query clears results, non-empty query searches']
    },
    relatedTestCases: ['TC-MENU-REST-006']
  },
  {
    id: 'EC-MENU-REST-009',
    title: 'Search Query is Empty String',
    category: 'Validation',
    likelihood: 'High',
    impact: 'Low',
    triggerCondition: 'searchMarketItems() called with query == ""',
    expectedBehavior: 'App clears search results immediately. marketItems list is set to empty array.',
    uiHandling: {
      errorMessage: 'No error - results simply cleared',
      recoveryOptions: [
        'User can type new search query',
        'User can go back to menu view'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:60-61'],
      validationRules: ['Empty string check before API call']
    },
    relatedTestCases: ['TC-MENU-REST-005']
  },
  {
    id: 'EC-MENU-REST-010',
    title: 'Sub-Menu Load Failure',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'fetchSubMenus() or fetchSubMenu() throws Exception',
    expectedBehavior: 'App catches exception, shows error message, and returns empty list or default SubMenuModel. User cannot view sub-menu.',
    uiHandling: {
      errorMessage: 'Exception message from server (e.toString())',
      recoveryOptions: [
        'User can retry by tapping category again',
        'User can go back to main menu',
        'User can check internet connection'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'menu_restaurant/service/menu_restaurant_service.dart:87-89',
        'menu_restaurant/service/menu_restaurant_service.dart:114-116'
      ],
      validationRules: ['Exception handling with empty return values']
    },
    relatedTestCases: ['TC-MENU-REST-007']
  },
  {
    id: 'EC-MENU-REST-011',
    title: 'ETA Not Provided in Restaurant Model',
    category: 'Data',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'restaurant.eTA == null after menu loads',
    expectedBehavior: 'App makes separate API call to fetchRestaurantsWithReta() to get ETA. Shows loading indicator during fetch.',
    uiHandling: {
      errorMessage: 'No error - ETA is fetched separately',
      recoveryOptions: [
        'User waits for ETA to load',
        'User can continue browsing without ETA'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:340-356'],
      validationRules: ['ETA null check triggers separate API call']
    },
    relatedTestCases: ['TC-MENU-REST-001']
  },
  {
    id: 'EC-MENU-REST-012',
    title: 'Cart Has Items When Navigating Back',
    category: 'State',
    likelihood: 'High',
    impact: 'Medium',
    triggerCondition: 'User taps back button AND cartController.currentBasket.carts.isNotEmpty',
    expectedBehavior: 'App shows confirmation dialog "menu_close_popup" asking user to confirm leaving. If confirmed, saves cart and navigates back.',
    uiHandling: {
      errorMessage: 'Confirmation dialog: "menu_close_popup".locale with title "alert2".locale',
      recoveryOptions: [
        'User can approve and leave (saves cart)',
        'User can deny and stay on menu',
        'If more than 5 carts, user sees additional warning'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:22-171'],
      validationRules: [
        'Cart empty check before allowing back',
        'Confirmation required if cart has items',
        'Cart limit check (5 baskets)'
      ]
    },
    relatedTestCases: ['TC-MENU-REST-012']
  },
  {
    id: 'EC-MENU-REST-013',
    title: 'More Than 5 Carts When Leaving Menu',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'User confirms leaving menu AND cartController.baskets.length > 5',
    expectedBehavior: 'App shows additional warning "add_more_than_5_cart". User must choose to remove oldest basket or cancel.',
    uiHandling: {
      errorMessage: '"add_more_than_5_cart".locale with title "alert".locale',
      recoveryOptions: [
        'User can approve to remove oldest basket',
        'User can deny to cancel and stay on menu'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:70-103'],
      validationRules: ['Cart count check before saving']
    },
    relatedTestCases: ['TC-MENU-REST-012']
  },
  {
    id: 'EC-MENU-REST-014',
    title: 'Restaurant Popup Message Blocks Tutorial',
    category: 'State',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'restaurant.popupMessage != null && restaurant.popupMessage != ""',
    expectedBehavior: 'App sets allowToShowTutorial = false, shows popup, and only sets it back to true after popup is dismissed. Tutorial waits for popup dismissal.',
    uiHandling: {
      errorMessage: 'No error - popup is informational',
      recoveryOptions: [
        'User dismisses popup to continue',
        'Tutorial proceeds after popup dismissal'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:327-335'],
      validationRules: ['Tutorial blocked when popup present']
    },
    relatedTestCases: ['TC-MENU-REST-013']
  },
  {
    id: 'EC-MENU-REST-015',
    title: 'Nearest Restaurant Check Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'checkNearestRestaurant() throws Exception',
    expectedBehavior: 'App catches exception and returns original restaurant ID. Menu loads for original restaurant without switching.',
    uiHandling: {
      errorMessage: 'No error shown - silently falls back to original restaurant',
      recoveryOptions: [
        'User continues with original restaurant',
        'User can manually check if different location needed'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:392-394'],
      validationRules: ['Exception handling with fallback to original restaurant']
    },
    relatedTestCases: ['TC-MENU-REST-014']
  },
  {
    id: 'EC-MENU-REST-016',
    title: 'No Nearest Restaurant Found',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Medium',
    triggerCondition: 'checkNearestRestaurant() returns changeOrderTypeModel with newRestaurantModel == null',
    expectedBehavior: 'App uses original restaurant ID. Menu loads for original restaurant without change.',
    uiHandling: {
      errorMessage: 'No error - original restaurant used',
      recoveryOptions: [
        'User continues with original restaurant',
        'User can check delivery area manually'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:403-405'],
      validationRules: ['Null check for newRestaurantModel']
    },
    relatedTestCases: ['TC-MENU-REST-014']
  },
  {
    id: 'EC-MENU-REST-017',
    title: 'Dynamic Rewards Has No Tiers',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'dynamicRewards.rewardTiers is empty or null',
    expectedBehavior: 'Rewards widget is hidden completely. User does not see rewards section.',
    uiHandling: {
      errorMessage: 'No error - widget simply not displayed',
      recoveryOptions: [
        'User continues without rewards display',
        'No action needed'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/view/dynamic_rewards/dynamic_rewards_widget.dart:60-63'],
      validationRules: ['Empty tier list check returns SizedBox.shrink()']
    },
    relatedTestCases: ['TC-MENU-REST-011']
  },
  {
    id: 'EC-MENU-REST-018',
    title: 'Restaurant Type Check Fails',
    category: 'Network',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'getRestType() throws Exception',
    expectedBehavior: 'App catches exception, shows error message, and returns false. Restaurant treated as regular restaurant (not market).',
    uiHandling: {
      errorMessage: 'Exception message from server (e.toString())',
      recoveryOptions: [
        'User can continue - restaurant treated as regular restaurant',
        'User can retry by refreshing'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/service/menu_restaurant_service.dart:218-221'],
      validationRules: ['Exception handling with false return value']
    },
    relatedTestCases: ['TC-MENU-REST-003']
  },
  {
    id: 'EC-MENU-REST-019',
    title: 'Sub-Menu Has No Dishes',
    category: 'Data',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'SubMenuModel has subMenus but all subMenus have empty dishes lists',
    expectedBehavior: 'App checks isEmptySubMenus() and hides category. Category is not displayed in menu.',
    uiHandling: {
      errorMessage: 'No error - category simply not shown',
      recoveryOptions: [
        'User sees only categories with content',
        'No action needed'
      ]
    },
    implementationNotes: {
      flutterFiles: [
        'menu_restaurant/model/sub_menu_model.dart:24-30',
        'menu_restaurant/view/market_view/market_view.dart:107-108'
      ],
      validationRules: ['isEmptySubMenus() method checks nested structure']
    },
    relatedTestCases: ['TC-MENU-REST-018']
  },
  {
    id: 'EC-MENU-REST-020',
    title: 'Market Tab Switch While Loading',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User switches between Shop and Aisles tabs while data is still loading',
    expectedBehavior: 'App changes selectedIndex, but loading state persists. User sees loading indicator on new tab.',
    uiHandling: {
      errorMessage: 'No error - loading state maintained',
      recoveryOptions: [
        'User waits for loading to complete',
        'User can switch back to previous tab'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:72-74'],
      validationRules: ['Tab index change independent of loading state']
    },
    relatedTestCases: ['TC-MENU-REST-003']
  },
  {
    id: 'EC-MENU-REST-021',
    title: 'Tutorial Returns Null',
    category: 'State',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'buildTutorial() returns null (tutorialCoachMark == null)',
    expectedBehavior: 'App returns false, tutorial does not display. User proceeds without tutorial.',
    uiHandling: {
      errorMessage: 'No error - tutorial simply not shown',
      recoveryOptions: [
        'User continues without tutorial',
        'No action needed'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/viewmodel/restaurant_single_modelview.dart:479-481'],
      validationRules: ['Null check for tutorial object']
    },
    relatedTestCases: ['TC-MENU-REST-016']
  },
  {
    id: 'EC-MENU-REST-022',
    title: 'Restaurant Header Scroll Collapse Calculation',
    category: 'UI',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'AutoScrollController offset > threshold (450.h for dynamic list, 275.h otherwise)',
    expectedBehavior: 'Header collapses when scrolling down, expands when scrolling up. Tab bar becomes visible when collapsed.',
    uiHandling: {
      errorMessage: 'No error - visual state change',
      recoveryOptions: [
        'User can scroll up to expand header',
        'User can scroll down to collapse header'
      ]
    },
    implementationNotes: {
      flutterFiles: ['menu_restaurant/view/restaurant_view/restaurant_page.dart:40-50'],
      validationRules: ['Scroll offset threshold check']
    },
    relatedTestCases: ['TC-MENU-REST-001']
  }
];





