import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { HookAPI as ModalHookAPI } from 'antd/es/modal/useModal';

declare global {
  interface Window {
    $message: MessageInstance;
    $notification: NotificationInstance;
    $modal: ModalHookAPI;
  }
}

export {};