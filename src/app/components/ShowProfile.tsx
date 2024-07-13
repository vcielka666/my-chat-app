import { useState } from "react";

const ShowProfile = () => {

    const [showProfile, setShowProfile] = useState<boolean>(true);

    const ShowAndHide = (event:React.MouseEvent<HTMLDivElement>) => {
        setShowProfile(!showProfile);
    }
    return(<div onClick={ShowAndHide}>
     {showProfile? "PROFILE DETAILS" : ""}
     
     </div>)
}

export default ShowProfile