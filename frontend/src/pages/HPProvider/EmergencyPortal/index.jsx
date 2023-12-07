import React, { useState } from "react";
import HealthCard from "../../../assets/HealthCard.json";
import Web3 from "web3";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const web3 = new Web3(window.ethereum);

// Ensure HealthCard.json is a valid JSON file with the "abi" property
const abi =
  HealthCard.abi && Array.isArray(HealthCard.abi) ? HealthCard.abi : [];

const healthCardContract = new web3.eth.Contract(abi, contractAddress);

export const EmergencyPortal = () => {
  const [userAddress, setUserAddress] = useState("");
  const [emergencyContactAddress, setEmergencyContactAddress] = useState("");
  const [hpProviderAddress, setHpProviderAddress] = useState("");

  async function addEmergencyContact(patientAddress, emergencyContactAddress) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];

      await healthCardContract.methods
        .addEmergencyContact(patientAddress, emergencyContactAddress)
        .send({ from: userAddress });

      console.log("Emergency contact added successfully");
    } catch (error) {
      console.error("Error adding emergency contact", error);
    }
  }

  async function grantAccessToHP(patientAddress, hpProviderAddress, duration) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];
      await healthCardContract.methods
        .grantAccessToHP(patientAddress, hpProviderAddress, duration)
        .send({ from: userAddress });
      console.log("Access granted to healthcare provider successfully");
    } catch (error) {
      console.error("Error granting access to healthcare provider", error);
    }
  }

  return (
    <>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Enter user address"
      />{" "}
      <input
        type="text"
        value={emergencyContactAddress}
        onChange={(e) => setEmergencyContactAddress(e.target.value)}
        placeholder="Enter emergency contact address"
      />{" "}
      <input
        type="text"
        value={hpProviderAddress}
        onChange={(e) => setHpProviderAddress(e.target.value)}
        placeholder="Enter hp provider address"
      />
      <button
        onClick={() =>
          addEmergencyContact(userAddress, emergencyContactAddress)
        }
      >
        Add Emergency Contact
      </button>
      <button
        onClick={() => grantAccessToHP(userAddress, hpProviderAddress, 86400)}
      >
        Grant Access to Healthcare Provider
      </button>
    </>
  );
};
