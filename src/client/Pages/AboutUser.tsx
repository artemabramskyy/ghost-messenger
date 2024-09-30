import React, {useEffect, useState} from 'react'
import {Sender} from "root/src/interfaces/User";
import {useNavigate} from "react-router-dom";

const AboutUser = () => {
  const [user, setUser] = useState<Sender | null>(null);

  useEffect(() => {
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    const navigate = useNavigate();
    if (!sender) {
      throw new Error('User not found');
    }
    setUser(sender);
  }, []);

  return (
    <div>
      <h2>Only for testing purposes</h2>
      <h3>Username - {user?.username}</h3>
      <h3>Id - {user?.id}</h3>
      <h3>Private key - {user?.privateKey}</h3>
      <h3>Public key - {user?.publicKey}</h3>
    </div>
  )
}
export default AboutUser
