import React from 'react'
import {css} from "@emotion/react";

const styles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`

const Footer = () => {
  return (
    <footer css={styles}>
      Footer
    </footer>
  )
}
export default Footer
