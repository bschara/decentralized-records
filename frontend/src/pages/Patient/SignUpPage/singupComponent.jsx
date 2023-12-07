import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./signupComponent.css";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
import axios from "axios";

const SignupComponent = () => {
  const [link, setLink] = useState(
    "bafybeiho622zonac5qm3pfbl43oifqnx4wfj42od75hjwgao4tyxy3hheq"
  );
  const [identityNumber, setIdentityNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [gender, setGender] = useState("");
  const [BloodType, setBloodType] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [contact3, setContact3] = useState("");
  const [dob, setDob] = useState("");

  // Connect to the Ethereum network

  // const fetchData = async () => {
  //   const storageLink = await createStorage();
  //   setLink(storageLink);
  //   console.log(storageLink);
  // };
  async function handlesignup() {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const contractAddress = "0x42155016cE4E12B54fCF2B085490B75a37E6ee6a";
    const wallet = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      provider
    );
    const contract = new ethers.Contract(
      contractAddress,
      HealthCard.abi,
      wallet
    );
    try {
      // Call createStorage to obtain the link before minting the health card
      //  const storageLink = await createStorage();
      //  setLink(storageLink);
      setLink("bafybeiho622zonac5qm3pfbl43oifqnx4wfj42od75hjwgao4tyxy3hheq");

      // Ensure dob is a string
      const formattedDob = dob.toString();
      console.log("Wallet Address:", walletAddress);
      console.log("Date of Birth:", formattedDob);
      console.log("Gender:", gender);
      console.log("Blood Type:", BloodType);
      console.log("Identity Number:", identityNumber);
      console.log("Link:", link);

      // Wait for the transaction to be mined
      const transaction = await contract.mintHealthCard(
        "1",
        link, // Use the obtained storageLink
        walletAddress,
        formattedDob,
        gender,
        BloodType,
        identityNumber
      );

      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
      console.log("Transaction receipt:", receipt);

      console.log("Health card minted successfully!");
    } catch (error) {
      console.error("Error while minting health card:", error);
    }
  }

  async function createStorage() {
    try {
      // Use async/await to wait for the axios.post call
      const response = await axios.post("http://localhost:3001/create-storage");
      console.log("Success:", response.data);

      // Return the storage link from the response
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., return a default link or throw an exception
      throw error;
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const requestWalletAddress = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        if (accounts.length > 0) {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  return (
    <div className="main-signup">
      <div className="signup-under">
        <h2 className="main-label">Sign Up</h2>
        <button onClick={requestWalletAddress} className="meta-button">
          Connect Wallet (MetaMask)
        </button>
        <div>
          {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
        </div>
        <form className="signup-form" onSubmit={handlesignup}>
          <div className="first-fields">
            <label>
              Identity Number:
              <input
                type="text"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label>
              Blood type:
              <input
                type="text"
                value={BloodType}
                onChange={(e) => setBloodType(e.target.value)}
              />
            </label>
          </div>
          <div className="second-fields">
            <label>
              Select a Date:
              <input
                type="date"
                name="selectedDate"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </label>
            <label>
              Contact 1:
              <input
                type="text"
                name="contact1"
                value={contact1}
                onChange={(e) => setContact1(e.target.value)}
                // required
              />
            </label>

            <label>
              Contact 2:
              <input
                type="text"
                name="contact2"
                value={contact2}
                onChange={(e) => setContact2(e.target.value)}
              />
            </label>
          </div>
          <div className="third-fields">
            <label>
              Contact 3:
              <input
                type="text"
                name="contact3"
                value={contact3}
                onChange={(e) => setContact3(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
