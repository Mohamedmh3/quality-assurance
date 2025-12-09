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
  List,
  Calendar,
  SkipForward,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/Card';
import { ArchitectureBadge, StatusBadge } from '@/components/Badge';
import { UseCaseSection } from '@/components/UseCaseSection';
import { EdgeCaseSection } from '@/components/EdgeCaseSection';
import { QATestingGuide } from '@/components/QATestingGuide';
import { FolderTree } from '@/components/FolderTree';
import { FlowchartSection } from '@/components/flowchart';
import { knowUsUseCases } from './data/use-cases';
import { knowUsEdgeCases } from './data/edge-cases';
import { knowUsTestCases } from './data/test-cases';
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
  name: 'features/helpers/know_us/',
  type: 'folder' as const,
  children: [
    {
      name: 'know_us_view.dart',
      type: 'file' as const,
      description: 'Main view screen with question display, navigation, progress indicator, and submission logic',
    },
    {
      name: 'viewmodel/',
      type: 'folder' as const,
      children: [
        {
          name: 'know_us_viewmodel.dart',
          type: 'file' as const,
          description: 'MobX ViewModel managing questions, answers, navigation, submission, and state',
        },
      ],
    },
    {
      name: 'model/',
      type: 'folder' as const,
      children: [
        {
          name: 'know_us_model.dart',
          type: 'file' as const,
          description: 'Main model for questions with questionId, questionName, answers, date picker, note fields',
        },
        {
          name: 'know_us_question_model.dart',
          type: 'file' as const,
          description: 'Answer model with answer ID, text, and metadata',
        },
      ],
    },
    {
      name: 'widget/',
      type: 'folder' as const,
      children: [
        {
          name: 'know_us_welcome_widget.dart',
          type: 'file' as const,
          description: 'Welcome screen widget with mascot, welcome message, and start button',
        },
        {
          name: 'know_us_body_widget.dart',
          type: 'file' as const,
          description: 'Body widget displaying answer cards, date picker, and note input based on question type',
        },
        {
          name: 'answer_card.dart',
          type: 'file' as const,
          description: 'Answer card widget for displaying answer options',
        },
        {
          name: 'know_us_date_picker.dart',
          type: 'file' as const,
          description: 'Date picker widget for date selection questions',
        },
        {
          name: 'know_us_note_widget.dart',
          type: 'file' as const,
          description: 'Note input widget for text answer questions',
        },
        {
          name: 'know_us_progress_indector.dart',
          type: 'file' as const,
          description: 'Progress indicator widget showing survey completion percentage',
        },
      ],
    },
  ]
};

const apiEndpoints = [
  { method: 'GET', path: '/user/question', description: 'Fetch onboarding questions for user', params: [] },
  { method: 'POST', path: '/user/question', description: 'Submit user answers to onboarding questions', params: ['userAnswer'] },
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
            The <strong className="text-[var(--color-text-primary)]">Know Us</strong> feature is an onboarding survey that collects user information through a series of questions.
            When users first access the feature, they see a <strong className="text-[var(--color-text-primary)]">welcome screen</strong> with a mascot image, welcome message, and start button.
            After tapping start, questions are fetched from the API and displayed one by one with a progress indicator showing completion percentage.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Users can answer different types of questions: <strong className="text-[var(--color-text-primary)]">single choice questions</strong> (select one answer),
            <strong className="text-[var(--color-text-primary)]"> multiple choice questions</strong> (select multiple answers),
            <strong className="text-[var(--color-text-primary)]"> date picker questions</strong> (select a date),
            and <strong className="text-[var(--color-text-primary)]">note questions</strong> (enter text).
            Users can navigate forward and backward through questions, and some questions can be skipped if they have the skip option enabled.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Special features include <strong className="text-[var(--color-text-primary)]">progress tracking</strong> showing completion percentage,
            <strong className="text-[var(--color-text-primary)]"> answer preservation</strong> when navigating back,
            <strong className="text-[var(--color-text-primary)]"> validation</strong> ensuring questions are answered before proceeding,
            <strong className="text-[var(--color-text-primary)]"> skip functionality</strong> for optional questions,
            and <strong className="text-[var(--color-text-primary)]">smart navigation</strong> after submission (to home or cart based on context).
          </p>
          
          <div className="divider" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="info-box flex-col success">
              <Users className="w-10 h-10 text-purple-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Who Uses It</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                New users during onboarding or users accessing the Know Us feature
              </p>
            </div>
            <div className="info-box flex-col warning">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Key Value</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                User onboarding, data collection, user preferences, personalized experience
              </p>
            </div>
            <div className="info-box flex-col">
              <GitBranch className="w-10 h-10 text-[var(--color-primary)] mb-4" />
              <h4 className="font-semibold text-xl text-[var(--color-text-primary)] mb-3">Entry Points</h4>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                Onboarding flow, Know Us feature access, first-time user experience
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
              { icon: List, title: 'Single Choice Questions', description: 'Select one answer from multiple options', color: 'text-purple-500' },
              { icon: CheckCircle, title: 'Multiple Choice Questions', description: 'Select multiple answers from options', color: 'text-blue-500' },
              { icon: Calendar, title: 'Date Picker Questions', description: 'Select dates using scrollable date picker', color: 'text-green-500' },
              { icon: FileText, title: 'Note Questions', description: 'Enter text answers in input fields', color: 'text-pink-500' },
              { icon: SkipForward, title: 'Skip Functionality', description: 'Skip optional questions with skip button', color: 'text-amber-500' },
              { icon: ArrowLeft, title: 'Back Navigation', description: 'Navigate back to previous questions with answers preserved', color: 'text-indigo-500' },
              { icon: Zap, title: 'Progress Tracking', description: 'Progress indicator showing completion percentage', color: 'text-cyan-500' },
              { icon: Shield, title: 'Answer Validation', description: 'Ensure questions are answered before proceeding', color: 'text-red-500' },
              { icon: AlertCircle, title: 'Smart Navigation', description: 'Navigate to home or cart after submission based on context', color: 'text-gray-500' },
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
          <CardDescription className="text-base">All API endpoints used by the Know Us feature</CardDescription>
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
                  Know Us supports multiple question types: single answer (isMultiAnswer = false), multiple answer (isMultiAnswer = true),
                  date picker (quesitonTypeDate = true), and note (quesitonTypeNote = true). Each type has its own widget for rendering.
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
                  Answers are stored in ObservableList&lt;KnowUsModel&gt;. Single choice answers replace previous selection.
                  Multiple choice answers can have multiple selections. Date answers are stored as ISO8601 strings.
                  Note answers are saved as user types.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Answer Validation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  isTheQuestionIsAnswerd computed property validates if question is answered. It checks if answers list is not empty,
                  if date is selected (for date questions), and if note is entered (for note questions). Next button is only enabled
                  when validation passes.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Navigation Logic
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Navigation uses currentIndex to track current question. Next button increments index, back button decrements index.
                  On first question, back button closes screen. After submission, navigation depends on context: if from cart,
                  navigates to cart; otherwise navigates to home. All previous screens are cleared.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Progress Calculation
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Progress is calculated as currentIndex / questionModel.length. Progress indicator updates automatically
                  as user navigates through questions. Progress bar shows completion percentage visually.
                </p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
                  Skip Functionality
                </h3>
                <p className="text-base text-[var(--color-text-secondary)] mb-3">
                  Questions with canSkip = true show a skip button. When skipped, answer with ID 0 is added to mark
                  the question as skipped, and currentIndex is incremented. Skip button only appears for skippable questions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function KnowUsFeature() {
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
              <span className="text-purple-500">Know Us</span>
            </div>
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
              Know Us Feature
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
        {activeTab === 'use-cases' && <UseCaseSection useCases={knowUsUseCases} />}
        {activeTab === 'edge-cases' && <EdgeCaseSection edgeCases={knowUsEdgeCases} />}
        {activeTab === 'flow-diagrams' && <FlowchartSection featureId="know-us" />}
        {activeTab === 'qa-tests' && <QATestingGuide testCases={knowUsTestCases} featureName="Know Us" />}
        {activeTab === 'implementation' && <ImplementationTab />}
      </div>
    </div>
  );
}

