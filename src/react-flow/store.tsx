// store.tsx
import type { Node, Edge, Connection, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';

import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

import { initialNodes } from './Nodes';
import { initialEdges } from './Edges';

type AppNode = Node;

type Condition = {
  logicalOperator: string;
  operator: string;
  eventSource: string;
  value: string;
};


type AppState = {
  workflowTitle: string | null;
  titleFormHandler: (val: string) => void;
  currentForm: string | null;
  setCurrentForm: (form: string | null) => void;
  nodes: AppNode[];
  edges: Edge[];
  conditions: Condition[];
  setConditions: (conditions: Condition[]) => void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodeClick: (event: React.MouseEvent, clickedNode: Node) => void;
  getLastParentID: () => string | null;
  getParentPosition: () => { x: number; y: number } | null;
};

// Create the Zustand store
export const useStore = create<AppState>((set, get) => ({
  currentForm: null,
  workflowTitle: null,
  nodes: initialNodes,
  edges: initialEdges,
  conditions: [],
  setConditions: (conditions) => set({ conditions }),
  setCurrentForm: (form) => set({ currentForm: form }),
  titleFormHandler: (val: string) => {
    set({ workflowTitle: val });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  onNodeClick: (event, clickedNode) => {
    console.log('Node clicked:', clickedNode);

    const clickedId = clickedNode.id;
    console.log('Node id:', clickedId);
    const isChildNode = clickedId.includes('-');

    if (isChildNode) {
      set({
        nodes: get().nodes.map((node) =>
          node.id === clickedId ? { ...node, hidden: !node.hidden } : node
        ),
      });
    } else {
      set({
        nodes: get().nodes.map((node) =>
          node.id.startsWith(`${clickedId}-`) && node.id !== clickedId
            ? { ...node, hidden: !node.hidden }
            : node
        ),
      });
    }
  },
  getLastParentID: () => {
    const parentIds = get().nodes
      .map(node => node.id)
      .filter(id => !id.includes('-') && !id.includes('.'))
      .map(id => Number(id))
      .filter(num => !Number.isNaN(num));
    if (parentIds.length === 0) return null;
    return String(Math.max(...parentIds));
  },
  getParentPosition: () => {
    const lastParentId = get().getLastParentID();
    if (!lastParentId) return null;
    const node = get().nodes.find(n => n.id === lastParentId);
    return node ? node.position : null;
  },
}));
