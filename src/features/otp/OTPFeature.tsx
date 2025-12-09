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
  Smartphone,
  Zap,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle,
  ArrowLeft,
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
            The <strong className="text-[var(--color-text-primary)]">OTP Verification</strong> feature enables users to verify their phone numbers by entering a 6-digit code
            received via SMS or phone call. After entering a phone number, users receive an OTP code and must enter it to complete verification.
            The feature displays 6 input fields for entering the code, shows the phone number where the code was sent, and provides options to resend if needed.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When users <strong className="text-[var(--color-text-primary)]">receive SMS</strong> with the OTP code, the app can <strong className="text-[var(--color-text-primary)]">automatically fill</strong> the code using SMS autofill,
            making verification faster. Users can also <strong className="text-[var(--color-text-primary)]">manually enter</strong> the code digit by digit.
            Once 6 digits are entered, <strong className="text-[var(--color-text-primary)]">verification starts automatically</strong> without needing to tap a button.
            If users don't receive the code, they can <strong className="text-[var(--color-text-primary)]">resend via SMS or phone call</strong>.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">countdown timer</strong> (20 seconds) that prevents spam resend requests,
            <strong className="text-[var(--color-text-primary)]"> error handling</strong> for invalid, expired, or already used codes,
            and <strong className="text-[var(--color-text-primary)]">back navigation</strong> that allows users to return to phone number screen if they want to change their number.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-indigo-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users during registration or phone number verification
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Phone verification, SMS autofill, security, resend options, error handling
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Phone number entry screen, registration flow, login flow
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
              <Shield className="w-6 h-6 text-indigo-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: '6-Digit Code Input', description: 'Enter OTP code via 6 input fields with automatic focus movement', color: 'text-indigo-500' },
              { icon: MessageSquare, title: 'SMS Autofill', description: 'Automatically fill code from received SMS message', color: 'text-blue-500' },
              { icon: CheckCircle, title: 'Auto Verification', description: 'Verification starts automatically when 6 digits are entered', color: 'text-green-500' },
              { icon: MessageSquare, title: 'Resend via SMS', description: 'Request new OTP code via SMS if not received', color: 'text-teal-500' },
              { icon: Phone, title: 'Resend via Call', description: 'Request OTP code via automated phone call', color: 'text-purple-500' },
              { icon: Clock, title: 'Countdown Timer', description: '20-second timer prevents spam resend requests', color: 'text-amber-500' },
              { icon: ShieldCheck, title: 'Error Handling', description: 'Handle invalid, expired, or already used codes gracefully', color: 'text-red-500' },
              { icon: ArrowLeft, title: 'Back Navigation', description: 'Navigate back to phone number screen to change number', color: 'text-gray-500' },
              { icon: Zap, title: 'Phone Display', description: 'Show phone number where code was sent for user confirmation', color: 'text-pink-500' },
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

