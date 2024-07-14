// Chat.js

import React, { useEffect, useState, useRef } from 'react';
import { useChatContext } from './../../store';
import { socket, connectSocket, sendMessage, onMessage, onUserConnected, onUserDisconnected, onSetUsers, onTyping } from '../../services/socket';
import MessageList from '../MessageList';
import UserList from '../UserList';
import Perks from '../Perks/Perks';
import TrollXpBox from '../TrollXpBox';
import FastClickMatch from '../Perks/FastClickMatch/FastClickMatch';
import styles from "./Chat.module.css";
import { Button } from '@/app/components/ui/button';

const Chat: React.FC = () => {
  const { state, dispatch } = useChatContext();
  const [message, setMessage] = useState('');
  const usernameRef = useRef<string | null>(null);
  const teamTagRef = useRef<string | null>(null);
  const [userPerks, setUserPerks] = useState<Record<number, number>>({});
  const [xp, setXp] = useState(999);
  const [trollPoints, setTrollPoints] = useState(50);
  const [nextLevelXp, setNextLevelXp] = useState(1250);
  const [startFastClickMatch, setStartFastClickMatch] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state for game started status

  useEffect(() => {
    if (!usernameRef.current) {
      let username = prompt('What is your username?') || 'Anonymous';
      let teamTag = prompt('Optionally set your team-tag');
      while (!username || username.trim() === "") {
        username = prompt('What is your username? (Username cannot be empty)') || 'Anonymous';
      }
      usernameRef.current = username;
      teamTagRef.current = teamTag;
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

    // Simulate fetching data from the database
    setTimeout(() => {
      const fetchedPerks = {
        1: 10,
        2: 10,
        3: 10,
        4: 10,
        5: 10,
        6: 10
      };
      setUserPerks(fetchedPerks);
    }, 1000); // Simulate a network delay

    // Clean up on unmount
    return () => {
      socket.off('new message');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('set users');
      socket.off('typing');
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handlePressEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleStartFastClickMatch = () => {
    setStartFastClickMatch(true);
    setGameStarted(true); // Set gameStarted to true immediately
    socket.emit('start');
  };

  const handleGameStart = (started: boolean) => {
    setGameStarted(started);
  };

  return (
    <div className="container">
      <div className={styles.sub_container}>
        <div className={styles.Input_Field}>
          <h5>Input field</h5>
          <div className={styles.info}>
            <p>Account:<span style={{ color: "#2e5230", fontWeight: "normal" }}>{usernameRef.current}</span> </p>
            <p>Team:<span style={{ color: "#2e5230", fontWeight: "normal" }}>{teamTagRef.current}</span></p>
            <p>Level:<span style={{ color: "#2e5230", fontWeight: "normal" }}>80</span></p>
          </div>
          <form onSubmit={handleSubmit}>
           {!gameStarted && <div className="input-group">
              <textarea
                onKeyDown={handlePressEnter}
                className={styles.textarea}
                value={message}
                onChange={handleInputChange}
                placeholder='your troll-craft . . .'
              />
              <Button variant="ghost" type="submit">Send</Button>
            </div>
            }
          </form>
          <div className={styles.Perks_Wrapper}>
            <Perks userPerks={userPerks} onStartFastClickMatch={handleStartFastClickMatch} />
            <TrollXpBox xp={xp} trollPoints={trollPoints} nextLevelXp={nextLevelXp} />
          </div>
        </div>

        <div style={{ position: "relative" }} className={styles.Beefroom_Field}>
          <FastClickMatch onGameStart={handleGameStart} />
          {!gameStarted && <MessageList messages={state.messages} />} {/* Conditionally render MessageList */}
        </div>
        <div className={styles.Users_Field}>
          <h5>Your targets</h5>
          <UserList users={state.users} typingUsers={state.typingUsers} currentUser={usernameRef.current} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
