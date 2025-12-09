import { useState } from 'react';
import {
  AlertTriangle,
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
  Search,
  MessageSquare,
  List,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { reportingUseCases } from './data/use-cases';
import { reportingEdgeCases } from './data/edge-cases';
import { reportingTestCases } from './data/test-cases';
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
  name: 'features/restaurant/reporting/',
  type: 'folder' as const,
  children: [
    {
      name: 'presentation/',
      type: 'folder' as const,
      children: [
        {
          name: 'report_issue_selection_screen.dart',
          type: 'file' as const,
          description: 'Main screen with BLoC listeners for loading, error, and success states',
        },
        {
          name: 'reporting_viewmodel.dart',
          type: 'file' as const,
          description: 'BLoC ViewModel managing issue types, reason selection, step navigation, dish search, and submission',
        },
        {
          name: 'components/',
          type: 'folder' as const,
          children: [
            {
              name: 'report_issue_steps_view.dart',
              type: 'file' as const,
              description: 'Multi-step form view with progress header and reason forms',
            },
            {
              name: 'report_reason_form.dart',
              type: 'file' as const,
              description: 'Form for individual reason with fields based on reason metadata',
            },
            {
              name: 'report_progress_header.dart',
              type: 'file' as const,
              description: 'Progress indicator showing current step and total steps',
            },
            {
              name: 'report_dish_search_and_picker_sheet.dart',
              type: 'file' as const,
              description: 'Bottom sheet for searching and selecting dishes',
            },
            {
              name: 'report_dish_selection_field.dart',
              type: 'file' as const,
              description: 'Dish selection field widget',
            },
            {
              name: 'report_additional_info_field.dart',
              type: 'file' as const,
              description: 'Note input field widget',
            },
            {
              name: 'report_special_fields.dart.dart',
              type: 'file' as const,
              description: 'Special fields widget for date and app name',
            },
            {
              name: 'report_submit_button.dart',
              type: 'file' as const,
              description: 'Submit button widget with loading state',
            },
            {
              name: 'report_back_button_header.dart',
              type: 'file' as const,
              description: 'Back button header widget',
            },
            {
              name: 'report_issue_selection_components/',
              type: 'folder' as const,
              children: [
                {
                  name: 'report_issue_steps_body.dart',
                  type: 'file' as const,
                  description: 'Body widget for issue type selection',
                },
                {
                  name: 'report_issues_section.dart',
                  type: 'file' as const,
                  description: 'Section widget displaying issue types and reasons',
                },
              ],
            },
          ],
        },
        {
          name: 'state/',
          type: 'folder' as const,
          children: [
            {
              name: 'reporting_state.dart',
              type: 'file' as const,
              description: 'BLoC state class with issue types, selection state, flow state, drafts, and search state',
            },
          ],
        },
        {
          name: 'model/',
          type: 'folder' as const,
          children: [
            {
              name: 'reason_model.dart',
              type: 'file' as const,
              description: 'Reason metadata model with flags for date, dish search, note, app name',
            },
          ],
        },
      ],
    },
    {
      name: 'data/',
      type: 'folder' as const,
      children: [
        {
          name: 'repository/',
          type: 'folder' as const,
          children: [
            {
              name: 'reporting_repository.dart',
              type: 'file' as const,
              description: 'Repository for reporting data operations',
            },
          ],
        },
        {
          name: 'remote/',
          type: 'folder' as const,
          children: [
            {
              name: 'service/',
              type: 'folder' as const,
              children: [
                {
                  name: 'reporting_service.dart',
                  type: 'file' as const,
                  description: 'Service for API calls: getReportingData, sendReport, searchItems',
                },
              ],
            },
            {
              name: 'model/',
              type: 'folder' as const,
              children: [
                {
                  name: 'issue_type_model.dart',
                  type: 'file' as const,
                  description: 'Issue type model with issue reasons and metadata flags',
                },
                {
                  name: 'issue_reason_model.dart',
                  type: 'file' as const,
                  description: 'Issue reason model with name and metadata flags',
                },
                {
                  name: 'issue_report_request.dart',
                  type: 'file' as const,
                  description: 'Request model for submitting reports',
                },
                {
                  name: 'dish_model.dart',
                  type: 'file' as const,
                  description: 'Dish model for dish selection',
                },
                {
                  name: 'search_item_model.dart',
                  type: 'file' as const,
                  description: 'Search results model for dish search',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/report/issue/types', description: 'Fetch available issue types and reasons for a restaurant', params: ['restId'] },
  { method: 'POST', path: '/report/issue', description: 'Submit report with selected issues and their details', params: ['restaurant_id', 'issues'] },
  { method: 'GET', path: '/item/search', description: 'Search dishes/items for dish selection', params: ['text', 'rest_id', 'page', 'lat', 'lng', 'address_id'] },
];

function OverviewTab() {
  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in">
      {/* Plain Language Summary */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            What It Does
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-7">
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            The <strong className="text-[var(--color-text-primary)]">Reporting</strong> feature allows users to report issues with restaurants through a multi-step form.
            When users access the reporting feature, they first see a <strong className="text-[var(--color-text-primary)]">list of issue types</strong> with their associated reasons.
            Users can select up to 3 issue reasons, and then navigate through a step-by-step form to provide details for each selected reason.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            For each selected reason, users go through a <strong className="text-[var(--color-text-primary)]">multi-step form</strong> where they provide required information.
            The form fields vary based on the reason's requirements: some reasons require <strong className="text-[var(--color-text-primary)]">date selection</strong>,
            others require <strong className="text-[var(--color-text-primary)]">dish search and selection</strong>,
            some require <strong className="text-[var(--color-text-primary)]">additional notes</strong>,
            and some require <strong className="text-[var(--color-text-primary)]">app name</strong>.
            A progress indicator shows the current step and total steps throughout the flow.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">draft saving</strong> that preserves data when navigating between steps,
            <strong className="text-[var(--color-text-primary)]"> debounced dish search</strong> (300ms delay) for better performance,
            <strong className="text-[var(--color-text-primary)]"> maximum 3 reasons selection</strong> limit,
            <strong className="text-[var(--color-text-primary)]"> back navigation</strong> to review or modify previous answers,
            and <strong className="text-[var(--color-text-primary)]">smart form validation</strong> ensuring required fields are filled before submission.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-red-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Users who want to report issues with restaurants or menu items
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Issue reporting, quality control, customer feedback, restaurant improvement
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Restaurant page, menu item page, order details page
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card padding="xl">
        <CardHeader>
          <CardTitle as="h2" className="flex items-center gap-4 text-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: List, title: 'Issue Type Selection', description: 'Select up to 3 issue reasons from available types', color: 'text-red-500' },
              { icon: ArrowRight, title: 'Multi-Step Form', description: 'Navigate through steps for each selected reason', color: 'text-blue-500' },
              { icon: Calendar, title: 'Date Selection', description: 'Select dates for date-required reasons', color: 'text-green-500' },
              { icon: Search, title: 'Dish Search', description: 'Search and select dishes with debounced search', color: 'text-purple-500' },
              { icon: FileText, title: 'Note Input', description: 'Enter additional notes for note-required reasons', color: 'text-pink-500' },
              { icon: MessageSquare, title: 'App Name Input', description: 'Enter app name for app name-required reasons', color: 'text-amber-500' },
              { icon: Zap, title: 'Progress Tracking', description: 'Progress indicator showing current step and total steps', color: 'text-cyan-500' },
              { icon: ArrowLeft, title: 'Back Navigation', description: 'Navigate back to previous steps with data preserved', color: 'text-indigo-500' },
              { icon: Shield, title: 'Draft Saving', description: 'Automatically save form data when navigating between steps', color: 'text-orange-500' },
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
          <CardDescription className="text-base">All API endpoints used by the Reporting feature</CardDescription>
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
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            Key Implementation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="info-box">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Issue Type Selection
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Users can select up to 3 issue reasons from available types. Selection order is maintained using selectionOrder list.
                  Each reason has metadata flags (withDate, withDishSearch, withNote, withAppsName) that determine which fields appear in the form.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Multi-Step Flow
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Flow uses flowIndex to track current step and flowReasons to store selected reasons in order.
                  flowDrafts map stores form data for each reason ID, allowing data to be preserved when navigating back.
                  Each step shows a form with fields based on reason metadata.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Draft Management
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When user fills form and navigates to next step, data is saved in flowDrafts map using reason ID as key.
                  When navigating back, form is pre-filled with data from flowDrafts. This ensures data is never lost during navigation.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Dish Search
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Dish search uses debouncing with 300ms delay to prevent too many API requests. Search state is managed separately
                  with searchQuery, searchState, searchItems, searchPage, and searchHasMore. Search results are displayed in a bottom sheet.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Form Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Form validation ensures required fields are filled before enabling submit button. Validation checks date field if withDate=true,
                  dish selection if withDishSearch=true, note field if withNote=true, and app name if withAppsName=true.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Submission Flow
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  When submitting, orderedPayloads are built from flowDrafts using selectionOrder. Each payload includes reason ID,
                  and optional fields (date, dish ID, note, app name) based on reason metadata. On success, screen closes and success
                  snackbar appears. On error, error message is shown and user can retry.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportingFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-red-500">Reporting</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Reporting Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={reportingUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={reportingEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="reporting" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={reportingTestCases} featureName="Reporting" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

