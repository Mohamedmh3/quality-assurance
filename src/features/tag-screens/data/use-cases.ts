import { UseCase } from '@/lib/types';

export const tagScreensUseCases: UseCase[] = [
  {
    id: 'UC-TAG-SCREENS-001',
    title: 'Browse Dishes by Tag',
    description: 'User wants to view all dishes associated with a specific tag (e.g., "Spicy", "Vegetarian", "Popular")',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is logged in or browsing as guest',
      'Tag URL and tag name are available',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on a tag from home feed, search results, or category page',
        expectedResult: 'Tag dishes screen opens showing tag name in app bar',
        uiState: 'Tag dishes screen is displayed with tag name in app bar',
      },
      {
        step: 2,
        action: 'App requests first page of dishes from server using tag URL',
        expectedResult: 'Loading spinner appears while fetching dishes',
        uiState: 'Loading spinner is visible in center of screen',
      },
      {
        step: 3,
        action: 'Server returns list of dishes matching the tag',
        expectedResult: 'Dishes are displayed in a scrollable list with dish cards showing image, name, price, and restaurant info',
        uiState: 'List of dish cards is displayed, scrollable',
      },
      {
        step: 4,
        action: 'User scrolls down to load more dishes',
        expectedResult: 'Next page of dishes loads automatically when user reaches bottom of list',
        uiState: 'More dishes appear at bottom of list as user scrolls',
      },
    ],
    postconditions: [
      'User can see all dishes matching the tag',
      'User can scroll through paginated results',
      'User can tap on any dish to view details',
    ],
    successCriteria: [
      'Dishes load successfully',
      'Pagination works correctly',
      'User can navigate back to previous screen',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-001', 'TC-TAG-SCREENS-002', 'TC-TAG-SCREENS-003'],
  },
  {
    id: 'UC-TAG-SCREENS-002',
    title: 'Browse Restaurants by Tag',
    description: 'User wants to view all restaurants associated with a specific tag (e.g., "Fast Food", "Fine Dining", "Open Now")',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is logged in or browsing as guest',
      'Tag URL and tag name are available',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on a restaurant tag from home feed, search results, or category page',
        expectedResult: 'Tag restaurants screen opens showing tag name in app bar',
        uiState: 'Tag restaurants screen is displayed with tag name in app bar',
      },
      {
        step: 2,
        action: 'App requests first page of restaurants from server using tag URL',
        expectedResult: 'Loading spinner appears while fetching restaurants',
        uiState: 'Loading spinner is visible in center of screen',
      },
      {
        step: 3,
        action: 'Server returns list of restaurants matching the tag',
        expectedResult: 'Restaurants are displayed in a scrollable list with restaurant cards showing image, name, rating, delivery time, and status',
        uiState: 'List of restaurant cards is displayed, scrollable',
      },
      {
        step: 4,
        action: 'User scrolls down to load more restaurants',
        expectedResult: 'Next page of restaurants loads automatically when user reaches bottom of list',
        uiState: 'More restaurants appear at bottom of list as user scrolls',
      },
      {
        step: 5,
        action: 'User taps on a restaurant card',
        expectedResult: 'User navigates to restaurant menu screen',
        uiState: 'Restaurant menu screen is displayed',
      },
    ],
    postconditions: [
      'User can see all restaurants matching the tag',
      'User can scroll through paginated results',
      'User can navigate to restaurant menu',
    ],
    successCriteria: [
      'Restaurants load successfully',
      'Pagination works correctly',
      'Navigation to restaurant menu works',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-004', 'TC-TAG-SCREENS-005', 'TC-TAG-SCREENS-006'],
  },
  {
    id: 'UC-TAG-SCREENS-003',
    title: 'Handle Empty Tag Results',
    description: 'User views a tag that has no associated dishes or restaurants',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'Tag URL is valid but returns empty results',
      'User navigates to tag screen',
    ],
    steps: [
      {
        step: 1,
        action: 'App requests dishes/restaurants for tag',
        expectedResult: 'Loading spinner appears',
        uiState: 'Loading spinner is visible',
      },
      {
        step: 2,
        action: 'Server returns empty list',
        expectedResult: 'Empty state message is displayed: "No dishes found" or "No restaurants found"',
        uiState: 'Empty state message is displayed in center',
      },
    ],
    postconditions: [
      'Empty state is shown clearly',
      'User can navigate back',
    ],
    successCriteria: [
      'Empty state message is user-friendly',
      'User understands no results were found',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-007', 'TC-TAG-SCREENS-008'],
  },
  {
    id: 'UC-TAG-SCREENS-004',
    title: 'Handle Network Error',
    description: 'User views tag screen when network request fails',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'Network connection is unavailable or server error occurs',
      'User navigates to tag screen',
    ],
    steps: [
      {
        step: 1,
        action: 'App attempts to fetch dishes/restaurants',
        expectedResult: 'Loading spinner appears',
        uiState: 'Loading spinner is visible',
      },
      {
        step: 2,
        action: 'Network request fails',
        expectedResult: 'Error message dialog appears with error details',
        uiState: 'Error dialog is displayed with error message',
      },
      {
        step: 3,
        action: 'User taps Retry button',
        expectedResult: 'App attempts to fetch data again',
        uiState: 'Loading spinner appears again',
      },
    ],
    postconditions: [
      'Error is displayed to user',
      'User can retry the request',
    ],
    successCriteria: [
      'Error message is clear and helpful',
      'Retry functionality works',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-009', 'TC-TAG-SCREENS-010'],
  },
  {
    id: 'UC-TAG-SCREENS-005',
    title: 'Navigate Back from Tag Screen',
    description: 'User wants to return to previous screen from tag dishes or restaurants screen',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is on tag dishes or restaurants screen',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps back button in app bar',
        expectedResult: 'User returns to previous screen',
        uiState: 'Previous screen is displayed',
      },
    ],
    postconditions: [
      'User is back on previous screen',
      'Previous screen state is preserved',
    ],
    successCriteria: [
      'Navigation works correctly',
      'Previous screen loads correctly',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-011', 'TC-TAG-SCREENS-012'],
  },
  {
    id: 'UC-TAG-SCREENS-006',
    title: 'View Dish Details from Tag List',
    description: 'User taps on a dish card in tag dishes list to view dish details',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is viewing tag dishes screen',
      'Dishes are loaded and displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on a dish card',
        expectedResult: 'User navigates to dish details screen',
        uiState: 'Dish details screen is displayed',
      },
    ],
    postconditions: [
      'Dish details screen is displayed',
      'User can add dish to cart',
    ],
    successCriteria: [
      'Navigation to dish details works',
      'Dish information is correct',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-006'],
  },
  {
    id: 'UC-TAG-SCREENS-007',
    title: 'Load More Items on Scroll',
    description: 'User scrolls down to load additional pages of dishes or restaurants',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is viewing tag screen',
      'First page of items is loaded',
      'More pages are available',
    ],
    steps: [
      {
        step: 1,
        action: 'User scrolls down to bottom of list',
        expectedResult: 'Loading indicator appears at bottom',
        uiState: 'Loading indicator is visible at bottom of list',
      },
      {
        step: 2,
        action: 'App requests next page from server',
        expectedResult: 'Next page items are appended to list',
        uiState: 'New items appear at bottom of list',
      },
      {
        step: 3,
        action: 'User continues scrolling',
        expectedResult: 'More pages load automatically as user scrolls',
        uiState: 'More items continue to load as user scrolls',
      },
    ],
    postconditions: [
      'All available items can be viewed',
      'Pagination works smoothly',
    ],
    successCriteria: [
      'Items load automatically on scroll',
      'No duplicate items appear',
      'Loading indicator shows during fetch',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-003', 'TC-TAG-SCREENS-013', 'TC-TAG-SCREENS-014'],
  },
  {
    id: 'UC-TAG-SCREENS-008',
    title: 'Handle Pagination End',
    description: 'User reaches the last page of tag results',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is viewing tag screen',
      'User has scrolled through all available pages',
    ],
    steps: [
      {
        step: 1,
        action: 'User scrolls to last page',
        expectedResult: 'Last page loads successfully',
        uiState: 'Last page items are displayed',
      },
      {
        step: 2,
        action: 'User continues scrolling',
        expectedResult: 'No more loading indicators appear, user has reached end of list',
        uiState: 'No loading indicators appear, end of list reached',
      },
    ],
    postconditions: [
      'All items are displayed',
      'No unnecessary loading attempts',
    ],
    successCriteria: [
      'Pagination stops at last page',
      'User understands they have seen all results',
    ],
    relatedTestCases: ['TC-TAG-SCREENS-013', 'TC-TAG-SCREENS-014'],
  },
];

