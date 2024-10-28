// BranchOption.tsx
import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import ConditionsList from './ConditionsList';
import { Box, Button, Typography } from '@mui/material';

// Define the shape of a single condition
interface ConditionFormValues {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

// Define the shape of a branch containing multiple conditions
interface Branch {
  conditions: ConditionFormValues[];
}

// Define the overall form values
interface FormValues {
  branches: Branch[];
}

// Validation schema using Yup
const validationSchema = Yup.object({
  branches: Yup.array()
    .of(
      Yup.object({
        conditions: Yup.array()
          .of(
            Yup.object({
              logicalOperator: Yup.string().required('Required'),
              nodeEvent: Yup.string().required('Required'),
              operator: Yup.string().required('Required'),
              value: Yup.string().required('Required'),
            })
          )
          .min(1, 'At least one condition is required')
          .max(3, 'Maximum three conditions are allowed'),
      })
    )
    .min(1, 'At least one branch is required')
    .max(3, 'Maximum three branches are allowed'),
});

const BranchOption: React.FC = () => {
  // Initial form values with one branch containing one condition
  const initialValues: FormValues = {
    branches: [
      {
        conditions: [
          {
            logicalOperator: '',
            nodeEvent: '',
            operator: '',
            value: '',
          },
        ],
      },
    ],
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {formik => (
        <Form>
          <Box>
            <Typography variant="h6">Make Decisions</Typography>
            <Typography>You can have multiple decisions in the flow.</Typography>

            {/* Manage branches using FieldArray */}
            <FieldArray name="branches">
              {({ push, remove }) => (
                <Box>
                  {formik.values.branches.map((branch, branchIndex) => (
                    <Box key={branchIndex} mb={4} p={2} border={1} borderRadius={2}>
                      <Typography variant="subtitle1">Branch {branchIndex + 1}</Typography>
                      
                      {/* Render ConditionsList for each branch */}
                      <ConditionsList branchIndex={branchIndex} />

                      {/* Remove Branch Button */}
                      <Box mt={2}>
                        {formik.values.branches.length > 1 && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => remove(branchIndex)}
                          >
                            Remove Branch
                          </Button>
                        )}
                      </Box>
                    </Box>
                  ))}

                  {/* Add Branch Button */}
                  {formik.values.branches.length < 3 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        push({
                          conditions: [
                            {
                              logicalOperator: '',
                              nodeEvent: '',
                              operator: '',
                              value: '',
                            },
                          ],
                        })
                      }
                    >
                      + Add Branch
                    </Button>
                  )}
                </Box>
              )}
            </FieldArray>

            {/* Save Button */}
            <Box mt={3}>
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BranchOption;
