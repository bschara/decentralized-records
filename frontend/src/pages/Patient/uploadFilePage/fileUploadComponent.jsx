import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import "./fileComponent.css";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";

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

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMyRTk5NzhBQjkyNzMyZjE5YTY1ODJDOTlhMzg2Q2Q4OTg1QzUxZUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE3MDA2ODI3MTkwMzMsIm5hbWUiOiJ0b2tlbjEifQ.RgoWADw1Ki8TshkcO3HbXBp4eer9inD9lnz4G6Z208U";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const cid = await storeFiles(selectedFile);
      const originalCid = await getStorageLink();
      addCID(originalCid, cid, selectedValue);
      console.log("Uploading file:", selectedFile);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="main=form">
      <h2>File Upload Form</h2>
      <div className="column">
        <input type="file" onChange={handleFileChange} />
        <select
          id="dropdown"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="">Select...</option>
          <option value="l">lab results</option>
          <option value="p">prescriptions</option>
          <option value="m">medical images</option>
          <option value="d">diagnoses</option>
          <option value="t">treatment history</option>
        </select>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default FileUploadComponent;
