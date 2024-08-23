import {createRoot} from 'react-dom/client';
import App from './App';
import {WSProvider} from "root/src/client/Context/Context";

const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
    <WSProvider>
            <App/>
    </WSProvider>
);
