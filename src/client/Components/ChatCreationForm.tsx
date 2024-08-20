import React, {useState} from 'react'
import IChatCreationData from "root/src/client/Interfaces/IChatCreationData";
import IUser from "root/src/client/Interfaces/IUser";

interface IChatCreationFormProps {
  setIsMessageFormVisible: (arg: boolean) => void;
}

const ChatCreationForm = ({setIsMessageFormVisible}: IChatCreationFormProps) => {
  const URL = '';
  const [formData, setFormData] = useState<IChatCreationData>({
      sender: {username: '', id: ''},
      receiver: {username: '', id: ''}
    }
  );

  const saveToLocalStorage = () => {
    const sender: IUser = formData.sender;
    const receiver: IUser = formData.receiver;
    localStorage.setItem('sender', JSON.stringify(sender));
    localStorage.setItem('receiver', JSON.stringify(receiver));
  }

  // TODO: check whether handle change works properly
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    const [parent, key] = name.split('.');
    setFormData(prevState => ({
      ...prevState,
      [parent]: {
        ...prevState[parent as keyof IChatCreationData],
        [key]: value
      }
    }));
  }

  const createChat = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const result = await fetch(URL, {
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

  // TODO: fix inputs they are not working!
  return (
    <form>
      <h3>Write yours and your friend`s login</h3>
      <input value={formData.sender.username}
             name="sender.username"
             placeholder="your username" onChange={handleChange}></input>
      <input value={formData.sender.id} placeholder="your id"
             name="sender.id"
             onChange={handleChange}></input>
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
