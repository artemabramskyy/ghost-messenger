import React, {useState} from 'react'

const MessageForm = () => {
  const URL = '/api/v1/message/send-message'
  const [message, setMessage] = useState('');

  const sendMessage = async (e : React.MouseEvent) => {
    e.preventDefault();
    console.log(message);
    try {
      const result = await fetch(URL, {
        method: 'POST',
        body: message
      });
      console.log("cool!")
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form>
      <h3>Message!!</h3>
      <input onChange={(e) => {
        setMessage(e.target.value)
      }}></input>
      <button onClick={e => sendMessage(e)}>
        Send Message
      </button>
    </form>
  )
}
export default MessageForm
