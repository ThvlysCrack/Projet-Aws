import React from 'react';
import './Informations.css';
import bgImage from '../../assets/images/APropos.jpg';

function Informations(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Informations;