import React, {useEffect, useState} from 'react'
import {css} from "@emotion/react";
import ChatCreationForm from "root/src/client/Components/Auth/ChatCreationForm";
import MessageBox from "root/src/client/Components/MessageUI/MessageBox";
import AuthForm from "root/src/client/Components/Auth/AuthForm";
import {
  useTypeGuardContext,
  useWSContext
} from "root/src/client/Context/Context";
import {authReq, createChatReq} from "root/src/client/Api";
import {Receiver, Sender} from "root/src/interfaces/User";
import StoredChat from "root/src/interfaces/StoredChat";
import AppRouter from "root/src/client/Router/AppRouter";

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
  const {isUserConsistent, isChatConsistent} = useTypeGuardContext();
  const {webSocket} = useWSContext();
  const [isUserInLocalStorage, setIsUserInLocalStorage] = useState<boolean>(false);
  const [isChatInLocalStorage, setIsChatInLocalStorage] = useState<boolean>(false);

  const checkAndLoadLocalStorage = () => {
    const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    const chat = JSON.parse(localStorage.getItem('chat')!) as StoredChat;
    console.log(isUserConsistent(sender), isChatConsistent(chat))
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
    <div className="app" css={styles}>
      <AppRouter />
    </div>
)
}
export default App

// {
//   isUserInLocalStorage
//         ? (
//           <>
//             {isChatInLocalStorage ?
//               <div className="messageBox">
//                 <MessageBox/>
//               </div> :
//               <div className="chatCreation">
//                 <ChatCreationForm
//                   setIsMessageFormVisible={setIsChatInLocalStorage}/>
//               </div>
//             }
//           </>)
//         :
//         <div className="authForm">
//           <AuthForm setIsUserInLocalStorage={setIsUserInLocalStorage}/>
//         </div>
//       }
//       <button onClick={e => localStorage.clear()}>
//         Clear LocalStorage
//       </button>
