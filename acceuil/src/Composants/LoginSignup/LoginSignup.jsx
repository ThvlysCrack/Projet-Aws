import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import user_icon from '../assets/images/person.png';
import email_icon from '../assets/images/email.png';
import password_icon from '../assets/images/password.png';
import logo from '../assets/images/PokeZapv2.png';
import backgroundImage from '../assets/images/background102.jpg';
import Backgroundtest from '../Backgroundtest';

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('CONNEXION');
    const [errors, setErrors] = useState({
        pseudo: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://pokezapserver.vercel.app/login', { email, password });
            if (response.data.status === 'ok') {
                // Login was successful
                localStorage.setItem('token', response.data.data.token); // Store the token in local storage
                localStorage.setItem('tokenExpiration', Date.now() + 15 * 60 * 1000); // Store the token expiration time
                localStorage.setItem('userId', response.data.data.userId); // Store the user's ID in local storage
                navigate('/Defis-quotidiens');
            } else {
                // Login failed
                setErrors({ ...errors, email: response.data.error });
            }
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://pokezapserver.vercel.app/register', { pseudo, email, password });
            if (response.data.status === 'Ok') {
                // Registration was successful
                console.log('User registered successfully');
            } else {
                // Registration failed
                setErrors({ ...errors, email: response.data.error });
            }
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    const handleForgotPassword = () => {};

    const handleAction = () => {
        let isValid = true;
        const newErrors = { email: '', pseudo: '', password: '' };

        if (!pseudo) {
            isValid = false;
            newErrors.pseudo = 'Le pseudo est requis';
        }

        if (!email) {
            isValid = false;
            newErrors.email = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            newErrors.email = 'Veuillez entrer un email valide';
        }

        if (!password) {
            isValid = false;
            newErrors.password = 'Le mot de passe est requis';
        } else if (password.length < 8) { 
            isValid = false;
            newErrors.password = 'Le mot de passe doit comporter au moins 8 caractères';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])/.test(password)) {
            isValid = false;
            newErrors.password = 'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial';
        }
        

        if (isValid) {
            if (action === "CONNEXION") {
                handleLogin();
            } else {
                handleRegister();
            }
        } else {
            setErrors(newErrors);
        }
    };

    
    return (
        <Backgroundtest image={backgroundImage}>
            <div className="container">
                <div className="inputs">
                    {action === "CONNEXION" ? null : (
                        <div className="input-container">
                            <div className="input">
                                <img src={user_icon} alt='' />
                                <input type="text" placeholder='Pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                            </div>
                            {errors.pseudo && <p className="error">{errors.pseudo}</p>}
                        </div>
                    )}
                    <div className="input-container">
                        <div className="input">
                            <img src={email_icon} alt='' />
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-container">
                        <div className="input">
                            <img src={password_icon} alt='' />
                            <input type="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button className="SubmitButton" onClick={handleAction}>Submit</button>
                </div>
                {action === "INSCRIPTION" ? null : (
                    <div className="forgot-password">
                        <a href="/forgot-password"><span>Mot de passe oublié?</span></a>
                    </div>
                )}
                <div className="submit-container">
                    <div className={action === "CONNEXION" ? "submit gray" : "submit"} onClick={() => { setAction("INSCRIPTION") }}>INSCRIPTION</div>
                    <div className={action === "INSCRIPTION" ? "submit gray" : "submit"} onClick={() => { setAction("CONNEXION") }}>CONNEXION</div>
                </div>
            </div>
        </Backgroundtest>
    )
}

export default LoginSignup;
