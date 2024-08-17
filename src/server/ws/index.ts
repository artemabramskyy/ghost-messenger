import WebSocket from 'ws';

import { Chat, ClientMap } from '../interfaces';
import { processMessage } from '../services';

export function initOnActions(
  id: string,
  CLIENTS: ClientMap,
  ws: WebSocket,
  CHATS_INSTANCES: Chat[]
) {
  ws.send('Welcome to the WebSocket server!');

  ws.on('message', ({ chat, message }: { chat: Chat; message: string }) => {
    console.log(`Received message: ${message}`);

    const { receiver } = processMessage(chat, CHATS_INSTANCES);

    const client = CLIENTS.get(receiver.id);

    if (client) {
      console.log(`Send message: ${message}`);
      client.ws.send(message);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    CLIENTS.delete(id);
  });
}
