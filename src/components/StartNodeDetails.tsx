import { Handle, Position } from '@xyflow/react';

import { Box, Typography } from '@mui/material';

interface StartNodeDetailsProps {
  data: {
    label: string;
    Source: string;
    Configuration: string;
    JobTitle: string;
    Company: string;
    Countries: string;
  };
}

const StartNodeDetails = ({
  data: { label, Source, Configuration, JobTitle, Company, Countries },
}: StartNodeDetailsProps) => {
  // Define the fields to display
  const fields = [
    { label: 'Source', value: Source },
    { label: 'Configuration', value: Configuration },
    { label: 'Job Title', value: JobTitle },
    { label: 'Company', value: Company },
    { label: 'Countries', value: Countries },
  ];

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: '#f7e9eb',
        width: '300px',
        boxSizing: 'border-box',
        boxShadow: 1,
        position: 'relative',
      }}
    >
      {/* Label */}
      <Typography variant="h6" color="primary" gutterBottom>
        {label}
      </Typography>

      {/* Data Fields */}
      {fields.map((field) => (
        <Typography
          key={field.label}
          variant="body2"
          color="textPrimary"
          sx={{ mb: 1 }}
        >
          <strong>{field.label}:</strong> {field.value}
        </Typography>
      ))}

      {/* Handle */}
      <Handle type="target" position={Position.Left} id="left" />
    </Box>
  );
};

export default StartNodeDetails;
