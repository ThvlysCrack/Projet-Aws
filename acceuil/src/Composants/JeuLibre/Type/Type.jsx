import React, { useState, useEffect } from 'react';
import './Type.css';
import bgImage from '../../assets/images/wp2552241.jpg';
import pokemontre from '../../assets/images/pokémontre.png';
import bouton from '../../assets/images/boutton.png';
import pokemonDictionary from '../../assets/datas/pokemon_dictionary.json';

function Types() {
  const [seconds, setSeconds] = useState(30);
  const [started, setStarted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [randomType, setRandomType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [failedGuesses, setFailedGuesses] = useState([]);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [score, setScore] = useState(0); 
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [instructionsVisible, setInstructionsVisible] = useState(true); 

  useEffect(() => {
    if (started && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (seconds === 0) {
  
      setModalVisible(true);
      const score = correctGuesses.length * 2 - (totalGuesses - correctGuesses.length);
      setScore(score < 0 ? 0 : score); 

      let message = '';
      if (score <= 5) {
        message = "Nan mais t'en fais pas, y'a un powerspike à -10.";
      } else if (score <= 10) {
        message = "Avoir peu de points c'est la nouvelle méta pour être trop fort.";
      } else if (score <= 15) {
        message = "Pas mal, c'est même plutôt bien.";
      } else if (score <= 20) {
        message = "OHH QU'EST-CE QUE T'ES BIIEEEENNNNNN.";// Ajout de l'état score
      } else {
        message = "Les gars !!! il a ouvert la 8éme porte.";
      }
      setModalMessage(message);
    }
  }, [started, seconds, correctGuesses, totalGuesses]);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = Object.keys(pokemonDictionary).filter(name =>
        name.toLowerCase().startsWith(inputValue.toLowerCase()) &&
        !correctGuesses.some(guess => guess.name.toLowerCase() === name.toLowerCase()) &&
        !failedGuesses.includes(name.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, correctGuesses, failedGuesses]);

  const getRandomType = () => {
    const types = [
      "acier", "combat", "dragon", "eau", "électrik", "feu", "fée", "glace",
      "insecte", "normal", "plante", "poison", "psy", "roche", "sol", "spectre",
      "ténèbres", "vol"
    ];
    const RandomType = types[Math.floor(Math.random() * types.length)];
    setRandomType(RandomType);
    return RandomType;
  }

  const handleButtonClick = () => {
    if (!started) {
      setStarted(true);
      setShowInput(true);
      setRandomType(getRandomType());
      setInstructionsVisible(false); 
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (value) => {
    const pokemonTypes = pokemonDictionary[value];
    if (pokemonTypes && (pokemonTypes[0] === randomType || pokemonTypes[1] === randomType)) {
      if (!correctGuesses.some(guess => guess.name.toLowerCase() === value.toLowerCase())) {
        setPokemonSprite(pokemonTypes[2]);
        setPokemonName(value);
        setCorrectGuesses([{ name: value, sprite: pokemonTypes[2] }, ...correctGuesses]); 
        console.log("Gagné !");
      }
    } else {
      setFailedGuesses([...failedGuesses, value.toLowerCase()]); 
    }
    setInputValue('');
    setTotalGuesses(totalGuesses + 1); 
  };

  const handleSuggestionClick = (name) => {
    handleSubmit(name);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setStarted(false); 
    setShowInput(false);
    setRandomType('');
    setInputValue('');
    setPokemonSprite('');
    setPokemonName('');
    setCorrectGuesses([]);
    setFailedGuesses([]);
    setTotalGuesses(0);
    setScore(0);
    setInstructionsVisible(true); 
  };

  return (
    <body style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundSize: '100% 100%', display: 'flex', justifyContent: 'center', height: '100vh', position : 'relative' }}>
      <div className='chrono'>
        <div className='pokemontre'>
          <img src={pokemontre} alt="Pokémontre" />
          <span className="countdown">{seconds}</span>
        </div>
        <div className='bouton' onClick={handleButtonClick}>
          <img src={bouton} alt="Bouton" />
        </div>
        {randomType && (
          <p className='rdtype'> {randomType}</p>
        )}
        {showInput && (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(inputValue); }}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Entrez le nom du Pokémon"
              className="guessInput"
              disabled={seconds === 0} 
            />
            {suggestions.length > 0 && (
              <div className="suggestions">
                {suggestions.map((name, index) => (
                  <div key={index} className="suggestion" onClick={() => handleSuggestionClick(name)}>
                    <img src={pokemonDictionary[name][2]} alt={name} />
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
        )}
        <div className="correctGuess">
          {correctGuesses.map((guess, index) => (
            <div key={index} className="pokemonGuess">
              <img src={guess.sprite} alt={guess.name} />
              <p>{guess.name}</p>
            </div>
          ))}
        </div>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content lightning flames"> 
              <span className="close" onClick={() => handleModalClose()}>&times;</span>
              <p>Score: {score}</p> 
              <p>{modalMessage}</p>
              {/* Bouton Rejouer */}
              <button className="replayButton" onClick={() => window.location.reload()}>Rejouer</button>
            </div>
          </div>
        )}
        {instructionsVisible && (
          <div className="instructions">
            <p>Lorsque vous appuierez sur le bouton ci-dessus, un décompte de 30 secondes sera lancé et un type de pokemon sera affiché. Vous aurez jusqu'à la fin du décompte
              pour entrer le plus de pokemons possibles ayant ce type qu'il soit son premier ou son deuxième. Attention !! Une bonne réponse vaut 2 points et une mauvaise vous 
              coute 1 point. Amusez-vous bien. 
            </p>
          </div>
        )}
      </div>
    </body>
  );
}

export default Types;
