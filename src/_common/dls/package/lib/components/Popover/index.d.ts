import { ReactElement, ReactNode } from 'react';
import { Placement } from '@floating-ui/react-dom';
export interface PopoverProps {
    content?: ReactNode;
    title?: ReactNode;
    children?: ReactElement;
    placement?: Placement;
    trigger?: 'hover' | 'focus' | 'click';
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare const Popover: ({ children, placement: customPlacement, onOpenChange, open, title, trigger, className, content, ...restProps }: PopoverProps) => import("react/jsx-runtime").JSX.Element;
export default Popover;
