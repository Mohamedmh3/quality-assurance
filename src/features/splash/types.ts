// Splash feature specific types
import type { UseCase, EdgeCase, TestCase, APIEndpoint, DataModel, FlutterFile } from '@/lib/types';

// Re-export for convenience
export type { UseCase, EdgeCase, TestCase, APIEndpoint, DataModel, FlutterFile } from '@/lib/types';

export interface SplashFeatureData {
  overview: {
    name: string;
    description: string;
    valueProposition: string;
    targetUsers: string[];
    architecturePattern: string;
    stateManagement: string;
  };
  folderStructure: {
    legacyView: FlutterFile[];
    legacyViewModel: FlutterFile[];
    legacyModel: FlutterFile[];
    presentationScreen: FlutterFile[];
    presentationViewModel: FlutterFile[];
    presentationState: FlutterFile[];
    services: FlutterFile[];
    dataRepository: FlutterFile[];
    dataRemoteService: FlutterFile[];
    dataLocalStorage: FlutterFile[];
  };
  useCases: UseCase[];
  edgeCases: EdgeCase[];
  testCases: TestCase[];
  apiEndpoints: APIEndpoint[];
  dataModels: DataModel[];
  dependencies: {
    features: string[];
    services: string[];
    libraries: string[];
  };
  accessibility: {
    screenReaderSupport: boolean;
    keyboardNavigation: boolean;
    colorContrast: string;
    fontScaling: boolean;
    wcagLevel: string;
  };
  performance: {
    knownBottlenecks: string[];
    optimizations: string[];
    memoryConsiderations: string[];
  };
}

// Setting Model - Configuration received from server
export interface SettingModel {
  isValidVersion?: ValidVersionModel;
  theme?: number;
  currency?: string;
  currencyId?: number;
  invite?: boolean;
  groupEnabled?: boolean;
  showSearch?: boolean;
  isTicketing?: boolean;
  isSystemHealthy?: boolean;
  tmpServer?: boolean;
  servicesState?: number;
  address_threshold?: number;
  subDomain?: string;
  priceMatchMessage?: string;
  joinUsUrl?: string;
  priceMatchPhone?: string;
  expired_time?: number;
  infoMessages?: string;
  requestTimeout?: number;
  responseTimeout?: number;
  message?: string;
  popupImageUrl?: string;
  splashBaseUrl?: string;
  splashVersion?: number;
  imagesVersion?: number;
  imageResizeAlpha?: number;
  homePageRefreshTime?: number;
  langVersion?: number;
  refreshToken?: boolean;
  showSpinnerInHome?: boolean;
  showSpinner?: boolean;
  pickUpService?: boolean;
  inviteEnabled?: boolean;
  heroEnabled?: boolean;
  showChangeCurrency?: boolean;
  showTopupButton?: boolean;
  proceedWithBusy?: boolean;
  isLiveChatEnabled?: boolean;
  isFlashSaleEnabled?: boolean;
  loadingSentence?: string[];
  deliveryFeeOptionEnabled?: boolean;
  showOldNetTotal?: boolean;
  showPriceMatchSection?: boolean;
  showGiftSection?: boolean;
  orderRunnerInterval?: number;
  enableChatButtonOnProfileWidget?: boolean;
  hideLoyaltyStore?: boolean;
  showOnboardingProgressBar?: boolean;
  showOnboardingSurvey?: boolean;
  baseImageUrl?: string;
  optionalDeliveryFeeText?: string;
  hideUserWallet?: boolean;
  hideZeroDeliveryFee?: boolean;
  onlyHomeFlashButton?: boolean;
  flashSaleRefreshRate?: number;
  priceMatchPrimaryEnable?: boolean;
  showReport?: boolean;
  appThemVersion?: number;
  appThemUrl?: string;
  hideToppingPrice?: boolean;
  serchWaitTimmer?: number;
  fcmToken?: string;
  numberLoadingSection?: number;
  numberLoadingSectionRoundly?: number;
  callLatestOrder?: boolean;
  showWalletStore?: boolean;
  showWalletOutlets?: boolean;
  termsUpdated?: boolean;
  walletExplanationHtml?: string;
  enableRecordingAnalytics?: boolean;
  orderCountSegment?: string;
  facebookAppId?: string;
  enableInstagramShare?: boolean;
  showLogs?: boolean;
}

// Valid Version Model - App update information
export interface ValidVersionModel {
  status?: boolean;
  update_type?: number; // 1 = soft update, 2 = forced update
  link?: string;
  softmessage?: string;
}

// Guest Model - Guest user visit tracking
export interface GuestModel {
  visitsCount?: number;
  allowedOutletsCountForGuest: number;
  allowedHomeListsCountForGuest: number;
  allowedRestaurantDishesCountForGuest: number;
  allowedMarketDishesCountForGuest: number;
}

// Splash State - Clean Architecture state
export interface SplashState {
  getSettings: AsyncState<SettingModel>;
  nextRoute?: string;
  showDebugMenu: boolean;
  shouldSyncLanguage: boolean;
}

// Async State helper type
export interface AsyncState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: T;
  errorMessage?: string;
}

// Navigation routes used by splash
export interface SplashNavigationRoutes {
  HOME: string;
  HOME_PERMISSION: string;
  OTP_VIEW: string;
  USER_INFO_VIEW: string;
  UPDATE_APP: string;
  SPLASH_VIEW: string;
  introQuestions: string;
}

// Splash flow decision result
export interface SplashFlowDecision {
  nextRoute: string;
  reason: string;
  requiresPermission: boolean;
}




