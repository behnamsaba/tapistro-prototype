import '@xyflow/react/dist/style.css';

import type { Connection } from '@xyflow/react';

import React, { useCallback } from 'react';
import {
  Controls,
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import Box from '@mui/material/Box';

import ValidateOrder from 'src/components/ValidateOrder';
import WebHookTrigger from 'src/components/WebHookTrigger';
import OrderAmountSelect from 'src/components/OrderAmountSelect';

import { initialNodes, initialEdges } from './workflow.constans';

// nodeTypes are memoized or defined outside of the component
const nodeTypes = { 'WebHookTrigger': WebHookTrigger, 'ValidateOrder' : ValidateOrder, 'OrderAmountSelect': OrderAmountSelect}

function Workflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params : Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <Box component="section" sx={{ width: 2000, height: 1000, border: '1px dashed grey' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background/>
        <Controls />
      </ReactFlow>
    </Box>
  );
}

export default Workflow;
