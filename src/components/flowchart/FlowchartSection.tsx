// @ts-nocheck
import { useState, useCallback, useRef, useEffect, DragEvent } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  ReactFlowInstance,
  BackgroundVariant,
  Panel,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './nodes';
import { NodePalette } from './NodePalette';
import { FlowchartToolbar } from './FlowchartToolbar';
import { FlowchartSidebar } from './FlowchartSidebar';
import { useFlowchartStore } from '@/store/flowchart-store';
import {
  createNewFlowchart,
  createNode,
  exportAsPng,
  exportAsSvg,
  exportAsJson,
  getEdgeColorClass,
} from './flowchartUtils';
import type { Flowchart, FlowNode, FlowEdge, FlowNodeType } from './types';
import { GitBranch } from 'lucide-react';

// History state type
interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

// Maximum history size
const MAX_HISTORY_SIZE = 50;

interface FlowchartSectionProps {
  featureId: string;
}

// Default edge options
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: {
    stroke: '#FF6B35',
    strokeWidth: 2,
  },
  interactionWidth: 20, // Wider area for easier selection
};

function FlowchartSectionInner({ featureId }: FlowchartSectionProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge[]>([]);
  const [currentFlowchart, setCurrentFlowchart] = useState<Flowchart | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [zoom, setZoom] = useState(1);

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [future, setFuture] = useState<HistoryState[]>([]);
  const isUndoingRef = useRef(false);
  const lastStateRef = useRef<string>('');

  // Zustand store
  const { saveFlowchart, loadFlowchart, deleteFlowchart, getFlowcharts } = useFlowchartStore();

  // Get all flowcharts for this feature
  const flowchartList = getFlowcharts(featureId);

  // Push current state to history (debounced)
  const pushToHistory = useCallback(() => {
    if (isUndoingRef.current) return;
    
    const currentState = JSON.stringify({ nodes, edges });
    
    // Don't push duplicate states
    if (currentState === lastStateRef.current) return;
    lastStateRef.current = currentState;

    setHistory((prev) => {
      const newHistory = [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }];
      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        return newHistory.slice(-MAX_HISTORY_SIZE);
      }
      return newHistory;
    });
    // Clear future when new action is performed
    setFuture([]);
  }, [nodes, edges]);

  // Track changes and update history
  useEffect(() => {
    if (currentFlowchart) {
      setHasChanges(true);
      // Debounce history push
      const timer = setTimeout(pushToHistory, 300);
      return () => clearTimeout(timer);
    }
  }, [nodes, edges, currentFlowchart, pushToHistory]);

  // Undo action
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    isUndoingRef.current = true;

    // Save current state to future
    setFuture((prev) => [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);

    // Get previous state
    const newHistory = [...history];
    const previousState = newHistory.pop();
    setHistory(newHistory);

    if (previousState) {
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      lastStateRef.current = JSON.stringify(previousState);
    }

    // Reset flag after state updates
    setTimeout(() => {
      isUndoingRef.current = false;
    }, 100);
  }, [history, nodes, edges, setNodes, setEdges]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (future.length === 0) return;

    isUndoingRef.current = true;

    // Save current state to history
    setHistory((prev) => [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);

    // Get future state
    const newFuture = [...future];
    const nextState = newFuture.pop();
    setFuture(newFuture);

    if (nextState) {
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      lastStateRef.current = JSON.stringify(nextState);
    }

    // Reset flag after state updates
    setTimeout(() => {
      isUndoingRef.current = false;
    }, 100);
  }, [future, nodes, edges, setNodes, setEdges]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if we're in an input or textarea
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Ctrl+Z or Cmd+Z for undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }
      
      // Ctrl+Y or Cmd+Shift+Z for redo
      if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            animated: false,
            selectable: true,
            interactionWidth: 20,
            style: {
              stroke: getEdgeColorClass(),
              strokeWidth: 2,
            },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Handle drag over canvas
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop on canvas
  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as FlowNodeType;
      
      if (!type || !reactFlowInstance) {
        return;
      }

      // Use screenToFlowPosition with the raw client coordinates
      // This correctly converts screen position to flow position
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(type, position);
      setNodes((nds) => [...nds, newNode]);

      // Create a new flowchart if we don't have one
      if (!currentFlowchart) {
        const newFlowchart = createNewFlowchart(featureId);
        setCurrentFlowchart(newFlowchart);
        setHasChanges(true);
      }
    },
    [reactFlowInstance, setNodes, currentFlowchart, featureId]
  );

  // Create new flowchart
  const handleNewFlowchart = useCallback(() => {
    const newFlowchart = createNewFlowchart(featureId);
    setCurrentFlowchart(newFlowchart);
    setNodes([]);
    setEdges([]);
    setHasChanges(true);
    // Reset history
    setHistory([]);
    setFuture([]);
    lastStateRef.current = '';
  }, [featureId, setNodes, setEdges]);

  // Load flowchart
  const handleLoadFlowchart = useCallback(
    (flowchartId: string) => {
      const flowchart = loadFlowchart(featureId, flowchartId);
      if (flowchart) {
        setCurrentFlowchart(flowchart);
        setNodes(flowchart.nodes || []);
        setEdges(flowchart.edges || []);
        setHasChanges(false);
        // Reset history
        setHistory([]);
        setFuture([]);
        lastStateRef.current = JSON.stringify({ nodes: flowchart.nodes || [], edges: flowchart.edges || [] });

        // Restore viewport
        if (flowchart.viewport && reactFlowInstance) {
          setTimeout(() => {
            reactFlowInstance.setViewport(flowchart.viewport!);
          }, 100);
        }
      }
    },
    [featureId, loadFlowchart, setNodes, setEdges, reactFlowInstance]
  );

  // Save flowchart
  const handleSave = useCallback(async () => {
    if (!currentFlowchart) return;

    setIsSaving(true);

    const viewport = reactFlowInstance?.getViewport();
    const updatedFlowchart: Flowchart = {
      ...currentFlowchart,
      nodes,
      edges,
      viewport,
      updatedAt: new Date().toISOString(),
    };

    saveFlowchart(featureId, updatedFlowchart);
    setCurrentFlowchart(updatedFlowchart);
    setHasChanges(false);

    // Simulate save delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
  }, [currentFlowchart, featureId, nodes, edges, reactFlowInstance, saveFlowchart]);

  // Delete flowchart
  const handleDelete = useCallback(() => {
    if (!currentFlowchart) return;

    if (confirm(`Are you sure you want to delete "${currentFlowchart.name}"?`)) {
      deleteFlowchart(featureId, currentFlowchart.id);
      setCurrentFlowchart(null);
      setNodes([]);
      setEdges([]);
      setHasChanges(false);
    }
  }, [currentFlowchart, featureId, deleteFlowchart, setNodes, setEdges]);

  // Clear canvas
  const handleClear = useCallback(() => {
    if (confirm('Clear all nodes and connections?')) {
      // Push current state to history before clearing
      if (nodes.length > 0 || edges.length > 0) {
        setHistory((prev) => [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)) }]);
        setFuture([]);
      }
      setNodes([]);
      setEdges([]);
      setHasChanges(true);
      lastStateRef.current = JSON.stringify({ nodes: [], edges: [] });
    }
  }, [setNodes, setEdges, nodes, edges]);

  // Update flowchart name
  const handleNameChange = useCallback(
    (name: string) => {
      if (currentFlowchart) {
        setCurrentFlowchart({ ...currentFlowchart, name });
        setHasChanges(true);
      }
    },
    [currentFlowchart]
  );

  // Export functions
  const handleExportPNG = useCallback(async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (element && currentFlowchart) {
      await exportAsPng(element, currentFlowchart.name);
    }
  }, [currentFlowchart]);

  const handleExportSVG = useCallback(async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (element && currentFlowchart) {
      await exportAsSvg(element, currentFlowchart.name);
    }
  }, [currentFlowchart]);

  const handleExportJSON = useCallback(() => {
    if (currentFlowchart) {
      const flowchartData = {
        ...currentFlowchart,
        nodes,
        edges,
      };
      exportAsJson(flowchartData, currentFlowchart.name);
    }
  }, [currentFlowchart, nodes, edges]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    reactFlowInstance?.zoomIn();
  }, [reactFlowInstance]);

  const handleZoomOut = useCallback(() => {
    reactFlowInstance?.zoomOut();
  }, [reactFlowInstance]);

  const handleFitView = useCallback(() => {
    if (!reactFlowInstance) return;
    
    // Use setTimeout to ensure React Flow is ready
    setTimeout(() => {
      if (nodes.length > 0) {
        reactFlowInstance.fitView({ 
          padding: 0.2,
          duration: 300,
          maxZoom: 1.5,
          minZoom: 0.5
        });
      } else {
        // If no nodes, reset to default view
        reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 300 });
      }
    }, 0);
  }, [reactFlowInstance, nodes]);

  // Update zoom display
  const onMoveEnd = useCallback(() => {
    if (reactFlowInstance) {
      setZoom(reactFlowInstance.getZoom());
    }
  }, [reactFlowInstance]);

  return (
    <section className="animate-fade-in space-y-6">
      {/* Section Header */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ padding: '32px' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-lg">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Flow Diagrams
            </h2>
            <p className="text-base text-[var(--color-text-secondary)]">
              Create and save custom flowcharts for this feature
            </p>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex gap-6 h-[650px]">
        {/* Sidebar */}
        <FlowchartSidebar
          flowcharts={flowchartList}
          currentId={currentFlowchart?.id || null}
          onLoad={handleLoadFlowchart}
          onDelete={(id) => {
            if (confirm('Are you sure you want to delete this flowchart?')) {
              deleteFlowchart(featureId, id);
              if (currentFlowchart?.id === id) {
                setCurrentFlowchart(null);
                setNodes([]);
                setEdges([]);
              }
            }
          }}
          onNew={handleNewFlowchart}
        />

        {/* Canvas area */}
        <div className="flex-1 flex flex-col bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
          {/* Toolbar */}
          <FlowchartToolbar
            flowchartName={currentFlowchart?.name || 'Untitled Flowchart'}
            onNameChange={handleNameChange}
            onSave={handleSave}
            onExportPNG={handleExportPNG}
            onExportSVG={handleExportSVG}
            onExportJSON={handleExportJSON}
            onClear={handleClear}
            onDelete={handleDelete}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFitView={handleFitView}
            canUndo={history.length > 0}
            canRedo={future.length > 0}
            hasChanges={hasChanges}
            isSaving={isSaving}
            zoom={zoom}
            hasFlowchart={!!currentFlowchart}
          />

          {/* React Flow canvas */}
          <div ref={reactFlowWrapper} className="flex-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onMoveEnd={onMoveEnd}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={defaultEdgeOptions}
              edgesUpdatable
              edgesFocusable
              fitView
              snapToGrid
              snapGrid={[15, 15]}
              className="flowchart-canvas"
              proOptions={{ hideAttribution: true }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="rgba(255, 107, 53, 0.15)"
              />
              <Controls
                className="flowchart-controls"
                showZoom={false}
                showFitView={false}
                showInteractive={false}
              />
              <MiniMap
                className="flowchart-minimap"
                nodeStrokeColor="#FF6B35"
                nodeColor="#1A1A28"
                nodeBorderRadius={8}
                maskColor="rgba(5, 5, 8, 0.8)"
              />

              {/* Empty state */}
              {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center shadow-lg">
                        <GitBranch className="w-8 h-8 text-[var(--color-primary)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        {currentFlowchart ? 'Empty Canvas' : 'No Flowchart Selected'}
                      </h3>
                    </div>
                    <p className="text-base text-[var(--color-text-secondary)] max-w-md mx-auto">
                      {currentFlowchart
                        ? 'Drag elements from the palette below to start building your flowchart'
                        : 'Create a new flowchart or select one from the sidebar'}
                    </p>
                  </div>
                </div>
              )}
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* Node palette */}
      <NodePalette />

      {/* Keyboard shortcuts hint */}
      <div className="bg-[var(--color-bg-secondary)] rounded-2xl border border-[var(--color-border)]" style={{ padding: '24px' }}>
        <div className="flex items-center justify-center gap-6 text-xs text-[var(--color-text-muted)]">
        <span>
          <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">Ctrl+Z</kbd>
          {' '}undo
        </span>
        <span>
          <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">Ctrl+Y</kbd>
          {' '}redo
        </span>
        <span>
          <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">Delete</kbd>
          {' '}remove selected
        </span>
        <span>
          <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">Double-click</kbd>
          {' '}edit label
        </span>
        <span>
          <kbd className="px-2 py-1 bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]">Scroll</kbd>
          {' '}zoom
        </span>
        </div>
      </div>
    </section>
  );
}

// Wrap with ReactFlowProvider
export function FlowchartSection(props: FlowchartSectionProps) {
  return (
    <ReactFlowProvider>
      <FlowchartSectionInner {...props} />
    </ReactFlowProvider>
  );
}

