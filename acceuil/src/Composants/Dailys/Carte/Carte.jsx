import React from 'react';
import './Carte.css';
import bgImage from '../../assets/images/APropos.jpg';

function Carte(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Carte;