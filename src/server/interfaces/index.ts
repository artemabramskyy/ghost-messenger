import WebSocket from 'ws';

export interface Chat {
  sender: User;
  receiver: User;
  id: string;
}

export interface User {
  username: string;
  id: string;
}

export interface Client {
  id: string;
  ws: WebSocket;
}

export type ClientMap = Map<string, Client>;
