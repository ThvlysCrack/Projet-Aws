import React, { useState } from 'react';
import './Classement.css';
import bgImage from '../assets/images/background102.jpg';
import trophy from '../assets/images/win.jpg';
import badge from '../assets/images/badgegold.png'

function Classement() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const players = [
    { rank: 1, name: 'Ilyes', score: 239 },
    { rank: 2, name: 'Aymen', score: 209 },
    { rank: 3, name: 'Elias', score: 154 },
    { rank: 4, name: 'Asma', score: 100 },
    { rank: 5, name: 'Yann', score: 82 },
    { rank: 1, name: 'Ilyes', score: 239 },
    { rank: 2, name: 'Aymen', score: 209 },
    { rank: 3, name: 'Elias', score: 154 },
    { rank: 4, name: 'Asma', score: 100 },
    { rank: 5, name: 'Yann', score: 82 },
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchText)
  );

  return (
    <body style={{ backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', width: '100%', height: '100vh',margin: '0',
    overflow:'hidden', backgroundRepeat: 'no-repeat' }}> 
      <div className='header'>
        <div className='logo'> </div>
        <h1>LEADERBOARD</h1>
      </div>
      <div className="leaderboard-container">
        <div className="description">
          <p>Dernière mise à jour : <br/>Aujourd'hui à 11PM</p>
          <input
            id="search"
            className="search"
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, index) => (
              <tr key={index} className={index === 0 ? 'winner' : index === 1 ? 'runner-up' : index === 2 ? 'second-runner-up' : ''}>
                <td className="rank">{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='messagecontainer'>
        <img src={trophy} alt='Trophy' className='trophyImage' />
        <p className='message'>Il montrera les 10 meilleurs joueurs du monde ainsi que leurs surnoms, leurs classements et leurs scores.</p>
      </div>

      <div className='messagecontainer2'>
        <img src={badge} alt='gold' className='badgeImage' />
        <p className='message2nd'> Les classements sont basés sur la notation en jeu de la veille. <br/> Le classement sera mis à jour tous les jours à 23h00 UTC.</p>
      </div>
   </body> 
  );
}

export default Classement;