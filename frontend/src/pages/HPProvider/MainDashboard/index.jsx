import HPSideBar from "../../../components/HPSidebar/HPSidebar.jsx";
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
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const contract = new ethers.Contract(contractAddress, HealthCard.abi, wallet);

  // Call the getStorageLinkPatient function
  const result = await contract.getStorageLinkPatient(id);

  console.log("Storage Link:", result);
}

const HPMainDashboard = () => {
  const [content, setContent] = useState({});

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
      "bafybeif2ks2f7dgt3go5xexp5zvpts7gypftfcp7kz75lz3icn5ns7574a"
    );
  }, []);

  return (
    <>
      <div className="head-page">
        <Header />
      </div>
      <div className="header-component">
        <div className="nabil">
          <HPSideBar />
        </div>
        <div className="accordions-container">
          {Object.entries(content).map(([prefix, cids]) => (
            <Accordion key={prefix} className="Accordion-root">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{getAccordionTitle(prefix)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {cids.map((cid, index) => (
                    <div key={index}>
                      <Link
                        href={`http://${cid}.ipfs.dweb.link`}
                        target="_blank"
                        rel="noopener noreferrer"
                        component="a"
                      >
                        {cid}
                      </Link>
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
};

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

export default HPMainDashboard;
