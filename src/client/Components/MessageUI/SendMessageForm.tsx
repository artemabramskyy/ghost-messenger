import React, {useState} from 'react'
import Message from "root/src/interfaces/Message";
import {
  useTypeGuardContext,
  useWSContext
} from "root/src/client/Context/Context";
import {sendMessageReq} from "root/src/client/Api";
import {
  deriveSharedSecret,
  encryptMessage, importPrivateKey,
  importPublicKey
} from "root/src/client/Encryption";
import {EncryptedData} from "root/src/interfaces/EncryptedData";
import {Receiver, Sender} from "root/src/interfaces/User";

interface ISendMessageFormProps {
  addMessage: (message: Message) => void;
}

const SendMessageForm = ({addMessage}: ISendMessageFormProps) => {
  const {webSocket} = useWSContext();
  const {isUserConsistent} = useTypeGuardContext();
  const [text, setText] = useState<string>('');

  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();
    const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
    console.log(receiver.publicKey)
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    if (!isUserConsistent(sender) || !isUserConsistent(receiver)) {
      console.log(isUserConsistent(sender), isUserConsistent(receiver))
      throw Error('Data for sending the message is not valid');
    }

    const importedKey = await importPublicKey(receiver.publicKey);
    const importedPrivateKey = await importPrivateKey(sender.privateKey);

    const senderSharedSecret = await deriveSharedSecret(importedPrivateKey, importedKey);
    const encryptedMessage: EncryptedData = await encryptMessage(text, senderSharedSecret);

    sendMessageReq(sender, receiver, webSocket, encryptedMessage);
    const message: Message = {
      receiver,
      sender,
      text,
    };
    addMessage(message);
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
