import { EdgeCase } from '@/lib/types';

export const walletInfoEdgeCases: EdgeCase[] = [
  {
    id: 'EC-WALLET-INFO-001',
    title: 'Transaction History Fails to Load',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Network error or server issue while loading transactions',
    expectedBehavior: 'App should display error message with retry option',
    uiHandling: {
      errorMessage: 'Unable to load transactions. Please try again.',
      recoveryOptions: ['Retry', 'Check network connection'],
    },
    implementationNotes: {
      flutterFiles: ['walet_info_viewmodel.dart', 'transaction_list_widget.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-001'],
  },
  {
    id: 'EC-WALLET-INFO-002',
    title: 'Invalid Date Range Selected',
    category: 'Validation',
    likelihood: 'Low',
    impact: 'Low',
    triggerCondition: 'User selects invalid date range (end date before start date)',
    expectedBehavior: 'App should prevent invalid date selection or auto-correct',
    uiHandling: {
      errorMessage: 'End date must be after start date',
      recoveryOptions: ['Select valid date range'],
    },
    implementationNotes: {
      flutterFiles: ['transaction_date_picker_widget.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-002'],
  },
  {
    id: 'EC-WALLET-INFO-003',
    title: 'Pagination Fails While Loading More Transactions',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'Low',
    triggerCondition: 'Network error occurs while loading next page of transactions',
    expectedBehavior: 'App should show error indicator and allow retry for that page',
    uiHandling: {
      errorMessage: 'Error loading more transactions',
      recoveryOptions: ['Retry', 'Check network'],
    },
    implementationNotes: {
      flutterFiles: ['transaction_list_widget.dart', 'walet_info_viewmodel.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-003'],
  },
  {
    id: 'EC-WALLET-INFO-004',
    title: 'Invalid Invoice PIN',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'Medium',
    triggerCondition: 'User enters PIN that does not match any invoice',
    expectedBehavior: 'App should display clear error message that invoice was not found',
    uiHandling: {
      errorMessage: 'Invoice not found',
      recoveryOptions: ['Check PIN', 'Try again'],
    },
    implementationNotes: {
      flutterFiles: ['walet_info_viewmodel.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-005', 'TC-WALLET-INFO-008'],
  },
  {
    id: 'EC-WALLET-INFO-005',
    title: 'Invoice Details Fail to Load',
    category: 'Network',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'Network error while loading invoice details',
    expectedBehavior: 'App should display error message or empty state',
    uiHandling: {
      errorMessage: 'Unable to load invoice details',
      recoveryOptions: ['Retry', 'Check network'],
    },
    implementationNotes: {
      flutterFiles: ['invoice_details_page_widget.dart', 'walet_info_viewmodel.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-006'],
  },
  {
    id: 'EC-WALLET-INFO-006',
    title: 'Insufficient Balance for Payment',
    category: 'Validation',
    likelihood: 'Medium',
    impact: 'High',
    triggerCondition: 'User tries to pay invoice but wallet balance is insufficient',
    expectedBehavior: 'App should prevent payment and show clear error message',
    uiHandling: {
      errorMessage: 'Insufficient balance. Please top up your wallet.',
      recoveryOptions: ['Top up wallet', 'Check balance'],
    },
    implementationNotes: {
      flutterFiles: ['walet_info_viewmodel.dart', 'invoice_details_page_widget.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-007'],
  },
  {
    id: 'EC-WALLET-INFO-007',
    title: 'Multiple Rapid Payment Attempts',
    category: 'Concurrency',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'User slides payment button multiple times rapidly',
    expectedBehavior: 'App should prevent duplicate payments',
    uiHandling: {
      errorMessage: 'Payment is already processing',
      recoveryOptions: ['Wait for payment to complete'],
    },
    implementationNotes: {
      flutterFiles: ['walet_info_viewmodel.dart'],
      validationRules: ['Prevent concurrent payment requests'],
    },
    relatedTestCases: ['TC-WALLET-INFO-007'],
  },
  {
    id: 'EC-WALLET-INFO-008',
    title: 'Balance Update Fails After Payment',
    category: 'Network',
    likelihood: 'Low',
    impact: 'High',
    triggerCondition: 'Payment succeeds but balance update fails',
    expectedBehavior: 'App should handle this edge case and sync balance',
    uiHandling: {
      errorMessage: 'Payment successful. Balance will update shortly.',
      recoveryOptions: ['Refresh screen', 'Check balance'],
    },
    implementationNotes: {
      flutterFiles: ['walet_info_viewmodel.dart', 'wallet_viewmodel.dart'],
    },
    relatedTestCases: ['TC-WALLET-INFO-010'],
  },
];

