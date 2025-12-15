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
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { walletInfoUseCases } from './data/use-cases';
import { walletInfoEdgeCases } from './data/edge-cases';
import { walletInfoTestCases } from './data/test-cases';
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
  name: 'walet_info/',
  type: 'folder' as const,
  children: [
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'walet_info_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing transaction history, invoice validation, and payment' },
      ]
    },
    {
      name: 'widgets/',
      type: 'folder' as const,
      children: [
        { name: 'transaction_list_widget.dart', type: 'file' as const, description: 'Infinite scroll transaction list with pagination' },
        { name: 'transaction_date_picker_widget.dart', type: 'file' as const, description: 'Date range picker for filtering transactions' },
        { name: 'card_details_widget.dart', type: 'file' as const, description: 'Card details view showing name, card number, and primary card toggle' },
        { name: 'invoice_details_page_widget.dart', type: 'file' as const, description: 'Invoice details page with tip selection and payment' },
        { name: 'net_total_widget.dart', type: 'file' as const, description: 'Bottom sheet showing net total calculation' },
        { name: 'user_card_background_continer_widget.dart', type: 'file' as const, description: 'Wallet card background container with balance display' },
      ]
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'transaction_model.dart', type: 'file' as const, description: 'Transaction data model' },
        { name: 'main_transaction_model.dart', type: 'file' as const, description: 'Main transaction response model with pagination' },
        { name: 'invoice_page_detail_model.dart', type: 'file' as const, description: 'Invoice page detail model' },
      ]
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/wallet/transactions', description: 'Fetch wallet transactions with date filtering and pagination', params: ['wallet_id', 'from_date', 'to_date', 'page'] },
  { method: 'GET', path: '/wallet/invoice', description: 'Fetch invoice details by PIN/OTP or invoice ID', params: ['otp (optional)', 'invoice_id (optional)'] },
  { method: 'POST', path: '/wallet/pay-invoice', description: 'Pay invoice using wallet balance', params: ['invoice_id', 'wallet_id', 'selected_tips'] },
];

export function WalletInfoFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-green-500">Wallet Info</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Wallet Info Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={walletInfoUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={walletInfoEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="wallet-info" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={walletInfoTestCases} featureName="Wallet Info" />}
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
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Wallet Info</strong> feature allows users to view their wallet transaction history, 
            manage card details, and pay invoices. Users can filter transactions by date range, view card information, and process payments with tip selection.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature supports <strong className="text-[var(--color-text-primary)]">infinite scroll pagination</strong> for transaction history, 
            <strong className="text-[var(--color-text-primary)]"> date range filtering</strong> to view transactions within specific periods, and 
            <strong className="text-[var(--color-text-primary)]"> invoice payment</strong> with PIN/OTP validation and tip selection.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">card details view</strong> showing name, card number, and primary card toggle, 
            <strong className="text-[var(--color-text-primary)]"> net total calculation</strong> displayed at the bottom, and 
            <strong className="text-[var(--color-text-primary)]"> balance synchronization</strong> when navigating back to wallet screen.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-green-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users with wallet cards who want to view transactions, manage card details, or pay invoices
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Transaction history, date filtering, invoice payment, card management, net total calculation
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Wallet screen (tap balance card), invoice payment flow, deep links
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
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CreditCard, title: 'Transaction History', description: 'View all wallet transactions with infinite scroll pagination', color: 'text-green-500' },
              { icon: Zap, title: 'Date Filtering', description: 'Filter transactions by custom date range', color: 'text-blue-500' },
              { icon: Wallet, title: 'Card Details', description: 'View card name, number, and primary card setting', color: 'text-purple-500' },
              { icon: Shield, title: 'Invoice Payment', description: 'Pay invoices with PIN validation and tip selection', color: 'text-orange-500' },
              { icon: AlertTriangle, title: 'Net Total', description: 'View calculated net total at bottom of screen', color: 'text-red-500' },
              { icon: GitBranch, title: 'Balance Sync', description: 'Balance updates when navigating back to wallet screen', color: 'text-teal-500' },
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
          <CardDescription className="text-base">All API endpoints used by the Wallet Info feature</CardDescription>
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
              <CreditCard className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Infinite Scroll Pagination with PagingController
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Uses PagingController from infinite_scroll_pagination package for automatic pagination. When user scrolls to bottom, 
                  next page is automatically fetched and appended to the list. Pagination stops when last page is reached. Pagination metadata 
                  (lastPage, currentPage) is tracked to prevent over-fetching.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  walet_info_viewmodel.dart:99-117, transaction_list_widget.dart:24-108
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Date Range Filtering with Refresh
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When date range changes, pagination metadata is reset and PagingController.refresh() is called to reload transactions 
                  from first page. Date format is converted to 'yyyy-MM-dd' format for API requests. Default date range is today.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  walet_info_viewmodel.dart:187-193, transaction_date_picker_widget.dart
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Invoice Payment with Tip Selection
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Invoice payment flow includes PIN/OTP validation, invoice details loading, tip selection from fetched tip options, 
                  and payment processing with slider button. Payment prevents concurrent requests using payInvoiceloading flag. 
                  Success dialog shows mascot icon and redirects to home after delay.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  walet_info_viewmodel.dart:215-234, invoice_details_page_widget.dart:86-274
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Wallet className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Balance Synchronization on Navigation Back
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When navigating back from wallet info screen, updated balance is returned to wallet screen via Navigator.pop result. 
                  Wallet screen receives UserWalletModel with updated cardBalance and updates the wallet list accordingly. 
                  This ensures balance changes (e.g., after payment) are reflected immediately.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  user_wallet_info.dart:43-52, wallet_viewmodel.dart:53-65
                </code>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Error Handling with PagingController
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  PagingController handles errors through firstPageErrorIndicatorBuilder and newPageErrorIndicatorBuilder. 
                  Error widgets display error message with retry button. Retry calls refresh() for first page or fetchNextPage() 
                  for subsequent pages. Errors are rethrown to let PagingController handle them properly.
                </p>
                <code className="block p-3 bg-[var(--color-bg-primary)] rounded-lg text-xs text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                  transaction_list_widget.dart:62-103
                </code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


