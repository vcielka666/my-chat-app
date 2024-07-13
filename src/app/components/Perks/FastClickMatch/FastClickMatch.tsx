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
  const [preGameTimer, setPreGameTimer] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [preGameStarted, setPreGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalYourClicks, setFinalYourClicks] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    socket.on('click', (data: { id: string, clicks: number }) => {
      if (data.id !== socket.id) {
        setTheirClicks(data.clicks);
      }
    });

    socket.on('start', () => {
      setPreGameStarted(true);
      setGameEnded(false);
      setPreGameTimer(3);
      setTimer(5);
      setYourClicks(0);
      setTheirClicks(0);
      startPreGameTimer();
    });

    return () => {
      socket.off('click');
      socket.off('start');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startPreGameTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setPreGameTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setPreGameStarted(false);
          setGameStarted(true);
          startTimer();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setGameStarted(false);
          setGameEnded(true);
          setFinalYourClicks(yourClicks); // Set final score
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
    }
  };

  const startGame = () => {
    if (!gameStarted && !preGameStarted && !gameEnded) {
      socket.emit('start');
    }
  };

  return (
    <div className={styles.wrapper_FastClickMatch}>
      {preGameStarted && (
        <div className={styles.preGameTimer}>
          GET READY IN... {preGameTimer}
        </div>
      )}
      {gameStarted && (
        <>
          <div className={styles.timer}>Time: {timer}s</div>
        </>
      )}
      <div style={{ position: 'relative' }} onClick={startGame}>
        <img
          className="theme_IMG"
          src="/images/troll_BG.png"
          alt="beefroom_theme_img"
          onClick={incrementYourClicks}
        />
        {gameStarted && (
          <p
            className={styles.clickCount}
            style={{
              position: 'absolute',
              top: '41%',
              left: '50%',
              transform: 'translateX(-44%) translateY(-50%)',
              fontSize: '2.8rem',
              fontWeight: "bold"
            }}
            onClick={incrementYourClicks}
          >
            {yourClicks}
          </p>
        )}
      </div>
      {(gameStarted || gameEnded) && (
        <>
          <div className="absolute left-0 m-0 mx-3 text-base">
            <p>Your Score</p>
            <p className="text-2xl text-green-500 text-center">
              {gameEnded ? yourClicks : yourClicks}
            </p>
          </div>
          <div className="absolute right-0 m-0 mx-3 text-base">
            <p>Their Score</p>
            <p className="text-2xl text-red-500 text-center">{theirClicks}</p>
          </div>
        </>
      )}
      {!gameStarted && !preGameStarted && !gameEnded && (
        <h6>BEEFROOM #123</h6>
      )}
      {gameEnded && (
        <h6>BEEFROOM #123</h6>
      )}
    </div>
  );
};

export default FastClickMatch;
