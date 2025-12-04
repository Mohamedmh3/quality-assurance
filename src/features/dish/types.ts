// Dish feature specific types
import type { UseCase, EdgeCase, TestCase, APIEndpoint, DataModel, FlutterFile } from '@/lib/types';

// Re-export for convenience
export type { UseCase, EdgeCase, TestCase, APIEndpoint, DataModel, FlutterFile } from '@/lib/types';

export interface DishFeatureData {
  overview: {
    name: string;
    description: string;
    valueProposition: string;
    targetUsers: string[];
    architecturePattern: string;
    stateManagement: string;
  };
  folderStructure: {
    params: FlutterFile[];
    services: FlutterFile[];
    view: FlutterFile[];
    viewmodel: FlutterFile[];
    widget: FlutterFile[];
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

export interface DishModel {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imagePath: string;
  restaurantId: number;
  restaurantName: string;
  logoImage: string;
  coverImage: string;
  quantity?: number;
  favoriteDish: boolean;
  toppings: ToppingModel[];
  options: OptionModel[];
  points?: number;
  taxItem?: number;
  badges?: BadgeModel[];
}

export interface ToppingModel {
  id: number;
  name: string;
  price: number;
  image?: string;
  points?: number;
  groupId?: number;
  groupName?: string;
  selectLimit?: number;
  selectMin?: number;
  active: boolean;
}

export interface OptionModel {
  name: string;
  opts: OptModel[];
}

export interface OptModel {
  id: number;
  name: string;
  category?: string;
  price: number;
  isDefault?: number;
  points?: number;
}

export interface BadgeModel {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}

