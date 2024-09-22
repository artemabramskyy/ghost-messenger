import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import SendMessageForm
  from "root/src/client/Components/MessageUI/SendMessageForm";
import Message from "root/src/interfaces/Message";
import ChatMessage from "root/src/client/Components/MessageUI/ChatMessage";
import {
  useTypeGuardContext,
  useWSContext
} from "root/src/client/Context/Context";
import StoredMessage from "root/src/interfaces/StoredMessage";
import {
  decryptMessage,
  deriveSharedSecret, importPrivateKey,
  importPublicKey
} from "root/src/client/Encryption";
import {EncryptedData} from "root/src/interfaces/EncryptedData";
import {logDOM} from "@testing-library/react";
import {Receiver, Sender} from "root/src/interfaces/User";
import StoredChat from "root/src/interfaces/StoredChat";

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {webSocket} = useWSContext();
  const {isChatConsistent, isUserConsistent} = useTypeGuardContext();

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    const chat = JSON.parse(localStorage.getItem("chat")!);
    if (chat !== null) {
      chat.storedMessages.push({
        text: message.text,
        receiverId: message.receiver.id,
        senderId: message.sender.id,
      });
      localStorage.setItem('chat', JSON.stringify(chat));
    }
  }


  const addDecryptedMessage = async (encryptedData: EncryptedData, sender: Sender, receiver: Receiver) => {
    try {
      // TODO: check whether this is correct
      const {ciphertext, iv} = encryptedData;
      const importedPrivateKey = await importPrivateKey(sender.privateKey.buffer);
      const importedPublicKey = await importPublicKey(receiver.publicKey);
      const sharedSecret = await deriveSharedSecret(importedPrivateKey, importedPublicKey);
      const decryptedText = await decryptMessage(sharedSecret, iv, ciphertext);

      const message: Message = {
        receiver: sender,
        sender: receiver,
        text: decryptedText
      };
      addMessage(message);
    } catch (error) {
      console.log('adding encrypted message error');
    }
  }

  useEffect(() => {
    const chat = JSON.parse(localStorage.getItem("chat")!) as StoredChat;
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
    if (isUserConsistent(sender) && isUserConsistent(receiver) && isChatConsistent(chat) && chat.storedMessages.length != 0) {
      const storedMessages: StoredMessage[] = chat.storedMessages;
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
        // TODO: move this listener to API/index, maybe pass some data to LocalStorage
         if (data.type === 'chatMessageResponse') {
          const encryptedData: EncryptedData = data.encryptedData;
          addDecryptedMessage(encryptedData, sender, receiver).then(r => console.log(r)).catch(err => console.log(err));
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
