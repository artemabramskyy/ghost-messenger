import WebSocket from 'ws';

import { Chat, ClientMap } from '../interfaces';
import { processMessage } from '../services';

export function initOnActions(
  CLIENTS: ClientMap,
  ws: WebSocket,
  CHATS_INSTANCES: Chat[]
) {
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message: any) => {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message);

    if (data.type === 'auth') {
      const { id } = data.user;

      CLIENTS.set(id, { id, ws });
      console.log('Add client!', data.user);

      ws.on('close', () => {
        console.log('Client disconnected', data.user);
        CLIENTS.delete(id);
      });
    } else {
      console.log('***', data);
      const { receiver } = processMessage(data.chat, CHATS_INSTANCES);

      const client = CLIENTS.get(receiver.id);

      if (client) {
        console.log(`Send message: ${data.message}`);
        client.ws.send(data.message);
      }
    }
  });
}
