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
  Folder,
  GitBranch,
  Smartphone,
  Zap,
  UserCircle,
  MapPin,
  CheckCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { userInfoUseCases } from './data/use-cases';
import { userInfoEdgeCases } from './data/edge-cases';
import { userInfoTestCases } from './data/test-cases';
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
  name: 'features/auth/presentation/user_info/',
  type: 'folder' as const,
  children: [
    {
      name: 'user_info_screen.dart',
      type: 'file' as const,
      description: 'Main user info screen UI with form fields, validation, loading states, and navigation',
    },
    {
      name: 'user_info_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing user info form, validation, submission, and state',
    },
    {
      name: 'components/',
      type: 'folder' as const,
      children: [
        {
          name: 'name_section_widget.dart',
          type: 'file' as const,
          description: 'Name input field widget with validation',
        },
        {
          name: 'gender_section_widget.dart',
          type: 'file' as const,
          description: 'Gender selection section with buttons (Male, Female, Other)',
        },
        {
          name: 'gender_button_widget.dart',
          type: 'file' as const,
          description: 'Individual gender button widget',
        },
        {
          name: 'field_name_widget.dart',
          type: 'file' as const,
          description: 'Field label widget for form sections',
        },
        {
          name: 'divider_widget.dart',
          type: 'file' as const,
          description: 'Divider widget for form sections',
        },
        {
          name: 'invite_code_widget.dart',
          type: 'file' as const,
          description: 'Invite code input widget (optional)',
        },
      ],
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        {
          name: 'user_info_state.dart',
          type: 'file' as const,
          description: 'BLoC state model for user info feature',
        },
      ],
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        {
          name: 'user_info_resources.dart',
          type: 'file' as const,
          description: 'Model containing cities, genders, and user info data',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/auth/cities', description: 'Fetch available cities list', params: [] },
  { method: 'GET', path: '/auth/genders', description: 'Fetch available genders list', params: [] },
  { method: 'GET', path: '/auth/user-info', description: 'Fetch existing user information', params: [] },
  { method: 'POST', path: '/auth/update-user-info', description: 'Update user information', params: ['name', 'city_id', 'gender', 'invitation_code'] },
];

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-cyan-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">User Info</strong> feature collects personal information from users during registration or profile updates.
            Users enter their full name, select their gender, and choose their city from a dropdown. The feature validates all fields in real-time
            and enables the Continue button only when all required information is provided.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When users <strong className="text-[var(--color-text-primary)]">submit the form</strong>, their information is saved and navigation occurs based on their flow state.
            <strong className="text-[var(--color-text-primary)]"> New users</strong> are navigated to the friend invite code screen,
            while <strong className="text-[var(--color-text-primary)]">existing users</strong> may skip this step. The feature also checks for
            <strong className="text-[var(--color-text-primary)]"> intro questions</strong> and navigates accordingly. If users came from the cart,
            they are returned to the cart screen after completing user info.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">pre-filled forms</strong> for existing users,
            <strong className="text-[var(--color-text-primary)]"> real-time form validation</strong> that enables/disables the Continue button,
            <strong className="text-[var(--color-text-primary)]"> language preference</strong> updates based on user info,
            and <strong className="text-[var(--color-text-primary)]">parallel data loading</strong> of cities, genders, and user info for better performance.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-cyan-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                All users during registration or when updating their profile information
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Personal information collection, form validation, onboarding flow, profile updates
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                After OTP verification, profile update flow, registration completion
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-cyan-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: UserCircle, title: 'Name Entry', description: 'Enter full name with real-time validation', color: 'text-cyan-500' },
              { icon: Users, title: 'Gender Selection', description: 'Select gender from buttons (Male, Female, Other)', color: 'text-blue-500' },
              { icon: MapPin, title: 'City Selection', description: 'Select city from dropdown list', color: 'text-green-500' },
              { icon: CheckCircle, title: 'Real-Time Validation', description: 'Form validates all fields and enables Continue button when valid', color: 'text-purple-500' },
              { icon: UserCircle, title: 'Pre-filled Forms', description: 'Existing user info is pre-filled in form fields', color: 'text-pink-500' },
              { icon: Zap, title: 'Parallel Data Loading', description: 'Cities, genders, and user info loaded simultaneously', color: 'text-amber-500' },
              { icon: FileText, title: 'Language Preference', description: 'App language updates based on user preference', color: 'text-indigo-500' },
              { icon: Shield, title: 'Navigation Flow', description: 'Smart navigation based on user state (new user, from cart, intro questions)', color: 'text-red-500' },
              { icon: AlertCircle, title: 'Error Handling', description: 'Handle network errors, validation errors, and submission failures gracefully', color: 'text-gray-500' },
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
          <CardDescription className="text-base">All API endpoints used by the User Info feature</CardDescription>
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
              <UserCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Form Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Form validation occurs in real-time as user types or selects. Name is validated using Validators.isValidName(),
                  gender and city are checked for null values. Continue button is enabled only when all fields are valid.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Parallel Data Loading
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Cities, genders, and user info are fetched in parallel using run3() utility function. This improves performance
                  by loading all required data simultaneously rather than sequentially.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Navigation Flow Logic
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Navigation depends on multiple factors: isNewUser flag (shows friend invite), intro questions availability,
                  fromCart flag (returns to cart), and login status. Navigation is handled sequentially with proper error handling.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Language Preference
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When user info loads, if user has a language preference that differs from current app language,
                  the app language is updated using EasyLocalization. This ensures users see the app in their preferred language.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Gender Selection
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Gender selection uses button widgets (Male, Female, Other). Selection state is managed in ViewModel.
                  Form validation checks if gender is selected before enabling Continue button.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  City Dropdown
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  City selection uses AppDropDown widget. Cities are loaded from API and displayed in dropdown.
                  Selected city is stored in ViewModel state and validated before form submission.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UserInfoFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-cyan-500">User Info</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              User Info Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={userInfoUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={userInfoEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="user-info" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={userInfoTestCases} featureName="User Info" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}


