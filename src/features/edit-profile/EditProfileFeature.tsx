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
  Zap,
  CheckCircle,
  FileText,
  Calendar,
  MapPin,
  Mail,
  Phone,
  LogOut,
  Trash2,
  Star,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { editProfileUseCases } from './data/use-cases';
import { editProfileEdgeCases } from './data/edge-cases';
import { editProfileTestCases } from './data/test-cases';
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
  name: 'features/profile/presentation/edit_profile/',
  type: 'folder' as const,
  children: [
    {
      name: 'edit_profile_screen.dart',
      type: 'file' as const,
      description: 'Main screen with loading states, error handling, loyalty widget, form, logout, and delete account buttons',
    },
    {
      name: 'edit_profile_viewmodel.dart',
      type: 'file' as const,
      description: 'BLoC ViewModel managing initial data fetching, form controllers, user info update, logout, and account deletion',
    },
    {
      name: 'component/',
      type: 'folder' as const,
      children: [
        {
          name: 'edit_profile_form.dart',
          type: 'file' as const,
          description: 'Form widget with name, email, date of birth, mobile, gender, and city fields with validation',
        },
        {
          name: 'delete_account_bottom_sheet.dart',
          type: 'file' as const,
          description: 'Bottom sheet widget for delete account confirmation dialog',
        },
      ],
    },
    {
      name: 'state/',
      type: 'folder' as const,
      children: [
        {
          name: 'edit_profile_state.dart',
          type: 'file' as const,
          description: 'BLoC state class with async states for initial data, update, logout, delete account, and selected gender/city',
        },
      ],
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        {
          name: 'edit_profile_resources.dart',
          type: 'file' as const,
          description: 'Resources model containing cities, genders, user info, and loyalty info',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/cities', description: 'Fetch available cities list', params: [] },
  { method: 'GET', path: '/genders', description: 'Fetch available genders list', params: [] },
  { method: 'GET', path: '/user/info', description: 'Fetch current user information', params: [] },
  { method: 'GET', path: '/loyalty/tier', description: 'Fetch loyalty tier information', params: [] },
  { method: 'PUT', path: '/user/info', description: 'Update user profile information', params: ['name', 'email', 'cityId', 'gender', 'birthday'] },
  { method: 'POST', path: '/auth/logout', description: 'Logout user from account', params: [] },
  { method: 'DELETE', path: '/user/account', description: 'Delete user account', params: [] },
];

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Edit Profile</strong> feature allows users to view and edit their profile information.
            When users access the edit profile screen, they see their <strong className="text-[var(--color-text-primary)]">loyalty points and tier information</strong> displayed at the top,
            showing a welcome message with their name, a circular progress indicator showing points progress, current points, and points remaining to reach the next tier.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Users can edit various profile fields: <strong className="text-[var(--color-text-primary)]">full name</strong> (with validation),
            <strong className="text-[var(--color-text-primary)]"> email address</strong> (with email validation),
            <strong className="text-[var(--color-text-primary)]"> date of birth</strong> (can only be set if not previously set),
            <strong className="text-[var(--color-text-primary)]"> mobile number</strong> (read-only, displayed from UserManager),
            <strong className="text-[var(--color-text-primary)]"> gender</strong> (selected from dropdown),
            and <strong className="text-[var(--color-text-primary)]">city</strong> (selected from dropdown).
            All fields are pre-filled with current user data when the screen loads.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Additional features include <strong className="text-[var(--color-text-primary)]">logout functionality</strong> that logs out the user and resets viewmodels,
            <strong className="text-[var(--color-text-primary)]"> delete account functionality</strong> (iOS only) that deletes the account and all baskets,
            <strong className="text-[var(--color-text-primary)]"> form validation</strong> ensuring name and email are valid before saving,
            and <strong className="text-[var(--color-text-primary)]">smart navigation</strong> after save (to splash if from deep link, otherwise pop navigation).
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Logged-in users who want to update their profile information
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Profile management, user data updates, account management, loyalty points display
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Profile section, settings menu, account management
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
              { icon: FileText, title: 'Edit Name', description: 'Edit full name with validation', color: 'text-blue-500' },
              { icon: Mail, title: 'Edit Email', description: 'Edit email address with email validation', color: 'text-green-500' },
              { icon: Calendar, title: 'Edit Date of Birth', description: 'Set date of birth (only if not previously set)', color: 'text-purple-500' },
              { icon: Phone, title: 'View Mobile', description: 'View mobile number (read-only)', color: 'text-pink-500' },
              { icon: User, title: 'Select Gender', description: 'Select gender from dropdown', color: 'text-amber-500' },
              { icon: MapPin, title: 'Select City', description: 'Select city from dropdown', color: 'text-indigo-500' },
              { icon: Star, title: 'Loyalty Points', description: 'View loyalty points and tier progress', color: 'text-cyan-500' },
              { icon: LogOut, title: 'Logout', description: 'Logout from account and reset viewmodels', color: 'text-red-500' },
              { icon: Trash2, title: 'Delete Account', description: 'Delete account and all baskets (iOS only)', color: 'text-orange-500' },
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
          <CardDescription className="text-base">BLoC architecture with ViewModel state management</CardDescription>
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
          <CardDescription className="text-base">All API endpoints used by the Edit Profile feature</CardDescription>
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
                      endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
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
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            Key Implementation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="info-box">
            <div className="flex items-start gap-4">
              <User className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Initial Data Loading
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Initial data is fetched in parallel using run4 helper: cities, genders, user info, and loyalty info.
                  After data is loaded, form controllers are pre-filled with current values, and gender/city dropdowns show current selections.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Form Controllers
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Form uses TextEditingControllers for name, email, date of birth, and mobile.
                  Date of birth controller stores date in yyyy-MM-dd format. Mobile controller is read-only and displays value from UserManager.
                  Gender and city selections are stored in state as selectedGender and selectedCity.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Form Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Form validation uses Validators.isValidName for name field and Validators.isValidEmail for email field.
                  Validation occurs on form submission. Invalid fields show error messages. Date of birth can only be edited if it was not previously set (canEditDate computed property).
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Profile Update
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When saving, userInfo is updated using copyWith with trimmed name and email, selected city ID, selected gender ID, and parsed date of birth.
                  After successful update, navigation depends on context: if from deep link launch, navigates to splash; otherwise, pops navigation.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Loyalty Points Display
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Loyalty widget shows welcome message with user name, circular progress indicator (userPoint / endPoint),
                  current points, and points remaining to next tier if applicable. Progress shows 100% if endPoint is null.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Logout and Delete Account
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Logout resets SpinnerViewModel and HomeViewModel, then navigates to splash screen.
                  Delete account (iOS only) deletes all baskets using MyCartViewModel.deleteAllBaskets(), then navigates to splash screen.
                  Both operations show loading states and handle errors gracefully.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EditProfileFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-500">Edit Profile</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Edit Profile Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={editProfileUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={editProfileEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="edit-profile" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={editProfileTestCases} featureName="Edit Profile" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

