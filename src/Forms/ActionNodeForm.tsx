import { useFormik } from 'formik';
import { useShallow } from 'zustand/react/shallow';

import {
  Box,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText
} from '@mui/material';

import { useStore } from 'src/react-flow/store';

import { ActionNodeFormSchema } from './validationSchemas';

const apiOptions = ['Apollo', 'G2', 'Factors.ai'];

interface FormValues {
  enrich: string;
  api: string;
}

const ActionNodeForm = () => {
  const { nodes, setNodes, setCurrentForm } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm
    }))
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      enrich: '',
      api: '',
    },
    validationSchema: ActionNodeFormSchema,
    onSubmit: (values: FormValues) => {
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
          API: values.api
        },
        position: { x: 400, y: newY },
      };

      setNodes([...nodes, newNode]);
      setCurrentForm("NextStepOption")
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
          <TextField
            id="enrich"
            name="enrich"
            label="Enrich"
            variant="outlined"
            value={formik.values.enrich}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.enrich && Boolean(formik.errors.enrich)}
            helperText={formik.touched.enrich && formik.errors.enrich}
            fullWidth
          />

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
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ActionNodeForm;
