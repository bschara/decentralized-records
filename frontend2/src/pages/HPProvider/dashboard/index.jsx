import HPSidebar from "../../../components/HPSidebar/HPSidebar.jsx";
import "./hpDashboard.css";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/material/Icon";
// import Header from "./components/header.jsx";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";

const { getContent, addCID } = require("../../../utils/ipfsCrud.js");

async function getStorageLink(id) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY"
  );
  const contractAddress = "0x8A5aa280e5B6C4b454b5cdfBdAD8dC5aFB992bfd";
  const wallet = new ethers.Wallet(
    "dba7659f137d3367f419e9f59822fabee8c7e4edf1b2477b6f6628d3130fd0be",
    provider
  );
  const contract = new ethers.Contract(contractAddress, HealthCard.abi, wallet);
  const result = await contract.getStorageLinkPatient(id);
  console.log("Storage Link wehyet allah:", result);
}

const HPDashboard = () => {
  const [content, setContent] = useState({});
  const [deletedFiles, setDeletedFiles] = useState([]);

  const link = getStorageLink("id1");
  console.log("Storage Link ya estez bchara: ", link);

  async function getContentAndOrganize(cid) {
    try {
      const data = await getContent(cid);
      console.log(data);

      if (!isValidData(data)) {
        console.error("Invalid data format. Expected a valid string.");
        return;
      }

      const organizedContent = processContentData(data);
      console.log("Organized content:", organizedContent);

      setContent(organizedContent);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  const getAccordionTitle = (prefix) => {
    const titleMap = {
      l: "Lab Results",
      m: "Medical Images",
      p: "Prescriptions",
      t: "treatment history",
      d: "diagnoses",
    };

    return titleMap[prefix] || "";
  };

  const isValidData = (data) => {
    return typeof data === "string";
  };

  const processContentData = (data) => {
    const lines = data.trim().split("\n");

    const organizedContent = lines.reduce((acc, line) => {
      const parts = line.split(":");
      if (parts.length === 2) {
        const [cid, prefix] = parts;
        acc[prefix.trim()] = [...(acc[prefix.trim()] || []), cid.trim()];
      } else {
        console.error(`Invalid data format for line: ${line}`);
      }
      return acc;
    }, {});

    return organizedContent;
  };

  useEffect(() => {
    getContentAndOrganize(
      "bafybeid626id3zmuttmytfpkwz7vwdn4eqb4vi56iwqqlovapsgx4lzxsi"
    );
  }, []);

  const handleDeleteFile = (prefix, cid) => {
    // Perform any additional logic if needed for file deletion

    // Update the deletedFiles state
    setDeletedFiles([...deletedFiles, { prefix, cid }]);
  };
  return (
    <>
      <div className="head-page">{/* <Header /> */}</div>
      <div className="header-component">
        <div className="nabil">
          <HPSidebar />
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
};
export default HPDashboard;
