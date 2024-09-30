import React, {useEffect, useState} from 'react'
import {css, Global} from "@emotion/react";
import {
  useTypeGuardContext,
  useWSContext
} from "root/src/client/Context/Context";
import {authReq, createChatReq} from "root/src/client/Api";
import {Receiver, Sender} from "root/src/interfaces/User";
import StoredChat from "root/src/interfaces/StoredChat";
import AppRouter from "root/src/client/Router/AppRouter";

const styles = css`
  h3 {
    background: red;
  }

  .messageBox, .chatCreation, .authForm, form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  form {
    width: 30%;
  }
`

const App = () => {
  const {isUserConsistent, isChatConsistent} = useTypeGuardContext();
  const {webSocket} = useWSContext();
  const [isUserInLocalStorage, setIsUserInLocalStorage] = useState<boolean>(false);
  const [isChatInLocalStorage, setIsChatInLocalStorage] = useState<boolean>(false);

  const checkAndLoadLocalStorage = () => {
    const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    const chat = JSON.parse(localStorage.getItem('chat')!) as StoredChat;
    console.log(isUserConsistent(sender), isChatConsistent(chat));
    // Remake this logic
    setIsUserInLocalStorage(isUserConsistent(sender));
    setIsChatInLocalStorage(isUserConsistent(sender) && isUserConsistent(receiver) && isChatConsistent(chat));
  }

  useEffect(() => {
    checkAndLoadLocalStorage();
    if (isUserInLocalStorage && isChatInLocalStorage) {
      const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
      const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
      const {URL} = useWSContext();
      const {username, id} = sender;
      authReq({
        username,
        id
      }, webSocket).then(r => console.log('authReq successful')).catch(err => console.log(err));
      createChatReq({
        sender,
        receiver
      }, URL).then(r => console.log('created a chat!')).catch((e) => console.error(e));
    }
  }, []);

  return (
    <div css={styles}>
      <Global styles={css`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          box-sizing: border-box;
        }

        body, #app {
          display: flex;
          height: 100vh;
          width: 100vw;
        }

        #app {
          flex-direction: row;
          justify-content: center;
        }

        body {
          flex-direction: column;
          justify-content: center;
        }
      `}/>
      <AppRouter />
    </div>
)
}
export default App
