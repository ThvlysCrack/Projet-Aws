import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import inscription_icon from '../assets/INSCRIPTION.png'
import connexion_icon from '../assets/CONNEXION.png'

const LoginSignup = () => {
    const[action,setAction] = useState("CONNEXION");
  return (

    <div className="container">
        <div className="header">
            {action === "INSCRIPTION" ? 
                <img src={inscription_icon} alt='Inscription'/> :
                <img src={connexion_icon} alt='Connexion'/>            }
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt=''/>
                <input type="text" placeholder='Pseudo'/>
            </div>
            {action==="CONNEXION"?<div></div>:<div className="input">
                <img src={email_icon} alt=''/>
                <input type="email" placeholder='Email'/>
                </div>}
            
            <div className="input">
                <img src={password_icon} alt=''/>
                <input type="password" placeholder='Mot de passe'/>
            </div>
        </div>
        {action=== "INSCRIPTION"?<div></div>:   <div className="forgot-password"><span>Mot de passe oublié?</span></div>}
        <div className="submit-container">
            <div className={action==="CONNEXION"?"submit gray":"submit"} onClick={()=>{setAction("INSCRIPTION")}}>INSCRIPTION</div>
            <div className={action==="INSCRIPTION"?"submit gray":"submit"} onClick={()=>{setAction("CONNEXION")}}>CONNEXION</div>
        </div>
    </div>
  )
}
export default LoginSignup;
