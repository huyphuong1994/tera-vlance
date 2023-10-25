import React, { CSSProperties, ReactNode } from 'react';
export interface FormFieldProps {
    isRequired?: boolean;
    name?: string;
    label?: string;
    isError?: boolean;
    messages?: string[] | string;
    layout?: 'inline' | 'vertical';
    labelClassName?: string;
    help?: ReactNode;
    helpClassName?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare const FormItemContext: React.Context<FormFieldProps>;
declare const FormItem: React.FC<FormFieldProps>;
export default FormItem;
