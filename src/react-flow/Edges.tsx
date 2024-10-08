import type { Edge } from '@xyflow/react';


export const initialEdges: Edge[] = [
  // node 1 to node 2
  { id: 'e-1-2', source: '1', sourceHandle: 'right', target: '2' },

  // node 1 to node 1-1
  {
    id: 'e-1-1.1',
    source: '1',
    sourceHandle: 'bottom',
    target: '1-1',
    targetHandle: 'top',
  },
  // node 2 to node 2-1
  {
    id: 'e-2-2.1',
    source: '2',
    sourceHandle: 'bottom',
    target: '2-1',
    targetHandle: 'top',
  },
  // node 2 to node 3
  {
    id: 'e-2-3',
    source: '2',
    sourceHandle: 'right',
    target: '3',
  },
  {
    id: 'e-3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e-3-5',
    source: '3',
    target: '5',
  },
  {
    id: 'e-3-6',
    source: '3',
    target: '6',
  },
  {
    id: 'e-4-7',
    source: '4',
    target: '7',
  },
  {
    id: 'e-5-7',
    source: '5',
    target: '7',
  },
  {
    id: 'e-6-7',
    source: '6',
    target: '7',
  },
  {
    id: 'e-7-8',
    source: '7',
    sourceHandle: 'right',
    target: '8',
  },
  {
    id: 'e-7-7.1',
    source: '7',
    target: '7-1',
  },
];