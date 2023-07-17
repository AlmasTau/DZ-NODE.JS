const socket = io();

socket.on('connections', (connections) => {
  const connectionList = document.getElementById('connection-list');
  connectionList.innerHTML = '';
  connections.forEach((connection) => {
    const li = document.createElement('li');
    li.textContent = connection;
    connectionList.appendChild(li);
  });
});

socket.on('private-message', (message) => {
  const messageList = document.getElementById('message-list');
  const li = document.createElement('li');
  li.textContent = message;
  messageList.appendChild(li);
});

document.getElementById('send-button').addEventListener('click', () => {
  const targetId = document.getElementById('target-id').value;
  const message = document.getElementById('message-input').value;
  socket.emit('send-private-message', { id: targetId, message });
});