import React from 'react';
import './defis.css';
import defiPng from '../../assets/titles/D-fi-Quotidien-09-03-2024.png';
import pokemyst from '../../assets/titles/Pok-mon-Myst-re-09-03-2024.png';
import silhouette from '../../assets/titles/Silhouette-09-03-2024.png';
import cap from '../../assets/titles/Capacit-09-03-2024.png';
import type from '../../assets/titles/Type-09-03-2024.png';
import desc from '../../assets/titles/-Description-09-03-2024.png';
import bgImage from '../../assets/images/Allgenv2.png';

function Accueil_Défis() {
  return (
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="defis.css" />
        <title>Profil</title>
      </head>
      <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
        <img src={defiPng} alt="Défi" id="defiPng" />
        <br />
        <div className="background-image-container"></div>
        <div id="pokemyst">
          <a href="/lien_pokemyst">
            <img src={pokemyst} alt="Pokémon Mystère" />
          </a>
        </div>
        <div id="silhouette">
          <a href="/lien_silhouette">
            <img src={silhouette} alt="Silhouette" />
          </a>
        </div>
        <div id="cap">
          <a href="/lien_cap">
            <img src={cap} alt="Capacité" />
          </a>
        </div>
        <div id="type">
          <a href="/lien_type">
            <img src={type} alt="Type" />
          </a>
        </div>
        <div id="desc">
          <a href="/lien_desc">
            <img src={desc} alt="Description" />
          </a>
          <br /><br /><br /><br /><br /><br /><br />
        </div>
        <div id="monDiv">
          <p>Les défis quotidiens se renouvellent tout les jours à 00h00 UTC+1</p>
        </div>
      </body>
    </html>
  );
}

export default Accueil_Défis;
