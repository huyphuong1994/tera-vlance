import { Moment } from 'moment';
import { RangePickerProps as RcRangePickerProps } from 'rc-picker/lib/RangePicker';
import { GenerateConfig } from 'rc-picker/lib/generate';
import { Locale } from 'rc-picker/lib/interface';
export type RangePickerProps = Omit<RcRangePickerProps<Moment>, 'locale' | 'generateConfig'> & {
    locale?: Locale;
    generateConfig?: GenerateConfig<Moment>;
};
declare const RangePicker: (props: RangePickerProps) => import("react/jsx-runtime").JSX.Element;
export default RangePicker;
