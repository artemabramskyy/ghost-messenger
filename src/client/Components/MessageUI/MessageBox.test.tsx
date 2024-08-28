import React from 'react'
import {render} from "@testing-library/react";
import MessageBox from "root/src/client/Components/MessageUI/MessageBox";
import {TypeGuardProvider, WSProvider} from "root/src/client/Context/Context";

test('checking non-valid data in LocalStorage', () => {
  localStorage.setItem('sender', JSON.stringify({username: 'test'}));
  localStorage.setItem('receiver', JSON.stringify({username: 'test'}));
  localStorage.setItem('chat', JSON.stringify({username: 'chat'}));
  render(<TypeGuardProvider> <WSProvider> <MessageBox/> </WSProvider>
  </TypeGuardProvider>);
})
