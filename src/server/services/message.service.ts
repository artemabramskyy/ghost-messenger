import {generateChatId} from '../utils';
import {findChat} from './chat.service';
import {ChatMap, Chat} from "root/src/interfaces/Chat";

export const processMessage = (chat: Chat, CHATS_INSTANCES: ChatMap) => {
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
