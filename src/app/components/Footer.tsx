import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/app/components/ui/hover-card"
  import Link from "next/link"
const Footer = () => {
    return(
        <>
          <footer>
            
          <HoverCard>
  <HoverCardTrigger><strong style={{cursor:"pointer"}}>ArtWithUtility</strong> Copyright 2024</HoverCardTrigger>
  <HoverCardContent>
    For more funky projects, visit our web <Link target="_blank" href="wwww.seekers-game.com">here</Link>
  </HoverCardContent>
</HoverCard>
</footer>

        </>
    )
}

export default Footer