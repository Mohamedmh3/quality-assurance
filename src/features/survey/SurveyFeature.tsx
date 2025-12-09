import { useState } from 'react';
import {
  ClipboardList,
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
  CheckCircle,
  FileText,
  AlertCircle,
  MessageSquare,
  Star,
  List,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { surveyUseCases } from './data/use-cases';
import { surveyEdgeCases } from './data/edge-cases';
import { surveyTestCases } from './data/test-cases';
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
  name: 'features/helpers/survey/',
  type: 'folder' as const,
  children: [
    {
      name: 'survey_manager.dart',
      type: 'file' as const,
      description: 'Legacy survey manager (commented out, replaced by SurveyViewModel)',
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        {
          name: 'survey_viewmodel.dart',
          type: 'file' as const,
          description: 'MobX ViewModel managing survey state, answers, submission, and API calls',
        },
      ],
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        {
          name: 'survey_model.dart',
          type: 'file' as const,
          description: 'Survey data models including PageSurveyModel and FeedbackModel',
        },
        {
          name: 'questions_model.dart',
          type: 'file' as const,
          description: 'Question model with question text, type, choices, and metadata',
        },
        {
          name: 'servey_answer_model.dart',
          type: 'file' as const,
          description: 'Answer model storing question ID, answer IDs, rating value, and notes',
        },
        {
          name: 'survey_enum.dart',
          type: 'file' as const,
          description: 'Enums for QuestionType (singleChoice, multipleChoice, rating, textOnly) and SurveyPages',
        },
        {
          name: 'feed_back_model.dart',
          type: 'file' as const,
          description: 'Feedback model containing list of surveys',
        },
        {
          name: 'question_choice_model.dart',
          type: 'file' as const,
          description: 'Choice model for question options',
        },
      ],
    },
    {
      name: 'widgets/',
      type: 'folder' as const,
      children: [
        {
          name: 'survey_bottom_sheet.dart',
          type: 'file' as const,
          description: 'Main bottom sheet widget displaying survey questions and submit button',
        },
        {
          name: 'singlechoice_widget.dart',
          type: 'file' as const,
          description: 'Widget for single choice questions with radio buttons',
        },
        {
          name: 'multiplechoice_widget.dart',
          type: 'file' as const,
          description: 'Widget for multiple choice questions with checkboxes',
        },
        {
          name: 'rating_widget.dart',
          type: 'file' as const,
          description: 'Widget for rating questions with star rating or numeric scale',
        },
        {
          name: 'text_only_widget.dart',
          type: 'file' as const,
          description: 'Widget for text-only informational questions',
        },
        {
          name: 'add_note_widget.dart',
          type: 'file' as const,
          description: 'Widget for adding notes to questions',
        },
        {
          name: 'survey_submit_button.dart',
          type: 'file' as const,
          description: 'Submit button widget with loading state',
        },
        {
          name: 'qustion_text_widget.dart',
          type: 'file' as const,
          description: 'Widget for displaying question text',
        },
      ],
    },
    {
      name: 'service/',
      type: 'folder' as const,
      children: [
        {
          name: 'ISurveryService.dart',
          type: 'file' as const,
          description: 'Interface for survey service with fetch and sendSurvey methods',
        },
        {
          name: 'survery_service.dart',
          type: 'file' as const,
          description: 'Implementation of survey service for API calls',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/surveys', description: 'Fetch available surveys for logged-in user', params: [] },
  { method: 'POST', path: '/surveys/submit', description: 'Submit survey answers', params: ['responses', 'feedback_id'] },
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
            The <strong className="text-[var(--color-text-primary)]">Survey</strong> feature collects user feedback through interactive surveys displayed in bottom sheets.
            When users navigate to specific pages (like OrderTrackingPage, HomePage, etc.), surveys associated with those pages appear after a 1-second delay.
            Users can answer different types of questions including single choice, multiple choice, rating, and text-only questions.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            When users <strong className="text-[var(--color-text-primary)]">answer questions</strong>, their responses are stored locally and can be submitted when ready.
            <strong className="text-[var(--color-text-primary)]"> Single choice questions</strong> allow selecting one option,
            while <strong className="text-[var(--color-text-primary)]">multiple choice questions</strong> allow selecting multiple options.
            <strong className="text-[var(--color-text-primary)]"> Rating questions</strong> collect satisfaction scores using star ratings or numeric scales.
            Some questions support <strong className="text-[var(--color-text-primary)]">additional notes</strong> for extra context.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">automatic survey fetching</strong> from API for logged-in users,
            <strong className="text-[var(--color-text-primary)]"> local storage caching</strong> for offline access,
            <strong className="text-[var(--color-text-primary)]"> non-dismissible bottom sheets</strong> that require completion or submission,
            <strong className="text-[var(--color-text-primary)]"> automatic removal</strong> of completed surveys to prevent duplicates,
            and <strong className="text-[var(--color-text-primary)]">text-only questions</strong> that are automatically included in submissions.
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-purple-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Logged-in users who navigate to pages with associated surveys
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                User feedback collection, satisfaction measurement, product improvement insights
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Page navigation (OrderTrackingPage, HomePage, CheckoutPage, etc.)
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
              <ClipboardList className="w-6 h-6 text-purple-500" />
            </div>
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: List, title: 'Single Choice Questions', description: 'Select one option from multiple choices using radio buttons', color: 'text-purple-500' },
              { icon: CheckCircle, title: 'Multiple Choice Questions', description: 'Select multiple options from choices using checkboxes', color: 'text-blue-500' },
              { icon: Star, title: 'Rating Questions', description: 'Provide ratings using star rating or numeric scale', color: 'text-amber-500' },
              { icon: FileText, title: 'Text-Only Questions', description: 'Informational questions automatically included in submission', color: 'text-green-500' },
              { icon: MessageSquare, title: 'Additional Notes', description: 'Add optional notes or comments to questions', color: 'text-pink-500' },
              { icon: ClipboardList, title: 'Bottom Sheet Display', description: 'Surveys displayed in non-dismissible bottom sheets', color: 'text-indigo-500' },
              { icon: Zap, title: 'Local Storage Caching', description: 'Surveys cached locally for offline access', color: 'text-cyan-500' },
              { icon: Shield, title: 'Auto-Removal', description: 'Completed surveys automatically removed to prevent duplicates', color: 'text-red-500' },
              { icon: AlertCircle, title: 'Error Handling', description: 'Graceful error handling for network failures and submission errors', color: 'text-gray-500' },
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
          <CardDescription className="text-base">MobX architecture with ViewModel state management</CardDescription>
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
          <CardDescription className="text-base">All API endpoints used by the Survey feature</CardDescription>
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
              <ClipboardList className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Question Types
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Survey supports four question types: singleChoice (radio buttons), multipleChoice (checkboxes),
                  rating (star rating or numeric scale), and textOnly (informational, automatically answered).
                  Each type has its own widget for rendering.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Answer Management
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Answers are stored in ObservableList&lt;SurveyAnswerModel&gt;. Single choice answers replace previous selection.
                  Multiple choice answers can have multiple selections. Rating answers store both integer (answersIds) and double (ratingValue) values.
                  Notes can be added to any answer using copyWith.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Survey Display Logic
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Surveys are matched to pages using pageName. When user navigates to a page, getHomeDatum() searches
                  feedbackModel.data for matching pageName. If found, survey appears after 1 second delay. Bottom sheet
                  uses PopScope with canPop: false to prevent dismissal.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Local Storage
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Surveys are cached locally using LocaleManager. When surveys are fetched from API, they are stored
                  as JSON strings. On app launch, surveys are loaded from local storage first, then new surveys are fetched
                  and added. Completed surveys are removed from local storage.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Submission Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Before submission, system checks if userAnswerList is not empty. If empty, error message "you need At least"
                  is shown. On successful submission, survey is removed from feedbackModel and local storage, and success
                  dialog appears. Survey will not appear again for that user.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Guest User Handling
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Surveys are only fetched and displayed for logged-in users. getSurveyApi() checks UserManager.instance.isLoggedIn()
                  before making API calls. Guest users will not see any surveys.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SurveyFeature() {
  const [activeTab, setActiveTab] = useState<TabId>('qa-tests');

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-700 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-1">
              <span>Features</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-purple-500">Survey</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Survey Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={surveyUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={surveyEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="survey" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={surveyTestCases} featureName="Survey" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

