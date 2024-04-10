import React from 'react';
import './style.css';

function Profil() {

  const handleLinkClick = (e) => {
    if (!e.target.closest('img')) {
      e.preventDefault(); 
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <title>Profil</title>
      </head>
      <body style={{ backgroundImage: `url(${require('../assets/images/Allgenv2.png')})`, backgroundSize: '100% 100%', height: '100vh' }} onClick={handleLinkClick}>
        <img src={require('../assets/titles/Profil-24-02-2024.png')} alt="Profil" id="profilPng" />
        <div id="info">
          <a href="/Informations">
            <img src={require('../assets/titles/Informations-24-02-2024.png')} alt="Informations" onClick={handleImageClick} />
          </a>
        </div>
        <div id="stat">
          <a href="/Statistiques">
            <img src={require('../assets/titles/Statistiques-24-02-2024.png')} alt="Statistiques" onClick={handleImageClick} />
          </a>
        </div>
        <div id="palmares">
          <a href="/Palmares">
            <img src={require('../assets/titles/Palmares-24-02-2024.png')} alt="Palmares" onClick={handleImageClick} />
          </a>
        </div>
        <div id="perso">
          <a href="/Personnalisation">
            <img src={require('../assets/titles/Personnalisation-24-02-2024.png')} alt="Personnalisation" onClick={handleImageClick} />
          </a>
        </div>
      </body>
    </html>
  );
}

export default Profil;
