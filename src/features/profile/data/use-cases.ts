import { UseCase } from '@/lib/types';

export const profileUseCases: UseCase[] = [
  {
    id: 'UC-PROFILE-001',
    title: 'View Profile Screen',
    priority: 'High',
    userType: 'End User',
    description: 'User opens the profile screen to view their account information and access various features.',
    preconditions: [
      'User has app installed',
      'User is on main navigation',
    ],
    steps: [
      {
        step: 1,
        action: 'Navigate to profile tab/section',
        expectedResult: 'Profile screen loads',
        uiState: 'Profile screen displayed with user name and sections',
      },
      {
        step: 2,
        action: 'View profile header',
        expectedResult: 'User name displayed, profile image shown (iOS only)',
        uiState: 'Header section visible with name and optional image',
      },
    ],
    postconditions: [
      'Profile screen is displayed',
      'All sections are visible',
    ],
    successCriteria: [
      'Profile screen loads successfully',
      'User name is displayed correctly',
      'All navigation options are visible',
    ],
    relatedTestCases: ['TC-PROFILE-001', 'TC-PROFILE-002'],
  },
  {
    id: 'UC-PROFILE-002',
    title: 'Navigate to Edit Profile',
    priority: 'High',
    userType: 'End User',
    description: 'User taps on Edit Profile to modify their account information.',
    preconditions: [
      'User is logged in',
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap Edit Profile button',
        expectedResult: 'Navigate to edit profile screen',
        uiState: 'Edit profile screen opens',
      },
    ],
    postconditions: [
      'Edit profile screen is displayed',
    ],
    successCriteria: [
      'Navigation to edit profile works',
      'Edit profile screen loads',
    ],
    relatedTestCases: ['TC-PROFILE-003'],
  },
  {
    id: 'UC-PROFILE-003',
    title: 'Access Account Details',
    priority: 'High',
    userType: 'End User',
    description: 'User accesses various account-related features from the profile screen.',
    preconditions: [
      'User is logged in',
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap on account detail option (My Orders, My Addresses, Favorites, My Vouchers)',
        expectedResult: 'Navigate to respective screen',
        uiState: 'Target screen opens',
      },
    ],
    postconditions: [
      'User is on the selected screen',
    ],
    successCriteria: [
      'Navigation works correctly',
      'Correct screen is displayed',
    ],
    relatedTestCases: ['TC-PROFILE-004', 'TC-PROFILE-005', 'TC-PROFILE-006', 'TC-PROFILE-007'],
  },
  {
    id: 'UC-PROFILE-004',
    title: 'Change App Language',
    priority: 'Medium',
    userType: 'End User',
    description: 'User changes the app language from settings.',
    preconditions: [
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap Language option in Settings',
        expectedResult: 'Language bottom sheet opens',
        uiState: 'Bottom sheet displays available languages',
      },
      {
        step: 2,
        action: 'Select a language',
        expectedResult: 'Language changes, app updates',
        uiState: 'App text updates to selected language',
      },
    ],
    postconditions: [
      'App language is changed',
      'All text is updated',
    ],
    successCriteria: [
      'Language bottom sheet opens',
      'Language selection works',
      'App updates immediately',
    ],
    relatedTestCases: ['TC-PROFILE-008'],
  },
  {
    id: 'UC-PROFILE-005',
    title: 'Change Currency',
    priority: 'Medium',
    userType: 'End User',
    description: 'User changes the app currency from settings.',
    preconditions: [
      'Profile screen is displayed',
      'Currency change is enabled',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap Select Currency option',
        expectedResult: 'Currency bottom sheet opens',
        uiState: 'Bottom sheet displays available currencies',
      },
      {
        step: 2,
        action: 'Select a currency',
        expectedResult: 'Currency changes',
        uiState: 'Prices update to selected currency',
      },
    ],
    postconditions: [
      'Currency is changed',
      'Prices are updated',
    ],
    successCriteria: [
      'Currency bottom sheet opens',
      'Currency selection works',
      'Prices update correctly',
    ],
    relatedTestCases: ['TC-PROFILE-009'],
  },
  {
    id: 'UC-PROFILE-006',
    title: 'Access Help Center',
    priority: 'Medium',
    userType: 'End User',
    description: 'User accesses help and information sections.',
    preconditions: [
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap on help center option (Privacy, Terms, FAQs, About Us)',
        expectedResult: 'Navigate to respective screen',
        uiState: 'Target screen opens',
      },
    ],
    postconditions: [
      'User is on the selected help screen',
    ],
    successCriteria: [
      'Navigation works correctly',
      'Correct content is displayed',
    ],
    relatedTestCases: ['TC-PROFILE-010', 'TC-PROFILE-011', 'TC-PROFILE-012', 'TC-PROFILE-013'],
  },
  {
    id: 'UC-PROFILE-007',
    title: 'Login from Profile',
    priority: 'High',
    userType: 'End User',
    description: 'User who is not logged in taps login button to authenticate.',
    preconditions: [
      'User is not logged in',
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap Login button',
        expectedResult: 'Navigate to phone number/login screen',
        uiState: 'Login screen opens',
      },
    ],
    postconditions: [
      'User is on login screen',
    ],
    successCriteria: [
      'Navigation to login works',
      'Login screen loads',
    ],
    relatedTestCases: ['TC-PROFILE-014'],
  },
  {
    id: 'UC-PROFILE-008',
    title: 'Access Live Chat',
    priority: 'Medium',
    userType: 'End User',
    description: 'User accesses live chat support from profile screen.',
    preconditions: [
      'Profile screen is displayed',
      'Live chat is enabled',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap floating live chat button',
        expectedResult: 'Live chat opens',
        uiState: 'Chat interface appears',
      },
    ],
    postconditions: [
      'Live chat is open',
    ],
    successCriteria: [
      'Live chat button is visible',
      'Chat opens correctly',
    ],
    relatedTestCases: ['TC-PROFILE-015'],
  },
  {
    id: 'UC-PROFILE-009',
    title: 'Change Profile Image (iOS)',
    priority: 'Low',
    userType: 'End User',
    description: 'User changes their profile image on iOS devices.',
    preconditions: [
      'User is on iOS',
      'User is logged in',
      'Profile screen is displayed',
    ],
    steps: [
      {
        step: 1,
        action: 'Tap edit icon on profile image',
        expectedResult: 'Image picker opens',
        uiState: 'File picker displays image options',
      },
      {
        step: 2,
        action: 'Select an image',
        expectedResult: 'Profile image updates',
        uiState: 'New image is displayed',
      },
    ],
    postconditions: [
      'Profile image is updated',
      'Image is saved locally',
    ],
    successCriteria: [
      'Image picker opens',
      'Image selection works',
      'Image updates correctly',
    ],
    relatedTestCases: ['TC-PROFILE-016'],
  },
];

