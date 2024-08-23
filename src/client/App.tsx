import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import ChatCreationForm from "root/src/client/Components/ChatCreationForm";
import MessageBox from "root/src/client/Components/MessageUI/MessageBox";

const styles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  h3 {
    background: red;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
  }

  .messageBox, .chatCreation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`

// TODO: add a possibility for sending messages from one account to another

const App = () => {
  const [isMessageFormVisible, setIsMessageFormVisible] = useState<boolean>(false);
  const areSenderAndReceiverNotNull = () => {
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    const sender = JSON.parse(localStorage.getItem('sender')!);
    setIsMessageFormVisible(sender !== null && receiver !== null);
  }

  useEffect(() => {
    areSenderAndReceiverNotNull();
  }, [])

  return (
    <div className="app" css={styles}>
      <div className="chatCreation">
        <ChatCreationForm
          setIsMessageFormVisible={setIsMessageFormVisible}/>
      </div>
      {isMessageFormVisible ?
        <div className="messageBox">
          <MessageBox/>
        </div> : null
      }
    </div>
  )
}
export default App
