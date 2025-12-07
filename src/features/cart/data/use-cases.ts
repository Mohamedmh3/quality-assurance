import type { UseCase } from '@/lib/types';

export const cartUseCases: UseCase[] = [
  {
    id: 'UC-CART-001',
    title: 'View Shopping Cart',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer opens their shopping cart to see all items they have added from a restaurant before proceeding to checkout.',
    preconditions: [
      'Customer has added at least one item to cart',
      'Customer has selected a restaurant'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer taps on the cart icon or navigates to cart screen',
        expectedResult: 'Cart screen opens with loading indicator',
        uiState: 'Loading spinner shown briefly',
        flutterFile: 'cart/cart_page/view/cart_view.dart:84-95'
      },
      {
        step: 2,
        action: 'System loads cart data and restaurant information',
        expectedResult: 'Cart items are displayed with prices, quantities, and options',
        uiState: 'List of cart items with restaurant logo and name at top',
        flutterFile: 'cart/cart_page/view/cart_view.dart:393-512'
      },
      {
        step: 3,
        action: 'System calculates and displays total price',
        expectedResult: 'Total price is shown at the bottom of the cart',
        uiState: 'Price displayed in primary color with currency',
        flutterFile: 'cart/cart_page/view/cart_view.dart:1394-1437'
      }
    ],
    postconditions: [
      'Cart is displayed with all items',
      'Total price is calculated correctly',
      'Continue button is enabled'
    ],
    successCriteria: [
      'All cart items are visible',
      'Each item shows correct name, price, quantity',
      'Total matches sum of all items',
      'Restaurant info is displayed at top'
    ],
    relatedTestCases: ['TC-CART-001', 'TC-CART-002']
  },
  {
    id: 'UC-CART-002',
    title: 'Add Item to Cart',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer adds a dish to their shopping cart from the restaurant menu, including optional toppings and customizations.',
    preconditions: [
      'Customer is viewing a restaurant menu',
      'Customer has selected a dish',
      'Restaurant is currently open'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer selects quantity and any toppings/options',
        expectedResult: 'Price updates to reflect selections',
        uiState: 'Dish detail page with quantity controls and option selectors',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:678-711'
      },
      {
        step: 2,
        action: 'Customer taps Add to Cart button',
        expectedResult: 'Item is added to basket with selected options',
        uiState: 'Confirmation animation or feedback',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:678-712'
      },
      {
        step: 3,
        action: 'System checks if item already exists in cart',
        expectedResult: 'If exists with same options, quantity is incremented; otherwise new item added',
        uiState: 'Cart badge updates to show new item count',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:692-708'
      }
    ],
    postconditions: [
      'Item is in the cart',
      'Cart total is updated',
      'Item appears in My Carts list'
    ],
    successCriteria: [
      'Item appears in cart with correct quantity',
      'Toppings and options are saved correctly',
      'Price includes all selected add-ons',
      'Analytics event is logged'
    ],
    relatedTestCases: ['TC-CART-003', 'TC-CART-004']
  },
  {
    id: 'UC-CART-003',
    title: 'Update Item Quantity in Cart',
    priority: 'High',
    userType: 'End User',
    description: 'Customer changes the quantity of an item already in their cart using the plus/minus buttons.',
    preconditions: [
      'Customer has items in cart',
      'Customer is viewing the cart screen'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer taps the plus button on a cart item',
        expectedResult: 'Quantity increases by 1',
        uiState: 'Number between plus/minus buttons updates',
        flutterFile: 'cart/cart_page/view/cart_view.dart:889-958'
      },
      {
        step: 2,
        action: 'System checks if item has quantity limit',
        expectedResult: 'If limit reached, plus button is disabled/grayed',
        uiState: 'Plus icon changes color when limit reached',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:369-396'
      },
      {
        step: 3,
        action: 'System recalculates cart total',
        expectedResult: 'Total price updates to reflect new quantity',
        uiState: 'Total amount changes immediately',
        flutterFile: 'cart/sub_pages/my_carts/models/basket.dart:162-188'
      }
    ],
    postconditions: [
      'Item quantity is updated',
      'Cart total reflects new amount',
      'Changes are saved to local storage'
    ],
    successCriteria: [
      'Quantity displays correctly',
      'Price updates immediately',
      'Cannot exceed maximum quantity if set',
      'Free delivery progress updates if applicable'
    ],
    relatedTestCases: ['TC-CART-005', 'TC-CART-006']
  },
  {
    id: 'UC-CART-004',
    title: 'Remove Item from Cart',
    priority: 'High',
    userType: 'End User',
    description: 'Customer removes an item from their cart completely, either by tapping delete or reducing quantity to zero.',
    preconditions: [
      'Customer has items in cart',
      'Customer is viewing the cart screen'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer reduces item quantity to 1 and taps minus button',
        expectedResult: 'Delete icon appears instead of minus',
        uiState: 'Minus button changes to delete/trash icon',
        flutterFile: 'cart/cart_page/view/cart_view.dart:851-863'
      },
      {
        step: 2,
        action: 'Customer taps delete button',
        expectedResult: 'Confirmation dialog appears',
        uiState: 'Bottom sheet with confirm/cancel options',
        flutterFile: 'cart/cart_page/view/cart_view.dart:961-1021'
      },
      {
        step: 3,
        action: 'Customer confirms deletion',
        expectedResult: 'Item is removed from cart',
        uiState: 'Item disappears from list, total updates',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:732-736'
      }
    ],
    postconditions: [
      'Item is removed from cart',
      'Cart total is recalculated',
      'If cart is empty, user is redirected back'
    ],
    successCriteria: [
      'Item no longer appears in cart',
      'Total price is recalculated',
      'Confirmation is required before deletion',
      'Empty cart handling works correctly'
    ],
    relatedTestCases: ['TC-CART-007', 'TC-CART-008']
  },
  {
    id: 'UC-CART-005',
    title: 'View Multiple Carts (My Carts)',
    priority: 'High',
    userType: 'End User',
    description: 'Customer views all their saved shopping carts from different restaurants (maximum 5 carts allowed).',
    preconditions: [
      'Customer has created carts at one or more restaurants',
      'Carts are not older than 2 days'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer navigates to My Carts screen',
        expectedResult: 'List of all saved carts loads',
        uiState: 'Loading indicator then list of cart cards',
        flutterFile: 'cart/sub_pages/my_carts/view/my_carts.dart:47-86'
      },
      {
        step: 2,
        action: 'System displays each restaurant cart with status',
        expectedResult: 'Shows restaurant name, item count, total, online/offline status',
        uiState: 'Card for each cart with restaurant logo and status indicator',
        flutterFile: 'cart/sub_pages/my_carts/view/my_carts.dart:198-345'
      },
      {
        step: 3,
        action: 'Customer taps on a cart card',
        expectedResult: 'Opens that specific cart for editing',
        uiState: 'Navigates to cart view for selected restaurant',
        flutterFile: 'cart/sub_pages/my_carts/view/my_carts.dart:349-377'
      }
    ],
    postconditions: [
      'All valid carts are displayed',
      'Restaurant status is up to date',
      'User can navigate to any cart'
    ],
    successCriteria: [
      'All carts under 2 days old are shown',
      'Restaurant online/offline status is accurate',
      'Item count and totals are correct',
      'Navigation to cart works'
    ],
    relatedTestCases: ['TC-CART-009', 'TC-CART-010']
  },
  {
    id: 'UC-CART-006',
    title: 'Delete Saved Cart',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer deletes an entire saved cart from the My Carts list, removing all items for that restaurant.',
    preconditions: [
      'Customer has at least one saved cart',
      'Customer is on My Carts screen'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer taps delete icon on a cart card',
        expectedResult: 'Confirmation dialog appears',
        uiState: 'Bottom sheet asking to confirm deletion',
        flutterFile: 'cart/sub_pages/my_carts/view/my_carts.dart:144-196'
      },
      {
        step: 2,
        action: 'Customer confirms deletion',
        expectedResult: 'Cart is removed from the list',
        uiState: 'Cart card disappears from My Carts',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:1012-1023'
      },
      {
        step: 3,
        action: 'System updates local storage',
        expectedResult: 'Cart is permanently removed',
        uiState: 'List updates to show remaining carts',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:933-947'
      }
    ],
    postconditions: [
      'Cart is permanently deleted',
      'Local storage is updated',
      'If no carts remain, empty state is shown'
    ],
    successCriteria: [
      'Cart is removed after confirmation',
      'Cannot accidentally delete',
      'Empty state shown when no carts',
      'Other carts remain unaffected'
    ],
    relatedTestCases: ['TC-CART-011']
  },
  {
    id: 'UC-CART-007',
    title: 'Proceed to Checkout',
    priority: 'Critical',
    userType: 'End User',
    description: 'Customer taps Continue button to proceed from cart to checkout, after validation checks pass.',
    preconditions: [
      'Customer has items in cart',
      'Items are in stock',
      'Restaurant is open'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer taps Continue button at bottom of cart',
        expectedResult: 'System validates cart and user status',
        uiState: 'Brief loading or validation',
        flutterFile: 'cart/cart_page/view/cart_view.dart:149-358'
      },
      {
        step: 2,
        action: 'System checks if user is logged in',
        expectedResult: 'If not logged in, prompt to login appears',
        uiState: 'Login dialog if not authenticated',
        flutterFile: 'cart/cart_page/view/cart_view.dart:226-248'
      },
      {
        step: 3,
        action: 'System checks for delivery address',
        expectedResult: 'If no address, prompt to add one',
        uiState: 'Address selection bottom sheet',
        flutterFile: 'cart/cart_page/view/cart_view.dart:316-341'
      },
      {
        step: 4,
        action: 'All validations pass',
        expectedResult: 'Navigate to checkout screen',
        uiState: 'Checkout screen opens',
        flutterFile: 'cart/cart_page/view/cart_view.dart:343-355'
      }
    ],
    postconditions: [
      'User is on checkout screen',
      'Cart data is passed to checkout',
      'Notes are included if selected'
    ],
    successCriteria: [
      'Only logged-in users can proceed',
      'Address is required for delivery',
      'Out of stock items are flagged',
      'Cart data transfers correctly'
    ],
    relatedTestCases: ['TC-CART-012', 'TC-CART-013', 'TC-CART-014']
  },
  {
    id: 'UC-CART-008',
    title: 'Edit Cart Item',
    priority: 'High',
    userType: 'End User',
    description: 'Customer taps on a cart item to modify its options, toppings, or special instructions.',
    preconditions: [
      'Customer has items in cart',
      'Item is in stock'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer taps on a cart item card',
        expectedResult: 'Dish detail page opens with current selections',
        uiState: 'Dish page shows item with pre-selected options',
        flutterFile: 'cart/cart_page/view/cart_view.dart:768-800'
      },
      {
        step: 2,
        action: 'Customer modifies options/toppings/note',
        expectedResult: 'Selections update in UI',
        uiState: 'Options and price update as changed',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:998-1008'
      },
      {
        step: 3,
        action: 'Customer saves changes',
        expectedResult: 'Cart item is updated with new selections',
        uiState: 'Returns to cart with updated item',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:715-729'
      }
    ],
    postconditions: [
      'Cart item reflects new selections',
      'Price is recalculated',
      'Original item is replaced with updated version'
    ],
    successCriteria: [
      'Original selections are pre-populated',
      'Changes are saved correctly',
      'Price updates with changes',
      'Note is preserved or updated'
    ],
    relatedTestCases: ['TC-CART-015']
  },
  {
    id: 'UC-CART-009',
    title: 'Add Special Instructions (Market)',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer selects or writes special instructions for market orders about item substitution preferences.',
    preconditions: [
      'Customer is ordering from a market (grocery)',
      'Notes are enabled for this market'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer views cart from a market',
        expectedResult: 'Special instructions section is visible',
        uiState: 'Note selection card shown below items',
        flutterFile: 'cart/cart_page/view/cart_view.dart:1235-1257'
      },
      {
        step: 2,
        action: 'Customer taps on instructions section',
        expectedResult: 'Bottom sheet opens with note options',
        uiState: 'List of preset notes plus custom input',
        flutterFile: 'cart/cart_page/view/widgets/cart_instruction/cart_instruction_card_widget.dart:26-49'
      },
      {
        step: 3,
        action: 'Customer selects preset or writes custom note',
        expectedResult: 'Selection is saved and displayed',
        uiState: 'Selected note shown in card',
        flutterFile: 'cart/cart_page/viewmodel/cart_viewmodel.dart:87-106'
      }
    ],
    postconditions: [
      'Note is saved to cart',
      'Note is passed to checkout',
      'Visual indicator shows note selected'
    ],
    successCriteria: [
      'Preset notes are available',
      'Custom note can be written',
      'Note is visible after selection',
      'Note is required for markets without default'
    ],
    relatedTestCases: ['TC-CART-016']
  },
  {
    id: 'UC-CART-010',
    title: 'Reorder Previous Order',
    priority: 'High',
    userType: 'End User',
    description: 'Customer initiates a reorder from order history, which creates a new cart with the same items from a previous order.',
    preconditions: [
      'Customer has a previous order',
      'Customer taps Reorder button on an order'
    ],
    steps: [
      {
        step: 1,
        action: 'System receives reorder request with order data',
        expectedResult: 'Previous items are loaded into a new cart',
        uiState: 'Loading while fetching dish data',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:545-614'
      },
      {
        step: 2,
        action: 'System validates each item availability',
        expectedResult: 'Out of stock items are flagged or options warning shown',
        uiState: 'Warning screen if options have changed',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:1159-1182'
      },
      {
        step: 3,
        action: 'Cart is created with available items',
        expectedResult: 'Customer sees cart with reordered items',
        uiState: 'Cart view with items from previous order',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:571-585'
      }
    ],
    postconditions: [
      'New cart is created',
      'Unavailable items are handled',
      'Voucher from original order is copied if valid'
    ],
    successCriteria: [
      'Same items as original order',
      'Updated prices are used',
      'Out of stock items are indicated',
      'Options changes are flagged'
    ],
    relatedTestCases: ['TC-CART-017', 'TC-CART-018']
  },
  {
    id: 'UC-CART-011',
    title: 'Free Delivery Progress Tracking',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer sees progress toward free delivery threshold as they add items, with celebration when reached.',
    preconditions: [
      'Restaurant has free delivery threshold set',
      'Customer is adding items to cart'
    ],
    steps: [
      {
        step: 1,
        action: 'Customer adds items to cart',
        expectedResult: 'Progress bar updates toward free delivery',
        uiState: 'Linear progress indicator fills up',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:247-258'
      },
      {
        step: 2,
        action: 'Cart total reaches free delivery threshold',
        expectedResult: 'Celebration animation plays',
        uiState: 'Confetti animation and visual confirmation',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:629-649'
      },
      {
        step: 3,
        action: 'System marks free delivery earned',
        expectedResult: 'Progress bar shows 100%, celebration plays once',
        uiState: 'Visual indicator of free delivery achieved',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:639-648'
      }
    ],
    postconditions: [
      'Free delivery status is tracked',
      'Celebration only plays once per threshold',
      'Removing items can reset status'
    ],
    successCriteria: [
      'Progress updates in real-time',
      'Threshold crossing triggers celebration',
      'Removing items below threshold resets',
      'Animation does not repeat unnecessarily'
    ],
    relatedTestCases: ['TC-CART-019']
  },
  {
    id: 'UC-CART-012',
    title: 'View Dynamic Rewards',
    priority: 'Medium',
    userType: 'End User',
    description: 'Customer sees available rewards based on their cart total, incentivizing them to order more.',
    preconditions: [
      'Restaurant has dynamic rewards enabled',
      'Customer has items in cart'
    ],
    steps: [
      {
        step: 1,
        action: 'Cart loads and fetches dynamic rewards',
        expectedResult: 'Reward tiers are loaded',
        uiState: 'Rewards widget appears at bottom of cart',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:184-198'
      },
      {
        step: 2,
        action: 'System calculates current reward tier',
        expectedResult: 'Shows which reward tier customer qualifies for',
        uiState: 'Reward tiers displayed with current progress',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:200-216'
      },
      {
        step: 3,
        action: 'Customer adds more items',
        expectedResult: 'Reward tier updates based on new total',
        uiState: 'Next reward tier becomes highlighted',
        flutterFile: 'cart/cart_page/view/cart_view.dart:125-138'
      }
    ],
    postconditions: [
      'Customer sees their reward status',
      'Reward ID is passed to checkout',
      'Incentive to add more is shown'
    ],
    successCriteria: [
      'Rewards load for eligible restaurants',
      'Current tier is highlighted',
      'Amount to next tier is shown',
      'Reward applies at checkout'
    ],
    relatedTestCases: ['TC-CART-020']
  },
  {
    id: 'UC-CART-013',
    title: 'Add Service Items to Cart',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer adds additional service items (like cutlery, napkins) from the services section in cart.',
    preconditions: [
      'Services are enabled for this restaurant',
      'Customer is viewing cart',
      'Not a pickup order'
    ],
    steps: [
      {
        step: 1,
        action: 'Services section is displayed in cart',
        expectedResult: 'Available services shown as horizontal list',
        uiState: 'Service cards with images',
        flutterFile: 'cart/cart_page/view/cart_view.dart:561-634'
      },
      {
        step: 2,
        action: 'Customer taps on a service',
        expectedResult: 'Service menu opens',
        uiState: 'Navigate to service detail screen',
        flutterFile: 'cart/cart_page/view/cart_view.dart:582-596'
      },
      {
        step: 3,
        action: 'Customer adds service item',
        expectedResult: 'Service item added to cart separately',
        uiState: 'Service items appear in cart with main items',
        flutterFile: 'cart/sub_pages/my_carts/controllers/my_cart_viewmodel.dart:748-760'
      }
    ],
    postconditions: [
      'Service items are in cart',
      'Service total is included in order',
      'Services listed separately from food'
    ],
    successCriteria: [
      'Services display correctly',
      'Service items can be added/removed',
      'Service total is calculated',
      'Services not shown for pickup'
    ],
    relatedTestCases: ['TC-CART-021']
  },
  {
    id: 'UC-CART-014',
    title: 'View Trending Dishes Recommendations',
    priority: 'Low',
    userType: 'End User',
    description: 'Customer sees trending dish recommendations at the bottom of cart to encourage adding more items.',
    preconditions: [
      'Customer is viewing cart',
      'Restaurant has trending dishes configured'
    ],
    steps: [
      {
        step: 1,
        action: 'Cart loads and fetches trending dishes',
        expectedResult: 'Trending dishes are retrieved from server',
        uiState: 'Brief loading for recommendations',
        flutterFile: 'cart/cart_page/viewmodel/cart_viewmodel.dart:200-228'
      },
      {
        step: 2,
        action: 'Trending dishes are displayed',
        expectedResult: 'Horizontal list of recommended dishes appears',
        uiState: '"Why not try" section with dish cards',
        flutterFile: 'cart/cart_page/view/cart_view.dart:1288-1377'
      },
      {
        step: 3,
        action: 'Customer taps on a trending dish',
        expectedResult: 'Dish detail page opens',
        uiState: 'Navigate to dish page to add item',
        flutterFile: 'cart/cart_page/view/cart_view.dart:1337-1355'
      }
    ],
    postconditions: [
      'Recommendations are shown',
      'Customer can add recommended items',
      'Dishes not already in cart are prioritized'
    ],
    successCriteria: [
      'Trending dishes load',
      'Already-in-cart items are deprioritized',
      'Can navigate to add recommended items',
      'Section hidden if no recommendations'
    ],
    relatedTestCases: ['TC-CART-022']
  }
];

