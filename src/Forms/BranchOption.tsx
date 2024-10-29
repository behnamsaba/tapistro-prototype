import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

// eslint-disable-next-line import/no-extraneous-dependencies
import AddIcon from '@mui/icons-material/Add';
// eslint-disable-next-line import/no-extraneous-dependencies
import SaveIcon from '@mui/icons-material/Save';
import { Box, Stack, Paper, Button, Divider, Typography } from '@mui/material';

import { useStore } from 'src/react-flow/store';

import ConditionsList from './ConditionsList';

import type { Branches, Position, Conditions } from './types';

const BranchOption = () => {
  const [branches, setBranches] = useState<Branches[]>([]);
  
  const { 
    getLastParentID, 
    getParentPosition, 
    setNodes, 
    nodes, 
    setCurrentForm, 
    edges, 
    setEdges 
  } = useStore(
    useShallow((state) => ({
      getLastParentID: state.getLastParentID,
      getParentPosition: state.getParentPosition,
      setNodes: state.setNodes,
      nodes: state.nodes,
      setCurrentForm: state.setCurrentForm,
      edges: state.edges,
      setEdges: state.setEdges,
    }))
  );

  const lastPosition: Position = getParentPosition() || { x: 0, y: 0 };
  const lastID = getLastParentID() || '1';

  const addBranchHandler = () => {
    if (branches.length < 3) {
      const newBranch: Branches = {
        id: `${lastID}.${branches.length + 1}`,
        type: 'BranchNode',
        conditions: [],
        position: { 
          x: lastPosition.x - (160 * (branches.length + 1)), 
          y: lastPosition.y + 100 
        },
      };
      
      const newEdge = {
        id: `e-${lastID}-${lastID}.${branches.length + 1}`,
        source: `${lastID}`,
        sourceHandle: 'bottom',
        target: `${lastID}.${branches.length + 1}`,
        targetHandle: 'top',
      };
      
      setBranches([...branches, newBranch]);
      setEdges([...edges, newEdge]);
    }
  };

  const removeBranchHandler = (index: number) => {
    const updatedBranches = branches.filter((_, i) => i !== index);
    setBranches(updatedBranches);
  };

  const updateConditions = (index: number, newConditions: Conditions[]) => {
    const updatedBranches = branches.map((branch, i) =>
      i === index ? { ...branch, conditions: newConditions } : branch
    );
    setBranches(updatedBranches);
  };

  const handleSave = () => {
    const newNodes = branches.map(branch => ({
      id: branch.id,
      type: branch.type,
      position: branch.position,
      data: { conditions: branch.conditions },
    }));

    setNodes([...nodes, ...newNodes]);
    setCurrentForm('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Make Decisions</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        You can create multiple conditions in the flow
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={3}>
        {branches.map((branch, index) => (
          <Stack key={branch.id}>
            <ConditionsList
              index={index}
              id={branch.id}
              conditions={branch.conditions}
              addConditionHandler={(condition) =>
                updateConditions(index, [...branch.conditions, condition])
              }
              removeConditionHandler={(conditionIndex) => {
                const updatedConditions = branch.conditions.filter(
                  (_, i) => i !== conditionIndex
                );
                updateConditions(index, updatedConditions);
              }}
              updateConditionHandler={(conditionIndex, updatedCondition) => {
                const updatedConditions = branch.conditions.map((cond, i) =>
                  i === conditionIndex ? updatedCondition : cond
                );
                updateConditions(index, updatedConditions);
              }}
              removeBranchHandler={() => removeBranchHandler(index)}
            />
          </Stack>
        ))}
      </Stack>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          onClick={addBranchHandler}
          disabled={branches.length >= 3}
          startIcon={<AddIcon />}
        >
          Add Branch
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default BranchOption;
