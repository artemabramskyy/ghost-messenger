import {Receiver, Sender, User} from "root/src/interfaces/User";
import ChatCreationData from "root/src/interfaces/ChatCreationData";
import StoredChat from "root/src/interfaces/StoredChat";
import {
  exportPrivateKey,
  exportPublicKey,
  generateKeys, importPublicKey
} from "root/src/client/Encryption";
import {EncryptedData} from "root/src/interfaces/EncryptedData";


const importAndSaveAnotherPartyKey = async (anotherPartyKey: Uint8Array) => {
  try {
    const receiver = JSON.parse(localStorage.getItem('receiver')!) as Receiver;
    receiver.publicKey = anotherPartyKey;
    localStorage.setItem('receiver', JSON.stringify(receiver));
    console.log('another party key successfully imported');
  } catch (error) {
    console.log('Error importing another party key:', error);
  }
}

export function initWS() {
  const socket = new WebSocket('ws://localhost:4000');

  socket.addEventListener('open', (event) => {
    console.log('Connected to WebSocket server');
  });

  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'chatExistenceResponse') {
      const {sender, receiver} = data;
      localStorage.setItem('sender', JSON.stringify(sender));
      localStorage.setItem('receiver', JSON.stringify(receiver));
      // TODO: pass a function that will change the visibility

    }
  });

  socket.addEventListener('close', (event) => {
    console.log('Disconnected from WebSocket server');
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
}

export async function authReq(userData: User, ws: WebSocket | null) {

  const {id, username} = userData;
  const userKeys = await generateKeys();
  const {publicKey, privateKey} = userKeys;
  const exportedPublicKey = await exportPublicKey(publicKey);
  const exportedPrivateKey = (await exportPrivateKey(privateKey))!;

  if (ws && ws.readyState === ws.OPEN) {
    ws.send(
      JSON.stringify({
        type: 'auth',
        user: {username, id, exportedPublicKey},
      })
    );

    localStorage.setItem('sender', JSON.stringify({
      ...userData,
      publicKey: exportedPublicKey,
      privateKey: exportedPrivateKey
    }));
  } else {
    console.log('AUTH: ws is not open or is null')
  }
}

export async function createChatReq(formData: ChatCreationData, URL: string) {
  try {
    const result = await fetch(`${URL}/chat/create`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({...formData})
    });

    const data = await result.json();
    const receiverPublicKey = data.receiverPublicKey
    const sender = JSON.parse(localStorage.getItem('sender')!) as Sender;
    if (sender === null) {
      console.log('while creating a chat, sender is null');
      return;
    }

    const receiver: User = formData.receiver;
    const receiverToSave: Receiver = {...receiver, publicKey: receiverPublicKey}
    const chat: StoredChat = {
      storedMessages: [],
      sender,
      receiver: receiverToSave,
    };
    localStorage.setItem('receiver', JSON.stringify(receiver));
    localStorage.setItem('chat', JSON.stringify(chat));

  } catch (e) {
    console.log(e)
  }
}

export function sendMessageReq(sender: Sender, receiver: Receiver, ws: WebSocket | null, text: EncryptedData) {

  if (receiver.publicKey === null) {
    console.log('During Encryption: Public key of the receiver is null')
    return;
  }

  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({
      type: 'chatMessageRequest',
      chat: {sender, receiver},
      message: text
    }));
  } else {
    console.log("Websocket is null or not open");
  }
}
