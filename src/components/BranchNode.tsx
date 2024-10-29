// BranchNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Stack, Divider, Typography } from '@mui/material';

import { useStore } from 'src/react-flow/store';

import { paperStyles, dividerStyles, typographyStyles } from '../styles';

import type { Conditions } from '../Forms/types';

interface BranchNodeProps {
  id: string;
  data: {
    conditions: Conditions[];
  };
}

const BranchNode = ({ id, data: { conditions } } : BranchNodeProps) => {
  const nodes = useStore((state) => state.nodes);

  // Safely access the second node (index 1) if it exists
  const startNode = nodes[1];

  return (
    <Paper
      component="div"
      elevation={1}
      sx={{
        p: 0.5,
        borderRadius: 1,
        width: '100px',
        ...paperStyles,
        position: 'relative',
      }}
    >
      <Stack
        direction="column"
        spacing={0.5}
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
      >
        {/* Node Title */}
        <Typography
          variant="caption"
          component="div"
          color="primary"
          noWrap
          sx={{ ...typographyStyles }}
        >
          Branch {id}
        </Typography>

        <Divider
          orientation="horizontal"
          flexItem
          sx={{ ...dividerStyles }}
        />

        {/* Conditions List */}
        <Box sx={{ width: '90%', textAlign: 'left' }}>
          {conditions.map((condition, index) => (
            <Box key={index} mb={0.5}>
              <Typography variant="body2" color="primary" sx={{ fontSize: '0.6rem' }}>
                {`Condition ${index + 1}: ${condition.logicalOperator} ${condition.nodeEvent} ${condition.operator} ${condition.value}`}
              </Typography>
              {startNode && startNode.data && (
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                  {`Submitted Source: ${startNode.data[`${condition.nodeEvent}`]}`}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Stack>

      {/* Handles */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </Paper>
  );
};

export default BranchNode;
