// StartNode.tsx
import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';

import { Paper, Stack, Divider, Typography } from '@mui/material';

import { paperStyles, dividerStyles, typographyStyles } from '../styles';

interface StartNodeProps extends NodeProps {
  data: {
    label?: string;
  };
}

const StartNode = ({ data: { label } }: StartNodeProps) => (
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
        Source is based on?
      </Typography>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ ...dividerStyles }}
      />

      {label ? (
        <Typography
          variant="caption"
          component="div"
          color="primary"
          noWrap
          sx={{ ...typographyStyles }}
        >
          {label}
        </Typography>
      ) : (
        <Typography
          variant="caption"
          sx={{ ...typographyStyles, visibility: 'hidden', height: '0.6rem' }}
        />
      )}
    </Stack>

    <Handle type="source" position={Position.Right} id="right" />
    <Handle type="source" position={Position.Bottom} id="bottom" />
  </Paper>
);

export default StartNode;
