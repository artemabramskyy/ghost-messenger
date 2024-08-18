export function initWS() {
  const socket = new WebSocket('ws://localhost:4000');

  socket.addEventListener('open', (event) => {
    // send ID and username of the user
    socket.send(
      JSON.stringify({
        type: 'auth',
        user: { username: 'test', id: 'some_id' },
      })
    );
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
