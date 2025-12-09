import { useState } from 'react';
import {
  Plus,
  Trash2,
  FileText,
  MoreVertical,
  Search,
  FolderOpen,
} from 'lucide-react';
import type { FlowchartListItem } from './types';
import { formatFlowchartDate } from './flowchartUtils';

interface FlowchartSidebarProps {
  flowcharts: FlowchartListItem[];
  currentId: string | null;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export function FlowchartSidebar({
  flowcharts,
  currentId,
  onLoad,
  onDelete,
  onNew,
}: FlowchartSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredFlowcharts = flowcharts.filter((fc) =>
    fc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMenuOpen(null);
    if (confirm('Are you sure you want to delete this flowchart?')) {
      onDelete(id);
    }
  };

  return (
    <div className="w-64 bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)] flex flex-col overflow-hidden">
      {/* Header */}
      <div style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px' }} className="border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            Saved Flowcharts
          </h3>
          <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-2 py-1 rounded-full">
            {flowcharts.length}
          </span>
        </div>
        
        {/* New button */}
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 text-base font-medium text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/20"
          style={{ padding: '16px 24px' }}
        >
          <Plus className="w-5 h-5" />
          <span>New Flowchart</span>
        </button>
      </div>

      {/* Search */}
      {flowcharts.length > 3 && (
        <div style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px' }} className="border-b border-[var(--color-border)]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl text-base text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-primary)] transition-all"
            />
          </div>
        </div>
      )}

      {/* Flowchart list */}
      <div className="flex-1 overflow-y-auto" style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '16px', paddingRight: '16px' }}>
        {filteredFlowcharts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="w-12 h-12 text-[var(--color-text-muted)] mb-3 opacity-50" />
            <p className="text-sm text-[var(--color-text-muted)]">
              {searchQuery ? 'No flowcharts found' : 'No flowcharts yet'}
            </p>
            {!searchQuery && (
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                Click "New Flowchart" to create one
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredFlowcharts.map((fc) => (
              <div
                key={fc.id}
                onClick={() => onLoad(fc.id)}
                className={`
                  group relative flex items-start gap-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${currentId === fc.id
                    ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30'
                    : 'hover:bg-[var(--color-bg-primary)]/50 border border-transparent'
                  }
                `}
                style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px', paddingRight: '16px', marginBottom: '8px' }}
              >
                {/* Icon */}
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                    ${currentId === fc.id
                      ? 'bg-[var(--color-primary)]/20'
                      : 'bg-[var(--color-bg-tertiary)] group-hover:bg-[var(--color-bg-card)]'
                    }
                  `}
                >
                  <FileText
                    className={`w-4 h-4 ${
                      currentId === fc.id
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-muted)]'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      currentId === fc.id
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                  >
                    {fc.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatFlowchartDate(fc.updatedAt)}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">•</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {fc.nodeCount} node{fc.nodeCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Menu button */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === fc.id ? null : fc.id);
                    }}
                    className={`
                      p-2 rounded-xl transition-all
                      ${menuOpen === fc.id
                        ? 'bg-[var(--color-bg-primary)]'
                        : 'opacity-0 group-hover:opacity-100 hover:bg-[var(--color-bg-primary)]'
                      }
                    `}
                  >
                    <MoreVertical className="w-5 h-5 text-[var(--color-text-muted)]" />
                  </button>

                  {/* Dropdown menu */}
                  {menuOpen === fc.id && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden z-50">
                      <button
                        onClick={(e) => handleDelete(e, fc.id)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-500/10 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="text-base font-medium">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '24px', paddingRight: '24px' }} className="border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)] text-center">
          Flowcharts are saved locally
        </p>
      </div>
    </div>
  );
}

