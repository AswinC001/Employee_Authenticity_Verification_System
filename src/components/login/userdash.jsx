import React from 'react';
import { useNavigate,useParams } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './userDash.css';


function UserDash() {
  const navigate = useNavigate(); // Initialize the navigate function
  const {userEmail}=useParams();
  const {userId}=useParams();
  return (
    <div className='user-dash'>
      <h1>User Dashboard</h1>
      <p className='user-dash-id'>ID:{userId}</p>
      <ul className='userlinks'>
        {/* Use onClick to trigger navigation */}
        <li><a className='dashbutton' onClick={() => navigate(`/userdash/${userEmail}/${userId}/userviewdoc`)}>View Documents</a><br/></li>
        <li><a className='dashbutton' onClick={() => navigate(`/userdash/${userEmail}/${userId}/userviewtenure`)}>View Tenure</a><br/></li>
      </ul>
    </div>
  );
};


export default UserDash;
