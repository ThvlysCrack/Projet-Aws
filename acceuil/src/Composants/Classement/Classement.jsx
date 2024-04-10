import React from "react";
import './Classement.css';
import bgImage from '../assets/images/espace_draco_ecto.png';

function Classement(){
    return(
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Classement;