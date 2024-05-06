import React, { useState,useEffect } from 'react';
// import './companydash.css';
import { v4 as uuidv4 } from 'uuid';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function CompanySetTenure() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    metamask: "NOT CONNECTED to Metamask",
    contract: "NOT CONNECTED to Smart Contract",
  });
  const [verifyResult, setVerifyResult] = useState("");
  const [tenureStatus,setTenureStatus]=useState("");
 
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
      .setEmployeeTenure(userhash,tenurestart,tenureend)
      .send({ from: account });
    setTenureStatus("Tenure Updated!")
  };

  return (
    <div className="company-set-tenure">
      
      <h1>Set Employee Tenure</h1>
      <button onClick={connectContract}>CONNECT TO CONTRACT</button>
      <p id="contractArea">{connectionStatus.contract}</p>
            <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
      <p id="accountArea">Account:<br />{connectionStatus.metamask}</p>
      
      
      <br />
      <br />
      {/* <div className="labels">USER HASH:</div><input type="text" id="adduserhash" /><br />
            <div className="labels">DOCUMENT HASH:</div><input type="text" id="adddochash" /><br />
            <button onClick={addDoc}>ADD DOCUMENT</button> <br /> */}
      <br />
      <br />
      {/* <div className="labels">USER HASH:</div> */}
      <input type="text" id="userhash" class="tenuretextbox" placeholder='Enter User ID' />
      <br />
      <input type="text" id="tenurestart" class="tenuretextbox"  placeholder='Enter Start Date'/>
       <br />
      <input type="text" id="tenureend" class="tenuretextbox"  placeholder='Enter End Date'/> <br />
      <br />
      <button onClick={setTenure}>SET</button> <br />
      <p id="setTenureArea">{tenureStatus}</p>
      
    </div>
  );
};

export default CompanySetTenure;
