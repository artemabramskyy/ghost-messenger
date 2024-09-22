import WebSocket from "ws";

export interface Client {
  id: string;
  publicKey: Uint8Array;
  ws: WebSocket;
}

export type ClientMap = Map<string, Client>;
