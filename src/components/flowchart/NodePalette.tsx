import { DragEvent } from 'react';
import {
  Play,
  Square,
  Settings,
  HelpCircle,
  Database,
  Zap,
  Circle,
  MessageSquare,
} from 'lucide-react';
import { nodeTemplates } from './flowchartUtils';
import type { FlowNodeType } from './types';

interface NodePaletteProps {
  onDragStart?: (event: DragEvent<HTMLDivElement>, nodeType: FlowNodeType) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Play,
  Square,
  Settings,
  HelpCircle,
  Database,
  Zap,
  Circle,
  MessageSquare,
};

export function NodePalette({ onDragStart }: NodePaletteProps) {
  const handleDragStart = (event: DragEvent<HTMLDivElement>, nodeType: FlowNodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    onDragStart?.(event, nodeType);
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ padding: '32px' }}>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-6">
        Drag to Canvas
      </h3>
      <div className="grid grid-cols-8 gap-4">
        {nodeTemplates.map((template) => {
          const Icon = iconMap[template.icon];
          return (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => handleDragStart(e, template.type)}
              className={`
                group relative flex flex-col items-center gap-2 rounded-xl
                bg-[var(--color-bg-primary)] border border-[var(--color-border)]
                cursor-grab active:cursor-grabbing
                transition-all duration-200 ease-out
                hover:border-[var(--color-primary)] hover:scale-105
                hover:shadow-lg hover:shadow-[var(--color-primary)]/10
              `}
              style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '12px', paddingRight: '12px' }}
              title={template.description}
            >
              {/* Node preview */}
              <div
                className={`
                  w-10 h-10 rounded-lg bg-gradient-to-r ${template.color}
                  flex items-center justify-center text-white
                  shadow-md transition-transform duration-200
                  group-hover:scale-110
                `}
              >
                {Icon && <Icon className="w-5 h-5" />}
              </div>
              
              {/* Label */}
              <span className="text-xs font-medium text-[var(--color-text-secondary)] text-center">
                {template.label}
              </span>
              
              {/* Tooltip */}
              <div className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                px-3 py-2 rounded-lg
                bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                text-xs text-[var(--color-text-secondary)]
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 whitespace-nowrap z-50
                shadow-lg
              ">
                {template.description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                  <div className="w-2 h-2 bg-[var(--color-bg-elevated)] border-r border-b border-[var(--color-border)] rotate-45" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

