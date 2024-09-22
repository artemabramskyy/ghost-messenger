export interface User {
  username: string;
  id: string;
}

export interface Receiver extends User{
  publicKey: Uint8Array;
}

export interface Sender extends Receiver {
  privateKey: Uint8Array;
}
