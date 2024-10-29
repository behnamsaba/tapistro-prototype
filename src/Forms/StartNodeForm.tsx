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
  FormHelperText
} from '@mui/material';

import { useStore } from 'src/react-flow/store';

import { StartNodeFormSchema } from './validationSchemas';

import type { StartNodeFormValues } from './types';

// Define the available action options
const actionOptions = ['Linkedin', 'Apollo', 'Factors.ai', 'R B2B', 'Clearbit'];


const StartNodeForm = () => {
  const { nodes, setNodes, setCurrentForm } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm
    }))
  );

  // Initialize Formik with initial values, validation schema, and submit handler
  const formik = useFormik<StartNodeFormValues>({
    initialValues: {
      actionOption: '',
    },
    validationSchema: StartNodeFormSchema,
    onSubmit: (values: StartNodeFormValues) => {
      const updatedNodes = nodes.map(node =>
        node.id === "1"
          ? { ...node, data: { ...node.data, label: values.actionOption } }
          : node
      );
      setNodes(updatedNodes);
      setCurrentForm("StartNodeFormDetails")
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
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
        Please Select the source of data (Start Node)
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} alignItems="center">
          <FormControl
            variant="outlined"
            error={formik.touched.actionOption && Boolean(formik.errors.actionOption)}
            sx={{ width: 250 }}
          >
            <InputLabel id="actionOption-label">Source</InputLabel>
            <Select
              labelId="actionOption-label"
              id="actionOption"
              name="actionOption"
              value={formik.values.actionOption}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Action Node"
            >
              {actionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.actionOption && formik.errors.actionOption && (
              <FormHelperText>{formik.errors.actionOption}</FormHelperText>
            )}
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            size="medium"
          >
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StartNodeForm;
