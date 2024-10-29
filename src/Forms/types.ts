export interface Conditions {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Branches {
  id: string;
  type: string;
  conditions: Conditions[];
  position: Position;
}

export interface FormValues {
  logicalOperator: string;
  nodeEvent: string;
  operator: string;
  value: string;
}

export interface ConditionsListProps {
  index: number;
  id: string;
  conditions: Conditions[];
  addConditionHandler: (condition: Conditions) => void;
  removeConditionHandler: (index: number) => void;
  updateConditionHandler: (index: number, condition: Conditions) => void;
  removeBranchHandler: () => void;
}

export interface ConditionFormProps {
  condition: FormValues;
  onRemove: () => void;
  onUpdate: (condition: FormValues) => void;
}


export interface DecisionNodeFormValues {
  description: string;
}

export interface ActionNodeFormValues {
  enrich: string;
  api: string;
}

export interface StartNodeFormValues {
  actionOption: string;
}


export interface StartNodeFormDetailsVal {
  source: string;
  configuration: string;
  jobTitle: string;
  company: string;
  country: string;
}

export interface TitleFormValues {
  journeyName: string;
}