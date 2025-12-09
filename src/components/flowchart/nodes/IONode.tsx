import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import type { FlowNodeData } from '../types';
import { NodeResizer, SizeControl } from './NodeResizer';

function IONodeComponent({ id, data, selected }: NodeProps<FlowNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();
  
  const scale = data.size?.scale || 1;
  const baseWidth = 180;
  const baseHeight = 56;

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
      onDoubleClick={handleDoubleClick}
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

      {/* Parallelogram shape using CSS */}
      <div
        className={`
          w-full h-full
          bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600
          text-white shadow-lg
          transition-all duration-200 ease-out
          flex items-center justify-center
          overflow-hidden
          ${selected ? 'ring-4 ring-purple-300/50' : ''}
        `}
        style={{
          clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)',
        }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none"
          style={{
            clipPath: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)',
          }}
        />
        
        {/* Content */}
        <div 
          className="flex items-center justify-center relative z-10 px-4 max-w-full"
          style={{ fontSize: `${Math.max(10, 12 * scale)}px` }}
        >
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-white/10 rounded px-2 py-0.5 outline-none font-medium text-center min-w-[50px] max-w-[120px] border border-white/30"
              style={{ fontSize: `${Math.max(10, 12 * scale)}px` }}
              autoFocus
            />
          ) : (
            <span 
              className="font-medium tracking-tight truncate text-center"
              style={{ maxWidth: `${baseWidth * scale * 0.75}px` }}
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
        className="!border-purple-500"
      />
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-purple-500"
      />
    </div>
  );
}

export const IONode = memo(IONodeComponent);
