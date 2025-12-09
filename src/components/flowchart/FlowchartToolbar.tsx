// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import {
  Save,
  Download,
  Trash2,
  RotateCcw,
  Undo2,
  Redo2,
  Image,
  FileJson,
  FileCode,
  ChevronDown,
  Check,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

interface FlowchartToolbarProps {
  flowchartName: string;
  onNameChange: (name: string) => void;
  onSave: () => void;
  onExportPNG: () => void;
  onExportSVG: () => void;
  onExportJSON: () => void;
  onClear: () => void;
  onDelete: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitView?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  hasChanges?: boolean;
  isSaving?: boolean;
  zoom?: number;
  hasFlowchart?: boolean;
}

export function FlowchartToolbar({
  flowchartName,
  onNameChange,
  onSave,
  onExportPNG,
  onExportSVG,
  onExportJSON,
  onClear,
  onDelete,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFitView,
  canUndo = false,
  canRedo = false,
  hasChanges = false,
  isSaving = false,
  zoom = 1,
  hasFlowchart = false,
}: FlowchartToolbarProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(flowchartName);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Update temp name when flowchart name changes externally
  useEffect(() => {
    setTempName(flowchartName);
  }, [flowchartName]);

  // Close export menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNameSubmit = () => {
    setIsEditingName(false);
    if (tempName.trim() && tempName !== flowchartName) {
      onNameChange(tempName.trim());
    } else {
      setTempName(flowchartName);
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    }
    if (e.key === 'Escape') {
      setTempName(flowchartName);
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]" style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px' }}>
      {/* Left side - Name and status */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Flowchart name */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={handleNameKeyDown}
              className="px-3 py-2 bg-[var(--color-bg-primary)] border border-[var(--color-primary)] rounded-xl text-base font-medium text-[var(--color-text-primary)] outline-none min-w-[180px] transition-all"
              autoFocus
            />
          ) : (
            <button
              onClick={() => hasFlowchart && setIsEditingName(true)}
              className={`
                text-base font-medium text-[var(--color-text-primary)] truncate max-w-[220px]
                ${hasFlowchart ? 'hover:text-[var(--color-primary)] cursor-text transition-colors' : 'cursor-default opacity-50'}
              `}
              disabled={!hasFlowchart}
              title={hasFlowchart ? 'Click to rename' : 'Create a flowchart first'}
            >
              {flowchartName || 'Untitled Flowchart'}
            </button>
          )}
          
          {/* Save status indicator */}
          <div className="flex items-center gap-1.5">
            {isSaving ? (
              <Loader2 className="w-5 h-5 text-[var(--color-primary)] animate-spin" />
            ) : hasChanges ? (
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Unsaved changes" />
            ) : hasFlowchart ? (
              <Check className="w-5 h-5 text-emerald-500" title="Saved" />
            ) : null}
          </div>
        </div>
      </div>

      {/* Center - Undo/Redo and Zoom */}
      <div className="flex items-center gap-3">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl" style={{ padding: '4px' }}>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl" style={{ padding: '4px' }}>
          <button
            onClick={onZoomOut}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all cursor-pointer"
            title="Zoom out"
            type="button"
          >
            <ZoomOut className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          <span className="text-sm font-medium text-[var(--color-text-muted)] min-w-[48px] text-center px-2">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all cursor-pointer"
            title="Zoom in"
            type="button"
          >
            <ZoomIn className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Fit view button clicked', { onFitView: !!onFitView });
              if (onFitView) {
                onFitView();
              }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-all cursor-pointer active:scale-95"
            title="Fit to view"
            type="button"
            style={{ position: 'relative', zIndex: 10 }}
          >
            <Maximize2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Clear canvas */}
        <button
          onClick={onClear}
          disabled={!hasFlowchart}
          className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ padding: '12px 20px' }}
          title="Clear canvas"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Clear</span>
        </button>

        {/* Export dropdown */}
        <div className="relative" ref={exportMenuRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={!hasFlowchart}
            className="text-base font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ padding: '12px 20px' }}
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden z-50">
              <button
                onClick={() => { onExportPNG(); setShowExportMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[var(--color-bg-primary)] transition-colors text-left"
              >
                <Image className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="text-base text-[var(--color-text-secondary)]">Export as PNG</span>
              </button>
              <button
                onClick={() => { onExportSVG(); setShowExportMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[var(--color-bg-primary)] transition-colors text-left"
              >
                <FileCode className="w-5 h-5 text-purple-500" />
                <span className="text-base text-[var(--color-text-secondary)]">Export as SVG</span>
              </button>
              <button
                onClick={() => { onExportJSON(); setShowExportMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[var(--color-bg-primary)] transition-colors text-left"
              >
                <FileJson className="w-5 h-5 text-amber-500" />
                <span className="text-base text-[var(--color-text-secondary)]">Export as JSON</span>
              </button>
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={onSave}
          disabled={!hasFlowchart || isSaving}
          className="text-base font-medium text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          style={{ padding: '12px 24px' }}
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>Save</span>
        </button>

        {/* Delete button */}
        <button
          onClick={onDelete}
          disabled={!hasFlowchart}
          className="text-base font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ padding: '12px 20px' }}
          title="Delete flowchart"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

