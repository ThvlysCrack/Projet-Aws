import React from 'react';
import './Personnalisation.css';
import bgImage from '../../assets/images/APropos.jpg';

function Personnalisation(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        </body>
    );
}

export default Personnalisation;