import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, UtensilsCrossed, ArrowRight, FileText, Layers, Zap, Code2, TestTube, AlertTriangle, Store, ShoppingCart, ShoppingBag, Home, Rss, Star, MapPin, UserPlus, Shield, Phone, User, CheckCircle2, Clock, Circle, ClipboardList, HelpCircle, MessageCircle, ChevronDown, ChevronUp, Tag, CreditCard, Wallet, Download, Upload } from 'lucide-react';
import { StatusBadge } from '@/components/Badge';
import { cn, exportToJSON, exportToCSV, readJSONFile, readCSVFile } from '@/lib/utils';
import { useQAStore } from '@/store/qa-store';
import type { TestStatus } from '@/lib/types';

// Import actual data to get real counts
import { dishUseCases } from '@/features/dish/data/use-cases';
import { dishEdgeCases } from '@/features/dish/data/edge-cases';
import { dishTestCases } from '@/features/dish/data/test-cases';
import { splashUseCases } from '@/features/splash/data/use-cases';
import { splashEdgeCases } from '@/features/splash/data/edge-cases';
import { splashTestCases } from '@/features/splash/data/test-cases';
import { menuRestaurantUseCases } from '@/features/menu-restaurant/data/use-cases';
import { menuRestaurantEdgeCases } from '@/features/menu-restaurant/data/edge-cases';
import { menuRestaurantTestCases } from '@/features/menu-restaurant/data/test-cases';
import { checkoutUseCases } from '@/features/checkout/data/use-cases';
import { checkoutEdgeCases } from '@/features/checkout/data/edge-cases';
import { checkoutTestCases } from '@/features/checkout/data/test-cases';
import { cartUseCases } from '@/features/cart/data/use-cases';
import { cartEdgeCases } from '@/features/cart/data/edge-cases';
import { cartTestCases } from '@/features/cart/data/test-cases';
import { homeUseCases } from '@/features/home/data/use-cases';
import { homeEdgeCases } from '@/features/home/data/edge-cases';
import { homeTestCases } from '@/features/home/data/test-cases';
import { homeFeedUseCases } from '@/features/home-feed/data/use-cases';
import { homeFeedEdgeCases } from '@/features/home-feed/data/edge-cases';
import { homeFeedTestCases } from '@/features/home-feed/data/test-cases';
import { orderRatingUseCases } from '@/features/order-rating/data/use-cases';
import { orderRatingEdgeCases } from '@/features/order-rating/data/edge-cases';
import { orderRatingTestCases } from '@/features/order-rating/data/test-cases';
import { orderTrackingUseCases } from '@/features/order-tracking/data/use-cases';
import { orderTrackingEdgeCases } from '@/features/order-tracking/data/edge-cases';
import { orderTrackingTestCases } from '@/features/order-tracking/data/test-cases';
import { restaurantListUseCases } from '@/features/restaurant-list/data/use-cases';
import { restaurantListEdgeCases } from '@/features/restaurant-list/data/edge-cases';
import { restaurantListTestCases } from '@/features/restaurant-list/data/test-cases';
import { addressUseCases } from '@/features/address/data/use-cases';
import { addressEdgeCases } from '@/features/address/data/edge-cases';
import { addressTestCases } from '@/features/address/data/test-cases';
import { searchPageUseCases } from '@/features/search-page/data/use-cases';
import { searchPageEdgeCases } from '@/features/search-page/data/edge-cases';
import { searchPageTestCases } from '@/features/search-page/data/test-cases';
import { friendInviteUseCases } from '@/features/friend-invite/data/use-cases';
import { friendInviteEdgeCases } from '@/features/friend-invite/data/edge-cases';
import { friendInviteTestCases } from '@/features/friend-invite/data/test-cases';
import { otpUseCases } from '@/features/otp/data/use-cases';
import { otpEdgeCases } from '@/features/otp/data/edge-cases';
import { otpTestCases } from '@/features/otp/data/test-cases';
import { phoneNumberUseCases } from '@/features/phone-number/data/use-cases';
import { phoneNumberEdgeCases } from '@/features/phone-number/data/edge-cases';
import { phoneNumberTestCases } from '@/features/phone-number/data/test-cases';
import { userInfoUseCases } from '@/features/user-info/data/use-cases';
import { userInfoEdgeCases } from '@/features/user-info/data/edge-cases';
import { userInfoTestCases } from '@/features/user-info/data/test-cases';
import { surveyUseCases } from '@/features/survey/data/use-cases';
import { surveyEdgeCases } from '@/features/survey/data/edge-cases';
import { surveyTestCases } from '@/features/survey/data/test-cases';
import { knowUsUseCases } from '@/features/know-us/data/use-cases';
import { knowUsEdgeCases } from '@/features/know-us/data/edge-cases';
import { knowUsTestCases } from '@/features/know-us/data/test-cases';
import { reportingUseCases } from '@/features/reporting/data/use-cases';
import { reportingEdgeCases } from '@/features/reporting/data/edge-cases';
import { reportingTestCases } from '@/features/reporting/data/test-cases';
import { editProfileUseCases } from '@/features/edit-profile/data/use-cases';
import { editProfileEdgeCases } from '@/features/edit-profile/data/edge-cases';
import { editProfileTestCases } from '@/features/edit-profile/data/test-cases';
import { liveChatUseCases } from '@/features/live-chat/data/use-cases';
import { liveChatEdgeCases } from '@/features/live-chat/data/edge-cases';
import { liveChatTestCases } from '@/features/live-chat/data/test-cases';
import { profileUseCases } from '@/features/profile/data/use-cases';
import { profileEdgeCases } from '@/features/profile/data/edge-cases';
import { profileTestCases } from '@/features/profile/data/test-cases';
import { tagScreensUseCases } from '@/features/tag-screens/data/use-cases';
import { tagScreensEdgeCases } from '@/features/tag-screens/data/edge-cases';
import { tagScreensTestCases } from '@/features/tag-screens/data/test-cases';
import { walletInfoUseCases } from '@/features/wallet-info/data/use-cases';
import { walletInfoEdgeCases } from '@/features/wallet-info/data/edge-cases';
import { walletInfoTestCases } from '@/features/wallet-info/data/test-cases';
import { walletUseCases } from '@/features/wallet/data/use-cases';
import { walletEdgeCases } from '@/features/wallet/data/edge-cases';
import { walletTestCases } from '@/features/wallet/data/test-cases';

interface FeatureCard {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  status: 'Stable' | 'Beta' | 'Alpha' | 'Deprecated';
  architecture: 'MVVM' | 'Clean' | 'MVC' | 'MVP' | 'BLoC';
  useCases: number;
  edgeCases: number;
  testCases: number;
  path: string;
  tags: string[];
}

const features: FeatureCard[] = [
  {
    id: 'dish',
    name: 'Dish Feature',
    icon: UtensilsCrossed,
    description: 'View dish details, customize options and toppings, adjust quantity, and add to cart.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: dishUseCases.length,
    edgeCases: dishEdgeCases.length,
    testCases: dishTestCases.length,
    path: '/feature/dish',
    tags: ['Cart', 'Customization', 'Favorites'],
  },
  {
    id: 'menu-restaurant',
    name: 'Menu Restaurant',
    icon: Store,
    description: 'Browse restaurants and markets, view menus, search items, toggle pickup/delivery, and manage favorites.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: menuRestaurantUseCases.length,
    edgeCases: menuRestaurantEdgeCases.length,
    testCases: menuRestaurantTestCases.length,
    path: '/feature/menu-restaurant',
    tags: ['Menu', 'Search', 'Favorites', 'Market'],
  },
  {
    id: 'splash',
    name: 'Splash Screen',
    icon: Zap,
    description: 'App initialization, authentication routing, settings loading, and first-time user experience.',
    status: 'Stable',
    architecture: 'Clean',
    useCases: splashUseCases.length,
    edgeCases: splashEdgeCases.length,
    testCases: splashTestCases.length,
    path: '/feature/splash',
    tags: ['Authentication', 'Initialization', 'Navigation'],
  },
  {
    id: 'checkout',
    name: 'Checkout',
    icon: ShoppingCart,
    description: 'Complete orders with bill calculation, payment methods, vouchers, tips, gift orders, and delivery scheduling.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: checkoutUseCases.length,
    edgeCases: checkoutEdgeCases.length,
    testCases: checkoutTestCases.length,
    path: '/feature/checkout',
    tags: ['Payment', 'Vouchers', 'Tips', 'Gift Orders'],
  },
  {
    id: 'cart',
    name: 'Cart',
    icon: ShoppingBag,
    description: 'Shopping cart management with multiple carts, item customization, quantity controls, free delivery tracking, and dynamic rewards.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: cartUseCases.length,
    edgeCases: cartEdgeCases.length,
    testCases: cartTestCases.length,
    path: '/feature/cart',
    tags: ['Cart', 'Basket', 'Quantity', 'Rewards'],
  },
  {
    id: 'home',
    name: 'Home',
    icon: Home,
    description: 'Main app container with bottom navigation, location permissions, push notifications, app lifecycle handling, and fortune wheel spinner.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: homeUseCases.length,
    edgeCases: homeEdgeCases.length,
    testCases: homeTestCases.length,
    path: '/feature/home',
    tags: ['Navigation', 'Location', 'Notifications', 'Spinner'],
  },
  {
    id: 'home-feed',
    name: 'Home Feed',
    icon: Rss,
    description: 'Dynamic content feed with sections, order status, vouchers, loyalty points, flash sales, banners, offers, and real-time updates.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: homeFeedUseCases.length,
    edgeCases: homeFeedEdgeCases.length,
    testCases: homeFeedTestCases.length,
    path: '/feature/home-feed',
    tags: ['Feed', 'Orders', 'Vouchers', 'Loyalty', 'Flash Sale', 'Real-time'],
  },
  {
    id: 'order-rating',
    name: 'Order Rating',
    icon: Star,
    description: 'Rate completed orders with star ratings, detailed feedback options, notes, photo uploads, and two-step rating process (restaurant and driver).',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: orderRatingUseCases.length,
    edgeCases: orderRatingEdgeCases.length,
    testCases: orderRatingTestCases.length,
    path: '/feature/order-rating',
    tags: ['Rating', 'Feedback', 'Reviews', 'Photos', 'Validation'],
  },
  {
    id: 'order-tracking',
    name: 'Order Tracking',
    icon: MapPin,
    description: 'Real-time order tracking with map visualization, driver location updates, status progress, address management, and completion overlay.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: orderTrackingUseCases.length,
    edgeCases: orderTrackingEdgeCases.length,
    testCases: orderTrackingTestCases.length,
    path: '/feature/order-tracking',
    tags: ['Tracking', 'Map', 'Real-time', 'WebSocket', 'Driver Location'],
  },
  {
    id: 'restaurant-list',
    name: 'Restaurant List',
    icon: Store,
    description: 'Browse and discover restaurants with categories, filters, banners, pagination, pickup/delivery toggle, and guest user restrictions.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: restaurantListUseCases.length,
    edgeCases: restaurantListEdgeCases.length,
    testCases: restaurantListTestCases.length,
    path: '/feature/restaurant-list',
    tags: ['Restaurants', 'Filtering', 'Categories', 'Pagination', 'Search'],
  },
  {
    id: 'address',
    name: 'Address',
    icon: MapPin,
    description: 'Add and manage delivery addresses using interactive map, location search, delivery area visualization, and address validation.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: addressUseCases.length,
    edgeCases: addressEdgeCases.length,
    testCases: addressTestCases.length,
    path: '/feature/address',
    tags: ['Address', 'Map', 'Location', 'Delivery', 'GPS'],
  },
  {
    id: 'search-page',
    name: 'Search Page',
    icon: Search,
    description: 'Comprehensive search functionality for finding restaurants, markets, and dishes with filters, suggestions, categories, and outlet recommendations.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: searchPageUseCases.length,
    edgeCases: searchPageEdgeCases.length,
    testCases: searchPageTestCases.length,
    path: '/feature/search-page',
    tags: ['Search', 'Filters', 'Suggestions', 'Categories', 'Recommendations'],
  },
  {
    id: 'friend-invite',
    name: 'Friend Invite',
    icon: UserPlus,
    description: 'Allow users to enter friend invite codes during registration or onboarding to receive referral rewards and benefits.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: friendInviteUseCases.length,
    edgeCases: friendInviteEdgeCases.length,
    testCases: friendInviteTestCases.length,
    path: '/feature/friend-invite',
    tags: ['Referral', 'Invite', 'Rewards', 'Onboarding', 'Validation'],
  },
  {
    id: 'otp',
    name: 'OTP Verification',
    icon: Shield,
    description: 'Phone number verification using One-Time Password codes sent via SMS or phone call with SMS autofill and automatic verification.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: otpUseCases.length,
    edgeCases: otpEdgeCases.length,
    testCases: otpTestCases.length,
    path: '/feature/otp',
    tags: ['Authentication', 'Verification', 'SMS', 'Security', 'OTP'],
  },
  {
    id: 'phone-number',
    name: 'Phone Number',
    icon: Phone,
    description: 'Phone number entry, validation, country selection, previous numbers, guest mode, and terms acceptance.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: phoneNumberUseCases.length,
    edgeCases: phoneNumberEdgeCases.length,
    testCases: phoneNumberTestCases.length,
    path: '/feature/phone-number',
    tags: ['Authentication', 'Phone', 'Validation', 'Guest Mode'],
  },
  {
    id: 'user-info',
    name: 'User Info',
    icon: User,
    description: 'Personal information collection with name, gender, city selection, form validation, and onboarding flow navigation.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: userInfoUseCases.length,
    edgeCases: userInfoEdgeCases.length,
    testCases: userInfoTestCases.length,
    path: '/feature/user-info',
    tags: ['Authentication', 'Registration', 'Profile', 'Onboarding'],
  },
  {
    id: 'survey',
    name: 'Survey',
    icon: ClipboardList,
    description: 'User feedback collection through interactive surveys with single choice, multiple choice, rating, and text-only questions displayed in bottom sheets.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: surveyUseCases.length,
    edgeCases: surveyEdgeCases.length,
    testCases: surveyTestCases.length,
    path: '/feature/survey',
    tags: ['Feedback', 'Survey', 'Rating', 'User Research'],
  },
  {
    id: 'know-us',
    name: 'Know Us',
    icon: HelpCircle,
    description: 'Onboarding survey with single choice, multiple choice, date picker, and note questions. Includes progress tracking, skip functionality, and smart navigation.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: knowUsUseCases.length,
    edgeCases: knowUsEdgeCases.length,
    testCases: knowUsTestCases.length,
    path: '/feature/know-us',
    tags: ['Onboarding', 'Survey', 'User Data', 'Registration'],
  },
  {
    id: 'reporting',
    name: 'Reporting',
    icon: AlertTriangle,
    description: 'Multi-step issue reporting with issue type selection, reason forms, date picker, dish search, note input, and progress tracking.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: reportingUseCases.length,
    edgeCases: reportingEdgeCases.length,
    testCases: reportingTestCases.length,
    path: '/feature/reporting',
    tags: ['Issue Reporting', 'Quality Control', 'Customer Feedback', 'Restaurant'],
  },
  {
    id: 'edit-profile',
    name: 'Edit Profile',
    icon: User,
    description: 'Profile editing with name, email, date of birth, gender, city selection, loyalty points display, logout, and account deletion.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: editProfileUseCases.length,
    edgeCases: editProfileEdgeCases.length,
    testCases: editProfileTestCases.length,
    path: '/feature/edit-profile',
    tags: ['Profile', 'User Management', 'Account', 'Settings'],
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: User,
    description: 'Central hub for account management, settings, navigation to account details, language/currency selection, help center, and live chat.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: profileUseCases.length,
    edgeCases: profileEdgeCases.length,
    testCases: profileTestCases.length,
    path: '/feature/profile',
    tags: ['Profile', 'Settings', 'Navigation', 'Account', 'Help Center'],
  },
  {
    id: 'live-chat',
    name: 'Live Chat',
    icon: MessageCircle,
    description: 'Customer support chat interface with floating action button, unread message badge, web view chat interface, loading states, and error handling.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: liveChatUseCases.length,
    edgeCases: liveChatEdgeCases.length,
    testCases: liveChatTestCases.length,
    path: '/feature/live-chat',
    tags: ['Support', 'Chat', 'Customer Service', 'Communication'],
  },
  {
    id: 'tag-screens',
    name: 'Tag Screens',
    icon: Tag,
    description: 'Browse dishes and restaurants filtered by tags with infinite scroll pagination, loading states, error handling, and smooth navigation.',
    status: 'Stable',
    architecture: 'BLoC',
    useCases: tagScreensUseCases.length,
    edgeCases: tagScreensEdgeCases.length,
    testCases: tagScreensTestCases.length,
    path: '/feature/tag-screens',
    tags: ['Tags', 'Filtering', 'Pagination', 'Browse'],
  },
  {
    id: 'wallet-info',
    name: 'Wallet Info',
    icon: CreditCard,
    description: 'View wallet transaction history with date filtering, manage card details, pay invoices with PIN validation and tip selection.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: walletInfoUseCases.length,
    edgeCases: walletInfoEdgeCases.length,
    testCases: walletInfoTestCases.length,
    path: '/feature/wallet-info',
    tags: ['Wallet', 'Transactions', 'Payment', 'Finance'],
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: Wallet,
    description: 'Manage digital wallet, view balance, pay invoices with PIN, top up funds, browse restaurants for dine-in payment.',
    status: 'Stable',
    architecture: 'MVVM',
    useCases: walletUseCases.length,
    edgeCases: walletEdgeCases.length,
    testCases: walletTestCases.length,
    path: '/feature/wallet',
    tags: ['Wallet', 'Payment', 'Finance', 'Dine-In'],
  },
];

// Map feature IDs to their test cases
const featureTestCasesMap: Record<string, typeof dishTestCases> = {
  'dish': dishTestCases,
  'splash': splashTestCases,
  'menu-restaurant': menuRestaurantTestCases,
  'checkout': checkoutTestCases,
  'cart': cartTestCases,
  'home': homeTestCases,
  'home-feed': homeFeedTestCases,
  'order-rating': orderRatingTestCases,
  'order-tracking': orderTrackingTestCases,
  'restaurant-list': restaurantListTestCases,
  'address': addressTestCases,
  'search-page': searchPageTestCases,
  'friend-invite': friendInviteTestCases,
  'otp': otpTestCases,
  'phone-number': phoneNumberTestCases,
  'user-info': userInfoTestCases,
  'survey': surveyTestCases,
  'know-us': knowUsTestCases,
  'reporting': reportingTestCases,
  'edit-profile': editProfileTestCases,
  'profile': profileTestCases,
  'live-chat': liveChatTestCases,
  'tag-screens': tagScreensTestCases,
  'wallet-info': walletInfoTestCases,
  'wallet': walletTestCases,
};

type ProgressView = 'not-started' | 'in-progress' | 'done' | 'all';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [progressView, setProgressView] = useState<ProgressView>('all');
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getProgress = useQAStore((state) => state.getProgress);
  const testResults = useQAStore((state) => state.testResults);
  const updateTestStatus = useQAStore((state) => state.updateTestStatus);
  const updateTestNotes = useQAStore((state) => state.updateTestNotes);

  const allTags = Array.from(new Set(features.flatMap(f => f.tags)));
  const totalUseCases = features.reduce((acc, f) => acc + f.useCases, 0);
  const totalEdgeCases = features.reduce((acc, f) => acc + f.edgeCases, 0);
  const totalTests = features.reduce((acc, f) => acc + f.testCases, 0);

  // Calculate progress for each feature
  const featuresWithProgress = useMemo(() => {
    return features.map(feature => {
      const testCases = featureTestCasesMap[feature.id] || [];
      const progress = getProgress(testCases);
      return {
        ...feature,
        progress: progress.percentage,
      };
    });
  }, [getProgress]);

  // Group features by progress status
  const groupedFeatures = useMemo(() => {
    const notStarted = featuresWithProgress.filter(f => f.progress === 0);
    const inProgress = featuresWithProgress.filter(f => f.progress > 0 && f.progress < 100);
    const done = featuresWithProgress.filter(f => f.progress === 100);
    return { notStarted, inProgress, done };
  }, [featuresWithProgress]);

  // Get features based on selected progress view
  const getFeaturesForView = (view: ProgressView) => {
    let featuresToShow: typeof featuresWithProgress = [];
    switch (view) {
      case 'not-started':
        featuresToShow = groupedFeatures.notStarted;
        break;
      case 'in-progress':
        featuresToShow = groupedFeatures.inProgress;
        break;
      case 'done':
        featuresToShow = groupedFeatures.done;
        break;
      case 'all':
      default:
        featuresToShow = featuresWithProgress;
        break;
    }
    return featuresToShow.filter(feature => {
      const matchesSearch = searchQuery === '' ||
        feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || feature.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  };

  const displayedFeatures = getFeaturesForView(progressView);

  const handleExportAllJSON = () => {
    const allTestData: Array<{ feature: string; testId: string; title: string; status: string; notes: string; lastTested?: string; testedBy?: string }> = [];
    
    features.forEach(feature => {
      const testCases = featureTestCasesMap[feature.id] || [];
      testCases.forEach(tc => {
        const result = testResults[tc.id];
        if (result) {
          allTestData.push({
            feature: feature.name,
            testId: tc.id,
            title: tc.title,
            status: result.status,
            notes: result.notes || '',
            lastTested: result.lastTested,
            testedBy: result.testedBy,
          });
        }
      });
    });

    exportToJSON(allTestData, 'all-features-qa-results');
  };

  const handleExportAllCSV = () => {
    const allTestData: Array<{ feature: string; testId: string; title: string; status: string; notes: string; lastTested?: string; testedBy?: string }> = [];
    
    features.forEach(feature => {
      const testCases = featureTestCasesMap[feature.id] || [];
      testCases.forEach(tc => {
        const result = testResults[tc.id];
        if (result) {
          allTestData.push({
            feature: feature.name,
            testId: tc.id,
            title: tc.title,
            status: result.status,
            notes: result.notes || '',
            lastTested: result.lastTested,
            testedBy: result.testedBy,
          });
        }
      });
    });

    exportToCSV(allTestData, 'all-features-qa-results');
  };

  const handleImportAllClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportAll = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);

    try {
      let importedData: unknown;

      if (file.name.endsWith('.json')) {
        importedData = await readJSONFile(file);
      } else if (file.name.endsWith('.csv')) {
        importedData = await readCSVFile(file);
      } else {
        setImportError('Unsupported file type. Please use JSON or CSV files.');
        return;
      }

      const statusOptions: TestStatus[] = ['Not Started', 'In Progress', 'Pass', 'Fail', 'Blocked', 'Skip'];
      let importedCount = 0;

      // Process imported data
      if (Array.isArray(importedData)) {
        // CSV or JSON array format
        importedData.forEach((item: any) => {
          const testId = item.testId || item.id;
          if (testId) {
            // Check if this test ID exists in any feature
            let testExists = false;
            for (const feature of features) {
              const testCases = featureTestCasesMap[feature.id] || [];
              if (testCases.some(tc => tc.id === testId)) {
                testExists = true;
                break;
              }
            }

            if (testExists) {
              // Update status if provided and valid
              if (item.status && statusOptions.includes(item.status as TestStatus)) {
                updateTestStatus(testId, item.status as TestStatus);
              }
              // Update notes if provided
              if (item.notes !== undefined) {
                updateTestNotes(testId, String(item.notes || ''));
              }
              importedCount++;
            }
          }
        });
      } else if (typeof importedData === 'object' && importedData !== null) {
        // JSON object format
        const data = importedData as Record<string, any>;
        
        // Check if it's a testResults object format
        if (data.testResults && typeof data.testResults === 'object') {
          Object.entries(data.testResults).forEach(([testId, result]: [string, any]) => {
            // Check if this test ID exists in any feature
            let testExists = false;
            for (const feature of features) {
              const testCases = featureTestCasesMap[feature.id] || [];
              if (testCases.some(tc => tc.id === testId)) {
                testExists = true;
                break;
              }
            }

            if (testExists) {
              if (result.status && statusOptions.includes(result.status as TestStatus)) {
                updateTestStatus(testId, result.status as TestStatus);
              }
              if (result.notes !== undefined) {
                updateTestNotes(testId, String(result.notes || ''));
              }
              importedCount++;
            }
          });
        } else {
          // Try to treat as array of test cases
          const items = Object.values(data);
          items.forEach((item: any) => {
            const testId = item.testId || item.id;
            if (testId) {
              let testExists = false;
              for (const feature of features) {
                const testCases = featureTestCasesMap[feature.id] || [];
                if (testCases.some(tc => tc.id === testId)) {
                  testExists = true;
                  break;
                }
              }

              if (testExists) {
                if (item.status && statusOptions.includes(item.status as TestStatus)) {
                  updateTestStatus(testId, item.status as TestStatus);
                }
                if (item.notes !== undefined) {
                  updateTestNotes(testId, String(item.notes || ''));
                }
                importedCount++;
              }
            }
          });
        }
      } else {
        setImportError('Invalid file format.');
        return;
      }

      if (importedCount === 0) {
        setImportError('No matching test cases found in the imported file.');
      } else {
        alert(`Successfully imported ${importedCount} test result(s) from all features.`);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import file.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-8 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]" style={{ marginBottom: '32px' }}>
          BeeOrder Documentation
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl" style={{ marginBottom: '48px' }}>
          Comprehensive documentation for BeeOrder's Flutter application. 
          Browse features, explore use cases, and track QA testing.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6" style={{ marginBottom: '48px' }}>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{features.length}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Features</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalUseCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Use Cases</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalEdgeCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Edge Cases</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-[var(--color-bg-tertiary)] rounded-xl border border-[var(--color-border)]">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TestTube className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{totalTests}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Test Cases</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md" style={{ marginBottom: '32px' }}>
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '48px', paddingTop: '16px', paddingBottom: '16px', paddingRight: '20px' }}
              className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="w-full">
          {/* Toggle Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setTagsExpanded(!tagsExpanded)}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              <span>Menu</span>
              {tagsExpanded ? (
                <ChevronUp className="w-5 h-5 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-5 h-5 transition-transform duration-200" />
              )}
            </button>
          </div>

          {/* Collapsible Tags Container */}
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              tagsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setSelectedTag(null);
                  setTagsExpanded(false);
                }}
                className={cn(
                  'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                  !selectedTag 
                    ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/35' 
                    : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                )}
                style={{ padding: '16px 32px' }}
              >
                <Layers className="w-5 h-5" />
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag === selectedTag ? null : tag);
                    setTagsExpanded(false);
                  }}
                  className={cn(
                    'rounded-xl text-base font-semibold transition-all duration-200',
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/35' 
                      : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                  )}
                  style={{ padding: '16px 32px' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Navigation Tabs */}
      <section className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv"
          onChange={handleImportAll}
          className="hidden"
        />
        {importError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {importError}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Features by Progress
          </h2>
          <div className="flex flex-wrap gap-3 ml-auto">
            <button
              onClick={handleImportAllClick}
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '12px 24px' }}
              title="Import JSON or CSV file with QA test results for all features"
            >
              <Download className="w-4 h-4" />
              <span>Import All</span>
            </button>
            <button
              onClick={handleExportAllJSON}
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '12px 24px' }}
              title="Export all QA test results as JSON"
            >
              <Upload className="w-4 h-4" />
              <span>Export All JSON</span>
            </button>
            <button
              onClick={handleExportAllCSV}
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '12px 24px' }}
              title="Export all QA test results as CSV"
            >
              <Upload className="w-4 h-4" />
              <span>Export All CSV</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setProgressView('all')}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                progressView === 'all'
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/35'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              <Layers className="w-5 h-5" />
              All ({featuresWithProgress.length})
            </button>
            <button
              onClick={() => setProgressView('not-started')}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                progressView === 'not-started'
                  ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-500/35'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-gray-500/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              <Circle className="w-5 h-5" />
              Not Started ({groupedFeatures.notStarted.length})
            </button>
            <button
              onClick={() => setProgressView('in-progress')}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                progressView === 'in-progress'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-amber-500/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              <Clock className="w-5 h-5" />
              In Progress ({groupedFeatures.inProgress.length})
            </button>
            <button
              onClick={() => setProgressView('done')}
              className={cn(
                'rounded-xl text-base font-semibold transition-all duration-200 flex items-center gap-2',
                progressView === 'done'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] hover:border-emerald-500/50 hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
              )}
              style={{ padding: '16px 32px' }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Done ({groupedFeatures.done.length})
            </button>
        </div>

        {/* Features Grid */}
        {displayedFeatures.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {displayedFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)]">
            {progressView === 'not-started' && <Circle className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />}
            {progressView === 'in-progress' && <Clock className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />}
            {progressView === 'done' && <CheckCircle2 className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />}
            {progressView === 'all' && <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />}
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              No features found
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {progressView === 'all' && 'Try adjusting your search or filters'}
              {progressView === 'not-started' && 'No features with 0% progress found'}
              {progressView === 'in-progress' && 'No features in progress found'}
              {progressView === 'done' && 'No completed features found'}
            </p>
            {(searchQuery || selectedTag) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag(null);
                }}
                className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-lg hover:bg-[var(--color-primary)]/20 transition-all"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ feature }: { feature: FeatureCard & { progress?: number } }) {
  return (
    <Link
      to={feature.path}
      className="block group"
    >
      <div className="h-full bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[var(--color-primary)]/5" style={{ padding: '32px' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-lg">
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={feature.status} />
            {feature.progress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="relative w-16 h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      feature.progress === 0 ? "bg-gray-500" :
                      feature.progress === 100 ? "bg-emerald-500" :
                      "bg-amber-500"
                    )}
                    style={{ width: `${feature.progress}%` }}
                  />
                </div>
                <span className={cn(
                  "text-xs font-semibold",
                  feature.progress === 0 ? "text-gray-500" :
                  feature.progress === 100 ? "text-emerald-500" :
                  "text-amber-500"
                )}>
                  {feature.progress}%
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
          {feature.name}
        </h3>
        <p className="text-base text-[var(--color-text-secondary)] mb-6 leading-relaxed">
          {feature.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {feature.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--color-primary)]">{feature.useCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Use Cases</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-amber-500">{feature.edgeCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Edge Cases</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-500">{feature.testCases}</div>
              <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Tests</div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all">
            <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
