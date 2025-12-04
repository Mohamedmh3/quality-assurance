import { useState } from 'react';
import { ChevronRight, Folder, FolderOpen, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: TreeNode[];
}

interface FolderTreeProps {
  data: TreeNode;
  level?: number;
}

export function FolderTree({ data, level = 0 }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(level < 2);

  const isFolder = data.type === 'folder';
  const hasChildren = data.children && data.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          'group flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all cursor-pointer',
          'hover:bg-[var(--color-bg-tertiary)]',
          level > 0 && 'ml-8 border-l-2 border-[var(--color-border)]'
        )}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {/* Chevron for folders */}
        {isFolder && hasChildren ? (
          <div className={cn(
            'w-7 h-7 rounded-lg flex items-center justify-center transition-all',
            isOpen ? 'bg-[var(--color-primary)]/10' : 'bg-[var(--color-bg-card)]'
          )}>
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-all duration-300',
                isOpen ? 'rotate-90 text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
              )}
            />
          </div>
        ) : (
          <div className="w-7" />
        )}
        
        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center',
          isFolder 
            ? 'bg-amber-500/10' 
            : 'bg-[var(--color-primary)]/10'
        )}>
          {isFolder ? (
            isOpen ? (
              <FolderOpen className="w-5 h-5 text-amber-500" />
            ) : (
              <Folder className="w-5 h-5 text-amber-500" />
            )
          ) : (
            <FileCode2 className="w-5 h-5 text-[var(--color-primary)]" />
          )}
        </div>

        {/* Name and description */}
        <div className="flex items-center gap-5 min-w-0 flex-1">
          <span className={cn(
            'font-mono text-base',
            isFolder ? 'font-semibold text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
          )}>
            {data.name}
          </span>
          {data.description && (
            <span className="text-sm text-[var(--color-text-muted)] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
              {data.description}
            </span>
          )}
        </div>
      </div>

      {/* Children */}
      {isFolder && hasChildren && isOpen && (
        <div className="pl-4">
          {data.children!.map((child, index) => (
            <FolderTree key={index} data={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
