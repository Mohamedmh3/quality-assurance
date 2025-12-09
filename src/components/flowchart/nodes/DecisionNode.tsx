import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import type { FlowNodeData } from '../types';
import { SizeControl } from './NodeResizer';

function DecisionNodeComponent({ id, data, selected }: NodeProps<FlowNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();
  
  const scale = data.size?.scale || 1;
  const baseSize = 120;

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
                size: { width: baseSize * newScale, height: baseSize * newScale, scale: newScale },
              },
            }
          : node
      )
    );
  }, [id, setNodes]);

  const size = baseSize * scale;

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Size preset buttons */}
      <SizeControl
        currentScale={scale}
        onScaleChange={handleScaleChange}
        visible={selected}
      />

      {/* Diamond shape */}
      <div
        className={`
          absolute transform rotate-45
          bg-gradient-to-br from-amber-400 to-orange-500
          shadow-lg rounded-lg
          transition-all duration-200 ease-out
          ${selected ? 'ring-4 ring-amber-300/50' : ''}
        `}
        style={{
          width: size * 0.7,
          height: size * 0.7,
          top: size * 0.15,
          left: size * 0.15,
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/25 to-transparent" />
      </div>
      
      {/* Content (not rotated) */}
      <div className="absolute inset-0 flex items-center justify-center text-white z-10 pointer-events-none overflow-hidden">
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-white/10 rounded px-1.5 py-0.5 outline-none font-medium text-center pointer-events-auto border border-white/30"
            style={{ fontSize: `${Math.max(9, 10 * scale)}px`, width: size * 0.5, maxWidth: 90 }}
            autoFocus
          />
        ) : (
          <span 
            className="font-medium text-center leading-tight truncate px-1"
            style={{ 
              fontSize: `${Math.max(9, 10 * scale)}px`, 
              maxWidth: size * 0.55,
            }}
            title={label}
          >
            {label}
          </span>
        )}
      </div>
      
      {/* Input handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!border-orange-500"
      />
      
      {/* Output handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!border-orange-500"
      />
      
      {/* Output handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!border-orange-500"
      />
      
      {/* Output handle (left) */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="!border-orange-500"
      />
    </div>
  );
}

export const DecisionNode = memo(DecisionNodeComponent);
