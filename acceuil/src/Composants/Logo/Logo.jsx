import React from 'react';
import './Logo.css'; 
import logo from '../assets/images/PokeZapv2.png';

function Logo (){
  return (
    <div className="logogen">
      <img src={logo} alt="Logo" style={{ width: '100px' }}/>
    </div>
  );
}

export default Logo;