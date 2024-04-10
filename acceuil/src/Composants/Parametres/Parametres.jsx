import React from 'react';
import './Parametres.css';
import bgImage from '../assets/images/APropos.jpg';

function Parametres(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Parametres;