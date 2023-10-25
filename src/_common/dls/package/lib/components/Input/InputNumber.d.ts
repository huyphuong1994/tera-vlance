import React, { ChangeEvent } from 'react';
import { InputProps } from '.';
export interface InputNumberProps extends Omit<InputProps, 'onChange' | 'type'> {
    value?: number;
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
    onChange?: (value: number | ChangeEvent<Element>) => void;
    min?: number;
    max?: number;
}
declare const InputNumber: React.ForwardRefExoticComponent<InputNumberProps & React.RefAttributes<HTMLInputElement>>;
export default InputNumber;
