import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';

import { Box, Paper, Stack, SvgIcon, useTheme, Typography } from '@mui/material';

// Define a custom WebhookIcon using SvgIcon
const WebhookIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    {/* Example SVG path for a webhook-like icon */}
    <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9zm9 7c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7zm1-7h4v2h-4v-2zm0-4h4v2h-4v-2z" />
  </SvgIcon>
);

// Extend NodeProps to specify the type of label
interface WebHookTriggerProps extends NodeProps {
  data: {
    label?: string; // Ensures label is compatible with ReactNode
  };
}

const WebHookTrigger  = ({ data: { label } } : WebHookTriggerProps) => {
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
        <WebhookIcon color="primary" fontSize="large" aria-label="Webhook Trigger Icon" />
        <Typography variant="h6" component="div" color="textPrimary">
          Start Node: Webhook Trigger
        </Typography>
      </Stack>
      {label && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            label: {label}
          </Typography>
        </Box>
      )}
      <Handle type="source" position={Position.Right} />
    </Paper>
  );
};

export default WebHookTrigger;
