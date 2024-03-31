/* import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import lines from '../assets/3lines.png'
import logo from '../assets/PokeZapv2.png'

function Navbar() {
  return (
    <div className="navbar">
      {/* Vos logos et autres éléments de la barre de navigation */
      /*<img src={lines} alt="Logo 1" />
      <img src={logo} alt="Logo 2" />
    </div>
  );
}
*/

/*
const NavBar = () => {
  return (
    <nav>
      <ul>
           <li><Link to="/Accueil">Accueil</Link></li>
           <li><Link to="/Classements">Classements</Link></li>
           <li><Link to="/Connexion">Connexion</Link></li>
           <li><Link to="/Inscription">Inscription</Link></li>
           <li><Link to="/Profil">Profil</Link></li>
           <li><Link to="/Parametres">Parametres</Link></li>
           <li><Link to="/APropos">A propos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
*/
import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import lines from '../assets/images/3lines.png';
import imageAboveList from '../assets/images/ZapBall.png';
import accueilImage from '../assets/titles/Accueil.png'; // Importez les images nécessaires pour chaque lien
import defiImage from '../assets/titles/Défi Quotidien.png';
import jeuImage from '../assets/titles/Jeu Libre.png';
import profilImage from '../assets/titles/Profil.png';
import classementImage from '../assets/titles/Classement.png';
import parametresImage from '../assets/titles/Parametres.png';
import connexionImage from '../assets/titles/INSCRIPTION.png';
import aProposImage from '../assets/titles/A propos.png';

function Navbar() {
  const [showList, setShowList] = useState(false); // État pour contrôler l'affichage de la liste

  // Fonction pour basculer l'état de l'affichage de la liste
  const toggleList = () => {
    setShowList(!showList);
  };

  // Fonction pour revenir à la navbar
  const backToNavbar = () => {
    setShowList(false); // Cacher la liste
  };

  return (
    <div>
      {/* Affichage conditionnel de la navbar normale ou de la liste */}
      {!showList ? (
        <div className="navbar">
          {/* Logo pour afficher la liste */}
          <img src={lines} alt="Logo 1" onClick={toggleList} />
          
          {/* Logo habituel */}
          <img src={imageAboveList} alt="Logo 2" />
        </div>
      ) : (
        <div className="extended-navbar">
          
          {/* Liste à afficher dans un rectangle avec des bords arrondis */}
          <div className="navbar-list-container">
            <img src={imageAboveList} alt="ZapBall" className="image-above-list" onClick={backToNavbar}/>
            <div className="navbar-list-items">
              <div className="navbar-list-item">
                <a href="/"><img src={accueilImage} alt="Accueil" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Defis-quotidiens"><img src={defiImage} alt="Défi Quotidien" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Jeu_Libre"><img src={jeuImage} alt="Jeu Libre" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Profil"><img src={profilImage} alt="Profil" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Classement"><img src={classementImage} alt="Classement" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Parametres"><img src={parametresImage} alt="Paramètres" style={{ width: 'auto', height: '20px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/Connexion"><img src={connexionImage} alt="Connexion/Inscription" style={{ width: 'auto', height: '50px' }}/></a>
              </div>
              <div className="navbar-list-item">
                <a href="/APropos"><img src={aProposImage} alt="À propos" style={{ width: 'auto', height: '22px' }}/></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;