export interface ImageProps {
    src?: string;
    width?: number;
    alt?: string;
    borderRadius?: number;
    imageClassName?: string;
    containerClassName?: string;
    preview?: {
        src: string;
    };
}
declare const Image: {
    ({ src, width, alt, preview, borderRadius, imageClassName, containerClassName, ...restProps }: ImageProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default Image;
