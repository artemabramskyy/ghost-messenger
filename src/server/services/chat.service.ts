import type {Response} from 'express';
import {generateChatId} from '../utils';
import {ChatMap, Chat} from "root/src/interfaces/Chat";
import {findClient} from "root/src/server/services/client.service";

export const createChat = (chat: Omit<Chat, 'id'>, res: Response) => {
  try {
    const {sender, receiver} = chat;
    const CLIENTS = res.locals.CLIENTS;
    const receiverClient = findClient(receiver.id, CLIENTS);
    const senderClient = findClient(sender.id, CLIENTS);

    if (receiverClient === undefined || senderClient === undefined) {
      return {message: 'Receiver is not authorized yet'};
    }

    const id = generateChatId({sender, receiver});
    const CHATS_INSTANCES: ChatMap = res.locals.CHATS_INSTANCES;
    const duplicatedChat = findChat(id, CHATS_INSTANCES);

    if (!duplicatedChat) {
      const chat: Chat = {id, sender, receiver};
      CHATS_INSTANCES.set(id, chat);
      res.locals.CHATS_INSTANCES = CHATS_INSTANCES;

      res.json(
        {
          receiverPublicKey: receiverClient.publicKey
        }
      );

      return {message: 'Created new chat'};
    }

    return {message: 'There is already a such chat'};
  } catch (err) {
    throw err;
  }
};

export const findChat = (id: string, CHATS_INSTANCES: ChatMap) => {
  try {
    const foundChat = CHATS_INSTANCES.get(id);

    return foundChat;
  } catch (err) {
    throw err;
  }
};
