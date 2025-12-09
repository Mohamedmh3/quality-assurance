import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';
import type { FlowNodeData } from '../types';
import { NodeResizer, SizeControl } from './NodeResizer';

function ConnectorNodeComponent({ id, data, selected }: NodeProps<FlowNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const { setNodes } = useReactFlow();
  
  const scale = data.size?.scale || 1;
  const baseSize = 56;

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
    >
      {/* Resize handles */}
      <NodeResizer
        nodeId={id}
        selected={selected}
        currentScale={scale}
        onScaleChange={handleScaleChange}
        baseWidth={baseSize}
        baseHeight={baseSize}
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
          bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600
          text-white shadow-lg
          flex items-center justify-center
          transition-all duration-200 ease-out
          hover:shadow-xl
          overflow-hidden
          ${selected ? 'ring-4 ring-slate-300/50' : ''}
        `}
        onDoubleClick={handleDoubleClick}
      >
        {/* Top glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 max-w-full px-1">
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-white/10 rounded px-1 py-0.5 outline-none font-semibold text-center border border-white/30"
              style={{ fontSize: `${Math.max(9, 10 * scale)}px`, width: size * 0.6, maxWidth: 40 }}
              autoFocus
            />
          ) : (
            <span 
              className="font-semibold truncate block text-center"
              style={{ fontSize: `${Math.max(9, 10 * scale)}px`, maxWidth: size * 0.7 }}
              title={label}
            >
              {label}
            </span>
          )}
        </div>
      </div>
      
      {/* Input handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!border-gray-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!border-gray-500"
      />
      
      {/* Output handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!border-gray-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!border-gray-500"
      />
    </div>
  );
}

export const ConnectorNode = memo(ConnectorNodeComponent);
