import '@xyflow/react/dist/style.css';

import type { Node, Connection } from '@xyflow/react';

import React, { useCallback } from 'react';
import {
  addEdge,
  Controls,
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import Box from '@mui/material/Box';

import ForkNode from 'src/components/ForkNode';
import StartNode from 'src/components/StartNode';
import ActionNode from 'src/components/ActionNode';
import TerminalNode from 'src/components/TerminalNode';
import StartNodeDetails from 'src/components/StartNodeDetails';
import OrderAmountSelect from 'src/components/OrderAmountSelect';
import ActionNodeDetails from 'src/components/ActionNodeDetails';

import { initialEdges } from './Edges';
import { initialNodes } from './Nodes';

// nodeTypes are memoized or defined outside of the component
const nodeTypes = {
  StartNode,
  StartNodeDetails,
  ActionNode,
  ActionNodeDetails,
  OrderAmountSelect,
  ForkNode,
  TerminalNode,
};

function Workflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, clickedNode: Node) => {
      console.log('Node clicked:', clickedNode);

      const clickedId = clickedNode.id; // Get the ID of the clicked node

      // Determine if the clicked node is a child node (contains a hyphen)
      const isChildNode = clickedId.includes('-');

      if (isChildNode) {
        // **Child Node Clicked:** Toggle its own 'hidden' property
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === clickedId) {
              return { ...node, hidden: !node.hidden };
            }
            return node;
          })
        );
      } else {
        // **Parent Node Clicked:** Toggle 'hidden' for all child nodes starting with this ID
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id.startsWith(`${clickedId}-`) && node.id !== clickedId) {
              return { ...node, hidden: !node.hidden };
            }
            return node;
          })
        );
      }
    },
    [setNodes]
  );

  return (
    <Box component="section" sx={{ width: 1800, height: 1200, border: '1px dashed grey' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default Workflow;
