import {createRoot} from 'react-dom/client';
import App from './App';
import {TypeGuardProvider, WSProvider} from "root/src/client/Context/Context";

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
  <TypeGuardProvider>
    <WSProvider>
      <App />
    </WSProvider>
  </TypeGuardProvider>
);
