// ConditionsList.tsx
import { Box, Button } from '@mui/material';

import ConditionForm from './ConditionForm';

interface Conditions {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

interface ConditionsListProps {
  id: string;
  conditions: Conditions[];
  addConditionHandler: (condition: Conditions) => void;
  removeConditionHandler: (index: number) => void;
  updateConditionHandler: (index: number, condition: Conditions) => void;
  removeBranchHandler: () => void;
}

const ConditionsList = ({
  id,
  conditions,
  addConditionHandler,
  removeConditionHandler,
  updateConditionHandler,
  removeBranchHandler,
} : ConditionsListProps) => {
  const handleAddCondition = () => {
    const newCondition: Conditions = {
      logicalOperator: '',
      nodeEvent: '',
      operator: '',
      value: '',
    };
    addConditionHandler(newCondition);
  };

  const handleRemoveCondition = (index: number) => {
    removeConditionHandler(index);
  };

  const handleUpdateCondition = (index: number, condition: Conditions) => {
    updateConditionHandler(index, condition);
  };

  return (
    <Box mb={4} p={2} border="1px solid #ddd" borderRadius="8px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <strong>Branch {id}</strong>
        <Button variant="outlined" color="error" onClick={removeBranchHandler}>
          Remove Branch
        </Button>
      </Box>
      {conditions.map((condition, index) => (
        <ConditionForm
          key={index}
          condition={condition}
          onRemove={() => handleRemoveCondition(index)}
          onUpdate={(updatedCondition) => handleUpdateCondition(index, updatedCondition)}
        />
      ))}
      <Button variant="outlined" color="secondary" onClick={handleAddCondition}>
        Add Condition
      </Button>
    </Box>
  );
};

export default ConditionsList;
