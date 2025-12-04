import { cn } from '@/lib/utils';
import type { TestStatus, TestPriority, TestCaseType, EdgeCaseCategory, Priority, Likelihood } from '@/lib/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-lg shadow-[var(--color-primary)]/20',
  outline: 'border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)]/50',
  success: 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-400 border border-emerald-500/30',
  warning: 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30',
  error: 'bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 border border-red-500/30',
  info: 'bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-400 border border-blue-500/30',
};

const sizeStyles = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2 text-base',
};

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge-base inline-flex items-center font-semibold rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Priority Badge for Use Cases and Edge Cases
interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const styles: Record<Priority, string> = {
    Critical: 'badge-critical',
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };

  return (
    <span className={cn('badge-base', styles[priority], className)}>
      {priority}
    </span>
  );
}

// Likelihood Badge for Edge Cases
interface LikelihoodBadgeProps {
  likelihood: Likelihood;
  className?: string;
}

export function LikelihoodBadge({ likelihood, className }: LikelihoodBadgeProps) {
  const styles: Record<Likelihood, string> = {
    High: 'bg-gradient-to-r from-red-500/25 to-red-600/15 text-red-400 border border-red-500/40',
    Medium: 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-400 border border-amber-500/40',
    Low: 'bg-gradient-to-r from-emerald-500/25 to-emerald-600/15 text-emerald-400 border border-emerald-500/40',
  };

  return (
    <span className={cn('badge-base', styles[likelihood], className)}>
      {likelihood}
    </span>
  );
}

// Category Badge for Edge Cases
interface CategoryBadgeProps {
  category: EdgeCaseCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colors: Record<EdgeCaseCategory, string> = {
    Validation: 'bg-gradient-to-r from-purple-500/25 to-purple-600/15 text-purple-400 border border-purple-500/40',
    Network: 'bg-gradient-to-r from-sky-500/25 to-sky-600/15 text-sky-400 border border-sky-500/40',
    State: 'bg-gradient-to-r from-orange-500/25 to-orange-600/15 text-orange-400 border border-orange-500/40',
    Concurrency: 'bg-gradient-to-r from-pink-500/25 to-pink-600/15 text-pink-400 border border-pink-500/40',
    Data: 'bg-gradient-to-r from-cyan-500/25 to-cyan-600/15 text-cyan-400 border border-cyan-500/40',
    UI: 'bg-gradient-to-r from-teal-500/25 to-teal-600/15 text-teal-400 border border-teal-500/40',
    Performance: 'bg-gradient-to-r from-yellow-500/25 to-yellow-600/15 text-yellow-400 border border-yellow-500/40',
  };

  return (
    <span className={cn('badge-base', colors[category], className)}>
      {category}
    </span>
  );
}

// Test Priority Badge
interface TestPriorityBadgeProps {
  priority: TestPriority;
  className?: string;
}

export function TestPriorityBadge({ priority, className }: TestPriorityBadgeProps) {
  const styles: Record<TestPriority, { bg: string; label: string }> = {
    P0: { bg: 'badge-critical', label: 'P0 - Critical' },
    P1: { bg: 'badge-high', label: 'P1 - High' },
    P2: { bg: 'badge-medium', label: 'P2 - Medium' },
    P3: { bg: 'badge-low', label: 'P3 - Low' },
  };

  return (
    <span className={cn('badge-base', styles[priority].bg, className)}>
      {styles[priority].label}
    </span>
  );
}

// Test Status Badge
interface TestStatusBadgeProps {
  status: TestStatus;
  className?: string;
}

export function TestStatusBadge({ status, className }: TestStatusBadgeProps) {
  const styles: Record<TestStatus, string> = {
    'Not Started': 'bg-gradient-to-r from-slate-500/25 to-slate-600/15 text-slate-400 border border-slate-500/40',
    'In Progress': 'bg-gradient-to-r from-blue-500/25 to-blue-600/15 text-blue-400 border border-blue-500/40',
    'Pass': 'bg-gradient-to-r from-emerald-500/25 to-emerald-600/15 text-emerald-400 border border-emerald-500/40',
    'Fail': 'bg-gradient-to-r from-red-500/25 to-red-600/15 text-red-400 border border-red-500/40',
    'Blocked': 'bg-gradient-to-r from-orange-500/25 to-orange-600/15 text-orange-400 border border-orange-500/40',
    'Skip': 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-400 border border-amber-500/40',
  };

  return (
    <span className={cn('badge-base whitespace-nowrap', styles[status], className)}>
      {status}
    </span>
  );
}

// Test Type Badge
interface TestTypeBadgeProps {
  type: TestCaseType;
  className?: string;
}

export function TestTypeBadge({ type, className }: TestTypeBadgeProps) {
  const styles: Record<TestCaseType, string> = {
    Functional: 'bg-gradient-to-r from-blue-500/25 to-blue-600/15 text-blue-400 border border-blue-500/40',
    Integration: 'bg-gradient-to-r from-purple-500/25 to-purple-600/15 text-purple-400 border border-purple-500/40',
    Accessibility: 'bg-gradient-to-r from-cyan-500/25 to-cyan-600/15 text-cyan-400 border border-cyan-500/40',
    Performance: 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-400 border border-amber-500/40',
    Security: 'bg-gradient-to-r from-red-500/25 to-red-600/15 text-red-400 border border-red-500/40',
    UI: 'bg-gradient-to-r from-pink-500/25 to-pink-600/15 text-pink-400 border border-pink-500/40',
  };

  return (
    <span className={cn('badge-base', styles[type], className)}>
      {type}
    </span>
  );
}

// Status Badge for feature stability
interface StatusBadgeProps {
  status: 'Stable' | 'Beta' | 'Alpha' | 'Deprecated';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Stable: 'status-stable',
    Beta: 'status-beta',
    Alpha: 'bg-gradient-to-r from-orange-500/25 to-orange-600/15 text-orange-400 border border-orange-500/40',
    Deprecated: 'bg-gradient-to-r from-red-500/25 to-red-600/15 text-red-400 border border-red-500/40',
  };

  return (
    <span className={cn('badge-base', styles[status], className)}>
      {status}
    </span>
  );
}

// Architecture Badge
interface ArchitectureBadgeProps {
  type: 'MVVM' | 'Clean' | 'MVC' | 'MVP';
  className?: string;
}

export function ArchitectureBadge({ type, className }: ArchitectureBadgeProps) {
  return (
    <span className={cn(
      'badge-base',
      'bg-gradient-to-r from-[var(--color-primary)]/25 to-[var(--color-primary)]/10',
      'text-[var(--color-primary)] border border-[var(--color-primary)]/40',
      className
    )}>
      {type}
    </span>
  );
}
