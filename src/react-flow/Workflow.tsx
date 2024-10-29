import '@xyflow/react/dist/style.css';

import {
  Controls,
  ReactFlow,
  Background,
} from '@xyflow/react';

import Box from '@mui/material/Box';

import TitleForm from 'src/Forms/TitleForm';
import FormRoutes from 'src/Forms/FormRoutes';


import ForkNode from 'src/components/ForkNode';
import StartNode from 'src/components/StartNode';
import ActionNode from 'src/components/ActionNode';
import BranchNode from 'src/components/BranchNode';
import TerminalNode from 'src/components/TerminalNode';
import DecisionNode from 'src/components/DecisionNode';
import StartNodeDetails from 'src/components/StartNodeDetails';
import OrderAmountSelect from 'src/components/OrderAmountSelect';
import ActionNodeDetails from 'src/components/ActionNodeDetails';

import { useStore } from './store';

// Define node types outside of the component
const nodeTypes = {
  StartNode,
  StartNodeDetails,
  ActionNode,
  ActionNodeDetails,
  OrderAmountSelect,
  ForkNode,
  TerminalNode,
  DecisionNode,
  BranchNode
};



function Workflow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
  } = useStore();

  return (
    <Box
      display="flex"
      width="100vw"
      height="90vh"
    >
      {/* Main Workflow Area */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="70vw"
        height="100%"
        border="1px dashed grey"
        boxSizing="border-box"
        padding={2}
      >
        <TitleForm />
        <Box flexGrow={1} width="100%" mt={2}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            style={{ width: '100%', height: '100%' }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </Box>
      </Box>
      <Box
        width="30vw"
        height="100%"
        bgcolor="#f5f5f5"
        boxSizing="border-box"
        padding={2}
      >
        <FormRoutes />
      </Box>
    </Box>
  );
}

export default Workflow;
