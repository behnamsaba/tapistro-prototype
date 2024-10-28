// ConditionForm.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from '@mui/material';

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

interface FormValues {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

interface ConditionFormProps {
  condition: FormValues;
  onRemove: () => void;
  onUpdate: (condition: FormValues) => void;
}

const validationSchema = Yup.object({
  logicalOperator: Yup.string().required('Required'),
  nodeEvent: Yup.string().required('Required'),
  operator: Yup.string().required('Required'),
  value: Yup.string().required('Required'),
});

const ConditionForm: React.FC<ConditionFormProps> = ({ condition, onRemove, onUpdate }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      logicalOperator: condition.logicalOperator,
      nodeEvent: condition.nodeEvent,
      operator: condition.operator,
      value: condition.value,
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdate(values);
    },
  });

  // Update parent when formik values change and are valid
  useEffect(() => {
    if (formik.isValid) {
      onUpdate(formik.values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formik.isValid]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} mb={2} p={2} border="1px solid #ccc" borderRadius="4px">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <FormControl
            fullWidth
            error={formik.touched.logicalOperator && Boolean(formik.errors.logicalOperator)}
          >
            <InputLabel>Logical Operator</InputLabel>
            <Select
              name="logicalOperator"
              value={formik.values.logicalOperator}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Logical Operator"
            >
              {logicalOperators.map((op) => (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.logicalOperator && formik.errors.logicalOperator && (
              <FormHelperText>{formik.errors.logicalOperator}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl
            fullWidth
            error={formik.touched.nodeEvent && Boolean(formik.errors.nodeEvent)}
          >
            <InputLabel>Node Event</InputLabel>
            <Select
              name="nodeEvent"
              value={formik.values.nodeEvent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Node Event"
            >
              {nodeEvents.map((event) => (
                <MenuItem key={event} value={event}>
                  {event}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.nodeEvent && formik.errors.nodeEvent && (
              <FormHelperText>{formik.errors.nodeEvent}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl
            fullWidth
            error={formik.touched.operator && Boolean(formik.errors.operator)}
          >
            <InputLabel>Operator</InputLabel>
            <Select
              name="operator"
              value={formik.values.operator}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Operator"
            >
              {operators.map((op) => (
                <MenuItem key={op.symbol} value={op.symbol}>
                  {op.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.operator && formik.errors.operator && (
              <FormHelperText>{formik.errors.operator}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            name="value"
            label="Value"
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
        </Grid>
        <Grid item xs={12} textAlign="right">
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove Condition
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConditionForm;
