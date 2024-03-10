import React, { useState, useEffect } from 'react';
import './classic.css';

function Test() {
    const [pokemonName, setPokemonName] = useState('');
    const [divList, setDivList] = useState([]);

    const handleInputChange = (event) => {
        setPokemonName(event.target.value);
    };

    // ...

    const handleInputSubmit = () => {
        if (pokemonName.trim() !== '') {
            const newDiv = (
                <div key={divList.length} className="dynamic-div">
                    <p>Nom du Pokémon: {pokemonName}</p>
                    {/* Ajoutez d'autres informations ici si nécessaire */}
                </div>
            );

            setDivList((prevDivList) => [...prevDivList, newDiv]);
            setPokemonName(''); // Effacer la saisie après la validation
        }
    };

    return (
        <div className="classic-container">
            <input
                type="text"
                placeholder="Nom du Pokémon"
                value={pokemonName}
                onChange={handleInputChange}
            />
            <button onClick={handleInputSubmit}>Valider</button>

            <div className="div-container">
                {divList.map((div, index) => (
                    <React.Fragment key={index}>{div}</React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Test;
