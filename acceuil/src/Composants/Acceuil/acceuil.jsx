import React from 'react'
import './styles.css'; // Importez le fichier CSS
import sound from '../assets/starting-sound.mp3'
import logo from '../assets/PokeZapv2.png'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
/*function play (){
    new Audio(sound).play()
}*/

export const Accueil = () => {
  return (
    <div className="HomeContainer">
      <nav>
        <img src={logo} alt="" className="logo" />
        <NavBar />
        {/* 
        <ul>
           <li><Link to="/">Accueil</Link></li>
           <li><Link to="/Classements">Classements</Link></li>
           <li><Link to="/Connexion">Connexion</Link></li>
        </ul>
  */}
      </nav> 

      
      {/*<div className="row">
        <button onClick={play} className="btn">Défi quotidien</button>
        <button href="/Connexion"onClick={play} className="btn">Connexion</button>    
        </div>*/}
      <h1 className='droite'>Acceptez le défi et découvrez si vous avez les compétences nécessaires pour devenir un maître Pokémon !</h1>
    </div>
  );
};

export default Accueil;
