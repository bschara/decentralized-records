import React, { useState, useEffect } from "react";
import Web3 from "web3";

const SignupComponent = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [web3, setWeb3] = useState(null);

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

  const handleSignup = (e) => {
    e.preventDefault();
    if (!identityNumber || !walletAddress) {
      alert("Please fill in all the fields and connect your wallet.");
    } else {
      alert("Signup successful!");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={requestWalletAddress}>Connect Wallet (MetaMask)</button>
      <div>
        {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
      </div>
      <form onSubmit={handleSignup}>
        <label>
          Identity Number:
          <input
            type="text"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupComponent;
