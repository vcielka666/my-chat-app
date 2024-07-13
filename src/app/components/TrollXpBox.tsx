import React from 'react';
import { TrollXpBoxProps } from '../types';
import styles from './TrollXpBox.module.css';

const TrollXpBox: React.FC<TrollXpBoxProps> = ({ xp, trollPoints, nextLevelXp }) => {
  return (
    <div className={styles.TrollingXpContainer}>
      <p>
        YOUR XP: <span className={styles.highlight}>{xp}</span> troll points
      </p>
      <p className={styles.nextLevel}>
        Next level: {nextLevelXp - xp > 0 ? nextLevelXp - xp : 0} XP remaining
      </p>
    </div>
  );
};

export default TrollXpBox;
