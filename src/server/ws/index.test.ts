import WebSocket, {WebSocketServer} from "ws";
import {wss} from "root/src/server";

describe('WS', () => {
  beforeAll((done) => {
    wss.on('listening', () => {
      done();
    });
  });

  afterAll(() => {
    wss.close();
  });

  it('should connect to WSS', () => {
    const client = new WebSocket("ws://localhost:4000");
    client.on('open', () => {
      console.log('Connection opened');
    });
  });

  it('WS should receive a message', () => {
    const client = new WebSocket("ws://localhost:4000");

    client.on('open', ()=> {
      console.log('Connection opened');
    })
    client.on('message', (event) => {
      console.log("Received some data")
    })
  });
});

