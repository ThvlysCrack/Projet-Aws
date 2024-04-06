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
      <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}}>
        <img src={defiPng} alt="Défi" id="defiPng" />
        <div className="background-image-container"></div>
        <div id="pokemyst">
          <a href="/pokedex">
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
        </div>
      </body>
    </html>
  );
}

export default Accueil_Défis;
