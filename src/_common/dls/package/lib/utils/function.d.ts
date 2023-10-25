export declare const removeObjectInArr: <T>(indexItem: number, arr: T[]) => T[];
export declare const updateToggleObjectInArr: <T>(indexItem: number, item: T, arr: T[]) => T[];
export declare function removeKeyFromObject(originalObject: Record<string, any>, keyToRemove: string): Record<string, any>;
export declare const getFieldObjToArr: (arr: any[], field: string) => any[];
export declare const filterField: (params: any) => Partial<any>;
export declare const mergeField: (...params: any[]) => any;
export declare const generateNumberDigit: (value: number | string) => string;
export declare const mergeArrayObjectByKey: (originalArray: {
    [key: string]: any;
}[], newArray: {
    [key: string]: any;
}[], key: string) => ({
    [key: string]: any;
} & {
    [key: string]: any;
})[];
export declare const mergeArrayObjectByKeyDependOnNewArray: (originalArray: {
    [key: string]: any;
}[], newArray: {
    [key: string]: any;
}[], key: string) => ({
    [key: string]: any;
} & {
    [key: string]: any;
})[];
export declare const convertArrToString: (arr: string[], separate?: string) => string;
