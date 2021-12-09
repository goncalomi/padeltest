import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { User } from '../App';
import { VerticalNavigation, VerticalSection, VerticalItem, Input, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import { ChatNotifciations } from './Home';

const StyledContainer = styled.div`
    width: 100%;
    background: lightgray;
    border-right: 1px solid lightgray;
    display: flex;
`;

const StyledMenu = styled.div`
    width: 450px;
    background: lightgray;
    border-right: 1px solid lightgray;
`;

const StyledChat = styled.div`
    width: 100%;
    height: 100%;
    background: aliceblue;
    border-right: 1px solid lightgray;
    display: flex;
    flex-direction: column;
`;

const StyledBox = styled.div`
    width: 100%;
    height: 60px;
    background: lightgray;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MessageBox = styled.div`
    width: 100%;
    height: 100%;
`;

interface ChatType {
    id: number;
    name: string;
}

interface ChatProps {
    user: User;
    notifications: ChatNotifciations[];
    notificationsUpdate: (messageIds: number[]) => void;
}

interface Message {
    message: string;
    username: string;
    messageId: number;
    senderId: number;
}

export interface ChatMessage {
    message: string;
    senderId: number;
    chatId: number;
}


export const Chat: React.FC<ChatProps> = ({ user, notifications, notificationsUpdate }) => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const socketRef = useRef<WebSocket|null>(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/chats/?userId=${user.id}`, {headers: {"Authorization": `Token ${user.token}`}})
        .then(response => {
            const data: ChatType[] = response.data['chats'];
            setChats(data);
        })
    }, [])

    useEffect(
		() => {
			socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/app/padel/?token=${user.token}`);
			socketRef.current.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.type === 'chat') {
                    setMessages([...messages, {message: data.message, senderId: data.sender_id, chatId: data.chat_id}]);
                } 
            }   
			return () => socketRef.current?.close();
		},
		[ messages ]
	)

    // useEffect(() => {
    //     const nots = notifications.filter(notification => notification.get === false);
    //     const notsToUpdate: number[] = [];
    //     nots.forEach(notification => {
    //         axios.get(`http://127.0.0.1:8000/api/v1/message/?chatId=${notification.chatId}&messageId=${notification.messageId}`, {headers: {"Authorization": `Token ${user.token}`}})
    //         .then(response => {
    //             const data: Message = response.data;
    //             setMessages(prev => prev.concat({
    //                 message: data.message,
    //                 username: data.username,
    //                 senderId: data.senderId,
    //                 messageId: data.messageId
    //             }));

    //         })
    //         notsToUpdate.push(notification.messageId)
    //     })
    //     notificationsUpdate(notsToUpdate);

    // }, [notifications]);


    const handleClickSendMessage = () => {              
        socketRef.current?.send(JSON.stringify({
            type: 'chat',
            message: messageInput,
            userId: user.id,
            chatId: chats[0].id,
        }));
        setMessageInput('');
    }

    return (
        <StyledContainer>
            <StyledMenu>
                <VerticalNavigation>
                    <VerticalSection label="Chat">
                        {
                            chats.map(chat => <VerticalItem name="chat" label={chat.name} key={chat.id} />)
                        }
                    
                    </VerticalSection>
                </VerticalNavigation>
            </StyledMenu>
            <StyledChat>
                <MessageBox>
                        {
                            messages.map(message => { 
                                const align = message.senderId === user.id ? 'right' : 'left';
                                return <p key={message.message} style={{textAlign: align}} >{message.message}</p>

                            })
                        }
                </MessageBox>
                <StyledBox>
                    <Input
                        placeholder="Write message"
                        type="text"
                        className="rainbow-p-around_medium"
                        style={{ width: '70%' }}
                        onChange={(e) => setMessageInput(e.target.value)}
                        value={messageInput}
                    />
                    <Button onClick={handleClickSendMessage}  variant="brand" className="rainbow-m-around_medium" style={{ width: '100px', display: 'flex', justifyContent: 'space-around' }} >
                        Send
                        <FontAwesomeIcon icon={faArrowRight} className="rainbow-m-left_medium" />
                    </Button>

                </StyledBox>
            </StyledChat>
        </StyledContainer>

    )
}
