import { ReactElement, ReactNode } from 'react';
export interface BreadcrumbsProps {
    items?: ItemType[];
    separator?: ReactNode;
    className?: string;
    containerItemClassName?: string;
}
export interface ItemType {
    title?: ReactElement | string;
    children?: ItemType[];
    onClick?: (e: any) => void;
}
declare const Breadcrumbs: ({ items, separator, className, containerItemClassName, ...restProps }: BreadcrumbsProps) => import("react/jsx-runtime").JSX.Element;
export default Breadcrumbs;
