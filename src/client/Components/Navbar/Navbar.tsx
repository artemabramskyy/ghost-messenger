import React from 'react'
import {Link} from "react-router-dom";
import {routerPaths} from "root/src/client/Router/AppRouter";
import {css} from "@emotion/react";

const styles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
`

const Navbar = () => {
  return (
    <div css={styles}>
      <Link to={routerPaths.auth}>Auth</Link>
      <Link to={routerPaths.createChat}>Create Chat</Link>
      <Link to={routerPaths.chat}>Chat</Link>
      <Link to={routerPaths.aboutUser}>About User</Link>
    </div>
  )
}
export default Navbar
