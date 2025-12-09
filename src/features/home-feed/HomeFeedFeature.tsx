import { useState } from 'react';
import {
  Home,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  RefreshCw,
  ShoppingBag,
  Gift,
  Bell,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { homeFeedUseCases } from './data/use-cases';
import { homeFeedEdgeCases } from './data/edge-cases';
import { homeFeedTestCases } from './data/test-cases';
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
  name: 'home_feed/',
  type: 'folder' as const,
  children: [
    {
      name: 'home_feed_view_page/',
      type: 'folder' as const,
      children: [
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'banner_model.dart', type: 'file' as const, description: 'Banner/promotional content model' },
            { name: 'dish_model.dart', type: 'file' as const, description: 'Dish item model' },
            { name: 'home_list.dart', type: 'file' as const, description: 'Home feed section list model' },
            { name: 'offer_model.dart', type: 'file' as const, description: 'Promotional offer model' },
            { name: 'offerv2_model.dart', type: 'file' as const, description: 'New offer format model' },
            { name: 'new_user_offer.dart', type: 'file' as const, description: 'First-time customer offer model' },
            { name: 'onboarding_progress_model.dart', type: 'file' as const, description: 'User onboarding progress tracking' },
            { name: 'order_status_model.dart', type: 'file' as const, description: 'Order status and timeline model' },
            { name: 'section_model.dart', type: 'file' as const, description: 'Home section/cuisine category model' },
            { name: 'settings_model.dart', type: 'file' as const, description: 'App settings and configuration' },
          ]
        },
        {
          name: 'service/',
          type: 'folder' as const,
          children: [
            { name: 'IFeedService.dart', type: 'file' as const, description: 'Feed service interface' },
            { name: 'feed_service.dart', type: 'file' as const, description: 'API calls for home feed data' },
          ]
        },
        {
          name: 'view/',
          type: 'folder' as const,
          children: [
            { name: 'home_feed_view.dart', type: 'file' as const, description: 'Main home feed screen UI' },
            {
              name: 'home_widgets/',
              type: 'folder' as const,
              children: [
                { name: 'banner_widgets/', type: 'folder' as const, children: [
                  { name: 'home_feed_banner_widget.dart', type: 'file' as const, description: 'Banner carousel widget' },
                  { name: 'home_banner_card_widget.dart', type: 'file' as const, description: 'Individual banner card' },
                ]},
                { name: 'flash_sale/', type: 'folder' as const, children: [
                  { name: 'flash_sale_widget.dart', type: 'file' as const, description: 'Flash sale bottom sheet' },
                  { name: 'flash_sale_button.dart', type: 'file' as const, description: 'Floating action button' },
                  { name: 'viewmodel/flash_sale_viewmodel.dart', type: 'file' as const, description: 'Flash sale logic' },
                ]},
                { name: 'offers/', type: 'folder' as const, children: [
                  { name: 'offers_view.dart', type: 'file' as const, description: 'Offers list display' },
                  { name: 'offer_story_view.dart', type: 'file' as const, description: 'Offer story format' },
                ]},
                { name: 'offerv2/', type: 'folder' as const, children: [
                  { name: 'offerv2_list.dart', type: 'file' as const, description: 'New offer format list' },
                  { name: 'offerv2_card.dart', type: 'file' as const, description: 'Offer card widget' },
                ]},
                { name: 'order_status_widget/', type: 'folder' as const, children: [
                  { name: 'latest_order_widget.dart', type: 'file' as const, description: 'Latest order card container' },
                  { name: 'latest_order_card.dart', type: 'file' as const, description: 'Individual order card' },
                  { name: 'dynamic_order_timeline_widget.dart', type: 'file' as const, description: 'Real-time order timeline' },
                ]},
                { name: 'onboarding_progress_bar/', type: 'folder' as const, children: [
                  { name: 'onboarding_progress_bar.dart', type: 'file' as const, description: 'Progress bar widget' },
                  { name: 'onboarding_progress_bottom_sheet.dart', type: 'file' as const, description: 'Progress update bottom sheet' },
                ]},
                { name: 'my_vouchers_section.dart', type: 'file' as const, description: 'Vouchers display section' },
                { name: 'loyalty_card.dart', type: 'file' as const, description: 'Loyalty points card' },
                { name: 'achivement_carousel.dart', type: 'file' as const, description: 'Achievements/challenges carousel' },
                { name: 'new_user_offer.dart', type: 'file' as const, description: 'First-time customer offers' },
                { name: 'main_home_section_widget.dart', type: 'file' as const, description: 'Section router widget' },
              ]
            },
          ]
        },
        {
          name: 'viewmodel/',
          type: 'folder' as const,
          children: [
            { name: 'home_feed_viewmodel.dart', type: 'file' as const, description: 'Main home feed business logic' },
          ]
        },
      ]
    },
    {
      name: 'sub_pages/',
      type: 'folder' as const,
      children: [
        {
          name: 'favorites_screen/',
          type: 'folder' as const,
          children: [
            { name: 'favorites_screen.dart', type: 'file' as const, description: 'Favorites list screen' },
            { name: 'widgets/', type: 'folder' as const, children: [
              { name: 'restaurant_list_widget.dart', type: 'file' as const, description: 'Favorite restaurants' },
              { name: 'markets_list_widget.dart', type: 'file' as const, description: 'Favorite markets' },
              { name: 'item_list_widget.dart', type: 'file' as const, description: 'Favorite dishes' },
            ]},
          ]
        },
        {
          name: 'loyalty/',
          type: 'folder' as const,
          children: [
            { name: 'view/', type: 'folder' as const, children: [
              { name: 'loyalty_view.dart', type: 'file' as const, description: 'Main loyalty program screen' },
              { name: 'redeem_view.dart', type: 'file' as const, description: 'Rewards redemption screen' },
              { name: 'redeem_history_view.dart', type: 'file' as const, description: 'Redemption history' },
              { name: 'tiers_guide_view.dart', type: 'file' as const, description: 'Tier levels guide' },
            ]},
            { name: 'view_model/', type: 'folder' as const, children: [
              { name: 'loyalty_viewmodel.dart', type: 'file' as const, description: 'Loyalty program logic' },
              { name: 'redeem_viewmodel.dart', type: 'file' as const, description: 'Reward redemption logic' },
            ]},
            { name: 'service/', type: 'folder' as const, children: [
              { name: 'loyalty_service.dart', type: 'file' as const, description: 'Loyalty API calls' },
            ]},
          ]
        },
        {
          name: 'voucher_list/',
          type: 'folder' as const,
          children: [
            { name: 'view/', type: 'folder' as const, children: [
              { name: 'voucher_list_view.dart', type: 'file' as const, description: 'Full vouchers list screen' },
            ]},
            { name: 'viewmodel/', type: 'folder' as const, children: [
              { name: 'voucher_list_viewmodel.dart', type: 'file' as const, description: 'Voucher management logic' },
            ]},
            { name: 'service/', type: 'folder' as const, children: [
              { name: 'voucher_service.dart', type: 'file' as const, description: 'Voucher API calls' },
            ]},
          ]
        },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/home-list', description: 'Fetch home feed section configuration', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/banners', description: 'Fetch promotional banners', params: ['lat', 'lng', 'address_id', 'page_type', 'device_id'] },
  { method: 'GET', path: '/big-banner', description: 'Fetch large promotional banner', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/offers', description: 'Fetch promotional offers', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/offers-v2', description: 'Fetch new format offers', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/first-order-offers', description: 'Fetch new user offers', params: [] },
  { method: 'GET', path: '/sections', description: 'Fetch cuisine sections', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/trending-dishes', description: 'Fetch trending dishes', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/new-dishes', description: 'Fetch newly added dishes', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/latest-order', description: 'Fetch user\'s latest active orders', params: [] },
  { method: 'DELETE', path: '/user/orders/{orderId}', description: 'Delete an active order', params: ['orderId'] },
  { method: 'POST', path: '/user/orders/delete-order-reasons', description: 'Submit order deletion reason', params: ['bill_id', 'delete_reason_id', 'other_reason'] },
  { method: 'GET', path: '/onboarding-progress', description: 'Fetch user onboarding progress', params: ['lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/settings', description: 'Fetch app settings', params: ['lat', 'lng', 'address_id'] },
];

export function HomeFeedFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-white">Home Feed</h1>
              <p className="text-sm text-slate-400">Dynamic content feed with sections, orders, vouchers, and more</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <ArchitectureBadge type="MVVM" />
            <StatusBadge status="Stable" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[120px] z-30 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2',
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'use-cases' && <UseCaseSection useCases={homeFeedUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={homeFeedEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="home-feed" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={homeFeedTestCases} featureName="Home Feed" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Overview</CardTitle>
          <CardDescription>
            The Home Feed is the main screen customers see when opening the app. It displays a dynamic, scrollable feed of content sections including restaurants, dishes, banners, offers, vouchers, order status, loyalty information, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Dynamic section loading based on backend configuration</li>
              <li>Pull-to-refresh functionality with throttling</li>
              <li>Pagination for loading more sections as user scrolls</li>
              <li>Real-time order status updates via WebSocket</li>
              <li>Flash sale floating button and bottom sheet</li>
              <li>Vouchers and loyalty points display</li>
              <li>Delivery/Pickup mode switching</li>
              <li>Banners, offers, and promotional content</li>
              <li>Onboarding progress tracking</li>
              <li>Achievements/challenges carousel</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Architecture</h3>
            <p className="text-slate-300 mb-2">
              The Home Feed follows MVVM architecture with clear separation of concerns:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li><strong>View:</strong> <code className="text-primary">home_feed_view.dart</code> - Main UI screen with SmartRefresher</li>
              <li><strong>ViewModel:</strong> <code className="text-primary">home_feed_viewmodel.dart</code> - Business logic, state management, API coordination</li>
              <li><strong>Service:</strong> <code className="text-primary">feed_service.dart</code> - API calls for all feed data</li>
              <li><strong>Widgets:</strong> Individual widgets for each section type (banners, orders, vouchers, etc.)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Sub-Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Favorites</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">View and manage favorite restaurants, markets, and dishes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Loyalty Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">Points, tiers, rewards, achievements, and redemption</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Voucher List</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">Full list of available vouchers with categories and filters</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Flash Sale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400">Time-limited sales with floating button and bottom sheet</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Folder Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <FolderTree data={folderStructure} />
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>All API endpoints used by the Home Feed feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <span className={cn(
                      'px-2 py-1 rounded text-xs font-mono font-semibold',
                      endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                      endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                      'bg-purple-500/20 text-purple-400'
                    )}>
                      {endpoint.method}
                    </span>
                    <div className="flex-1">
                      <code className="text-primary font-mono text-sm">{endpoint.path}</code>
                      <p className="text-sm text-slate-400 mt-1">{endpoint.description}</p>
                      {endpoint.params.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-slate-500 mb-1">Parameters:</p>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.params.map((param, i) => (
                              <span key={i} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-300 font-mono">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Implementation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Pull-to-Refresh with Throttling
            </h3>
            <p className="text-sm text-slate-300">
              Refresh is throttled to prevent excessive API calls. After 5 retry attempts, throttle is overridden to allow refresh.
            </p>
            <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
              home_feed_viewmodel.dart:1132-1190
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Real-Time Order Updates
            </h3>
            <p className="text-sm text-slate-300">
              Uses WebSocket connection for real-time order status updates. Falls back to API polling if WebSocket fails.
            </p>
            <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
              home_feed_viewmodel.dart:1528-1600
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Dynamic Section Loading
            </h3>
            <p className="text-sm text-slate-300">
              Sections are loaded progressively as user scrolls. Each section type has its own data fetching logic.
            </p>
            <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
              home_feed_viewmodel.dart:644-768
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Push Notification Handling
            </h3>
            <p className="text-sm text-slate-300">
              Firebase push notifications trigger order updates, flash sale checks, and points earned dialogs.
            </p>
            <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
              home_feed_viewmodel.dart:339-431
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-white flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Flash Sale Periodic Updates
            </h3>
            <p className="text-sm text-slate-300">
              Flash sale is checked periodically (configurable rate). New sales automatically show bottom sheet.
            </p>
            <code className="block mt-2 p-2 bg-slate-800 rounded text-xs text-slate-400">
              flash_sale_viewmodel.dart:91-130
            </code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>State Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-white mb-1">Observable State (MobX)</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li><code className="text-primary">homeList</code> - Current list of sections to display</li>
                <li><code className="text-primary">latestOrderList</code> - Active orders for display</li>
                <li><code className="text-primary">userVoucherModel</code> - User vouchers</li>
                <li><code className="text-primary">loyaltyInfoModel</code> - Loyalty points and tier</li>
                <li><code className="text-primary">currentPickUpState</code> - Delivery or Pickup mode</li>
                <li><code className="text-primary">onboardingProgressModel</code> - Onboarding progress</li>
                <li><code className="text-primary">surveyCard</code> - Onboarding survey card</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Loading States</h4>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li><code className="text-primary">homeListLoading</code> - Initial feed loading</li>
                <li><code className="text-primary">onRefreshOn</code> - Refresh in progress</li>
                <li><code className="text-primary">onLoadingOn</code> - Pagination loading</li>
                <li><code className="text-primary">achievementsLoading</code> - Achievements loading</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

