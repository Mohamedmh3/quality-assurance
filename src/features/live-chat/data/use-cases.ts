import { UseCase } from '@/lib/types';

export const liveChatUseCases: UseCase[] = [
  {
    id: 'UC-LIVE-CHAT-001',
    title: 'Open Live Chat',
    priority: 'High',
    userType: 'End User',
    description: 'User taps the live chat floating action button to open customer support chat.',
    preconditions: [
      'Live chat is enabled',
      'User is on a screen with live chat button',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap live chat floating action button',
        expectedResult: 'Live chat screen opens',
        uiState: 'Chat screen loads with web view',
      },
      {
        step: 2,
        action: 'View chat interface',
        expectedResult: 'Chat web view displays',
        uiState: 'Chat interface is visible and functional',
      },
    ],
    postconditions: [
      'Live chat screen is displayed',
      'Chat interface is loaded',
    ],
    successCriteria: [
      'Live chat button is visible',
      'Navigation to chat works',
      'Chat interface loads',
    ],
    relatedTestCases: ['TC-LIVE-CHAT-001', 'TC-LIVE-CHAT-002'],
  },
  {
    id: 'UC-LIVE-CHAT-002',
    title: 'View Unread Message Count',
    priority: 'High',
    userType: 'End User',
    description: 'User sees badge on live chat button showing number of unread messages.',
    preconditions: [
      'Live chat is enabled',
      'User has unread messages',
      'Live chat button is visible',
    ],
    steps: [
      {
        step: 1,
        action: 'View live chat button',
        expectedResult: 'Badge with unread count is displayed',
        uiState: 'Badge shows number on chat button',
      },
    ],
    postconditions: [
      'Unread count is visible',
    ],
    successCriteria: [
      'Badge appears when unread count > 0',
      'Badge shows correct count',
    ],
    relatedTestCases: ['TC-LIVE-CHAT-003'],
  },
  {
    id: 'UC-LIVE-CHAT-003',
    title: 'Open Chat for Specific Order',
    priority: 'Medium',
    userType: 'End User',
    description: 'User opens live chat from order details to get support for a specific order.',
    preconditions: [
      'User is viewing order details',
      'Live chat is enabled',
      'Order has billId',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap live chat button with billId',
        expectedResult: 'Chat opens with order context',
        uiState: 'Chat screen loads with order information',
      },
    ],
    postconditions: [
      'Chat is opened',
      'Order context is available',
    ],
    successCriteria: [
      'Chat opens successfully',
      'Order information is passed',
    ],
    relatedTestCases: ['TC-LIVE-CHAT-004'],
  },
  {
    id: 'UC-LIVE-CHAT-004',
    title: 'Chat Interface Interaction',
    priority: 'High',
    userType: 'End User',
    description: 'User interacts with chat interface in web view to send and receive messages.',
    preconditions: [
      'Live chat screen is open',
      'Chat URL is loaded',
    ],
    steps: [
      {
        step: 1,
        action: 'Interact with chat web view',
        expectedResult: 'Chat interface responds',
        uiState: 'Messages can be sent and received',
      },
    ],
    postconditions: [
      'User can communicate with support',
    ],
    successCriteria: [
      'Chat interface is functional',
      'Messages can be sent',
      'Messages can be received',
    ],
    relatedTestCases: ['TC-LIVE-CHAT-005', 'TC-LIVE-CHAT-006'],
  },
  {
    id: 'UC-LIVE-CHAT-005',
    title: 'Handle Chat Loading State',
    priority: 'High',
    userType: 'End User',
    description: 'User sees loading indicator while chat URL is being fetched.',
    preconditions: [
      'User taps live chat button',
      'Chat URL needs to be fetched',
    ],
    steps: [
      {
        step: 1,
        action: 'Wait for chat to load',
        expectedResult: 'Loading indicator is shown',
        uiState: 'Loading spinner appears',
      },
      {
        step: 2,
        action: 'Chat URL loads',
        expectedResult: 'Chat interface appears',
        uiState: 'Web view displays chat',
      },
    ],
    postconditions: [
      'Chat is loaded',
    ],
    successCriteria: [
      'Loading state is shown',
      'Chat loads successfully',
    ],
    relatedTestCases: ['TC-LIVE-CHAT-007'],
  },
];


