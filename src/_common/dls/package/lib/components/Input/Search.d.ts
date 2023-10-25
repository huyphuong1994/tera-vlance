import React, { ReactNode } from 'react';
import { InputProps } from '.';
export interface SearchProps extends InputProps {
    onSearch?: (value: string, event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    containerClassName?: string;
}
declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<HTMLInputElement>>;
export default Search;
