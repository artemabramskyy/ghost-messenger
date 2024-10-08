import WebSocket from 'ws';

import {processMessage} from '../services';
import {ClientMap} from "root/src/interfaces/Client";
import {ChatMap} from "root/src/interfaces/Chat";

export function initOnActions(
  CLIENTS: ClientMap,
  ws: WebSocket,
  CHATS_INSTANCES: ChatMap
) {
  // ws.send('Welcome to the WebSocket server!';

  ws.on('message', (message: any) => {
    console.log(`Received message: ${message}`);
    const data = JSON.parse(message);

    if (data.type === 'auth') {
      const {user} = data;
      const {id, exportedPublicKey} = user;

      CLIENTS.set(id, {
        id,
        publicKey: exportedPublicKey,
        ws
      });
      ws.on('close', () => {
        console.log('Client disconnected', user);
        CLIENTS.delete(id);
      });
    } else if (data.type === 'chatExistenceRequest') {
      const {sender, receiver} = data;
      const client = CLIENTS.get(receiver.id);
      if (client) {
        client.ws.send(JSON.stringify({
          sender,
          receiver,
          type: 'chatExistenceResponse'
        }));
      }
    } else if (data.type === 'chatMessageRequest') {
      const {message, chat} = data;
      const { receiver, sender} = chat;
      processMessage(chat, CHATS_INSTANCES);
      const receiverClient = CLIENTS.get(receiver.id);
      const senderClient = CLIENTS.get(sender.id);
      if (receiverClient && senderClient) {
        console.log(`Send message: ${message}`);
        // rn I am not checking for the type
        receiverClient.ws.send(JSON.stringify({
          encryptedData: message,
          type: 'chatMessageResponse'
        }));
      }
    }
  });
}
