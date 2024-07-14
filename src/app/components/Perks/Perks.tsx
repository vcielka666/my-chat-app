import React from 'react';
import { USER_PERKS } from '../../config';
import { Perk, UserPerksProps } from '../../types';
import styles from './Perks.module.css';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";

interface PerksProps extends UserPerksProps {
  onStartFastClickMatch: () => void;
}

const Perks: React.FC<PerksProps> = ({ userPerks, onStartFastClickMatch }) => {
  const handlePerkClick = (perk: Perk) => {
    if (perk.name === 'Fast Clicks') {
      onStartFastClickMatch();
    }
    // Handle other perks similarly
  };

  return (
    <div className={styles.Perks}>
      <p style={{ textAlign: 'center', fontSize: "1rem" }}>Trolling Perks</p>
      <div className={styles.perks_Container}>
        {USER_PERKS[0].featured.map((perk: Perk) => (
          <div key={perk.id} className={styles.perk}>
            <HoverCard>
              <HoverCardTrigger>
                <img
                  className='w-8 cursor-pointer'
                  src={perk.href}
                  alt={perk.name}
                  onClick={() => handlePerkClick(perk)}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <p>{perk.name}</p>
                <p>{perk.description}</p>
                <p>Cost: {perk.trollPoints} troll-points</p>
              </HoverCardContent>
            </HoverCard>
            <div className={styles.perkDetails}>
              <p style={{ display: "none" }}>{perk.name}</p>
              <p style={{ display: "none" }}>{perk.description}</p>
              <p className='text-red-800'>{userPerks[perk.id] || "(0)"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Perks;
