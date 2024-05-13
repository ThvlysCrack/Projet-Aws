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
import leadercard from '../assets/images/leadercard.png';

function Classement() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function fetchTopUsers() {
        try {
          const response = await axios.get('http://localhost:4000/top-users');
          const data = response.data;
          console.log(data);
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

  const filteredUsers = users.filter((user) =>
    user.pseudo.toLowerCase().includes(searchText)
  );

  return (
    <body
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100vh',
        margin: '0',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <div className='lead_cont'>
        <div className='leadercard'>
          <div className='leaderboard'>
            <div className='description'>
              <input
                id='search'
                className='search'
                placeholder='Search'
                value={searchText}
                onChange={handleSearch}
              />
              <div className='descclass'><p>Dernière mise à jour : <br />Aujourd'hui à 11PM</p></div>  
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.rank}
                    className={
                      user.rank === 1
                        ? 'winner'
                        : user.rank === 2
                        ? 'runner-up'
                        : user.rank === 3
                        ? 'second-runner-up'
                        : ''
                    }
                  >
                    <td className='rank'>
                      {user.rank === 1 && (
                        <img className='master' src={master} alt='Master Ball' />
                      )}
                      {user.rank === 2 && (
                        <img className='hyper' src={hyper} alt='Hyper Ball' />
                      )}
                      {user.rank === 3 && (
                        <img className='superb' src={superb} alt='Super Ball' />
                      )}
                      {user.rank > 3 && (
                        <div className='pokeball'>
                          <img className='poke' src={poke} alt='Poke Ball' />
                          <div className='poke-rank'>{user.rank}</div>
                        </div>
                      )}
                    </td>
                    <td>{user.pseudo}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='expli'>
        <div className='textec'>
            <p>Bienvenue, voici le classement mondial des joueurs de PokeZap, vous retrouverez 
                ici les 10 meilleurs joueurs du monde ainsi que leurs rang et leurs score.<br /><br />
                Les scores sont calculées en fonctions des défis quotidiens de la veille. <br /><br />
                Pour chaque jeu, vous partez avec 100 points, chaque tentative ratée vous fais 
                perdre son numéro en points. Par exemple, si vous ratez votre dixième tentative, 
                vous perdrez 10 points.  <br/><br /> Le classement sera mis à jour tous les jours à 
                minuit heure de Paris. <br /><br />
                Vous vous sentez prêt à affronter les plus grands ??? Mesurez-vous à eux et 
                prouvez leur votre maîtrise !!!</p>
        </div>
        
      </div>
    </body>
  );
}

export default Classement;
