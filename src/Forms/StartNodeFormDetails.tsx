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

import { StartNodeFormDetailsSchema } from './validationSchemas';

// Define the available countries
const countryOptions = ['United States', 'Germany', 'France', 'India'];

// Define the shape of form values
interface FormValues {
  source: string;
  configuration: string;
  jobTitle: string;
  company: string;
  country: string;
}

const StartNodeFormDetails = () => {
  const { nodes, setNodes, setCurrentForm } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      setNodes: state.setNodes,
      setCurrentForm: state.setCurrentForm
    }))
  );

  // Initialize Formik with initial values, validation schema, and submit handler
  const formik = useFormik<FormValues>({
    initialValues: {
      source: '',
      configuration: '',
      jobTitle: '',
      company: '',
      country: '',
    },
    validationSchema: StartNodeFormDetailsSchema,
    onSubmit: (values: FormValues) => {
      const updatedNodes = nodes.map(node =>
        node.id === "1-1"
          ? { ...node, data: { 
              ...node.data, 
              Source: values.source,
              Configuration: values.configuration,
              JobTitle: values.jobTitle,
              Company: values.company,
              Countries: values.country 
            } }
          : node
      );
      setNodes(updatedNodes);
      setCurrentForm("ActionNodeForm")
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
        Please provide the details for the Start Node
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="source"
            name="source"
            label="Source"
            variant="outlined"
            value={formik.values.source}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.source && Boolean(formik.errors.source)}
            helperText={formik.touched.source && formik.errors.source}
            fullWidth
          />

          <TextField
            id="configuration"
            name="configuration"
            label="Configuration"
            variant="outlined"
            value={formik.values.configuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.configuration && Boolean(formik.errors.configuration)}
            helperText={formik.touched.configuration && formik.errors.configuration}
            fullWidth
          />

          <TextField
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            variant="outlined"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            fullWidth
          />

          <TextField
            id="company"
            name="company"
            label="Company"
            variant="outlined"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
            fullWidth
          />

          <FormControl
            variant="outlined"
            error={formik.touched.country && Boolean(formik.errors.country)}
            fullWidth
          >
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Country"
            >
              {countryOptions.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <FormHelperText>{formik.errors.country}</FormHelperText>
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
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StartNodeFormDetails;
