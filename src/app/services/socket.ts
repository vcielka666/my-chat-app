import { io, Socket } from 'socket.io-client';

export const socket: Socket = io({
  path: '/api/socket',
  transports: ['websocket', 'polling'],
});

export const connectSocket = (username: string) => {
  socket.emit('username', username);
};

export const sendMessage = (message: string) => {
  socket.emit('send message', message);
};

export const onMessage = (callback: (msg: any) => void) => {
  socket.on('new message', callback);
};

export const onUserConnected = (callback: (username: string) => void) => {
  socket.on('user connected', callback);
};

export const onUserDisconnected = (callback: (username: string) => void) => {
  socket.on('user disconnected', callback);
};

export const onSetUsers = (callback: (users: string[]) => void) => {
  socket.on('set users', callback);
};

export const onTyping = (callback: ({ user, text }: { user: string, text: string }) => void) => {
  socket.on('typing', callback);
};
