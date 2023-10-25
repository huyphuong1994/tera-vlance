import React from 'react';
export interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    children?: React.ReactNode;
    className?: string;
}
export declare const FormContext: React.Context<FormProps>;
declare const Form: React.ForwardRefExoticComponent<Omit<FormProps, "ref"> & React.RefAttributes<HTMLFormElement>>;
export default Form;
