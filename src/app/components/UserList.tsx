"use client";

import React from 'react';
import TypingIndicator from './TypingIndicator';

interface UserListProps {
  users: string[];
  typingUsers: { [key: string]: string };
}

const UserList: React.FC<UserListProps> = ({ users, typingUsers }) => (
  <ul id="users">
    {users.map((user, index) => (
      <li key={index}>
        {user}
        <TypingIndicator text={typingUsers[user] || ''} />
      </li>
    ))}
  </ul>
);

export default UserList;
