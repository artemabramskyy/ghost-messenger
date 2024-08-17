import React, {useState} from 'react'
import {css} from "@emotion/react";
import SendMessageForm
  from "root/src/client/Components/MessageUI/SendMessageForm";
import Message from "root/src/client/Components/MessageUI/Message";
import IMessage from "root/src/client/Interfaces/IMessage";

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageBox = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const addMessage = (message: IMessage) => {
    setMessages([...(messages), message]);
  }

  return (
    <div>
      {messages.map((message, i) => {
        return <Message message={message} index={i}/>
      })}
      <SendMessageForm addMessage={addMessage}/>
    </div>
  )
}
export default MessageBox
