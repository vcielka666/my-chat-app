const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    path: '/api/socket',
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('username', (username) => {
      console.log('Username set:', username);
      socket.data.username = username;
      connectedUsers.set(socket.id, username);

      // Send the list of currently connected users to the newly connected user
      socket.emit('set users', Array.from(connectedUsers.values()));

      // Notify other users about the new user
      socket.broadcast.emit('user connected', username);
    });

    socket.on('send message', (msg) => {
      console.log('Message received:', msg);
      io.emit('new message', { user: socket.data.username, text: msg, date: new Date() });
    });

    socket.on('typing', ({ user, text }) => {
      socket.broadcast.emit('typing', { user, text });
    });

    // Handle the 'start' event for the Fast Click Match game
    socket.on('start', () => {
      io.emit('start');
    });

    // Handle the 'click' event for the Fast Click Match game
    socket.on('click', (data) => {
      io.emit('click', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.data.username || 'Unknown');
      connectedUsers.delete(socket.id);
      io.emit('user disconnected', socket.data.username);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
