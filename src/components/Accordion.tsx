import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: ReactNode;
  className?: string;
}

export function AccordionItem({ title, children, defaultOpen = false, badge, className }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('accordion-item', isOpen && 'open', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accordion-header w-full text-left p-6 lg:p-8"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6 lg:gap-8 flex-1 min-w-0">
          {title}
        </div>
        <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
          {badge}
          <div className={cn(
            'w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg',
            isOpen 
              ? 'bg-[var(--color-primary)] rotate-180 shadow-[var(--color-primary)]/50' 
              : 'bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-border)]'
          )}>
            <ChevronDown
              className={cn(
                'w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300',
                isOpen ? 'text-white' : 'text-[var(--color-text-muted)]'
              )}
            />
          </div>
        </div>
      </button>
      <div
        className={cn(
          'grid transition-all duration-400 ease-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="accordion-content pt-8 lg:pt-10 px-6 lg:px-8 pb-6 lg:pb-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn('space-y-6 lg:space-y-8', className)}>{children}</div>;
}
