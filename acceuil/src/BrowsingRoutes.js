import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './Composants/Acceuil/acceuil';
import LoginSignup from './Composants/LoginSignup/LoginSignup';
import NavBar from './Composants/NavBar/NavBar';
import Defis from './Composants/Dailys/Accueil_Défis/Accueil_Défis';
import Profil from './Composants/Profil/profil';
import Classic from './Composants/Dailys/Classic/pokedex';

const BrowsingRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Accueil/>} />
        <Route path="/Connexion" element={<LoginSignup/>} />
        <Route path="/Defis-quotidiens" element={<Defis/>} />
        <Route path="/Profil" element={<Profil/>} />
        <Route path="/pokedex" element={<Classic/>} />
      </Routes>
    </Router>
  );
};

export default BrowsingRoutes;