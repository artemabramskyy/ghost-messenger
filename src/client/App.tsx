import React from 'react'
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

// make a form that will save a user`s login and save it to the
// local storage, without name it is not possible to send a message
// after saving a name generate an id of a user

const App = () => {
  return (
    <div className="app" css={styles}>
      <div className="chatCreation">
        <ChatCreationForm/>
      </div>
      <div className="messageBox">
        <MessageBox/>
      </div>
    </div>
  )
}
export default App
