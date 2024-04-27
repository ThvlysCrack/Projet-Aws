
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './silhouette.css'; 
import TitleImage from '../../assets/titles/try.png';
import ZoomInIcon from '../../assets/images/zoom_in.png';
import ZoomOutIcon from '../../assets/images/zoom_out.png'; 
import DescriptionIcon from '../../assets/images/bouton_description.png';
import backgroundImage from '../../assets/images/Allgenv2.png';
import Backgroundtest from '../../Backgroundtest';
const Silhouette = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [loading, setLoading] = useState(true);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [filterRemoved, setFilterRemoved] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [description, setDescription] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(2.5); 
  const [showDescription, setShowDescription] = useState(false);
  const [incorrectGuess, setIncorrectGuess] = useState(false); 



  useEffect(() => {
    
    const generateDailyPokemon = async () => {
        const newDailyPokemon = await fetchRandomPokemon(); 
        setCurrentPokemon(newDailyPokemon); 
    };

    const now = new Date();
    const timeUntilMidnight = new Date(now);
    timeUntilMidnight.setHours(24, 0, 0, 0);
    const millisecondsUntilMidnight = timeUntilMidnight - now;
    setTimeout(generateDailyPokemon, millisecondsUntilMidnight);

    generateDailyPokemon();
}, []); 

  const fetchAllPokemonNames = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=898');
      const names = response.data.results.map(pokemon => pokemon.name);
      console.log(names); 
      setPokemonNames(names);
    } catch (error) {
      console.error('Error fetching Pokémon names:', error);
    }
  };

  useEffect(() => {
    fetchAllPokemonNames();
  }, []);

  const fetchPokemonNameInFrench = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const frenchName = response.data.names.find(name => name.language.name === 'fr').name;
      return frenchName;
    } catch (error) {
      console.error('Error fetching Pokémon name in French:', error);
    }
  };
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  
  const updateSuggestions = async (input) => {
    if (input === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = pokemonNames.filter(name =>
      name.toLowerCase().startsWith(input.toLowerCase())
    );
    console.log(filteredSuggestions); 
    const suggestionsWithFrenchNames = await Promise.all(filteredSuggestions.map(async (name) => {
      const id = pokemonNames.indexOf(name) + 1;
      const frenchName = await fetchPokemonNameInFrench(id);
      return { englishName: name, frenchName };
    }));
    const sortedSuggestions = suggestionsWithFrenchNames.filter(suggestion =>
      suggestion.frenchName.toLowerCase().startsWith(input.toLowerCase())
    );
    setSuggestions(sortedSuggestions);
  };
  

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    if (currentPokemon) {
      fetchPokemonInfo(currentPokemon.id);
    }
  }, [currentPokemon]);

  useEffect(() => {
    if (pokemonInfo && pokemonInfo.flavor_text_entries) {
      setDescription(pokemonInfo.flavor_text_entries.find(entry => entry.language.name === 'fr').flavor_text);
    }
  }, [pokemonInfo]);

  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setCurrentPokemon(response.data);
      setLoading(false);
      setCorrectGuess(false);
      setFilterRemoved(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPokemonInfo = async (pokemonId) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
      setPokemonInfo(response.data);
    } catch (error) {
      console.error('Error fetching Pokémon info:', error);
    }
  };

  const checkGuess = () => {
    if (pokemonInfo && pokemonInfo.names.some(name => name.language.name === 'fr' && name.name.toLowerCase() === userGuess.toLowerCase())) {
      setCorrectGuess(true);
      setIncorrectGuess(false); 
      
    } else {
      setCorrectGuess(false);
      setIncorrectGuess(true); 
    }
  };
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  return (
    <Backgroundtest image={backgroundImage}>
    <div className="silhouette-container">
      <img src={TitleImage} alt="Devine le Pokémon !" className="title-image" />
  
      <div className="game-content">
        {currentPokemon && (
          <div className="console-container">
            <div className="console">
              <div className="screen">
                <div className="pokemon-container" style={{ transform: `scale(${zoomLevel})` }}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
                    alt={currentPokemon.name}
                    className={`pokemon-image ${loading ? 'blur' : ''} ${correctGuess ? '' : 'filtered'} ${filterRemoved ? 'filter-removed' : ''}`}
                  />
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); checkGuess(); }}>
              <div className="input-container">
                  <input
                    type="text"
                    value={userGuess}
                    onChange={(e) => { 
                      setUserGuess(e.target.value); 
                      setIncorrectGuess(false); 
                      updateSuggestions(e.target.value); 
                    }}
                                      placeholder="Devinez le Pokémon !"
                    className={incorrectGuess ? 'incorrect-answer' : ''}

                  />
                  {suggestions.length > 0 && (
                    <div className="suggestion-dropdown">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} onClick={() => setUserGuess(suggestion.frenchName)} className="suggestion-item">
                          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNames.indexOf(suggestion.englishName) + 1}.png`} alt={suggestion.frenchName} />
                          <span>{suggestion.frenchName}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input type="submit" className="hidden" />
              </form>
            </div>
          </div>
        )}
        {description && showDescription && (
          <div className="description-container">
            <p>{description}</p>
          </div>
        )}
      </div>
  
      <div className="description-toggle-container">
        <button className="description-toggle-button" onClick={toggleDescription}>
          <img src={DescriptionIcon} alt="Description Icon" className="description-icon" />
        </button>
      </div>
      {showDescription && description && (
        <div className="description-container">
          <p>{description}</p>
        </div>
      )}
  
  <div className="description-message">
    <img src="https://pokedle.com/assets/ralts-BR5X01VK.png" alt="Zoom Icon"  className='desc-pok'/>

  <p>Description</p>
</div>
  
      <div className="zoom-buttons-container">
        <div className="zoom-message">
          <img src="data:image/png;base64,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" alt="Zoom Icon" className='zoom-pok' />
          <p>Zoom</p>
        </div>
        <div className="zoom-button-container">
          <button className="zoom-button" onClick={handleZoomIn}>
            <img src={ZoomInIcon} alt="Zoom In" className="zoom-icon" />
          </button>
          <button className="zoom-button" onClick={handleZoomOut}>
            <img src={ZoomOutIcon} alt="Zoom Out" className="zoom-icon" />
          </button>
        </div>
      </div>
    </div>
    </Backgroundtest>
  );
  
};

export default Silhouette;
