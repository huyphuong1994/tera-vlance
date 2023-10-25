import React, { HTMLProps, MouseEvent, ReactNode } from 'react';
import { PresetColors } from './style';
export interface TagProps {
    className?: string;
    closeClassName?: string;
    closable?: boolean;
    closeIcon?: ReactNode;
    visible?: boolean;
    children?: ReactNode;
    border?: boolean;
    onClose?: (e: MouseEvent<HTMLElement>) => void;
    color?: PresetColors;
    spanProps?: HTMLProps<HTMLSpanElement>;
}
declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
export default Tag;
