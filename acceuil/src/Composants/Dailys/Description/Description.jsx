import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/images/Allgenv2.png';
import './Description-copy.css';
import pokemonNames from '../../assets/datas/pokemon_names.json';

async function getPokemonsOfTheDay() {
  try {
    const response = await axios.get('http://localhost:4000/daily-pokemons');
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Erreur lors de la récupération des Pokémons du jour:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémons du jour:', error.message);
    return null;
  }
}

function Description() {
  const [dailyPokemon, setDailyPokemon] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [pokemonFound, setPokemonFound] = useState(false); // Nouvel état pour suivre si le Pokémon du jour a été trouvé
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsWithSprites, setSuggestionsWithSprites] = useState([]);
  const [guessedPokemon, setGuessedPokemon] = useState([]);

  useEffect(() => {
    const generateDailyPokemon = async () => {
      try {
        const pokemonQuery = await getPokemonsOfTheDay();
        const pokemonSpeciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonQuery.pokemon3}`);
        const speciesData = pokemonSpeciesResponse.data;
        const frenchName = speciesData.names.find(name => name.language.name === 'fr').name;

        // Recherche de la description en français
        const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'fr');
        const description = descriptionEntry ? descriptionEntry.flavor_text : 'Description non disponible';
        const pokemonName = frenchName.toLowerCase();
        const regex = new RegExp(pokemonName, 'gi');
        const PokemonDescription = description.replace(regex, '???');

        // Création de l'objet newDailyPokemon
        const newDailyPokemon = {
          Name: pokemonQuery.pokemon3,
          Description: PokemonDescription,
        };

        console.log(newDailyPokemon);
        setDailyPokemon(newDailyPokemon);
      } catch (error) {
        console.error("Erreur lors de la récupération du Pokémon quotidien :", error);
      }
    };

    generateDailyPokemon();
  }, []);
  useEffect(() => {
    const fetchSuggestionsWithSprites = async () => {
      const suggestionsWithSpritesPromises = suggestions.map(async (suggestion) => {
        const pokemonDetails = await getPokemonDetails(pokemonNames[suggestion]);
        const pokemonSprite = getPokemonSprite(pokemonDetails);
        return { name: suggestion, sprite: pokemonSprite };
      });
      const suggestionsWithSprites = await Promise.all(suggestionsWithSpritesPromises);
      setSuggestionsWithSprites(suggestionsWithSprites);
    };

    fetchSuggestionsWithSprites();
  }, [suggestions]);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);
    const filteredSuggestions = Object.keys(pokemonNames).filter((key) =>
      key.toLowerCase().startsWith(value)
    );
    setSuggestions(filteredSuggestions);
  };

  const getEnglishPokemonName = (frenchName) => {
    return pokemonNames[frenchName] || frenchName;
  };

  const getPokemonDetails = async (pokemonEnglishName) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonEnglishName.toLowerCase()}`);
  };

  const getPokemonSprite = (pokemonDetails) => {
    return pokemonDetails.data.sprites.front_default;
  };

  const handleInputKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleInputSubmit();
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setInputValue(suggestion);
  };
  const handleInputSubmit = async () => {
    if (inputValue.trim() !== '' && !pokemonFound) {
      try {
        const pokemonEnglishName = getEnglishPokemonName(inputValue);

        if (pokemonNames.hasOwnProperty(inputValue)) {
          // Vérifiez si le Pokémon est déjà deviné
          if (guessedPokemon.includes(pokemonEnglishName.toLowerCase())) {
            // Si le Pokémon est déjà deviné, ne faites rien
            setInputValue('');
            return;
          }

          setAttemptCounter(attemptCounter + 1);

          if (pokemonEnglishName.toLowerCase() === dailyPokemon.Name.toLowerCase()) {
            setPokemonFound(true);
          }

          setInputValue('');
          // Ajoutez le Pokémon deviné à guessedPokemon
          const pokemonDetails = await getPokemonDetails(pokemonEnglishName);
          const pokemonSprite = await getPokemonSprite(pokemonDetails);
          const p = {
            Name: pokemonEnglishName.toLowerCase(),
            Sprite: pokemonSprite,
            FrenchName: inputValue
          };
          setGuessedPokemon([p, ...guessedPokemon]);
        } else {
          setInputValue(''); // Réinitialiser la valeur de l'input si le nom n'est pas trouvé
        }
      } catch (error) {
        console.error('Erreur lors de la requête à Pokeapi :', error.message);
      }
    }
  };
  return (
    <body style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='descriptionContainer'>
        <div className='descriptionMainContainer'>
          <div className='descriptionGameComponent'>
            <div className='p'>{dailyPokemon.Description}</div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Entrez le nom du Pokémon"
              className="guess-input"
              disabled={pokemonFound}
            />
          </div>
          <div className='descriptionDynamicDiv'>
            {guessedPokemon.map((guess, index) => (
              <div className="dynamic-div2"
                style={{ backgroundColor: guess.Name === dailyPokemon.Name ? '#29E43C' : '#EB0F0F' }}>
                <div className='bgAnswserCard2'>
                  <div className='answerCard2'>
                    <img src={guess.Sprite} alt={guess.FrenchName} />
                  </div>
                </div>
                <div className='pokemonNameGuess'>
                  <span>{guess.FrenchName}</span>
                </div>
              </div>
            ))}
          </div>

          <div className='descriptionDynamicDiv'>
            {inputValue !== '' && (
              <div className="suggestionsBox">
                {suggestions.length > 0 && (
                  <div className="suggestion-dropdown">
                    {suggestionsWithSprites.map((suggestion, index) => (
                      <div key={index} onClick={() => handleSuggestionClick(suggestion.name)} className="suggestion-item">
                        <div className='sugSprite'><img src={suggestion.sprite} alt={suggestion.name} /></div>
                        <div className='sugName'><span>{suggestion.name}</span></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
}


export default Description;