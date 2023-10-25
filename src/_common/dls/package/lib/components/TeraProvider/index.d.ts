import React from 'react';
export interface TeraProps {
    children?: React.ReactNode;
}
interface ContentProps {
    is_verify?: boolean;
}
export declare const TeraContext: React.Context<{}>;
interface TeraType extends React.FC<TeraProps> {
}
declare const TeraProvider: TeraType;
export declare function useTera(): ContentProps;
export default TeraProvider;
