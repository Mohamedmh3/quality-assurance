import { useState } from 'react';
import {
  Search,
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
  MapPin,
  Clock,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { searchPageUseCases } from './data/use-cases';
import { searchPageEdgeCases } from './data/edge-cases';
import { searchPageTestCases } from './data/test-cases';
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
  name: 'features/search_page/',
  type: 'folder' as const,
  children: [
    {
      name: 'app_search_page/',
      type: 'folder' as const,
      children: [
        {
          name: 'view/',
          type: 'folder' as const,
          children: [
            { name: 'search_view.dart', type: 'file' as const, description: 'Main search page UI with tabs and sections' },
          ]
        },
        {
          name: 'viewmodel/',
          type: 'folder' as const,
          children: [
            { name: 'search_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing search logic, filters, pagination, suggestions' },
          ]
        },
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'search_model.dart', type: 'file' as const, description: 'Search data models' },
            { name: 'search_tab_model.dart', type: 'file' as const, description: 'Search tab model' },
            { name: 'search_section_model.dart', type: 'file' as const, description: 'Search section model' },
            { name: 'search_filter_model.dart', type: 'file' as const, description: 'Search filter model' },
            { name: 'search_item_model.dart', type: 'file' as const, description: 'Search item/dish model' },
            { name: 'outlet_user_recommend_model.dart', type: 'file' as const, description: 'Outlet recommendation model' },
          ]
        },
        {
          name: 'service/',
          type: 'folder' as const,
          children: [
            { name: 'search_service.dart', type: 'file' as const, description: 'API service for search, suggestions, filters' },
            { name: 'ISearchService.dart', type: 'file' as const, description: 'Search service interface' },
          ]
        },
        {
          name: 'repositry/',
          type: 'folder' as const,
          children: [
            { name: 'search_repo.dart', type: 'file' as const, description: 'Search repository layer' },
          ]
        },
        {
          name: 'widget/',
          type: 'folder' as const,
          children: [
            { name: 'search_text_form_widget.dart', type: 'file' as const, description: 'Search input field widget' },
            { name: 'search_section_widget.dart', type: 'file' as const, description: 'Search tabs widget' },
            { name: 'default_search_body_widget.dart', type: 'file' as const, description: 'Default search sections widget' },
            { name: 'search_list_result_widget.dart', type: 'file' as const, description: 'Search results list widget' },
            { name: 'single_choice_bottom_sheet_widget.dart', type: 'file' as const, description: 'Single choice filter bottom sheet' },
            { name: 'multible_chioce_bottom_sheet_widget.dart', type: 'file' as const, description: 'Multiple choice filter bottom sheet' },
            { name: 'suggest_query_list_widget.dart', type: 'file' as const, description: 'Search suggestions widget' },
            { name: 'suggest_outlet_widget.dart', type: 'file' as const, description: 'Outlet suggestions widget' },
          ]
        },
      ]
    },
    {
      name: 'sub_pages/',
      type: 'folder' as const,
      children: [
        {
          name: 'categories/',
          type: 'folder' as const,
          children: [
            {
              name: 'view/',
              type: 'folder' as const,
              children: [
                { name: 'categories_view.dart', type: 'file' as const, description: 'Categories list view' },
                { name: 'category_view.dart', type: 'file' as const, description: 'Single category view' },
              ]
            },
            {
              name: 'viewmodel/',
              type: 'folder' as const,
              children: [
                { name: 'categories_view_model.dart', type: 'file' as const, description: 'Categories ViewModel' },
              ]
            },
            {
              name: 'model/',
              type: 'folder' as const,
              children: [
                { name: 'category_model.dart', type: 'file' as const, description: 'Category model' },
                { name: 'sort_model.dart', type: 'file' as const, description: 'Sort options model' },
              ]
            },
            {
              name: 'services/',
              type: 'folder' as const,
              children: [
                { name: 'category_service.dart', type: 'file' as const, description: 'Category API service' },
                { name: 'ICategoryService.dart', type: 'file' as const, description: 'Category service interface' },
              ]
            },
          ]
        },
        {
          name: 'user_suggest/',
          type: 'folder' as const,
          children: [
            {
              name: 'view/',
              type: 'folder' as const,
              children: [
                { name: 'user_suggest_view.dart', type: 'file' as const, description: 'User outlet recommendation view' },
              ]
            },
            {
              name: 'viewmodel/',
              type: 'folder' as const,
              children: [
                { name: 'user_suggest_viewmodel.dart', type: 'file' as const, description: 'User suggestion ViewModel' },
              ]
            },
          ]
        },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/search/sections', description: 'Fetch search tabs and sections', params: [] },
  { method: 'GET', path: '/search/section', description: 'Fetch sections for specific tab', params: ['tab_id'] },
  { method: 'POST', path: '/search/results', description: 'Search restaurants with filters', params: ['query', 'cuisine_group_id', 'api_filters', 'skip', 'session_id'] },
  { method: 'GET', path: '/search/autocomplete-suggest', description: 'Fetch search suggestions', params: ['text', 'lat', 'lng', 'address_id'] },
  { method: 'GET', path: '/search/items', description: 'Search for dishes/items', params: ['text', 'lat', 'lng', 'address_id', 'page', 'rest_id', 'get_markets', 'get_restaurants'] },
  { method: 'GET', path: '/search/outlets', description: 'Search restaurants/markets', params: ['text', 'lat', 'lng', 'address_id', 'get_restaurants', 'get_markets'] },
  { method: 'POST', path: '/search/recommend-outlet', description: 'Submit outlet recommendation', params: ['outlet_type', 'categories', 'city', 'name', 'address'] },
  { method: 'GET', path: '/categories', description: 'Fetch categories list', params: ['isMarket'] },
];

function OverviewTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Search className="w-6 h-6 text-[var(--color-primary)]" />
            Search Page Feature Overview
          </CardTitle>
          <CardDescription>
            Comprehensive search functionality allowing users to find restaurants, markets, and dishes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Feature Description</h3>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              The Search Page feature provides a powerful search interface for customers to find restaurants, markets, and dishes.
              It includes search tabs, filters, suggestions, categories, and the ability to recommend new outlets.
              The feature supports both restaurant and item search with advanced filtering capabilities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Key Capabilities</h3>
            <ul className="space-y-2 text-base text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Search for restaurants and markets by name, cuisine, or keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Search for specific dishes or items across restaurants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Apply multiple filters (price, rating, cuisine type, features)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Browse categories and suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Get search suggestions as you type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Recommend new restaurants or markets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Pagination for loading more results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Automatic refresh when address changes</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Architecture</h3>
            <div className="flex items-center gap-2 mb-3">
              <ArchitectureBadge type="MVVM" />
              <StatusBadge status="Stable" />
            </div>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              The Search Page feature follows MVVM architecture with clear separation between View, ViewModel, Service, and Model layers.
              The feature uses MobX for state management and includes sub-pages for categories and user suggestions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Folder className="w-6 h-6 text-[var(--color-primary)]" />
            Folder Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FolderTree data={folderStructure} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-[var(--color-primary)]" />
            API Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, idx) => (
              <div key={idx} className="bg-[var(--color-bg-primary)] rounded-lg p-4 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    'px-2 py-1 rounded text-xs font-bold',
                    endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  )}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm text-[var(--color-text-primary)] font-mono">{endpoint.path}</code>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">{endpoint.description}</p>
                {endpoint.params.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Parameters:</p>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.params.map((param, pIdx) => (
                        <span key={pIdx} className="px-2 py-1 bg-[var(--color-bg-secondary)] rounded text-xs text-[var(--color-text-secondary)]">
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SearchPageFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-500">Search Page</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Search Page Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={searchPageUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={searchPageEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="search-page" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={searchPageTestCases} featureName="Search Page" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

