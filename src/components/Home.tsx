import React, { useEffect, useState } from 'react'
import {
    Routes,
    Route
  } from "react-router-dom";
import { Chat } from './Chat';
import { User } from '../App';
import useWebSocket from 'react-use-websocket';
import { Notification } from './Notification';

interface HomeProps {
    user: User;
}

export interface CommonNotifications {
    content: string;
    senderId: number | undefined;
}

export interface ChatNotifciations {
    chatId: number;
    messageId: number;
    get: boolean;
    senderId: number;
}



export const Home: React.FC<HomeProps> = ({ user }) => {
    const [notifications, setNotifications] = useState<CommonNotifications[]>([])
    const [chatNotifications, setChatNotifications] = useState<ChatNotifciations[]>([])

    // this is a hotfix
    const changed = 'ghanged to staging'
    // const {
    //   sendJsonMessage,
    //   lastJsonMessage,
    // } = useWebSocket(socketUrl);

    // useEffect(() => {
    //     if (lastJsonMessage !== null) {
    //         if ( lastJsonMessage.type === 'chat' ) {
    //             // setChatNotifications(prev => prev.concat({
    //             //     chatId: lastJsonMessage.chat_id,
    //             //     messageId: lastJsonMessage.message_id,
    //             //     get: false,
    //             //     senderId: lastJsonMessage.sender_id,
    //             // }))
    //             setMessages(prev => prev.concat({
    //                 message: lastJsonMessage.message,
    //                 senderId: lastJsonMessage.sender_id,
    //                 chatId: lastJsonMessage.chat_id,
    //             }))
    //         }
    //     }
    // }, [lastJsonMessage, setNotifications, sendJsonMessage, user]);

    // useEffect(() => {
    //     if (newMessage !== undefined) {
    //         sendJsonMessage({
    //             type: 'chat',
    //             message: newMessage,
    //             userId: user.id,
    //             chatId: 1,
    //         });
    //         setNewMessage(undefined);
    //     }
    // }, [newMessage]);

    const handleGetNotification = (messageIds: number[],) => {
        const newNotifications = chatNotifications;
        newNotifications.forEach(not => {
            if (messageIds.includes(not.messageId)) {
                not.get = true;
            }

        })
        setChatNotifications(newNotifications);
    }

    return (
        <Routes>
            <Route path="/" element={<Notification notifications={notifications} user={user} chatNotifications={chatNotifications} />}/>
            <Route path="chat" element={<Chat user={user} notifications={chatNotifications} notificationsUpdate={handleGetNotification} />}/>
        </Routes>
    )
}
