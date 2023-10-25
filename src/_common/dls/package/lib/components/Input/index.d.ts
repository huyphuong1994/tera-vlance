import { DivProps } from 'common/interfaces';
import React, { ReactNode } from 'react';
export interface InputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref' | 'prefix'> {
    prefix?: ReactNode;
    suffix?: ReactNode;
    prefixProps?: {
        onClick?: React.MouseEventHandler<HTMLDivElement>;
        className?: string;
    };
    suffixProps?: {
        onClick?: React.MouseEventHandler<HTMLDivElement>;
        className?: string;
    };
    containerProps?: DivProps;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { default as InputNumber } from './InputNumber';
export type { InputNumberProps } from './InputNumber';
export { default as InputPassword } from './InputPassword';
export type { InputPasswordProps, VisibilityToggle } from './InputPassword';
export { default as Search } from './Search';
export type { SearchProps } from './Search';
export default Input;
