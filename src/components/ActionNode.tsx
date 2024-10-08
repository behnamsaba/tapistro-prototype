import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Typography } from '@mui/material';

// Define the props interface
interface ActionNodeProps {
  data: {
    label: string;
  };
}

const ActionNode = ({ data: { label } }: ActionNodeProps) => (
  <Paper
    component="section"
    elevation={2}
    sx={{
      p: 2,
      borderRadius: 5,
      backgroundColor: '#f7e9eb',
      width: 250,
    }}
  >
    <Typography variant="body2" color="primary" gutterBottom>
      {label}
    </Typography>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Bottom} id="bottom" />
    <Handle type="source" position={Position.Right} id="right" />
  </Paper>
);

export default ActionNode;
