import React, { useState, useEffect } from 'react';
import bgImage from '../../assets/images/Allgenv2.png';
import zoomImg from '../../assets/images/loupe.png';
import pokemonNames from '../../assets/datas/FR_EN_PokeDict.json';
import axios from 'axios';

import './silhouette.css';

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

function Silhouette() {
    const [dailyPokemon, setDailyPokemon] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsWithSprites, setSuggestionsWithSprites] = useState([]);
    const [attemptCounter, setAttemptCounter] = useState(0);
    const [pokemonFound, setPokemonFound] = useState(false); // Nouvel état pour suivre si le Pokémon du jour a été trouvé
    const [scale, setScale] = useState(4); // État pour stocker l'échelle de l'image
    const [guessedPokemon, setGuessedPokemon] = useState([]);

    // Fonction pour calculer l'échelle en fonction du nombre de tentatives
    const calculateScale = () => {
        const newScale = 4 - (0.1 * attemptCounter);
        setScale(newScale);
    };

    useEffect(() => {
        calculateScale(); // Calculer l'échelle initiale
    }, [attemptCounter]); // Exécuter chaque fois que le nombre de tentatives change

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


    useEffect(() => {
        const generateDailyPokemon = async () => {
            const pokemonQuery = await getPokemonsOfTheDay();
            const pokemonDetails = await getPokemonDetails(pokemonQuery.pokemon2);
            const pokemonSprite = await getPokemonSprite(pokemonDetails);
            const newDailyPokemon = {
                Name: pokemonQuery.pokemon2,
                Sprite: pokemonSprite,
            };
            setDailyPokemon(newDailyPokemon);
        };
        generateDailyPokemon();
    }, []);

    const getPokemonDetails = async (pokemonEnglishName) => {
        return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonEnglishName.toLowerCase()}`);
    };

    const getPokemonSprite = (pokemonDetails) => {
        return pokemonDetails.data.sprites.front_default;
    };

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);
        const filteredSuggestions = Object.keys(pokemonNames).filter((key) =>
            key.toLowerCase().startsWith(value)
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = async (suggestion) => {
        setInputValue(suggestion);
    };

    const handleInputKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await handleInputSubmit();
        }
    };

    const getEnglishPokemonName = (frenchName) => {
        return pokemonNames[frenchName] || frenchName;
    };
    const handleZoomButtonClick = () => {
        if (scale < 4) { // Si l'échelle est inférieure à 4, mettez à jour l'échelle à 4
            setScale(4);
        } else {
            calculateScale();
        }
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
        <body style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="main">
                <div className='maincontainer'>
                    <div className="game border">
                        <div className="gameContent">
                            <div className="generation">
                                <span>generation : 1-3</span>
                            </div>
                            <div className="question">
                                <span style={{ fontSize: '1em' }}>A quelle pokemon appartient cette silhouette ?</span>
                            </div>
                            <div className="pokemonShadowGame">
                                <div className="box">
                                    {dailyPokemon.Sprite && <img src={dailyPokemon.Sprite}
                                        alt={dailyPokemon.Name}
                                        style={{
                                            width: '100%', height: '100%',
                                            filter: pokemonFound ? 'none' : 'brightness(0)',
                                            transform: pokemonFound ? 'scale(1)' : `scale(${scale})`
                                        }} />
                                    }
                                </div>
                                <div className="zoom">
                                    <button onClick={handleZoomButtonClick}>
                                        <img src={zoomImg} alt="Zoom in/out" style={{ width: '40px', marginLeft: '25%' }} />
                                    </button>
                                    <div className='inputDiv'>
                                        <input className="inputPokemon2"
                                            type="text"
                                            placeholder="Taper le nom du pokemon"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onKeyDown={handleInputKeyDown}
                                            disabled={pokemonFound}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="guessBox">
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
                    {pokemonFound && (
                        <div className="resultBox">
                            <p>Félicitations! Vous avez trouvé le Pokémon en {attemptCounter} tentatives!</p>
                        </div>
                    )}
                    <div className='blocS'>
                        <div className='dynamicContent'>
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
                    </div>

                </div>
            </div>
        </body>
    );
}

export default Silhouette;
