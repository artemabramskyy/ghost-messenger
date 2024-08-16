import React, {useState} from 'react'

const MessageForm = () => {
  const URL = '/api/v1/message/send-message'
  const [message, setMessage] = useState('');

  const sendMessage = async (message: string) => {
    await fetch(URL, {
      method: 'POST',
      body: message
    }).then(r => {
      console.log(r.body);
    });
  }

  return (
    <form>
      <h3>Message!!</h3>
      <input onChange={(e) => {
        setMessage(e.target.value)
      }}></input>
      <button onClick={e => sendMessage(message)}>
        Send Message
      </button>
    </form>
  )
}
export default MessageForm
