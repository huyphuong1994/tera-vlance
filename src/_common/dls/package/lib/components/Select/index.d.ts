import { Placement } from '@floating-ui/react-dom';
import { DivProps } from 'common/interfaces';
import { ChangeEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import { OptionProps } from './Option';
export interface CustomTagProps {
    label: ReactNode;
    value: any;
    disabled: boolean;
    onClose: (event?: MouseEvent<HTMLElement, MouseEvent>) => void;
    closable: boolean;
}
export interface SelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref' | 'onSelect' | 'onChange' | 'defaultValue' | 'value'> {
    showSearch?: boolean;
    onSearch?: (value: string) => void;
    searchValue?: string;
    allowClear?: boolean;
    options?: OptionProps[];
    onChange?: (value: BaseValueType | ChangeEvent<Element>) => void;
    onSelect?: (value: ValueType | ValueType[] | BaseValueType, option?: OptionProps) => void;
    labelInValue?: boolean;
    mode?: 'multiple';
    placement?: Placement;
    dropdownClassName?: string;
    defaultValue?: BaseValueType;
    value?: BaseValueType;
    selectedValue?: OptionProps[] | OptionProps;
    onClear?: () => void;
    onChangeCustom?: (value: ValueType | ValueType[] | BaseValueType, selectedValue?: ValueType) => void;
    notFoundContent?: ReactNode;
    divProps?: DivProps;
    tagRender?: (props: CustomTagProps) => ReactElement;
}
export type BaseValueType = number | string | (string | number)[];
export interface ValueType {
    value?: string | number;
    label?: string;
}
declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLDivElement>>;
export default Select;
