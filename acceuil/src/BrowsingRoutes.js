import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './Composants/Acceuil/acceuil';
import LoginSignup from './Composants/LoginSignup/LoginSignup';
import NavBar from './Composants/NavBar/NavBar';
import Defis from './Composants/Dailys/Accueil_Défis/Accueil_Défis';
import Profil from './Composants/Profil/profil';
import Classic from './Composants/Dailys/Classic/pokedex';
import JeuLibre from './Composants/Jeu_Libre/Accueil_jeu_libre/Accueil_Jeux'
import Classement from './Composants/Classement/Classement';
import Parametres from './Composants/Parametres/Parametres';
import APropos from './Composants/APropos/Apropos';
import Logo from './Composants/Logo/Logo';
import EnDev from './Composants/EnDev/Endev';
import Informations from './Composants/Profil/Informations/Informations';
import Palmares from './Composants/Profil/Palmares/Palmares';
import Personnalisation from './Composants/Profil/Personnalisation/Personnalisation';
import Statistiques from './Composants/Profil/Statistiques/Statistiques';
import Carte from './Composants/Dailys/Carte/Carte';
import Description from './Composants/Dailys/Description/Description';
import ForgetPassword from './Composants/ForgetPassword/forgetpassword'
import Silhouette from './Composants/Dailys/Silhouette/silhouette';

const BrowsingRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Logo />
      <Routes>
        <Route exact path="/" element={<Accueil/>} />
        <Route path="/Connexion" element={<LoginSignup/>} />
        <Route path="/Defis-quotidiens" element={<Defis/>} />
        <Route path="/Profil" element={<Profil/>} />
        <Route path="/pokedex" element={<Classic/>} />
        <Route path="/Jeu_Libre" element={<JeuLibre/>} />
        <Route path="/Classement" element={<Classement/>} />
        <Route path="/Parametres" element={<Parametres/>} />
        <Route path="/APropos" element={<APropos/>} />
        <Route path="/Informations" element={<Informations/>} />
        <Route path="/Palmares" element={<EnDev/>} />
        <Route path="/Personnalisation" element={<EnDev/>} />*
        <Route path="/Statistiques" element={<EnDev/>} />
        <Route path="/Description" element={<Description/>} />
        <Route path="/Carte" element={<EnDev/>} />
        <Route path="//forgot-password" element={<ForgetPassword/>} />
        <Route path="/Silhouette" element={<Silhouette/>} />
      </Routes>
    </Router>
  );
};

export default BrowsingRoutes;