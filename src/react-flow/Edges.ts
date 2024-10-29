import type { Edge } from '@xyflow/react';


export const initialEdges: Edge[] = [
  // node 1 to node 2
  { id: 'e-1-2', source: '1', sourceHandle: 'bottom', target: '2', targetHandle: 'top'},

  // node 1 to node 1-1
  {
    id: 'e-1-1.1',
    source: '1',
    sourceHandle: 'right',
    target: '1-1',
    targetHandle: 'left',
  },
];