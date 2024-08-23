import User from "root/src/interfaces/User";

export interface Chat {
  sender: User;
  receiver: User;
  id: string;
}

export type ChatMap = Map<string, Chat>;
