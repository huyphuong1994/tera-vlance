import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
export interface ToggleProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {
    size?: 'small' | 'default' | 'large';
}
declare const Toggle: React.ForwardRefExoticComponent<Omit<ToggleProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export default Toggle;
