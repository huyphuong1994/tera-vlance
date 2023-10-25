import { ReactNode } from 'react';
export interface DescriptionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label?: ReactNode;
    labelClassName?: string;
    childrenClassName?: string;
}
declare const Description: import("react").ForwardRefExoticComponent<Omit<DescriptionProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default Description;
