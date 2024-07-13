"use client";

import React from 'react';
import TypingIndicator from './TypingIndicator';
import ShowProfile from './ShowProfile';
import styles from "./UserList.module.css"

interface UserListProps {
  users: string[];
  typingUsers: { [key: string]: string };
  currentUser: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, typingUsers, currentUser }) => {
    const filteredUsers = users.filter(user => user !== currentUser);
  return (
    <ol id="users" className={styles.users}>
      {filteredUsers.map((user, index) => (
        <li className={styles.users_li} key={index}>
          <ShowProfile />
          {user}
          {<TypingIndicator text={typingUsers[user] || ''} />}
        </li>
      ))}
    </ol>
  );
};

export default UserList;
