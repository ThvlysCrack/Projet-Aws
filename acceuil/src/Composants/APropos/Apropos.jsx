import React from 'react';
import './APropos.css';
import bgImage from '../assets/images/APropos.jpg';

function APropos(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default APropos;