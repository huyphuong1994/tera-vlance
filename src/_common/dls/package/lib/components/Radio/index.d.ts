import React from 'react';
import Group from './Group';
import { RadioProps } from './interface';
type CompoundedComponent = React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> & {
    Group: typeof Group;
};
declare const Radio: CompoundedComponent;
export default Radio;
