import { ReactNode } from 'react';
export interface EmptyProps {
    description?: ReactNode;
    image?: ReactNode;
    className?: string;
    classNameImage?: string;
}
declare const Empty: ({ className, classNameImage, description, image, }: EmptyProps) => import("react/jsx-runtime").JSX.Element;
export default Empty;
