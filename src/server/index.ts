import express from 'express';
import path from 'path';

import { messageRoute } from './routes';

// import {} from 'middlewares';

const PORT = 4000;
const BODY_PARSER_LIMIT = '2mb';
const API_BASE_PATH = '/api';
const API_VERSION = 'v1';
const BASE_URL = `${API_BASE_PATH}/${API_VERSION}`;

const app = express();
const staticPath = path.join(__dirname, '../../dist/client');

app.use(express.static(staticPath));
app.use(express.json({ limit: BODY_PARSER_LIMIT }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(`${BASE_URL}/message`, messageRoute);

app.get('*', (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

app.listen(PORT, () => {
  console.log(`🤖: Ghost Messenger server listening on port: ${PORT}`);
});
