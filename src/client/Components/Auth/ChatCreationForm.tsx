import React, {useState} from 'react'
import ChatCreationData from "root/src/interfaces/ChatCreationData";
import User from "root/src/interfaces/User";
import {useWSContext} from "root/src/client/Context/Context";
import StoredChat from "root/src/interfaces/StoredChat";

interface IChatCreationFormProps {
  setIsMessageFormVisible: (arg: boolean) => void;
}

const ChatCreationForm = ({setIsMessageFormVisible}: IChatCreationFormProps) => {
  const {URL, webSocket} = useWSContext();
  const [formData, setFormData] = useState<ChatCreationData>({
      sender: {username: '', id: ''},
      receiver: {username: '', id: ''}
    }
  );

  const saveToLocalStorage = () => {
    const sender: User = formData.sender;
    const receiver: User = formData.receiver
    const chat: StoredChat = {
      messages: [],
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
    formData.sender = JSON.parse(localStorage.getItem("sender")!);
    const hasEmptyField = Object.values(formData.sender).concat(Object.values(formData.receiver)).some(value => value === '');
    if (hasEmptyField) {
      alert("You cannot create a chat with some of the fields empty!")
      return;
    }
    try {
      const result = await fetch(`${URL}/chat/create`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({...formData})
      });
      console.log("chat created!");
    } catch (e) {
      console.log(e)
    }
    saveToLocalStorage();
    setIsMessageFormVisible(true);
  }

  return (
    <form>
      <h3>Write yours and your friend`s login</h3>
      {/*<input value={formData.sender.username}*/}
      {/*       name="sender.username"*/}
      {/*       placeholder="your username" onChange={handleChange}></input>*/}
      {/*<input value={formData.sender.id} placeholder="your id"*/}
      {/*       name="sender.id"*/}
      {/*       onChange={handleChange}></input>*/}
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
