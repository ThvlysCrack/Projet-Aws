import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
//import backgroundImage from '../assets/images/Giratina.png';
import backgroundImage from '../assets/images/background102.jpg';
import Backgroundtest from '../Backgroundtest';
import './forgetpassword.css';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    // Send a request to your API
    try {
      const response = await axios.post('https://pokezapserver.vercel.app/forgot-password', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    };

    return (
        <Backgroundtest image={backgroundImage}>
        <form className="myform" onSubmit={(e) => e.preventDefault()}>
          <input
          className="myinput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          <button className="mybutton" type="button" onClick={handleSubmit}>Send Email</button>
        </form>
        </Backgroundtest>
    )
}
export default Forgetpassword;