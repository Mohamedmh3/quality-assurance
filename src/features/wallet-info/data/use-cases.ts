import { UseCase } from '@/lib/types';

export const walletInfoUseCases: UseCase[] = [
  {
    id: 'UC-WALLET-INFO-001',
    title: 'View Transaction History',
    description: 'User wants to view their wallet transaction history with date filtering and pagination',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is logged in',
      'User has wallet with transactions',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User navigates to wallet info screen from wallet screen',
        expectedResult: 'Wallet info screen opens showing wallet card background with balance and transaction list',
        uiState: 'Screen displays wallet card at top, date picker, and transaction list below',
      },
      {
        step: 2,
        action: 'App loads transactions for default date range (today)',
        expectedResult: 'Loading indicator appears while fetching transactions',
        uiState: 'Loading spinner is visible in center',
      },
      {
        step: 3,
        action: 'Server returns transaction list',
        expectedResult: 'Transactions are displayed in scrollable list with date, amount, description',
        uiState: 'Transaction cards appear in list, scrollable',
      },
      {
        step: 4,
        action: 'User scrolls down to load more transactions',
        expectedResult: 'Next page loads automatically when reaching bottom',
        uiState: 'More transactions appear at bottom of list',
      },
    ],
    postconditions: [
      'User can see transaction history',
      'User can scroll through paginated results',
      'Balance is updated from server',
    ],
    successCriteria: [
      'Transactions load successfully',
      'Pagination works correctly',
      'Balance displays correctly',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-002',
    title: 'Filter Transactions by Date Range',
    description: 'User wants to filter transactions by selecting a custom date range',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is on wallet info screen',
      'User has transactions in different date ranges',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps on date picker widget',
        expectedResult: 'Date picker opens allowing selection of start and end dates',
        uiState: 'Date picker dialog appears',
      },
      {
        step: 2,
        action: 'User selects start date and end date',
        expectedResult: 'Selected dates are displayed in date picker widget',
        uiState: 'Date range is shown in date picker',
      },
      {
        step: 3,
        action: 'App refreshes transaction list with new date range',
        expectedResult: 'Transaction list refreshes showing only transactions in selected range',
        uiState: 'Loading indicator appears, then filtered transactions are displayed',
      },
    ],
    postconditions: [
      'Transactions are filtered by date range',
      'Pagination resets for new date range',
      'User can see filtered results',
    ],
    successCriteria: [
      'Date filtering works correctly',
      'Transactions refresh properly',
      'Only transactions in date range are shown',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-003',
    title: 'View Card Details',
    description: 'User wants to view wallet card details including name, card number, and primary card setting',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is on wallet info screen',
      'User has wallet card',
    ],
    steps: [
      {
        step: 1,
        action: 'User switches from transaction view to card details view',
        expectedResult: 'Card details section appears showing card information',
        uiState: 'Transaction list is hidden, card details are displayed',
      },
      {
        step: 2,
        action: 'App displays card details',
        expectedResult: 'Card details show full name, card number (formatted), and primary card toggle',
        uiState: 'Card details list items are displayed with information',
      },
      {
        step: 3,
        action: 'User toggles primary card setting',
        expectedResult: 'Primary card toggle updates and saves preference',
        uiState: 'Toggle switch changes state, loading indicator appears briefly',
      },
    ],
    postconditions: [
      'User can see card details',
      'Primary card setting is updated',
      'User can switch back to transaction view',
    ],
    successCriteria: [
      'Card details display correctly',
      'Primary card toggle works',
      'Settings are saved',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-004',
    title: 'Pay Invoice from Transaction Screen',
    description: 'User wants to pay an invoice by entering PIN/OTP in the transaction screen',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User is on wallet info screen',
      'User has wallet with sufficient balance',
      'User knows invoice PIN/OTP',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User enters invoice PIN/OTP in the input field at bottom',
        expectedResult: 'PIN is entered in the input field',
        uiState: 'PIN input shows entered digits',
      },
      {
        step: 2,
        action: 'User taps validate button',
        expectedResult: 'App validates PIN and fetches invoice details',
        uiState: 'Loading indicator appears',
      },
      {
        step: 3,
        action: 'Invoice is found and displayed',
        expectedResult: 'User is navigated to invoice details page',
        uiState: 'Invoice details screen shows invoice information',
      },
      {
        step: 4,
        action: 'User selects tip amount and confirms payment',
        expectedResult: 'Payment is processed and success screen is displayed',
        uiState: 'Success dialog shows with mascot icon and "Invoice paid" message',
      },
    ],
    postconditions: [
      'Invoice is paid successfully',
      'Wallet balance is deducted',
      'Transaction is recorded',
      'User is redirected to home screen',
    ],
    successCriteria: [
      'Payment processes successfully',
      'Balance updates correctly',
      'Success message is displayed',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-005',
    title: 'View Invoice Details',
    description: 'User wants to view detailed invoice information before payment',
    priority: 'High',
    userType: 'End User',
    preconditions: [
      'User has valid invoice PIN/OTP',
      'Invoice exists',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'User enters invoice PIN and validates',
        expectedResult: 'Invoice details page opens',
        uiState: 'Invoice details screen is displayed',
      },
      {
        step: 2,
        action: 'App loads invoice details from server',
        expectedResult: 'Loading indicator appears while fetching',
        uiState: 'Loading spinner is visible',
      },
      {
        step: 3,
        action: 'Invoice details are displayed',
        expectedResult: 'Invoice shows header, details card with items, tip selection, and payment button',
        uiState: 'Invoice information is displayed in organized sections',
      },
      {
        step: 4,
        action: 'User reviews invoice details',
        expectedResult: 'User can see all invoice information clearly',
        uiState: 'Invoice details are readable and well-formatted',
      },
    ],
    postconditions: [
      'User can see invoice details',
      'User can proceed with payment',
      'User can navigate back',
    ],
    successCriteria: [
      'Invoice details load correctly',
      'All information is displayed',
      'UI is clear and readable',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-006',
    title: 'Select Tip Amount',
    description: 'User wants to select a tip amount before paying invoice',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is on invoice details page',
      'Tip options are available',
      'Network connection is available',
    ],
    steps: [
      {
        step: 1,
        action: 'App loads tip options from server',
        expectedResult: 'Tip options are displayed (e.g., 0%, 5%, 10%, 15%)',
        uiState: 'Tip selection widget shows available tip percentages',
      },
      {
        step: 2,
        action: 'User taps on a tip option',
        expectedResult: 'Selected tip is highlighted and saved',
        uiState: 'Tip option is visually selected',
      },
      {
        step: 3,
        action: 'User confirms payment with selected tip',
        expectedResult: 'Payment includes selected tip amount',
        uiState: 'Payment processes with tip included',
      },
    ],
    postconditions: [
      'Tip amount is selected',
      'Payment includes tip',
      'Total amount is updated',
    ],
    successCriteria: [
      'Tip selection works correctly',
      'Tip amount is included in payment',
      'Total updates correctly',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-007',
    title: 'View Net Total at Bottom',
    description: 'User wants to see net total (balance after transactions) at bottom of screen',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is on wallet info screen',
      'Transactions are loaded',
    ],
    steps: [
      {
        step: 1,
        action: 'User views transaction list',
        expectedResult: 'Net total widget is visible at bottom of screen',
        uiState: 'Bottom sheet shows net total calculation',
      },
      {
        step: 2,
        action: 'App calculates net total from transactions',
        expectedResult: 'Net total displays calculated amount',
        uiState: 'Net total amount is shown clearly',
      },
    ],
    postconditions: [
      'User can see net total',
      'Net total updates with transactions',
    ],
    successCriteria: [
      'Net total displays correctly',
      'Calculation is accurate',
    ],
    relatedTestCases: [],
  },
  {
    id: 'UC-WALLET-INFO-008',
    title: 'Navigate Back with Updated Balance',
    description: 'User navigates back from wallet info screen and balance is updated in wallet screen',
    priority: 'Medium',
    userType: 'End User',
    preconditions: [
      'User is on wallet info screen',
      'Balance has changed (e.g., after payment)',
    ],
    steps: [
      {
        step: 1,
        action: 'User taps back button',
        expectedResult: 'User navigates back to wallet screen',
        uiState: 'Wallet screen is displayed',
      },
      {
        step: 2,
        action: 'App returns updated balance to wallet screen',
        expectedResult: 'Wallet screen displays updated balance',
        uiState: 'Balance card shows new balance amount',
      },
    ],
    postconditions: [
      'User is back on wallet screen',
      'Balance is updated',
      'Wallet list reflects changes',
    ],
    successCriteria: [
      'Navigation works correctly',
      'Balance updates properly',
      'Data syncs correctly',
    ],
    relatedTestCases: [],
  },
];


