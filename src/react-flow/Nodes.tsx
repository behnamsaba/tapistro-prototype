import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'StartNode',
    data: { label: 'Start Node: Webhook Trigger' },
    position: { x: 200, y: 400 },
    hidden: false,
  },
  {
    id: '1-1',
    type: 'StartNodeDetails',
    data: {
      label: 'Receives incoming order data from an e-commerce platform, including',
      CustomerID: 'CustomerID',
      OrderID: 'OrderID',
      ItemsOrdered: 'ItemsOrdered',
    },
    position: { x: 200, y: 600 },
    hidden: true,
  },
  {
    id: '2',
    type: 'ActionNode',
    data: {
      label: 'Action Node: Validate Order',
    },
    position: { x: 700, y: 400 },
  },
  {
    id: '2-1',
    type: 'ActionNodeDetails',
    data: {
      label: 'Action Node: Validate Order',
      verify: 'Checks if all required fields are present',
      status: 'Verifies that the total amount matches sum of item prices',
      explain: 'This node performs initial validation of the order data',
    },
    position: { x: 600, y: 600 },
    hidden: true,
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
    position: { x: 1150, y: 400 },
  },
  {
    id: '4',
    type: 'ForkNode',
    data: {
      label: 'Apply Discount',
      explain: 'Applies a 5% discount to the order',
      shipping: 'Premium',
    },
    position: { x: 1600, y: 100 },
  },
  {
    id: '5',
    type: 'ForkNode',
    data: {
      label: 'Faster Shipping',
      explain: 'Arranges for faster shipping',
      shipping: 'Premium',
    },
    position: { x: 1600, y: 400 },
  },
  {
    id: '6',
    type: 'ForkNode',
    data: {
      label: 'Normal Process',
      explain: 'Processes the order normally',
      shipping: 'Standard',
    },
    position: { x: 1600, y: 700 },
  },
  {
    id: '7',
    type: 'ActionNode',
    data: {
      label: 'Action Node: Order Shipping status',
    },
    position: { x: 2000, y: 400 },
  },
  {
    id: '7-1',
    type: 'ActionNodeDetails',
    data: {
      label: 'Action Node: Order Shipping status',
      verify: 'All Items Shipped',
      status: 'Package Status',
    },
    position: { x: 2000, y: 750 },
    hidden : true
  },
  {
    id: '8',
    type: 'TerminalNode',
    data: {
      label: 'Terminal Node: Order Completed',
    },
    position: { x: 2400, y: 400 },
  },
];