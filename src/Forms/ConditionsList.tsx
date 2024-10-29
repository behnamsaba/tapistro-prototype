import React from 'react';

import { Box, Button, Typography, Divider } from '@mui/material';

import ConditionForm from './ConditionForm';

import type { Conditions, ConditionsListProps } from './types';

const ConditionsList = ({
  index,
  id,
  conditions,
  addConditionHandler,
  removeConditionHandler,
  updateConditionHandler,
  removeBranchHandler,
}: ConditionsListProps) => {
  const handleAddCondition = () => {
    const newCondition: Conditions = {
      logicalOperator: '',
      nodeEvent: '',
      operator: '',
      value: '',
    };
    if (conditions.length < 2) {
      addConditionHandler(newCondition);
    }
  };

  return (
    <Box
      mb={1}
      p={1}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
      border="1px solid"
      borderColor="grey.300"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" component="div">
          Branch {index + 1}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={removeBranchHandler}
          size="small"
        >
          Remove Branch
        </Button>
      </Box>
      <Divider />
      <Box mt={3}>
        {conditions.map((condition, idx) => (
          <Box key={idx} mb={3}>
            <ConditionForm
              condition={condition}
              onRemove={() => removeConditionHandler(idx)}
              onUpdate={(updatedCondition) =>
                updateConditionHandler(idx, updatedCondition)
              }
            />
          </Box>
        ))}
        {conditions.length < 2 && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddCondition}
            >
              Add Condition
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ConditionsList;
