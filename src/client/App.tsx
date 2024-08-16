import React from 'react'
import MessageForm from "root/src/client/Component/MessageForm";
import {css} from "@emotion/react";
const styles = css`
  h3 {
    background: red;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
  }
`

const App = () => {
  return (
    <div className="app" css={styles}><MessageForm/></div>
  )
}
export default App
