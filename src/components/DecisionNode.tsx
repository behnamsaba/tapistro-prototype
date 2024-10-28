// DecisionNode.tsx
import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';

import { Paper, Stack, Divider, Typography, Box } from '@mui/material';

import { paperStyles, dividerStyles, typographyStyles } from '../styles';

interface DecisionNodeProps extends NodeProps {
  data: {
    label: string;
    description: string;
  };
}

const DecisionNode = ({ data: { description } }: DecisionNodeProps) => (
  <Paper
    component="div"
    elevation={1}
    sx={{
      p: 0.5,
      borderRadius: 1,
      width: '100px',
      ...paperStyles,
    }}
  >
    <Stack
      direction="column"
      spacing={0.5}
      alignItems="center"
      justifyContent="flex-start"
      height="100%"
    >
      <Typography
        variant="caption"
        component="div"
        color="primary"
        noWrap
        sx={{ ...typographyStyles }}
      >
        Decision Node
      </Typography>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ ...dividerStyles }}
      />

      <Box>
        <Typography variant="body2" color="primary" gutterBottom sx={{ fontSize: '0.6rem' }}>
          {description}
        </Typography>
      </Box>
    </Stack>

    <Handle type="target" position={Position.Top} id="top" />
    <Handle type="source" position={Position.Bottom} id="bottom" />
  </Paper>
);

export default DecisionNode;
