import { ForwardRefExoticComponent, RefAttributes } from 'react';
import CheckboxGroup from './Group';
import type { CheckboxProps } from './interface';
type CompoundedComponent = ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>> & {
    Group: typeof CheckboxGroup;
};
declare const Checkbox: CompoundedComponent;
export default Checkbox;
