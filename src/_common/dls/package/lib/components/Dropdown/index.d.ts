import { Placement } from '@floating-ui/react-dom';
import { Key, ReactElement } from 'react';
export interface DropdownItem {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    disabled?: boolean;
    key: Key;
    onClick?: (item: DropdownItem, key?: Key) => void;
    value?: Key;
}
export interface MenuDropdownProps {
    selectable?: boolean;
    defaultSelectedKey?: string;
    onChangeItem?: (item: DropdownItem, key?: Key) => void;
    itemClassName?: string;
    selectedKeys?: string;
    items?: Array<DropdownItem>;
}
export interface DropdownProps {
    menu?: MenuDropdownProps;
    containerClassName?: string;
    children?: ReactElement;
    trigger?: 'click' | 'hover';
    placement?: Placement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
