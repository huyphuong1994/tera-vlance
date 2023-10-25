import { unitOfTime } from 'moment';
interface IValidateFieldDate {
    toData: string;
    key: string;
    message: string;
    typeValidate: unitOfTime.StartOf;
}
export declare const validateFieldFromDate: ({ toData, key, message, typeValidate, }: IValidateFieldDate) => import("yup").StringSchema<string, import("yup").AnyObject, undefined, "">;
export declare const validateFieldToDate: ({ toData, key, message, typeValidate, }: IValidateFieldDate) => import("yup").StringSchema<string, import("yup").AnyObject, undefined, "">;
export {};
