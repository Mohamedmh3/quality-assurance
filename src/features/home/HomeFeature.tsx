import { useState } from 'react';
import {
  Home,
  Navigation,
  Bell,
  MapPin,
  Gift,
  Folder,
  Code2,
  Settings,
  Database,
  Globe,
  Layers,
  Shield,
  Zap,
  ChevronRight,
  Smartphone,
  GitBranch,
  Users,
  LogIn,
  ArrowLeft,
  RotateCcw,
  Workflow,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { Accordion, AccordionItem } from '@/components/Accordion';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { homeUseCases } from './data/use-cases';
import { homeEdgeCases } from './data/edge-cases';
import { homeTestCases } from './data/test-cases';
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
  name: 'home/',
  type: 'folder' as const,
  children: [
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        { name: 'address_model.dart', type: 'file' as const, description: 'Delivery address data' },
        { name: 'user_address_model.dart', type: 'file' as const, description: 'User addresses list' },
      ]
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'IHomeService.dart', type: 'file' as const, description: 'Service interface' },
        { name: 'home_service.dart', type: 'file' as const, description: 'API implementation' },
      ]
    },
    {
      name: 'spinner/',
      type: 'folder' as const,
      children: [
        {
          name: 'controller/',
          type: 'folder' as const,
          children: [
            { name: 'spinner_viewmodel.dart', type: 'file' as const, description: 'Spinner business logic' },
          ]
        },
        {
          name: 'models/',
          type: 'folder' as const,
          children: [
            { name: 'spinner_model.dart', type: 'file' as const, description: 'Spinner rewards config' },
            { name: 'spinner_result.dart', type: 'file' as const, description: 'Spin result data' },
            { name: 'spinner_reward.dart', type: 'file' as const, description: 'Individual reward' },
          ]
        },
        {
          name: 'view/',
          type: 'folder' as const,
          children: [
            { name: 'spinner_view.dart', type: 'file' as const, description: 'Fortune wheel UI' },
            {
              name: 'widgets/',
              type: 'folder' as const,
              children: [
                { name: 'curves.dart', type: 'file' as const, description: 'Animation curves' },
                { name: 'moving_background.dart', type: 'file' as const, description: 'Animated gradient' },
                { name: 'spinner_button.dart', type: 'file' as const, description: 'Spin button' },
              ]
            },
          ]
        },
      ]
    },
    {
      name: 'view/',
      type: 'folder' as const,
      children: [
        { name: 'home_view.dart', type: 'file' as const, description: 'Main home container' },
        { name: 'home_permission_view.dart', type: 'file' as const, description: 'Location permission' },
      ]
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        { name: 'home_viewmodel.dart', type: 'file' as const, description: 'Home business logic' },
      ]
    },
    { name: 'widget_home_bottom_navigation_bar.dart', type: 'file' as const, description: 'Bottom nav bar widget' },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/addresses', description: 'Fetch user saved addresses', params: [] },
  { method: 'PUT', path: '/address', description: 'Add new delivery address', params: ['address_name', 'lat', 'lng', 'street', 'floor', 'details'] },
  { method: 'POST', path: '/address', description: 'Update existing address', params: ['id', 'address_name', 'lat', 'lng'] },
  { method: 'DELETE', path: '/address', description: 'Delete saved address', params: ['id'] },
  { method: 'POST', path: '/vote-for-address', description: 'Vote for service expansion', params: ['lat', 'lng'] },
  { method: 'GET', path: '/settings', description: 'Check location availability', params: ['lat', 'lng'] },
  { method: 'GET', path: '/spinner-rewards', description: 'Get fortune wheel prizes', params: [] },
  { method: 'GET', path: '/make-spin', description: 'Execute spinner spin', params: [] },
  { method: 'POST', path: '/add-spin-code', description: 'Redeem promotional code', params: ['code'] },
  { method: 'GET', path: '/flash-sale', description: 'Get flash sale data', params: [] },
  { method: 'POST', path: '/current-location', description: 'Update user location', params: ['lat', 'lng'] },
];

export function HomeFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-indigo-500">Home</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Home Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={homeUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={homeEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="home" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={homeTestCases} featureName="Home" />}
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
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-indigo-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Home</strong> feature is the main 
            container and navigation hub of the entire app. It's what customers see when they open 
            the app - a screen with different sections they can switch between using buttons at the 
            bottom: Home Feed (restaurants), Search, Wallet, My Orders, and Profile.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            This feature handles critical app-wide concerns like <strong className="text-[var(--color-text-primary)]">location 
            permissions</strong> (making sure we know where to deliver), <strong className="text-[var(--color-text-primary)]">push 
            notifications</strong> (order updates, promotions), and the <strong className="text-[var(--color-text-primary)]">app 
            lifecycle</strong> (what happens when you switch to other apps and come back).
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            It also includes the <strong className="text-[var(--color-text-primary)]">Spinner/Fortune Wheel</strong> feature 
            where customers can spin to win vouchers and rewards - a fun gamification element that 
            increases engagement.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-indigo-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Every customer - this is the entry point to the entire app experience
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Navigation, location handling, notifications, spinner rewards
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                App launch, notification taps, deep links
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-indigo-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Navigation, title: 'Bottom Navigation', description: 'Switch between Home, Search, Wallet, Orders, Profile', color: 'text-indigo-500' },
              { icon: MapPin, title: 'Location Management', description: 'Handle permissions, coverage checks, address voting', color: 'text-blue-500' },
              { icon: Bell, title: 'Push Notifications', description: 'Order updates, promotions, points earned', color: 'text-purple-500' },
              { icon: Gift, title: 'Spinner/Fortune Wheel', description: 'Spin to win vouchers and rewards', color: 'text-pink-500' },
              { icon: LogIn, title: 'Guest Login Prompts', description: 'Encourage registration at key moments', color: 'text-amber-500' },
              { icon: ArrowLeft, title: 'Back Button Handling', description: 'Smart navigation on back press', color: 'text-red-500' },
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
          <CardDescription className="text-base">MVVM architecture with spinner sub-feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[var(--color-bg-primary)] rounded-2xl p-8 border border-[var(--color-border)]">
            <FolderTree data={folderStructure} />
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-purple-500" />
            </div>
            Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Features',
                items: ['home_feed', 'search_page', 'wallet', 'orders/my_orders', 'profile', 'cart', 'address', 'helpers/location_permission'],
              },
              {
                title: 'Core Services',
                items: ['HttpManager', 'NavigationService', 'UserManager', 'AnalyticsManager', 'NotificationManager', 'DeepLinkManager', 'LocationRequestManager'],
              },
              {
                title: 'Libraries',
                items: ['flutter_mobx', 'get (GetX)', 'firebase_messaging', 'confetti', 'flutter_fortune_wheel', 'animate_gradient'],
              },
            ].map((group) => (
              <div key={group.title} className="info-box flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.items.map(dep => (
                    <li key={dep} className="flex items-center gap-4 text-base text-[var(--color-text-secondary)]">
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                      {dep}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ImplementationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Accordion>
        {/* API Endpoints */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <span className="font-semibold text-xl">API Endpoints</span>
            </div>
          }
          defaultOpen
        >
          <div className="space-y-6">
            {apiEndpoints.map((endpoint, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center gap-4 mb-4">
                  <span className={cn(
                    'badge-base',
                    endpoint.method === 'GET' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : endpoint.method === 'POST'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : endpoint.method === 'PUT'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  )}>
                    {endpoint.method}
                  </span>
                  <code className="text-xl text-indigo-400 font-mono">{endpoint.path}</code>
                </div>
                <p className="text-base text-[var(--color-text-secondary)] mb-5">{endpoint.description}</p>
                {endpoint.params.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {endpoint.params.map(param => (
                      <code key={param} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-muted)] font-mono border border-[var(--color-border)]">
                        {param}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Data Models */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-500" />
              </div>
              <span className="font-semibold text-xl">Data Models</span>
            </div>
          }
        >
          <div className="space-y-6">
            {[
              {
                name: 'AddressModel',
                file: 'home/model/address_model.dart',
                fields: ['id', 'addressName', 'cityName', 'street', 'floor', 'details', 'phoneNumber', 'latitude', 'longitude', 'area', 'near'],
              },
              {
                name: 'UserAddressModel',
                file: 'home/model/user_address_model.dart',
                fields: ['defaultAddressId', 'defaultAddress', 'addresses[]'],
              },
              {
                name: 'SpinnerModel',
                file: 'home/spinner/models/spinner_model.dart',
                fields: ['rewards[]', 'trailsCount', 'title', 'description'],
              },
              {
                name: 'SpinnerResult',
                file: 'home/spinner/models/spinner_result.dart',
                fields: ['voucherCode', 'voucherValue', 'name', 'description', 'rewardId', 'voucherValidateTime', 'trailsCount'],
              },
              {
                name: 'SpinnerReward',
                file: 'home/spinner/models/spinner_reward.dart',
                fields: ['id', 'name', 'value', 'type'],
              },
            ].map((model, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-2xl p-7 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                  <span className="font-semibold text-xl text-[var(--color-text-primary)]">{model.name}</span>
                  <code className="text-sm text-[var(--color-text-muted)] font-mono bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg border border-[var(--color-border)]">
                    {model.file}
                  </code>
                </div>
                <div className="flex flex-wrap gap-3">
                  {model.fields.map(field => (
                    <code key={field} className="text-sm bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg text-[var(--color-text-secondary)] font-mono border border-[var(--color-border)]">
                      {field}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* ViewModel Methods */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="font-semibold text-xl">ViewModel Methods</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: 'changeSelectedIndex()', desc: 'Switch bottom navigation tab' },
              { name: 'onPopUp()', desc: 'Handle back button press' },
              { name: 'checkLocation()', desc: 'Verify location availability' },
              { name: 'voteForYourAddress()', desc: 'Submit out-of-coverage vote' },
              { name: 'updateCurrentLocation()', desc: 'Send location to server' },
              { name: 'notificationDialog()', desc: 'Display notification content' },
              { name: 'showPointsEarnedDialog()', desc: 'Show points celebration' },
              { name: 'getSpinnerRewards()', desc: 'Load fortune wheel prizes' },
              { name: 'makeSpin()', desc: 'Execute wheel spin' },
              { name: 'addCode()', desc: 'Redeem promotional spin code' },
              { name: 'buildRewardsList()', desc: 'Create wheel segments' },
              { name: 'resetScreens()', desc: 'Refresh all tab screens' },
            ].map((method, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <code className="text-sm text-indigo-400 font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                  {method.name}
                </code>
                <span className="text-base text-[var(--color-text-secondary)]">{method.desc}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Notification Types */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-pink-500" />
              </div>
              <span className="font-semibold text-xl">Notification Types</span>
            </div>
          }
        >
          <div className="space-y-4">
            {[
              { type: 'Scheduled Order Reminder', desc: 'Reminder about upcoming scheduled order', action: 'Navigate to My Orders' },
              { type: 'Voucher Notification', desc: 'Open vouchers page notification', action: 'Navigate to Vouchers View' },
              { type: 'Order Update (billId)', desc: 'Status update for an order', action: 'Show dialog, can view order details' },
              { type: 'Ticket/Reservation (ticket_id)', desc: 'Update about ticket or reservation', action: 'Show dialog, can view reservation' },
              { type: 'Restaurant Promotion (restaurant_id)', desc: 'Promotion with optional voucher', action: 'Show dialog, can open restaurant with voucher applied' },
              { type: 'Points Earned (new_point)', desc: 'Loyalty points awarded', action: 'Show celebration dialog with points count' },
              { type: 'Generic Notification', desc: 'General message without action', action: 'Show dialog with OK button' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <span className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">{item.type}</h4>
                  <p className="text-base text-[var(--color-text-secondary)] mb-2">{item.desc}</p>
                  <p className="text-sm text-[var(--color-text-muted)]"><strong>Action:</strong> {item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* App Lifecycle */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-amber-500" />
              </div>
              <span className="font-semibold text-xl">App Lifecycle Handling</span>
            </div>
          }
        >
          <div className="space-y-4">
            {[
              { state: 'Resumed', desc: 'App returns to foreground', actions: ['Check location permissions (once)', 'Get current location', 'Check flash sale button visibility'] },
              { state: 'Paused', desc: 'App goes to background', actions: ['Reset permission check flag', 'Send current location to server (60s cooldown)'] },
              { state: 'Hidden', desc: 'App being hidden', actions: ['Finish any active tutorial coach mark'] },
              { state: 'Detached', desc: 'App being terminated', actions: ['Log event'] },
            ].map((item, idx) => (
              <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium">
                    {item.state}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">{item.desc}</span>
                </div>
                <ul className="space-y-2">
                  {item.actions.map((action, actionIdx) => (
                    <li key={actionIdx} className="flex items-center gap-3 text-base text-[var(--color-text-muted)]">
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Bottom Navigation Tabs */}
        <AccordionItem
          title={
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-cyan-500" />
              </div>
              <span className="font-semibold text-xl">Bottom Navigation Tabs</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { index: 0, name: 'Home', screen: 'HomeFeedView', icon: 'home', alwaysVisible: true },
              { index: 1, name: 'Search', screen: 'SearchView', icon: 'search', alwaysVisible: true },
              { index: 2, name: 'BeePay/Wallet', screen: 'NewWalletView', icon: 'wallet', alwaysVisible: false },
              { index: 3, name: 'My Orders', screen: 'MyOrdersView', icon: 'receipt', alwaysVisible: true },
              { index: 4, name: 'Profile', screen: 'ProfileView', icon: 'person', alwaysVisible: true },
            ].map((tab) => (
              <div key={tab.index} className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[var(--color-text-primary)]">{tab.name}</span>
                  <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded">
                    Index: {tab.index}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">{tab.screen}</p>
                {!tab.alwaysVisible && (
                  <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded">
                    Conditional (settings)
                  </span>
                )}
              </div>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

