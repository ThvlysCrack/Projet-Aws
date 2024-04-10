import React from 'react';
import './Accueil_Jeux.css';
import bgImage from '../../assets/images/wp2552241.jpg';

function Accueil_Jeux(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Accueil_Jeux;