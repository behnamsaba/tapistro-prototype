import type { NodeProps } from '@xyflow/react';

import React, { useRef, useState } from 'react';
import { Handle, Position, useEdges, useReactFlow } from '@xyflow/react';

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

const OrderAmountSelect = ({ data }: OrderAmountSelectProps) => {
  const { priorityOptions } = data;
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const { setEdges } = useReactFlow();
  const edges = useEdges()

  // Base list of all possible edges
  const allEdgesRef = useRef(edges);

  // Define which edges to exclude based on priority
  const priorityToExcludedEdgeIds: Record<string, string[]> = {
    High: ['e-3-6', 'e-6-7'],
    Low: ['e-3-4', 'e-3-5', 'e-4-7', 'e-5-7'],
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target;
    setSelectedPriority(value);

    setEdges(() => {
      // Retrieve the list of edge IDs to exclude for the selected priority
      const excludedEdgeIds = priorityToExcludedEdgeIds[value] || [];

      // Filter out the excluded edges from the base list
      return allEdgesRef.current.filter((edge) => !excludedEdgeIds.includes(edge.id));
    });
  };

  // Find the selected option based on the selectedPriority
  const selectedOption = priorityOptions.find(
    (option) => option.priorityLevel === selectedPriority
  );

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: '#f7e9eb',
        borderRadius: 5,
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
          <Typography variant="body2" color="primary">
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
