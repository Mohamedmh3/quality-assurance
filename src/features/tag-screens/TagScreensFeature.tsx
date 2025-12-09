import { useState } from 'react';
import {
  Tag,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  ChevronRight,
  Folder,
  GitBranch,
  Zap,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { tagScreensUseCases } from './data/use-cases';
import { tagScreensEdgeCases } from './data/edge-cases';
import { tagScreensTestCases } from './data/test-cases';
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
  name: 'tag_screens/',
  type: 'folder' as const,
  children: [
    {
      name: 'presentation/',
      type: 'folder' as const,
      children: [
        {
          name: 'tag_dishes/',
          type: 'folder' as const,
          children: [
            { name: 'tag_dishes_view.dart', type: 'file' as const, description: 'Main tag dishes screen UI' },
            { name: 'tag_dishes_viewmodel.dart', type: 'file' as const, description: 'BLoC ViewModel managing tag dishes state and pagination' },
            {
              name: 'components/',
              type: 'folder' as const,
              children: [
                { name: 'tag_dishes_list.dart', type: 'file' as const, description: 'Infinite scroll list component for tag dishes' },
              ]
            },
            {
              name: 'state/',
              type: 'folder' as const,
              children: [
                { name: 'tag_dishes_state.dart', type: 'file' as const, description: 'BLoC state for tag dishes' },
              ]
            },
          ]
        },
        {
          name: 'tag_restaurants/',
          type: 'folder' as const,
          children: [
            { name: 'tag_restaurants_view.dart', type: 'file' as const, description: 'Main tag restaurants screen UI' },
            { name: 'tag_restaurants_viewmodel.dart', type: 'file' as const, description: 'BLoC ViewModel managing tag restaurants state and pagination' },
            {
              name: 'components/',
              type: 'folder' as const,
              children: [
                { name: 'tag_restaurants_list.dart', type: 'file' as const, description: 'Infinite scroll list component for tag restaurants' },
              ]
            },
            {
              name: 'states/',
              type: 'folder' as const,
              children: [
                { name: 'tag_restaurants_states.dart', type: 'file' as const, description: 'BLoC state for tag restaurants' },
              ]
            },
          ]
        },
      ]
    },
    {
      name: 'data/',
      type: 'folder' as const,
      children: [
        {
          name: 'repository/',
          type: 'folder' as const,
          children: [
            { name: 'tag_repository.dart', type: 'file' as const, description: 'Repository for tag data operations' },
          ]
        },
        {
          name: 'remote/',
          type: 'folder' as const,
          children: [
            {
              name: 'service/',
              type: 'folder' as const,
              children: [
                { name: 'tag_service.dart', type: 'file' as const, description: 'API service for fetching tag dishes and restaurants' },
              ]
            },
            {
              name: 'model/',
              type: 'folder' as const,
              children: [
                { name: 'tag_dishes_model.dart', type: 'file' as const, description: 'Tag dishes data model' },
              ]
            },
          ]
        },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: 'tagUrl (dynamic)', description: 'Fetch dishes for a specific tag', params: ['page'] },
  { method: 'GET', path: 'tagUrl (dynamic)', description: 'Fetch restaurants for a specific tag', params: ['page'] },
];

export function TagScreensFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-700 flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-purple-500">Tag Screens</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Tag Screens Feature
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="Stable" />
          <ArchitectureBadge type="BLoC" />
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={tagScreensUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={tagScreensEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="tag-screens" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={tagScreensTestCases} featureName="Tag Screens" />}
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
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Tag className="w-6 h-6 text-purple-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Tag Screens</strong> feature allows users to browse dishes and restaurants 
            filtered by specific tags. Users can view all items associated with a tag (e.g., "Spicy", "Vegetarian", "Fast Food") in dedicated screens 
            with infinite scroll pagination.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature supports both <strong className="text-[var(--color-text-primary)]">dish tags</strong> and <strong className="text-[var(--color-text-primary)]">restaurant tags</strong>, 
            providing a seamless browsing experience with loading states, error handling, and smooth navigation. Users can discover new items based on 
            their preferences and interests through tag-based filtering.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">infinite scroll pagination</strong> that automatically loads more items as users scroll, 
            <strong className="text-[var(--color-text-primary)]"> empty state handling</strong> when no results are found, and 
            <strong className="text-[var(--color-text-primary)]"> error recovery</strong> with retry functionality for network issues.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-purple-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users browsing dishes and restaurants by tags from home feed, search results, or category pages
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Tag-based discovery, infinite scroll pagination, error handling, empty states
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Home feed tags, search result filters, category pages, deep links
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Tag className="w-6 h-6 text-purple-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Tag, title: 'Tag Dishes Screen', description: 'Browse dishes filtered by tag with infinite scroll pagination', color: 'text-purple-500' },
              { icon: Tag, title: 'Tag Restaurants Screen', description: 'Browse restaurants filtered by tag with infinite scroll pagination', color: 'text-pink-500' },
              { icon: Zap, title: 'Infinite Scroll', description: 'Automatic pagination loads more items as user scrolls down', color: 'text-yellow-500' },
              { icon: Shield, title: 'Error Handling', description: 'Graceful error handling with retry functionality', color: 'text-red-500' },
              { icon: AlertTriangle, title: 'Empty States', description: 'Clear empty state messages when no results found', color: 'text-orange-500' },
              { icon: GitBranch, title: 'Navigation', description: 'Navigate to dish details or restaurant menu from tag lists', color: 'text-blue-500' },
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
          <CardDescription className="text-base">BLoC architecture with Cubit state management</CardDescription>
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
          <CardDescription className="text-base">All API endpoints used by the Tag Screens feature</CardDescription>
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
              <Tag className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Infinite Scroll Pagination
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses PagingController from infinite_scroll_pagination package for automatic pagination. When user scrolls to bottom, 
                  next page is automatically fetched and appended to the list. Pagination stops when last page is reached.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  tag_dishes_list.dart:30-38, tag_restaurants_list.dart:31-39
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  BLoC State Management
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses Cubit for state management. TagDishesViewModel and TagRestaurantsViewModel extend Cubit and manage 
                  AsyncState for loading, success, and error states. State includes current page items and overall list state.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  tag_dishes_viewmodel.dart:9-40, tag_restaurants_viewmodel.dart:9-41
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Error Handling with BlocListener
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Error handling is done through BlocListener that listens for state changes from non-error to error. 
                  When error occurs, a dialog is shown with error message. User can retry by refreshing the list.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  tag_dishes_view.dart:34-46, tag_restaurants_view.dart:37-49
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Dynamic Tag URL
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Tag URL is passed as a parameter to the screen and used directly in API requests. The URL is dynamic and 
                  can point to different endpoints based on the tag type. Page parameter is sent as query parameter.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  tag_service.dart:14-26, tag_service.dart:28-39
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Empty State Handling
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When no items are found, PagedListView shows noItemsFoundIndicatorBuilder with "No dishes found" or 
                  "No restaurants found" message. Empty state is displayed clearly to inform users.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  tag_dishes_list.dart:106-115, tag_restaurants_list.dart:114-123
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
