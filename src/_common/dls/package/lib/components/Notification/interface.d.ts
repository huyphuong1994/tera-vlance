import type * as React from 'react';
import { NoticeProps } from './Notice';
import { OpenConfig } from 'rc-notification/es/Notifications';
export interface DivProps extends React.HTMLProps<HTMLDivElement> {
    'data-testid'?: string;
}
export type IconType = 'success' | 'error' | 'warning';
export interface ArgsProps extends Partial<OpenConfig>, NoticeProps {
    props?: DivProps;
}
type StaticFn = (args: ArgsProps) => void;
export interface NotificationInstance {
    success: StaticFn;
    error: StaticFn;
    warning: StaticFn;
    open: StaticFn;
    destroy(key?: React.Key): void;
}
export {};
