import React from 'react'
import { User } from '../App'
import { ChatNotifciations, CommonNotifications } from './Home'

interface NotificationProps {
    notifications: CommonNotifications[];
    chatNotifications: ChatNotifciations[];
    user: User;
}

export const Notification: React.FC<NotificationProps> = ({ notifications, chatNotifications, user }) => {
    const chats = [3];
    const filteredNots = chatNotifications.filter(not => chats.includes(not.chatId) && not.senderId !== user.id);

    return (
        <div>
            {
                notifications.map((notification) => <p>{notification.content}</p>)
            }
            {
                chats.map(chat => {
                    return <p>Chat {chat} have { filteredNots.length } new messages </p>
                })
            }
        </div>
    )
}
