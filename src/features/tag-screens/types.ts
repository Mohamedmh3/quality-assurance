export interface TagDish {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  restaurantId: string;
  restaurantName?: string;
  restaurantStatus?: number;
}

export interface TagRestaurant {
  id: string;
  name: string;
  imageUrl?: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: number;
  isOpen?: boolean;
}

export interface TagScreenParams {
  tagUrl: string;
  tagName: string;
}

export type TagScreenType = 'dishes' | 'restaurants';


