import { useState } from 'react';
import { CheckSquare, Download, RefreshCw, Search, ChevronRight, Edit3, Clock, User, Sparkles, AlertCircle, CheckCircle2, HelpCircle, XCircle, FileText } from 'lucide-react';
import type { TestCase, TestStatus, TestCaseType, TestPriority } from '@/lib/types';
import type { EnhancedTestCase } from '@/lib/enhanced-qa-types';
import { useQAStore } from '@/store/qa-store';
import { TestPriorityBadge, TestStatusBadge, TestTypeBadge } from './Badge';
import { BugReportForm } from './BugReportForm';
import { exportToJSON, exportToCSV, cn, formatDate } from '@/lib/utils';

// Helper function to make instructions more conversational
const makeFriendly = (text: string): string => {
  return text
    .replace(/Navigate to/g, 'Go to')
    .replace(/Tap on/g, 'Tap')
    .replace(/Verify/g, 'Check that')
    .replace(/Open dish/g, 'Open the dish page')
    .replace(/dish page/g, 'dish page')
    .replace(/Ensure/g, 'Make sure')
    .replace(/Disable/g, 'Turn off')
    .replace(/Enable/g, 'Turn on')
    .replace(/Simulate/g, 'Test what happens when')
    .replace(/Press back button/g, 'Press the back button')
    .replace(/Set language to/g, 'Change the language to')
    .replace(/Enable screen reader/g, 'Turn on screen reader')
    .replace(/Find dish/g, 'Find a dish')
    .replace(/Find topping group/g, 'Find a topping group')
    .replace(/Note base dish price/g, 'Write down the starting price')
    .replace(/Note dish points/g, 'Write down the starting points');
};

interface QAChecklistProps {
  testCases: TestCase[];
  featureName: string;
}

const statusOptions: TestStatus[] = ['Not Started', 'In Progress', 'Pass', 'Fail', 'Blocked', 'Skip'];

export function QAChecklist({ testCases, featureName }: QAChecklistProps) {
  const { testResults, getProgress, resetAllTests, updateTestStatus, updateTestNotes } = useQAStore();
  const [filterStatus, setFilterStatus] = useState<TestStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<TestCaseType | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TestPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  const progress = getProgress(testCases);

  const filteredTests = testCases.filter(tc => {
    const currentStatus = testResults[tc.id]?.status || 'Not Started';
    const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
    const matchesType = filterType === 'all' || tc.type === filterType;
    const matchesPriority = filterPriority === 'all' || tc.priority === filterPriority;
    const matchesSearch = searchQuery === '' ||
      tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesPriority && matchesSearch;
  });

  // Group by priority
  const groupedTests = {
    P0: filteredTests.filter(tc => tc.priority === 'P0'),
    P1: filteredTests.filter(tc => tc.priority === 'P1'),
    P2: filteredTests.filter(tc => tc.priority === 'P2'),
    P3: filteredTests.filter(tc => tc.priority === 'P3'),
  };

  const handleExportJSON = () => {
    const exportData = testCases.map(tc => ({
      ...tc,
      ...testResults[tc.id],
    }));
    exportToJSON(exportData, `${featureName}-qa-results`);
  };

  const handleExportCSV = () => {
    const exportData = testCases.map(tc => ({
      id: tc.id,
      title: tc.title,
      type: tc.type,
      priority: tc.priority,
      status: testResults[tc.id]?.status || 'Not Started',
      notes: testResults[tc.id]?.notes || '',
      lastTested: testResults[tc.id]?.lastTested || '',
      testedBy: testResults[tc.id]?.testedBy || '',
      automatable: tc.automatable,
    }));
    exportToCSV(exportData, `${featureName}-qa-results`);
  };

  const toggleExpanded = (testId: string) => {
    const newExpanded = new Set(expandedTests);
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedTests(newExpanded);
  };


  const priorityLabels: Record<TestPriority, string> = {
    P0: 'Critical - Test these first!',
    P1: 'High - Important to test',
    P2: 'Medium - Good to test',
    P3: 'Low - Optional testing'
  };

  return (
    <div className="space-y-12">
      {/* Header with Progress */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] flex items-center gap-5 mb-4">
            <div className="icon-container w-14 h-14" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            Test Checklist
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Follow the steps for each test and mark your results. Your progress is saved automatically!
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
          <button 
            onClick={handleExportJSON} 
            className="btn btn-ghost px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg gap-3"
            title="Export test results as JSON file"
          >
            <Download className="w-5 h-5 lg:w-6 lg:h-6" />
            <span>Export JSON</span>
          </button>
          <button 
            onClick={handleExportCSV} 
            className="btn btn-ghost px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg gap-3"
            title="Export test results as CSV file"
          >
            <Download className="w-5 h-5 lg:w-6 lg:h-6" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={resetAllTests}
            className="btn bg-red-500/10 text-red-400 border-2 border-red-500/30 hover:bg-red-500/20 px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg gap-3 transition-all"
            title="Reset all test statuses to 'Not Started'"
          >
            <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card-base p-10 lg:p-12 border-2 shadow-xl bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <span className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)]">Testing Progress</span>
          </div>
          <span className="text-lg lg:text-xl text-[var(--color-text-secondary)] font-medium">
            {progress.completed} of {progress.total} tests completed
          </span>
        </div>
        <div className="progress-bar h-8 lg:h-10 rounded-full shadow-inner border-2 border-[var(--color-border)] overflow-hidden">
          <div 
            className="progress-fill h-full rounded-full transition-all duration-500 ease-out shadow-lg" 
            style={{ width: `${progress.percentage}%` }} 
          />
        </div>
        <div className="flex justify-between mt-8">
          <span className="text-lg lg:text-xl text-[var(--color-text-muted)] font-medium">0%</span>
          <span className="text-5xl lg:text-6xl font-bold gradient-text drop-shadow-lg">{progress.percentage}%</span>
          <span className="text-lg lg:text-xl text-[var(--color-text-muted)] font-medium">100%</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] rounded-2xl p-8 lg:p-10 border-2 border-[var(--color-border)] shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] uppercase tracking-widest">Filter Tests</h3>
        </div>
        <div className="flex flex-wrap gap-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search for tests (e.g., 'cart', 'options')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-16 h-14 text-lg"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as TestStatus | 'all')}
              className="input-base w-auto cursor-pointer min-w-[160px] h-14 text-lg"
            >
              <option value="all">All Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TestCaseType | 'all')}
              className="input-base w-auto cursor-pointer min-w-[160px] h-14 text-lg"
            >
              <option value="all">All Types</option>
              <option value="Functional">Functional</option>
              <option value="Integration">Integration</option>
              <option value="Accessibility">Accessibility</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as TestPriority | 'all')}
              className="input-base w-auto cursor-pointer min-w-[160px] h-14 text-lg"
            >
              <option value="all">All Priorities</option>
              <option value="P0">Critical (P0)</option>
              <option value="P1">High (P1)</option>
              <option value="P2">Medium (P2)</option>
              <option value="P3">Low (P3)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test Cases by Priority */}
      {(['P0', 'P1', 'P2', 'P3'] as const).map(priority => {
        const tests = groupedTests[priority];
        if (tests.length === 0) return null;

        return (
          <div key={priority} className="space-y-8">
            <div className="bg-gradient-to-r from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)] rounded-2xl p-8 lg:p-10 border-2 border-[var(--color-border)] shadow-lg">
              <div className="flex items-center gap-5 mb-4">
                <TestPriorityBadge priority={priority} />
                <span className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)]">
                  {priorityLabels[priority]}
                </span>
              </div>
              <p className="text-base lg:text-lg text-[var(--color-text-secondary)] ml-2 font-medium">
                {tests.length} test{tests.length > 1 ? 's' : ''} in this priority level
              </p>
            </div>

            <div className="space-y-6">
              {tests.map(testCase => (
                <TestCaseRow
                  key={testCase.id}
                  testCase={testCase}
                  isExpanded={expandedTests.has(testCase.id)}
                  onToggle={() => toggleExpanded(testCase.id)}
                  result={testResults[testCase.id]}
                  onStatusChange={(status) => updateTestStatus(testCase.id, status)}
                  onNotesChange={(notes) => updateTestNotes(testCase.id, notes)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {filteredTests.length === 0 && (
        <div className="text-center py-24 lg:py-32 bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border)] px-8">
          <Search className="w-24 h-24 lg:w-32 lg:h-32 text-[var(--color-text-muted)] mx-auto mb-8 opacity-50" />
          <h3 className="text-2xl lg:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
            No tests found
          </h3>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            Try adjusting your filters to see more tests
          </p>
          <button
            onClick={() => {
              setFilterStatus('all');
              setFilterType('all');
              setFilterPriority('all');
              setSearchQuery('');
            }}
            className="btn btn-ghost text-lg lg:text-xl px-8 py-4"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

interface TestCaseRowProps {
  testCase: TestCase | EnhancedTestCase;
  isExpanded: boolean;
  onToggle: () => void;
  result?: {
    status: TestStatus;
    notes: string;
    lastTested?: string;
    testedBy?: string;
  };
  onStatusChange: (status: TestStatus) => void;
  onNotesChange: (notes: string) => void;
}

// Type guard to check if test case is enhanced
function isEnhancedTestCase(testCase: TestCase | EnhancedTestCase): testCase is EnhancedTestCase {
  return 'whatYoureTesting' in testCase && 'detailedSteps' in testCase;
}

function TestCaseRow({ testCase, isExpanded, onToggle, result, onStatusChange, onNotesChange }: TestCaseRowProps) {
  const [notes, setNotes] = useState(result?.notes || '');
  const [showBugReport, setShowBugReport] = useState(false);
  const currentStatus = result?.status || 'Not Started';
  const isEnhanced = isEnhancedTestCase(testCase);

  const handleNotesBlur = () => {
    if (notes !== result?.notes) {
      onNotesChange(notes);
    }
  };

  // Quick toggle between Pass/Not Started when clicking the checkbox
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row toggle
    if (currentStatus === 'Pass') {
      onStatusChange('Not Started');
    } else {
      onStatusChange('Pass');
    }
  };


  return (
    <div className={cn(
      'bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)] rounded-2xl overflow-hidden transition-all shadow-lg hover:shadow-xl',
      isExpanded && 'ring-4 ring-[var(--color-primary)]/30 border-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/20'
    )}>
      {/* Row Header */}
      <div 
        className="flex items-center gap-6 p-8 lg:p-10 cursor-pointer hover:bg-[var(--color-bg-card)] transition-all duration-200 rounded-t-2xl"
        onClick={onToggle}
      >
        {/* Clickable Checkbox */}
        <button
          onClick={handleCheckboxClick}
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all border-2 shadow-lg hover:scale-105',
            currentStatus === 'Pass' 
              ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-600 shadow-emerald-500/50' 
              : currentStatus === 'Fail'
              ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30 shadow-red-500/30'
              : currentStatus === 'In Progress'
              ? 'bg-blue-500/20 border-blue-500 hover:bg-blue-500/30 shadow-blue-500/30'
              : 'bg-transparent border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:shadow-[var(--color-primary)]/20'
          )}
          title={currentStatus === 'Pass' ? 'Mark as Not Started' : 'Mark as Pass'}
        >
          {currentStatus === 'Pass' ? (
            <CheckSquare className="w-6 h-6 text-white" />
          ) : currentStatus === 'Fail' ? (
            <span className="text-red-500 font-bold text-lg">✕</span>
          ) : currentStatus === 'In Progress' ? (
            <span className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
          ) : (
            <span className="w-4 h-4 rounded-full border-2 border-[var(--color-text-muted)]" />
          )}
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Badges row */}
          <div className="flex items-center gap-4 flex-wrap">
            <code className="text-sm lg:text-base font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-4 py-2.5 rounded-lg border-2 border-[var(--color-border)] shadow-md">
              {testCase.id}
            </code>
            <TestTypeBadge type={testCase.type as TestCaseType} />
            {testCase.automatable && (
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm lg:text-base font-semibold bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/30 rounded-full shadow-md">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                Auto
              </span>
            )}
          </div>
          
          {/* Title */}
          <div className="sm:flex-1">
            <h4 className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-2 leading-tight">
              {testCase.title}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)] hidden sm:block">
              Click to see test steps
            </p>
          </div>
        </div>

        {/* Right side - Quick actions and chevron */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Quick Status Buttons (visible on hover or always on mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); onStatusChange('Pass'); }}
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center transition-all text-xl font-bold shadow-lg',
                currentStatus === 'Pass' 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/50 hover:bg-emerald-600 hover:scale-105' 
                  : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-2 border-emerald-500/30 hover:border-emerald-500/50 hover:scale-105'
              )}
              title="Mark as Pass"
            >
              ✓
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onStatusChange('Fail'); }}
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center transition-all text-xl font-bold shadow-lg',
                currentStatus === 'Fail' 
                  ? 'bg-red-500 text-white shadow-red-500/50 hover:bg-red-600 hover:scale-105' 
                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-2 border-red-500/30 hover:border-red-500/50 hover:scale-105'
              )}
              title="Mark as Fail"
            >
              ✕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onStatusChange('Skip'); }}
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center transition-all text-xl font-bold shadow-lg',
                currentStatus === 'Skip' 
                  ? 'bg-gray-500 text-white shadow-gray-500/50 hover:bg-gray-600 hover:scale-105' 
                  : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-2 border-gray-500/30 hover:border-gray-500/50 hover:scale-105'
              )}
              title="Mark as Skip"
            >
              −
            </button>
          </div>

          <TestStatusBadge status={currentStatus} />
          <div className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110',
            isExpanded 
              ? 'bg-[var(--color-primary)] rotate-90 shadow-[var(--color-primary)]/50' 
              : 'bg-[var(--color-bg-primary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10'
          )}>
            <ChevronRight className={cn(
              'w-7 h-7 transition-colors',
              isExpanded ? 'text-white' : 'text-[var(--color-text-muted)]'
            )} />
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-8 lg:px-10 py-8 lg:py-10 border-t border-[var(--color-border)] space-y-10 bg-[var(--color-bg-card)]/30">
          {/* Enhanced Test Case Overview */}
          {isEnhanced && (
            <div className="bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-primary)]/5 rounded-2xl p-8 lg:p-10 border-2 border-[var(--color-primary)]/30 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h5 className="text-lg lg:text-xl font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">
                    What You're Testing
                  </h5>
                  <p className="text-xl lg:text-2xl text-[var(--color-text-primary)] leading-relaxed font-semibold">
                    {testCase.whatYoureTesting}
                  </p>
                </div>
                <div>
                  <h5 className="text-lg lg:text-xl font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">
                    Why This Matters
                  </h5>
                  <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] leading-relaxed">
                    {testCase.whyItMatters}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-[var(--color-border)]">
                <div className="flex items-center gap-3 bg-[var(--color-bg-tertiary)] px-5 py-3 rounded-xl border-2 border-[var(--color-border)]">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
                    Time: {testCase.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-[var(--color-bg-tertiary)] px-5 py-3 rounded-xl border-2 border-[var(--color-border)]">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">
                    Complexity: {testCase.complexity}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Prerequisites (Enhanced) */}
          {isEnhanced && testCase.prerequisites && (
            <div className="bg-gradient-to-br from-amber-500/10 to-[var(--color-bg-primary)] rounded-2xl p-8 lg:p-10 border-2 border-amber-500/30 shadow-lg">
              <h5 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <Clock className="w-8 h-8 text-amber-400" />
                What You Need Before Starting
              </h5>
              <div className="space-y-6">
                <div>
                  <h6 className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                    Materials & Setup:
                  </h6>
                  <ul className="space-y-3">
                    {testCase.prerequisites.whatYouNeed.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-base lg:text-lg text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] p-4 rounded-lg border border-[var(--color-border)]">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {testCase.prerequisites.requiredTestData && (
                  <div>
                    <h6 className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                      Test Data to Use:
                    </h6>
                    <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border-2 border-[var(--color-border)]">
                      {Object.entries(testCase.prerequisites.requiredTestData).map(([key, value]) => (
                        <div key={key} className="mb-3 last:mb-0">
                          <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{key}:</span>
                          <code className="ml-3 text-base lg:text-lg text-[var(--color-text-primary)] font-mono bg-[var(--color-bg-primary)] px-3 py-1 rounded border border-[var(--color-border)]">
                            {value}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Selector */}
          <div className="bg-[var(--color-bg-primary)] rounded-xl p-8 lg:p-10 border-2 border-[var(--color-border)] shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <span className="text-lg lg:text-xl text-[var(--color-text-primary)] font-semibold">Mark Test Result:</span>
              </div>
              <p className="text-base lg:text-lg text-[var(--color-text-muted)] leading-relaxed">
                Choose the status that matches what happened when you tested
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {statusOptions.map(status => {
                  const isSelected = currentStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => onStatusChange(status)}
                      className={cn(
                        'px-6 py-5 text-base lg:text-lg rounded-xl transition-all font-semibold text-left flex items-center gap-3 min-h-[70px] border-2 shadow-md hover:scale-105',
                        isSelected
                          ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/50 ring-2 ring-[var(--color-primary)]/30'
                          : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-bg-card)] hover:border-[var(--color-primary)]/30 hover:shadow-lg'
                      )}
                    >
                      {isSelected && <CheckSquare className="w-6 h-6 flex-shrink-0" />}
                      <span className="flex-1">{status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Test Steps - Enhanced or Regular */}
          <div>
            <h5 className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                <ChevronRight className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              {isEnhanced ? 'Step-by-Step Instructions' : 'How to Test This'}
            </h5>
            <div className="space-y-6">
              {isEnhanced && testCase.detailedSteps ? (
                // Enhanced detailed steps
                testCase.detailedSteps.map((step, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-primary)] rounded-2xl p-8 lg:p-10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all">
                    <div className="flex gap-6 lg:gap-8">
                      <div className="step-indicator text-2xl lg:text-3xl flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 font-bold shadow-lg">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1 space-y-6">
                        <div>
                          <h6 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                            {step.instruction}
                          </h6>
                          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border-2 border-[var(--color-border)] mb-4">
                            <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                              How to Do It:
                            </p>
                            <ol className="space-y-2">
                              {step.howToDoIt.map((item, i) => (
                                <li key={i} className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                                  <span className="text-[var(--color-primary)] font-bold mt-0.5">{i + 1}.</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-emerald-500/10 rounded-xl p-6 border-2 border-emerald-500/30">
                            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                              What You Should See:
                            </p>
                            <p className="text-base lg:text-lg text-[var(--color-text-primary)] leading-relaxed">
                              {step.whatYouShouldSee}
                            </p>
                          </div>
                          {step.howToKnowItWorked && step.howToKnowItWorked.length > 0 && (
                            <div className="bg-blue-500/10 rounded-xl p-6 border-2 border-blue-500/30">
                              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                                How to Know It Worked:
                              </p>
                              <ul className="space-y-2">
                                {step.howToKnowItWorked.map((item, i) => (
                                  <li key={i} className="text-base lg:text-lg text-[var(--color-text-primary)] leading-relaxed flex items-start gap-3">
                                    <span className="text-emerald-400 mt-0.5">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {step.commonMistakes && step.commonMistakes.length > 0 && (
                            <div className="bg-amber-500/10 rounded-xl p-6 border-2 border-amber-500/30">
                              <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                                Common Mistakes:
                              </p>
                              <ul className="space-y-3">
                                {step.commonMistakes.map((mistake, i) => (
                                  <li key={i} className="text-base lg:text-lg text-[var(--color-text-secondary)]">
                                    <span className="font-semibold text-[var(--color-text-primary)]">Problem: </span>
                                    {mistake.mistake}
                                    <br />
                                    <span className="font-semibold text-emerald-400">Solution: </span>
                                    {mistake.solution}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Regular test steps
                ('testSteps' in testCase && testCase.testSteps ? testCase.testSteps : []).map((step, idx) => (
                  <div key={idx} className="flex gap-6 lg:gap-8 bg-[var(--color-bg-primary)] rounded-xl p-8 lg:p-10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200">
                    <div className="step-indicator text-xl lg:text-2xl flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 font-bold shadow-md">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-6">
                      <div>
                        <span className="text-sm text-[var(--color-text-muted)] font-bold uppercase tracking-widest mb-3 block">What to Do</span>
                        <p className="text-lg lg:text-xl text-[var(--color-text-primary)] leading-relaxed">{makeFriendly(step.instruction)}</p>
                      </div>
                      <div className="pt-4 border-t border-[var(--color-border)]">
                        <span className="text-sm text-[var(--color-text-muted)] font-bold uppercase tracking-widest mb-3 block">What Should Happen</span>
                        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                          <span className="text-emerald-400 mt-1 text-xl">✓</span>
                          <span>{makeFriendly(step.expectedResult)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Success Criteria (Enhanced) */}
          {isEnhanced && testCase.successCriteria && (
            <div className="bg-gradient-to-br from-emerald-500/10 to-[var(--color-bg-primary)] rounded-2xl p-8 lg:p-10 border-2 border-emerald-500/30 shadow-xl">
              <h5 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                {testCase.successCriteria.title}
              </h5>
              <div className="space-y-4">
                {testCase.successCriteria.checklist.map((criterion, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border-2 border-emerald-500/20">
                    <div className="flex items-start gap-4 mb-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <h6 className="text-lg lg:text-xl font-bold text-[var(--color-text-primary)] flex-1">
                        {criterion.criterion}
                      </h6>
                    </div>
                    <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mb-2 ml-10">
                      <strong>How to verify:</strong> {criterion.howToVerify}
                    </p>
                    <p className="text-sm lg:text-base text-emerald-400 ml-10 italic">
                      <strong>Visual cue:</strong> {criterion.visualCue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Failure Indicators (Enhanced) */}
          {isEnhanced && testCase.failureIndicators && (
            <div className="bg-gradient-to-br from-red-500/10 to-[var(--color-bg-primary)] rounded-2xl p-8 lg:p-10 border-2 border-red-500/30 shadow-xl">
              <h5 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <XCircle className="w-8 h-8 text-red-400" />
                {testCase.failureIndicators.title}
              </h5>
              <div className="space-y-4">
                {testCase.failureIndicators.scenarios.map((scenario, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border-2 border-red-500/20">
                    <div className="mb-3">
                      <h6 className="text-lg lg:text-xl font-bold text-red-400 mb-2">
                        {scenario.whatHappened}
                      </h6>
                      <p className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                        {scenario.severity}
                      </p>
                    </div>
                    <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mb-2">
                      <strong>What to report:</strong> {scenario.whatToReport}
                    </p>
                    <p className="text-sm lg:text-base text-amber-400 italic">
                      <strong>How to document:</strong> {scenario.howToDocument}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting (Enhanced) */}
          {isEnhanced && testCase.troubleshooting && (
            <div className="bg-gradient-to-br from-blue-500/10 to-[var(--color-bg-primary)] rounded-2xl p-8 lg:p-10 border-2 border-blue-500/30 shadow-xl">
              <h5 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <HelpCircle className="w-8 h-8 text-blue-400" />
                {testCase.troubleshooting.title}
              </h5>
              <div className="space-y-6">
                {testCase.troubleshooting.commonIssues.map((issue, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 border-2 border-blue-500/20">
                    <h6 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                      {issue.problem}
                    </h6>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        Possible Causes:
                      </p>
                      <ul className="space-y-2">
                        {issue.possibleCauses.map((cause, i) => (
                          <li key={i} className="text-base lg:text-lg text-[var(--color-text-secondary)] flex items-start gap-3">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        What to Do:
                      </p>
                      <ol className="space-y-2">
                        {issue.whatToDo.map((action, i) => (
                          <li key={i} className="text-base lg:text-lg text-[var(--color-text-primary)] flex items-start gap-3">
                            <span className="text-blue-400 font-bold">{i + 1}.</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preconditions (Regular test cases only - enhanced ones show above) */}
          {!isEnhanced && testCase.preconditions && testCase.preconditions.length > 0 && (
            <div>
              <h5 className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                Before You Start
              </h5>
              <div className="bg-gradient-to-br from-[var(--color-bg-primary)] to-amber-500/5 rounded-xl p-8 lg:p-10 border-2 border-amber-500/20 shadow-lg">
                <p className="text-base lg:text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed font-medium">Make sure these things are ready:</p>
                <ul className="space-y-4">
                  {testCase.preconditions.map((pre, idx) => (
                    <li key={idx} className="text-lg lg:text-xl text-[var(--color-text-secondary)] flex items-start gap-4 leading-relaxed bg-[var(--color-bg-tertiary)] p-4 rounded-lg border border-[var(--color-border)]">
                      <span className="w-4 h-4 rounded-full bg-amber-500 mt-1 flex-shrink-0 shadow-md" />
                      <span className="flex-1">{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Test Data */}
          {!isEnhanced && 'testData' in testCase && testCase.testData && (
            <div>
              <h5 className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                Test Data / Example Values
              </h5>
              <div className="bg-gradient-to-br from-[var(--color-bg-primary)] to-purple-500/5 rounded-xl p-8 lg:p-10 border-2 border-purple-500/20 shadow-lg">
                <p className="text-base lg:text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed font-medium">Use these values when testing:</p>
                <code className="code-block block text-base lg:text-lg p-6 lg:p-8 bg-[var(--color-bg-tertiary)] rounded-lg border-2 border-purple-500/20 shadow-inner">
                  {testCase.testData}
                </code>
              </div>
            </div>
          )}

          {/* Bug Report Button (when failed) */}
          {currentStatus === 'Fail' && (
            <div className="bg-red-500/10 rounded-2xl p-8 lg:p-10 border-2 border-red-500/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h5 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-2 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    Test Failed
                  </h5>
                  <p className="text-base lg:text-lg text-[var(--color-text-secondary)]">
                    Help us fix this by reporting the issue
                  </p>
                </div>
                <button
                  onClick={() => setShowBugReport(true)}
                  className="px-6 py-4 bg-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-red-600 hover:scale-105 transition-all flex items-center gap-3"
                >
                  <FileText className="w-5 h-5" />
                  Report Bug
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xl lg:text-2xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-blue-500" />
              </div>
              Your Notes
            </label>
            <div className="bg-gradient-to-br from-[var(--color-bg-primary)] to-blue-500/5 rounded-xl p-8 lg:p-10 border-2 border-blue-500/20 shadow-lg">
              <p className="text-base lg:text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed font-medium">
                Write down anything important: what you saw, any problems, screenshots you took, etc.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesBlur}
                placeholder="Example: 'Everything worked perfectly!' or 'The button didn't respond when I tapped it'..."
                className="input-base resize-none h-40 lg:h-48 text-lg lg:text-xl p-6 lg:p-8 leading-relaxed border-2 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Bug Report Form Modal */}
          {showBugReport && (
            <BugReportForm
              testId={testCase.id}
              testName={testCase.title}
              onSubmit={(data) => {
                // Handle bug report submission
                console.log('Bug report submitted:', data);
                setShowBugReport(false);
                // You can integrate with your bug tracking system here
              }}
              onCancel={() => setShowBugReport(false)}
            />
          )}

          {/* Metadata */}
          {(result?.lastTested || result?.testedBy) && (
            <div className="flex items-center gap-10 text-base lg:text-lg text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] p-6 rounded-xl border border-[var(--color-border)]">
              {result.lastTested && (
                <span className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  {formatDate(result.lastTested)}
                </span>
              )}
              {result.testedBy && (
                <span className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  {result.testedBy}
                </span>
              )}
            </div>
          )}

          {/* Related Items */}
          <div className="pt-8 border-t-2 border-[var(--color-border)] flex flex-wrap gap-8">
            {testCase.relatedUseCases && testCase.relatedUseCases.length > 0 && (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-base lg:text-lg text-[var(--color-text-muted)] font-semibold">Use Cases:</span>
                {testCase.relatedUseCases.map(uc => (
                  <code key={uc} className="text-base lg:text-lg bg-blue-500/10 text-blue-400 px-5 py-2.5 rounded-lg font-mono border-2 border-blue-500/30 shadow-md hover:shadow-lg transition-all">
                    {uc}
                  </code>
                ))}
              </div>
            )}
            {testCase.relatedEdgeCases && testCase.relatedEdgeCases.length > 0 && (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-base lg:text-lg text-[var(--color-text-muted)] font-semibold">Edge Cases:</span>
                {testCase.relatedEdgeCases.map(ec => (
                  <code key={ec} className="text-base lg:text-lg bg-amber-500/10 text-amber-400 px-5 py-2.5 rounded-lg font-mono border-2 border-amber-500/30 shadow-md hover:shadow-lg transition-all">
                    {ec}
                  </code>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
