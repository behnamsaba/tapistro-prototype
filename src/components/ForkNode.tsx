import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Typography } from '@mui/material';


interface ForkNodeProps {
  data: {
    label: string;
    explain: string;
    shipping:string;
  };
}

const ForkNode = ({ data: { label, explain, shipping } }: ForkNodeProps) => (
    <Paper
      component="section"
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 5,
        backgroundColor: '#f7e9eb',
      }}
    >
      <Box mt={2}>
        <Typography variant="body2" color="primary">
         {label}
        </Typography>
        <Typography variant="body2" color="secondary">
         {shipping}
        </Typography>
        <Typography variant="body2" color="success">
          {explain}
        </Typography>
      </Box>
      <Handle type="target" position={Position.Left} id="left"/>
      <Handle type="source" position={Position.Right} id="right"/>
    </Paper>
  );

export default ForkNode;
