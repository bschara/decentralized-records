import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
import { useNavigate } from "react-router-dom";
import "./requestAccess.css";

export const RequestAccessPage = () => {
  const navigate = useNavigate();
  const [nationalId, setNationalID] = useState("");

  const handleChange = (event) => {
    setNationalID(event.target.value);
  };

  const handleAccessRequest = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const key = process.env.KEY2;
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(
      contractAddress,
      HealthCard.abi,
      wallet
    );
    try {
      // Call the requestAccess function using the signer
      await contract.requestAccess(nationalId);
      console.log(`Access requested for ${nationalId}`);
      contract.on("AccessApproved", (patient, hpprovider) => {
        console.log(`Access approved for ${patient} by ${hpprovider}`);
        navigate("/hpdashboard");
      });
    } catch (error) {
      console.error("Error requesting access:", error.message);
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
