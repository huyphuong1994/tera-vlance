import { RefObject } from 'react';
type Handler = (event: MouseEvent) => void;
export declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(refs: RefObject<T> | RefObject<T>[], handler: Handler, mouseEvent?: 'mousedown' | 'mouseup'): void;
export {};
