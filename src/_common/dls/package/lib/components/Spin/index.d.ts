import { ReactNode, SVGAttributes } from 'react';
export interface SpinProps {
    indicator?: ReactNode;
    size?: string;
    svgProps?: SVGAttributes<SVGElement>;
    spinning?: boolean;
    tip?: ReactNode;
    wrapperClassName?: string;
    children?: ReactNode;
}
declare const Spin: import("react").ForwardRefExoticComponent<SpinProps & import("react").RefAttributes<HTMLDivElement>>;
export default Spin;
