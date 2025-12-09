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
          <CardTitle className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-[var(--color-primary)]" />
            Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--color-text-secondary)] mb-4">
            The Tag Screens feature uses BLoC (Business Logic Component) architecture pattern.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">ViewModels (BLoC)</h3>
              <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
                <li>TagDishesViewModel - Manages tag dishes state and pagination</li>
                <li>TagRestaurantsViewModel - Manages tag restaurants state and pagination</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Repository</h3>
              <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
                <li>TagRepository - Handles data operations for tag screens</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Service</h3>
              <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
                <li>TagService - API service for fetching tag dishes and restaurants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
