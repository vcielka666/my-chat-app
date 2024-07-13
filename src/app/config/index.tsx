import { Perk } from '../types';

export const USER_PERKS = [
  {
    label: 'User Perks',
    value: 'user_perks' as const,
    featured: [
      {   
          id: 1, 
          name: "Throw Ad", 
          description: "Freeze opposition and force them to watch annoying ADs and add permanent text to their profile meanwhile",
          href: "/images/throwAd.png",
          trollPoints: 10
      },
      {
          id: 2, 
          name: "Ad block", 
          description: "Hidden perk, no-one can see you own it. Blocks all Ads and throw them back to caster",
          href: "/images/adBlock.png",
          trollPoints: 10
      },
      {
          id: 3, 
          name: "Rock Paper Scissors", 
          description: "5 second match of famouse game Rock Paper Scissors, winner gets 2 troll points",
          href: "/images/rockPaperScissors.png",
          trollPoints: 1
      },
      {
          id: 4, 
          name: "Fast clicks", 
          description: "For 3 seconds mouse/touch clicks fight, the highest score wins 2 troll points",
          href: "/images/fastClicks.png",
          trollPoints: 1
      },
      {
          id: 5, 
          name: "Clean yourself", 
          description: "Delete toxic perma texts from your profile",
          href: "/images/cleanYourself.png",
          trollPoints: 10
      }
    ],
  }
];
