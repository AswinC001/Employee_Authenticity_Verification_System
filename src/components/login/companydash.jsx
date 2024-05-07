import React from 'react';
import { useNavigate,useParams } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './companydash.css';
import { v4 as uuidv4 } from 'uuid';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function CompanyDash() {
  const navigate = useNavigate(); // Initialize the navigate function
  const {userEmail}=useParams();
  return (
    <div className='company-dash'>
      <h1>Company</h1>
      <br />

      <ul className='companylinks'>
        {/* Use onClick to trigger navigation */}
        <li><a className='dashbutton' onClick={() => navigate(`/companydash/${userEmail}/verify`)}>Verify Documents</a><br/></li>
        <li><a className='dashbutton' onClick={() => navigate(`/companydash/${userEmail}/settenure`)}>Set Tenure</a><br/></li>
        <li><a className='dashbutton' onClick={() => navigate(`/companydash/${userEmail}/viewtenure`)}>View Tenure</a><br/></li>
      </ul>
    </div>
  );
};

export default CompanyDash;
