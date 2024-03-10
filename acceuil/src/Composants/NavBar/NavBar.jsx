import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import lines from '../assets/3lines.png'
import logo from '../assets/PokeZapv2.png'

function Navbar() {
  return (
    <div className="navbar">
      {/* Vos logos et autres éléments de la barre de navigation */}
      <img src={lines} alt="Logo 1" />
      <img src={logo} alt="Logo 2" />
    </div>
  );
}


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
*/ 
export default Navbar;
