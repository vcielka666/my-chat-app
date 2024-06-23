"use client"
import React from 'react';
import moment from 'moment';

interface Message {
  user: string;
  text: string;
  date: string;
}

const MessageList: React.FC<{ messages: Message[] }> = ({ messages }) => (
  <div id="messages">
    {messages.map((msg, index) => (
      <div key={index} className="row mb-2">
        <div className="col-md-3">{moment(msg.date).format('h:mm:ss a')}</div>
        <div className="col-md-3">{msg.user}</div>
        <div className="col-md-6">{msg.text}</div>
      </div>
    ))}
  </div>
);

export default MessageList;
