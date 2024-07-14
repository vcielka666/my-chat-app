import { Perk } from '../types';

export const USER_PERKS = [
  {
    label: 'User Perks',
    value: 'user_perks' as const,
    featured: [
      {   
          id: 1, 
          name: "Throw Ad", 
          description: "The targeted user must watch a brief advertisement, during which the other user can permanently write something disparaging in their profile to make them look like losers.",
          href: "/images/throwAd.png",
          trollPoints: 10
      },
      {
          id: 2, 
          name: "Ad Block", 
          description: "A hidden perk that blocks all ads and redirects them back to the caster. No one can see that you own this perk.",
          href: "/images/adBlock.png",
          trollPoints: 10
      },
      {
          id: 3, 
          name: "Rock Paper Scissors", 
          description: "A 5-second match of the classic game Rock Paper Scissors. The winner earns 2 troll points.",
          href: "/images/rockPaperScissor.png",
          trollPoints: 1
      },
      {
          id: 4, 
          name: "Fast Clicks", 
          description: "A 5-second mouse/touch clicking competition. The user with the highest score wins 5 troll points.",
          href: "/images/fastClicks.png",
          trollPoints: 1
      },
      {
          id: 5, 
          name: "Clean Yourself", 
          description: "Allows users to remove toxic permanent texts from their profile.",
          href: "/images/cleanYourself.png",
          trollPoints: 10
      },
      {
          id: 6, 
          name: "Steal Troll Points", 
          description: "Randomly steals troll points from connected users, including team members. Use with caution!",
          href: "/images/stealTrollPoints.png",
          trollPoints: 10
      }
    ],
  }
];
