import React from 'react'
import Message from "root/src/interfaces/Message";

interface IMessageProps {
  message: Message;
}

const ChatMessage = ({message}: IMessageProps) => {
  return (
    <div
      className="message">From {message.sender.username} to {message.receiver.username}
      <p>{message.text}</p>
      <hr/>
    </div>
  )
}
export default ChatMessage
