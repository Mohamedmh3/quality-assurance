import { useState } from 'react';
import {
  MessageCircle,
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
  Badge,
  Globe,
  Loader,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { liveChatUseCases } from './data/use-cases';
import { liveChatEdgeCases } from './data/edge-cases';
import { liveChatTestCases } from './data/test-cases';
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
  name: 'live_chat/',
  type: 'folder' as const,
  children: [
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'live_chat_view.dart', type: 'file' as const, description: 'Main live chat screen with web view for chat interface' },
      ]
    },
    {
      name: 'viewModel/',
      type: 'folder' as const,
      children: [
        { name: 'live_chat_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing chat URL fetching, loading state, and chat model' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'live_chat_model.dart', type: 'file' as const, description: 'Chat model containing chat URL and unread message count' },
      ]
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        { name: 'live_chat_button_widget.dart', type: 'file' as const, description: 'Floating action button with animation and unread count badge' },
      ]
    },
  ]
};

export function LiveChatFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-700 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-green-500">Live Chat</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Live Chat Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={liveChatUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={liveChatEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="live-chat" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={liveChatTestCases} featureName="Live Chat" />}
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
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-green-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Live Chat</strong> feature provides customers with 
            instant access to customer support through a chat interface. It consists of a floating action button with 
            animation that appears on configured screens (like profile), and a full-screen chat interface displayed in 
            a web view.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Users can <strong className="text-[var(--color-text-primary)]">tap the chat button</strong> to open a chat 
            screen where they can communicate with support agents. The button displays a <strong className="text-[var(--color-text-primary)]">badge 
            with unread message count</strong> to notify users of new messages. The chat interface is loaded from a 
            URL fetched from the API, and can optionally include <strong className="text-[var(--color-text-primary)]">order 
            context (billId)</strong> when opened from order details.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature includes <strong className="text-[var(--color-text-primary)]">loading states</strong> while fetching 
            the chat URL, <strong className="text-[var(--color-text-primary)]">error handling</strong> for failed requests, 
            and <strong className="text-[var(--color-text-primary)]">web view cache management</strong> to ensure fresh chat 
            sessions. The chat button has a <strong className="text-[var(--color-text-primary)]">continuous bounce animation</strong> 
            to draw user attention and supports <strong className="text-[var(--color-text-primary)]">tutorial integration</strong> 
            for onboarding.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-green-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users needing customer support, accessible from profile screen and other configured screens
              </p>
            </div>
            <div className="info-box flex-col warning">
              <MessageCircle className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Instant customer support, unread message notifications, order-specific chat context, easy access via floating button
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Floating action button on profile screen, order details screen (with billId), other configured screens
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: 'Floating Chat Button', description: 'Animated floating action button with bounce effect for easy access', color: 'text-green-500' },
              { icon: Badge, title: 'Unread Message Badge', description: 'Badge showing count of unread messages, updates reactively', color: 'text-red-500' },
              { icon: Globe, title: 'Web View Chat Interface', description: 'Full-screen web view displaying chat interface from fetched URL', color: 'text-blue-500' },
              { icon: Loader, title: 'Loading States', description: 'Loading indicator while fetching chat URL from API', color: 'text-purple-500' },
              { icon: AlertCircle, title: 'Error Handling', description: 'Error state with sad mascot icon when chat fails to load', color: 'text-orange-500' },
              { icon: Settings, title: 'Order Context Support', description: 'Optional billId parameter for order-specific chat sessions', color: 'text-teal-500' },
              { icon: Code2, title: 'Cache Management', description: 'Automatic cache and cookie clearing for fresh chat sessions', color: 'text-pink-500' },
              { icon: Shield, title: 'Tutorial Integration', description: 'Support for tutorial overlay to highlight chat button', color: 'text-indigo-500' },
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

const apiEndpoints = [
  { method: 'GET', path: '/chat/url', description: 'Fetch chat URL for live chat interface', params: ['billId (optional)'] },
];

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
          <CardDescription className="text-base">All API endpoints used by the Live Chat feature</CardDescription>
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
              <Globe className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  InAppWebView Integration
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses InAppWebView widget to display the chat interface within the app. The web view loads the chat URL fetched from the server, 
                  allowing users to interact with the chat interface without leaving the app. JavaScript is enabled for full chat functionality.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  live_chat_view.dart:45-65
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <MessageCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Chat URL Fetching with MobX
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Chat URL is fetched using MobX ViewModel. The ViewModel manages loading state and updates the chat model with the fetched URL. 
                  Optional billId parameter can be passed to link chat to a specific order. Error handling displays custom error widget on failure.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  live_chat_viewmodel.dart:25-45
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Loader className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Loading State Management
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Loading state is managed through MobX observable. While fetching chat URL, a loading indicator is displayed. Once URL is loaded, 
                  the web view is shown. If loading fails, error state is displayed with retry option.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  live_chat_view.dart:30-44, live_chat_viewmodel.dart:15-20
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Error Handling with Custom Widget
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When chat fails to load, a custom error widget is displayed showing a sad mascot icon and error message. Users can retry loading 
                  the chat. Error state is managed through MobX observable and displayed conditionally based on error status.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  live_chat_view.dart:66-85
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Badge className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Unread Message Count Badge
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Live chat button displays unread message count badge when there are unread messages. The badge count is fetched from the chat model 
                  and updated when chat URL is loaded. Badge is hidden when count is zero.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  live_chat_button_widget.dart:45-60
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

