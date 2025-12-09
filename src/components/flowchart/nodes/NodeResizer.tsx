import { memo } from 'react';

// Size presets for quick selection
export const sizePresets = [
  { label: 'XS', scale: 0.6 },
  { label: 'S', scale: 0.8 },
  { label: 'M', scale: 1.0 },
  { label: 'L', scale: 1.3 },
  { label: 'XL', scale: 1.6 },
];

interface SizeControlProps {
  currentScale: number;
  onScaleChange: (scale: number) => void;
  visible?: boolean;
}

function SizeControlComponent({ currentScale, onScaleChange, visible = true }: SizeControlProps) {
  if (!visible) return null;

  return (
    <div 
      className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg px-2 py-1.5 shadow-lg"
      style={{ zIndex: 100 }}
    >
      {sizePresets.map((preset) => (
        <button
          key={preset.label}
          onClick={(e) => {
            e.stopPropagation();
            onScaleChange(preset.scale);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={`
            px-2.5 py-1 text-xs font-bold rounded transition-all
            ${Math.abs(currentScale - preset.scale) < 0.1
              ? 'bg-[var(--color-primary)] text-white shadow-md'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
            }
          `}
        >
          {preset.label}
        </button>
      ))}
      <div className="w-px h-5 bg-[var(--color-border)] mx-1" />
      <span className="text-xs text-[var(--color-text-muted)] font-mono min-w-[40px] text-center">
        {Math.round(currentScale * 100)}%
      </span>
    </div>
  );
}

export const SizeControl = memo(SizeControlComponent);

// Keep NodeResizer export for backwards compatibility but it's now empty
interface NodeResizerProps {
  nodeId: string;
  minScale?: number;
  maxScale?: number;
  currentScale: number;
  onScaleChange: (scale: number) => void;
  selected?: boolean;
  baseWidth: number;
  baseHeight: number;
}

function NodeResizerComponent(_props: NodeResizerProps) {
  // No longer rendering corner handles
  return null;
}

export const NodeResizer = memo(NodeResizerComponent);
