export interface ProgressProps {
    percent?: number;
    status?: 'active' | 'exception';
    size?: number | string;
}
declare const Progress: ({ percent, status, size, ...restProps }: ProgressProps) => import("react/jsx-runtime").JSX.Element;
export default Progress;
