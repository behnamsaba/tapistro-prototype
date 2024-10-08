import { Handle, Position } from '@xyflow/react';

import { Paper, Typography } from '@mui/material';


interface TerminalNodeProps {
  data: {
    label: string;
  };
}

const TerminalNode = ({ data: { label } }: TerminalNodeProps) => (
    <Paper
      component="section"
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 5,
        backgroundColor: '#f7e9eb',
      }}
    >
        <Typography variant="body2" color="primary">
          {label}
        </Typography>
      <Handle type="target" position={Position.Left} id="left" />
    </Paper>
  );

export default TerminalNode;
