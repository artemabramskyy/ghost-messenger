import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import SendMessageForm
  from "root/src/client/Components/MessageUI/SendMessageForm";
import Message from "root/src/interfaces/Message";
import ChatMessage from "root/src/client/Components/MessageUI/ChatMessage";
import {useWSContext} from "root/src/client/Context/Context";

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {URL, webSocket} = useWSContext();

  const addMessage = (message: Message) => {
    setMessages([...(messages), message]);
  }

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (event) => {
        const sender = JSON.parse(localStorage.getItem('sender')!);
        const receiver = JSON.parse(localStorage.getItem('receiver')!);
        const message: Message = {sender, receiver, text: event.data};
        addMessage(message);
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
