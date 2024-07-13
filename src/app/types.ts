export interface Perk {
    id: number;
    name: string;
    description: string;
    href: string;
    trollPoints: number;
  }
  
  export interface UserPerksProps {
    userPerks: Record<number, number>;
  }
  
  export interface TrollXpBoxProps {
    xp: number;
    trollPoints: number;
    nextLevelXp: number;
  }
  