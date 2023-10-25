import React, { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
}
declare const TextArea: React.ForwardRefExoticComponent<Omit<TextAreaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export default TextArea;
