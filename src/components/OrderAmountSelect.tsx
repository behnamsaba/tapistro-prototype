import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';
import React, { useState } from 'react';

import { Box, Paper, Typography } from '@mui/material';

interface PriorityOption {
  priorityLevel: string;
  amount: string;
}

interface OrderAmountSelectProps extends NodeProps {
  data: {
    priorityOptions: PriorityOption[];
  };
}

const OrderAmountSelect = ({ data } : OrderAmountSelectProps) => {
  const { priorityOptions } = data;

  // Initialize as an empty string to represent no selection
  const [selectedPriority, setSelectedPriority] = useState<string>('');

  // Handle change using the appropriate event type
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(event.target.value);
  };

  // Find the selected option based on the selectedPriority
  const selectedOption = priorityOptions.find(
    (option) => option.priorityLevel === selectedPriority
  );

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        minWidth: 250,
      }}
    >
      <select
        value={selectedPriority}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '16px',
        }}
      >
        <option value="" disabled>
          Select Option
        </option>
        {priorityOptions.map((option) => (
          <option key={option.priorityLevel} value={option.priorityLevel}>
            {option.priorityLevel}
          </option>
        ))}
      </select>

      {selectedOption && (
        <Box mt={2}>
          <Typography variant="subtitle1">
            Selected Priority: <strong>{selectedOption.priorityLevel}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Amount: {selectedOption.amount}
          </Typography>
        </Box>
      )}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Paper>
  );
};

export default OrderAmountSelect;
