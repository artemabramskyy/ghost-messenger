import WebSocket from "ws";

export interface Client {
  id: string;
  ws: WebSocket;
}

export type ClientMap = Map<string, Client>;
