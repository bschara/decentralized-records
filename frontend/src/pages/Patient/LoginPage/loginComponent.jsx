import React, { useState, useEffect } from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import Web3 from "web3";
import HealthCard from "../../../assets/HealthCard.json";
import "./loginComponent.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractABI = HealthCard.abi;
  const healthCardContract = web3
    ? new web3.eth.Contract(contractABI, contractAddress)
    : null;

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error("Error initializing web3:", error);
        }
      } else {
        alert("MetaMask not detected. Please install it.");
      }
    };

    initWeb3();
  }, []);

  const requestWalletAddress = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error requesting wallet address:", error);
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
    } else if (healthCardContract) {
      try {
        const isWalletRegistered = await healthCardContract.methods
          .isRegistered(walletAddress)
          .call();
        if (isWalletRegistered) {
          // alert("Login successful!");
          navigate("/patientDashboard");
          setIsRegistered(true);
        } else {
          alert("Wallet is not registered. Please sign up.");
        }
      } catch (error) {
        console.error("Error checking wallet registration:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#28ceb2",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Login</Typography>
        <Button
          onClick={requestWalletAddress}
          variant="contained"
          color="primary"
          className="customButton"
        >
          Connect Wallet (MetaMask)
        </Button>
        <div>
          {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
        </div>
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          className="customButton"
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginComponent;
