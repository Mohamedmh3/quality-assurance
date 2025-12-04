import { useState } from 'react';
import { CheckCircle2, FileCode2, Users, ClipboardList, ChevronRight, Target, AlertCircle, Zap } from 'lucide-react';
import type { UseCase } from '@/lib/types';
import { Accordion, AccordionItem } from './Accordion';
import { PriorityBadge, Badge } from './Badge';
import { cn } from '@/lib/utils';

interface UseCaseSectionProps {
  useCases: UseCase[];
}

export function UseCaseSection({ useCases }: UseCaseSectionProps) {
  const [filter, setFilter] = useState<string>('all');

  const filteredCases = useCases.filter(uc => {
    if (filter === 'all') return true;
    return uc.priority === filter;
  });

  const priorityCounts = {
    Critical: useCases.filter(uc => uc.priority === 'Critical').length,
    High: useCases.filter(uc => uc.priority === 'High').length,
    Medium: useCases.filter(uc => uc.priority === 'Medium').length,
    Low: useCases.filter(uc => uc.priority === 'Low').length,
  };

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Header with stats */}
      <div className="flex flex-wrap items-center justify-between gap-8 lg:gap-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--color-text-primary)] flex items-center gap-5 mb-4">
            <div className="icon-container w-14 h-14 lg:w-16 lg:h-16 shadow-xl">
              <ClipboardList className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
            </div>
            Use Cases
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            {useCases.length} documented use cases for this feature
          </p>
        </div>
        
        {/* Priority filter chips */}
        <div className="flex flex-wrap gap-4 lg:gap-6">
          <FilterChip 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={useCases.length}
          >
            All
          </FilterChip>
          {(['Critical', 'High', 'Medium', 'Low'] as const).map(priority => (
            <FilterChip
              key={priority}
              active={filter === priority}
              onClick={() => setFilter(priority)}
              count={priorityCounts[priority]}
            >
              {priority}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Use case list */}
      <Accordion>
        {filteredCases.map((useCase, index) => (
          <AccordionItem
            key={useCase.id}
            defaultOpen={index === 0}
            badge={<PriorityBadge priority={useCase.priority} />}
            title={
              <div className="flex items-center gap-5 lg:gap-6 flex-wrap">
                <code className="text-sm lg:text-base font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-5 py-2.5 rounded-lg border-2 border-[var(--color-border)] shadow-md">
                  {useCase.id}
                </code>
                <span className="font-bold text-[var(--color-text-primary)] text-xl lg:text-2xl">
                  {useCase.title}
                </span>
                <Badge variant="outline" size="sm">
                  <Users className="w-5 h-5 mr-2" />
                  {useCase.userType}
                </Badge>
              </div>
            }
          >
            <UseCaseContent useCase={useCase} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function UseCaseContent({ useCase }: { useCase: UseCase }) {
  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Description */}
      <div className="bg-[var(--color-bg-primary)] rounded-2xl p-10 lg:p-12 xl:p-16 border-2 border-[var(--color-border)] shadow-lg">
        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed">
          {useCase.description}
        </p>
      </div>

      {/* Preconditions */}
      <div>
        <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 lg:mb-8 flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-amber-500/10 flex items-center justify-center border-2 border-amber-500/20 shadow-md">
            <AlertCircle className="w-6 h-6 lg:w-7 lg:h-7 text-amber-500" />
          </div>
          Preconditions
        </h4>
        <ul className="space-y-5 lg:space-y-6 ml-2">
          {useCase.preconditions.map((condition, idx) => (
            <li key={idx} className="flex items-start gap-5 text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] p-5 lg:p-6 rounded-xl border border-[var(--color-border)]">
              <div className="w-3 h-3 mt-1.5 rounded-full bg-amber-500 flex-shrink-0" />
              <span className="text-base lg:text-lg leading-relaxed">{condition}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div>
        <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-8 lg:mb-10 flex items-center gap-4">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center border-2 border-[var(--color-primary)]/20 shadow-md">
            <Zap className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--color-primary)]" />
          </div>
          User Flow Steps
        </h4>
        <div className="space-y-6 lg:space-y-8">
          {useCase.steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex gap-6 lg:gap-8"
            >
              {/* Step number bubble */}
              <div className="flex flex-col items-center">
                <div className="step-indicator flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 text-xl lg:text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                {/* Connecting line */}
                {idx < useCase.steps.length - 1 && (
                  <div className="w-1 flex-1 mt-4 bg-gradient-to-b from-[var(--color-primary)]/50 to-[var(--color-border)]" />
                )}
              </div>
              
              <div className="flex-1 bg-[var(--color-bg-tertiary)] rounded-2xl p-8 lg:p-10 xl:p-12 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all shadow-lg hover:shadow-xl">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                  <div>
                    <span className="text-sm uppercase text-[var(--color-text-muted)] font-bold tracking-widest">Action</span>
                    <p className="text-base lg:text-lg text-[var(--color-text-primary)] mt-4 leading-relaxed">{step.action}</p>
                  </div>
                  <div>
                    <span className="text-sm uppercase text-[var(--color-text-muted)] font-bold tracking-widest">Expected Result</span>
                    <p className="text-base lg:text-lg text-[var(--color-text-primary)] mt-4 leading-relaxed">{step.expectedResult}</p>
                  </div>
                </div>
                
                {step.uiState && (
                  <div className="mt-8 pt-8 border-t-2 border-[var(--color-border)]">
                    <span className="text-sm uppercase text-[var(--color-text-muted)] font-bold tracking-widest">UI State</span>
                    <p className="text-base lg:text-lg text-[var(--color-text-secondary)] mt-4 italic">{step.uiState}</p>
                  </div>
                )}
                
                {step.flutterFile && (
                  <div className="mt-8 pt-8 border-t-2 border-[var(--color-border)] flex items-center gap-4">
                    <FileCode2 className="w-6 h-6 text-[var(--color-primary)]" />
                    <code className="text-sm lg:text-base bg-[var(--color-bg-primary)] px-5 py-2.5 rounded-lg font-mono text-[var(--color-primary)] border-2 border-[var(--color-border)] shadow-md">
                      {step.flutterFile}
                    </code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Postconditions & Success Criteria */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        <div className="bg-[var(--color-bg-tertiary)] rounded-2xl p-8 lg:p-10 xl:p-12 border-2 border-[var(--color-border)] shadow-lg">
          <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 lg:mb-8 flex items-center gap-4">
            <CheckCircle2 className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-500" />
            Postconditions
          </h4>
          <ul className="space-y-5 lg:space-y-6">
            {useCase.postconditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-5 text-[var(--color-text-secondary)]">
                <ChevronRight className="w-6 h-6 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span className="text-base lg:text-lg leading-relaxed">{condition}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-[var(--color-bg-tertiary)] rounded-2xl p-8 lg:p-10 xl:p-12 border-2 border-[var(--color-border)] shadow-lg">
          <h4 className="text-xl lg:text-2xl font-bold text-[var(--color-text-primary)] mb-6 lg:mb-8 flex items-center gap-4">
            <Target className="w-7 h-7 lg:w-8 lg:h-8 text-[var(--color-primary)]" />
            Success Criteria
          </h4>
          <ul className="space-y-5 lg:space-y-6">
            {useCase.successCriteria.map((criteria, idx) => (
              <li key={idx} className="flex items-start gap-5 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-6 h-6 mt-0.5 text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-base lg:text-lg leading-relaxed">{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Test Cases */}
      {useCase.relatedTestCases.length > 0 && (
        <div className="flex items-center gap-5 lg:gap-6 pt-8 border-t-2 border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6 lg:p-8 rounded-xl">
          <span className="text-base lg:text-lg text-[var(--color-text-muted)] font-semibold">Related Tests:</span>
          <div className="flex flex-wrap gap-4">
            {useCase.relatedTestCases.map(tc => (
              <code key={tc} className="text-sm lg:text-base bg-[var(--color-bg-tertiary)] px-5 py-2.5 rounded-lg text-[var(--color-text-secondary)] font-mono border-2 border-[var(--color-border)] shadow-md">
                {tc}
              </code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterChipProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}

function FilterChip({ children, active, onClick, count }: FilterChipProps) {

  return (
    <button
      onClick={onClick}
      className={cn(
        'chip cursor-pointer',
        active && 'active'
      )}
    >
      {children}
      <span className={cn(
        'text-xs font-bold px-2 py-0.5 rounded-md',
        active ? 'bg-white/20' : 'bg-[var(--color-bg-primary)]'
      )}>
        {count}
      </span>
    </button>
  );
}
