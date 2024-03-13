import React from 'react'
import './styles.css'; // Importez le fichier CSS
import logo from '../assets/PokeZapv2.png'
import { Link } from 'react-router-dom';


export const Accueil = () => {
  return (
    <div className="HomeBody">
    <div className="HomeContainer">
      <nav>
        <img src={logo} alt="" className="logo" />
      </nav> 
      <h1 className='droite'>Acceptez le défi et découvrez si vous avez les compétences nécessaires pour devenir un maître Pokémon !</h1>
    </div>
    </div>
  );
};

export default Accueil;
