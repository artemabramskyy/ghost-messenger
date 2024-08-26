import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import ChatCreationForm from "root/src/client/Components/Auth/ChatCreationForm";
import MessageBox from "root/src/client/Components/MessageUI/MessageBox";
import AuthForm from "root/src/client/Components/Auth/AuthForm";

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

  .messageBox, .chatCreation, .authForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`

// TODO: add a possibility for sending messages from one account to another

const App = () => {
  const [isUserInLocalStorage, setIsUserInLocalStorage] = useState<boolean>(false);
  const [isChatInLocalStorage, setIsChatInLocalStorage] = useState<boolean>(false);
  const isLocalStorageConsistent = () => {
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    const sender = JSON.parse(localStorage.getItem('sender')!);
    const chat = JSON.parse(localStorage.getItem('chat')!);
    setIsUserInLocalStorage(sender !== null);
    setIsChatInLocalStorage(sender !== null && receiver !== null && chat !== null);
  }

  useEffect(() => {
    isLocalStorageConsistent();
  }, [])

  return (
    <div className="app" css={styles}>
      {isUserInLocalStorage
        ? (
          <>
            {isChatInLocalStorage ?
              <div className="messageBox">
                <MessageBox/>
              </div> :
              <div className="chatCreation">
                <ChatCreationForm
                  setIsMessageFormVisible={setIsChatInLocalStorage}/>
              </div>
            }
          </>)
        :
        <div className="authForm">
          <AuthForm setIsUserInLocalStorage={setIsUserInLocalStorage}/>
        </div>
      }
      <button onClick={e => localStorage.clear()}>
        Clear LocalStorage
      </button>
    </div>
  )
}
export default App
