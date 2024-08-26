import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import SendMessageForm
  from "root/src/client/Components/MessageUI/SendMessageForm";
import Message from "root/src/interfaces/Message";
import ChatMessage from "root/src/client/Components/MessageUI/ChatMessage";
import {useWSContext} from "root/src/client/Context/Context";
import StoredMessage from "root/src/interfaces/StoredMessage";

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {URL, webSocket} = useWSContext();

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    const chat = JSON.parse(localStorage.getItem("chat")!);
    if (chat !== null) {
      chat.messages.push({
        text: message.text,
        receiverId: message.receiver.id,
        senderId: message.sender.id,
      });
      localStorage.setItem('chat', JSON.stringify(chat));
    }
  }

  useEffect(() => {
    const chat = JSON.parse(localStorage.getItem("chat")!);
    const sender = JSON.parse(localStorage.getItem('sender')!);
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    if (chat !== null && sender !== null && receiver !== null) {
      const storedMessages: StoredMessage[] = chat.messages;
      storedMessages.forEach((storedMessage) => {
        const constructedMessage: Message = {
          text: storedMessage.text,
          sender,
          receiver
        };
        setMessages(prevMessages => [...prevMessages, constructedMessage]);
      })

    }
    if (webSocket) {
      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'chatMessageResponse') {
          console.log(data);
          const sender = JSON.parse(localStorage.getItem('sender')!);
          const receiver = JSON.parse(localStorage.getItem('receiver')!);
          const message: Message = {
            receiver: sender,
            sender: receiver,
            text: data.text
          };
          addMessage(message);
        }
      }
    }
  }, []);

  return (
    <div>
      {messages.map((message, i) => {
        return <ChatMessage key={i} message={message}/>
      })}
      <SendMessageForm addMessage={addMessage}/>
    </div>
  )
}
export default MessageBox
