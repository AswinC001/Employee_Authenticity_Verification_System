import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import { useParams } from 'react-router-dom';
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function UserViewTenure() {
  const [contract, setContract] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    metamask: "NOT CONNECTED to Metamask",
    contract: "NOT CONNECTED to Smart Contract",
  });
  const [viewCompany, setViewCompany] = useState("");
  const [viewStartDate, setViewStartDate] = useState("");
  const [viewEndDate, setViewEndDate] = useState("");
  
  const {userId } = useParams();

  useEffect(() => {
    connectContract();
  }, []); // Empty array as the dependency to run this effect only once

  const connectContract = async () => {
    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const contractInstance = new window.web3.eth.Contract(ABI, Address);
        setContract(contractInstance);
        setConnectionStatus({
          ...connectionStatus,
          contract: "Connection Status: Success",
        });
      } catch (error) {
        console.error("Error connecting to Metamask: ", error);
        setConnectionStatus({
          ...connectionStatus,
          contract: "Connection Status: Failed",
        });
      }
    } else {
      console.error("Metamask not found.");
    }
  };

  const viewTenure = async () => {
    try {
      const employeeTenure = await contract.methods
        .getEmployeeTenure(userId)
        .call();
      setViewCompany(`Company : ${employeeTenure[0]}`);
      setViewStartDate(`Start Date : ${employeeTenure[1]}`);
      setViewEndDate(`End Date : ${employeeTenure[2]}`);
      if (viewCompany=="") {
        setViewCompany(`No information`);
        setViewStartDate(``);
      setViewEndDate(``);
      }
    } catch (error) {
      setViewCompany(`No information`);
      console.error("Error fetching employee tenure: ", error);
    }
  };

  return (
    <div className="user-dash">
      <h1>View My Tenure</h1>
      <p id="contractArea">{connectionStatus.contract}</p>
  
      <br />
      <button onClick={viewTenure}>MY TENURE</button>
      <p id="viewTenureArea">{viewCompany} <br />{viewStartDate} <br />{viewEndDate}</p>
    </div>
  );
};

export default UserViewTenure;
