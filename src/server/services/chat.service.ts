import type { Response } from 'express';

import type { Chat } from '../interfaces';
import { generateChatId } from '../utils';

export const createChat = (chat: Omit<Chat, 'id'>, res: Response) => {
  try {
    const { sender, receiver } = chat;

    const id = generateChatId({ sender, receiver });
    const CHATS_INSTANCES = res.locals.CHATS_INSTANCES;
    const duplicatedChat = findChat(id, CHATS_INSTANCES);

    if (!duplicatedChat) {
      CHATS_INSTANCES.push({ id, sender, receiver });
      res.locals.CHATS_INSTANCES = CHATS_INSTANCES;

      return { message: 'Created new chat' };
    }

    return { message: 'There is already a such chat' };
  } catch (err) {
    throw err;
  }
};

export const findChat = (id: string, CHATS_INSTANCES: Chat[]) => {
  try {
    const foundChat = CHATS_INSTANCES.find((chat: Chat) => chat.id === id);

    return foundChat;
  } catch (err) {
    throw err;
  }
};
