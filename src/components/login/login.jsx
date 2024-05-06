import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {


  return (
    <div className='mainpage'>
      <h1 >Select Login type</h1>
      <ul className='mainlinks'>
      <li><a href='/user-login' className='navlink' >User</a><br></br></li>
      <li><a href='/company-login' className='navlink' >Company</a><br></br></li>
      <li><a href='/institution-login' className='navlink' >Institution</a><br></br></li>
      </ul>
    </div>
  );
}

export default Login;
