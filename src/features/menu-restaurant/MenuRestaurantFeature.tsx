import { useState } from 'react';
import { 
  Store, 
  Folder, 
  GitBranch, 
  Code2, 
  Settings,
  Database,
  Globe,
  Layers,
  Users,
  Shield,
  Zap,
  Search,
  ShoppingCart,
  Heart,
  Gift,
  ArrowLeftRight,
  ChevronRight,
  Smartphone,
  Workflow
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { menuRestaurantUseCases } from './data/use-cases';
import { menuRestaurantEdgeCases } from './data/edge-cases';
import { menuRestaurantTestCases } from './data/test-cases';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'use-cases' | 'edge-cases' | 'flow-diagrams' | 'qa-tests' | 'implementation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'use-cases', label: 'Use Cases', icon: Users },
  { id: 'edge-cases', label: 'Edge Cases', icon: Shield },
  { id: 'flow-diagrams', label: 'Flow Diagrams', icon: Workflow },
  { id: 'qa-tests', label: 'QA Tests', icon: Settings },
  { id: 'implementation', label: 'Implementation', icon: Code2 },
];

const folderStructure = {
  name: 'menu_restaurant/',
  type: 'folder' as const,
  children: [
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'change_order_type_model.dart', type: 'file' as const, description: 'Order type switching' },
        { name: 'dynamic_list_model.dart', type: 'file' as const, description: 'Custom dishes list' },
        { name: 'new_restaurant_model.dart', type: 'file' as const, description: 'Restaurant data model' },
        { name: 'opt_model.dart', type: 'file' as const, description: 'Option item model' },
        { name: 'option_model.dart', type: 'file' as const, description: 'Dish options model' },
        { name: 'sub_menu_model.dart', type: 'file' as const, description: 'Menu category model' },
        { name: 'topping_model.dart', type: 'file' as const, description: 'Topping item model' },
      ],
    },
    {
      name: 'params/',
      type: 'folder' as const,
      children: [
        { name: 'menu_service_response.dart', type: 'file' as const, description: 'API response wrapper' },
      ],
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'IMenuRestaurantService.dart', type: 'file' as const, description: 'Service interface' },
        { name: 'menu_restaurant_service.dart', type: 'file' as const, description: 'API implementation' },
      ],
    },
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'outlet_header_widget.dart', type: 'file' as const, description: 'Restaurant header' },
        { name: 'restaurant_menu_view.dart', type: 'file' as const, description: 'Main entry point' },
        { name: 'restaurant_product_search_screen.dart', type: 'file' as const, description: 'Search screen' },
        {
          name: 'dynamic_rewards/',
          type: 'folder' as const,
          children: [
            { name: 'dynamic_rewards_confetti.dart', type: 'file' as const, description: 'Confetti animation' },
            { name: 'dynamic_rewards_progress_line.dart', type: 'file' as const, description: 'Progress bar' },
            { name: 'dynamic_rewards_widget.dart', type: 'file' as const, description: 'Rewards display' },
          ],
        },
        {
          name: 'market_view/',
          type: 'folder' as const,
          children: [
            { name: 'market_view.dart', type: 'file' as const, description: 'Market layout screen' },
            { name: 'restaurant_popop.dart', type: 'file' as const, description: 'Back navigation popup' },
            {
              name: 'market_screens/',
              type: 'folder' as const,
              children: [
                { name: 'AislesView.dart', type: 'file' as const, description: 'Aisles tab view' },
                { name: 'main_menus_list.dart', type: 'file' as const, description: 'Main shop view' },
                { name: 'market_search.dart', type: 'file' as const, description: 'Market search' },
                { name: 'sub_menus_view.dart', type: 'file' as const, description: 'Sub-category view' },
              ],
            },
          ],
        },
        {
          name: 'menu_view_widgets/',
          type: 'folder' as const,
          children: [
            { name: 'rest_will_popup.dart', type: 'file' as const, description: 'Back nav handler' },
            { name: 'shimming_widget.dart', type: 'file' as const, description: 'Loading skeleton' },
            { name: 'view_cart_button.dart', type: 'file' as const, description: 'Cart button' },
            {
              name: 'group_order_widgets/',
              type: 'folder' as const,
              children: [
                { name: 'group_order_card.dart', type: 'file' as const, description: 'Group order card' },
                { name: 'group_order_widgets.dart', type: 'file' as const, description: 'Group order UI' },
                { name: 'init_group_order.dart', type: 'file' as const, description: 'Group init' },
                { name: 'invite_to_group_bottom_sheet.dart', type: 'file' as const, description: 'Invite sheet' },
                { name: 'price_match_card_widget.dart', type: 'file' as const, description: 'Price match' },
              ],
            },
            {
              name: 'rest_top_section_widgets/',
              type: 'folder' as const,
              children: [
                { name: 'rest_info_card.dart', type: 'file' as const, description: 'Restaurant info card' },
              ],
            },
          ],
        },
        {
          name: 'restaurant_view/',
          type: 'folder' as const,
          children: [
            { name: 'list_title.dart', type: 'file' as const, description: 'List title widget' },
            { name: 'restaurant_page.dart', type: 'file' as const, description: 'Restaurant page' },
            {
              name: 'controller/',
              type: 'folder' as const,
              children: [
                { name: 'restaurant_header_controller.dart', type: 'file' as const, description: 'Header state' },
              ],
            },
            {
              name: 'widgets/',
              type: 'folder' as const,
              children: [
                { name: 'back_ground_restaurant_image_widget.dart', type: 'file' as const, description: 'Background image' },
                { name: 'cuisines_and_hours_switcher.dart', type: 'file' as const, description: 'Info switcher' },
                { name: 'info_tile.dart', type: 'file' as const, description: 'Info tile' },
                { name: 'rate_details.dart', type: 'file' as const, description: 'Rating display' },
                { name: 'restaurant_delivery_fee_tile.dart', type: 'file' as const, description: 'Delivery fee' },
                { name: 'restaurant_info_card_widget.dart', type: 'file' as const, description: 'Info card' },
                { name: 'restaurant_main_section.dart', type: 'file' as const, description: 'Main section' },
                { name: 'restaurant_trending_dish_list.dart', type: 'file' as const, description: 'Trending dishes' },
                { name: 'restuarant_dishes_list.dart', type: 'file' as const, description: 'Dishes list' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'restaurant_single_modelview.dart', type: 'file' as const, description: 'Main business logic' },
        { name: 'restaurant_single_modelview.g.dart', type: 'file' as const, description: 'Generated MobX' },
        { name: 'restaurant_single_search_viewmodel.dart', type: 'file' as const, description: 'Search logic' },
        { name: 'restaurant_single_search_viewmodel.g.dart', type: 'file' as const, description: 'Generated MobX' },
      ],
    },
  ],
};

const apiEndpoints = [
  { method: 'GET', path: '/restaurant/menu', description: 'Load restaurant menu with categories and dishes', params: ['restaurant_id', 'lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/market/submenus', description: 'Load market sub-category list', params: ['restaurant_id', 'submenu_id'] },
  { method: 'GET', path: '/market/submenu', description: 'Load single sub-menu with dishes', params: ['restaurant_id', 'sub_sub_menu_id'] },
  { method: 'GET', path: '/trending-dish', description: 'Load trending dishes for restaurant', params: ['restaurant_id', 'lat', 'lng'] },
  { method: 'GET', path: '/restaurant/{id}', description: 'Load single restaurant data', params: ['restaurant_id'] },
  { method: 'GET', path: '/restaurant/details', description: 'Load restaurant details (hours, etc.)', params: ['restaurant_id'] },
  { method: 'GET', path: '/restaurant/reviews', description: 'Load restaurant reviews', params: ['restaurant_id', 'page'] },
  { method: 'POST', path: '/favorite-restaurant', description: 'Add/remove restaurant favorite', params: ['restaurant_id', 'status'] },
  { method: 'GET', path: '/change-receiving-order-type', description: 'Toggle pickup/delivery', params: ['restuarant_id', 'address_id'] },
];

export function MenuRestaurantFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--color-primary)]">Menu Restaurant</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Menu Restaurant Feature
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="Stable" />
          <ArchitectureBadge type="MVVM" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-10 glass rounded-xl border border-[var(--color-border)] p-4 shadow-lg">
        <nav className="flex gap-4 lg:gap-6 overflow-x-auto" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn('tab-item', activeTab === tab.id && 'active')}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6 shadow-lg">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'use-cases' && <UseCaseSection useCases={menuRestaurantUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={menuRestaurantEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="menu-restaurant" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={menuRestaurantTestCases} featureName="menu-restaurant" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When a customer wants to order food, they first need to find a restaurant and look at its menu. 
            The <strong className="text-[var(--color-text-primary)]">Menu Restaurant</strong> feature is 
            where this happens - it shows the restaurant's photo, name, rating, and all the food they offer.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The menu is organized into categories (like "Appetizers", "Main Dishes", "Desserts") that customers 
            can tap to jump to. They can also search for specific dishes, save restaurants as favorites, and 
            switch between getting their food delivered or picking it up themselves.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            For grocery stores and markets, there's a special layout with horizontal scrolling product rows 
            and a "Shop" vs "Aisles" view that makes browsing feel more like shopping in a real store.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-emerald-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                End customers browsing restaurants and ordering food
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Easy menu browsing with search, categories, and rewards
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Restaurant List, Home Feed, Deep Links, Search Results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Store, title: 'Restaurant & Market Support', description: 'Two layouts: traditional menu for restaurants, shop/aisles for markets', color: 'text-[var(--color-primary)]' },
              { icon: Search, title: 'Menu Search', description: 'Find specific dishes instantly with real-time search', color: 'text-blue-500' },
              { icon: ArrowLeftRight, title: 'Pickup/Delivery Toggle', description: 'Switch order type with automatic nearest location', color: 'text-purple-500' },
              { icon: Heart, title: 'Favorites', description: 'Save restaurants for quick access (requires login)', color: 'text-red-500' },
              { icon: Gift, title: 'Dynamic Rewards', description: 'See loyalty progress with animated celebrations', color: 'text-amber-500' },
              { icon: ShoppingCart, title: 'Cart Protection', description: 'Confirmation dialogs prevent losing cart items', color: 'text-emerald-500' },
            ].map((feature, idx) => (
              <div key={idx} className="info-box flex-col">
                <feature.icon className={`w-8 h-8 ${feature.color} mb-4`} />
                <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">{feature.title}</h4>
                <p className="text-base text-[var(--color-text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Folder Structure */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-amber-500" />
            </div>
            Folder Structure
          </CardTitle>
          <CardDescription className="text-base">MVVM architecture with 35+ source files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <FolderTree data={folderStructure} />
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-purple-500" />
            </div>
            Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Features',
                items: ['cart (MyCartViewModel)', 'dish (DishPageParams)', 'profile/my_address', 'profile/my_order', 'search_page', 'helpers/pickup_widget', 'helpers/tutorials'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'UserManager', 'AnalyticsManager', 'DeepLinkManager', 'TutorialManager'],
              },
              {
                title: 'Libraries',
                items: ['flutter_mobx', 'get (GetX)', 'scroll_to_index', 'vertical_scrollable_tabview', 'tutorial_coach_mark', 'visibility_detector'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-[var(--color-primary)]" />
                      {dep}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Accordion>
        {/* API Endpoints */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <span className="font-semibold text-xl">API Endpoints</span>
            </div>
          }
          defaultOpen
        >
          <div className="space-y-6">
            {apiEndpoints.map((endpoint, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center gap-4 mb-4">
                  <span className={cn(
                    'badge-base',
                    endpoint.method === 'GET' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  )}>
                    {endpoint.method}
                  </span>
                  <code className="text-xl text-[var(--color-primary)] font-mono">{endpoint.path}</code>
                </div>
                <p className="text-base text-[var(--color-text-secondary)] mb-5">{endpoint.description}</p>
                <div className="flex flex-wrap gap-3">
                  {endpoint.params.map(param => (
                    <code key={param} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                      {param}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Data Models */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-500" />
              </div>
              <span className="font-semibold text-xl">Data Models</span>
            </div>
          }
        >
          <div className="space-y-6">
            {[
              {
                name: 'SubMenuModel',
                file: 'menu_restaurant/model/sub_menu_model.dart',
                fields: ['id', 'name', 'image', 'totalCount', 'dishes: DishModel[]', 'subMenus: SubMenuModel[]'],
              },
              {
                name: 'MenuServiceResponse',
                file: 'menu_restaurant/params/menu_service_response.dart',
                fields: ['restaurantModel', 'dynamicListModel', 'subMenu: SubMenuModel[]'],
              },
              {
                name: 'ChangeOrderTypeModel',
                file: 'menu_restaurant/model/change_order_type_model.dart',
                fields: ['newRestaurantModel', 'newRestaurantMessage'],
              },
              {
                name: 'DynamicListModel',
                file: 'menu_restaurant/model/dynamic_list_model.dart',
                fields: ['dishes: DishModel[]'],
              },
            ].map((model, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                  <span className="font-semibold text-xl text-[var(--color-text-primary)]">{model.name}</span>
                  <code className="text-sm text-[var(--color-text-muted)] font-mono bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg border border-[var(--color-border)]">
                    {model.file}
                  </code>
                </div>
                <div className="flex flex-wrap gap-3">
                  {model.fields.map(field => (
                    <code key={field} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]">
                      {field}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* ViewModel Methods */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="font-semibold text-xl">ViewModel Methods</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'getRestaurantMenu()', desc: 'Load menu with categories and dishes' },
              { name: 'getSubMenus()', desc: 'Load sub-categories for market view' },
              { name: 'getSubMenu()', desc: 'Load single sub-menu' },
              { name: 'togglePickUpService()', desc: 'Switch between pickup and delivery' },
              { name: 'changeFaveState()', desc: 'Toggle favorite status' },
              { name: 'checkNearestRestaurant()', desc: 'Find closest restaurant location' },
              { name: 'searchMarketItems()', desc: 'Search dishes within restaurant' },
              { name: 'updateShowBottomBar()', desc: 'Control cart button visibility' },
              { name: 'buildTutorial()', desc: 'Show tutorial overlay' },
              { name: 'changeSelectedIndex()', desc: 'Switch market tabs (Shop/Aisles)' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-[var(--color-primary)] font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Accessibility & Performance */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-500" />
              </div>
              <span className="font-semibold text-xl">Accessibility & Performance</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="info-box flex-col success">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Accessibility Features</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'RTL Support (Arabic layout)' },
                  { icon: '✅', text: 'Color Contrast WCAG AA' },
                  { icon: '✅', text: 'Respects system font size' },
                  { icon: '✅', text: '44px touch targets' },
                  { icon: '⚠️', text: 'Basic screen reader support' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-box flex-col warning">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Performance Notes</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'MobX limits widget rebuilds' },
                  { icon: '✅', text: 'Image caching enabled' },
                  { icon: '✅', text: 'Vertical scrollable tabview' },
                  { icon: '⚠️', text: 'Large menus may need pagination' },
                  { icon: '⚠️', text: 'Many images may pressure memory' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
