import React, { Key } from 'react';
export interface TabPaneProps {
    keyTab?: Key;
    activeTab?: boolean;
    label?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: (event: any) => void;
}
declare const TabPane: React.ForwardRefExoticComponent<TabPaneProps & React.RefAttributes<HTMLButtonElement>>;
export default TabPane;
