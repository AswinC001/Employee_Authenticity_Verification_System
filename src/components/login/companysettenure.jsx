import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
// import './companydash.css';
import { v4 as uuidv4 } from 'uuid';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";
import { useParams } from 'react-router-dom';

function CompanySetTenure() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    metamask: "NOT CONNECTED to Metamask",
    contract: "NOT CONNECTED to Smart Contract",
  });
  const [verifyResult, setVerifyResult] = useState("");
  const [tenureStatus,setTenureStatus]=useState("");
  const [companyName, setCompanyName] = useState(""); // State to store company name
  const {userEmail}=useParams();
  useEffect(() => {
    // Function to fetch company name when the component mounts
    const fetchCompanyName = async () => {
      try {   
        const response = await fetch('http://localhost:3001/company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: userEmail}),
        });
        const data = await response.json();
        if (response.ok) {
          setCompanyName(data.name);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle network error
      }
    };

    // Call the fetch function when component mounts
    fetchCompanyName();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setConnectionStatus({
        ...connectionStatus,
        metamask: ` ${accounts[0]}`,
      });
    }
  };

  const connectContract = async () => {
    //ABI and address provided externally
    window.web3 = await new Web3(window.ethereum);
    const contractInstance = new window.web3.eth.Contract(ABI, Address);
    setContract(contractInstance);
    setConnectionStatus({
      ...connectionStatus,
      contract: "Connection Status: Success",
    });
  };


  const setTenure = async () => {
    const userhash = document.getElementById("userhash").value;
    const tenurestart = document.getElementById("tenurestart").value;
    const tenureend = document.getElementById("tenureend").value;
    await contract.methods
      .setEmployeeTenure(userhash,companyName,tenurestart,tenureend)
      .send({ from: account });
    setTenureStatus("Tenure Updated!")
  };

  return (
    <div className="company-set-tenure">
      <h1>Set Employee Tenure for {companyName}</h1> {/* Display company name */}
      <button onClick={connectContract}>CONNECT TO CONTRACT</button>
      <p id="contractArea">{connectionStatus.contract}</p>
      <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
      <p id="accountArea">Account:<br />{connectionStatus.metamask}</p>
      
      <br />
      <br />
      <input type="text" id="userhash" className="tenuretextbox" placeholder='Enter User ID' />
      <br />
      <input type="text" id="tenurestart" className="tenuretextbox"  placeholder='Enter Start Date'/>
      <br />
      <input type="text" id="tenureend" className="tenuretextbox"  placeholder='Enter End Date'/> <br />
      <br />
      <button onClick={setTenure}>SET</button> <br />
      <p id="setTenureArea">{tenureStatus}</p>
      
    </div>
  );
};

export default CompanySetTenure;
