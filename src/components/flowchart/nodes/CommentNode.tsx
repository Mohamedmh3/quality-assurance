import { memo, useState, useCallback } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import type { FlowNodeData } from '../types';
import { SizeControl } from './NodeResizer';

function CommentNodeComponent({ id, data, selected }: NodeProps<FlowNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();
  
  const scale = data.size?.scale || 1;
  const baseWidth = 180;
  const baseHeight = 80;

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    data.label = label;
  }, [data, label]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      setIsEditing(false);
      data.label = label;
    }
    if (e.key === 'Escape') {
      setLabel(data.label);
      setIsEditing(false);
    }
  }, [data, label]);

  const handleScaleChange = useCallback((newScale: number) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                size: { width: baseWidth * newScale, height: baseHeight * newScale, scale: newScale },
              },
            }
          : node
      )
    );
  }, [id, setNodes]);

  return (
    <div
      className="relative"
      style={{
        width: baseWidth * scale,
        height: baseHeight * scale,
      }}
    >
      {/* Size preset buttons */}
      <SizeControl
        currentScale={scale}
        onScaleChange={handleScaleChange}
        visible={selected}
      />

      {/* Note/Comment shape with folded corner */}
      <div
        className={`
          w-full h-full relative
          bg-gradient-to-br from-yellow-100 to-yellow-200
          shadow-lg
          transition-all duration-200 ease-out
          ${selected ? 'ring-4 ring-yellow-400/50' : ''}
        `}
        style={{
          clipPath: `polygon(0 0, calc(100% - ${16 * scale}px) 0, 100% ${16 * scale}px, 100% 100%, 0 100%)`,
        }}
        onDoubleClick={handleDoubleClick}
      >
        {/* Folded corner effect */}
        <div
          className="absolute bg-gradient-to-br from-yellow-300 to-yellow-400"
          style={{
            width: 16 * scale,
            height: 16 * scale,
            top: 0,
            right: 0,
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          }}
        />
        
        {/* Inner shadow for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            clipPath: `polygon(0 0, calc(100% - ${16 * scale}px) 0, 100% ${16 * scale}px, 100% 100%, 0 100%)`,
          }}
        />
        
        {/* Content */}
        <div 
          className="absolute inset-0 flex flex-col p-2 overflow-hidden"
          style={{ paddingRight: Math.max(14, 16 * scale) }}
        >
          {/* Header */}
          <div className="mb-0.5 flex-shrink-0">
            <span 
              className="text-amber-700 font-bold uppercase tracking-wide"
              style={{ fontSize: `${Math.max(7, 8 * scale)}px` }}
            >
              Note
            </span>
          </div>
          
          {/* Text content */}
          {isEditing ? (
            <textarea
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-amber-50/50 rounded px-1.5 py-1 border border-amber-300 outline-none resize-none text-amber-900 font-medium"
              style={{ fontSize: `${Math.max(9, 10 * scale)}px`, lineHeight: 1.3 }}
              placeholder="Add note..."
              autoFocus
            />
          ) : (
            <p 
              className="flex-1 text-amber-900 font-medium overflow-hidden leading-tight"
              style={{ 
                fontSize: `${Math.max(9, 10 * scale)}px`, 
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: Math.max(2, Math.floor(3 * scale)),
                WebkitBoxOrient: 'vertical',
              }}
              title={label}
            >
              {label || 'Double-click to add...'}
            </p>
          )}
        </div>
      </div>
      
      {/* No handles - comments don't connect to flow */}
    </div>
  );
}

export const CommentNode = memo(CommentNodeComponent);

