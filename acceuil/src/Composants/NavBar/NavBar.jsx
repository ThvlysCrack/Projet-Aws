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
import lines from '../assets/3lines.png';
import imageAboveList from '../assets/ZapBall.png';

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
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon', color: '#FFCC01'}}>
                <Link to="/">Accueil</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon', color: '#FFCC01'}}>
                <Link to="/Defis-quotidiens">Defi Quotidien</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon', color: '#FFCC01'}}>
                <Link to="/Jeu_Libre">Jeu Libre</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon', color: '#FFCC01'}}>
                <Link to="/Profil">Profil</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon', color: '#FFCC01'}}>
                <Link to="/Classement">Classement</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon' }}>
                <Link to="/Parametres">Paramètres</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon' }}>
                <Link to="/Connexion">Connexion/Inscription</Link>
              </div>
              <div className="navbar-list-item" style={{ fontFamily: 'Pokémon' }}>
                <Link to="/APropos">À propos</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
