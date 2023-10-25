import { Moment } from 'moment';
import { PickerDateProps as RcPickerDateProps } from 'rc-picker/lib/Picker';
import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import { Locale } from 'rc-picker/lib/interface';
export type DatePickerProps = Omit<RcPickerDateProps<Moment>, 'locale' | 'generateConfig' | 'picker'> & {
    locale?: Locale;
    picker?: 'date' | 'month' | 'year' | 'week' | 'quarter';
    generateConfig?: GenerateConfig<Moment>;
};
declare const DatePicker: (props: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export default DatePicker;
