import type { Response } from 'express';


import { generateChatId } from '../utils';
import {ChatMap, Chat} from "root/src/interfaces/Chat";

export const createChat = (chat: Omit<Chat, 'id'>, res: Response) => {
  try {
    const { sender, receiver } = chat;

    const id = generateChatId({ sender, receiver });
    const CHATS_INSTANCES: ChatMap = res.locals.CHATS_INSTANCES;
    const duplicatedChat = findChat(id, CHATS_INSTANCES);

    if (!duplicatedChat) {
      const chat : Chat = { id, sender, receiver };
      CHATS_INSTANCES.set(id, chat);
      res.locals.CHATS_INSTANCES = CHATS_INSTANCES;

      return { message: 'Created new chat' };
    }

    return { message: 'There is already a such chat' };
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
