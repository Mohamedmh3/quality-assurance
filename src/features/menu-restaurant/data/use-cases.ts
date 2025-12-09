import type { UseCase } from '../types';

export const menuRestaurantUseCases: UseCase[] = [
  {
    id: 'UC-MENU-REST-001',
    title: 'Load Restaurant Menu',
    priority: 'Critical',
    userType: 'End User',
    description: 'When a customer opens a restaurant page, the app loads and displays the complete menu with all categories and dishes. This is the core functionality that enables food ordering.',
    preconditions: [
      'User has selected a restaurant from the list',
      'User has internet connection',
      'Restaurant ID is available'
    ],
    steps: [
      {
        step: 1,
        action: 'App calls getRestaurantMenu() method with restaurant ID',
        expectedResult: 'Menu data is fetched from the server',
        uiState: 'Loading indicator is displayed',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:215-357'
      },
      {
        step: 2,
        action: 'App checks if restaurant needs nearest location check',
        expectedResult: 'If withCheckNearest is true, finds nearest restaurant',
        uiState: 'User may see restaurant switch if different location found',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:222-224'
      },
      {
        step: 3,
        action: 'App processes menu response and organizes dishes by category',
        expectedResult: 'Menu categories and dishes are structured and ready to display',
        uiState: 'Menu categories appear in tab bar, dishes organized by section',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:261-321'
      },
      {
        step: 4,
        action: 'App applies guest mode limitations if user not logged in',
        expectedResult: 'Only allowed number of dishes are shown to guest users',
        uiState: 'Guest users see limited dishes with "Login to see more" message',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:265-321'
      },
      {
        step: 5,
        action: 'App displays menu with all categories and dishes',
        expectedResult: 'Complete menu is visible and scrollable',
        uiState: 'User sees restaurant header, category tabs, and dish list',
        flutterFile: 'menu_restaurant/view/restaurant_view/restaurant_page.dart:87-108'
      }
    ],
    postconditions: [
      'Menu is fully loaded and displayed',
      'All categories are accessible',
      'Dishes are organized by category',
      'Cart button appears if items already in cart'
    ],
    successCriteria: [
      'Menu loads within 3 seconds',
      'All categories are visible',
      'Dishes display with images, names, and prices',
      'User can scroll through menu smoothly'
    ],
    relatedTestCases: ['TC-MENU-REST-001', 'TC-MENU-REST-002']
  },
  {
    id: 'UC-MENU-REST-002',
    title: 'Browse Market-Style Restaurant',
    priority: 'Critical',
    userType: 'End User',
    description: 'When a customer opens a market-style restaurant (grocery store), they see a different layout with horizontal scrolling categories and an Aisles view option.',
    preconditions: [
      'User has selected a market-style restaurant',
      'Restaurant isMarket flag is true',
      'Menu data is loaded'
    ],
    steps: [
      {
        step: 1,
        action: 'App detects restaurant is market type',
        expectedResult: 'Market view layout is activated',
        uiState: 'User sees market-style interface with Shop and Aisles tabs',
        flutterFile: 'menu_restaurant/view/restaurant_menu_view.dart:82-92'
      },
      {
        step: 2,
        action: 'App displays Shop tab with horizontal scrolling categories',
        expectedResult: 'Categories show with horizontal dish cards',
        uiState: 'User sees category headers with "See All" buttons and horizontal dish scroll',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:92-216'
      },
      {
        step: 3,
        action: 'User can switch to Aisles tab',
        expectedResult: 'Aisles view is displayed',
        uiState: 'User sees alternative layout for browsing by aisle',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:262-269'
      },
      {
        step: 4,
        action: 'User taps "See All" on a category',
        expectedResult: 'Full category view opens',
        uiState: 'User navigates to sub-menu view showing all items in category',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:116-125'
      }
    ],
    postconditions: [
      'Market view is displayed correctly',
      'User can browse categories horizontally',
      'User can switch between Shop and Aisles views',
      'Cart button appears at bottom for markets'
    ],
    successCriteria: [
      'Market layout displays correctly',
      'Horizontal scrolling works smoothly',
      'Tab switching is responsive',
      'Categories load with dish previews'
    ],
    relatedTestCases: ['TC-MENU-REST-003', 'TC-MENU-REST-004']
  },
  {
    id: 'UC-MENU-REST-003',
    title: 'Search Menu Items',
    priority: 'High',
    userType: 'End User',
    description: 'Customer can search for specific dishes or items within a restaurant menu using the search functionality.',
    preconditions: [
      'User is on restaurant menu page',
      'Menu is loaded',
      'Search feature is accessible'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps search icon or search bar',
        expectedResult: 'Search screen opens',
        uiState: 'User sees search input field',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:232-237'
      },
      {
        step: 2,
        action: 'User types search query',
        expectedResult: 'Search query is processed',
        uiState: 'User sees search results updating as they type',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:53-86'
      },
      {
        step: 3,
        action: 'App calls searchMarketItems() with query and restaurant ID',
        expectedResult: 'Search results are fetched from server',
        uiState: 'Loading indicator shows while searching',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:64-82'
      },
      {
        step: 4,
        action: 'App displays matching dishes',
        expectedResult: 'Search results show dishes that match query',
        uiState: 'User sees list of matching dishes with images and prices',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:82-85'
      },
      {
        step: 5,
        action: 'User taps a search result',
        expectedResult: 'Dish detail screen opens',
        uiState: 'User navigates to dish details page',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_search_viewmodel.dart:82'
      }
    ],
    postconditions: [
      'Search results are displayed',
      'User can select dishes from results',
      'Search query is stored for pagination'
    ],
    successCriteria: [
      'Search responds within 1 second',
      'Results match search query',
      'Empty search shows appropriate message',
      'User can navigate to dish from results'
    ],
    relatedTestCases: ['TC-MENU-REST-005', 'TC-MENU-REST-006']
  },
  {
    id: 'UC-MENU-REST-004',
    title: 'View Sub-Menu Categories',
    priority: 'High',
    userType: 'End User',
    description: 'In market view, when a category has sub-categories, user can tap to see all sub-menus and their items.',
    preconditions: [
      'User is on market view',
      'Category has sub-menus',
      'Menu data includes nested categories'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps "See All" on a category with sub-menus',
        expectedResult: 'App calls getSubMenus() with category ID',
        uiState: 'Loading indicator appears',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:191-200'
      },
      {
        step: 2,
        action: 'App fetches sub-menu data from server',
        expectedResult: 'Sub-menu list is retrieved',
        uiState: 'Sub-menu view loads',
        flutterFile: 'menu_restaurant/service/menu_restaurant_service.dart:68-91'
      },
      {
        step: 3,
        action: 'App displays sub-menu view with all sub-categories',
        expectedResult: 'User sees organized sub-menu structure',
        uiState: 'User sees list of sub-categories with their dishes',
        flutterFile: 'menu_restaurant/view/market_view/market_screens/sub_menus_view.dart'
      },
      {
        step: 4,
        action: 'User can tap a sub-menu to view its items',
        expectedResult: 'Sub-menu items are displayed',
        uiState: 'User sees dishes within selected sub-menu',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:203-210'
      }
    ],
    postconditions: [
      'Sub-menu view is displayed',
      'All sub-categories are accessible',
      'User can browse nested menu structure'
    ],
    successCriteria: [
      'Sub-menus load within 2 seconds',
      'Nested structure is clear and navigable',
      'Dishes are properly organized by sub-menu'
    ],
    relatedTestCases: ['TC-MENU-REST-007']
  },
  {
    id: 'UC-MENU-REST-005',
    title: 'Toggle Pickup/Delivery',
    priority: 'High',
    userType: 'End User',
    description: 'User can switch between pickup and delivery order types. This may trigger a restaurant change if a different location is needed.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant supports both pickup and delivery',
      'User has selected address (for delivery)'
    ],
    steps: [
      {
        step: 1,
        action: 'User switches pickup/delivery toggle',
        expectedResult: 'App calls togglePickUpService() method',
        uiState: 'Loading indicator appears',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:409-459'
      },
      {
        step: 2,
        action: 'App checks if restaurant change is needed',
        expectedResult: 'If different location required, finds nearest restaurant',
        uiState: 'User may see restaurant switching',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:414-424'
      },
      {
        step: 3,
        action: 'If restaurant changes, app shows confirmation message',
        expectedResult: 'User is informed about restaurant change',
        uiState: 'Popup message appears explaining the change',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:434-437'
      },
      {
        step: 4,
        action: 'App reloads menu for new restaurant if changed',
        expectedResult: 'Menu updates to reflect new restaurant',
        uiState: 'Menu refreshes with new restaurant data',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:439-443'
      },
      {
        step: 5,
        action: 'App updates cart basket pickup status',
        expectedResult: 'Cart reflects new order type',
        uiState: 'Cart button shows updated order type',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:447-456'
      }
    ],
    postconditions: [
      'Order type is updated',
      'Cart basket reflects new order type',
      'Menu may show different restaurant if location changed',
      'Pickup/delivery status is saved'
    ],
    successCriteria: [
      'Toggle responds within 2 seconds',
      'Restaurant change is clearly communicated',
      'Menu reloads correctly if restaurant changes',
      'Cart status updates properly'
    ],
    relatedTestCases: ['TC-MENU-REST-008', 'TC-MENU-REST-009']
  },
  {
    id: 'UC-MENU-REST-006',
    title: 'Add Restaurant to Favorites',
    priority: 'Medium',
    userType: 'End User',
    description: 'Logged-in user can mark a restaurant as favorite by tapping the favorite icon. This saves the restaurant for quick access later.',
    preconditions: [
      'User is logged into the app',
      'User is on restaurant menu page',
      'Favorite icon is visible'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps favorite icon',
        expectedResult: 'App calls changeFaveState() method',
        uiState: 'Favorite icon state changes immediately (optimistic update)',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:365-384'
      },
      {
        step: 2,
        action: 'App checks if user is logged in',
        expectedResult: 'If not logged in, shows login prompt',
        uiState: 'Login dialog appears if user not authenticated',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:366-369'
      },
      {
        step: 3,
        action: 'App calls updatedFavouriteRestaurant() API',
        expectedResult: 'Favorite status is saved to server',
        uiState: 'Favorite icon shows selected state',
        flutterFile: 'menu_restaurant/service/menu_restaurant_service.dart:303-322'
      },
      {
        step: 4,
        action: 'If API call fails, app reverts favorite state',
        expectedResult: 'Favorite icon returns to previous state',
        uiState: 'User sees favorite icon unselected if save failed',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:381-383'
      }
    ],
    postconditions: [
      'Restaurant favorite status is updated',
      'Favorite icon reflects current state',
      'Restaurant appears in favorites list if favorited'
    ],
    successCriteria: [
      'Favorite toggle responds immediately',
      'Status saves successfully to server',
      'UI reflects favorite state correctly',
      'Login prompt appears for guest users'
    ],
    relatedTestCases: ['TC-MENU-REST-010']
  },
  {
    id: 'UC-MENU-REST-007',
    title: 'View Dynamic Rewards Progress',
    priority: 'Medium',
    userType: 'End User',
    description: 'User can see their progress toward earning loyalty rewards based on their current cart total. Rewards are displayed with progress indicators.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant has dynamic rewards enabled',
      'Cart has items or user has order history'
    ],
    steps: [
      {
        step: 1,
        action: 'App fetches dynamic rewards after menu loads',
        expectedResult: 'Rewards data is retrieved',
        uiState: 'Rewards widget appears below restaurant header',
        flutterFile: 'menu_restaurant/view/restaurant_menu_view.dart:155'
      },
      {
        step: 2,
        action: 'App calculates current order amount',
        expectedResult: 'Current cart total is determined',
        uiState: 'Rewards widget shows current progress',
        flutterFile: 'menu_restaurant/view/dynamic_rewards/dynamic_rewards_widget.dart:19-20'
      },
      {
        step: 3,
        action: 'App displays reward tiers and progress',
        expectedResult: 'User sees progress bar with reward milestones',
        uiState: 'User sees "X left to earn Y reward" or "You earned Y reward" message',
        flutterFile: 'menu_restaurant/view/dynamic_rewards/dynamic_rewards_widget.dart:109-241'
      },
      {
        step: 4,
        action: 'If user reaches a reward tier, confetti animation plays',
        expectedResult: 'Celebration animation is displayed',
        uiState: 'Confetti effect appears when tier is reached',
        flutterFile: 'menu_restaurant/view/dynamic_rewards/dynamic_rewards_widget.dart:243-252'
      }
    ],
    postconditions: [
      'Rewards progress is displayed',
      'User can see next reward threshold',
      'Earned rewards are highlighted'
    ],
    successCriteria: [
      'Rewards widget loads with menu',
      'Progress calculation is accurate',
      'Animations play smoothly',
      'Reward messages are clear'
    ],
    relatedTestCases: ['TC-MENU-REST-011']
  },
  {
    id: 'UC-MENU-REST-008',
    title: 'Navigate to Dish Detail',
    priority: 'Critical',
    userType: 'End User',
    description: 'User taps a dish card to view detailed information including full description, price, options, and add to cart functionality.',
    preconditions: [
      'User is on restaurant menu page',
      'Menu is loaded',
      'Dish is visible in menu'
    ],
    steps: [
      {
        step: 1,
        action: 'User taps a dish card',
        expectedResult: 'Navigation to dish detail screen is triggered',
        uiState: 'Screen transitions to dish detail page',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:173-197'
      },
      {
        step: 2,
        action: 'App passes dish data via DishPageParams',
        expectedResult: 'Dish information is available on detail screen',
        uiState: 'Dish detail page loads with dish information',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:180-192'
      },
      {
        step: 3,
        action: 'App updates cart button visibility after returning',
        expectedResult: 'Cart button appears if items added',
        uiState: 'Cart button shows at bottom if cart has items',
        flutterFile: 'menu_restaurant/view/market_view/market_view.dart:199-205'
      }
    ],
    postconditions: [
      'User is on dish detail screen',
      'Dish information is displayed',
      'User can add dish to cart'
    ],
    successCriteria: [
      'Navigation is smooth and fast',
      'Dish data loads correctly',
      'Cart button updates appropriately'
    ],
    relatedTestCases: ['TC-MENU-REST-001']
  },
  {
    id: 'UC-MENU-REST-009',
    title: 'Handle Back Navigation with Cart',
    priority: 'High',
    userType: 'End User',
    description: 'When user tries to go back from restaurant menu, app checks if cart has items and shows confirmation dialog if needed.',
    preconditions: [
      'User is on restaurant menu page',
      'User taps back button or swipes back'
    ],
    steps: [
      {
        step: 1,
        action: 'User attempts to navigate back',
        expectedResult: 'onWillPopRestaurant() is called',
        uiState: 'Back navigation is intercepted',
        flutterFile: 'menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:13-289'
      },
      {
        step: 2,
        action: 'App checks if cart is empty',
        expectedResult: 'If empty, allows back navigation immediately',
        uiState: 'User returns to previous screen if cart empty',
        flutterFile: 'menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:22-36'
      },
      {
        step: 3,
        action: 'If cart has items, app shows confirmation dialog',
        expectedResult: 'User sees "Close menu?" confirmation',
        uiState: 'Popup appears asking to confirm leaving menu',
        flutterFile: 'menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:39-171'
      },
      {
        step: 4,
        action: 'If user confirms, app checks cart limit',
        expectedResult: 'If more than 5 carts, shows additional warning',
        uiState: 'User may see "More than 5 carts" warning',
        flutterFile: 'menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:70-103'
      },
      {
        step: 5,
        action: 'App saves cart and navigates back',
        expectedResult: 'Cart is saved and user returns to previous screen',
        uiState: 'User returns to restaurant list or home',
        flutterFile: 'menu_restaurant/view/menu_view_widgets/rest_will_popup.dart:139-166'
      }
    ],
    postconditions: [
      'Cart is saved if user confirms',
      'User returns to previous screen',
      'Cart data persists for later'
    ],
    successCriteria: [
      'Confirmation appears when cart has items',
      'Cart saves correctly',
      'Navigation works as expected',
      'Cart limit warning appears when needed'
    ],
    relatedTestCases: ['TC-MENU-REST-012']
  },
  {
    id: 'UC-MENU-REST-010',
    title: 'View Restaurant Information',
    priority: 'Medium',
    userType: 'End User',
    description: 'User can view restaurant details including name, rating, hours, delivery time, and other information in the restaurant header.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant data is loaded'
    ],
    steps: [
      {
        step: 1,
        action: 'App displays restaurant header with information',
        expectedResult: 'Restaurant details are visible',
        uiState: 'User sees restaurant image, name, rating, hours, delivery info',
        flutterFile: 'menu_restaurant/view/outlet_header_widget.dart'
      },
      {
        step: 2,
        action: 'App fetches ETA if not provided',
        expectedResult: 'Delivery time is calculated and displayed',
        uiState: 'User sees estimated delivery time',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:340-356'
      },
      {
        step: 3,
        action: 'Header collapses on scroll',
        expectedResult: 'Header becomes compact when scrolling down',
        uiState: 'Header shrinks, showing only essential info',
        flutterFile: 'menu_restaurant/view/restaurant_view/restaurant_page.dart:69-77'
      }
    ],
    postconditions: [
      'Restaurant information is displayed',
      'Header is responsive to scroll',
      'All restaurant details are accessible'
    ],
    successCriteria: [
      'Restaurant info loads correctly',
      'Header animation is smooth',
      'All information is accurate'
    ],
    relatedTestCases: ['TC-MENU-REST-001']
  },
  {
    id: 'UC-MENU-REST-011',
    title: 'Browse Menu Categories',
    priority: 'Critical',
    userType: 'End User',
    description: 'User can scroll through menu categories using the tab bar and see dishes organized by category. Tabs auto-scroll when user scrolls menu.',
    preconditions: [
      'User is on restaurant menu page',
      'Menu is loaded with categories'
    ],
    steps: [
      {
        step: 1,
        action: 'App displays category tabs in header',
        expectedResult: 'All menu categories are shown as tabs',
        uiState: 'User sees scrollable tab bar with category names',
        flutterFile: 'menu_restaurant/view/restaurant_view/widgets/restaurant_main_section.dart:136-169'
      },
      {
        step: 2,
        action: 'User scrolls through menu',
        expectedResult: 'Active tab updates based on visible category',
        uiState: 'Tab highlights change as user scrolls',
        flutterFile: 'menu_restaurant/view/restaurant_view/restaurant_page.dart:69-77'
      },
      {
        step: 3,
        action: 'User taps a category tab',
        expectedResult: 'Menu scrolls to that category',
        uiState: 'Menu automatically scrolls to selected category',
        flutterFile: 'menu_restaurant/view/restaurant_view/widgets/restaurant_main_section.dart:166-168'
      },
      {
        step: 4,
        action: 'User views dishes in each category',
        expectedResult: 'Dishes are displayed organized by category',
        uiState: 'User sees category header followed by dish list',
        flutterFile: 'menu_restaurant/view/restaurant_view/widgets/restuarant_dishes_list.dart'
      }
    ],
    postconditions: [
      'User can navigate between categories',
      'Dishes are organized by category',
      'Tab bar reflects current position'
    ],
    successCriteria: [
      'Tabs are scrollable if many categories',
      'Auto-scroll works smoothly',
      'Category navigation is responsive',
      'Dishes display correctly in each category'
    ],
    relatedTestCases: ['TC-MENU-REST-001', 'TC-MENU-REST-002']
  },
  {
    id: 'UC-MENU-REST-012',
    title: 'Handle Restaurant Popup Message',
    priority: 'Low',
    userType: 'End User',
    description: 'If restaurant has a popup message configured, it displays when menu loads. User must dismiss it before continuing.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant has popupMessage configured',
      'Menu has loaded'
    ],
    steps: [
      {
        step: 1,
        action: 'App checks if restaurant has popupMessage',
        expectedResult: 'Popup message is detected',
        uiState: 'Popup dialog appears over menu',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:327-335'
      },
      {
        step: 2,
        action: 'App displays popup with restaurant name, message, and image',
        expectedResult: 'User sees popup dialog',
        uiState: 'Dialog shows restaurant name as title, message text, and optional image',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:329-334'
      },
      {
        step: 3,
        action: 'App blocks tutorial until popup is dismissed',
        expectedResult: 'Tutorial is prevented from showing',
        uiState: 'Tutorial does not appear while popup is visible',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:328-334'
      },
      {
        step: 4,
        action: 'User dismisses popup',
        expectedResult: 'Popup closes and tutorial can proceed',
        uiState: 'Popup disappears, menu is fully accessible',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:334'
      }
    ],
    postconditions: [
      'Popup is displayed and dismissed',
      'Tutorial can proceed after dismissal',
      'Menu is fully accessible'
    ],
    successCriteria: [
      'Popup appears when restaurant has message',
      'Popup displays correctly with all content',
      'Dismissal works properly',
      'Tutorial resumes after dismissal'
    ],
    relatedTestCases: ['TC-MENU-REST-013']
  },
  {
    id: 'UC-MENU-REST-013',
    title: 'Check Nearest Restaurant for Delivery',
    priority: 'Medium',
    userType: 'End User',
    description: 'When restaurant has withCheckNearest enabled, app automatically finds the nearest restaurant location when loading menu for delivery orders.',
    preconditions: [
      'User is on restaurant menu page',
      'Restaurant has withCheckNearest flag set to true',
      'User has selected delivery address'
    ],
    steps: [
      {
        step: 1,
        action: 'App detects withCheckNearest flag during menu load',
        expectedResult: 'Nearest restaurant check is triggered',
        uiState: 'Menu loading may take slightly longer',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:222-224'
      },
      {
        step: 2,
        action: 'App calls checkNearestRestaurant() method',
        expectedResult: 'Nearest restaurant is found',
        uiState: 'User may not notice if same restaurant',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:386-406'
      },
      {
        step: 3,
        action: 'If different restaurant found, app switches to it',
        expectedResult: 'Menu loads for nearest restaurant',
        uiState: 'User sees menu for different restaurant location',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:397-402'
      },
      {
        step: 4,
        action: 'App removes old basket and initializes new one',
        expectedResult: 'Cart is cleared for new restaurant',
        uiState: 'Cart is empty for new restaurant',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:400'
      }
    ],
    postconditions: [
      'Nearest restaurant is determined',
      'Menu loads for correct restaurant',
      'Cart is initialized for new restaurant if switched'
    ],
    successCriteria: [
      'Nearest restaurant is found correctly',
      'Restaurant switch is seamless',
      'Cart is properly cleared if restaurant changes'
    ],
    relatedTestCases: ['TC-MENU-REST-014']
  },
  {
    id: 'UC-MENU-REST-014',
    title: 'Display Guest Mode Limitations',
    priority: 'Medium',
    userType: 'End User',
    description: 'When user is not logged in, app limits the number of dishes they can see and displays a message encouraging them to log in.',
    preconditions: [
      'User is not logged into the app',
      'User is on restaurant menu page',
      'Menu is loaded'
    ],
    steps: [
      {
        step: 1,
        action: 'App checks if user is logged in',
        expectedResult: 'Guest mode is detected',
        uiState: 'Limited dishes are shown',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:265-274'
      },
      {
        step: 2,
        action: 'App applies dish limit based on restaurant type',
        expectedResult: 'Only allowed number of dishes are included',
        uiState: 'User sees limited dish list',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:266-270'
      },
      {
        step: 3,
        action: 'App marks first 3 dishes with special indices',
        expectedResult: 'First dishes get indexInTheList markers',
        uiState: 'First dishes may have special highlighting',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:285-314'
      },
      {
        step: 4,
        action: 'App displays "Login to see more" message',
        expectedResult: 'User sees encouragement to log in',
        uiState: 'Message appears indicating more dishes available after login',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:272-274'
      }
    ],
    postconditions: [
      'Guest users see limited dishes',
      'Login prompt is displayed',
      'First dishes are marked for special treatment'
    ],
    successCriteria: [
      'Dish limit is enforced correctly',
      'Login message is clear',
      'User experience encourages login without being intrusive'
    ],
    relatedTestCases: ['TC-MENU-REST-015']
  },
  {
    id: 'UC-MENU-REST-015',
    title: 'Show Tutorial Overlay',
    priority: 'Low',
    userType: 'End User',
    description: 'First-time users see a tutorial overlay that highlights key features of the restaurant menu page. Tutorial can be dismissed.',
    preconditions: [
      'User is on restaurant menu page',
      'Menu is fully loaded',
      'Tutorial has not been shown before',
      'No popup message is blocking tutorial'
    ],
    steps: [
      {
        step: 1,
        action: 'App waits 2 seconds after menu loads',
        expectedResult: 'Tutorial delay ensures menu is ready',
        uiState: 'Menu is fully displayed',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:468'
      },
      {
        step: 2,
        action: 'App calls buildTutorial() method',
        expectedResult: 'Tutorial overlay is prepared',
        uiState: 'Tutorial highlights appear on screen',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:467-484'
      },
      {
        step: 3,
        action: 'Tutorial highlights key UI elements',
        expectedResult: 'User sees tooltips and highlights',
        uiState: 'User sees highlighted areas with instructions',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:469-478'
      },
      {
        step: 4,
        action: 'User dismisses tutorial',
        expectedResult: 'Tutorial closes and menu is fully accessible',
        uiState: 'Tutorial overlay disappears',
        flutterFile: 'menu_restaurant/viewmodel/restaurant_single_modelview.dart:475-477'
      }
    ],
    postconditions: [
      'Tutorial is displayed',
      'User understands key features',
      'Tutorial does not show again for this user'
    ],
    successCriteria: [
      'Tutorial appears at appropriate time',
      'Highlights are clear and helpful',
      'Dismissal works properly',
      'Tutorial does not interfere with menu interaction'
    ],
    relatedTestCases: ['TC-MENU-REST-016']
  }
];



