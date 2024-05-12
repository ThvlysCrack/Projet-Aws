import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Accueil from './Composants/Acceuil/acceuil';
import LoginSignup from './Composants/LoginSignup/LoginSignup';
import NavBar from './Composants/NavBar/NavBar';
import Defis from './Composants/Dailys/Accueil_Défis/Accueil_Défis';
import Profil from './Composants/Profil/profil';
import Classic from './Composants/Dailys/Classic/pokedex';
import JeuLibre from './Composants/JeuLibre/Accueil_jeu_libre/Accueil_Jeux'
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
import Resetpassword from './Composants/ForgetPassword/Resetpassword';
import Type from './Composants/JeuLibre/Type/Type';

// This is a mock function, replace it with your actual authentication check
function isUserConnected() {
  const token = localStorage.getItem('token');
  return token != null;
}

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
      if (!isUserConnected()) {
          navigate('/Connexion');
      }
  }, [navigate]);

  return isUserConnected() ? children : null;
}

const BrowsingRoutes = () => {
return (
  <Router>
    <NavBar />
    <Logo />
    <Routes>
    <Route exact path="/" element={<Accueil/>} />
        <Route path="/Connexion" element={<LoginSignup/>} />
        <Route path="/Defis-quotidiens" element={ <ProtectedRoute><Defis/></ProtectedRoute>} />
        <Route path="/Profil" element={<ProtectedRoute><Profil/></ProtectedRoute>} />
        <Route path="/pokedex" element={<ProtectedRoute><Classic/></ProtectedRoute>} />
        <Route path="/JeuLibre" element={<ProtectedRoute><JeuLibre/></ProtectedRoute>} />
        <Route path="/Classement" element={<ProtectedRoute><Classement/></ProtectedRoute>} />
        <Route path="/Parametres" element={<ProtectedRoute><Parametres/></ProtectedRoute>} />
        <Route path="/APropos" element={<ProtectedRoute><APropos/></ProtectedRoute>} />
        <Route path="/Informations" element={<ProtectedRoute><Informations/></ProtectedRoute>} />
        <Route path="/Palmares" element={<ProtectedRoute><EnDev/></ProtectedRoute>} />
        <Route path="/Personnalisation" element={<ProtectedRoute><EnDev/></ProtectedRoute>} />
        <Route path="/Statistiques" element={<ProtectedRoute><EnDev/></ProtectedRoute>} />
        <Route path="/Description" element={<ProtectedRoute><Description/></ProtectedRoute>} />
        <Route path="/Carte" element={<ProtectedRoute><EnDev/></ProtectedRoute>} />
        <Route path="/reset-password" element={<Resetpassword/>} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/Silhouette" element={<ProtectedRoute><Silhouette/></ProtectedRoute>} />
        <Route path="/Type" element={<ProtectedRoute><Type/></ProtectedRoute>} />
      </Routes>
  </Router>
);
};

export default BrowsingRoutes;