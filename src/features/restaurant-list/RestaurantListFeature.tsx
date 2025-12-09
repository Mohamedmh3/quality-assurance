import { useState } from 'react';
import {
  Store,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  ChevronRight,
  Smartphone,
  Folder,
  GitBranch,
  Filter,
  Search,
  MapPin,
  Clock,
  Zap,
  ShoppingBag,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { restaurantListUseCases } from './data/use-cases';
import { restaurantListEdgeCases } from './data/edge-cases';
import { restaurantListTestCases } from './data/test-cases';
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
  name: 'restaurant/restaurant_list/',
  type: 'folder' as const,
  children: [
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'restaurant_view.dart', type: 'file' as const, description: 'Main restaurant list screen UI' },
        { name: 'scheduled_picker_page.dart', type: 'file' as const, description: 'Scheduled order time picker screen' },
      ]
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'restaurant_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing restaurant list logic, filters, pagination' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'restaurant_model.dart', type: 'file' as const, description: 'Restaurant data model' },
        { name: 'restaurant_with_reta_model.dart', type: 'file' as const, description: 'Restaurant with ETA model' },
        { name: 'filter_model.dart', type: 'file' as const, description: 'Filter data model' },
      ]
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'restaurant_service.dart', type: 'file' as const, description: 'API service for fetching restaurants, banners, ETA' },
        { name: 'IRestaurantService.dart', type: 'file' as const, description: 'Restaurant service interface' },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/restaurants', description: 'Fetch restaurant list with filters', params: ['lat', 'lng', 'address_id', 'page', 'filters', 'categories', 'delivery_type'] },
  { method: 'GET', path: '/categories', description: 'Fetch restaurant categories', params: ['isMarket'] },
  { method: 'GET', path: '/filters', description: 'Fetch available filters', params: ['isMarket', 'delivery_type'] },
  { method: 'GET', path: '/banners', description: 'Fetch promotional banners', params: ['isMarket', 'type'] },
  { method: 'GET', path: '/restaurants/eta', description: 'Fetch estimated delivery times for restaurants', params: ['restaurant_ids', 'lat', 'lng'] },
];

export function RestaurantListFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-orange-500">Restaurant List</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Restaurant List Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={restaurantListUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={restaurantListEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="restaurant-list" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={restaurantListTestCases} featureName="Restaurant List" />}
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
            The <strong className="text-[var(--color-text-primary)]">Restaurant List</strong> feature is the main browsing screen where customers 
            discover and explore restaurants. It displays restaurants in a scrollable list with categories, filters, promotional banners, and 
            restaurant cards showing photos, ratings, delivery times, and fees.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Customers can <strong className="text-[var(--color-text-primary)]">filter restaurants</strong> by categories (like Pizza, Burgers, Asian), 
            apply advanced filters (Free Delivery, Rating, Distance), toggle between <strong className="text-[var(--color-text-primary)]">pickup and delivery</strong> modes, 
            and <strong className="text-[var(--color-text-primary)]">load more restaurants</strong> through pagination. The feature also handles 
            <strong className="text-[var(--color-text-primary)]"> guest user restrictions</strong>, showing limited restaurants with a login prompt.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">scheduled order time selection</strong> for future orders, 
            <strong className="text-[var(--color-text-primary)]"> empty states</strong> when no restaurants match filters, and 
            <strong className="text-[var(--color-text-primary)]"> parallel loading</strong> of categories, filters, banners, and restaurants for better performance.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-orange-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All customers browsing restaurants, both logged-in users and guests
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Restaurant discovery, filtering, categories, pagination, pickup/delivery toggle
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Bottom navigation "Restaurants" tab, home feed, search results, deep links
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
              <Store className="w-6 h-6 text-orange-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Store, title: 'Restaurant List', description: 'Scrollable list of restaurant cards with photos, ratings, delivery times', color: 'text-orange-500' },
              { icon: Filter, title: 'Category Filtering', description: 'Filter restaurants by cuisine categories (Pizza, Burgers, etc.)', color: 'text-blue-500' },
              { icon: Settings, title: 'Advanced Filters', description: 'Apply filters like Free Delivery, Rating, Distance', color: 'text-purple-500' },
              { icon: ShoppingBag, title: 'Pickup/Delivery Toggle', description: 'Switch between pickup and delivery modes', color: 'text-green-500' },
              { icon: Clock, title: 'Scheduled Orders', description: 'Select future delivery/pickup times for scheduled orders', color: 'text-pink-500' },
              { icon: Search, title: 'Search Integration', description: 'Navigate to search screen from restaurant list', color: 'text-teal-500' },
              { icon: MapPin, title: 'Location-Based', description: 'Restaurants filtered by user location and address', color: 'text-red-500' },
              { icon: Zap, title: 'Pagination', description: 'Load more restaurants as user scrolls down', color: 'text-yellow-500' },
              { icon: Shield, title: 'Guest Restrictions', description: 'Limited restaurants for guest users with login prompt', color: 'text-indigo-500' },
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
          <CardDescription className="text-base">MVVM architecture with MobX state management</CardDescription>
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
          <CardDescription className="text-base">All API endpoints used by the Restaurant List feature</CardDescription>
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
              <Store className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Parallel Data Loading
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Categories, filters, banners, and restaurants are fetched in parallel for better performance. Each section loads independently, 
                  so if one fails, others can still display.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  restaurant_viewmodel.dart:318-323
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Filter className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Filter Types System
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Three filter types: inline list (multiple selection), single item list (radio selection in bottom sheet), and object (toggle on/off). 
                  Each filter type has different UI and interaction patterns.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  restaurant_viewmodel.dart:196-249, restaurant_view.dart:559-708
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Guest User Restrictions
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Guest users see limited restaurants (allowedOutletsCountForGuest). Pagination is disabled, and a login prompt appears at the end 
                  of the list. Restaurant list is truncated before ETA fetch.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  restaurant_viewmodel.dart:256-282, restaurant_view.dart:263-275
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Pagination with Pull-to-Refresh
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses PullToRefreshController for pagination. When user scrolls to bottom, page increments and new restaurants are fetched and 
                  appended. ETA is fetched separately for new restaurants.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  restaurant_viewmodel.dart:364-401, restaurant_view.dart:195-214
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Scheduled Order Time Formatting
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Time formatting differs for today (time only, e.g., "2:00 PM - 2:30 PM") vs future dates (date + time, e.g., "26 Nov, 2:00 PM - 2:30 PM"). 
                  Format is determined by comparing selected date with current date.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  scheduled_picker_page.dart:404-428
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <ShoppingBag className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Pickup/Delivery Mode Toggle
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Toggling between pickup and delivery resets pagination, reloads filters (filters differ for pickup vs delivery), and reloads 
                  restaurant list. State persists across navigation.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  restaurant_viewmodel.dart:412-421, restaurant_view.dart:408-423
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
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">MobX Observable State</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">restaurants</code> - List of restaurant models</li>
                <li><code className="text-[var(--color-primary)]">categories</code> - List of category models</li>
                <li><code className="text-[var(--color-primary)]">filters</code> - List of filter models</li>
                <li><code className="text-[var(--color-primary)]">banners</code> - List of banner models</li>
                <li><code className="text-[var(--color-primary)]">selectedCategoriesIds</code> - Selected category IDs for filtering</li>
                <li><code className="text-[var(--color-primary)]">innerSelectedFilters</code> - Map of selected filter values</li>
                <li><code className="text-[var(--color-primary)]">page</code> - Current pagination page number</li>
                <li><code className="text-[var(--color-primary)]">enablePullUp</code> - Whether pagination is enabled</li>
                <li><code className="text-[var(--color-primary)]">showLoginToSeeMore</code> - Whether to show login prompt for guests</li>
                <li><code className="text-[var(--color-primary)]">controller</code> - PullToRefreshController for pagination</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Key Actions</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">loadRestaurants()</code> - Fetches restaurants with current filters</li>
                <li><code className="text-[var(--color-primary)]">toggleCategory()</code> - Toggles category selection</li>
                <li><code className="text-[var(--color-primary)]">toggleFilter()</code> - Handles filter selection based on type</li>
                <li><code className="text-[var(--color-primary)]">clearFilters()</code> - Clears all filters and categories</li>
                <li><code className="text-[var(--color-primary)]">resetPagination()</code> - Resets page to 1 and enables pull-up</li>
                <li><code className="text-[var(--color-primary)]">loadMoreRestaurants()</code> - Loads next page of restaurants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

