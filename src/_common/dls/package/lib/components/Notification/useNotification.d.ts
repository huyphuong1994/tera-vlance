/// <reference types="react" />
import { NotificationConfig as NotificationRcConfig } from 'rc-notification';
import { NotificationInstance } from './interface';
export interface NotificationConfig extends NotificationRcConfig {
}
export default function useNotification(notificationConfig?: NotificationConfig): readonly [NotificationInstance, import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>];
