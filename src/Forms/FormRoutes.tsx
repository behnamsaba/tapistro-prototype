import { useShallow } from 'zustand/react/shallow';

import { useStore } from 'src/react-flow/store';

import BranchOption from './BranchOption';
import StartNodeForm from './StartNodeForm';
import ActionNodeForm from './ActionNodeForm';
import NextStepOption from './NextStepOption';
import DecisionNodeForm from './DecisionNodeForm';
import StartNodeFormDetails from './StartNodeFormDetails';

const FormRoutes = () => {
  const { currentForm, workflowTitle } = useStore(
    useShallow((state) => ({
      currentForm: state.currentForm,
      workflowTitle: state.workflowTitle,
    }))
  );

  if (!workflowTitle) {
    return <div>Fill the Journey Form first</div>;
  }

  switch (currentForm) {
    case 'StartNodeForm':
      return <StartNodeForm />;
    case 'StartNodeFormDetails':
      return <StartNodeFormDetails />;
    case 'ActionNodeForm':
      return <ActionNodeForm />;
      case 'NextStepOption':
        return <NextStepOption />;
        case 'DecisionNodeForm':
          return <DecisionNodeForm />;
        case 'BranchOption':
          return <BranchOption />;
    default:
      return null;
  }
};

export default FormRoutes;
