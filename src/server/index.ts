import express from 'express';
import path from 'path';

import { messageRoute, chatRoute } from './routes';
import { chatsMiddleware } from './middlewares';
import { Chat } from './interfaces';

const PORT = 4000;
const BODY_PARSER_LIMIT = '2mb';
const API_BASE_PATH = '/api';
const API_VERSION = 'v1';
const BASE_URL = `${API_BASE_PATH}/${API_VERSION}`;
const STATIC_PATH = path.join(__dirname, '../../dist/client');
const CHATS_INSTANCES: Chat[] = [];

const app = express();

app.use(express.static(STATIC_PATH));
app.use(express.json({ limit: BODY_PARSER_LIMIT }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(chatsMiddleware(CHATS_INSTANCES));

app.use(`${BASE_URL}/message`, messageRoute);
app.use(`${BASE_URL}/chat`, chatRoute);

app.get('*', (req, res) => {
  res.sendFile(`${STATIC_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.log(`🤖: Ghost Messenger server listening on port: ${PORT}`);
});
