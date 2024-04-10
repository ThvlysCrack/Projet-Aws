import React from 'react';
import './Endev.css';
import bgImage from '../assets/images/jaimebien.png';

function EnDev(){
    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
            <div className="development-overlay">
                <div className="development-message">
                    Nous sommes désolés, cette section du site est actuellement en cours de développement et n'est pas encore accessible au public. <br /> <br />
                    Notre équipe travaille activement pour achever cette fonctionnalité dans les meilleurs délais. <br /> <br />
                    Nous vous remercions de votre patience et nous excusons pour tout inconvénient que cela pourrait causer.
                </div>
            </div>
        </body>
    );
}

export default EnDev;
