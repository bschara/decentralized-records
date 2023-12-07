import SideBar from "../../../components/sidebar/SideBar.jsx";
import "./mainDashboard.css";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "./components/header.jsx";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";
const { getContent } = require("../../../utils/ipfsCrud.js");
const { addCID } = require("../../../utils/ipfsCrud.js");

async function getStorageLink(id) {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const contractAddress = "0x42155016cE4E12B54fCF2B085490B75a37E6ee6a";
  const wallet = new ethers.Wallet(
    "dba7659f137d3367f419e9f59822fabee8c7e4edf1b2477b6f6628d3130fd0be",
    provider
  );
  const contract = new ethers.Contract(contractAddress, HealthCard.abi, wallet);

  // Call the getStorageLinkPatient function
  const result = await contract.getStorageLinkPatient(id);

  console.log("Storage Link:", result);
}

// getStorageLink("1293");

const MainDashboard = () => {
  const [content, setContent] = useState({});
  const [deletedFiles, setDeletedFiles] = useState([]);

  async function getContentAndOrganize(cid) {
    try {
      const data = await getContent(cid);

      if (!isValidData(data)) {
        console.error("Invalid data format. Expected a valid string.");
        return;
      }

      const organizedContent = processContentData(data);

      setContent(organizedContent);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  const isValidData = (data) => {
    return typeof data === "string";
  };

  const processContentData = (data) => {
    const lines = data.trim().split("\n");

    const organizedContent = lines.reduce((acc, line) => {
      const [cid, prefix] = line.split(":");

      if (!acc[prefix]) {
        acc[prefix] = [];
      }

      acc[prefix].push(cid);
      return acc;
    }, {});

    return organizedContent;
  };

  useEffect(() => {
    // Replace "bafybeidxoxzmhhrfdv34iv3rwtitab7fkqyb4ynoefieckq5ksvsqhjnby"
    // with the actual CID you want to fetch
    getContentAndOrganize(
      "bafybeiekvcn5hxryj23sq5z3dmdzkgx2u26cfm2nw32bzenkx46c3uz5my"
    );
  }, []);

  const handleDeleteFile = (prefix, cid) => {
    // Perform any additional logic if needed for file deletion

    // Update the deletedFiles state
    setDeletedFiles([...deletedFiles, { prefix, cid }]);
  };
  return (
    <>
      <div className="head-page">
        <Header />
      </div>
      <div className="header-component">
        <div className="nabil">
          <SideBar />
        </div>
        <div className="accordions-container">
          {Object.entries(content).map(([prefix, cids]) => (
            <Accordion key={prefix} className="Accordion-root">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{getAccordionTitle(prefix)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {cids
                    .filter((cid) => !deletedFiles.some((df) => df.cid === cid))
                    .map((cid, index) => (
                      <div key={index}>
                        <Link
                          href={`http://${cid}.ipfs.dweb.link`}
                          target="_blank"
                          rel="noopener noreferrer"
                          component="a"
                        >
                          {cid}
                        </Link>
                        <button onClick={() => handleDeleteFile(prefix, cid)}>
                          Delete
                        </button>
                      </div>
                    ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
  // Helper function to get the accordion title based on the prefix
  function getAccordionTitle(prefix) {
    switch (prefix) {
      case "l":
        return "Lab Results";
      case "d":
        return "Diagnoses";
      case "t":
        return "Treatment History";
      case "m":
        return "Medical Images";
      case "p":
        return "Prescriptions";
      default:
        return "Unknown Category";
    }
  }
};
export default MainDashboard;
