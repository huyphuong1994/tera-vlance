import { PopoverProps } from '../Popover';
export type TooltipProps = Omit<PopoverProps, 'content'>;
declare const Tooltip: ({ children, placement: customPlacement, title, className, ...restProps }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export default Tooltip;
