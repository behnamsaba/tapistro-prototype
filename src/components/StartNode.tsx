import type { NodeProps } from '@xyflow/react';

import { Handle, Position } from '@xyflow/react';

import { Paper, Stack, SvgIcon, Typography } from '@mui/material';

// Define a custom WebhookIcon using SvgIcon
const WebhookIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    {/* Example SVG path for a webhook-like icon */}
    <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9zm9 7c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7zm1-7h4v2h-4v-2zm0-4h4v2h-4v-2z" />
  </SvgIcon>
);

// Extend NodeProps to specify the type of label
interface StartNodeProps extends NodeProps {
  data: {
    label: string; // Ensures label is compatible with ReactNode
  };
}

const StartNode = ({ data: { label } }: StartNodeProps) => (
  <Paper
    component="section"
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 5,
      backgroundColor: '#f7e9eb',
    }}
  >
    <Stack direction="row" spacing={2} alignItems="center">
      <WebhookIcon color="primary" fontSize="large" aria-label="Webhook Trigger Icon" />
      <Typography variant="h6" component="div" color="primary">
        {label}
      </Typography>
    </Stack>
    <Handle type="source" position={Position.Right} id="right" />
    <Handle type="source" position={Position.Bottom} id="bottom" />
  </Paper>
);

export default StartNode;
