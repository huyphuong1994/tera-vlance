import { Key, ReactNode } from 'react';
export interface CollapseProps {
    containerClassName?: string;
    headingClassName?: string;
    contentClassName?: string;
    accordion?: boolean;
    onChange?: (key: Key[]) => void;
    items?: ItemCollapseType[];
    width?: number;
    activeClassName?: string;
    activeKey?: Key | Key[];
    defaultActiveKey?: Key | Key[];
}
export interface ItemCollapseType {
    key?: Key;
    label?: ReactNode;
    children?: ReactNode;
    extra?: ReactNode;
}
declare const Collapse: import("react").ForwardRefExoticComponent<CollapseProps & import("react").RefAttributes<HTMLDivElement>>;
export default Collapse;
