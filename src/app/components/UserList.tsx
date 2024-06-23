"use client";

import React from 'react';
import TypingIndicator from './TypingIndicator';

interface UserListProps {
  users: string[];
  typingUsers: { [key: string]: string };
  currentUser: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, typingUsers, currentUser }) => (
  <ul id="users">
    {users.map((user, index) => (
      <li key={index}>
        {user}
        {user !== currentUser && <TypingIndicator text={typingUsers[user] || ''} />}
      </li>
    ))}
  </ul>
);

export default UserList;
