import type { TestCase } from '@/lib/types';

export const menuRestaurantTestCases: TestCase[] = [
  // ============================================
  // CORE MENU LOADING TESTS (P0 - Critical)
  // ============================================
  {
    id: 'TC-MENU-REST-001',
    title: 'Open a Restaurant and Browse the Menu',
    whatYoureTesting: 'Making sure customers can open a restaurant page and see all the food items organized by category',
    whyItMatters: 'This is the main way people find food to order. If the menu doesn\'t load, nobody can order anything!',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P0',
    relatedUseCases: ['UC-MENU-REST-001', 'UC-MENU-REST-011'],
    relatedEdgeCases: ['EC-MENU-REST-001', 'EC-MENU-REST-002'],
    testSteps: [
      {
        step: 1,
        instruction: 'Go to the restaurant list page',
        detailedSteps: [
          '1. Open the app on your phone',
          '2. Make sure you\'re logged in (you should see your name or profile, not a "Login" button)',
          '3. Look at the bottom of the screen - you should see icons for different sections',
          '4. Tap on "Restaurants" or "Browse" (it might have a fork-and-knife icon)',
          '5. Wait for the page to load - you might see a spinning circle for 1-2 seconds'
        ],
        whatYouShouldSee: 'A page showing a list of restaurants. Each restaurant should have: a photo, the restaurant name, star rating (like "4.5 ★"), delivery time (like "25-35 min"), and maybe a delivery fee',
        expectedResult: 'Restaurant list page loads showing all available restaurants in your area'
      },
      {
        step: 2,
        instruction: 'Pick any restaurant and tap on it',
        detailedSteps: [
          '1. Scroll through the list if needed',
          '2. Choose any restaurant that shows as "Open" (avoid ones that say "Closed")',
          '3. Tap anywhere on that restaurant\'s card (the whole box is tappable)',
          '4. Watch the screen - it should slide or fade to a new page'
        ],
        whatYouShouldSee: 'The screen changes to a new page. At the top, you should see a large photo of the restaurant, the restaurant name, and information like rating and delivery time',
        expectedResult: 'Restaurant detail page opens showing the restaurant header and menu'
      },
      {
        step: 3,
        instruction: 'Look at the menu and scroll through it',
        detailedSteps: [
          '1. Below the restaurant photo, you should see menu categories (like "Appetizers", "Main Dishes", "Desserts")',
          '2. These categories appear as tabs you can tap - they\'re usually in a horizontal row you can scroll',
          '3. Scroll down slowly to see all the menu items',
          '4. Each food item should show: a photo of the food, the dish name, a short description, and the price'
        ],
        whatYouShouldSee: 'A scrollable menu with different categories. Each dish shows a clear photo, name, description text, and price (like "$12.99"). The layout should be easy to read.',
        expectedResult: 'Complete menu displays with all categories, dish photos, names, descriptions, and prices'
      },
      {
        step: 4,
        instruction: 'Tap on a category tab to jump to that section',
        detailedSteps: [
          '1. Look at the category tabs near the top of the menu',
          '2. Tap on a category that\'s NOT the current one (try "Desserts" or "Drinks")',
          '3. The menu should automatically scroll to show dishes in that category',
          '4. Notice the tab you tapped now looks highlighted or selected'
        ],
        whatYouShouldSee: 'When you tap a category tab, the menu jumps to that section. The tab you tapped changes color or gets underlined to show it\'s selected.',
        expectedResult: 'Tapping category tabs scrolls menu to that section and highlights the selected tab'
      },
      {
        step: 5,
        instruction: 'Tap on any dish to see its details',
        detailedSteps: [
          '1. Find any dish that looks interesting',
          '2. Tap on the dish card',
          '3. A new page should open with more details about that dish',
          '4. You should see options to add the dish to your cart'
        ],
        whatYouShouldSee: 'A dish detail page opens with a larger photo, full description, price, and an "Add to Cart" button. You might see options like sizes or toppings.',
        expectedResult: 'Dish detail page opens with all information and add-to-cart option'
      }
    ],
    successChecklist: [
      '✓ Restaurant list page loaded and shows multiple restaurants',
      '✓ Each restaurant card shows photo, name, rating, delivery time, and fee',
      '✓ Tapping a restaurant opens its detail page smoothly',
      '✓ Restaurant detail page shows header with restaurant info',
      '✓ Menu loads and shows organized categories',
      '✓ Each menu item has photo, name, description, and price',
      '✓ Category tabs are visible and tappable',
      '✓ Tapping a category scrolls to that section',
      '✓ Tapping a dish opens the dish detail page',
      '✓ Page loaded within 3-5 seconds (not too slow)'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Restaurant list never loads - just shows loading forever',
          whatToDo: 'Wait 10 seconds. If still loading, take a screenshot, mark as FAILED. Check if your internet is working.'
        },
        {
          problem: 'Tapping a restaurant does nothing or app crashes',
          whatToDo: 'Close the app, reopen, try again. If it crashes again, take a screenshot and mark as BLOCKED.'
        },
        {
          problem: 'Menu loads but no dishes show - just empty categories',
          whatToDo: 'Take a screenshot of the empty menu, try a different restaurant. If all are empty, mark as FAILED.'
        },
        {
          problem: 'Menu item photos don\'t load (shows broken image icon or blank boxes)',
          whatToDo: 'Take a screenshot showing the broken images, mark as FAILED, and note which restaurant.'
        },
        {
          problem: 'Category tabs don\'t work when tapped',
          whatToDo: 'Take a screenshot, try scrolling manually. Mark as FAILED and note "Category tabs not responding".'
        }
      ]
    },
    preconditions: [
      'You are logged into the app',
      'You have internet connection (WiFi or mobile data)',
      'There are restaurants available in your delivery area'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'This is the most important flow in the app - customers must be able to browse and view menus easily.'
  },
  {
    id: 'TC-MENU-REST-002',
    title: 'Menu Categories Scroll and Tab Sync',
    whatYoureTesting: 'Making sure the menu category tabs work together with scrolling - when you scroll down, the tabs update, and when you tap a tab, the menu scrolls',
    whyItMatters: 'Long menus can have 10+ categories. If tabs don\'t sync with scrolling, customers get lost and frustrated.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P0',
    relatedUseCases: ['UC-MENU-REST-011'],
    relatedEdgeCases: ['EC-MENU-REST-022'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant with at least 5 menu categories',
        detailedSteps: [
          '1. Open the app and go to the restaurant list',
          '2. Find a restaurant that looks like it has a big menu (often chains or large restaurants)',
          '3. Open that restaurant\'s menu',
          '4. Look at the category tabs - count how many there are (you want at least 5)'
        ],
        whatYouShouldSee: 'A restaurant menu with multiple category tabs like "Starters", "Salads", "Mains", "Sides", "Desserts", "Drinks"',
        expectedResult: 'Restaurant with 5+ categories is displayed'
      },
      {
        step: 2,
        instruction: 'Scroll down through the menu slowly',
        detailedSteps: [
          '1. Start at the top of the menu',
          '2. Slowly scroll down with your finger',
          '3. Watch the category tabs at the top as you scroll',
          '4. When you pass from one category to another, the highlighted tab should change'
        ],
        whatYouShouldSee: 'As you scroll past each category section, the highlighted tab in the tab bar automatically updates to show which category you\'re now viewing',
        expectedResult: 'Tab bar updates automatically as user scrolls through different categories'
      },
      {
        step: 3,
        instruction: 'Tap a category tab to jump to that section',
        detailedSteps: [
          '1. Look at the category tabs',
          '2. Tap on a category that\'s far away from where you are (if you\'re at the top, tap "Desserts")',
          '3. The menu should automatically scroll to that section',
          '4. The tab should now be highlighted'
        ],
        whatYouShouldSee: 'The menu automatically scrolls to the selected category section. The animation should be smooth, not jumpy.',
        expectedResult: 'Menu scrolls to selected category when tab is tapped'
      },
      {
        step: 4,
        instruction: 'Check if you can scroll through all the tabs',
        detailedSteps: [
          '1. If there are many categories, the tab bar itself might be scrollable',
          '2. Try swiping left/right on the tab bar to see more categories',
          '3. Make sure all categories are accessible',
          '4. Tap a few different tabs to make sure they all work'
        ],
        whatYouShouldSee: 'Tab bar scrolls horizontally if there are many categories. All tabs are accessible and tappable.',
        expectedResult: 'All category tabs are accessible via scrolling and respond to taps'
      }
    ],
    successChecklist: [
      '✓ Category tabs are visible at the top/near top of menu',
      '✓ Scrolling down updates the active tab automatically',
      '✓ Tapping a tab scrolls the menu to that category',
      '✓ Tab bar scrolls horizontally if there are many categories',
      '✓ Transitions are smooth, not jerky or glitchy'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Tabs don\'t update when scrolling',
          whatToDo: 'Scroll very slowly through a category boundary. If still doesn\'t update, mark as FAILED.'
        },
        {
          problem: 'Tapping a tab doesn\'t scroll the menu',
          whatToDo: 'Try tapping firmly in the center of the tab. If still doesn\'t work, mark as FAILED.'
        },
        {
          problem: 'Tab bar can\'t scroll to show more categories',
          whatToDo: 'Try swiping on the tabs. If some categories are inaccessible, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You are logged into the app',
      'You have a restaurant with at least 5 menu categories open'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Test with restaurants that have many categories for best coverage.'
  },

  // ============================================
  // MARKET VIEW TESTS (P0 - Critical)
  // ============================================
  {
    id: 'TC-MENU-REST-003',
    title: 'Browse a Market-Style Store (Grocery/Convenience)',
    whatYoureTesting: 'Making sure market-style stores show the right layout with horizontal scrolling categories and Shop/Aisles tabs',
    whyItMatters: 'Markets (grocery stores, convenience stores) have a different layout than restaurants. If it shows wrong layout, customers get confused.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P0',
    relatedUseCases: ['UC-MENU-REST-002'],
    relatedEdgeCases: ['EC-MENU-REST-018', 'EC-MENU-REST-020'],
    testSteps: [
      {
        step: 1,
        instruction: 'Find and open a market-style store',
        detailedSteps: [
          '1. Open the app and go to the restaurant/store list',
          '2. Look for stores that are NOT restaurants - things like grocery stores, convenience stores, or markets',
          '3. They might have icons like a shopping cart or say "Market" or "Store"',
          '4. Tap on one to open it'
        ],
        whatYouShouldSee: 'A store page that looks different from a restaurant. Instead of a simple list menu, you should see a more shopping-style layout.',
        expectedResult: 'Market-style store opens with market layout (not restaurant layout)'
      },
      {
        step: 2,
        instruction: 'Look for the Shop and Aisles tabs at the bottom',
        detailedSteps: [
          '1. Look at the bottom of the screen',
          '2. You should see two tabs: "Shop" and "Aisles"',
          '3. "Shop" is usually selected by default',
          '4. The Shop view shows products organized in horizontal scrolling rows'
        ],
        whatYouShouldSee: 'At the bottom: two tab buttons labeled "Shop" and "Aisles". The page content shows products in horizontal rows you can swipe through.',
        expectedResult: 'Bottom navigation shows Shop and Aisles tabs, Shop is selected by default'
      },
      {
        step: 3,
        instruction: 'Scroll through the Shop view',
        detailedSteps: [
          '1. You should see category sections (like "Dairy", "Snacks", "Beverages")',
          '2. Each section has products you can scroll horizontally',
          '3. Try swiping left/right within a product row to see more items',
          '4. Each product should have a photo, name, and price'
        ],
        whatYouShouldSee: 'Categories with products displayed in horizontal rows. You can swipe left/right to see more products in each row. Each product shows image, name, and price.',
        expectedResult: 'Shop view displays categories with horizontal product scrolling'
      },
      {
        step: 4,
        instruction: 'Tap "See All" on any category',
        detailedSteps: [
          '1. Look for a "See All" button or link next to any category name',
          '2. Tap on "See All"',
          '3. A new page should open showing all products in that category',
          '4. You can scroll through all the products'
        ],
        whatYouShouldSee: 'A page dedicated to that category, showing all products (not just the preview shown in Shop view).',
        expectedResult: 'Tapping See All opens full category view with all products'
      },
      {
        step: 5,
        instruction: 'Switch to the Aisles tab',
        detailedSteps: [
          '1. Tap the "Aisles" tab at the bottom',
          '2. The view should change to show a different layout',
          '3. Aisles view typically shows categories as a list or grid',
          '4. You can tap categories to browse their products'
        ],
        whatYouShouldSee: 'A different layout showing categories in an aisle-style organization. It might look more like a store map or category list.',
        expectedResult: 'Aisles tab shows alternative category organization'
      }
    ],
    successChecklist: [
      '✓ Market store shows different layout than restaurants',
      '✓ Shop and Aisles tabs appear at the bottom',
      '✓ Shop view shows horizontal scrolling product rows',
      '✓ Each product has photo, name, and price',
      '✓ "See All" button opens full category view',
      '✓ Aisles tab shows alternative layout',
      '✓ Switching tabs is smooth'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Market shows restaurant-style layout instead of market layout',
          whatToDo: 'Take a screenshot. Try a different store. If all markets show restaurant layout, mark as FAILED.'
        },
        {
          problem: 'No Shop/Aisles tabs at the bottom',
          whatToDo: 'Check if the store is actually a market. If it is, take a screenshot and mark as FAILED.'
        },
        {
          problem: 'Horizontal scrolling doesn\'t work',
          whatToDo: 'Try swiping firmly. If products don\'t scroll, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You are logged into the app',
      'There are market-style stores available in your area',
      'You can identify which stores are markets vs restaurants'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Look for stores with grocery/convenience icons, or search for "market" or "grocery".'
  },
  {
    id: 'TC-MENU-REST-004',
    title: 'Market Sub-Categories Navigation',
    whatYoureTesting: 'Making sure you can drill down into sub-categories in market stores (like going from "Dairy" to "Milk" to "Almond Milk")',
    whyItMatters: 'Markets often have nested categories. Customers need to navigate deep into categories to find specific items.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-004'],
    relatedEdgeCases: ['EC-MENU-REST-010', 'EC-MENU-REST-019'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a market store and find a main category',
        detailedSteps: [
          '1. Open a market-style store',
          '2. Look for a category that likely has sub-categories (like "Dairy", "Snacks", "Beverages")',
          '3. Tap on "See All" for that category'
        ],
        whatYouShouldSee: 'A page showing all items in that category, possibly with sub-category filters or tabs',
        expectedResult: 'Main category page opens'
      },
      {
        step: 2,
        instruction: 'Look for and tap on sub-categories',
        detailedSteps: [
          '1. Look for sub-category tabs or filter options (like "Milk", "Cheese", "Yogurt" under Dairy)',
          '2. Tap on a sub-category',
          '3. The products should filter to show only items in that sub-category'
        ],
        whatYouShouldSee: 'Sub-category options visible, tapping one filters the products to show only items in that sub-category',
        expectedResult: 'Sub-categories are accessible and filter products correctly'
      },
      {
        step: 3,
        instruction: 'Navigate back to main categories',
        detailedSteps: [
          '1. Use the back button or back arrow at the top',
          '2. You should return to the main market view',
          '3. Make sure you can browse other categories'
        ],
        whatYouShouldSee: 'Back navigation works smoothly, returning you to previous screens',
        expectedResult: 'Navigation back to main market view works correctly'
      }
    ],
    successChecklist: [
      '✓ Main categories open when tapped',
      '✓ Sub-categories are visible and accessible',
      '✓ Tapping sub-category filters products correctly',
      '✓ Back navigation returns to previous screen',
      '✓ Navigation is smooth without delays'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Sub-categories don\'t appear',
          whatToDo: 'Try a different main category. If none have sub-categories, mark as SKIP (not all stores have them).'
        },
        {
          problem: 'Tapping sub-category doesn\'t filter products',
          whatToDo: 'Take a screenshot, mark as FAILED, note which category.'
        }
      ]
    },
    preconditions: [
      'You have a market store open',
      'The store has categories with sub-categories'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Not all markets have sub-categories - if none available, mark test as SKIP.'
  },

  // ============================================
  // SEARCH TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-005',
    title: 'Search for Items Within a Restaurant',
    whatYoureTesting: 'Making sure the search feature finds dishes when you type in search terms',
    whyItMatters: 'Customers often know what they want - search helps them find it quickly instead of scrolling through the whole menu.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-003'],
    relatedEdgeCases: ['EC-MENU-REST-008', 'EC-MENU-REST-009'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant menu and find the search icon',
        detailedSteps: [
          '1. Open any restaurant\'s menu page',
          '2. Look for a magnifying glass icon (🔍) - usually at the top right',
          '3. Or look for a search bar at the top of the page',
          '4. Tap on the search icon or bar'
        ],
        whatYouShouldSee: 'A search icon (magnifying glass) is visible. Tapping it opens a search screen or reveals a search input field.',
        expectedResult: 'Search feature is accessible from menu page'
      },
      {
        step: 2,
        instruction: 'Type a search term that should find results',
        detailedSteps: [
          '1. In the search box, type a common food word like "chicken" or "salad"',
          '2. Wait a moment for results to appear',
          '3. Results should show dishes that match your search'
        ],
        whatYouShouldSee: 'A list of dishes that contain your search term. Each result shows the dish name, photo, and price.',
        expectedResult: 'Search returns matching dishes'
      },
      {
        step: 3,
        instruction: 'Tap on a search result to open the dish',
        detailedSteps: [
          '1. Tap on any dish in the search results',
          '2. The dish detail page should open',
          '3. You should be able to add it to your cart from here'
        ],
        whatYouShouldSee: 'Dish detail page opens with full information about the dish.',
        expectedResult: 'Tapping search result opens dish detail page'
      },
      {
        step: 4,
        instruction: 'Clear search and try another term',
        detailedSteps: [
          '1. Go back to the search page',
          '2. Clear the search box (tap X or delete text)',
          '3. Type a different search term',
          '4. Make sure new results appear'
        ],
        whatYouShouldSee: 'Clearing search removes results. New search term shows different results.',
        expectedResult: 'Search can be cleared and used again'
      }
    ],
    successChecklist: [
      '✓ Search icon/bar is visible and accessible',
      '✓ Typing a search term shows relevant results',
      '✓ Results show dish name, photo, and price',
      '✓ Tapping a result opens the dish detail page',
      '✓ Search can be cleared and reused'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t find search icon',
          whatToDo: 'Look at top right corner, or try scrolling up. If not there, mark as FAILED.'
        },
        {
          problem: 'Search doesn\'t show any results',
          whatToDo: 'Try a very common term like "rice" or "chicken". If still no results, mark as FAILED.'
        },
        {
          problem: 'Search results don\'t match search term',
          whatToDo: 'Take screenshot, mark as FAILED, note the search term and results shown.'
        }
      ]
    },
    preconditions: [
      'You have a restaurant menu open',
      'The restaurant has a variety of menu items'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Try using common food terms that the restaurant is likely to have.'
  },
  {
    id: 'TC-MENU-REST-006',
    title: 'Search With No Results',
    whatYoureTesting: 'Making sure the app handles gracefully when search doesn\'t find anything',
    whyItMatters: 'Sometimes people search for things that aren\'t on the menu. The app should show a helpful message, not crash or show a blank screen.',
    estimatedTime: '1-2 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-003'],
    relatedEdgeCases: ['EC-MENU-REST-008'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open search and type something that won\'t match',
        detailedSteps: [
          '1. Open the search in any restaurant menu',
          '2. Type something that definitely won\'t be on the menu',
          '3. Try "xyzabc123" or "elephantburger" or similar nonsense',
          '4. Wait for results'
        ],
        whatYouShouldSee: 'Either an empty results area, or a message saying "No results found" or similar',
        expectedResult: 'App shows empty state or no results message'
      },
      {
        step: 2,
        instruction: 'Check the empty state message',
        detailedSteps: [
          '1. Look at what the app shows when there are no results',
          '2. There should be some message or image indicating no results',
          '3. The app should NOT crash or show an error',
          '4. The search box should still be usable'
        ],
        whatYouShouldSee: 'A friendly message like "No results" or "Try a different search" possibly with an illustration. The search box is still active.',
        expectedResult: 'App handles no results gracefully with helpful message'
      }
    ],
    successChecklist: [
      '✓ Searching for nonsense doesn\'t crash the app',
      '✓ An appropriate "no results" message appears',
      '✓ The search box remains usable',
      '✓ User can try a new search'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'App crashes when search finds nothing',
          whatToDo: 'Note the search term, mark as FAILED with "Crash on empty search".'
        },
        {
          problem: 'No message shown - just a blank white screen',
          whatToDo: 'Take screenshot, mark as FAILED, note "No empty state message".'
        }
      ]
    },
    preconditions: [
      'You have search open in a restaurant menu'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Use completely random text that definitely won\'t match any menu items.'
  },

  // ============================================
  // PICKUP/DELIVERY TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-008',
    title: 'Switch Between Pickup and Delivery',
    whatYoureTesting: 'Making sure customers can switch between pickup (getting food yourself) and delivery (having it brought to you)',
    whyItMatters: 'Customers may change their mind about how they want to get their food. Switching should be easy and clear.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-005'],
    relatedEdgeCases: ['EC-MENU-REST-006', 'EC-MENU-REST-007'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant that supports both pickup and delivery',
        detailedSteps: [
          '1. Open any restaurant\'s menu page',
          '2. Look for a toggle or switch that says "Pickup" / "Delivery"',
          '3. It might be in the header area or near the restaurant info',
          '4. Note which option is currently selected'
        ],
        whatYouShouldSee: 'A toggle switch or tab selector showing Pickup and Delivery options. One should be highlighted/selected.',
        expectedResult: 'Pickup/Delivery toggle is visible'
      },
      {
        step: 2,
        instruction: 'Switch from current option to the other',
        detailedSteps: [
          '1. If Delivery is selected, tap Pickup (or vice versa)',
          '2. Watch for any loading indicators',
          '3. The menu might reload briefly',
          '4. If a popup appears, read what it says and respond'
        ],
        whatYouShouldSee: 'The toggle switches to the other option. You might see a loading indicator. If restaurant needs to change, a message appears explaining why.',
        expectedResult: 'Toggle switches successfully, menu updates if needed'
      },
      {
        step: 3,
        instruction: 'Verify the change took effect',
        detailedSteps: [
          '1. Look at the delivery/pickup indicator - it should show your new selection',
          '2. If you switched to Pickup, delivery time might change to pickup time',
          '3. Delivery fee might disappear if you chose Pickup',
          '4. Add an item to cart and check if the order type is correct'
        ],
        whatYouShouldSee: 'The selected order type is clearly shown. Relevant info (delivery time, fees) updates to reflect the change.',
        expectedResult: 'Order type change is reflected in UI and cart'
      }
    ],
    successChecklist: [
      '✓ Pickup/Delivery toggle is visible',
      '✓ Tapping toggle switches the selection',
      '✓ Menu updates appropriately after switch',
      '✓ Delivery time/fee changes reflect the new order type',
      '✓ Cart reflects the selected order type'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No toggle visible',
          whatToDo: 'Look in header area or scroll up. Some restaurants may only offer one option - try another restaurant.'
        },
        {
          problem: 'Toggle doesn\'t respond when tapped',
          whatToDo: 'Try tapping more firmly in the center. If still doesn\'t work, mark as FAILED.'
        },
        {
          problem: 'Menu gets stuck loading after switching',
          whatToDo: 'Wait 15 seconds. If still loading, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You have a restaurant open that supports both pickup and delivery',
      'You have a delivery address set (for delivery option)'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Some restaurants only offer delivery or only pickup - find one that offers both.'
  },
  {
    id: 'TC-MENU-REST-009',
    title: 'Restaurant Changes When Switching to Delivery',
    whatYoureTesting: 'Checking what happens when switching to delivery causes the app to find a different restaurant location',
    whyItMatters: 'Some restaurant chains have multiple locations. When you switch to delivery, the app might need to switch to a closer location.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-005', 'UC-MENU-REST-013'],
    relatedEdgeCases: ['EC-MENU-REST-007'],
    testSteps: [
      {
        step: 1,
        instruction: 'Find a chain restaurant with multiple locations',
        detailedSteps: [
          '1. Look for a known chain restaurant (like a popular burger or pizza chain)',
          '2. Open that restaurant',
          '3. Note the current address/location shown',
          '4. Start with Pickup selected if possible'
        ],
        whatYouShouldSee: 'A restaurant page showing the restaurant name and its address/location',
        expectedResult: 'Chain restaurant is open with location visible'
      },
      {
        step: 2,
        instruction: 'Switch to Delivery and watch for location change',
        detailedSteps: [
          '1. Tap to switch to Delivery',
          '2. Watch carefully for any popup messages',
          '3. If a message appears about changing location, read it',
          '4. The app might say something like "Switching to a closer location for delivery"'
        ],
        whatYouShouldSee: 'Either: the menu stays the same, OR a message appears explaining that you\'re being switched to a different location for delivery.',
        expectedResult: 'If location change needed, user is informed with clear message'
      },
      {
        step: 3,
        instruction: 'Verify the new location (if changed)',
        detailedSteps: [
          '1. If location changed, check the new address',
          '2. The menu should reload for the new location',
          '3. Any items in your cart might be cleared',
          '4. Make sure you can still browse and order'
        ],
        whatYouShouldSee: 'If changed: new address is shown, menu is loaded for new location. Cart may be empty if location changed.',
        expectedResult: 'New location is clearly shown, menu is functional'
      }
    ],
    successChecklist: [
      '✓ Toggle works even when location change is needed',
      '✓ User is informed if location is changing',
      '✓ Message explains why location is changing',
      '✓ New location is clearly displayed',
      '✓ Menu works correctly at new location'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Location changes without any message',
          whatToDo: 'Note the before/after addresses. Mark as FAILED - users should be informed.'
        },
        {
          problem: 'App crashes when location change is needed',
          whatToDo: 'Note the restaurant name, mark as BLOCKED.'
        }
      ]
    },
    preconditions: [
      'You have a chain restaurant with multiple locations',
      'You have a delivery address that might be closer to a different location'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'This may not trigger for all restaurants - depends on your location and restaurant locations.'
  },

  // ============================================
  // FAVORITES TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-010',
    title: 'Add and Remove Restaurant from Favorites',
    whatYoureTesting: 'Making sure the heart/favorite button works to save and unsave restaurants',
    whyItMatters: 'Customers want to quickly find restaurants they love. The favorite feature helps them do that.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-006'],
    relatedEdgeCases: ['EC-MENU-REST-004', 'EC-MENU-REST-005'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant and find the favorite icon',
        detailedSteps: [
          '1. Make sure you are logged in (not guest mode)',
          '2. Open any restaurant\'s menu page',
          '3. Look for a heart icon (❤️) - usually in the top right or header area',
          '4. Note if the heart is filled (red) or outlined (empty)'
        ],
        whatYouShouldSee: 'A heart icon somewhere on the restaurant page. If outline/empty = not favorited. If filled/red = already favorited.',
        expectedResult: 'Favorite icon is visible'
      },
      {
        step: 2,
        instruction: 'Tap the heart to add to favorites',
        detailedSteps: [
          '1. If the heart is empty/outlined, tap it',
          '2. The heart should immediately fill in or turn red',
          '3. You might see a small animation or confirmation',
          '4. If it was already favorited, tap to unfavorite first, then tap again'
        ],
        whatYouShouldSee: 'The heart icon changes from empty/outline to filled/red instantly when tapped.',
        expectedResult: 'Heart icon toggles to favorited state'
      },
      {
        step: 3,
        instruction: 'Verify restaurant appears in favorites list',
        detailedSteps: [
          '1. Go back to the main screen or restaurant list',
          '2. Find the "Favorites" section or tab',
          '3. The restaurant you just favorited should appear there',
          '4. Note: you might need to refresh or wait a moment'
        ],
        whatYouShouldSee: 'The restaurant appears in your favorites list/section.',
        expectedResult: 'Restaurant is saved to favorites'
      },
      {
        step: 4,
        instruction: 'Remove from favorites',
        detailedSteps: [
          '1. Go back to the restaurant page',
          '2. Tap the heart icon again to unfavorite',
          '3. The heart should turn back to outline/empty',
          '4. Check favorites list - restaurant should be removed'
        ],
        whatYouShouldSee: 'Heart icon changes back to empty/outline. Restaurant is removed from favorites list.',
        expectedResult: 'Restaurant is removed from favorites'
      }
    ],
    successChecklist: [
      '✓ Heart/favorite icon is visible',
      '✓ Tapping heart changes its state immediately',
      '✓ Restaurant appears in favorites list after favoriting',
      '✓ Tapping again removes from favorites',
      '✓ Favorites list updates correctly'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Heart icon doesn\'t change when tapped',
          whatToDo: 'Wait 2-3 seconds - might be saving. If still doesn\'t change, check internet, mark as FAILED.'
        },
        {
          problem: 'Restaurant doesn\'t appear in favorites list',
          whatToDo: 'Try refreshing favorites. If still not there, mark as FAILED.'
        },
        {
          problem: '"Please login" message appears',
          whatToDo: 'You\'re in guest mode. Log in first. This is expected behavior - mark test as PASS if it asked you to login.'
        }
      ]
    },
    preconditions: [
      'You are logged into the app (not guest mode)',
      'You have a restaurant page open'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Must be logged in - favorites don\'t work in guest mode.'
  },

  // ============================================
  // REWARDS TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-011',
    title: 'View Dynamic Rewards Progress',
    whatYoureTesting: 'Making sure the rewards progress bar shows correctly and updates as you add items to cart',
    whyItMatters: 'Rewards encourage customers to order more. If they can\'t see their progress, they won\'t be motivated.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-007'],
    relatedEdgeCases: ['EC-MENU-REST-017'],
    testSteps: [
      {
        step: 1,
        instruction: 'Find a restaurant that has rewards enabled',
        detailedSteps: [
          '1. Open restaurants and look for one with a rewards indicator',
          '2. Open the restaurant\'s menu page',
          '3. Look for a rewards section - usually near the top or bottom of the menu',
          '4. It might show a progress bar or reward tiers'
        ],
        whatYouShouldSee: 'A rewards widget showing something like "X left to earn FREE DELIVERY" or reward tiers with progress.',
        expectedResult: 'Rewards section is visible on menu page'
      },
      {
        step: 2,
        instruction: 'Understand the rewards display',
        detailedSteps: [
          '1. Read what the rewards widget shows',
          '2. Look for your current progress (like "$10 left to earn...")',
          '3. There might be multiple reward tiers',
          '4. A progress bar might show how close you are'
        ],
        whatYouShouldSee: 'Clear information about what rewards you can earn and how much more you need to spend to earn them.',
        expectedResult: 'Rewards information is clear and understandable'
      },
      {
        step: 3,
        instruction: 'Add items to cart and check if rewards update',
        detailedSteps: [
          '1. Add some items to your cart',
          '2. Go back to view the rewards widget',
          '3. The "amount left" should decrease based on what you added',
          '4. If you added enough, you might reach a reward tier'
        ],
        whatYouShouldSee: 'As you add items, the rewards progress updates. The "amount left" decreases. If you reach a tier, you might see a celebration (confetti) or message.',
        expectedResult: 'Rewards progress updates as cart total increases'
      }
    ],
    successChecklist: [
      '✓ Rewards widget is visible (if restaurant has rewards)',
      '✓ Progress amount is clear and readable',
      '✓ Reward tiers are understandable',
      '✓ Progress updates when items added to cart',
      '✓ Reaching a tier shows appropriate feedback'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No rewards widget visible',
          whatToDo: 'Not all restaurants have rewards. Try another restaurant. If none have it, mark as SKIP.'
        },
        {
          problem: 'Progress doesn\'t update when adding items',
          whatToDo: 'Make sure items are actually in cart. If they are and progress doesn\'t update, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You have a restaurant with rewards enabled',
      'The restaurant menu is loaded'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Not all restaurants have rewards - find one that does to test this.'
  },

  // ============================================
  // BACK NAVIGATION TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-012',
    title: 'Leave Restaurant Menu With Items in Cart',
    whatYoureTesting: 'Making sure the app asks for confirmation when you try to leave a restaurant menu with items in your cart',
    whyItMatters: 'If customers accidentally go back, they might lose their cart. The app should protect them from losing their selections.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-009'],
    relatedEdgeCases: ['EC-MENU-REST-012', 'EC-MENU-REST-013'],
    testSteps: [
      {
        step: 1,
        instruction: 'Add items to cart in a restaurant',
        detailedSteps: [
          '1. Open any restaurant',
          '2. Add at least one item to your cart',
          '3. You should see a cart indicator showing items',
          '4. Make sure at least one item is definitely in the cart'
        ],
        whatYouShouldSee: 'A cart indicator showing you have items (like a badge with "1" or "2" on it).',
        expectedResult: 'Items are in cart'
      },
      {
        step: 2,
        instruction: 'Try to go back from the restaurant menu',
        detailedSteps: [
          '1. Tap the back arrow at the top left, OR',
          '2. Swipe from left edge to go back (iPhone), OR',
          '3. Press the hardware back button (Android)',
          '4. Watch for a popup or confirmation dialog'
        ],
        whatYouShouldSee: 'A popup/dialog appears asking if you want to leave. It might say something like "You have items in your cart. Leave anyway?"',
        expectedResult: 'Confirmation dialog appears before leaving'
      },
      {
        step: 3,
        instruction: 'Choose to stay and verify cart is intact',
        detailedSteps: [
          '1. In the popup, choose to stay/cancel',
          '2. You should remain on the menu page',
          '3. Check that your cart items are still there',
          '4. Items should not have been removed'
        ],
        whatYouShouldSee: 'After choosing to stay, you\'re still on the menu. Cart items are preserved.',
        expectedResult: 'Choosing to stay keeps you on menu with cart intact'
      },
      {
        step: 4,
        instruction: 'Try again and choose to leave',
        detailedSteps: [
          '1. Try to go back again',
          '2. This time, choose to leave/confirm',
          '3. You should navigate away from the menu',
          '4. Your cart is saved for later'
        ],
        whatYouShouldSee: 'After choosing to leave, you go back to the previous screen. Your cart should be saved.',
        expectedResult: 'Choosing to leave navigates back and saves cart'
      }
    ],
    successChecklist: [
      '✓ Confirmation appears when trying to leave with items in cart',
      '✓ Choosing "stay" keeps you on the menu',
      '✓ Cart items are preserved after staying',
      '✓ Choosing "leave" navigates back',
      '✓ Cart is saved when you leave'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No confirmation popup - just goes back immediately',
          whatToDo: 'Make sure you have items in cart. If you do and no popup appears, mark as FAILED.'
        },
        {
          problem: 'Cart is cleared after choosing to leave',
          whatToDo: 'Check if cart should have been saved. If items are lost, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You are on a restaurant menu page',
      'You have items in your cart'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'This is an important safety feature to prevent accidental cart loss.'
  },

  // ============================================
  // POPUP & NOTIFICATION TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-013',
    title: 'Restaurant Popup Message Display',
    whatYoureTesting: 'Making sure special restaurant messages (like announcements or warnings) display correctly',
    whyItMatters: 'Restaurants may need to communicate important info like "Kitchen closes early today" or "Special offer inside!"',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-012'],
    relatedEdgeCases: ['EC-MENU-REST-014'],
    testSteps: [
      {
        step: 1,
        instruction: 'Find a restaurant with a popup message (if available)',
        detailedSteps: [
          '1. This test requires a restaurant that has a popup message configured',
          '2. Open various restaurants and watch for popup dialogs',
          '3. The popup might appear right after the menu loads',
          '4. It might contain an announcement, offer, or warning'
        ],
        whatYouShouldSee: 'A popup dialog with the restaurant name, a message, and possibly an image.',
        expectedResult: 'Popup displays with restaurant message'
      },
      {
        step: 2,
        instruction: 'Read and dismiss the popup',
        detailedSteps: [
          '1. Read the message in the popup',
          '2. Note if there\'s an image',
          '3. Tap the dismiss button or tap outside to close',
          '4. The popup should close and you can browse the menu'
        ],
        whatYouShouldSee: 'Popup closes when dismissed. You can now browse the menu normally.',
        expectedResult: 'Popup can be dismissed and menu is accessible'
      }
    ],
    successChecklist: [
      '✓ Popup displays with clear message (if configured)',
      '✓ Restaurant name is shown in popup',
      '✓ Image displays if included',
      '✓ Popup can be dismissed',
      '✓ Menu is accessible after dismissing'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t find a restaurant with popup',
          whatToDo: 'This is normal - not all restaurants have popups. Mark as SKIP if none found.'
        },
        {
          problem: 'Popup can\'t be dismissed',
          whatToDo: 'Try tapping various buttons and outside the popup. If stuck, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'Need to find a restaurant that has a popup message configured'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'This depends on restaurant configuration - may not be testable if no restaurants have popups.'
  },

  // ============================================
  // NEAREST RESTAURANT TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-014',
    title: 'Automatic Nearest Restaurant Selection',
    whatYoureTesting: 'Making sure the app automatically selects the closest restaurant location for delivery',
    whyItMatters: 'Customers want the fastest delivery. The app should automatically use the closest location when possible.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-013'],
    relatedEdgeCases: ['EC-MENU-REST-015', 'EC-MENU-REST-016'],
    testSteps: [
      {
        step: 1,
        instruction: 'Find a chain restaurant with multiple locations',
        detailedSteps: [
          '1. Think of a chain restaurant (like a popular fast food or coffee chain)',
          '2. Search for it in the app',
          '3. You might see multiple locations listed',
          '4. Open one that might not be the closest'
        ],
        whatYouShouldSee: 'Chain restaurant options, possibly with different addresses or location names.',
        expectedResult: 'Chain restaurant is accessible'
      },
      {
        step: 2,
        instruction: 'Open the restaurant and watch for location handling',
        detailedSteps: [
          '1. Open the restaurant',
          '2. The app might automatically switch to a closer location',
          '3. Watch for any messages about location changes',
          '4. Note the displayed address'
        ],
        whatYouShouldSee: 'Restaurant opens, possibly with a message about selecting the closest location for delivery.',
        expectedResult: 'App handles location selection appropriately'
      },
      {
        step: 3,
        instruction: 'Verify delivery estimate makes sense',
        detailedSteps: [
          '1. Check the delivery time estimate',
          '2. It should be reasonable for the distance',
          '3. A closer location should have a shorter delivery time'
        ],
        whatYouShouldSee: 'Delivery time that makes sense for how far the restaurant is from your address.',
        expectedResult: 'Delivery estimate is reasonable'
      }
    ],
    successChecklist: [
      '✓ App can access chain restaurant with multiple locations',
      '✓ Closest location is selected (or user is informed of selection)',
      '✓ Delivery time estimate is reasonable',
      '✓ No confusion about which location is being used'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t find chain restaurants',
          whatToDo: 'Try searching for popular chains. Mark as SKIP if none available in your area.'
        },
        {
          problem: 'Delivery time seems wrong for the location',
          whatToDo: 'Note the time and location, mark as FAILED if clearly incorrect.'
        }
      ]
    },
    preconditions: [
      'You have chain restaurants available in your area',
      'You have a delivery address set'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'This depends on having multiple locations of the same chain in your area.'
  },

  // ============================================
  // GUEST MODE TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-015',
    title: 'Guest User Limited Menu Access',
    whatYoureTesting: 'Making sure non-logged-in users can browse menus but with some limitations',
    whyItMatters: 'We want guests to browse and get interested, but also encourage them to log in for full access.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-014'],
    relatedEdgeCases: ['EC-MENU-REST-003', 'EC-MENU-REST-005'],
    testSteps: [
      {
        step: 1,
        instruction: 'Log out and browse as a guest',
        detailedSteps: [
          '1. Log out of the app (or use incognito/guest mode if available)',
          '2. Browse to the restaurant list',
          '3. Open any restaurant\'s menu',
          '4. Note if you can see all dishes or just some'
        ],
        whatYouShouldSee: 'Menu loads but you might see only a limited number of dishes, or a "Login to see more" message.',
        expectedResult: 'Guest can browse menu with some limitations'
      },
      {
        step: 2,
        instruction: 'Look for login prompts',
        detailedSteps: [
          '1. Scroll through the menu',
          '2. Look for any "Login to see more" messages',
          '3. Try to add a dish to favorites',
          '4. You should be prompted to log in'
        ],
        whatYouShouldSee: 'Messages encouraging login, especially when trying features that require an account.',
        expectedResult: 'Login prompts appear for restricted features'
      },
      {
        step: 3,
        instruction: 'Verify basic browsing still works',
        detailedSteps: [
          '1. Make sure you can tap on dishes to see details',
          '2. You should be able to see prices',
          '3. Basic navigation should work',
          '4. But some features may require login'
        ],
        whatYouShouldSee: 'Basic browsing works - can see dishes, prices, and basic info. Advanced features prompt for login.',
        expectedResult: 'Basic functionality works for guests'
      }
    ],
    successChecklist: [
      '✓ Guest can open restaurant menu',
      '✓ Some dishes are visible',
      '✓ "Login to see more" appears if dishes are limited',
      '✓ Trying to favorite prompts for login',
      '✓ Basic browsing works without login'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t browse at all without logging in',
          whatToDo: 'If the app requires login to see any menu, note this. Mark as FAILED if should allow guest browsing.'
        },
        {
          problem: 'No indication of limited access',
          whatToDo: 'If guests can see everything without any login prompts, this might be intentional or a bug. Note behavior.'
        }
      ]
    },
    preconditions: [
      'You are NOT logged in (guest mode)',
      'Restaurant menu is accessible'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Log out first before testing, or use a private browser session.'
  },

  // ============================================
  // TUTORIAL TESTS (P3 - Low)
  // ============================================
  {
    id: 'TC-MENU-REST-016',
    title: 'First-Time User Tutorial Display',
    whatYoureTesting: 'Making sure new users see a helpful tutorial when they first open a restaurant menu',
    whyItMatters: 'New users might not know how to use the app. A tutorial helps them learn quickly.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P3',
    relatedUseCases: ['UC-MENU-REST-015'],
    relatedEdgeCases: ['EC-MENU-REST-021'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open restaurant menu as a new/first-time user',
        detailedSteps: [
          '1. If possible, create a new test account or clear app data',
          '2. Open the app fresh',
          '3. Navigate to a restaurant menu',
          '4. Watch for any tutorial highlights or tooltips'
        ],
        whatYouShouldSee: 'A tutorial overlay might appear, highlighting key features like "Tap here to search" or "Swipe to see categories".',
        expectedResult: 'Tutorial displays for first-time users'
      },
      {
        step: 2,
        instruction: 'Interact with tutorial if shown',
        detailedSteps: [
          '1. If tutorial appears, follow the prompts',
          '2. Tap "Next" or tap highlighted areas as instructed',
          '3. Complete or skip the tutorial',
          '4. Verify you can use the menu normally after'
        ],
        whatYouShouldSee: 'Tutorial guides you through features, then disappears. Menu is fully usable afterward.',
        expectedResult: 'Tutorial is completable and menu works after'
      }
    ],
    successChecklist: [
      '✓ Tutorial appears for new users (if implemented)',
      '✓ Tutorial highlights are clear and helpful',
      '✓ Tutorial can be completed or skipped',
      '✓ Menu works normally after tutorial'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No tutorial appears',
          whatToDo: 'Tutorials might only show once ever. Try with a fresh account. Mark as SKIP if can\'t trigger.'
        },
        {
          problem: 'Tutorial blocks using the app',
          whatToDo: 'If you can\'t dismiss or complete the tutorial, mark as BLOCKED.'
        }
      ]
    },
    preconditions: [
      'Fresh install or new account that hasn\'t seen the tutorial',
      'Tutorial feature is enabled in the app'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Tutorials often only show once - may need fresh account to test.'
  },

  // ============================================
  // ERROR HANDLING TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-017',
    title: 'Handle Network Error When Loading Menu',
    whatYoureTesting: 'Making sure the app handles gracefully when internet fails during menu loading',
    whyItMatters: 'People order food on the go - their internet might be spotty. The app shouldn\'t crash or show confusing errors.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-001'],
    relatedEdgeCases: ['EC-MENU-REST-001'],
    testSteps: [
      {
        step: 1,
        instruction: 'Start loading a restaurant menu',
        detailedSteps: [
          '1. Go to the restaurant list',
          '2. Start tapping on a restaurant to open it',
          '3. Immediately turn off WiFi AND mobile data',
          '4. Watch what happens'
        ],
        whatYouShouldSee: 'The app tries to load but fails. It should show an error message like "No internet" or "Couldn\'t load menu" - NOT crash.',
        expectedResult: 'App shows user-friendly error message, does not crash'
      },
      {
        step: 2,
        instruction: 'Verify error message is helpful',
        detailedSteps: [
          '1. Read the error message',
          '2. It should explain what went wrong',
          '3. Look for a "Retry" or "Try Again" button',
          '4. The message should not be technical jargon'
        ],
        whatYouShouldSee: 'A friendly error message in plain language, with an option to retry.',
        expectedResult: 'Error message is clear and provides retry option'
      },
      {
        step: 3,
        instruction: 'Turn internet back on and retry',
        detailedSteps: [
          '1. Turn WiFi or mobile data back on',
          '2. Wait for connection',
          '3. Tap "Retry" or pull to refresh',
          '4. Menu should load successfully now'
        ],
        whatYouShouldSee: 'After reconnecting, tapping retry loads the menu successfully.',
        expectedResult: 'Retry works and menu loads when internet is restored'
      }
    ],
    successChecklist: [
      '✓ App does not crash when internet fails',
      '✓ Error message is shown (not blank screen)',
      '✓ Error message is in plain language',
      '✓ Retry option is available',
      '✓ Retry works when internet is restored'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'App crashes when internet fails',
          whatToDo: 'Note when the crash happened, mark as FAILED with "Crash on network error".'
        },
        {
          problem: 'Just shows blank screen with no error message',
          whatToDo: 'Wait 30 seconds. If still blank, take screenshot, mark as FAILED.'
        },
        {
          problem: 'Error message is technical/confusing',
          whatToDo: 'Screenshot the message, mark as FAILED with "Confusing error message".'
        }
      ]
    },
    preconditions: [
      'You can toggle your internet connection (WiFi and mobile data)',
      'App is open and functional before test'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Make sure to turn internet back on before testing other things!'
  },
  {
    id: 'TC-MENU-REST-018',
    title: 'Handle Empty Menu Categories',
    whatYoureTesting: 'Making sure the app handles gracefully when a restaurant has empty or missing menu sections',
    whyItMatters: 'Sometimes restaurants have incomplete menus. The app should show what\'s available, not break.',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-001'],
    relatedEdgeCases: ['EC-MENU-REST-002', 'EC-MENU-REST-019'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open various restaurants and check for empty categories',
        detailedSteps: [
          '1. Open several different restaurant menus',
          '2. Scroll through their categories',
          '3. Look for any categories that might be empty',
          '4. Empty categories might show no dishes or be hidden entirely'
        ],
        whatYouShouldSee: 'Either: empty categories are hidden, or if shown, they display a message like "No items available" - NOT an error.',
        expectedResult: 'Empty categories are handled gracefully'
      },
      {
        step: 2,
        instruction: 'Verify non-empty categories work normally',
        detailedSteps: [
          '1. Make sure categories with dishes still work',
          '2. You can browse them and tap on dishes',
          '3. Empty categories don\'t affect other categories'
        ],
        whatYouShouldSee: 'Categories with dishes work normally. Empty categories don\'t cause problems.',
        expectedResult: 'App works normally despite some empty categories'
      }
    ],
    successChecklist: [
      '✓ Empty categories don\'t crash the app',
      '✓ Empty categories are either hidden or show appropriate message',
      '✓ Non-empty categories still work correctly',
      '✓ Navigation between categories works'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'App crashes when encountering empty category',
          whatToDo: 'Note the restaurant and category, mark as FAILED.'
        },
        {
          problem: 'Empty category shows error message',
          whatToDo: 'Screenshot the error, mark as FAILED - should handle gracefully.'
        }
      ]
    },
    preconditions: [
      'Access to restaurants with potentially empty categories',
      'Multiple restaurants to test'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'This may be hard to test if all restaurants have complete menus.'
  },

  // ============================================
  // SUB-MENU NAVIGATION TESTS (P1 - High)
  // ============================================
  {
    id: 'TC-MENU-REST-019',
    title: 'Navigate Sub-Menu Categories in Market',
    whatYoureTesting: 'Making sure customers can drill down into sub-categories in market stores and view all nested products',
    whyItMatters: 'Large grocery stores have many nested categories (Dairy → Milk → Almond Milk). If navigation is broken, customers can\'t find products.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P1',
    relatedUseCases: ['UC-MENU-REST-004'],
    relatedEdgeCases: ['EC-MENU-REST-010', 'EC-MENU-REST-019'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a market store with nested categories',
        detailedSteps: [
          '1. Open a grocery or convenience store (market-style)',
          '2. Look at the main category rows',
          '3. Find a category that likely has sub-categories (like "Dairy" or "Beverages")',
          '4. Look for a "See All" button next to the category name'
        ],
        whatYouShouldSee: 'A market view with horizontal product rows. Each category should have its name and a "See All" link or button.',
        expectedResult: 'Market is open with categories visible'
      },
      {
        step: 2,
        instruction: 'Tap "See All" to open the full category view',
        detailedSteps: [
          '1. Tap the "See All" button for a main category',
          '2. Wait for the sub-menu view to load',
          '3. You should see a new page with sub-categories listed',
          '4. Each sub-category should show its products or more nested categories'
        ],
        whatYouShouldSee: 'A dedicated page for that category showing all sub-categories. You might see tabs or sections for different sub-types of products.',
        expectedResult: 'Sub-menu view opens with all sub-categories'
      },
      {
        step: 3,
        instruction: 'Navigate into a sub-category',
        detailedSteps: [
          '1. Tap on one of the sub-categories',
          '2. You should see products within that sub-category',
          '3. Each product should have a photo, name, and price',
          '4. You should be able to add products to cart from here'
        ],
        whatYouShouldSee: 'A list or grid of products filtered to that sub-category. Products are clickable and show full details.',
        expectedResult: 'Sub-category products are displayed correctly'
      },
      {
        step: 4,
        instruction: 'Navigate back through the category hierarchy',
        detailedSteps: [
          '1. Use the back button or back arrow at the top',
          '2. You should return to the previous sub-menu view',
          '3. Continue going back until you reach the main market view',
          '4. Make sure you can browse other categories'
        ],
        whatYouShouldSee: 'Each back press returns you to the previous level. Finally you\'re back at the main market view.',
        expectedResult: 'Back navigation through category hierarchy works correctly'
      }
    ],
    successChecklist: [
      '✓ "See All" button opens sub-menu view',
      '✓ Sub-categories are displayed clearly',
      '✓ Products within sub-categories are accessible',
      '✓ Navigation back through levels works smoothly',
      '✓ No loading errors when drilling down'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Sub-menu view is empty or shows loading forever',
          whatToDo: 'Wait 10 seconds. If still loading, take screenshot and mark as FAILED.'
        },
        {
          problem: 'Can\'t navigate back - stuck in sub-category',
          whatToDo: 'Try the physical back button. If still stuck, mark as BLOCKED.'
        },
        {
          problem: 'Products don\'t appear in sub-category',
          whatToDo: 'Check if category is genuinely empty. If should have products, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You have a market store open',
      'The store has categories with sub-categories (nested)'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Not all markets have deep nesting - find a larger grocery store for best testing.'
  },

  // ============================================
  // TRENDING DISHES TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-020',
    title: 'View Trending Dishes Section',
    whatYoureTesting: 'Making sure the trending/popular dishes section appears and works correctly at restaurants',
    whyItMatters: 'Trending dishes help customers discover popular items quickly, which can increase sales and customer satisfaction.',
    estimatedTime: '2-3 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-001'],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant and look for trending dishes',
        detailedSteps: [
          '1. Open any restaurant menu page',
          '2. Scroll down just below the restaurant header',
          '3. Look for a section labeled "Trending", "Popular", or "Featured"',
          '4. This section typically shows a horizontal row of dishes'
        ],
        whatYouShouldSee: 'A horizontal scrolling section with popular/trending dishes. Each dish shows a photo, name, and price.',
        expectedResult: 'Trending dishes section is visible if restaurant has popular items'
      },
      {
        step: 2,
        instruction: 'Scroll through the trending dishes',
        detailedSteps: [
          '1. Swipe left/right on the trending dishes row',
          '2. You should see multiple dishes as you scroll',
          '3. Each dish card should be consistent in size and layout',
          '4. Note the variety of items shown'
        ],
        whatYouShouldSee: 'Smooth horizontal scrolling through multiple trending items. Each item displays correctly with image, name, and price.',
        expectedResult: 'Trending dishes can be scrolled and viewed'
      },
      {
        step: 3,
        instruction: 'Tap a trending dish to see details',
        detailedSteps: [
          '1. Tap on any dish in the trending section',
          '2. The dish detail page should open',
          '3. You should see full information about the dish',
          '4. You can add the dish to your cart from here'
        ],
        whatYouShouldSee: 'Dish detail page opens with complete information, including options and "Add to Cart" button.',
        expectedResult: 'Tapping trending dish opens dish detail correctly'
      }
    ],
    successChecklist: [
      '✓ Trending section appears (if restaurant has trending dishes)',
      '✓ Trending dishes show photo, name, and price',
      '✓ Horizontal scrolling works smoothly',
      '✓ Tapping a trending dish opens the detail page',
      '✓ Can add trending dish to cart'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No trending section visible',
          whatToDo: 'Not all restaurants have trending dishes. Try a popular restaurant. If none have it, mark as SKIP.'
        },
        {
          problem: 'Trending dish images don\'t load',
          whatToDo: 'Wait a few seconds. If still broken, take screenshot and mark as FAILED.'
        },
        {
          problem: 'Tapping trending dish does nothing',
          whatToDo: 'Try tapping firmly. If still doesn\'t respond, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You have a restaurant menu open',
      'Restaurant has trending/popular dishes configured'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'Trending dishes depend on restaurant configuration - not all have this section.'
  },

  // ============================================
  // RESTAURANT INFO DISPLAY TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-021',
    title: 'View Restaurant Hours and Cuisine Types',
    whatYoureTesting: 'Making sure restaurant operating hours and cuisine types are displayed correctly and switch between each other',
    whyItMatters: 'Customers need to know if a restaurant is open and what kind of food they serve before ordering.',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-010'],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant and find the info section',
        detailedSteps: [
          '1. Open any restaurant menu page',
          '2. Look at the header area below the restaurant photo',
          '3. Find where the hours and cuisine info are displayed',
          '4. This is usually near the restaurant name'
        ],
        whatYouShouldSee: 'Restaurant header with name, and below it you should see either cuisine types (like "Italian, Pizza, Pasta") or hours (like "10:00 AM - 10:00 PM")',
        expectedResult: 'Restaurant info section is visible'
      },
      {
        step: 2,
        instruction: 'Watch for the info to switch (if cuisines are shown)',
        detailedSteps: [
          '1. If the restaurant shows cuisine types, keep watching',
          '2. After 2-3 seconds, it might automatically switch to show hours',
          '3. Then it switches back to cuisines',
          '4. This animation should be smooth'
        ],
        whatYouShouldSee: 'The text smoothly switches between showing cuisine types and operating hours every few seconds.',
        expectedResult: 'Cuisine and hours alternate display (if both available)'
      },
      {
        step: 3,
        instruction: 'Verify hours information',
        detailedSteps: [
          '1. Wait for the hours to be displayed',
          '2. Check that the format makes sense (like "9:00 AM - 11:00 PM")',
          '3. Make sure it\'s not showing random or broken text',
          '4. The times should be reasonable for a restaurant'
        ],
        whatYouShouldSee: 'Clear, properly formatted operating hours. The format should be easy to read.',
        expectedResult: 'Hours are displayed correctly'
      }
    ],
    successChecklist: [
      '✓ Restaurant info section is visible',
      '✓ Cuisine types are shown (if available)',
      '✓ Operating hours are displayed correctly',
      '✓ Switching animation is smooth (if applicable)',
      '✓ No broken or garbled text'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Hours show weird format or wrong values',
          whatToDo: 'Take screenshot of incorrect hours. Mark as FAILED with note about what\'s wrong.'
        },
        {
          problem: 'No info shown at all',
          whatToDo: 'Check if restaurant has this info configured. If all restaurants missing, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'Restaurant menu is open',
      'Restaurant has hours and/or cuisine info configured'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'The switching animation only happens if the restaurant has cuisine types configured.'
  },

  // ============================================
  // GRID VIEW TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-022',
    title: 'Toggle Grid View in Market Store',
    whatYoureTesting: 'Making sure customers can switch between list view and grid view in market stores',
    whyItMatters: 'Different people prefer different layouts. Grid view shows more products at once, list view shows more detail.',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-002'],
    relatedEdgeCases: ['EC-MENU-REST-020'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a market store and look for view toggle',
        detailedSteps: [
          '1. Open a market-style store (grocery, convenience)',
          '2. Look for a view toggle icon - usually a grid icon or list icon',
          '3. It\'s often in the top right area or near the search',
          '4. Note the current view mode (grid or list)'
        ],
        whatYouShouldSee: 'A toggle button/icon that lets you switch between viewing products as a grid or a list.',
        expectedResult: 'View toggle is visible (if market supports it)'
      },
      {
        step: 2,
        instruction: 'Tap to switch view modes',
        detailedSteps: [
          '1. Tap the view toggle button',
          '2. The layout should change from grid to list (or vice versa)',
          '3. Products should rearrange smoothly',
          '4. All products should still be visible'
        ],
        whatYouShouldSee: 'Layout changes: Grid shows smaller cards in a matrix, List shows larger cards in a column.',
        expectedResult: 'View mode switches correctly'
      },
      {
        step: 3,
        instruction: 'Verify products are accessible in both views',
        detailedSteps: [
          '1. Scroll through products in the new view mode',
          '2. Tap on a product to make sure it opens correctly',
          '3. Go back and switch view modes again',
          '4. Products should still work correctly'
        ],
        whatYouShouldSee: 'Products work the same in both views - you can scroll, tap to open, and add to cart.',
        expectedResult: 'Both view modes are fully functional'
      }
    ],
    successChecklist: [
      '✓ View toggle is accessible',
      '✓ Toggling changes the layout',
      '✓ Products display correctly in both modes',
      '✓ Products are clickable in both modes',
      '✓ Transition between views is smooth'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No view toggle visible',
          whatToDo: 'Not all markets may have this feature. Try different markets. Mark as SKIP if not available.'
        },
        {
          problem: 'Products disappear when switching views',
          whatToDo: 'Take screenshot, mark as FAILED. Note which view mode caused the issue.'
        }
      ]
    },
    preconditions: [
      'You have a market store open',
      'Market supports view toggle (not all do)'
    ],
    automatable: true,
    status: 'Not Started',
    notes: 'View toggle is primarily for market stores, not traditional restaurants.'
  },

  // ============================================
  // DEEP LINK TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-023',
    title: 'Open Restaurant via Deep Link',
    whatYoureTesting: 'Making sure shared restaurant links open the correct restaurant directly in the app',
    whyItMatters: 'When someone shares a restaurant link, it should open directly. This is important for marketing and sharing.',
    estimatedTime: '3-4 minutes',
    type: 'Integration',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-001'],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Get a restaurant share link',
        detailedSteps: [
          '1. Open any restaurant in the app',
          '2. Look for a "Share" button (often near the restaurant name)',
          '3. Copy the share link (you might need to tap "Copy Link")',
          '4. Close the restaurant and go back to home'
        ],
        whatYouShouldSee: 'A share option that lets you copy a link to the restaurant.',
        expectedResult: 'Share link is copied'
      },
      {
        step: 2,
        instruction: 'Open the link from outside the app',
        detailedSteps: [
          '1. Close the app completely',
          '2. Open a browser or notes app',
          '3. Paste the link and tap on it',
          '4. The app should open directly to that restaurant'
        ],
        whatYouShouldSee: 'App opens automatically and navigates directly to the restaurant menu page.',
        expectedResult: 'Deep link opens the correct restaurant'
      },
      {
        step: 3,
        instruction: 'Verify the restaurant is correct',
        detailedSteps: [
          '1. Check that the restaurant name matches',
          '2. Menu should be loaded',
          '3. All functionality should work (browse, add to cart, etc.)',
          '4. You should be able to navigate away normally'
        ],
        whatYouShouldSee: 'The exact restaurant you shared is open with full functionality.',
        expectedResult: 'Restaurant loads correctly from deep link'
      }
    ],
    successChecklist: [
      '✓ Share link can be copied',
      '✓ Deep link opens the app',
      '✓ Correct restaurant loads',
      '✓ Menu is fully functional',
      '✓ Can navigate away normally'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Link opens in browser instead of app',
          whatToDo: 'Make sure app is installed. Try uninstalling/reinstalling. Check device settings for app links.'
        },
        {
          problem: 'Wrong restaurant opens',
          whatToDo: 'Take screenshot showing wrong restaurant. Mark as FAILED with the link you used.'
        },
        {
          problem: 'App opens but crashes',
          whatToDo: 'Note the link, mark as BLOCKED. Try with different restaurants to see if reproducible.'
        }
      ]
    },
    preconditions: [
      'App is installed on device',
      'Device allows app links (deep linking enabled)',
      'You have a restaurant share link'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Deep link behavior may vary by device and OS version.'
  },

  // ============================================
  // RESTAURANT HEADER TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-024',
    title: 'Restaurant Header Collapse and Expand on Scroll',
    whatYoureTesting: 'Making sure the restaurant header collapses when scrolling down and expands when scrolling up',
    whyItMatters: 'Collapsing header gives more screen space for menu items while keeping essential info visible.',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-010', 'UC-MENU-REST-011'],
    relatedEdgeCases: ['EC-MENU-REST-022'],
    testSteps: [
      {
        step: 1,
        instruction: 'Open a restaurant and note the header',
        detailedSteps: [
          '1. Open any restaurant menu',
          '2. At the top you should see a large header with restaurant photo and info',
          '3. Note how much space the header takes up',
          '4. You should see the full restaurant image and details'
        ],
        whatYouShouldSee: 'A large header area showing restaurant image, name, rating, hours, and other info.',
        expectedResult: 'Header is in expanded state showing full info'
      },
      {
        step: 2,
        instruction: 'Scroll down through the menu',
        detailedSteps: [
          '1. Start scrolling down through the menu items',
          '2. Watch the header area as you scroll',
          '3. The header should shrink/collapse as you scroll down',
          '4. Eventually it becomes a compact bar at the top'
        ],
        whatYouShouldSee: 'Header smoothly collapses to a smaller size. The category tabs become visible/sticky at the top.',
        expectedResult: 'Header collapses when scrolling down'
      },
      {
        step: 3,
        instruction: 'Scroll back up to expand header',
        detailedSteps: [
          '1. Now scroll back up toward the top of the menu',
          '2. Watch the header as you approach the top',
          '3. The header should gradually expand back to full size',
          '4. Once at top, header should be fully expanded'
        ],
        whatYouShouldSee: 'Header smoothly expands back to full size, showing the complete restaurant image and info again.',
        expectedResult: 'Header expands when scrolling back up'
      }
    ],
    successChecklist: [
      '✓ Header starts in expanded state',
      '✓ Scrolling down collapses the header',
      '✓ Collapse animation is smooth',
      '✓ Scrolling up expands the header',
      '✓ Category tabs become visible when collapsed',
      '✓ No flickering or jumping during animation'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Header doesn\'t collapse at all',
          whatToDo: 'Try scrolling more aggressively. If still doesn\'t collapse, mark as FAILED.'
        },
        {
          problem: 'Header jumps or flickers during scroll',
          whatToDo: 'Take video if possible. Mark as FAILED noting the jerky behavior.'
        },
        {
          problem: 'Header gets stuck in collapsed state',
          whatToDo: 'Try scrolling to very top. If still stuck, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'Restaurant menu is loaded',
      'Menu has enough items to scroll'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Animation smoothness is important - look for any jerkiness or stuttering.'
  },

  // ============================================
  // REPORT ISSUE TESTS (P3 - Low)
  // ============================================
  {
    id: 'TC-MENU-REST-025',
    title: 'Report an Issue with Restaurant',
    whatYoureTesting: 'Making sure customers can report problems with a restaurant (wrong info, bad experience, etc.)',
    whyItMatters: 'Customer feedback helps maintain quality. Reporting issues lets the platform address problems.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P3',
    relatedUseCases: [],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Find the report issue option',
        detailedSteps: [
          '1. Open any restaurant menu page',
          '2. Look for a menu button (three dots ⋮) or info icon',
          '3. Look for "Report Issue", "Report Problem", or similar option',
          '4. It might also be in restaurant info/details section'
        ],
        whatYouShouldSee: 'An option somewhere to report an issue with the restaurant.',
        expectedResult: 'Report issue option is accessible'
      },
      {
        step: 2,
        instruction: 'Open the report form and view issue types',
        detailedSteps: [
          '1. Tap on the report issue option',
          '2. A form or screen should appear',
          '3. Look for a list of issue types to choose from',
          '4. Common types: "Wrong hours", "Menu incorrect", "Bad experience", etc.'
        ],
        whatYouShouldSee: 'A report form with selectable issue types and possibly a text field for details.',
        expectedResult: 'Report form opens with issue type options'
      },
      {
        step: 3,
        instruction: 'Fill out and submit a report (use test data)',
        detailedSteps: [
          '1. Select an issue type',
          '2. If there\'s a comments/details field, type "TEST REPORT - PLEASE IGNORE"',
          '3. Tap the submit/send button',
          '4. Watch for confirmation message'
        ],
        whatYouShouldSee: 'After submitting, a confirmation message appears thanking you for the report.',
        expectedResult: 'Report submits successfully with confirmation'
      }
    ],
    successChecklist: [
      '✓ Report issue option is findable',
      '✓ Report form opens correctly',
      '✓ Issue types are listed',
      '✓ Form can be filled out',
      '✓ Submission works with confirmation'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t find report issue option',
          whatToDo: 'Check restaurant info page, menu button, or settings. If truly not there, mark as SKIP.'
        },
        {
          problem: 'Report submission fails',
          whatToDo: 'Check internet connection. If connected and still fails, mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'You are logged into the app',
      'Restaurant menu is open'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Make sure to note this is a test report so it can be ignored by support staff.'
  },

  // ============================================
  // SCHEDULED ORDER TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-026',
    title: 'Schedule an Order for Later',
    whatYoureTesting: 'Making sure customers can schedule orders for a future time instead of ordering for immediate delivery',
    whyItMatters: 'Scheduled orders let customers plan ahead for parties, meetings, or specific mealtimes.',
    estimatedTime: '3-4 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: [],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Find the schedule option in restaurant menu',
        detailedSteps: [
          '1. Open a restaurant menu page',
          '2. Look for a "Schedule" or "Order for Later" option',
          '3. It might be near the delivery/pickup toggle',
          '4. Or it could be in the checkout process'
        ],
        whatYouShouldSee: 'An option to schedule the order for a future date/time instead of "ASAP".',
        expectedResult: 'Schedule option is visible and accessible'
      },
      {
        step: 2,
        instruction: 'Select a scheduled time',
        detailedSteps: [
          '1. Tap on the schedule option',
          '2. A time picker should appear',
          '3. Select a date (if available) and time',
          '4. Make sure to pick a time the restaurant will be open'
        ],
        whatYouShouldSee: 'A time picker or dropdown with available times. Only valid times should be selectable (when restaurant is open).',
        expectedResult: 'Can select a valid scheduled time'
      },
      {
        step: 3,
        instruction: 'Verify scheduled time is applied',
        detailedSteps: [
          '1. After selecting, the time should be saved',
          '2. Look for confirmation that order is scheduled',
          '3. The displayed delivery time should show your scheduled time',
          '4. Add an item to cart to see if schedule persists'
        ],
        whatYouShouldSee: 'UI shows the scheduled time instead of "ASAP". This should persist through browsing and cart.',
        expectedResult: 'Scheduled time is saved and displayed correctly'
      }
    ],
    successChecklist: [
      '✓ Schedule option is accessible',
      '✓ Time picker shows available slots',
      '✓ Only valid times are selectable',
      '✓ Selected time is saved',
      '✓ Scheduled time persists in cart'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No schedule option visible',
          whatToDo: 'Not all restaurants support scheduling. Try a different restaurant. Mark as SKIP if none support it.'
        },
        {
          problem: 'Scheduled time resets when adding items',
          whatToDo: 'Mark as FAILED. Note when the reset happens.'
        }
      ]
    },
    preconditions: [
      'Restaurant is open or will be open for scheduled time',
      'Restaurant supports scheduled orders'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Scheduled order availability depends on restaurant configuration.'
  },

  // ============================================
  // DINE-IN MODE TESTS (P2 - Medium)
  // ============================================
  {
    id: 'TC-MENU-REST-027',
    title: 'Browse Menu in Dine-In Mode',
    whatYoureTesting: 'Making sure the app works correctly when customer is dining at the restaurant and ordering from their table',
    whyItMatters: 'Dine-in ordering is becoming common - customers scan a QR code at their table to order. Layout should differ from delivery.',
    estimatedTime: '3 minutes',
    type: 'Functional',
    priority: 'P2',
    relatedUseCases: ['UC-MENU-REST-001'],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Enter dine-in mode (if available)',
        detailedSteps: [
          '1. This might require scanning a QR code at a restaurant table',
          '2. Or there might be a "Dine-In" option when opening a restaurant',
          '3. Look for any indication that you\'re in dine-in mode',
          '4. The interface might look slightly different'
        ],
        whatYouShouldSee: 'If in dine-in mode, there might be a table number shown, or the pickup/delivery toggle might be hidden.',
        expectedResult: 'Dine-in mode is active (if accessible for testing)'
      },
      {
        step: 2,
        instruction: 'Verify dine-in layout differences',
        detailedSteps: [
          '1. In dine-in mode, the bottom cart button might look different',
          '2. Delivery/pickup toggle should be hidden or disabled',
          '3. Menu should still be fully browsable',
          '4. Check if there\'s a table number displayed'
        ],
        whatYouShouldSee: 'Menu works normally but layout reflects dine-in context. No delivery options shown.',
        expectedResult: 'Dine-in layout is appropriate'
      },
      {
        step: 3,
        instruction: 'Add items and view cart in dine-in mode',
        detailedSteps: [
          '1. Add a few items to your cart',
          '2. View the cart',
          '3. The cart should reflect dine-in mode (no delivery fee, no address)',
          '4. Make sure you can proceed to checkout'
        ],
        whatYouShouldSee: 'Cart shows items without delivery options. Checkout process should be for dine-in.',
        expectedResult: 'Cart and checkout work correctly for dine-in'
      }
    ],
    successChecklist: [
      '✓ Dine-in mode is accessible (if available)',
      '✓ Layout reflects dine-in context',
      '✓ No delivery/pickup options shown',
      '✓ Menu is fully browsable',
      '✓ Cart works correctly for dine-in'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'Can\'t access dine-in mode',
          whatToDo: 'This may require being at a physical restaurant. Mark as SKIP if can\'t test.'
        },
        {
          problem: 'Delivery options still show in dine-in mode',
          whatToDo: 'Take screenshot showing incorrect UI. Mark as FAILED.'
        }
      ]
    },
    preconditions: [
      'Access to dine-in mode (QR code or manual selection)',
      'Restaurant supports dine-in ordering'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'This may be difficult to test without being at a physical restaurant with dine-in support.'
  },

  // ============================================
  // GUARANTEE/WARRANTY TESTS (P3 - Low)
  // ============================================
  {
    id: 'TC-MENU-REST-028',
    title: 'View Restaurant Guarantee Information',
    whatYoureTesting: 'Making sure customers can see guarantee or warranty information for restaurant orders',
    whyItMatters: 'Guarantees build trust. Customers should know what protections they have when ordering.',
    estimatedTime: '2 minutes',
    type: 'Functional',
    priority: 'P3',
    relatedUseCases: [],
    relatedEdgeCases: [],
    testSteps: [
      {
        step: 1,
        instruction: 'Look for guarantee information on restaurant page',
        detailedSteps: [
          '1. Open any restaurant menu page',
          '2. Look for a floating button, badge, or icon indicating guarantee',
          '3. It might say "Guaranteed", have a shield icon, or similar',
          '4. Could also be in the restaurant info section'
        ],
        whatYouShouldSee: 'Some indication of guarantee or quality promise - might be a floating button or info badge.',
        expectedResult: 'Guarantee indicator is visible (if available)'
      },
      {
        step: 2,
        instruction: 'Tap to view guarantee details',
        detailedSteps: [
          '1. Tap on the guarantee icon/button',
          '2. A popup or page should open with details',
          '3. Read what the guarantee covers',
          '4. Close the popup when done'
        ],
        whatYouShouldSee: 'Details about what the guarantee covers - like freshness, delivery time, refund policy, etc.',
        expectedResult: 'Guarantee details are displayed clearly'
      }
    ],
    successChecklist: [
      '✓ Guarantee indicator is visible (if restaurant has one)',
      '✓ Tapping opens guarantee details',
      '✓ Information is clear and readable',
      '✓ Can close the popup/page'
    ],
    ifThisFails: {
      commonIssues: [
        {
          problem: 'No guarantee indicator visible',
          whatToDo: 'Not all restaurants may have guarantees. Try different restaurants. Mark as SKIP if none have it.'
        },
        {
          problem: 'Guarantee popup doesn\'t open',
          whatToDo: 'Mark as FAILED. Note which restaurant and what you tapped.'
        }
      ]
    },
    preconditions: [
      'Restaurant with guarantee feature enabled'
    ],
    automatable: false,
    status: 'Not Started',
    notes: 'Guarantee features depend on restaurant and platform configuration.'
  }
];

