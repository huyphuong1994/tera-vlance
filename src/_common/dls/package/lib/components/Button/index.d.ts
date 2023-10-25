import React, { MouseEventHandler, ReactNode } from 'react';
export interface ButtonProps {
    className?: string;
    type?: ButtonType;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    children?: ReactNode;
    outlined?: boolean;
    shape?: 'circle' | 'round';
}
export type ButtonType = 'primary' | 'danger' | 'warning' | 'light' | 'success' | 'dark' | 'alternative';
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
