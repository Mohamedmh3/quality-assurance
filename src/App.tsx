import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { DishFeature } from './features/dish/DishFeature';
import { SplashFeature } from './features/splash/SplashFeature';
import { MenuRestaurantFeature } from './features/menu-restaurant/MenuRestaurantFeature';
import { CheckoutFeature } from './features/checkout/CheckoutFeature';
import { CartFeature } from './features/cart/CartFeature';

function App() {
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
