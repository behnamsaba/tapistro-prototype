import { Handle, Position } from '@xyflow/react';

import { Box, List, Paper, ListItem, Typography, ListItemText } from '@mui/material';

// Define the props interface
interface ActionNodeDetailsProps {
  data: {
    label: string;
    status: string;
    verify: string;
    explain?: string;
  };
}

const ActionNodeDetails = ({
  data: { label, status, verify, explain },
}: ActionNodeDetailsProps) => (
  <Paper
    component="section"
    elevation={2}
    sx={{
      p: 2,
      borderRadius: 5,
      backgroundColor: '#f7e9eb',
      width: 250,
    }}
  >
    <Box mt={1}>
      <Typography variant="body2" color="primary" gutterBottom>
        {label}
      </Typography>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                <strong>Status:</strong> {status}
              </Typography>
            }
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                <strong>Verify:</strong> {verify}
              </Typography>
            }
          />
        </ListItem>
        {explain && (
          <ListItem disableGutters>
            <ListItemText
              primary={
                <Typography variant="body2" color="primary">
                  <strong>Function:</strong> {explain}
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Box>
    <Handle type="target" position={Position.Top} id="top" />
  </Paper>
);

export default ActionNodeDetails;
