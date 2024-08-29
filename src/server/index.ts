import express from 'express';
import path from 'path';
import http from 'http';
import WebSocket, {WebSocketServer} from 'ws';

import {chatRoute} from './routes';
import {chatsMiddleware} from './middlewares';
import {initOnActions} from './ws';
import {ChatMap} from "root/src/interfaces/Chat";
import {ClientMap} from "root/src/interfaces/Client";

const PORT = 4000;
const BODY_PARSER_LIMIT = '2mb';
const API_BASE_PATH = '/api';
const API_VERSION = 'v1';
const BASE_URL = `${API_BASE_PATH}/${API_VERSION}`;
const STATIC_PATH = path.join(__dirname, '../../dist/client');
const CHATS_INSTANCES: ChatMap = new Map();
const CLIENTS: ClientMap = new Map();

const app = express();

app.use(express.static(STATIC_PATH));
app.use(express.json({limit: BODY_PARSER_LIMIT}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(chatsMiddleware(CHATS_INSTANCES, CLIENTS));

app.use(`${BASE_URL}/chat`, chatRoute);

app.get('*', (req, res) => {
  res.sendFile(`${STATIC_PATH}/index.html`);
});

const server = http.createServer(app);

export const wss = new WebSocketServer({server});

wss.on('connection', (ws: WebSocket) => {
  initOnActions(CLIENTS, ws, CHATS_INSTANCES);
});

server.listen(PORT, () => {
  console.log(`🤖: Ghost Messenger server listening on port: ${PORT}`);
});
