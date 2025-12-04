import { useState } from 'react';
import { AlertTriangle, FileCode2, Shield, Wifi, Database, Layers, Monitor, Zap, Filter, Search, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { EdgeCase, EdgeCaseCategory } from '@/lib/types';
import { PriorityBadge, LikelihoodBadge, CategoryBadge } from './Badge';
import { cn } from '@/lib/utils';

interface EdgeCaseSectionProps {
  edgeCases: EdgeCase[];
}

const categoryIcons: Record<EdgeCaseCategory, React.ElementType> = {
  Validation: Shield,
  Network: Wifi,
  State: Layers,
  Concurrency: Zap,
  Data: Database,
  UI: Monitor,
  Performance: Zap,
};

export function EdgeCaseSection({ edgeCases }: EdgeCaseSectionProps) {
  const [categoryFilter, setCategoryFilter] = useState<EdgeCaseCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEdgeCase, setSelectedEdgeCase] = useState<EdgeCase | null>(null);

  const categories = Array.from(new Set(edgeCases.map(ec => ec.category)));

  const filteredCases = edgeCases.filter(ec => {
    const matchesCategory = categoryFilter === 'all' || ec.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      ec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ec.triggerCondition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort by impact (Critical first) and then likelihood
  const sortedCases = [...filteredCases].sort((a, b) => {
    const impactOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    const likelihoodOrder = { High: 0, Medium: 1, Low: 2 };
    const impactDiff = impactOrder[a.impact] - impactOrder[b.impact];
    if (impactDiff !== 0) return impactDiff;
    return likelihoodOrder[a.likelihood] - likelihoodOrder[b.likelihood];
  });

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] flex items-center gap-5 mb-4">
            <div className="icon-container w-14 h-14 lg:w-16 lg:h-16 shadow-xl" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
              <AlertTriangle className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            Edge Cases & Error Handling
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            {edgeCases.length} identified edge cases with handling strategies
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search edge cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-base pl-16 lg:pl-20 w-full lg:w-96 h-14 lg:h-16 text-lg lg:text-xl border-2 rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 lg:gap-6">
        <button
          onClick={() => setCategoryFilter('all')}
          className={cn(
            'px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-base lg:text-lg font-semibold transition-all border-2 shadow-md',
            categoryFilter === 'all'
              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg'
              : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)]'
          )}
        >
          <Filter className="w-5 h-5 inline-block mr-2" />
          All Categories
        </button>
        {categories.map(category => {
          const Icon = categoryIcons[category];
          const count = edgeCases.filter(ec => ec.category === category).length;
          return (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                'px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-base lg:text-lg font-semibold transition-all border-2 shadow-md',
                categoryFilter === category
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-lg'
                  : 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)]'
              )}
            >
              <Icon className="w-5 h-5 inline-block mr-2" />
              {category}
              <span className="opacity-80 ml-2">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Impact Matrix Overview */}
      <div className="card-base p-10 lg:p-12 xl:p-16 border-2 shadow-xl">
        <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] mb-10 lg:mb-12">Severity Matrix</h3>
        <div className="grid grid-cols-4 gap-6 lg:gap-8 text-center text-base lg:text-lg">
          <div></div>
          <div className="font-bold text-red-400 py-3">High Likelihood</div>
          <div className="font-bold text-amber-400 py-3">Medium</div>
          <div className="font-bold text-emerald-400 py-3">Low</div>
          
          <div className="font-bold text-red-400 text-right pr-6 py-4">Critical</div>
          <MatrixCell cases={edgeCases} impact="Critical" likelihood="High" />
          <MatrixCell cases={edgeCases} impact="Critical" likelihood="Medium" />
          <MatrixCell cases={edgeCases} impact="Critical" likelihood="Low" />
          
          <div className="font-bold text-orange-400 text-right pr-6 py-4">High</div>
          <MatrixCell cases={edgeCases} impact="High" likelihood="High" />
          <MatrixCell cases={edgeCases} impact="High" likelihood="Medium" />
          <MatrixCell cases={edgeCases} impact="High" likelihood="Low" />
          
          <div className="font-bold text-blue-400 text-right pr-6 py-4">Medium</div>
          <MatrixCell cases={edgeCases} impact="Medium" likelihood="High" />
          <MatrixCell cases={edgeCases} impact="Medium" likelihood="Medium" />
          <MatrixCell cases={edgeCases} impact="Medium" likelihood="Low" />
          
          <div className="font-bold text-slate-400 text-right pr-6 py-4">Low</div>
          <MatrixCell cases={edgeCases} impact="Low" likelihood="High" />
          <MatrixCell cases={edgeCases} impact="Low" likelihood="Medium" />
          <MatrixCell cases={edgeCases} impact="Low" likelihood="Low" />
        </div>
      </div>

      {/* Edge Case List */}
      <div className="grid gap-8 lg:gap-10">
        {sortedCases.map(edgeCase => (
          <EdgeCaseCard 
            key={edgeCase.id} 
            edgeCase={edgeCase}
            isSelected={selectedEdgeCase?.id === edgeCase.id}
            onSelect={() => setSelectedEdgeCase(
              selectedEdgeCase?.id === edgeCase.id ? null : edgeCase
            )}
          />
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-32 lg:py-40 bg-[var(--color-bg-primary)] rounded-3xl border-2 border-[var(--color-border)]">
          <Search className="w-24 h-24 lg:w-32 lg:h-32 text-[var(--color-text-muted)] mx-auto mb-8 opacity-50" />
          <p className="text-2xl lg:text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
            No edge cases found
          </p>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)]">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}

function MatrixCell({ cases, impact, likelihood }: { cases: EdgeCase[]; impact: string; likelihood: string }) {
  const count = cases.filter(c => c.impact === impact && c.likelihood === likelihood).length;
  const bgColors: Record<string, Record<string, string>> = {
    Critical: { High: 'bg-red-500/30', Medium: 'bg-red-500/20', Low: 'bg-red-500/10' },
    High: { High: 'bg-orange-500/30', Medium: 'bg-orange-500/20', Low: 'bg-orange-500/10' },
    Medium: { High: 'bg-amber-500/20', Medium: 'bg-amber-500/15', Low: 'bg-amber-500/10' },
    Low: { High: 'bg-slate-500/20', Medium: 'bg-slate-500/15', Low: 'bg-slate-500/10' },
  };
  
  return (
    <div className={cn('matrix-cell', bgColors[impact]?.[likelihood] || 'bg-slate-500/10')}>
      {count > 0 ? count : '-'}
    </div>
  );
}

function EdgeCaseCard({ edgeCase, isSelected, onSelect }: { edgeCase: EdgeCase; isSelected: boolean; onSelect: () => void }) {
  const Icon = categoryIcons[edgeCase.category];

  return (
    <div
      className={cn(
        'card-base cursor-pointer transition-all overflow-hidden border-2 shadow-lg hover:shadow-xl',
        isSelected && 'ring-4 ring-[var(--color-primary)]/30 border-[var(--color-primary)]',
        edgeCase.impact === 'Critical' && 'border-l-4 border-l-red-500'
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="p-8 lg:p-10 xl:p-12 flex items-start justify-between gap-8">
        <div className="flex items-start gap-6 lg:gap-8 flex-1">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center border-2 border-[var(--color-border)] shadow-md">
            <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 lg:gap-5 flex-wrap mb-4">
              <code className="text-sm lg:text-base font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-4 py-2 rounded-lg border-2 border-[var(--color-border)] shadow-md">
                {edgeCase.id}
              </code>
              <CategoryBadge category={edgeCase.category} />
            </div>
            <h4 className="font-bold text-[var(--color-text-primary)] text-xl lg:text-2xl mb-3 leading-tight">{edgeCase.title}</h4>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">{edgeCase.triggerCondition}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs lg:text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider font-semibold">Impact</div>
            <PriorityBadge priority={edgeCase.impact} />
          </div>
          <div className="text-right">
            <div className="text-xs lg:text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wider font-semibold">Likelihood</div>
            <LikelihoodBadge likelihood={edgeCase.likelihood} />
          </div>
          <div className={cn(
            'w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg',
            isSelected 
              ? 'bg-[var(--color-primary)] rotate-90 shadow-[var(--color-primary)]/50' 
              : 'bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)]'
          )}>
            <ChevronRight className={cn(
              'w-6 h-6 lg:w-7 lg:h-7 transition-colors',
              isSelected ? 'text-white' : 'text-[var(--color-text-muted)]'
            )} />
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isSelected && (
        <div className="px-8 lg:px-10 xl:px-12 pb-10 lg:pb-12 pt-0 border-t-2 border-[var(--color-border)] bg-[var(--color-bg-card)]/30">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 pt-10 lg:pt-12">
            {/* Expected Behavior */}
            <div className="bg-[var(--color-bg-primary)] p-8 lg:p-10 rounded-xl border-2 border-[var(--color-border)] shadow-lg">
              <h5 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                Expected Behavior
              </h5>
              <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">{edgeCase.expectedBehavior}</p>
            </div>

            {/* UI Handling */}
            <div className="bg-[var(--color-bg-primary)] p-8 lg:p-10 rounded-xl border-2 border-[var(--color-border)] shadow-lg">
              <h5 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border-2 border-blue-500/20">
                  <Monitor className="w-6 h-6 text-blue-500" />
                </div>
                UI Handling
              </h5>
              {edgeCase.uiHandling.errorMessage && (
                <div className="info-box error mb-6 p-6 rounded-xl border-2 border-red-500/30">
                  <code className="text-base lg:text-lg text-red-400 font-semibold">{edgeCase.uiHandling.errorMessage}</code>
                </div>
              )}
              {edgeCase.uiHandling.recoveryOptions.length > 0 && (
                <div>
                  <span className="text-sm lg:text-base text-[var(--color-text-muted)] font-bold uppercase tracking-widest mb-4 block">Recovery Options:</span>
                  <ul className="space-y-4">
                    {edgeCase.uiHandling.recoveryOptions.map((opt, idx) => (
                      <li key={idx} className="text-base lg:text-lg text-[var(--color-text-secondary)] flex items-start gap-4 bg-[var(--color-bg-tertiary)] p-4 rounded-lg border border-[var(--color-border)]">
                        <ChevronRight className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                        <span className="flex-1 leading-relaxed">{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t-2 border-[var(--color-border)]">
            <h5 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 lg:mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border-2 border-[var(--color-primary)]/20">
                <FileCode2 className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-primary)]" />
              </div>
              Implementation Details
            </h5>
            <div className="flex flex-wrap gap-4 lg:gap-6 mb-8">
              {edgeCase.implementationNotes.flutterFiles.map((file, idx) => (
                <code key={idx} className="text-sm lg:text-base bg-[var(--color-bg-tertiary)] px-5 py-3 rounded-lg text-[var(--color-primary)] font-mono border-2 border-[var(--color-border)] shadow-md">
                  {file}
                </code>
              ))}
            </div>
            {edgeCase.implementationNotes.validationRules && (
              <div className="bg-[var(--color-bg-primary)] p-8 lg:p-10 rounded-xl border-2 border-[var(--color-border)]">
                <span className="text-sm lg:text-base text-[var(--color-text-muted)] font-bold uppercase tracking-widest mb-4 block">Validation Rules:</span>
                <div className="flex flex-wrap gap-4">
                  {edgeCase.implementationNotes.validationRules.map((rule, idx) => (
                    <code key={idx} className="text-sm lg:text-base bg-[var(--color-bg-tertiary)] px-5 py-3 rounded-lg text-[var(--color-text-secondary)] font-mono border-2 border-[var(--color-border)] shadow-md">
                      {rule}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Tests */}
          {edgeCase.relatedTestCases.length > 0 && (
            <div className="mt-10 lg:mt-12 pt-10 lg:pt-12 border-t-2 border-[var(--color-border)] flex items-center gap-5 lg:gap-6 flex-wrap bg-[var(--color-bg-primary)] p-6 lg:p-8 rounded-xl">
              <span className="text-base lg:text-lg text-[var(--color-text-muted)] font-semibold">Related Tests:</span>
              {edgeCase.relatedTestCases.map(tc => (
                <code key={tc} className="text-sm lg:text-base bg-[var(--color-bg-tertiary)] px-5 py-2.5 rounded-lg text-[var(--color-text-secondary)] font-mono border-2 border-[var(--color-border)] shadow-md">
                  {tc}
                </code>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
