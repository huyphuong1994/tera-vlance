import { ReactNode } from 'react';
import { DivProps, IconType } from './interface';
export interface NoticeProps {
    icon?: ReactNode;
    description?: ReactNode;
    message?: ReactNode;
    type?: IconType;
    className?: string;
    props?: DivProps;
}
export declare const TypeIcon: {
    success: import("react/jsx-runtime").JSX.Element;
    error: import("react/jsx-runtime").JSX.Element;
    warning: import("react/jsx-runtime").JSX.Element;
};
declare const Notice: (props: NoticeProps) => import("react/jsx-runtime").JSX.Element;
export declare function CloseDefaultIcon(): import("react/jsx-runtime").JSX.Element;
export default Notice;
