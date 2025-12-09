import { useState } from 'react';
import {
  Star,
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
  Image as ImageIcon,
  FileText,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { orderRatingUseCases } from './data/use-cases';
import { orderRatingEdgeCases } from './data/edge-cases';
import { orderRatingTestCases } from './data/test-cases';
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
  name: 'order_rating/',
  type: 'folder' as const,
  children: [
    {
      name: 'presentation/order_rating/',
      type: 'folder' as const,
      children: [
        {
          name: 'components/',
          type: 'folder' as const,
          children: [
            { name: 'order_rating_screen.dart', type: 'file' as const, description: 'Main rating screen UI' },
            { name: 'rating_appbar.dart', type: 'file' as const, description: 'App bar with back button' },
            { name: 'rating_card.dart', type: 'file' as const, description: 'Restaurant/driver info card' },
            { name: 'rating_section_widget.dart', type: 'file' as const, description: 'Rating section with stars, options, notes' },
            { name: 'rating_options_list.dart', type: 'file' as const, description: 'List of rating options' },
            { name: 'rating_option.dart', type: 'file' as const, description: 'Individual rating option widget' },
            { name: 'rating_submit_button.dart', type: 'file' as const, description: 'Submit/Next button' },
            { name: 'rating_widget.dart', type: 'file' as const, description: 'Star rating widget' },
            { name: 'rate_app.dart', type: 'file' as const, description: 'App rating prompt dialog' },
          ]
        },
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'request_rating_model.dart', type: 'file' as const, description: 'Rating data to send to server' },
            { name: 'request_section_rating_model.dart', type: 'file' as const, description: 'Restaurant or driver rating data' },
            { name: 'type_rating_data.dart', type: 'file' as const, description: 'Rating type data with selected options' },
          ]
        },
        {
          name: 'state/',
          type: 'folder' as const,
          children: [
            { name: 'order_rating_state.dart', type: 'file' as const, description: 'BLoC state for rating screen' },
          ]
        },
        {
          name: 'order_rating_viewmodel.dart',
          type: 'file' as const,
          description: 'BLoC ViewModel managing rating logic and state',
        },
      ]
    },
    {
      name: 'data/models/order_rating/',
      type: 'folder' as const,
      children: [
        { name: 'order_rating_model.dart', type: 'file' as const, description: 'Rating model from server' },
        { name: 'rating_section_model.dart', type: 'file' as const, description: 'Restaurant or driver section model' },
        { name: 'rating_type_model.dart', type: 'file' as const, description: 'Rating type (bad/neutral/good) model' },
        { name: 'rating_option_model.dart', type: 'file' as const, description: 'Rating option model' },
        { name: 'rating_sub_options_model.dart', type: 'file' as const, description: 'Sub-option model' },
        { name: 'rating_dishes_model.dart', type: 'file' as const, description: 'Dish selection model' },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/rates-options-v2?isMarket={isMarket}', description: 'Fetch rating options for order', params: ['bill_id', 'isMarket'] },
  { method: 'POST', path: '/v2/user/orders/{orderId}/rate-order', description: 'Submit order rating', params: ['orderId', 'rating data (JSON)'] },
];

export function OrderRatingFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-700 flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-yellow-500">Order Rating</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Order Rating Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={orderRatingUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={orderRatingEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="order-rating" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={orderRatingTestCases} featureName="Order Rating" />}
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
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-yellow-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Order Rating</strong> feature allows customers to rate their completed orders, 
            providing feedback on both the restaurant and delivery driver. This feedback helps improve service quality and helps other customers 
            make informed decisions.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Customers can rate using <strong className="text-[var(--color-text-primary)]">1-5 stars</strong>, select specific reasons for their rating 
            (like "Food was cold" or "Great service"), add written notes, and upload photos. The rating process is split into two parts: 
            <strong className="text-[var(--color-text-primary)]"> restaurant rating</strong> first, then <strong className="text-[var(--color-text-primary)]">driver rating</strong>.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">validation</strong> to ensure required fields are filled, 
            <strong className="text-[var(--color-text-primary)]"> sub-options</strong> for detailed feedback, <strong className="text-[var(--color-text-primary)]">dish selection</strong> 
            for specific item complaints, and an <strong className="text-[var(--color-text-primary)]">app rating prompt</strong> that appears when both ratings are 4+ stars.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-yellow-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Customers who have completed orders and want to provide feedback
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Star ratings, detailed feedback, photo uploads, two-step rating process
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Order details screen after completion, push notification, order history
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Star, title: 'Star Rating', description: '1-5 star rating system with visual feedback', color: 'text-yellow-500' },
              { icon: CheckCircle, title: 'Rating Options', description: 'Select specific reasons for rating (good or bad)', color: 'text-green-500' },
              { icon: FileText, title: 'Notes & Comments', description: 'Add written feedback with optional notes', color: 'text-blue-500' },
              { icon: ImageIcon, title: 'Photo Upload', description: 'Upload photos to support feedback', color: 'text-purple-500' },
              { icon: Users, title: 'Two-Step Rating', description: 'Rate restaurant first, then driver', color: 'text-pink-500' },
              { icon: Shield, title: 'Validation', description: 'Ensures required fields are filled before submission', color: 'text-red-500' },
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
          <CardDescription className="text-base">BLoC architecture with presentation layer and data models</CardDescription>
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
          <CardDescription className="text-base">All API endpoints used by the Order Rating feature</CardDescription>
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
              <Star className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Star Rating to Type Mapping
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Star values map to rating types: 1-2 stars = bad (types[0]), 3 stars = neutral (types[1]), 4-5 stars = good (types[2]). 
                  Each type has different options.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  order_rating_viewmodel.dart:496-557
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Validation System
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Three-level validation: star rating required, options required (if selectionRequired=true), notes required (if noteRequired=true). 
                  Validation errors are shown visually (red borders, disabled buttons).
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  order_rating_viewmodel.dart:72-114
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Two-Step Rating Process
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Restaurant rating is completed first, then driver rating. Button shows "Next" if driver rating available, "Send" if not. 
                  Back button on driver rating returns to restaurant rating.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  order_rating_viewmodel.dart:559-563, order_rating_screen.dart:142-152
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <ImageIcon className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Image Upload Integration
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses ImagePickerViewModel for image selection and upload. Max photos limit is set from ratingModel.canUpload. 
                  Some options require image upload (withImage=true).
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  order_rating_viewmodel.dart:149-159, rating_submit_button.dart:66-83
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  State Management with BLoC
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses BLoC/Cubit pattern with OrderRatingState. State includes fetchRatingState, submitRatingState, requestRatingModel, 
                  and UI state (isDriverRatingTab, validation flags). State is immutable using copyWith.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  order_rating_state.dart, order_rating_viewmodel.dart
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
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">BLoC State (OrderRatingState)</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">fetchRatingState</code> - Async state for loading rating options</li>
                <li><code className="text-[var(--color-primary)]">submitRatingState</code> - Async state for submitting rating</li>
                <li><code className="text-[var(--color-primary)]">ratingModel</code> - Rating data from server (read-only)</li>
                <li><code className="text-[var(--color-primary)]">requestRatingModel</code> - Modified rating data to send to server</li>
                <li><code className="text-[var(--color-primary)]">isDriverRatingTab</code> - Current tab (restaurant or driver)</li>
                <li><code className="text-[var(--color-primary)]">ratingRequiredValidation</code> - Star rating validation flag</li>
                <li><code className="text-[var(--color-primary)]">selectionRequiredValidation</code> - Options selection validation flag</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">Computed Properties</h4>
              <ul className="list-disc list-inside text-base text-[var(--color-text-secondary)] space-y-2">
                <li><code className="text-[var(--color-primary)]">currentRating</code> - Current rating (restaurant or driver) from requestRatingModel</li>
                <li><code className="text-[var(--color-primary)]">currentType</code> - Current rating type based on selected stars</li>
                <li><code className="text-[var(--color-primary)]">currentOptions</code> - Selected options for current rating</li>
                <li><code className="text-[var(--color-primary)]">isOneModelNull</code> - Checks if driver or restaurant rating is not available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

