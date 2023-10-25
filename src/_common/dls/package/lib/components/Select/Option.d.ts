import { ReactNode } from 'react';
export interface OptionProps {
    value?: string | number;
    label?: string;
    labelDisplay?: ReactNode;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    onSelect?: () => void;
    active?: boolean;
}
declare const Option: import("react").ForwardRefExoticComponent<OptionProps & import("react").RefAttributes<HTMLDivElement>>;
export default Option;
