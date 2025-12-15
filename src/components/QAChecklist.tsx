import { useState, useRef } from 'react';
import { CheckSquare, Download, RefreshCw, Search, ChevronDown, Edit3, Clock, User, Sparkles, AlertCircle, CheckCircle2, HelpCircle, XCircle, FileText, Filter, TrendingUp, SkipForward, Circle, Upload } from 'lucide-react';
import type { TestCase, TestStatus, TestCaseType, TestPriority } from '@/lib/types';
import type { EnhancedTestCase } from '@/lib/enhanced-qa-types';
import { useQAStore } from '@/store/qa-store';
import { TestPriorityBadge, TestStatusBadge, TestTypeBadge } from './Badge';
import { BugReportForm } from './BugReportForm';
import { exportToJSON, exportToCSV, cn, formatDate, readJSONFile, readCSVFile } from '@/lib/utils';

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
  const [showFilters, setShowFilters] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);

    try {
      let importedData: unknown;

      if (file.name.endsWith('.json')) {
        importedData = await readJSONFile(file);
      } else if (file.name.endsWith('.csv')) {
        importedData = await readCSVFile(file);
      } else {
        setImportError('Unsupported file type. Please use JSON or CSV files.');
        return;
      }

      // Process imported data
      if (Array.isArray(importedData)) {
        // CSV or JSON array format
        let importedCount = 0;
        importedData.forEach((item: any) => {
          const testId = item.id || item.testId;
          if (testId && testCases.some(tc => tc.id === testId)) {
            // Update status if provided
            if (item.status && statusOptions.includes(item.status)) {
              updateTestStatus(testId, item.status);
            }
            // Update notes if provided
            if (item.notes !== undefined) {
              updateTestNotes(testId, String(item.notes || ''));
            }
            importedCount++;
          }
        });
        
        if (importedCount === 0) {
          setImportError('No matching test cases found in the imported file.');
        } else {
          alert(`Successfully imported ${importedCount} test result(s).`);
        }
      } else if (typeof importedData === 'object' && importedData !== null) {
        // JSON object format (could be testResults object)
        const data = importedData as Record<string, any>;
        
        // Check if it's a testResults object format
        if (data.testResults && typeof data.testResults === 'object') {
          let importedCount = 0;
          Object.entries(data.testResults).forEach(([testId, result]: [string, any]) => {
            if (testCases.some(tc => tc.id === testId)) {
              if (result.status && statusOptions.includes(result.status)) {
                updateTestStatus(testId, result.status);
              }
              if (result.notes !== undefined) {
                updateTestNotes(testId, String(result.notes || ''));
              }
              importedCount++;
            }
          });
          
          if (importedCount === 0) {
            setImportError('No matching test cases found in the imported file.');
          } else {
            alert(`Successfully imported ${importedCount} test result(s).`);
          }
        } else {
          // Try to treat as array of test cases
          const items = Object.values(data);
          let importedCount = 0;
          items.forEach((item: any) => {
            const testId = item.id || item.testId;
            if (testId && testCases.some(tc => tc.id === testId)) {
              if (item.status && statusOptions.includes(item.status)) {
                updateTestStatus(testId, item.status);
              }
              if (item.notes !== undefined) {
                updateTestNotes(testId, String(item.notes || ''));
              }
              importedCount++;
            }
          });
          
          if (importedCount === 0) {
            setImportError('Invalid file format. Expected an array of test cases or testResults object.');
          } else {
            alert(`Successfully imported ${importedCount} test result(s).`);
          }
        }
      } else {
        setImportError('Invalid file format.');
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import file.');
    }
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
    <div className="space-y-6">
      {/* Header Section - Clean & Modern */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ padding: '32px' }}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                Test Checklist
              </h2>
              <p className="text-base text-[var(--color-text-secondary)]">
                {testCases.length} tests available
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              onChange={handleFileImport}
              className="hidden"
            />
            <button 
              onClick={handleImportClick}
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '16px 32px' }}
              title="Import JSON or CSV file"
            >
              <Download className="w-5 h-5" />
              <span>Import</span>
            </button>
            <button 
              onClick={handleExportJSON} 
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '16px 32px' }}
            >
              <Upload className="w-5 h-5" />
              <span>JSON</span>
            </button>
            <button 
              onClick={handleExportCSV} 
              className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2"
              style={{ padding: '16px 32px' }}
            >
              <Upload className="w-5 h-5" />
              <span>CSV</span>
            </button>
            <button
              onClick={resetAllTests}
              className="text-base font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2"
              style={{ padding: '16px 32px' }}
            >
              <RefreshCw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Import Error Message */}
        {importError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {importError}
          </div>
        )}

        {/* Progress Section - Clean Design */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">Testing Progress</span>
            </div>
            <span className="text-base font-medium text-[var(--color-text-secondary)]">
              {progress.completed} / {progress.total} completed
            </span>
          </div>
          <div className="relative h-4 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress.percentage}%` }} 
            />
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-[var(--color-text-primary)]">{progress.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]" style={{ padding: '32px' }}>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[var(--color-text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '48px', paddingTop: '16px', paddingBottom: '16px', paddingRight: '20px' }}
              className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/50 transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all"
            style={{ padding: '16px 32px' }}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            <ChevronDown className={cn("w-5 h-5 transition-transform", showFilters && "rotate-180")} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-5 pt-5 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as TestStatus | 'all')}
                className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/50 transition-all cursor-pointer"
                style={{ padding: '16px 20px' }}
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as TestCaseType | 'all')}
                className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/50 transition-all cursor-pointer"
                style={{ padding: '16px 20px' }}
              >
                <option value="all">All Types</option>
                <option value="Functional">Functional</option>
                <option value="Integration">Integration</option>
                <option value="Accessibility">Accessibility</option>
                <option value="Performance">Performance</option>
                <option value="Security">Security</option>
                <option value="UI">UI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as TestPriority | 'all')}
                className="w-full text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]/50 transition-all cursor-pointer"
                style={{ padding: '16px 20px' }}
              >
                <option value="all">All Priorities</option>
                <option value="P0">Critical (P0)</option>
                <option value="P1">High (P1)</option>
                <option value="P2">Medium (P2)</option>
                <option value="P3">Low (P3)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Test Cases by Priority */}
      {(['P0', 'P1', 'P2', 'P3'] as const).map(priority => {
        const tests = groupedTests[priority];
        if (tests.length === 0) return null;

        return (
          <div key={priority} className="space-y-6">
            {/* Priority Header - Clean Design */}
            <div className="flex items-center gap-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl" style={{ padding: '24px' }}>
              <TestPriorityBadge priority={priority} />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                  {priorityLabels[priority]}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {tests.length} test{tests.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Test Cases */}
            <div className="space-y-3">
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

      {/* Empty State */}
      {filteredTests.length === 0 && (
        <div className="text-center py-16 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
          <Search className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
            No tests found
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Try adjusting your filters to see more tests
          </p>
          <button
            onClick={() => {
              setFilterStatus('all');
              setFilterType('all');
              setFilterPriority('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-card)] transition-all"
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

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStatus === 'Pass') {
      onStatusChange('Not Started');
    } else {
      onStatusChange('Pass');
    }
  };

  const getStatusStyles = (status: TestStatus) => {
    switch (status) {
      case 'Pass':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'Fail':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'In Progress':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'Blocked':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'Skip':
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
      default:
        return 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)]';
    }
  };

  return (
    <div 
      className={cn(
        'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md',
        isExpanded && 'ring-2 ring-[var(--color-primary)]/20 shadow-lg'
      )}
      style={{ marginBottom: '12px' }}
    >
      {/* Row Header - Clean Design */}
      <div 
        className="flex items-center gap-4 cursor-pointer hover:bg-[var(--color-bg-primary)]/50 transition-colors"
        style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px' }}
        onClick={onToggle}
      >
        {/* Status Checkbox */}
        <button
          onClick={handleCheckboxClick}
          className={cn(
            'w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all border-2',
            currentStatus === 'Pass' 
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
              : currentStatus === 'Fail'
              ? 'bg-red-500/20 border-red-500 text-red-400'
              : currentStatus === 'In Progress'
              ? 'bg-blue-500/20 border-blue-500 text-blue-400'
              : currentStatus === 'Blocked'
              ? 'bg-orange-500/20 border-orange-500 text-orange-400'
              : currentStatus === 'Skip'
              ? 'bg-gray-500/20 border-gray-500 text-gray-400'
              : 'bg-[var(--color-bg-primary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
          )}
          title={currentStatus === 'Pass' ? 'Mark as Not Started' : 'Mark as Pass'}
        >
          {currentStatus === 'Pass' ? (
            <CheckSquare className="w-5 h-5" />
          ) : currentStatus === 'Fail' ? (
            <XCircle className="w-5 h-5" />
          ) : currentStatus === 'In Progress' ? (
            <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
          ) : (
            <div className="w-3 h-3 rounded-full border-2 border-current" />
          )}
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <code className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-2.5 py-1 rounded border border-[var(--color-border)]">
              {testCase.id}
            </code>
            <TestTypeBadge type={testCase.type as TestCaseType} />
            {testCase.automatable && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                <Sparkles className="w-3 h-3" />
                Auto
              </span>
            )}
          </div>
          <h4 className="text-base font-semibold text-[var(--color-text-primary)] leading-snug">
            {testCase.title}
          </h4>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Quick Action Buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange('Pass');
              }}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs font-bold',
                currentStatus === 'Pass'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30'
              )}
              title="Mark as Pass"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange('Fail');
              }}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs font-bold',
                currentStatus === 'Fail'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30'
              )}
              title="Mark as Fail"
            >
              <XCircle className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange('Skip');
              }}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs font-bold',
                currentStatus === 'Skip'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30'
              )}
              title="Mark as Skip"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status Icon */}
            {currentStatus === 'Pass' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            {currentStatus === 'Fail' && (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            {currentStatus === 'Skip' && (
              <SkipForward className="w-4 h-4 text-amber-400" />
            )}
            {currentStatus === 'In Progress' && (
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            )}
            {currentStatus === 'Blocked' && (
              <AlertCircle className="w-4 h-4 text-orange-400" />
            )}
            {currentStatus === 'Not Started' && (
              <Circle className="w-4 h-4 text-slate-400" />
            )}
            <TestStatusBadge status={currentStatus} />
          </div>
          <ChevronDown className={cn(
            'w-5 h-5 text-[var(--color-text-muted)] transition-transform',
            isExpanded && 'rotate-180 text-[var(--color-primary)]'
          )} />
        </div>
      </div>

      {/* Expanded Content - Clean Layout */}
      {isExpanded && (
        <div className="px-6 py-6 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] space-y-6">
          {/* Enhanced Test Case Overview */}
          {isEnhanced && (
            <div className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-primary)]/5 rounded-xl p-6 border border-[var(--color-primary)]/20">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-xs font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">
                    What You're Testing
                  </h5>
                  <p className="text-base text-[var(--color-text-primary)] leading-relaxed font-medium">
                    {testCase.whatYoureTesting}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">
                    Why This Matters
                  </h5>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                    {testCase.whyItMatters}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-5 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {testCase.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {testCase.complexity}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {isEnhanced && testCase.prerequisites && (
            <div className="bg-amber-500/5 rounded-xl p-6 border border-amber-500/20">
              <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                What You Need Before Starting
              </h5>
              <div className="space-y-5">
                <div>
                  <h6 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
                    Materials & Setup
                  </h6>
                  <ul className="space-y-3">
                    {testCase.prerequisites.whatYouNeed.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-[var(--color-text-secondary)] bg-[var(--color-bg-secondary)] p-4 rounded-lg border border-[var(--color-border)] leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {testCase.prerequisites.requiredTestData && (
                  <div>
                    <h6 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">
                      Test Data to Use
                    </h6>
                    <div className="bg-[var(--color-bg-secondary)] rounded-lg p-5 border border-[var(--color-border)]">
                      {Object.entries(testCase.prerequisites.requiredTestData).map(([key, value]) => (
                        <div key={key} className="mb-3 last:mb-0">
                          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{key}:</span>
                          <code className="ml-3 text-sm text-[var(--color-text-primary)] font-mono bg-[var(--color-bg-primary)] px-3 py-1.5 rounded border border-[var(--color-border)]">
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

          {/* Status Selector - Clean Design */}
          <div className={cn("rounded-xl border", getStatusStyles(currentStatus))} style={{ padding: '32px' }}>
            <div className="flex items-center gap-3 mb-5">
              <CheckSquare className="w-6 h-6" />
              <label htmlFor={`test-status-${testCase.id}`} className="text-lg font-semibold text-[var(--color-text-primary)]">
                Mark Test Result
              </label>
            </div>
            <p className="text-base text-[var(--color-text-secondary)] mb-5 leading-relaxed">
              Choose the status that matches what happened when you tested
            </p>
            <select
              id={`test-status-${testCase.id}`}
              value={currentStatus}
              onChange={(e) => onStatusChange(e.target.value as TestStatus)}
              className={cn(
                'w-full text-base font-medium bg-[var(--color-bg-primary)] border rounded-xl text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all appearance-none cursor-pointer',
                'hover:bg-[var(--color-bg-tertiary)]',
                currentStatus === 'Pass' && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100',
                currentStatus === 'Fail' && 'border-red-500/50 bg-red-500/10 text-red-100',
                currentStatus === 'In Progress' && 'border-blue-500/50 bg-blue-500/10 text-blue-100',
                currentStatus === 'Blocked' && 'border-orange-500/50 bg-orange-500/10 text-orange-100',
                currentStatus === 'Skip' && 'border-gray-500/50 bg-gray-500/10 text-gray-100',
                currentStatus === 'Not Started' && 'border-[var(--color-border)] text-[var(--color-text-primary)]'
              )}
              style={{
                color: 'var(--color-text-primary)',
                padding: '16px 20px',
              }}
            >
              {statusOptions.map(status => (
                <option 
                  key={status} 
                  value={status}
                  className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] text-base py-2"
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    color: 'var(--color-text-primary)',
                    fontSize: '1rem',
                  }}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Test Steps - Clean Design */}
          <div>
            <h5 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                <ChevronDown className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              {isEnhanced ? 'Step-by-Step Instructions' : 'How to Test This'}
            </h5>
            <div className="space-y-5">
              {isEnhanced && testCase.detailedSteps ? (
                testCase.detailedSteps.map((step, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]" style={{ padding: '20px' }}>
                    <div className="flex gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white flex items-center justify-center font-bold text-base shadow-lg">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1 space-y-5">
                        <h6 className="text-base font-semibold text-[var(--color-text-primary)] leading-relaxed">
                          {step.instruction}
                        </h6>
                        <div className="bg-[var(--color-bg-primary)] rounded-lg p-5 border border-[var(--color-border)]">
                          <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                            How to Do It
                          </p>
                          <ol className="space-y-3">
                            {step.howToDoIt.map((item, i) => (
                              <li key={i} className="text-base text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                                <span className="text-[var(--color-primary)] font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="bg-emerald-500/10 rounded-lg p-5 border border-emerald-500/20">
                          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                            What You Should See
                          </p>
                          <p className="text-base text-[var(--color-text-primary)] leading-relaxed">
                            {step.whatYouShouldSee}
                          </p>
                        </div>
                        {step.howToKnowItWorked && step.howToKnowItWorked.length > 0 && (
                          <div className="bg-blue-500/10 rounded-lg p-5 border border-blue-500/20">
                            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                              How to Know It Worked
                            </p>
                            <ul className="space-y-2.5">
                              {step.howToKnowItWorked.map((item, i) => (
                                <li key={i} className="text-base text-[var(--color-text-primary)] leading-relaxed flex items-start gap-3">
                                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {step.commonMistakes && step.commonMistakes.length > 0 && (
                          <div className="bg-amber-500/10 rounded-lg p-5 border border-amber-500/20">
                            <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
                              Common Mistakes
                            </p>
                            <ul className="space-y-3">
                              {step.commonMistakes.map((mistake, i) => (
                                <li key={i} className="text-base text-[var(--color-text-secondary)] leading-relaxed">
                                  <span className="font-semibold text-[var(--color-text-primary)]">Problem: </span>
                                  {mistake.mistake}
                                  <br className="mb-1.5" />
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
                ))
              ) : (
                ('testSteps' in testCase && testCase.testSteps ? testCase.testSteps : []).map((step, idx) => {
                  const testStep = step as import('@/lib/types').TestStep;
                  return (
                    <div key={idx} className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]" style={{ padding: '20px' }}>
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white flex items-center justify-center font-bold text-base shadow-lg">
                          {testStep.step}
                        </div>
                        <div className="flex-1 space-y-5">
                          <h6 className="text-base font-semibold text-[var(--color-text-primary)] leading-relaxed">
                            {makeFriendly(testStep.instruction)}
                          </h6>
                          {testStep.detailedSteps && testStep.detailedSteps.length > 0 && (
                            <div className="bg-[var(--color-bg-primary)] rounded-lg p-5 border border-[var(--color-border)]">
                              <p className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                                How to Do It
                              </p>
                              <ol className="space-y-3">
                                {testStep.detailedSteps.map((item: string, i: number) => (
                                  <li key={i} className="text-base text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                                    <span className="text-[var(--color-primary)] font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                          {testStep.whatYouShouldSee && (
                            <div className="bg-emerald-500/10 rounded-lg p-5 border border-emerald-500/20">
                              <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                What You Should See
                              </p>
                              <p className="text-base text-[var(--color-text-primary)] leading-relaxed">
                                {testStep.whatYouShouldSee}
                              </p>
                            </div>
                          )}
                        <div className="bg-blue-500/10 rounded-lg p-5 border border-blue-500/20">
                          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
                            Expected Result
                          </p>
                          <p className="text-base text-[var(--color-text-primary)] leading-relaxed flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                            <span>{makeFriendly(testStep.expectedResult)}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Success Criteria */}
          {isEnhanced && testCase.successCriteria && (
            <div className="bg-emerald-500/5 rounded-xl p-6 border border-emerald-500/20">
              <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                {testCase.successCriteria.title}
              </h5>
              <div className="space-y-4">
                {testCase.successCriteria.checklist.map((criterion, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-secondary)] rounded-lg p-5 border border-emerald-500/20">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <h6 className="text-sm font-semibold text-[var(--color-text-primary)] flex-1 leading-relaxed">
                        {criterion.criterion}
                      </h6>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2 ml-8 leading-relaxed">
                      <strong>How to verify:</strong> {criterion.howToVerify}
                    </p>
                    <p className="text-sm text-emerald-400 ml-8 italic leading-relaxed">
                      <strong>Visual cue:</strong> {criterion.visualCue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Failure Indicators */}
          {isEnhanced && testCase.failureIndicators && (
            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/20">
              <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                {testCase.failureIndicators.title}
              </h5>
              <div className="space-y-4">
                {testCase.failureIndicators.scenarios.map((scenario, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-secondary)] rounded-lg p-5 border border-red-500/20">
                    <h6 className="text-sm font-semibold text-red-400 mb-2 leading-relaxed">
                      {scenario.whatHappened}
                    </h6>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2 leading-relaxed">
                      {scenario.severity}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2 leading-relaxed">
                      <strong>What to report:</strong> {scenario.whatToReport}
                    </p>
                    <p className="text-sm text-amber-400 italic leading-relaxed">
                      <strong>How to document:</strong> {scenario.howToDocument}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Troubleshooting */}
          {isEnhanced && testCase.troubleshooting && (
            <div className="bg-blue-500/5 rounded-xl p-6 border border-blue-500/20">
              <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                {testCase.troubleshooting.title}
              </h5>
              <div className="space-y-5">
                {testCase.troubleshooting.commonIssues.map((issue, idx) => (
                  <div key={idx} className="bg-[var(--color-bg-secondary)] rounded-lg p-5 border border-blue-500/20">
                    <h6 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4 leading-relaxed">
                      {issue.problem}
                    </h6>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                        Possible Causes
                      </p>
                      <ul className="space-y-2">
                        {issue.possibleCauses.map((cause, i) => (
                          <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3 leading-relaxed">
                            <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                        What to Do
                      </p>
                      <ol className="space-y-2">
                        {issue.whatToDo.map((action, i) => (
                          <li key={i} className="text-sm text-[var(--color-text-primary)] flex items-start gap-3 leading-relaxed">
                            <span className="text-blue-400 font-bold flex-shrink-0">{i + 1}.</span>
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

          {/* Notes */}
          <div>
            <label className="text-lg font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-3">
              <Edit3 className="w-6 h-6 text-blue-400" />
              Your Notes
            </label>
            <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]" style={{ padding: '32px' }}>
              <p className="text-base text-[var(--color-text-muted)] mb-5 leading-relaxed">
                Write down anything important: what you saw, any problems, screenshots you took, etc.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesBlur}
                placeholder="Example: 'Everything worked perfectly!' or 'The button didn't respond when I tapped it'..."
                style={{ padding: '20px' }}
                className="w-full h-32 text-base bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Bug Report */}
          {currentStatus === 'Fail' && (
            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-1 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Test Failed
                  </h5>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Help us fix this by reporting the issue
                  </p>
                </div>
                <button
                  onClick={() => setShowBugReport(true)}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 shadow-lg shadow-red-500/20"
                >
                  <FileText className="w-4 h-4" />
                  Report Bug
                </button>
              </div>
            </div>
          )}

          {/* Bug Report Form */}
          {showBugReport && (
            <BugReportForm
              testId={testCase.id}
              testName={testCase.title}
              onSubmit={(data) => {
                console.log('Bug report submitted:', data);
                setShowBugReport(false);
              }}
              onCancel={() => setShowBugReport(false)}
            />
          )}

          {/* Metadata */}
          {(result?.lastTested || result?.testedBy) && (
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border)]">
              {result.lastTested && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDate(result.lastTested)}
                </span>
              )}
              {result.testedBy && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {result.testedBy}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
