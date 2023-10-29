import React, { useState, useEffect } from "react";
import Web3 from "web3";

const LoginComponent = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

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
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  const handleLogin = async () => {
    if (!web3) {
      alert("MetaMask not detected. Please install it.");
    } else if (!walletAddress) {
      alert("Please connect your wallet before logging in.");
    } else {
      const isWalletRegistered = await checkWalletRegistration(walletAddress);
      if (isWalletRegistered) {
        alert("Login successful!");
      } else {
        alert("Wallet is not registered. Please sign up.");
      }
    }
  };

  const checkWalletRegistration = async (walletAddress) => {
    return true;
  };

  return (
    <div>
      <h2>Login </h2>
      <button onClick={requestWalletAddress}>Connect Wallet (MetaMask)</button>
      <div>
        {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginComponent;
