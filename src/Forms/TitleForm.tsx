import { useFormik } from 'formik';
import { useShallow } from 'zustand/react/shallow';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useStore } from 'src/react-flow/store';

import { TitleFormSchema } from './validationSchemas';

// Define the shape of form values
interface TitleFormValues {
  journeyName: string;
}

const TitleForm = () => {
  const { titleFormHandler, setCurrentForm } = useStore(
    useShallow((state) => ({
      workflowTitle: state.workflowTitle,
      titleFormHandler: state.titleFormHandler,
      setCurrentForm : state.setCurrentForm,
    }))
  );

  const formik = useFormik<TitleFormValues>({
    initialValues: {
      journeyName: '',
    },
    validationSchema: TitleFormSchema,
    onSubmit: (values: TitleFormValues) => {
      titleFormHandler(values.journeyName);
      setCurrentForm("StartNodeForm")

    },
  });

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80vw',
        height: '10vh',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            id="journeyName"
            name="journeyName"
            label="Journey Name"
            variant="outlined"
            value={formik.values.journeyName}
            onChange={formik.handleChange}
            error={formik.touched.journeyName && Boolean(formik.errors.journeyName)}
            helperText={formik.touched.journeyName && formik.errors.journeyName}
            sx={{ marginRight: 2 }}
          />
          <Button color="primary" variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TitleForm;
