import React from 'react'
import './styles.css'; // Importez le fichier CSS
import logo from '../assets/PokeZapv2.png'
//import Backgroundtest from acceuil/src/Composants/Backgroundtest.jsx
import backgroundImage from '../assets/Giratina.png';
import Backgroundtest from '../Backgroundtest';
import { Link } from 'react-router-dom';


export const Accueil = () => {
  return (
    <Backgroundtest image={backgroundImage}>
    <div className="HomeContainer">
      <nav>
        <img src={logo} alt="" className="logo" />
      </nav> 
      <h1 className='droite'>Acceptez le défi et découvrez si vous avez les compétences nécessaires pour devenir un maître Pokémon !</h1>
    </div>
    </Backgroundtest>
  );
};

export default Accueil;
