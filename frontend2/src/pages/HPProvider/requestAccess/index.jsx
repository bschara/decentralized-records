import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
import "./requestAccess.css";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Replace with your contract address

export const RequestAccessPage = () => {
  const [nationalId, setNationalID] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (window.ethereum) {
          // Enable MetaMask
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const network = await provider.getNetwork();

          // Check if the network supports ENS
          if (network.ensAddress) {
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);

            const contract = new ethers.Contract(
              contractAddress,
              HealthCard.abi,
              signer
            );
            setContract(contract);
          } else {
            console.error("The current network does not support ENS.");
            // Handle the absence of ENS support, you may choose to inform the user
            // or switch to a different network that supports ENS
          }
        } else {
          console.error("MetaMask not detected. Please install it.");
        }
      } catch (error) {
        console.error("Error initializing contract:", error.message);
      }
    };

    initializeContract();
  }, []);
  const handleChange = (event) => {
    setNationalID(event.target.value);
  };

  const handleAccessRequest = async () => {
    if (contract && signer) {
      try {
        // Call the requestAccess function using the signer
        await contract.connect(signer).requestAccess(nationalId);
        console.log(`Access requested for ${nationalId}`);
      } catch (error) {
        console.error("Error requesting access:", error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nationalId}
        onChange={handleChange}
        placeholder="Enter patient ID"
      />
      <button onClick={handleAccessRequest}>Request Access</button>
    </div>
  );
};
