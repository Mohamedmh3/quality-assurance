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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-[var(--color-primary)]" />
            Friend Invite Feature Overview
          </CardTitle>
          <CardDescription>
            Allow users to enter friend invite codes to receive referral rewards and benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Feature Description</h3>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              The Friend Invite feature enables users to enter referral codes from friends during registration or onboarding.
              Users can apply valid codes to receive rewards, or skip code entry to continue without a code.
              The feature includes code validation, error handling, and navigation based on user flow state.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Key Capabilities</h3>
            <ul className="space-y-2 text-base text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Enter friend invite codes via input field</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Real-time code validation as user types</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Apply valid codes to receive rewards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Skip code entry to continue without code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Handle invalid, expired, or already used codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Navigate based on user flow (from cart, logged in, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Show intro questions if needed before final navigation</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Architecture</h3>
            <div className="flex items-center gap-2 mb-3">
              <ArchitectureBadge type="BLoC" />
              <StatusBadge status="Stable" />
            </div>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              The Friend Invite feature follows BLoC architecture with clear separation between UI, ViewModel (Cubit), and State.
              The feature uses BLoC pattern for state management and includes proper error handling and navigation logic.
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

