import { NotificationArgsProps, message, notification } from 'antd'
import { NoticeType } from 'antd/es/message/interface'

export const baseMessage = (type: NoticeType, msg: string) => {
  message[type](msg)
}
type NotificationType = 'success' | 'info' | 'warning' | 'error'
export const baseNotify = (type: NotificationType, config: NotificationArgsProps) => {
  notification[type](config)
}