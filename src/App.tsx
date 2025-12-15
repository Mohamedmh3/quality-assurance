import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { DishFeature } from './features/dish/DishFeature';
import { SplashFeature } from './features/splash/SplashFeature';
import { MenuRestaurantFeature } from './features/menu-restaurant/MenuRestaurantFeature';
import { CheckoutFeature } from './features/checkout/CheckoutFeature';
import { CartFeature } from './features/cart/CartFeature';
import { HomeFeature } from './features/home/HomeFeature';
import { HomeFeedFeature } from './features/home-feed/HomeFeedFeature';
import { OrderRatingFeature } from './features/order-rating/OrderRatingFeature';
import { OrderTrackingFeature } from './features/order-tracking/OrderTrackingFeature';
import { RestaurantListFeature } from './features/restaurant-list/RestaurantListFeature';
import { AddressFeature } from './features/address/AddressFeature';
import { SearchPageFeature } from './features/search-page/SearchPageFeature';
import { FriendInviteFeature } from './features/friend-invite/FriendInviteFeature';
import { OTPFeature } from './features/otp/OTPFeature';
import PhoneNumberFeature from './features/phone-number/PhoneNumberFeature';
import UserInfoFeature from './features/user-info/UserInfoFeature';
import SurveyFeature from './features/survey/SurveyFeature';
import KnowUsFeature from './features/know-us/KnowUsFeature';
import ReportingFeature from './features/reporting/ReportingFeature';
import EditProfileFeature from './features/edit-profile/EditProfileFeature';
import { ProfileFeature } from './features/profile/ProfileFeature';
import { LiveChatFeature } from './features/live-chat/LiveChatFeature';
import { TagScreensFeature } from './features/tag-screens/TagScreensFeature';
import { WalletInfoFeature } from './features/wallet-info/WalletInfoFeature';
import { WalletFeature } from './features/wallet/WalletFeature';
import { useQAStore } from './store/qa-store';

function App() {
  const initialize = useQAStore((state) => state.initialize);

  useEffect(() => {
    // Initialize QA store on app load
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="feature/dish" element={<DishFeature />} />
          <Route path="feature/splash" element={<SplashFeature />} />
          <Route path="feature/menu-restaurant" element={<MenuRestaurantFeature />} />
          <Route path="feature/checkout" element={<CheckoutFeature />} />
          <Route path="feature/cart" element={<CartFeature />} />
          <Route path="feature/home" element={<HomeFeature />} />
          <Route path="feature/home-feed" element={<HomeFeedFeature />} />
          <Route path="feature/order-rating" element={<OrderRatingFeature />} />
          <Route path="feature/order-tracking" element={<OrderTrackingFeature />} />
          <Route path="feature/restaurant-list" element={<RestaurantListFeature />} />
          <Route path="feature/address" element={<AddressFeature />} />
          <Route path="feature/search-page" element={<SearchPageFeature />} />
          <Route path="feature/friend-invite" element={<FriendInviteFeature />} />
          <Route path="feature/otp" element={<OTPFeature />} />
          <Route path="feature/phone-number" element={<PhoneNumberFeature />} />
          <Route path="feature/user-info" element={<UserInfoFeature />} />
          <Route path="feature/survey" element={<SurveyFeature />} />
          <Route path="feature/know-us" element={<KnowUsFeature />} />
          <Route path="feature/reporting" element={<ReportingFeature />} />
          <Route path="feature/edit-profile" element={<EditProfileFeature />} />
          <Route path="feature/profile" element={<ProfileFeature />} />
          <Route path="feature/live-chat" element={<LiveChatFeature />} />
          <Route path="feature/tag-screens" element={<TagScreensFeature />} />
          <Route path="feature/wallet-info" element={<WalletInfoFeature />} />
          <Route path="feature/wallet" element={<WalletFeature />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
