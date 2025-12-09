import { useState } from 'react';
import {
  User,
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
  Mail,
  Wallet,
  Share2,
  Globe,
  DollarSign,
  HelpCircle,
  MessageCircle,
  Camera,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { profileUseCases } from './data/use-cases';
import { profileEdgeCases } from './data/edge-cases';
import { profileTestCases } from './data/test-cases';
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
  name: 'profile/',
  type: 'folder' as const,
  children: [
    {
      name: 'edit_my_profile/',
      type: 'folder' as const,
      children: [
        {
          name: 'widget/',
          type: 'folder' as const,
          children: [
            { name: 'profile_view.dart', type: 'file' as const, description: 'Main profile screen UI with navigation options' },
            { name: 'profile_sub_title.dart', type: 'file' as const, description: 'Reusable subtitle widget for profile sections' },
            { name: 'title_with_image.dart', type: 'file' as const, description: 'Title widget with icon for profile sections' },
          ]
        },
        {
          name: 'view_model/',
          type: 'folder' as const,
          children: [
            { name: 'profile_viewmodel.dart', type: 'file' as const, description: 'MobX ViewModel managing profile state, favorites, profile icon' },
          ]
        },
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            { name: 'user_info_model.dart', type: 'file' as const, description: 'User information data model' },
          ]
        },
      ]
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        { name: 'profile_service.dart', type: 'file' as const, description: 'Profile service interface and implementation' },
      ]
    },
    {
      name: 'app_language/',
      type: 'folder' as const,
      children: [
        { name: 'language_bottomsheet.dart', type: 'file' as const, description: 'Language selection bottom sheet' },
      ]
    },
    {
      name: 'currency/',
      type: 'folder' as const,
      children: [
        { name: 'currency_bottomsheet.dart', type: 'file' as const, description: 'Currency selection bottom sheet' },
      ]
    },
  ]
};

export function ProfileFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-500">Profile</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Profile Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={profileUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={profileEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="profile" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={profileTestCases} featureName="Profile" />}
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
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Profile</strong> feature is the central hub where users 
            access their account information, manage settings, and navigate to various account-related features. It displays 
            the user's name and profile image (iOS only), and provides access to edit profile, account details, settings, 
            and help center.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Users can <strong className="text-[var(--color-text-primary)]">navigate to account sections</strong> like My Orders, 
            My Addresses, Favorites, and My Vouchers. They can <strong className="text-[var(--color-text-primary)]">change app language</strong> 
            and <strong className="text-[var(--color-text-primary)]">currency</strong> from settings, access help center for 
            privacy policy, terms, FAQs, and about us, and use <strong className="text-[var(--color-text-primary)]">live chat</strong> 
            for customer support.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The feature adapts based on user state - showing different options for logged-in vs logged-out users. It also 
            conditionally displays features like <strong className="text-[var(--color-text-primary)]">Bee Pay Service</strong> 
            (wallet), <strong className="text-[var(--color-text-primary)]">Invite Friends</strong>, and ticketing options 
            (My Tickets, My Passengers) based on feature flags and app configuration.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All app users, both logged-in and logged-out, accessing their profile and account settings
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Settings className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Central navigation hub, account management, settings, help center, profile customization
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Bottom navigation "Profile" tab, deep links, navigation from other screens
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: User, title: 'Profile Header', description: 'Displays user name and profile image (iOS only) with edit option', color: 'text-blue-500' },
              { icon: Settings, title: 'Edit Profile', description: 'Navigate to edit profile screen to update account information', color: 'text-purple-500' },
              { icon: Mail, title: 'Account Details', description: 'Access My Orders, My Addresses, Favorites, My Vouchers', color: 'text-green-500' },
              { icon: Wallet, title: 'Bee Pay Service', description: 'Access wallet for payments and transactions (if enabled)', color: 'text-yellow-500' },
              { icon: Share2, title: 'Invite Friends', description: 'Share and earn rewards by inviting friends (if enabled)', color: 'text-pink-500' },
              { icon: Globe, title: 'Language Settings', description: 'Change app language with bottom sheet selection', color: 'text-teal-500' },
              { icon: DollarSign, title: 'Currency Settings', description: 'Change app currency with bottom sheet selection', color: 'text-orange-500' },
              { icon: HelpCircle, title: 'Help Center', description: 'Access Privacy Policy, Terms, FAQs, About Us, Join Us as Driver', color: 'text-red-500' },
              { icon: MessageCircle, title: 'Live Chat', description: 'Floating action button for customer support chat (if enabled)', color: 'text-indigo-500' },
              { icon: Camera, title: 'Profile Image', description: 'Change profile image on iOS devices using image picker', color: 'text-cyan-500' },
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
            Navigation Routes
          </CardTitle>
          <CardDescription className="text-base">All navigation routes used by the Profile feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { route: 'EDIT_PROFILE', description: 'Navigate to edit profile screen' },
              { route: 'MY_ORDERS', description: 'Navigate to my orders screen' },
              { route: 'ADDRESSES', description: 'Navigate to addresses screen' },
              { route: 'FAVORITES', description: 'Navigate to favorites screen' },
              { route: 'VOUCHERS_VIEW', description: 'Navigate to vouchers screen' },
              { route: 'INVITE_FRIENDS', description: 'Navigate to invite friends screen' },
              { route: 'walletView', description: 'Navigate to wallet screen' },
              { route: 'PRIVACY_POLICY', description: 'Navigate to privacy policy screen' },
              { route: 'TERMS', description: 'Navigate to terms screen' },
              { route: 'Main_FAQ', description: 'Navigate to FAQs screen' },
              { route: 'ABOUT_US', description: 'Navigate to about us screen' },
              { route: 'PHONE_NUMBER_VIEW', description: 'Navigate to login screen' },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <span className="px-2 py-1 rounded text-xs font-mono font-semibold bg-blue-500/20 text-blue-400">
                      ROUTE
                    </span>
                    <div className="flex-1">
                      <code className="text-sm font-mono text-[var(--color-text-primary)]">{item.route}</code>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{item.description}</p>
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
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-green-500" />
            </div>
            Key Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'ProfileView', description: 'Main profile screen widget with all sections and navigation', file: 'profile_view.dart' },
              { name: 'ProfileViewModel', description: 'MobX ViewModel managing profile state, favorites, profile icon changes', file: 'profile_viewmodel.dart' },
              { name: 'LanguageBottomsheet', description: 'Bottom sheet for language selection with available languages', file: 'language_bottomsheet.dart' },
              { name: 'CurrencyBottomsheet', description: 'Bottom sheet for currency selection with available currencies', file: 'currency_bottomsheet.dart' },
              { name: 'TitleWithImage', description: 'Reusable widget for section titles with icons', file: 'title_with_image.dart' },
              { name: 'ProfileSubTitle', description: 'Reusable widget for tappable subtitle options in sections', file: 'profile_sub_title.dart' },
              { name: 'LiveChatButton', description: 'Floating action button for live chat support', file: 'live_chat_button_widget.dart' },
            ].map((component, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-mono font-semibold text-[var(--color-text-primary)]">{component.name}</code>
                        <span className="text-xs text-[var(--color-text-muted)]">({component.file})</span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">{component.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

