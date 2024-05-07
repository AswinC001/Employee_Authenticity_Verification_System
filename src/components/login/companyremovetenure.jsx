import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import { Address } from "../../contractinfo/address";
import { ABI } from "../../contractinfo/abi";

function CompanyRemoveTenure() {
  const [contract, setContract] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    metamask: "NOT CONNECTED to Metamask",
    contract: "NOT CONNECTED to Smart Contract",
  });
  const [userAddress, setUserAddress] = useState("");
  const [msg,setmsg]=useState("");

  useEffect(() => {
    connectContract();
  }, []);

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

  const handleChange = (event) => {
    setUserAddress(event.target.value);
  };

  const removeTenure = async () => {
    try {
      await contract.methods.removeEmployeeTenure(userAddress).send({ from: window.ethereum.selectedAddress });
      console.log("Tenure removed successfully");
      setmsg("Tenure removed successfully");
    } catch (error) {
      console.error("Error removing tenure: ", error);
      setmsg("Error!!!");
    }
  };

  return (
    <div className="company-remove-tenure">
      <h1>Remove Employee Tenure</h1>
      <input type="text" placeholder="Enter employee address" value={userAddress} onChange={handleChange} />
      <br /><br /><button onClick={removeTenure}>Remove Tenure</button>
      <p id="removeTenureArea">{msg}</p>
    </div>
  );
}

export default CompanyRemoveTenure;
