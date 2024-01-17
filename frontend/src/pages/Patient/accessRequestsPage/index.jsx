import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
import SideBar from "../../../components/sidebar/SideBar.jsx";
import "./accessRequests.css";

const AccessRequestsPage = () => {
  const [accessRequests, setAccessRequests] = useState([]);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY"
  );
  const contractAddress = "0x18617D855BCe228d40Ee4FddF1F01aB5D7f66A33";
  const wallet = new ethers.Wallet(
    "dba7659f137d3367f419e9f59822fabee8c7e4edf1b2477b6f6628d3130fd0be",
    provider
  );
  const contract = new ethers.Contract(contractAddress, HealthCard.abi, wallet);

  useEffect(() => {
    const fetchAccessRequests = async () => {
      const fetchedAccessRequests = await contract.getAccessRequests(
        wallet.address
      );

      setAccessRequests(fetchedAccessRequests);
    };

    fetchAccessRequests();
  }, [contract, wallet.address]);

  const handleGrantAccess = async (hprovider, duration) => {
    try {
      await contract.approveAccess(hprovider, duration);

      const fetchedAccessRequests = await contract.getAccessRequests(
        wallet.address
      );
      setAccessRequests(fetchedAccessRequests);
    } catch (error) {
      console.error("Error granting access:", error.message);
    }
  };

  const handleRejectAccess = async (hprovider) => {
    try {
      await contract.rejectAccess(hprovider);

      const fetchedAccessRequests = await contract.getAccessRequests(
        wallet.address
      );
      setAccessRequests(fetchedAccessRequests);
    } catch (error) {
      console.error("Error rejecting access:", error.message);
    }
  };

  return (
    <div className="elements-1">
      <SideBar />
      <div className="access-requests-container">
        <h2>Access Requests</h2>
        <ul>
          {accessRequests.map((request, index) => (
            <li key={index}>
              Provider: {request.hpprovider} - Patient: {request.patient} -
              Status: {request.status}
              <button
                onClick={() => handleGrantAccess(request.hpprovider, 12334)}
              >
                Grant Access
              </button>
              <button onClick={() => handleRejectAccess(request.hpprovider)}>
                Reject Access
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccessRequestsPage;
