import React, { ReactNode } from 'react';
export interface TabContentProps {
    className?: string;
    active?: boolean;
    children?: ReactNode;
}
declare const TabContent: React.ForwardRefExoticComponent<TabContentProps & React.RefAttributes<HTMLDivElement>>;
export default TabContent;
