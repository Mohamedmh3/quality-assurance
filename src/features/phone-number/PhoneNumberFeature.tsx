import { useState } from 'react';
import {
  Phone,
  Users,
  Shield,
  Workflow,
  Settings,
  Code2,
  Layers,
  Folder,
  GitBranch,
  Smartphone,
  Zap,
  Globe,
  CheckCircle,
  FileText,
  UserPlus,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { phoneNumberUseCases } from './data/use-cases';
import { phoneNumberEdgeCases } from './data/edge-cases';
import { phoneNumberTestCases } from './data/test-cases';
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
  name: 'features/auth/presentation/phone_number/',
  type: 'folder' as const,
  children: [
    {
      name: 'phone_number_screen.dart',
      type: 'file' as const,
      description: 'Main phone number entry screen with loading states, error handling, and navigation',
    },
    {
      name: 'phone_number_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing phone number entry, country selection, validation, login, and state',
    },
    {
      name: 'components/',
      type: 'folder' as const,
      children: [
        {
          name: 'phone_number_body.dart',
          type: 'file' as const,
          description: 'Main body widget with phone entry form, previous numbers list, and buttons',
        },
        {
          name: 'phone_number_text_field.dart',
          type: 'file' as const,
          description: 'Phone number input field with country code picker and validation',
        },
        {
          name: 'guest_button_widget.dart',
          type: 'file' as const,
          description: 'Continue as guest button widget with location permission handling',
        },
        {
          name: 'show_confirm_number_dialog.dart',
          type: 'file' as const,
          description: 'Confirmation dialog showing full phone number before submission',
        },
        {
          name: 'phone_number_terms_widget.dart',
          type: 'file' as const,
          description: 'Terms and privacy policy acceptance widget',
        },
        {
          name: 'open_terms_bottom_sheet.dart',
          type: 'file' as const,
          description: 'Bottom sheet for displaying and accepting terms and privacy policy',
        },
        {
          name: 'privacy_policy_dialog_widget.dart',
          type: 'file' as const,
          description: 'Dialog showing full privacy policy content',
        },
        {
          name: 'terms_dialog_body_widget.dart',
          type: 'file' as const,
          description: 'Dialog body showing full terms and conditions content',
        },
        {
          name: 'app_bar_widget.dart',
          type: 'file' as const,
          description: 'App bar widget for phone number screen (optional)',
        },
      ],
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        {
          name: 'phone_number_state.dart',
          type: 'file' as const,
          description: 'BLoC state model for phone number feature',
        },
      ],
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        {
          name: 'phone_number_resources.dart',
          type: 'file' as const,
          description: 'Model containing countries list and previous phone numbers',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/auth/countries', description: 'Fetch available countries with dial codes and validation rules', params: [] },
  { method: 'GET', path: '/auth/previous-phone-numbers', description: 'Fetch previous phone numbers for device', params: ['device_id'] },
  { method: 'POST', path: '/auth/login', description: 'Initiate login with phone number', params: ['mobile', 'dial_code'] },
  { method: 'GET', path: '/auth/terms', description: 'Fetch terms and conditions content', params: [] },
];

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-teal-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Phone Number</strong> feature is the entry point for user authentication.
            Users enter their phone number with country code to initiate the login process. The feature displays a phone number input field,
            country code picker, and options to continue as guest or use previously used phone numbers.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When users <strong className="text-[var(--color-text-primary)]">enter a valid phone number</strong>, they must confirm it in a dialog,
            then <strong className="text-[var(--color-text-primary)]">accept terms and privacy policy</strong> before the login request is sent.
            If users have <strong className="text-[var(--color-text-primary)]">previously logged in</strong> on the same device, a list of previous phone numbers
            is displayed for quick selection. Users can also <strong className="text-[var(--color-text-primary)]">continue as guest</strong> to browse without logging in.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">real-time phone validation</strong> that checks format according to selected country,
            <strong className="text-[var(--color-text-primary)]"> country code picker</strong> with search functionality,
            <strong className="text-[var(--color-text-primary)]"> device ID generation</strong> for guest users to track previous numbers,
            and <strong className="text-[var(--color-text-primary)]">terms and privacy policy</strong> acceptance flow before login.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-teal-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users during registration or login, including new users and returning users
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                User authentication, phone validation, country selection, guest mode, terms acceptance
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                App launch, registration flow, login flow, logout redirect
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-teal-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: 'Phone Number Entry', description: 'Enter phone number with country code selection and real-time validation', color: 'text-teal-500' },
              { icon: Globe, title: 'Country Code Picker', description: 'Select country code from list with search functionality', color: 'text-blue-500' },
              { icon: CheckCircle, title: 'Real-Time Validation', description: 'Phone number validated according to country format rules', color: 'text-green-500' },
              { icon: UserPlus, title: 'Previous Numbers', description: 'Display and select from previously used phone numbers', color: 'text-purple-500' },
              { icon: AlertCircle, title: 'Confirmation Dialog', description: 'Confirm phone number before submission with edit option', color: 'text-amber-500' },
              { icon: FileText, title: 'Terms Acceptance', description: 'Accept terms and conditions and privacy policy before login', color: 'text-pink-500' },
              { icon: Users, title: 'Guest Mode', description: 'Continue browsing without logging in', color: 'text-gray-500' },
              { icon: Shield, title: 'Device ID Tracking', description: 'Generate and track device ID for guest users and previous numbers', color: 'text-indigo-500' },
              { icon: Zap, title: 'Error Handling', description: 'Handle network errors, validation errors, and login failures gracefully', color: 'text-red-500' },
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
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-blue-500" />
            </div>
            API Endpoints
          </CardTitle>
          <CardDescription className="text-base">All API endpoints used by the Phone Number feature</CardDescription>
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
              <Phone className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Phone Number Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Phone numbers are validated in real-time according to country-specific rules (min/max length).
                  Validation occurs as user types, and Submit button is enabled only when phone number is valid.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Country Code Selection
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Country code picker uses country_code_picker package. Default country is determined from server response.
                  When country changes, phone validation rules update automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <UserPlus className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Previous Phone Numbers
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Previous phone numbers are fetched using device ID (consistent UDID). If user is logged in, device ID is not used.
                  Previous numbers are displayed as selectable cards with username.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Device ID Generation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  For guest users, consistent UDID is generated using flutter_udid package. Device ID is stored in StaticData
                  and used for fetching previous phone numbers and tracking guest sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Terms and Privacy Policy
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Terms and privacy policy are fetched from server. Bottom sheet displays acceptance UI.
                  Users can view full terms and privacy policy in separate dialogs before accepting.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Guest Mode Navigation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Guest mode checks location permissions. If granted, navigates to home screen.
                  If denied, navigates to permission request screen. Uses GetX for navigation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PhoneNumberFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Phone Number Feature
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Phone number entry, validation, and authentication initiation
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--color-border)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2',
                  activeTab === tab.id
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6 shadow-lg">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'use-cases' && <UseCaseSection useCases={phoneNumberUseCases} />}
          {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={phoneNumberEdgeCases} />}
          {activeTab === 'flow-diagrams' && <FlowchartSection featureId="phone-number" />}
          {activeTab === 'qa-tests' && <QATestingGuide testCases={phoneNumberTestCases} featureName="Phone Number" />}
          {activeTab === 'implementation' && <ImplementationTab />}
        </div>
      </div>
    </div>
  );
}

