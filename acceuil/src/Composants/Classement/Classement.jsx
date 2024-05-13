import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Classement.css';
import bgImage from '../assets/images/espacedracoecto.png';
import trophy from '../assets/images/win.jpg';
import badge from '../assets/images/badgegold.png';
import master from '../assets/images/Master-Ball.png';
import hyper from '../assets/images/HyperBall.png';
import superb from '../assets/images/SuperBall.png';
import poke from '../assets/images/PokeBall.png';

function Classement() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        const response = await axios.get('http://localhost:4000/top-users');
        const data = response.data;
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    }

    fetchTopUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user =>
    user.pseudo.toLowerCase().includes(searchText)
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
            {filteredUsers.map((user) => (
              <tr key={user.rank} className={user.rank === 1 ? 'winner' : user.rank === 2 ? 'runner-up' : user.rank === 3 ? 'second-runner-up' : ''}>
                <td className="rank">
                  {user.rank === 1 && <img src={master} alt="Master Ball" />}
                  {user.rank === 2 && <img src={hyper} alt="Hyper Ball" />}
                  {user.rank === 3 && <img src={superb} alt="Super Ball" />}
                  {(user.rank !== 1 && user.rank !== 2 && user.rank !== 3) && <img src={poke} alt="Poke Ball" />}
                </td>
                <td>{user.pseudo}</td>
                <td>{user.score}</td>
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