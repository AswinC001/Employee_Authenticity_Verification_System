import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Institution_signup() {
  const [name, setName] = useState('');
  const [aicteid, setId] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [institution, setInstitution] = useState('');

  const instituteNames = [
    'College of Engineering Trivandrum',
    'National Institute of Technology Calicut',
    'Government Engineering College Thrissur',
    'Model Engineering College, Thrikkakkara',
    'Mar Athanasius College, Kothamangalam',
    'Indian Institute of Technology, Kharagpur',
    'TKM College of Engineering'
  ];

  const handleGenerateUniqueId = () => {
    // Concatenate username and password to create a unique string
    const uniqueString = `${email}:${password}`;

    // Generate a UUID based on the unique string
    const generatedUniqueId = uuidv4(uniqueString);
    console.log(generatedUniqueId);
    // Set the generated unique ID to state
    setUniqueId(generatedUniqueId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/institution_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,  email, aicteid, userType,  password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message)
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <h1>Sign Up</h1>
      <label>
        Institution Name:
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option value="">Select Institution</option>
          {instituteNames.map((institute, index) => (
            <option key={index} value={institute}>{institute}</option>
          ))}
        </select>
      </label>
      
      <label>
        <input type="email" value={email} placeholder="Enter institution email" required onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        AICTE ID:
        <input type="text" value={aicteid} placeholder="Enter AICTE ID" required onChange={(e) => setId(e.target.value)} />
      </label>
      
      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value=""></option>
          <option value="company">Company</option>
          <option value="user">User</option>
          <option value="institution">Institution</option>
        </select>
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" >Register</button>
      
    </form>
  );
}

export default Institution_signup;
