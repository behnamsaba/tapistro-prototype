// DecisionNodeForm.tsx
import { useFormik } from 'formik'; 
import { useShallow } from 'zustand/react/shallow';

import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import { useStore } from 'src/react-flow/store';

interface FormValues {
  description: string;
}

const DecisionNodeForm = () => {
  const { nodes, setNodes, setCurrentForm } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm
    }))
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      description: ''
    },
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
        type: 'DecisionNode',
        data: {
        description: values.description
        },
        position: { x: 400, y: newY },
      };

      setNodes([...nodes, newNode]);
      setCurrentForm('AddBranch'); 
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
        Please provide the details for the Decision Node
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
          >
            Save
          </Button>
        </Stack>
      </form>      
    </Box>
  );
};

export default DecisionNodeForm;
