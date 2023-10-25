/// <reference types="react" />
export interface RadioGroupProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inline?: boolean;
}
export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}
export interface RadioGroupContextProps extends RadioGroupProps {
    groupValue?: string | number | readonly string[];
}
