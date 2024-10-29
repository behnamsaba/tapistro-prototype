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

import type { DecisionNodeFormValues } from './types';

const DecisionNodeForm = () => {
  const {
    nodes, setNodes, setCurrentForm,
    edges, setEdges, getLastParentID,
    getParentPosition
  } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm,
      edges: state.edges,
      setEdges: state.setEdges,
      getLastParentID: state.getLastParentID,
      getParentPosition: state.getParentPosition
    }))
  );

  const lastPosition = getParentPosition();

  const formik = useFormik<DecisionNodeFormValues>({
    initialValues: {
      description: ''
    },
    onSubmit: (values) => {
      const maxId = getLastParentID();
      const newId = (parseInt(maxId as string, 10) + 1).toString();
      const newY: number = lastPosition!.y + 100;

      const newNode = {
        id: newId,
        type: 'DecisionNode',
        data: { description: values.description },
        position: { x: 400, y: newY },
      };

      const newEdge = {
        id: `e-${maxId}-${newId}`,
        source: `${maxId}`,
        sourceHandle: 'bottom',
        target: `${newId}`,
        targetHandle: 'top',
      };

      setNodes([...nodes, newNode]);
      setEdges([...edges, newEdge]);
      setCurrentForm('BranchOption'); 
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
      <Typography variant="h5">
        Please provide the description for the Decision Node
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
