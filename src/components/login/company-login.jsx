import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
 // Import useNavigate hook

function CompanyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    setShowForm(true); // Show the form after clicking "Login" button
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setShowForm(true);
        handleSignupClick();
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  }

  const handleSignupClick = () => {
    navigate(`/companydash/${email}`); // Navigate to the signup page using navigate function
  };

  return (
    
    <form onSubmit={handleSubmit} className='form-container'>
        <h1>Company Login</h1>
      <label>
        Username
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit" >Login</button><br></br>
      If you don't have an account click <a href='/signup' className='but' >here</a>
    </form>
  );
}

export default CompanyLogin;
