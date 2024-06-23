"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useChatContext } from '../store';
import { socket, connectSocket, sendMessage, onMessage, onUserConnected, onUserDisconnected, onSetUsers, onTyping } from '../services/socket';
import MessageList from './MessageList';
import UserList from './UserList';

const Chat: React.FC = () => {
  const { state, dispatch } = useChatContext();
  const [message, setMessage] = useState('');
  const usernameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!usernameRef.current) {
      let username = prompt('What is your username?') || 'Anonymous';
      while (!username || username.trim() === "") {
        username = prompt('What is your username? (Username cannot be empty)') || 'Anonymous';
      }
      usernameRef.current = username;
      console.log('Username:', usernameRef.current);
      connectSocket(usernameRef.current);
    }

    onMessage((msg) => {
      console.log('New message received:', msg);
      dispatch({ type: 'ADD_MESSAGE', payload: msg });
    });

    onUserConnected((username) => {
      console.log('User connected:', username);
      dispatch({ type: 'ADD_USER', payload: username });
    });

    onUserDisconnected((username) => {
      console.log('User disconnected:', username);
      dispatch({ type: 'REMOVE_USER', payload: username });
    });

    onSetUsers((users) => {
      console.log('Setting users:', users);
      dispatch({ type: 'SET_USERS', payload: users });
    });

    onTyping(({ user, text }) => {
      dispatch({ type: 'SET_TYPING', payload: { user, text } });
    });

    // Clean up on unmount
    return () => {
      socket.off('new message');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('set users');
      socket.off('typing');
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessage(text);
    socket.emit('typing', { user: usernameRef.current, text });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', message);
    sendMessage(message);
    setMessage('');
    socket.emit('typing', { user: usernameRef.current, text: '' }); // Clear typing status
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h6>Messages</h6>
          <MessageList messages={state.messages} />
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={message}
                onChange={handleInputChange}
              />
              <button className="btn btn-primary" type="submit">Send</button>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <h6>Users</h6>
          <UserList users={state.users} typingUsers={state.typingUsers} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
