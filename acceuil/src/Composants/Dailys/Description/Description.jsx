import React from 'react';
import './Description.css';
import bgImage from '../../assets/images/APropos.jpg';

function Description(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Description;