// ConditionForm.tsx
import React from 'react';
import { useFormikContext } from 'formik';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

// Define available options
const logicalOperators = ['WHERE', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN'];
const nodeEvents = ['Event Source', 'Action Node'];
const operators = [
  { symbol: '==', name: 'Equal' },
  { symbol: '!=', name: 'Not Equal' },
  { symbol: '===', name: 'Strict Equal' },
  { symbol: '!==', name: 'Strict Not Equal' },
  { symbol: '>', name: 'Greater Than' },
  { symbol: '<', name: 'Less Than' },
  { symbol: '>=', name: 'Greater Than or Equal To' },
  { symbol: '<=', name: 'Less Than or Equal To' },
  { symbol: 'if yes', name: 'If Yes' },
  { symbol: 'if no', name: 'If No' },
];

interface ConditionFormProps {
  branchIndex: number;
  conditionIndex: number;
}

const ConditionForm: React.FC<ConditionFormProps> = ({ branchIndex, conditionIndex }) => {
  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<any>();

  // Define the path to the current condition's fields
  const fieldPrefix = `branches.${branchIndex}.conditions.${conditionIndex}`;

  return (
    <Box maxWidth="100%" m="auto">
      <Grid container spacing={2} alignItems="flex-end">
        {/* Logical Operator Field */}
        <Grid item xs={2}>
          <FormControl
            fullWidth
            error={
              touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.logicalOperator &&
              Boolean(errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.logicalOperator)
            }
          >
            <InputLabel>Logical Operator</InputLabel>
            <Select
              name={`${fieldPrefix}.logicalOperator`}
              value={values.branches[branchIndex].conditions[conditionIndex].logicalOperator}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Logical Operator"
            >
              {logicalOperators.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.logicalOperator &&
                errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.logicalOperator}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Node Event Field */}
        <Grid item xs={3}>
          <FormControl
            fullWidth
            error={
              touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.nodeEvent &&
              Boolean(errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.nodeEvent)
            }
          >
            <InputLabel>Node Event</InputLabel>
            <Select
              name={`${fieldPrefix}.nodeEvent`}
              value={values.branches[branchIndex].conditions[conditionIndex].nodeEvent}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Node Event"
            >
              {nodeEvents.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.nodeEvent &&
                errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.nodeEvent}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Operator Field */}
        <Grid item xs={3}>
          <FormControl
            fullWidth
            error={
              touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.operator &&
              Boolean(errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.operator)
            }
          >
            <InputLabel>Operator</InputLabel>
            <Select
              name={`${fieldPrefix}.operator`}
              value={values.branches[branchIndex].conditions[conditionIndex].operator}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Operator"
            >
              {operators.map(option => (
                <MenuItem key={option.symbol} value={option.symbol}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.operator &&
                errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.operator}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Value Field */}
        <Grid item xs={3}>
          <TextField
            name={`${fieldPrefix}.value`}
            label="Value"
            fullWidth
            value={values.branches[branchIndex].conditions[conditionIndex].value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.value &&
              Boolean(errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.value)
            }
            helperText={
              touched.branches?.[branchIndex]?.conditions?.[conditionIndex]?.value &&
              errors.branches?.[branchIndex]?.conditions?.[conditionIndex]?.value
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConditionForm;
