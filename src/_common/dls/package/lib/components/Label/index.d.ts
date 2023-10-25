import React from 'react';
export interface LabelProps extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
    required?: boolean;
    className?: string;
    children?: string;
}
declare const Label: React.FC<LabelProps>;
export default Label;
