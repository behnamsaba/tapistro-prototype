// src/validationSchemas.ts
import * as Yup from 'yup';

export const TitleFormSchema = Yup.object({
  journeyName: Yup.string()
    .required('Journey Name is required')
    .min(3, 'Journey Name must be at least 3 characters'),
});

export const StartNodeFormSchema = Yup.object({
  actionOption: Yup.string().required('Action Node is required'),
});

export const ActionNodeFormSchema = Yup.object({
  enrich: Yup.string()
    .required('Enrich is required')
    .max(100, 'Enrich must be at most 100 characters'),
  
  api: Yup.string()
    .oneOf(['Apollo', 'G2', 'Factors.ai'], 'Select a valid API')
    .required('API is required'),
});

export const StartNodeFormDetailsSchema = Yup.object({
  source: Yup.string()
    .required('Source is required')
    .max(100, 'Source must be at most 100 characters'),

  configuration: Yup.string()
    .required('Configuration is required')
    .max(200, 'Configuration must be at most 200 characters'),

  jobTitle: Yup.string()
    .required('Job Title is required')
    .max(100, 'Job Title must be at most 100 characters'),

  company: Yup.string()
    .required('Company is required')
    .max(100, 'Company must be at most 100 characters'),

  country: Yup.string()
    .oneOf(['United States', 'Germany', 'France', 'India'], 'Select a valid country')
    .required('Country is required'),
});


export const ConditionFormSchema = Yup.object({
  logicalOperator: Yup.string().required('Required'),
  nodeEvent: Yup.string().required('Required'),
  operator: Yup.string().required('Required'),
  value: Yup.string().required('Required'),
});
