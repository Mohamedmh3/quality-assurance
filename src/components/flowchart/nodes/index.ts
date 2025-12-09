export { StartNode } from './StartNode';
export { EndNode } from './EndNode';
export { ProcessNode } from './ProcessNode';
export { DecisionNode } from './DecisionNode';
export { IONode } from './IONode';
export { ActionNode } from './ActionNode';
export { ConnectorNode } from './ConnectorNode';
export { CommentNode } from './CommentNode';
export { NodeResizer, SizeControl, sizePresets } from './NodeResizer';

import { StartNode } from './StartNode';
import { EndNode } from './EndNode';
import { ProcessNode } from './ProcessNode';
import { DecisionNode } from './DecisionNode';
import { IONode } from './IONode';
import { ActionNode } from './ActionNode';
import { ConnectorNode } from './ConnectorNode';
import { CommentNode } from './CommentNode';

// Node types mapping for React Flow
export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  process: ProcessNode,
  decision: DecisionNode,
  io: IONode,
  action: ActionNode,
  connector: ConnectorNode,
  comment: CommentNode,
};

