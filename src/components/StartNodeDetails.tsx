import { Handle, Position } from '@xyflow/react';

import { Box, List, Paper, ListItem, Typography, ListItemText } from '@mui/material';

interface StartNodeDetailsProps {
  data: {
    label: string;
    CustomerID: string;
    OrderID: string;
    ItemsOrdered: string;
  };
}

const StartNodeDetails = ({
  data: { label, CustomerID, OrderID, ItemsOrdered },
}: StartNodeDetailsProps) => (
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
        {label}:
      </Typography>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                <strong>{CustomerID}</strong>
              </Typography>
            }
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                <strong>{OrderID}:</strong>
              </Typography>
            }
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2" color="primary">
                <strong>{ItemsOrdered}</strong>
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
    <Handle type="target" position={Position.Top} id="top" />
  </Paper>
);

export default StartNodeDetails;
