import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket } from 'net';

interface SocketServer extends HTTPServer {
  io?: IOServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: Socket & {
    server: SocketServer;
  };
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...');
    const httpServer: HTTPServer = res.socket.server;
    const io = new IOServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('username', (username) => {
        socket.data.username = username;
        socket.broadcast.emit('user connected', username);
      });

      socket.on('send message', (msg) => {
        io.emit('new message', { user: socket.data.username, text: msg, date: new Date() });
      });

      socket.on('disconnect', () => {
        io.emit('user disconnected', socket.data.username);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.io server already running...');
  }
  res.end();
};

export default ioHandler;
