import { useState } from 'react';
import {
  ShoppingCart,
  Package,
  Store,
  Clock,
  AlertTriangle,
  Users,
  Trash2,
  Plus,
  Gift,
  Folder,
  Code2,
  Settings,
  Database,
  Globe,
  Layers,
  Shield,
  Zap,
  ChevronRight,
  Smartphone,
  GitBranch,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { cartUseCases } from './data/use-cases';
import { cartEdgeCases } from './data/edge-cases';
import { cartTestCases } from './data/test-cases';
import { cn } from '@/lib/utils';

type TabId = 'overview' | 'use-cases' | 'edge-cases' | 'qa-tests' | 'implementation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'use-cases', label: 'Use Cases', icon: Users },
  { id: 'edge-cases', label: 'Edge Cases', icon: Shield },
  { id: 'qa-tests', label: 'QA Tests', icon: Settings },
  { id: 'implementation', label: 'Implementation', icon: Code2 },
];

const folderStructure = {
  name: 'cart/',
  type: 'folder' as const,
  children: [
    {
      name: 'cart_page/',
      type: 'folder' as const,
      children: [
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'dynamic_rewards_model.dart', type: 'file' as const, description: 'Dynamic rewards tier model' },
            { name: 'notes_response_model.dart', type: 'file' as const, description: 'Cart notes/instructions model' },
            { name: 'service_model.dart', type: 'file' as const, description: 'Additional services model' },
          ]
        },
        {
          name: 'service/',
          type: 'folder' as const,
          children: [
            { name: 'IServiceService.dart', type: 'file' as const, description: 'Service interface' },
            { name: 'service_service.dart', type: 'file' as const, description: 'API calls for services' },
          ]
        },
        {
          name: 'view/',
          type: 'folder' as const,
          children: [
            { name: 'cart_view.dart', type: 'file' as const, description: 'Main cart screen UI' },
            {
              name: 'widgets/',
              type: 'folder' as const,
              children: [
                { name: 'cart_instruction/', type: 'folder' as const, children: [
                  { name: 'cart_instruction_card_widget.dart', type: 'file' as const, description: 'Note selection card' },
                  { name: 'add_cart_instructions_bottom_sheet.dart', type: 'file' as const, description: 'Instructions bottom sheet' },
                ]},
                { name: 'cart_item_details.dart', type: 'file' as const, description: 'Cart item display' },
                { name: 'total_price_widget.dart', type: 'file' as const, description: 'Price display widget' },
              ]
            },
          ]
        },
        {
          name: 'viewmodel/',
          type: 'folder' as const,
          children: [
            { name: 'cart_viewmodel.dart', type: 'file' as const, description: 'Cart page business logic' },
          ]
        },
      ]
    },
    {
      name: 'sub_pages/',
      type: 'folder' as const,
      children: [
        {
          name: 'my_carts/',
          type: 'folder' as const,
          children: [
            { name: 'controllers/', type: 'folder' as const, children: [
              { name: 'my_cart_viewmodel.dart', type: 'file' as const, description: 'Main cart management logic' },
            ]},
            { name: 'models/', type: 'folder' as const, children: [
              { name: 'basket.dart', type: 'file' as const, description: 'Basket/cart container model' },
              { name: 'cart.dart', type: 'file' as const, description: 'Individual cart item model' },
            ]},
            { name: 'view/', type: 'folder' as const, children: [
              { name: 'my_carts.dart', type: 'file' as const, description: 'Multiple carts list screen' },
            ]},
          ]
        },
        {
          name: 'widget/',
          type: 'folder' as const,
          children: [
            { name: 'option_warning_changes.dart', type: 'file' as const, description: 'Options changed warning' },
          ]
        },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/services', description: 'Fetch available add-on services for delivery', params: ['lat', 'lng', 'page_num', 'page_size'] },
  { method: 'GET', path: '/check-dishes', description: 'Check dish availability status', params: ['dishes_ids[]'] },
  { method: 'GET', path: '/order-notes', description: 'Fetch cart instruction options for markets', params: ['market', 'model_type'] },
  { method: 'GET', path: '/dynamic-rewards', description: 'Get reward tiers for restaurant', params: ['brand_id', 'restaurant_id'] },
  { method: 'GET', path: '/trending-dishes', description: 'Get recommended dishes for restaurant', params: ['restaurant_id'] },
  { method: 'GET', path: '/restaurants/{id}', description: 'Fetch restaurant details and status', params: ['id'] },
  { method: 'GET', path: '/dishes', description: 'Fetch dish details by IDs', params: ['dishes_ids[]'] },
  { method: 'GET', path: '/restaurants/status', description: 'Check restaurant online/offline status', params: ['restaurant_ids[]'] },
];

export function CartFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-teal-500">Cart</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Cart Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={cartUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={cartEdgeCases} />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={cartTestCases} featureName="Cart" />}
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
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-teal-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Cart</strong> feature manages everything 
            about a customer's shopping cart - from the moment they add their first item to when they're ready 
            to checkout. It's the bridge between browsing food and actually placing an order.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Customers can have up to <strong className="text-[var(--color-text-primary)]">5 different carts</strong> from 
            different restaurants saved at once, and these carts stay saved for 2 days even if they close the app. 
            They can customize items with toppings and options, adjust quantities, and see their total update in real-time.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">free delivery tracking</strong> (a 
            progress bar showing how much more to order for free delivery), <strong className="text-[var(--color-text-primary)]">dynamic 
            rewards</strong> (earn rewards based on order value), and <strong className="text-[var(--color-text-primary)]">reordering</strong> previous 
            orders with one tap.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-teal-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Customers adding items to their order before checkout
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Multiple carts, customization, free delivery tracking, rewards
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Dish page "Add to Cart", My Carts list, Reorder button
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-teal-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Plus, title: 'Add Items', description: 'Add dishes with toppings, options, and special notes', color: 'text-teal-500' },
              { icon: Store, title: 'Multiple Carts', description: 'Save up to 5 carts from different restaurants', color: 'text-blue-500' },
              { icon: Clock, title: 'Cart Persistence', description: 'Carts saved locally for 2 days', color: 'text-purple-500' },
              { icon: Gift, title: 'Dynamic Rewards', description: 'Earn rewards based on order value tiers', color: 'text-pink-500' },
              { icon: Package, title: 'Free Delivery', description: 'Progress bar showing free delivery threshold', color: 'text-amber-500' },
              { icon: Trash2, title: 'Cart Management', description: 'Edit, remove items with confirmation', color: 'text-red-500' },
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
          <CardDescription className="text-base">MVVM architecture with cart management and multiple cart support</CardDescription>
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
                items: ['restaurant/menu_restaurant', 'restaurant/dish', 'checkout', 'orders/order_details', 'profile/my_address', 'helpers/tutorials'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'UserManager', 'SettingManager', 'LocaleManager', 'AnalyticsManager', 'DeepLinkManager'],
              },
              {
                title: 'Libraries',
                items: ['flutter_mobx', 'get (GetX)', 'confetti', 'fluttertoast', 'screen_loader', 'card_banner'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-teal-500" />
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
                  <code className="text-xl text-teal-400 font-mono">{endpoint.path}</code>
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
                name: 'BasketModel',
                file: 'cart/sub_pages/my_carts/models/basket.dart',
                fields: ['carts[]', 'services[]', 'restaurantId', 'restaurantName', 'restaurantLogo', 'restaurantStatus', 'isPickUp', 'date', 'voucherCode'],
              },
              {
                name: 'CartModel',
                file: 'cart/sub_pages/my_carts/models/cart.dart',
                fields: ['dish', 'quantity', 'toppings[]', 'options{}', 'note', 'outOfStock', 'serviceId', 'name'],
              },
              {
                name: 'DynamicRewardsModel',
                file: 'cart/cart_page/model/dynamic_rewards_model.dart',
                fields: ['id', 'isMarket', 'scheduleEnabled', 'startDate', 'endDate', 'rewardTiers[]'],
              },
              {
                name: 'DynamicRewardTierModel',
                file: 'cart/cart_page/model/dynamic_rewards_model.dart',
                fields: ['id', 'orderValue', 'reward', 'onNextValue'],
              },
              {
                name: 'NotesResponseModel',
                file: 'cart/cart_page/model/notes_response_model.dart',
                fields: ['notes[]', 'defaultNoteId'],
              },
              {
                name: 'ServiceModel',
                file: 'cart/cart_page/model/service_model.dart',
                fields: ['id', 'name', 'imageUrl', 'coverImageUrl', 'bankId'],
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
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-teal-500" />
              </div>
              <span className="font-semibold text-xl">ViewModel Methods</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'addToCart()', desc: 'Add item with toppings and options' },
              { name: 'removeFromCart()', desc: 'Remove item from cart' },
              { name: 'incrementCartQuantity()', desc: 'Increase item quantity' },
              { name: 'decrementCartQuantity()', desc: 'Decrease item quantity' },
              { name: 'updateCart()', desc: 'Update item options/toppings' },
              { name: 'initRestaurant()', desc: 'Initialize cart for restaurant' },
              { name: 'initReorder()', desc: 'Create cart from previous order' },
              { name: 'saveCart()', desc: 'Persist cart to local storage' },
              { name: 'getBaskets()', desc: 'Load all carts from storage' },
              { name: 'removeBasket()', desc: 'Delete entire restaurant cart' },
              { name: 'fetchDynamicRewards()', desc: 'Load reward tiers' },
              { name: 'isPriceToGetFreeDelivery()', desc: 'Check free delivery threshold' },
              { name: 'checkToppingOptionsAvailability()', desc: 'Validate required selections' },
              { name: 'updateRestaurantOnCurrentBasket()', desc: 'Refresh restaurant status' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-teal-400 font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Cart Flow */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Layers className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-semibold text-xl">Cart Flow</span>
            </div>
          }
        >
          <div className="space-y-4">
            {[
              { step: 1, title: 'Add Item', desc: 'User taps Add to Cart from dish page with selected options' },
              { step: 2, title: 'Create/Update Basket', desc: 'System creates new basket or adds to existing for restaurant' },
              { step: 3, title: 'Save to Storage', desc: 'Cart is persisted to local storage' },
              { step: 4, title: 'View Cart', desc: 'User opens cart to see items, adjust quantities' },
              { step: 5, title: 'Load Restaurant Data', desc: 'Fetch restaurant status, trending dishes, services' },
              { step: 6, title: 'Load Dynamic Rewards', desc: 'Fetch reward tiers based on cart total' },
              { step: 7, title: 'Check Free Delivery', desc: 'Calculate progress toward free delivery threshold' },
              { step: 8, title: 'Validate Cart', desc: 'Check login, address, out of stock items' },
              { step: 9, title: 'Proceed to Checkout', desc: 'Navigate to checkout with cart data' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <span className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">{item.title}</h4>
                  <p className="text-base text-[var(--color-text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Validations & Edge Cases */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <span className="font-semibold text-xl">Key Validations</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="info-box flex-col success">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Before Checkout</h4>
              <ul className="space-y-4">
                {[
                  { icon: '✅', text: 'User must be logged in' },
                  { icon: '✅', text: 'Delivery address required (non-pickup)' },
                  { icon: '✅', text: 'Cart must not be empty' },
                  { icon: '✅', text: 'No out of stock items' },
                  { icon: '✅', text: 'Restaurant must be online' },
                  { icon: '✅', text: 'Market orders need substitution note' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                    <span className="text-lg">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-box flex-col warning">
              <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">Limits & Constraints</h4>
              <ul className="space-y-4">
                {[
                  { icon: '⚠️', text: 'Maximum 5 carts at once' },
                  { icon: '⚠️', text: 'Carts expire after 2 days' },
                  { icon: '⚠️', text: 'Vending: 1 item per order only' },
                  { icon: '⚠️', text: 'Item quantity limits enforced' },
                  { icon: '⚠️', text: 'Topping min/max selection limits' },
                  { icon: '⚠️', text: 'Required options must be selected' },
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
