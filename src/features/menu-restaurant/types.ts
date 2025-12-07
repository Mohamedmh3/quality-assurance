// Menu Restaurant feature specific types
import type { 
  UseCase, 
  EdgeCase, 
  TestCase, 
  APIEndpoint, 
  DataModel, 
  FlutterFile
} from '@/lib/types';

// Re-export for convenience
export type { 
  UseCase, 
  EdgeCase, 
  TestCase, 
  APIEndpoint, 
  DataModel, 
  FlutterFile
} from '@/lib/types';

export interface MenuRestaurantFeatureData {
  overview: {
    name: string;
    description: string;
    valueProposition: string;
    targetUsers: string[];
    architecturePattern: string;
    stateManagement: string;
  };
  folderStructure: {
    model: FlutterFile[];
    params: FlutterFile[];
    service: FlutterFile[];
    view: FlutterFile[];
    viewmodel: FlutterFile[];
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

export interface RestaurantModel {
  id: number;
  name: string;
  imageUrl?: string;
  rateValue?: number;
  rateCount?: number;
  eTA?: number;
  isMarket: boolean;
  currentStatus?: number;
  faveRestaurant: boolean;
  popupMessage?: string;
  popupImageUrl?: string;
  withCheckNearest: boolean;
  restaurantSchedules?: any[];
  dynamicFreeDelivery?: number;
  openTime?: string;
  closeTime?: string;
}

export interface SubMenuModel {
  id: number;
  name: string;
  image?: string;
  totalCount?: number;
  dishes?: DishModel[];
  subMenus?: SubMenuModel[];
}

export interface DishModel {
  id: number;
  name: string;
  description?: string;
  price: number;
  logoImage?: string;
  restaurantName?: string;
  restaurantId: number;
  indexInTheList?: number;
  needLoading?: boolean;
}

export interface DynamicListModel {
  dishes?: DishModel[];
}

export interface MenuServiceResponse {
  restaurantModel?: RestaurantModel;
  dynamicListModel?: DynamicListModel;
  subMenu?: SubMenuModel[];
}

export interface ChangeOrderTypeModel {
  newRestaurantModel?: RestaurantModel;
  newRestaurantMessage?: string;
}

