import { useShallow } from "zustand/react/shallow";

import { Stack, Button, Typography } from "@mui/material";

import { useStore } from "src/react-flow/store";

const NextStepOption = () => {
  const { setCurrentForm } = useStore(
    useShallow((state) => ({
      setCurrentForm: state.setCurrentForm
    }))
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        What is the next step that you want to add to your journey?
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        You can only choose one option
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={() => setCurrentForm('DecisionNodeForm')}>Decision Node</Button>
        <Button variant="contained" onClick={() => setCurrentForm('ActionNodeForm')}>
          Action Node
        </Button>
        {/* <Button variant="contained" onClick={() => setCurrentForm('TerminalNode')}>Terminal Node</Button> */}
      </Stack>
    </>
  );
};

export default NextStepOption;