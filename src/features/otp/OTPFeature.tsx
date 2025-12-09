import { useState } from 'react';
import {
  Shield,
  Users,
  ShieldCheck,
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
import { otpUseCases } from './data/use-cases';
import { otpEdgeCases } from './data/edge-cases';
import { otpTestCases } from './data/test-cases';
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
  { id: 'edge-cases', label: 'Edge Cases', icon: ShieldCheck },
  { id: 'flow-diagrams', label: 'Flow Diagrams', icon: Workflow },
  { id: 'qa-tests', label: 'QA Tests', icon: Settings },
  { id: 'implementation', label: 'Implementation', icon: Code2 },
];

const folderStructure = {
  name: 'features/auth/presentation/otp/',
  type: 'folder' as const,
  children: [
    {
      name: 'otp_screen.dart',
      type: 'file' as const,
      description: 'Main OTP verification screen UI with input fields, resend option, and navigation',
    },
    {
      name: 'otp_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing OTP verification, resend, timer, and state',
    },
    {
      name: 'components/',
      type: 'folder' as const,
      children: [
        {
          name: 'otp_text_form_widget.dart',
          type: 'file' as const,
          description: '6-digit OTP input field widget with SMS autofill support',
        },
        {
          name: 'resend_code_bottom_sheet.dart',
          type: 'file' as const,
          description: 'Bottom sheet for resending OTP via SMS or phone call',
        },
        {
          name: 'count_down_otp.dart',
          type: 'file' as const,
          description: 'Countdown timer widget for resend cooldown',
        },
        {
          name: 'sms_help_message_widget.dart',
          type: 'file' as const,
          description: 'Widget displaying phone number and SMS help message',
        },
        {
          name: 'otp_via_sms.dart',
          type: 'file' as const,
          description: 'Widget for resending OTP via SMS option',
        },
        {
          name: 'otp_via_call.dart',
          type: 'file' as const,
          description: 'Widget for resending OTP via phone call option',
        },
      ],
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        {
          name: 'otp_state.dart',
          type: 'file' as const,
          description: 'BLoC state model for OTP feature',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'POST', path: '/auth/verify-otp', description: 'Verify OTP code', params: ['otp'] },
  { method: 'POST', path: '/auth/resend-otp', description: 'Resend OTP code', params: ['phone_call'] },
];

function OverviewTab() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[var(--color-primary)]" />
            OTP Verification Feature Overview
          </CardTitle>
          <CardDescription>
            Phone number verification using One-Time Password (OTP) codes sent via SMS or phone call
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Feature Description</h3>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              The OTP Verification feature enables users to verify their phone numbers by entering a 6-digit code
              received via SMS or phone call. The feature includes SMS autofill, automatic verification when 6 digits
              are entered, resend options with countdown timer, and error handling for invalid or expired codes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Key Capabilities</h3>
            <ul className="space-y-2 text-base text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Enter 6-digit OTP code via input fields</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>SMS autofill automatically fills code from received SMS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Automatic verification when 6 digits are entered</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Resend OTP via SMS or phone call</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Countdown timer (20 seconds) prevents spam resends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Handle invalid, expired, or already used codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Navigate to next screen on successful verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)] mt-1">•</span>
                <span>Back navigation to phone number screen</span>
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
              The OTP Verification feature follows BLoC architecture with clear separation between UI, ViewModel (Cubit), and State.
              The feature uses BLoC pattern for state management, includes SMS autofill integration, and proper error handling.
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

export function OTPFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-indigo-500">OTP Verification</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              OTP Verification Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={otpUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={otpEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="otp" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={otpTestCases} featureName="OTP Verification" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

