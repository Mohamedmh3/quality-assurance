import { toPng, toSvg } from 'html-to-image';
import type { Flowchart, FlowNode, FlowEdge, NodeTemplate, FlowNodeType } from './types';
import { defaultNodeSizes } from './types';

// Default scale for new nodes (XS size)
const DEFAULT_NODE_SCALE = 0.6;

/**
 * Generate a unique ID for flowcharts and nodes
 */
export function generateId(prefix: string = 'fc'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a new empty flowchart
 */
export function createNewFlowchart(featureId: string, name: string = 'Untitled Flowchart'): Flowchart {
  const now = new Date().toISOString();
  return {
    id: generateId('fc'),
    name,
    featureId,
    createdAt: now,
    updatedAt: now,
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
  };
}

/**
 * Node templates for the palette
 */
export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'start',
    label: 'Start',
    icon: 'Play',
    color: 'from-emerald-400 to-emerald-600',
    description: 'Beginning of a flow',
  },
  {
    type: 'process',
    label: 'Process',
    icon: 'Settings',
    color: 'from-blue-400 to-blue-600',
    description: 'An action or operation',
  },
  {
    type: 'decision',
    label: 'Decision',
    icon: 'HelpCircle',
    color: 'from-amber-400 to-orange-500',
    description: 'A yes/no question',
  },
  {
    type: 'io',
    label: 'Input/Output',
    icon: 'Database',
    color: 'from-purple-400 to-purple-600',
    description: 'Data input or output',
  },
  {
    type: 'action',
    label: 'Action',
    icon: 'Zap',
    color: 'from-teal-400 to-teal-600',
    description: 'A specific action',
  },
  {
    type: 'end',
    label: 'End',
    icon: 'Square',
    color: 'from-red-400 to-red-600',
    description: 'End of a flow',
  },
  {
    type: 'connector',
    label: 'Connector',
    icon: 'Circle',
    color: 'from-gray-400 to-gray-600',
    description: 'Connect flows',
  },
  {
    type: 'comment',
    label: 'Note',
    icon: 'MessageSquare',
    color: 'from-yellow-200 to-yellow-300',
    description: 'Add a comment or note',
  },
];

/**
 * Get node template by type
 */
export function getNodeTemplate(type: FlowNodeType): NodeTemplate | undefined {
  return nodeTemplates.find((t) => t.type === type);
}

/**
 * Create a new node from template at the given position
 */
export function createNode(
  type: FlowNodeType,
  position: { x: number; y: number },
  label?: string
): FlowNode {
  const template = getNodeTemplate(type);
  const baseSize = defaultNodeSizes[type];
  
  return {
    id: generateId('node'),
    type,
    position,
    data: {
      label: label || template?.label || 'Node',
      color: template?.color,
      size: {
        width: baseSize.width * DEFAULT_NODE_SCALE,
        height: baseSize.height * DEFAULT_NODE_SCALE,
        scale: DEFAULT_NODE_SCALE,
      },
    },
  };
}

/**
 * Create a new edge between nodes
 */
export function createEdge(
  sourceId: string,
  targetId: string,
  options?: Partial<FlowEdge>
): FlowEdge {
  return {
    id: generateId('edge'),
    source: sourceId,
    target: targetId,
    type: 'smoothstep',
    animated: false,
    ...options,
  };
}

/**
 * Export flowchart canvas as PNG
 */
export async function exportAsPng(element: HTMLElement, filename: string): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      backgroundColor: '#050508',
      pixelRatio: 2,
      style: {
        transform: 'scale(1)',
      },
    });
    
    downloadFile(dataUrl, `${filename}.png`);
  } catch (error) {
    console.error('Error exporting PNG:', error);
    throw error;
  }
}

/**
 * Export flowchart canvas as SVG
 */
export async function exportAsSvg(element: HTMLElement, filename: string): Promise<void> {
  try {
    const dataUrl = await toSvg(element, {
      backgroundColor: '#050508',
    });
    
    downloadFile(dataUrl, `${filename}.svg`);
  } catch (error) {
    console.error('Error exporting SVG:', error);
    throw error;
  }
}

/**
 * Export flowchart data as JSON
 */
export function exportAsJson(flowchart: Flowchart, filename: string): void {
  const blob = new Blob([JSON.stringify(flowchart, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  downloadFile(url, `${filename}.json`);
  URL.revokeObjectURL(url);
}

/**
 * Helper to download a file
 */
function downloadFile(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Format date for display
 */
export function formatFlowchartDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Get color classes for edge types
 */
export function getEdgeColorClass(edgeType?: string): string {
  switch (edgeType) {
    case 'success':
      return '#10b981'; // emerald-500
    case 'error':
      return '#ef4444'; // red-500
    default:
      return '#FF6B35'; // primary color
  }
}

/**
 * Validate flowchart name
 */
export function validateFlowchartName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.length > 50) {
    return { valid: false, error: 'Name must be 50 characters or less' };
  }
  return { valid: true };
}

