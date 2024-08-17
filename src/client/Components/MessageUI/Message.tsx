import React from 'react'
import IMessage from "root/src/client/Interfaces/IMessage";

interface IMessageProps {
  message: IMessage;
  index: number;
}

const Message = ({message, index}: IMessageProps) => {
  return (
    <div className="message"
         key={index}>From {message.sender.username} to {message.receiver.username}
      <p>{message.text}</p>
      <hr/>
    </div>
  )
}
export default Message
