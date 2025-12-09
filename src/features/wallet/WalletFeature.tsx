import { useState } from 'react';
import {
  Wallet,
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
  CreditCard,
  MapPin,
  Store,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { walletUseCases } from './data/use-cases';
import { walletEdgeCases } from './data/edge-cases';
import { walletTestCases } from './data/test-cases';
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
  name: 'wallet/',
  type: 'folder' as const,
  children: [
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'wallet_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing wallet list, balance updates, and QR operations' },
      ]
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        { name: 'new_wallet_body.dart', type: 'file' as const, description: 'Main wallet body with collapsible balance section and restaurant list' },
        { name: 'collapsible_balance_section.dart', type: 'file' as const, description: 'Collapsible app bar with balance card and top-up button' },
        { name: 'payment_section.dart', type: 'file' as const, description: 'Payment section overlay with PIN input and animations' },
        { name: 'floating_pay_button.dart', type: 'file' as const, description: 'Floating action button for opening payment section' },
        { name: 'restaurant_map_view.dart', type: 'file' as const, description: 'Map view showing restaurants that accept wallet payment' },
        { name: 'wallet_card_widget.dart', type: 'file' as const, description: 'Wallet card widget displaying balance and card information' },
        { name: 'wallet_guest_login_prompt.dart', type: 'file' as const, description: 'Login prompt widget for guest users' },
        { name: 'navigation_cards.dart', type: 'file' as const, description: 'Navigation cards widget (if applicable)' },
      ]
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'wallet_service.dart', type: 'file' as const, description: 'API service for wallet operations (fetch list, topup, openFromQr, pay invoice)' },
        { name: 'Iwallet_service.dart', type: 'file' as const, description: 'Wallet service interface' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'user_wallet_model.dart', type: 'file' as const, description: 'User wallet data model' },
        { name: 'invoice_model.dart', type: 'file' as const, description: 'Invoice data model' },
      ]
    },
    {
      name: 'helpers/',
      type: 'folder' as const,
      children: [
        { name: 'wallet_operation_handler.dart', type: 'file' as const, description: 'Utility class for handling wallet operations with loading bottom sheets' },
        { name: 'wallet_loading_bottom_sheet.dart', type: 'file' as const, description: 'Loading bottom sheet widget for wallet operations' },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/wallet/list', description: 'Fetch user wallet list with balances', params: [] },
  { method: 'POST', path: '/wallet/topup', description: 'Top up wallet using top-up key', params: ['topup_key'] },
  { method: 'GET', path: '/wallet/open-from-qr', description: 'Open wallet or perform operation from QR code', params: ['qr_data'] },
  { method: 'POST', path: '/wallet/pay-invoice', description: 'Pay invoice using wallet balance', params: ['invoice_id', 'wallet_id', 'selected_tips'] },
  { method: 'GET', path: '/wallet/invoice', description: 'Get invoice details by PIN/OTP or invoice ID', params: ['otp (optional)', 'invoice_id (optional)'] },
];

export function WalletFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-orange-500">Wallet</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Wallet Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={walletUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={walletEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="wallet" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={walletTestCases} featureName="Wallet" />}
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
              <Wallet className="w-6 h-6 text-orange-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Wallet</strong> feature allows users to manage their digital wallet, 
            view balance, pay invoices, top up funds, and browse restaurants that accept wallet payment. Users can access their wallet 
            through a collapsible balance section with smooth animations and a restaurant list/map view below.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature supports <strong className="text-[var(--color-text-primary)]">payment with PIN</strong> through an animated payment section, 
            <strong className="text-[var(--color-text-primary)]"> top-up functionality</strong> using top-up keys, 
            <strong className="text-[var(--color-text-primary)]"> QR code operations</strong> for opening wallet or processing top-ups, and 
            <strong className="text-[var(--color-text-primary)]"> restaurant browsing</strong> with list and map views for dine-in payment.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">collapsible balance section</strong> that animates on scroll, 
            <strong className="text-[var(--color-text-primary)]"> first visit explanation</strong> bottom sheet for new users, 
            <strong className="text-[var(--color-text-primary)]"> guest user handling</strong> with login prompts, and 
            <strong className="text-[var(--color-text-primary)]"> deep link support</strong> for opening wallet from external sources.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-orange-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All logged-in users who want to manage wallet balance, pay invoices, top up funds, or browse restaurants for dine-in payment
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Wallet management, balance viewing, invoice payment, top-up, QR operations, restaurant browsing
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Bottom navigation, menu, deep links (beepay), QR code scans, invoice payment flow
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
              <Wallet className="w-6 h-6 text-orange-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wallet, title: 'Balance Display', description: 'View wallet balance with collapsible animated section', color: 'text-orange-500' },
              { icon: CreditCard, title: 'Payment with PIN', description: 'Pay invoices by entering 4-digit PIN with smooth animations', color: 'text-blue-500' },
              { icon: Zap, title: 'Top Up Wallet', description: 'Add funds to wallet using top-up keys', color: 'text-green-500' },
              { icon: Shield, title: 'QR Code Operations', description: 'Open wallet or process top-up from QR code scans', color: 'text-purple-500' },
              { icon: Store, title: 'Restaurant Browsing', description: 'Browse restaurants that accept wallet payment with list and map views', color: 'text-pink-500' },
              { icon: MapPin, title: 'Dine-In Integration', description: 'View restaurants by category tabs with location-based filtering', color: 'text-red-500' },
              { icon: AlertTriangle, title: 'Guest Handling', description: 'Show login prompt for guest users accessing wallet', color: 'text-yellow-500' },
              { icon: GitBranch, title: 'Deep Link Support', description: 'Open wallet from external sources via deep links', color: 'text-teal-500' },
              { icon: Users, title: 'First Visit Guide', description: 'Show explanation bottom sheet for new users', color: 'text-indigo-500' },
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
          <CardDescription className="text-base">All API endpoints used by the Wallet feature</CardDescription>
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
              <Wallet className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Collapsible Balance Section with SliverAppBar
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses SliverAppBar with expandedHeight and flexibleSpace to create collapsible balance section. 
                  Balance card animates smoothly as user scrolls, transitioning from expanded to collapsed state. 
                  Animation progress is calculated based on scroll position and constraints. Gradient background 
                  transitions smoothly during collapse.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  collapsible_balance_section.dart:28-217
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Animated Payment Section with Slide Transitions
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Payment section slides up from bottom using SlideTransition with AnimationController. 
                  Check button slides to the right (or left in RTL), then PIN input slides in from opposite side. 
                  Animations are sequenced using AnimationController status listeners. Payment section is positioned 
                  absolutely at bottom and overlays the wallet screen.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_wallet_body.dart:134-214, payment_section.dart
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Wallet Operation Handler with Loading Bottom Sheets
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  WalletOperationHandler utility class provides executeWithLoading method that shows loading bottom sheet 
                  during operations. Used for openFromQr and topup operations. Loading bottom sheet displays operation 
                  message and automatically closes when operation completes. Results are shown via message dialogs.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  wallet_operation_handler.dart:12-45
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Store className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Restaurant List and Map View Integration
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Integrates DineInViewModel for restaurant browsing. Tab controller manages restaurant categories. 
                  View toggle switches between list view (RestaurantCard widgets) and map view (RestaurantMapView). 
                  List view uses SmartRefresher for pagination. Map view shows restaurant markers on map. Both views 
                  share same restaurant data source.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_wallet_body.dart:91-132, new_wallet_body.dart:500-518
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Guest User Detection and Login Prompt
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  UserManager.instance.isLoggedIn() check determines if user is logged in. If guest, WalletGuestLoginPrompt 
                  widget is displayed instead of wallet screen. Login prompt shows message and button to navigate to login screen. 
                  This check happens before any wallet data is fetched.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_wallet_view.dart:36-39
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Deep Link Handling for Wallet Operations
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  DeepLinkManager checks for 'beepay' screen and specific parameters (type: 'open-ya-semsem', topup-key). 
                  If fromLaunch is true, splash info is loaded first. QR operations and topup are handled automatically 
                  via WalletOperationHandler. Deep link state is cleared after processing to prevent re-triggering.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_wallet_view.dart:78-104
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  First Visit Explanation with HTML Content
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  LocaleManager checks WALLET_FIRST_VISIT flag to determine if user has visited wallet before. 
                  On first visit, HTML explanation content is fetched from StaticData.settingModel.walletExplanationHtml. 
                  HtmlExplanationBottomSheet displays content with "Welcome to beepay" title. Flag is saved after 
                  user closes bottom sheet. Bottom sheet appears after short delay (800ms) for better UX.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  new_wallet_view.dart:117-145
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

