import styles from "./About.module.css"
const About = () => {

    return(
        <div className={styles.body}>
          <h1 style={{textAlign:"center", fontSize:"2rem"}}>TOXIK</h1>  


<br></br>
<p style={{textAlign:"center"}}>TOXIK is a fun app focused on channeling toxic energy. The purpose of this application is to provide an outlet for frustrated emotions, toxic vibes, and hatefulness. All participants consensually agree to the rules and the toxic environment of the platform. We believe that suppressed human toxic energies are unprocessed emotions and thoughts from negative experiences and struggles in life. This app is a safe space and is intentionally non-politically correct. Users can express any kind of hateful or negative comments on anyone and anything without fear of persecution. The main goal of this application is to serve as a channel to express the negative manifestations of one's life in a safe space, where everyone accepts this approach without negativity and sadness—this is one of the core rules of the TOXIK platform.

This app is not intended to create or build hateful groups or individuals who comment on other social platforms.</p>
<br></br>

<h2>Features:</h2>
<br></br>
<h3>User Interaction:</h3>

Users can either create an account or quickly connect.
They can filter or search for specific hateful tags that lead them to chat rooms, known as BEEFROOMS.
Connected users can write messages of any kind or simply observe other users chatting and hating each other.
Observers can rate commenting users and win troll perks or troll points.
<h3>Account and Points System:</h3>

Every created account (not quick connected) owns Troll Perks and Troll Points.
Each chat room has a timer set to 3 minutes per round. During this time, connected users try to hate and trigger each other, with a 5-second cooldown for each sent message.
Sent messages can be rated, and the highest-rated message earns troll points, which serve as XP points to level up and improve your perks.
Troll points are also used to cast perks at user targets.
<h3 style={{fontSize:"1.3rem"}}>Perks:</h3>

<p><strong>Throw Ad:</strong> The targeted user has to watch a quick advertisement, during which the other user can write anything disgusting permanently into their profile to make them look like losers.</p>
<p><strong>Ad Block:</strong> A hidden perk (no one can see who has it) that blocks Throw Ad and redirects the advertisement to the user who first threw the ad.</p>
<p><strong>FastTouch/Click:</strong> A 5-second clicking competition where the user with the highest score wins 2 troll XP points.</p>
<p><strong>Rock Paper Scissors:</strong> A 5-second match of the famous game Rock Paper Scissors, where the winner gets 2 troll points.</p>
<p><strong>Clean Yourself:</strong> Allows users to delete toxic permanent texts from their profile at the cost of 25 troll points.</p>
<h3>Beefrooms and Teams:</h3>

Users can create beefrooms and form teams, with a maximum of 3v3.
Beefrooms have hateful tags for filtering and searching.
Teams are created by team tags.
Users can join random beefrooms or filter them by tags.
When creating an account, users set their primary language, which is used to filter beefrooms for them.
        </div>
    )

}

export default About