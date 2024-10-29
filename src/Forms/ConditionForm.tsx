import { useFormik } from 'formik';
import React, { useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Stack,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { ConditionFormSchema } from './validationSchemas';

import type { FormValues, ConditionFormProps } from './types'; // Import shared types from types.ts

const logicalOperators = ['WHERE'];
const nodeEvents = ['Company', 'Countries', 'Source'];
const operators = [{ symbol: '===', name: 'Equal' }];

const ConditionForm = ({ condition, onRemove, onUpdate }: ConditionFormProps) => {
  const formik = useFormik<FormValues>({
    initialValues: condition,
    validationSchema: ConditionFormSchema,
    onSubmit: (values) => {
      onUpdate(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    onUpdate(formik.values);
    // Ensure dependencies are correctly managed without causing lint issues
  }, [formik.values, onUpdate]);

  return (
    <Paper
      component="form"
      onSubmit={formik.handleSubmit}
      elevation={2}
      sx={{
        p: 1,
        borderRadius: 2,
        bgcolor: 'grey.50',
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        Conditions
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        mb={1}
      >
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

        <FormControl
          fullWidth
          error={formik.touched.nodeEvent && Boolean(formik.errors.nodeEvent)}
        >
          <InputLabel>Event</InputLabel>
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
      </Stack>

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onRemove}
        />
      </Box>
    </Paper>
  );
};

export default ConditionForm;
