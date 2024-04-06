// Profil.jsx

import React from 'react';
import './style.css';

function Profil() {
  return (
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <title>Profil</title>
      </head>
      <body style={{ backgroundImage: `url(${require('../assets/images/Allgenv2.png')})`, backgroundSize: 'cover' }}>
        <img src={require('../assets/titles/Profil-24-02-2024.png')} alt="Profil" id="profilPng" />
        <br /><br /><br /><br /><br /><br />
        {/* Your content goes here */}
        <div id="info">
          <img src={require('../assets/titles/Informations-24-02-2024.png')} />
          <br /><br />
        </div>
        <div id="stat">
          <img src={require('../assets/titles/Statistiques-24-02-2024.png')} />
          <br /><br />
        </div>
        <div id="palmares">
          <img src={require('../assets/titles/Palmares-24-02-2024.png')} />
          <br /><br />
        </div>
        <div id="perso">
          <img src={require('../assets/titles/Personnalisation-24-02-2024.png')} />
          <br /><br />
        </div>
      </body>
    </html>
  );
}

export default Profil;
