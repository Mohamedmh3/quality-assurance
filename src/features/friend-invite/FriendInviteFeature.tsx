import { useState } from 'react';
import {
  UserPlus,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  ChevronRight,
  Folder,
  GitBranch,
  Smartphone,
  Zap,
  Gift,
  CheckCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { friendInviteUseCases } from './data/use-cases';
import { friendInviteEdgeCases } from './data/edge-cases';
import { friendInviteTestCases } from './data/test-cases';
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
  name: 'features/auth/presentation/friend_invite/',
  type: 'folder' as const,
  children: [
    {
      name: 'add_invite_friend_code_screen.dart',
      type: 'file' as const,
      description: 'Main friend invite code screen UI with input field, apply button, and skip option',
    },
    {
      name: 'add_invite_friend_code_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing invite code logic, validation, and API calls',
    },
    {
      name: 'components/',
      type: 'folder' as const,
      children: [
        {
          name: 'code_section_widget.dart',
          type: 'file' as const,
          description: 'Invite code input field widget with validation',
        },
      ],
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        {
          name: 'friend_invite_state.dart',
          type: 'file' as const,
          description: 'BLoC state model for friend invite feature',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'POST', path: '/auth/apply-invite-code', description: 'Apply friend invite code', params: ['code'] },
];

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Friend Invite</strong> feature allows users to enter referral codes from friends during registration or onboarding.
            Users can apply valid codes to receive rewards, discounts, or benefits, or skip code entry to continue without a code.
            The feature displays an input field, instructions on how to find codes, and options to apply or skip.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When users <strong className="text-[var(--color-text-primary)]">enter a valid code</strong>, the app verifies it with the backend,
            grants rewards to both the referrer and the new user, and <strong className="text-[var(--color-text-primary)]">navigates to the next step</strong> in the flow.
            If users <strong className="text-[var(--color-text-primary)]">skip code entry</strong>, they can continue with registration normally.
            The feature includes <strong className="text-[var(--color-text-primary)]">real-time validation</strong> to ensure codes are in the correct format before submission.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special handling includes <strong className="text-[var(--color-text-primary)]">error messages</strong> for invalid, expired, or already used codes,
            <strong className="text-[var(--color-text-primary)]"> navigation logic</strong> that considers user flow state (from cart, logged in, etc.),
            and <strong className="text-[var(--color-text-primary)]">intro questions</strong> that may appear before final navigation.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-purple-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                New users during registration or onboarding who have friend referral codes
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Referral rewards, user acquisition, code validation, flexible onboarding flow
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Registration flow, onboarding process, user info screen
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
              <UserPlus className="w-6 h-6 text-purple-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: UserPlus, title: 'Code Entry', description: 'Enter friend invite codes via input field with real-time validation', color: 'text-purple-500' },
              { icon: CheckCircle, title: 'Code Validation', description: 'Real-time validation ensures codes are in correct format', color: 'text-green-500' },
              { icon: Gift, title: 'Reward Application', description: 'Apply valid codes to receive referral rewards and benefits', color: 'text-pink-500' },
              { icon: Zap, title: 'Skip Option', description: 'Skip code entry to continue registration without a code', color: 'text-amber-500' },
              { icon: Shield, title: 'Error Handling', description: 'Handle invalid, expired, or already used codes gracefully', color: 'text-red-500' },
              { icon: Settings, title: 'Flow Navigation', description: 'Navigate based on user flow state (from cart, logged in, etc.)', color: 'text-blue-500' },
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

export function FriendInviteFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-700 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-purple-500">Friend Invite</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Friend Invite Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={friendInviteUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={friendInviteEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="friend-invite" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={friendInviteTestCases} featureName="Friend Invite" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

