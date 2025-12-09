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
  ChevronRight,
  Smartphone,
  Folder,
  GitBranch,
  Rss,
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
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center">
            <Rss className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-orange-500">Home Feed</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Home Feed Feature
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
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-orange-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Home Feed</strong> is the main screen customers see when opening the app. 
            It displays a dynamic, scrollable feed of content sections that changes based on what the backend configures. 
            Think of it like a personalized social media feed, but for food ordering.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Customers see different sections like <strong className="text-[var(--color-text-primary)]">restaurants</strong>, 
            <strong className="text-[var(--color-text-primary)]"> dishes</strong>, <strong className="text-[var(--color-text-primary)]">banners</strong> 
            with promotions, <strong className="text-[var(--color-text-primary)]">offers</strong>, their 
            <strong className="text-[var(--color-text-primary)]"> vouchers</strong>, <strong className="text-[var(--color-text-primary)]">loyalty points</strong>, 
            and most importantly, their <strong className="text-[var(--color-text-primary)]">active orders</strong> with real-time status updates.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">pull-to-refresh</strong> to get fresh content, 
            <strong className="text-[var(--color-text-primary)]"> automatic loading</strong> of more sections as you scroll, 
            <strong className="text-[var(--color-text-primary)]"> flash sales</strong> that appear as floating buttons, 
            and <strong className="text-[var(--color-text-primary)]">real-time order tracking</strong> that updates without refreshing.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-orange-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All customers - it's the first screen they see when opening the app
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Dynamic content, real-time updates, personalized feed, order tracking
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                App launch, bottom navigation Home tab, after login
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: RefreshCw, title: 'Pull to Refresh', description: 'Refresh feed with throttling to prevent excessive calls', color: 'text-blue-500' },
              { icon: Layers, title: 'Dynamic Sections', description: 'Backend-configured sections load progressively', color: 'text-purple-500' },
              { icon: Bell, title: 'Real-Time Orders', description: 'WebSocket updates for order status changes', color: 'text-green-500' },
              { icon: Gift, title: 'Flash Sales', description: 'Time-limited sales with floating button', color: 'text-pink-500' },
              { icon: ShoppingBag, title: 'Vouchers & Loyalty', description: 'Display available vouchers and points', color: 'text-amber-500' },
              { icon: Home, title: 'Delivery/Pickup', description: 'Switch between delivery and pickup modes', color: 'text-teal-500' },
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
          <CardDescription className="text-base">MVVM architecture with dynamic section loading and sub-features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <FolderTree data={folderStructure} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-8">
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-blue-500" />
            </div>
            API Endpoints
          </CardTitle>
          <CardDescription className="text-base">All API endpoints used by the Home Feed feature</CardDescription>
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
                      <code className="text-[var(--color-primary)] font-mono text-sm">{endpoint.path}</code>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{endpoint.description}</p>
                      {endpoint.params.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-[var(--color-text-muted)] mb-1">Parameters:</p>
                          <div className="flex flex-wrap gap-1">
                            {endpoint.params.map((param, i) => (
                              <span key={i} className="px-2 py-0.5 bg-[var(--color-bg-primary)] rounded text-xs text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]">
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

      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            Key Implementation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="info-box">
            <div className="flex items-start gap-4">
              <RefreshCw className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Pull-to-Refresh with Throttling
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Refresh is throttled to prevent excessive API calls. After 5 retry attempts, throttle is overridden to allow refresh.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  home_feed_viewmodel.dart:1132-1190
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Real-Time Order Updates
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses WebSocket connection for real-time order status updates. Falls back to API polling if WebSocket fails.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  home_feed_viewmodel.dart:1528-1600
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <ShoppingBag className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Dynamic Section Loading
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Sections are loaded progressively as user scrolls. Each section type has its own data fetching logic.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  home_feed_viewmodel.dart:644-768
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Bell className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Push Notification Handling
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Firebase push notifications trigger order updates, flash sale checks, and points earned dialogs.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  home_feed_viewmodel.dart:339-431
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Gift className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Flash Sale Periodic Updates
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Flash sale is checked periodically (configurable rate). New sales automatically show bottom sheet.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  flash_sale_viewmodel.dart:91-130
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-teal-500" />
            </div>
            State Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Observable State (MobX)</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">homeList</code> - Current list of sections to display</li>
                <li><code className="text-[var(--color-primary)]">latestOrderList</code> - Active orders for display</li>
                <li><code className="text-[var(--color-primary)]">userVoucherModel</code> - User vouchers</li>
                <li><code className="text-[var(--color-primary)]">loyaltyInfoModel</code> - Loyalty points and tier</li>
                <li><code className="text-[var(--color-primary)]">currentPickUpState</code> - Delivery or Pickup mode</li>
                <li><code className="text-[var(--color-primary)]">onboardingProgressModel</code> - Onboarding progress</li>
                <li><code className="text-[var(--color-primary)]">surveyCard</code> - Onboarding survey card</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Loading States</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">homeListLoading</code> - Initial feed loading</li>
                <li><code className="text-[var(--color-primary)]">onRefreshOn</code> - Refresh in progress</li>
                <li><code className="text-[var(--color-primary)]">onLoadingOn</code> - Pagination loading</li>
                <li><code className="text-[var(--color-primary)]">achievementsLoading</code> - Achievements loading</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

