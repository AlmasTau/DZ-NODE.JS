
import express from 'express';
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const connections = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  connections.push(socket.id);

  io.emit('connections', connections);

  socket.on('send-private-message', (data) => {
    const { id, message } = data;
    const targetSocket = io.sockets.connected[id];
    if (targetSocket) {
      targetSocket.emit('private-message', message);
    }
  });

  socket.on('disconnect', () => {
    const index = connections.indexOf(socket.id);
    if (index !== -1) {
      connections.splice(index, 1);
    }
    io.emit('connections', connections);
  });
});

http.listen(3000, () => {
  console.log('Server listening on *:3000');
});
