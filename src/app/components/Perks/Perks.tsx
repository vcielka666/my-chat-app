import React from 'react';
import { USER_PERKS } from '../../config';
import { Perk, UserPerksProps } from '../../types';
import styles from './Perks.module.css';

interface PerksProps extends UserPerksProps {
  onStartFastClickMatch: () => void;
}

const Perks: React.FC<PerksProps> = ({ userPerks, onStartFastClickMatch }) => {
  const handlePerkClick = (perk: Perk) => {
    if (perk.name === 'Fast clicks') {
      onStartFastClickMatch();
    }
    // Handle other perks similarly
  };

  return (
    <div className={styles.Perks}>
      <p style={{ textAlign: 'center' }}>Your troll perks</p>
      {USER_PERKS[0].featured.map((perk: Perk) => (
        <div key={perk.id} className={styles.perk} onClick={() => handlePerkClick(perk)}>
          <img src={perk.href} alt={perk.name} />
          <div className={styles.perkDetails}>
            <p style={{ display: "none" }}>{perk.name}</p>
            <p style={{ display: "none" }}>{perk.description}</p>
            <p>Owned: {userPerks[perk.id] || 0}</p> {/* Display the number of perks owned */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Perks;
