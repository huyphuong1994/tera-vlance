import { Moment } from 'moment';
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale } from 'rc-picker/lib/interface';
import { PickerTimeProps as RcPickerTimeProps } from 'rc-picker/lib/Picker';
export type TimePickerProps = Omit<RcPickerTimeProps<Moment>, 'locale' | 'generateConfig' | 'picker'> & {
    locale?: Locale;
    generateConfig?: GenerateConfig<Moment>;
};
declare const TimePicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export default TimePicker;
