import React, { useState } from 'react'
import axios from 'axios'
//import backgroundImage from '../assets/images/Giratina.png';
import backgroundImage from '../assets/images/background102.jpg';
import Backgroundtest from '../Backgroundtest';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
    // Send a request to your API
    try {
      const response = await axios.post('/api/forget-password', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    };

    return (
        <Backgroundtest image={backgroundImage}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
            />
          <button type="button" onClick={handleSubmit}>Send Email</button>
        </form>
        </Backgroundtest>
    )
}
export default Forgetpassword;