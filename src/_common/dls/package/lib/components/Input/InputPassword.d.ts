import React, { ReactNode } from 'react';
import { InputProps } from '.';
export interface VisibilityToggle {
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
}
export interface InputPasswordProps extends InputProps {
    iconRender?: (visible: boolean) => ReactNode;
    visibilityToggle?: VisibilityToggle;
}
declare const InputPassword: React.ForwardRefExoticComponent<InputPasswordProps & React.RefAttributes<HTMLInputElement>>;
export default InputPassword;
