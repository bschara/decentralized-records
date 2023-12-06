// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import HealhCard from "../../assets/HealthCard.json";

// const LoginComponent = () => {
//   // const web3 = new Web3("http://localhost:8545");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [web3, setWeb3] = useState(null);
//   const [isRegistered, setIsRegistered] = useState(false);

//   const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
//   const contractABI = HealhCard; // Insert your contract ABI here

//   // Instantiate the contract
//   const healthCardContract = new web3.eth.Contract(
//     contractABI,
//     contractAddress
//   );

//   //  const handleLogin = () => {

//   //  }

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       // setWeb3(web3Instance);
//     }
//   }, []);

//   const requestWalletAddress = async () => {
//     if (web3) {
//       try {
//         const accounts = await web3.eth.requestAccounts();
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       alert("MetaMask not detected. Please install it.");
//     }
//   };

//   const handleLogin = async () => {
//     if (!web3) {
//       alert("MetaMask not detected. Please install it.");
//     } else if (!walletAddress) {
//       alert("Please connect your wallet before logging in.");
//     } else {
//       const isWalletRegistered = await healthCardContract.methods.isRegistered(
//         walletAddress
//       );
//       if (isWalletRegistered) {
//         alert("Login successful!");
//         setIsRegistered(true);
//       } else {
//         alert("Wallet is not registered. Please sign up.");
//       }
//     }
//   };

//   const checkWalletRegistration = async (walletAddress) => {
//     return true;
//   };

//   return (
//     <div>
//       <h2>Login </h2>
//       <button onClick={requestWalletAddress}>Connect Wallet (MetaMask)</button>
//       <div>
//         {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
//       </div>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginComponent;

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import HealthCard from "../../../assets/HealthCard.json";

const LoginComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const contractABI = HealthCard.abi; // Use `.abi` to access the ABI from the imported JSON
  const healthCardContract = web3
    ? new web3.eth.Contract(contractABI, contractAddress)
    : null;

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable(); // Request user permission
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
          alert("Login successful!");
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
