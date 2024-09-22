import React, {useEffect, useState} from 'react'
import ChatCreationData from "root/src/interfaces/ChatCreationData";
import {useWSContext} from "root/src/client/Context/Context";
import StoredChat from "root/src/interfaces/StoredChat";
import {createChatReq} from "root/src/client/Api";
import {importPublicKey} from "root/src/client/Encryption";

interface ChatCreationFormProps {
  setIsMessageFormVisible: (arg: boolean) => void;
}

const ChatCreationForm = ({setIsMessageFormVisible}: ChatCreationFormProps) => {
  const {URL, webSocket} = useWSContext();
  const [formData, setFormData] = useState<ChatCreationData>({
      sender: {username: '', id: ''},
      receiver: {username: '', id: ''}
    }
  );

  const saveToLocalStorage = () => {
    const {sender, receiver} = formData;
    const chat: StoredChat = {
      storedMessages: [],
      sender,
      receiver
    };
    localStorage.setItem('sender', JSON.stringify(sender));
    localStorage.setItem('receiver', JSON.stringify(receiver));
    localStorage.setItem('chat', JSON.stringify(chat));
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    const [parent, key] = name.split('.');
    setFormData(prevState => ({
      ...prevState,
      [parent]: {
        ...prevState[parent as keyof ChatCreationData],
        [key]: value
      }
    }));
  }

  const createChat = async (e: React.MouseEvent) => {
    e.preventDefault();
    const sender = JSON.parse(localStorage.getItem('sender')!);
    if(sender === null) {
      console.log("Cannot create chat, because sender is null");
      return;
    }
    const {username, id} = sender;
    formData.sender = {username, id};
    // checking whether only first and second fields are empty
    const hasEmptyField = Object.values(formData.sender).concat(Object.values(formData.receiver)).some(value => value === '');
    if (hasEmptyField) {
      alert("You cannot create a chat with some of the fields empty!");
      return;
    }

    await createChatReq(formData, URL);

    if (webSocket) {
      webSocket.send(JSON.stringify({
        type: 'chatExistenceRequest',
        ...formData
      }));
    }
    setIsMessageFormVisible(true);
  }

  return (
    <form>
      <h3>Write yours and your friend`s login</h3>
      <input value={formData.receiver.username}
             placeholder="yours friend username"
             name="receiver.username"
             onChange={handleChange}></input>
      <input value={formData.receiver.id} placeholder="yours friend id"
             name="receiver.id"
             onChange={handleChange}></input>
      <button onClick={createChat}>Create chat</button>
      <button onClick={e => localStorage.clear()}>
        Clear LocalStorage
      </button>
    </form>
  )
}
export default ChatCreationForm
