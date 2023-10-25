import React, { ReactNode } from 'react';
import { Status } from '.';
export interface StepProps {
    title?: ReactNode;
    description?: ReactNode;
    subTitle?: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    stepIndex?: number;
    stepNumber?: number;
    onStepClick?: (index: number) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    status?: Status;
}
declare const Step: ({ description, disabled, icon, title, stepIndex, stepNumber, onStepClick, onClick, status, }: StepProps) => import("react/jsx-runtime").JSX.Element;
export default Step;
