import React, {useState} from 'react'
import Message from "root/src/interfaces/Message";
import {
  useTypeGuardContext,
  useWSContext
} from "root/src/client/Context/Context";

interface ISendMessageFormProps {
  addMessage: (message: Message) => void;
}

const SendMessageForm = ({addMessage}: ISendMessageFormProps) => {
  const {webSocket} = useWSContext();
  const {isUserConsistent} = useTypeGuardContext();
  const [text, setText] = useState<string>('');
  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    const sender = JSON.parse(localStorage.getItem('sender')!);
    if (!isUserConsistent(sender) || !isUserConsistent(receiver)) {
      console.log(isUserConsistent(sender), isUserConsistent(receiver))
      throw Error('Data for sending the message is not valid');
    }
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(JSON.stringify({
        type: 'chatMessageRequest',
        chat: {sender, receiver},
        message: text
      }));
      const message: Message = {
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
      <h3>Send a message!</h3>
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
