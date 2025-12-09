import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import type { FlowNodeData } from '../types';
import { NodeResizer, SizeControl } from './NodeResizer';

function EndNodeComponent({ id, data, selected }: NodeProps<FlowNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();
  
  const scale = data.size?.scale || 1;
  const baseWidth = 120;
  const baseHeight = 48;

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    data.label = label;
  }, [data, label]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
      {/* Resize handles */}
      <NodeResizer
        nodeId={id}
        selected={selected}
        currentScale={scale}
        onScaleChange={handleScaleChange}
        baseWidth={baseWidth}
        baseHeight={baseHeight}
        minScale={0.5}
        maxScale={2.0}
      />
      
      {/* Size preset buttons */}
      <SizeControl
        currentScale={scale}
        onScaleChange={handleScaleChange}
        visible={selected}
      />

      {/* Node content */}
      <div
        className={`
          w-full h-full rounded-full
          bg-gradient-to-br from-red-400 via-red-500 to-red-600
          text-white shadow-lg
          transition-all duration-200 ease-out
          hover:shadow-xl flex items-center justify-center
          overflow-hidden
          ${selected ? 'ring-4 ring-red-300/50' : ''}
        `}
        onDoubleClick={handleDoubleClick}
      >
        {/* Top glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div 
          className="flex items-center justify-center relative z-10 px-2 max-w-full"
          style={{ fontSize: `${Math.max(10, 11 * scale)}px` }}
        >
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-white/10 rounded px-1.5 py-0.5 outline-none font-medium text-center min-w-[30px] max-w-[80px] border border-white/30"
              style={{ fontSize: `${Math.max(10, 11 * scale)}px` }}
              autoFocus
            />
          ) : (
            <span 
              className="font-medium tracking-tight truncate text-center"
              style={{ maxWidth: `${baseWidth * scale * 0.7}px` }}
              title={label}
            >
              {label}
            </span>
          )}
        </div>
      </div>
      
      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!border-red-500"
      />
    </div>
  );
}

export const EndNode = memo(EndNodeComponent);
