import WebSocket from 'ws';

import {ChatMap, ClientMap} from '../interfaces';
import {processMessage} from '../services';
import {generateChatId} from "root/src/server/utils";

export function initOnActions(
  CLIENTS: ClientMap,
  ws: WebSocket,
  CHATS_INSTANCES: ChatMap
) {
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message: any) => {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message);

    if (data.type === 'auth') {
      const {user, chat} = data;
      const {id} = user;
      const chatId = generateChatId(chat);

      CHATS_INSTANCES.set(chatId, chat);
      CLIENTS.set(id, {id, ws});
      console.log('Add client!', user);

      ws.on('close', () => {
        console.log('Client disconnected', user);
        CLIENTS.delete(id);
      });
    } else {
      const {message, chat} = data;
      console.log('***', data, CHATS_INSTANCES);
      const {receiver} = processMessage(chat, CHATS_INSTANCES);

      const client = CLIENTS.get(receiver.id);

      if (client) {
        console.log(`Send message: ${message}`);
        client.ws.send(message);
      }
    }
  });
}
