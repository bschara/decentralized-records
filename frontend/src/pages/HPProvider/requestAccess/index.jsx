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
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY"
    );
    const contractAddress = "0x18617D855BCe228d40Ee4FddF1F01aB5D7f66A33";
    const wallet = new ethers.Wallet(
      "270b40805f11ff0b423bdf04ab4b5669a37f98120cbf8bfd179a3a9857025144",
      provider
    );
    // const wallet = new ethers.Wallet(
    //   "5149b8c79b16b50c1af6f759fe30dc8dcdd0921a8500a66becbedf23a207d00d",
    //   provider
    // );
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
// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { useNavigate } from "react-router-dom"; // Import useHistory
// import HealthCard from "../../../assets/HealthCard.json";
// import "./requestAccess.css";

// export const RequestAccessPage = () => {
//   const navigate = useNavigate();
//   const [nationalId, setNationalID] = useState("");
//   const [accessApproved, setAccessApproved] = useState(false);

//   useEffect(() => {
//     // No need for a persistent event listener in this version
//   }, []);

//   const handleChange = (event) => {
//     setNationalID(event.target.value);
//   };

//   const handleAccessRequest = async () => {
//     const provider = new ethers.providers.JsonRpcProvider(
//       "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY"
//     );
//     const contractAddress = "0xb26619aaB4Eb475fd1baB9Ea96593B02Cfb78f3F";
//     const wallet = new ethers.Wallet(
//       "270b40805f11ff0b423bdf04ab4b5669a37f98120cbf8bfd179a3a9857025144",
//       provider
//     );
//     // const wallet = new ethers.Wallet(
//     //   "5149b8c79b16b50c1af6f759fe30dc8dcdd0921a8500a66becbedf23a207d00d",
//     //   provider
//     // );
//     const contract = new ethers.Contract(
//       contractAddress,
//       HealthCard.abi,
//       wallet
//     );

//     try {
//       await contract.requestAccess(nationalId);
//       console.log(`Access requested for ${nationalId}`);
//       contract.once("AccessApproved", (patient, hpprovider) => {
//         console.log(`Access approved for ${patient} by ${hpprovider}`);
//         setAccessApproved(true);
//         handleProceed();
//       });
//     } catch (error) {
//       console.error("Error requesting access:", error.message);
//     }
//   };

//   const handleProceed = () => {
//     console.log("Proceeding after access approval");
//     // Navigate to a new page (replace '/new-page' with your desired route)
//     navigate("/new-page");
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={nationalId}
//         onChange={handleChange}
//         placeholder="Enter patient ID"
//       />
//       <button onClick={handleAccessRequest}>Request Access</button>
//       {accessApproved && (
//         <div>
//           <p>Access Approved! Proceed:</p>
//           {/* Proceed button now calls handleProceed directly */}
//           <button onClick={handleProceed}>Proceed</button>
//         </div>
//       )}
//     </div>
//   );
// };
