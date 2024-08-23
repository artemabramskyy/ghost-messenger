import {createHash} from 'crypto';
import {Chat} from "root/src/interfaces/Chat";

export function uuid(data: string) {
  const hash = createHash('sha256');

  hash.update(data);

  return hash.digest('hex');
}

export function generateChatId(chat: Omit<Chat, 'id'>): string {
  const userIds = [chat.sender.id, chat.receiver.id].sort();
  const uniqueString = `${userIds[0]}_${userIds[1]}`;

  return uuid(uniqueString);
}
