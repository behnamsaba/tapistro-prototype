// BranchNode.tsx
import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

import { paperStyles, typographyStyles } from '../styles';

interface Condition {
  logicalOperator: string;
  operator: string;
  nodeEvent: string;
  value: string;
}

interface BranchNodeProps extends NodeProps {
  data: {
    label?: string;
    conditions: Condition[];
  };
}

const BranchNode: React.FC<BranchNodeProps> = ({ data: { label, conditions } } : BranchNodeProps) => (
  <Paper
    component="section"
    elevation={2}
    sx={{
      p: 2,
      borderRadius: 5,
      width: 300,
      ...paperStyles,
    }}
  >
    {label && (
      <Typography
        variant="h6"
        color="primary"
        gutterBottom
        sx={{ ...typographyStyles }}
      >
        {label}
      </Typography>
    )}
    <List dense>
      {conditions.map((condition, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${condition.logicalOperator} ${condition.operator} ${condition.nodeEvent} ${condition.value}`}
            sx={{ ...typographyStyles }}
          />
        </ListItem>
      ))}
    </List>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} id="right" />
  </Paper>
);

export default BranchNode;
