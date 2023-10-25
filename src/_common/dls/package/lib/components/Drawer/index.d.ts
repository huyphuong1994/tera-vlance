import React from 'react';
export interface DrawerProps {
    open?: boolean;
    onClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
    maskClosable?: boolean;
    children?: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    containerClassName?: string;
    maskClassName?: string;
}
declare const Drawer: React.FC<DrawerProps>;
export default Drawer;
