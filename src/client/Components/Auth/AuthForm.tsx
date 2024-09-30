import React, {useState} from 'react'
import AuthData from "root/src/interfaces/AuthData";
import {useWSContext} from "root/src/client/Context/Context";
import {authReq} from "root/src/client/Api";

const AuthForm = () => {
  const {webSocket} = useWSContext();
  const [formData, setFormData] = useState<AuthData>(
    {username: "", id: ""}
  );

  const setIsAuthorized = (value: boolean) => {
    localStorage.setItem('isUserAuthorized ', JSON.stringify(value))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const auth = async (e: React.MouseEvent) => {
    e.preventDefault();
    const hasEmptyField = Object.values(formData).some(value => value === '');
    if (hasEmptyField) {
      alert("You cannot authenticate with some of the fields empty!");
      return;
    }
    try {
      await authReq(formData, webSocket);
    } catch (error) {
      console.error('Error calling authReq:', error);
    }
    setIsAuthorized(true);
  }

  return (
    <form>
      <h3>Write yours and your friend`s login</h3>
      <input value={formData.username}
             name="username"
             placeholder="your username" onChange={handleChange}></input>
      <input value={formData.id} placeholder="your id"
             name="id"
             onChange={handleChange}></input>
      <button onClick={auth}>Authenticate🤖</button>
    </form>
  )
}
export default AuthForm
