import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Stack, useTheme, Typography } from '@mui/material';

// Extend NodeProps to specify the type of value
interface ValidateOrderProps {
  data: {
    value?: string; // Ensures value is compatible with ReactNode
    checkValid: string;
    verifyOrder: string;
  };
}

const ValidateOrder  = ({
  data: { value, checkValid, verifyOrder },
}: ValidateOrderProps) => {
  const theme = useTheme();

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px dashed ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.background.paper,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" component="div" color="textPrimary">
          Action Node: Validate Order
        </Typography>
      </Stack>
      {value && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Value: {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Valid: {checkValid}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Verify: {verifyOrder}
          </Typography>
        </Box>
      )}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Paper>
  );
};

export default ValidateOrder;
