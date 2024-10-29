import React from 'react';
import { useFormik } from 'formik';
import { useShallow } from 'zustand/react/shallow';

import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { useStore } from 'src/react-flow/store';

import { ActionNodeFormSchema } from './validationSchemas';

import type { ActionNodeFormValues } from './types';

const apiOptions = ['Apollo', 'G2', 'Factors.ai'];
const enrichOptions = ['Healthcare', 'IT', 'Fintech', 'Marketing', 'BioTech', 'Government'];

const ActionNodeForm = () => {
  const { nodes, setNodes, setCurrentForm } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm,
    }))
  );

  const formik = useFormik<ActionNodeFormValues>({
    initialValues: {
      enrich: '',
      api: '',
    },
    validationSchema: ActionNodeFormSchema,
    onSubmit: (values) => {
      const nonHyphenIds = nodes
        .filter(node => !node.id.includes('-'))
        .map(node => parseInt(node.id, 10))
        .filter(id => !Number.isNaN(id));

      const maxId = nonHyphenIds.length > 0 ? Math.max(...nonHyphenIds) : 0;
      const newId = (maxId + 1).toString();

      const yPositions = nodes.map(node => node.position.y);
      const maxY = yPositions.length > 0 ? Math.max(...yPositions) : 0;
      const newY = maxY + 100;

      const newNode = {
        id: newId,
        type: 'ActionNode',
        data: {
          enrich: values.enrich,
          API: values.api,
        },
        position: { x: 400, y: newY },
      };

      setNodes([...nodes, newNode]);
      setCurrentForm("NextStepOption");
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="caption"
        component="div"
        noWrap
        sx={{ fontSize: '0.9rem', textAlign: 'left', marginBottom: 2 }}
      >
        Please provide the details for the Action Node
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <FormControl
            variant="outlined"
            error={formik.touched.enrich && Boolean(formik.errors.enrich)}
            fullWidth
          >
            <InputLabel id="enrich-label">Enrich</InputLabel>
            <Select
              labelId="enrich-label"
              id="enrich"
              name="enrich"
              value={formik.values.enrich}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enrich"
            >
              {enrichOptions.map((enrich) => (
                <MenuItem key={enrich} value={enrich}>
                  {enrich}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.enrich && formik.errors.enrich && (
              <FormHelperText>{formik.errors.enrich}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            error={formik.touched.api && Boolean(formik.errors.api)}
            fullWidth
          >
            <InputLabel id="api-label">API</InputLabel>
            <Select
              labelId="api-label"
              id="api"
              name="api"
              value={formik.values.api}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="API"
            >
              {apiOptions.map((api) => (
                <MenuItem key={api} value={api}>
                  {api}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.api && formik.errors.api && (
              <FormHelperText>{formik.errors.api}</FormHelperText>
            )}
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            size="medium"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ActionNodeForm;
