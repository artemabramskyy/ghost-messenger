export function initWS() {
  const socket = new WebSocket('ws://localhost:4000');

  socket.addEventListener('open', (event) => {
    // send ID and username of the user
    const sender = JSON.parse(localStorage.getItem('sender')!);
    const receiver = JSON.parse(localStorage.getItem('receiver')!);
    if (sender === null || receiver === null)  {
      console.log("Cannot authenticate user, because sender or receiver is null");
    } else {
      socket.send(
        JSON.stringify({
          type: 'auth',
          user: {username: sender.username, id: sender.id},
          chat: {sender, receiver}
        })
      );
    }
    console.log('Connected to WebSocket server');
  });

  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
  });

  socket.addEventListener('close', (event) => {
    console.log('Disconnected from WebSocket server');
  });

  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
}
