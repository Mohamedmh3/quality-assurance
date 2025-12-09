import type { Node, Viewport } from 'reactflow';

// Node types available in the flowchart builder
export type FlowNodeType = 'start' | 'end' | 'process' | 'decision' | 'io' | 'action' | 'connector' | 'comment';

// Edge/connection types for styling
export type FlowEdgeType = 'default' | 'success' | 'error';

// Node size configuration
export interface NodeSize {
  width: number;
  height: number;
  scale: number; // 0.5 to 2.0
}

// Default sizes for different node types
export const defaultNodeSizes: Record<FlowNodeType, NodeSize> = {
  start: { width: 120, height: 48, scale: 1 },
  end: { width: 120, height: 48, scale: 1 },
  process: { width: 160, height: 56, scale: 1 },
  decision: { width: 144, height: 144, scale: 1 },
  io: { width: 160, height: 56, scale: 1 },
  action: { width: 160, height: 56, scale: 1 },
  connector: { width: 56, height: 56, scale: 1 },
  comment: { width: 180, height: 80, scale: 1 },
};

// Data stored in each node
export interface FlowNodeData {
  label: string;
  icon?: string;
  color?: string;
  description?: string;
  size?: NodeSize;
}

// Custom node type extending React Flow's Node
export interface FlowNode extends Node<FlowNodeData> {
  type: FlowNodeType;
}

// Custom edge type for flowcharts
export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  type?: string;
  data?: {
    edgeType?: FlowEdgeType;
  };
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
  labelStyle?: React.CSSProperties;
}

// Complete flowchart data structure for storage
export interface Flowchart {
  id: string;
  name: string;
  featureId: string;
  createdAt: string;
  updatedAt: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  viewport?: Viewport;
}

// Flowchart list item for sidebar display
export interface FlowchartListItem {
  id: string;
  name: string;
  updatedAt: string;
  nodeCount: number;
}

// Node template for the palette
export interface NodeTemplate {
  type: FlowNodeType;
  label: string;
  icon: string;
  color: string;
  description: string;
}

// Store state interface
export interface FlowchartState {
  flowcharts: Record<string, Record<string, Flowchart>>; // featureId -> flowchartId -> Flowchart
  currentFlowchartId: string | null;
  
  // Actions
  saveFlowchart: (featureId: string, flowchart: Flowchart) => void;
  loadFlowchart: (featureId: string, flowchartId: string) => Flowchart | null;
  deleteFlowchart: (featureId: string, flowchartId: string) => void;
  getFlowcharts: (featureId: string) => FlowchartListItem[];
  setCurrentFlowchart: (flowchartId: string | null) => void;
}

// Export dropdown option
export interface ExportOption {
  type: 'png' | 'svg' | 'json';
  label: string;
  icon: string;
}

