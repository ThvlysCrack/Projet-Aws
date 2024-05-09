import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Type.css';
import bgImage from '../../assets/images/wp2552241.jpg';
import pokemontre from '../../assets/images/pokémontre.png';
import bouton from '../../assets/images/boutton.png';


function Types() {
  const [seconds, setSeconds] = useState(60); // Temps initial en secondes
  const [started, setStarted] = useState(false); // État pour savoir si le compte à rebours a démarré
  const [showInput, setShowInput] = useState(false); // État pour savoir si l'entrée doit être affichée
  let types = [
    "acier",
    "combat",
    "dragon",
    "eau",
    "électrik",
    "feu",
    "fée",
    "glace",
    "insecte",
    "normal",
    "plante",
    "poison",
    "psy",
    "roche",
    "sol",
    "spectre",
    "ténèbres",
    "vol"
  ]

  const getPokemonTypes = async (pokemonDetails) => {
    return await Promise.all(pokemonDetails.data.types.map(async (type) => await getTypeNameInFrench(type.type.name)));
  }

  const getTypeNameInFrench = async (typeName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
        return response.data.names.find((name) => name.language.name === 'fr').name;
    } catch (error) {
        console.error('Erreur lors de la récupération du nom français du type :', error.message);
        return 'Inconnu';
    }
  };

  const getPokemonDetails = async (pokemonEnglishName) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonEnglishName.toLowerCase()}`);
  }

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000); // Met à jour le temps toutes les secondes

      return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
    }
  }, [started]); // Exécuter l'effet uniquement lorsque l'état "started" change

  const handleButtonClick = () => {
    setStarted(true); // Lance le compte à rebours lorsque le bouton est cliqué
    setShowInput(true); // Affiche l'entrée lorsque le bouton est cliqué
  };

  return (
    <body style={{backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundSize: '100% 100%', display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <div className='chrono'>
        <div className='pokemontre'>
          <img src = {pokemontre} alt="Pokémontre" />
          <span className="countdown">{seconds}</span> {/* Affiche le temps restant */}
        </div>
        <div className='bouton' onClick={handleButtonClick}>
          <img src={bouton} alt="Bouton" />
        </div>
        {showInput && (
          <input
            type="text"
            placeholder="Entrez le nom du Pokémon"
            className="guess-input"
          />
        )}
      </div>
    </body>
  );
}

export default Types;
