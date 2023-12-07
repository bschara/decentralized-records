import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
import "./requestAccess.css";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Replace with your contract address

export const RequestAccessPage = () => {
  const [nationalId, setNationalID] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Verify that HealthCard.json contains an ABI array
        if (HealthCard.abi && Array.isArray(HealthCard.abi)) {
          const contract = new ethers.Contract(
            contractAddress,
            HealthCard.abi,
            provider
          );
          setContract(contract);

          const accessApprovedFilter = contract.filters.AccessApproved(
            null,
            null
          );
          contract.on(accessApprovedFilter, (patient, provider) => {
            console.log(`Access approved for ${patient} by ${provider}`);
            // history.push("/hpdashboard");
          });

          return () => {
            contract.off(accessApprovedFilter);
          };
        } else {
          console.error("ABI is missing or not an array in HealthCard.json");
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
    if (contract) {
      try {
        await contract.requestAccess(nationalId);
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
