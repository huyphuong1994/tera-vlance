import React from 'react';
import Step, { StepProps } from './Step';
export type Status = 'error' | 'finish' | 'wait';
export interface StepsProps {
    items?: StepProps[];
    onChange?: (current: number) => void;
    current?: number;
    initial?: number;
    direction?: 'horizontal' | 'vertical';
    status?: Status;
}
declare const Steps: React.FC<StepsProps>;
export default Steps;
export { Step };
export { type StepProps };
