import React from 'react';
import './defis.css';
import bgImage from '../../assets/images/Allgenv2.png';
import defiPng from '../../assets/titles/D-fi-Quotidien-09-03-2024.png';
import pokemyst from '../../assets/titles/Pok-mon-Myst-re-09-03-2024.png';
import silhouette from '../../assets/titles/Silhouette-09-03-2024.png';
import carte from '../../assets/titles/CartePokemon.png';
import desc from '../../assets/titles/-Description-09-03-2024.png';

function Accueil_Défis() {

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
        <link rel="stylesheet" type="text/css" href="defis.css" />
        <title>Profil</title>
      </head>
      <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', height:'100vh'}} onClick={handleLinkClick}>
        <img src={defiPng} alt="Défi" id="defiPng" />

        <div id="pokemyst">
          <a href="/pokedex">
            <img src={pokemyst} alt="Pokémon Mystère" onClick={handleImageClick} />
          </a>
        </div>
        <div id="silhouette">
          <a href="/lien_silhouette">
            <img src={silhouette} alt="Silhouette" onClick={handleImageClick} />
          </a>
        </div>
        <div id="carte">
          <a href="/Carte">
            <img src={carte} alt="Carte Pokémon" onClick={handleImageClick} />
          </a>
        </div>
        <div id="desc">
          <a href="/Description">
            <img src={desc} alt="Description" onClick={handleImageClick} />
          </a>
        </div>
      </body>
    </html>
  );
}

export default Accueil_Défis;
