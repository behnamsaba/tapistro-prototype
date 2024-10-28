import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'StartNode',
    data: { label: null },
    position: { x: 400, y: 20 },
    hidden: false,
  },
  {
    id: '1-1',
    type: 'StartNodeDetails',
    data: {
      label: 'Start Node Details',
      Source: '',
      Configuration: '',
      JobTitle: '',
      Company: '',
      Countries: '',
    },
    position: { x: 600, y: 20 },
    hidden: true,
  }
];
