import { Chat } from '../interfaces';
import { generateChatId } from '../utils';
import { findChat } from './chat.service';

export const processMessage = (chat: Chat, CHATS_INSTANCES: Chat[]) => {
  try {
    const id = generateChatId(chat);
    const foundChat = findChat(id, CHATS_INSTANCES);

    if (foundChat) {
      return foundChat;
    }

    throw new Error('There is no a chat');
  } catch (err) {
    throw err;
  }
};
