// ConditionsList.tsx
import React from 'react';
import { FieldArray } from 'formik';
import { Box, Button, Stack } from '@mui/material';
import ConditionForm from './ConditionForm';

// Define the shape of a single condition
interface ConditionFormValues {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

// Define the shape of a branch containing multiple conditions
interface Branch {
  conditions: ConditionFormValues[];
}

// Define the overall form values
interface FormValues {
  branches: Branch[];
}

interface ConditionsListProps {
  branchIndex: number;
}

const ConditionsList: React.FC<ConditionsListProps> = ({ branchIndex }) => (
    <FieldArray name={`branches.${branchIndex}.conditions`}>
      {({ push, remove, form }) => {
        const conditions = form.values.branches[branchIndex].conditions;
        return (
          <Box>
            <Stack spacing={3}>
              {conditions.map((condition, conditionIndex) => (
                <Box key={conditionIndex} border={1} borderRadius={2} p={2}>
                  {/* Render ConditionForm for each condition */}
                  <ConditionForm branchIndex={branchIndex} conditionIndex={conditionIndex} />

                  {/* Remove Condition Button */}
                  {conditions.length > 1 && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => remove(conditionIndex)}
                    >
                      Remove Condition
                    </Button>
                  )}
                </Box>
              ))}

              {/* Add Condition Button */}
              {conditions.length < 3 && (
                <Button
                  variant="contained"
                  onClick={() =>
                    push({
                      logicalOperator: '',
                      nodeEvent: '',
                      operator: '',
                      value: '',
                    })
                  }
                >
                  + Add Condition
                </Button>
              )}
            </Stack>
          </Box>
        );
      }}
    </FieldArray>
  );

export default ConditionsList;
