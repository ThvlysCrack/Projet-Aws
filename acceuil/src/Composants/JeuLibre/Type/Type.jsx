import React from 'react';
import './Type.css';
import bgImage from '../../assets/images/wp2552241.jpg';
import Type from '../../assets/titles/Type-09-03-2024.png'

function Types(){
    const handleLinkClick = (e) => {
        if (!e.target.closest('img')) {
          e.preventDefault(); 
        }
      };
    
      const handleImageClick = (e) => {
        e.stopPropagation(); 
      };    

    return (
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}} onClick={handleLinkClick}>
            <div id = 'title'>
                <a href='/Type'>
                    <img src={Type} alt="Type" onClick={handleImageClick}/>
                </a>
            </div>
        </body>
    );
}

export default Types;