import { RefObject } from 'react';
export declare function useHover<T extends HTMLElement = HTMLElement>(elementRefs: RefObject<T> | RefObject<T>[]): {
    isHover: boolean;
    setIsHover: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
