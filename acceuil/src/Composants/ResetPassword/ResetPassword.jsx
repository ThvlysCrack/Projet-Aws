import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/images/background102.jpg';
import Backgroundtest from '../Backgroundtest';
import './ResetPassword.css';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            alert('Le mot de passe a été réinitialisé avec succès');
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            alert('Une erreur est produite lors de la réinitialisation de votre mot de passe. Veuillez réessayer.');
        }
    };

    return (
        <Backgroundtest image={backgroundImage}>
            <div className="container">
                <div className="reset-password-box">
                    <h2>Réinitialiser le mot de passe</h2>
                    <p>Entrez votre nouveau mot de passe.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Nouveau mot de passe"
                            value={password}
                            onChange={handlePasswordChange}
                            className="placeholder"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        />
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="placeholder"
                            style={{ top: "70%", transform: "translateY(-50%)" }}
                        />
                        <button type="submit" className="SubmitButton">Réinitialiser</button>
                    </form>
                </div>
            </div>
        </Backgroundtest>
    );
};

export default ResetPassword;
