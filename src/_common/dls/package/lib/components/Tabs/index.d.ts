/// <reference types="react" />
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export interface TabsProps {
    itemClassName?: string;
    className?: string;
    id?: string;
    items?: TabItemType[];
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (activeKey: string) => void;
    onTabClick?: (activeKey: string, e: React.MouseEvent | React.KeyboardEvent) => void;
}
export interface TabItemType {
    key: string;
    label: React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}
declare const Tabs: {
    ({ items, defaultActiveKey, onChange, activeKey, onTabClick, className, }: TabsProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default Tabs;
