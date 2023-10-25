/// <reference types="react" />
import { ArgsProps } from './interface';
import useNotification from './useNotification';
interface BaseMethods {
    open: (config: ArgsProps) => void;
    destroy: (key?: React.Key) => void;
    useNotification: typeof useNotification;
}
type StaticFn = (config: ArgsProps) => void;
interface NoticeMethods {
    success: StaticFn;
    warning: StaticFn;
    error: StaticFn;
}
declare const staticMethods: NoticeMethods & BaseMethods;
export default staticMethods;
