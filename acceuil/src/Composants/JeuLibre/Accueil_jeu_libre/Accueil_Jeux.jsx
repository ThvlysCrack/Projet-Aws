import React from 'react';
import './Accueil_Jeux.css';
import bgImage from '../../assets/images/wp2552241.jpg';
import Type from '../../assets/titles/Type-09-03-2024.png';

function Accueil_Jeux() {
    const handleLinkClick = (e) => {
        if (!e.target.closest('img')) {
            e.preventDefault();
        }
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='background' style={{ backgroundImage: `url(${bgImage})` }} onClick={handleLinkClick}>
            <div className='cont'>
                <div className='titre'>
                    <a href='/Type'>
                        <img src={Type} alt="Type" onClick={handleImageClick} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Accueil_Jeux;
