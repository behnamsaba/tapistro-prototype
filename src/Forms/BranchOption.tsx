// BranchOption.tsx
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Box, Button } from '@mui/material';
import { useStore } from 'src/react-flow/store';
import ConditionsList from './ConditionsList';

interface Conditions {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

interface Position {
  x: number;
  y: number;
}

interface Branches {
  id: string;
  type: string;
  conditions: Conditions[];
  position: Position;
}

const BranchOption: React.FC = () => {
  const [branches, setBranches] = useState<Branches[]>([]);

  const { getLastParentID, getParentPosition, setNodes, nodes } = useStore(
    useShallow((state) => ({
      getLastParentID: state.getLastParentID,
      getParentPosition: state.getParentPosition,
      setNodes: state.setNodes,
      nodes: state.nodes,
    }))
  );

  const lastID = getLastParentID() || '1';
  const lastPosition = getParentPosition() || { x: 0, y: 0 };

  const addBranchHandler = () => {
    const newBranch: Branches = {
      id: `${lastID}.${branches.length + 1}`,
      type: 'branchNode',
      conditions: [],
      position: { 
        x: lastPosition.x - (60 * (branches.length + 1)), 
        y: lastPosition.y + 100 
      },
    };
    setBranches([...branches, newBranch]);
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
    alert(JSON.stringify(newNodes, null, 2));
  };

  return (
    <Box>
      {branches.map((branch, index) => (
        <ConditionsList
          key={branch.id}
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
      ))}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={addBranchHandler}
          style={{ marginRight: '10px' }}
        >
          Add Branch
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default BranchOption;
