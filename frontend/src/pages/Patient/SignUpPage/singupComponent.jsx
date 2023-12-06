import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./signupComponent.css";

const SignupComponent = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [web3, setWeb3] = useState(null);
  const [gender, setGender] = useState("");
  const [BloodType, setBloodType] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [contact3, setContact3] = useState("");
  const [dob, setDob] = useState("");

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
    <div className="main-signup">
      <div className="signup-under">
        <h2 className="main-label">Sign Up</h2>
        <button onClick={requestWalletAddress}>
          Connect Wallet (MetaMask)
        </button>
        <div>
          {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
        </div>
        <form onSubmit={handleSignup} className="signup-form">
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
                required
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
