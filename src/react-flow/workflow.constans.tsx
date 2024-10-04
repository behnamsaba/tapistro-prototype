import type { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'WebHookTrigger',
    data: { label: 'Start Node: Webhook Trigger' },
    position: { x: 0, y: 250 },
  },

  {
    id: '2',
    type: 'ValidateOrder',
    data: {
      label: 'Action Node: Validate Order',
      checkValid: 'Checks if all required fields are present',
      verifyOrder: 'Verifies that the total amount matches sum of item prices',
    },
    position: { x: 300, y: 25 },
  },
  {
    id: '3',
    type: 'OrderAmountSelect',
    data: {
      label: 'Decision Node: Order Amount Check',
      priorityOptions: [
        { priorityLevel: 'High', amount: 'Above $100' },
        { priorityLevel: 'Low', amount: 'Below $100' },
      ],
    },
    position: { x: 400, y: 100 },
  },
];

export const initialEdges: Edge[] = [];