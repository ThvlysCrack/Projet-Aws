import React, { useState } from 'react'
import axios from 'axios'
import './LoginSignup.css'
import user_icon from '../assets/images/person.png'
import email_icon from '../assets/images/email.png'
import password_icon from '../assets/images/password.png'
import logo from '../assets/images/PokeZapv2.png'
import backgroundImage from '../assets/images/Giratina.png';
import Backgroundtest from '../Backgroundtest';

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('CONNEXION');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.data.status === 'ok') {
                // Login was successful
                console.log('Token:', response.data.data);
            } else {
                // Login failed
                console.log('Error:', response.data.error);
            }
        } catch (error) {
            console.error('Error making request:', error);
        }
    };
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', { pseudo, email, password });
            if (response.data.status === 'ok') {
                // Registration was successful
                console.log('User registered successfully');
            } else {
                // Registration failed
                console.log('Error:', response.data.error);
            }
        } catch (error) {
            console.error('Error making request:', error);
        }
    };
    const handleAction = () => {
        if (action === "CONNEXION") {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    return (
        <Backgroundtest image={backgroundImage}>
            <div className="container">
                <img src={logo} alt="" className="logo" />
                <div className="inputs">
                    {action === "CONNEXION" ? <div></div> : <div className="input">
                        <img src={user_icon} alt='' />
                        <input type="text" placeholder='Pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                    </div>}
                    <div className="input">
                        <img src={email_icon} alt='' />
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src={password_icon} alt='' />
                        <input type="password" placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleAction}>Submit</button>
                </div>
                {action === "INSCRIPTION" ? <div></div> : <div className="forgot-password"><span>Mot de passe oublié?</span></div>}

                <div className="submit-container">
                    <div className={action === "CONNEXION" ? "submit gray" : "submit"} onClick={() => { setAction("INSCRIPTION") }}>INSCRIPTION</div>
                    <div className={action === "INSCRIPTION" ? "submit gray" : "submit"} onClick={() => { setAction("CONNEXION") }}>CONNEXION</div>
                </div>
            </div>
        </Backgroundtest>
    )
}
export default LoginSignup;