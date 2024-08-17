import React, {useState} from 'react'
import IMessage from "root/src/client/Interfaces/IMessage";
import IUser from "root/src/client/Interfaces/IUser";
import {useWSContext} from "root/src/client/Context/Context";

interface ISendMessageFormProps {
  addMessage: (message: IMessage) => void;
}

const SendMessageForm = ({addMessage}: ISendMessageFormProps) => {
  const {webSocket} = useWSContext();
  const URL = '/api/v1/message/send';
  const [text, setText] = useState<string>('');
  const [message, setMessage] = useState<IMessage>({
    receiver: {username: '', id: ''},
    sender: {username: '', id: ''},
    text
  });

  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(text);
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    const sender = JSON.parse(localStorage.getItem('sender')!);
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        chat: {sender, receiver},
        message: text
      }));
      const message: IMessage = {
        receiver,
        sender,
        text,
      };
      addMessage(message);
    } else {
      console.log("Websocket is null or not open");
    }
  }

  return (
    <form>
      <input placeholder="your message"
             onChange={(e) => {
               setText(e.target.value)
             }}></input>
      <button onClick={sendMessage}>
        Send Message
      </button>
    </form>
  )
}
export default SendMessageForm
