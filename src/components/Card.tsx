import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'elevated' | 'glass' | 'outline';
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-6 lg:p-8',
  md: 'p-8 lg:p-10',
  lg: 'p-10 lg:p-12 xl:p-16',
  xl: 'p-12 lg:p-16 xl:p-20',
};

const variantMap = {
  default: 'card-base',
  elevated: 'card-base shadow-lg',
  glass: 'glass rounded-[var(--radius-xl)]',
  outline: 'bg-transparent border-2 border-[var(--color-border)] rounded-[var(--radius-xl)]',
};

export function Card({ children, className, hover = false, onClick, padding = 'lg', variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        variantMap[variant],
        paddingMap[padding],
        hover && 'card-hover cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-6 lg:gap-8 mb-8 lg:mb-10', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('font-semibold text-[var(--color-text-primary)]', className)}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-base lg:text-lg text-[var(--color-text-secondary)] mt-4 leading-relaxed', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('space-y-6 lg:space-y-8', className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('flex items-center gap-8 lg:gap-10 mt-10 lg:mt-12 pt-10 lg:pt-12 border-t-2 border-[var(--color-border)]', className)}>
      {children}
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      {icon && <div className="mb-4">{icon}</div>}
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Info Box Component
interface InfoBoxProps {
  children: ReactNode;
  variant?: 'default' | 'warning' | 'error' | 'success';
  className?: string;
}

export function InfoBox({ children, variant = 'default', className }: InfoBoxProps) {
  return (
    <div className={cn('info-box', variant !== 'default' && variant, className)}>
      {children}
    </div>
  );
}
