import React from 'react'
import Navbar from "root/src/client/Components/Navbar/Navbar";
import Footer from "root/src/client/Components/Footer/Footer";
import {Outlet} from "react-router-dom";
import {css} from "@emotion/react";

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

const Layout = () => {
  return (
    <div css={styles}>
      <header>
        <Navbar/>
      </header>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
export default Layout
