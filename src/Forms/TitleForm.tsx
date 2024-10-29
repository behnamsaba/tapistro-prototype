import { useFormik } from 'formik';
import { useShallow } from 'zustand/react/shallow';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useStore } from 'src/react-flow/store';

import { TitleFormSchema } from './validationSchemas';

import type { TitleFormValues } from './types';

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
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TitleForm;
