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
import { deleteByCID } from "../../../utils/ipfsCrud.js";
// import Header from "./components/header.jsx";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";

const { getContent } = require("../../../utils/ipfsCrud.js");

async function getStorageLink(id) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const key = process.env.SECRET_KEY;
  const wallet = new ethers.Wallet(key, provider);
  const contract = new ethers.Contract(contractAddress, HealthCard.abi, wallet);
  const result = await contract.getStorageLinkPatient(id);
  console.log("Storage Link wehyet allah:", result);
  return result;
}

const HPDashboard = () => {
  const [content, setContent] = useState({});
  const [deletedFiles, setDeletedFiles] = useState([]);

  const link = getStorageLink("id1");

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
    const fetchData = async () => {
      const link = await getStorageLink("id1");
      getContentAndOrganize(link);
    };

    fetchData();
  }, []);

  const handleDeleteFile = async (prefix, cid) => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const key = process.env.SECRET_KEY;
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(
      contractAddress,
      HealthCard.abi,
      wallet
    );
    const newLink = await deleteByCID(prefix, cid);
    console.log("successfully deleted file:");
    await contract.changeStorageLink(newLink);
    console.log("successfully updated storage link");
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
