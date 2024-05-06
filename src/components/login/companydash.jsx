import React, { useState,useEffect } from 'react';
import './companydash.css';
import { v4 as uuidv4 } from 'uuid';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function CompanyDash() {

  return (
    <div className='company-dash'>
    <h1 >Company</h1>
    <br />

    <ul className='companylinks'>
    <li><a href='/companydash/:userEmail/verify' className='dashbutton' >Verify Documents</a><br></br></li>
    <li><a href='/companydash/:userEmail/settenure' className='dashbutton' >Set Tenure</a><br></br></li>
    <li><a href='/companydash/:userEmail/viewtenure' className='dashbutton' >View Tenure</a><br></br></li>
    </ul>
  </div>
);
};

export default CompanyDash;
