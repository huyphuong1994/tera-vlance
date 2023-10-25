/// <reference types="react" />
import { ModalProps } from './interface';
interface FooterProps {
    onOk?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
interface HeaderProps {
    title: React.ReactNode;
    closeIcon?: React.ReactNode;
    onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}
export declare const Footer: React.FC<FooterProps & Pick<ModalProps, 'footer' | 'okText' | 'okType' | 'cancelText' | 'confirmLoading' | 'okButtonProps' | 'cancelButtonProps'>>;
export declare const Header: React.FC<HeaderProps>;
export {};
