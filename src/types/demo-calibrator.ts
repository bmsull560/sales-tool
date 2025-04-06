import { ReactNode } from "react";

export type CalibratorOption = {
  key: string;
  label: string;
  icon: ReactNode;
  tips: string[];
  color: string;
  description?: string;
};

export type IndustryInfo = {
  name: string;
  description: string;
  tips: string;
  iconColor: string;
};

export type CalibratorValues = {
  technical: number;
  maturity: number;
  stage: number;
  authority: number;
};

export type CalibratorStage = 'industry' | 'primary' | 'advanced' | 'output';

export type SliderParams = {
  key: string;
  value: number;
  optimalRange: [number, number];
  color: string;
};

export type FlowNodeType = {
  id: string;
  position: { x: number, y: number };
  data: { 
    label: string;
    value?: number;
    percentage?: number;
    color?: string;
  };
  type?: string;
};

export type FlowEdgeType = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  style?: Record<string, any>;
};

export type ScriptVisualizationType = {
  nodes: FlowNodeType[];
  edges: FlowEdgeType[];
};

export type LayoutPreference = 'compact' | 'expanded' | 'visual';

export type SavedCalibration = {
  name: string;
  industry: string;
  values: CalibratorValues;
  timestamp: number;
};
