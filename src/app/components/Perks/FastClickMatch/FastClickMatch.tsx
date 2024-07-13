import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './FastClickMatch.module.css';

const socket = io('http://localhost:3000', {
  path: '/api/socket'
});

const FastClickMatch: React.FC = () => {
  const [yourClicks, setYourClicks] = useState(0);
  const [theirClicks, setTheirClicks] = useState(0);
  const [timer, setTimer] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socket.on('click', (data: { id: string, clicks: number }) => {
      if (data.id !== socket.id) {
        setTheirClicks(data.clicks);
      }
    });

    socket.on('start', () => {
      setGameStarted(true);
      setTimer(5);
      setYourClicks(0);
      setTheirClicks(0);
      startTimer();
    });

    return () => {
      socket.off('click');
      socket.off('start');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setGameStarted(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const incrementYourClicks = () => {
    if (gameStarted) {
      const newClickCount = yourClicks + 1;
      setYourClicks(newClickCount);
      socket.emit('click', { id: socket.id, clicks: newClickCount });
    } else {
      // Start the game when the image is clicked for the first time
      startGame();
    }
  };

  const startGame = () => {
    socket.emit('start');
  };

  return (
    <div className={styles.wrapper_FastClickMatch}>
      {gameStarted && (
        <>
          <div className={styles.timer}>Time: {timer}s</div>
        </>
      )}
      <div style={{ position: 'relative' }}>
        <img
          onClick={incrementYourClicks}
          className="theme_IMG"
          src="/images/troll_BG.png"
          alt="beefroom_theme_img"
        />
        <p
          onClick={incrementYourClicks}
          style={{
            position: 'absolute',
            top: '41%',
            left: '50%',
            transform: 'translateX(-44%) translateY(-50%)',
            fontSize: '2.8rem',
          }}
        >
          {yourClicks}
        </p>
      </div>
      <div>
        <p>Their Clicks: {theirClicks}</p>
      </div>
      <h6>BEEFROOM #123</h6>
    </div>
  );
};

export default FastClickMatch;
