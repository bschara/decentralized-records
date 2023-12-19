import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import "./fileComponent.css";
import { ethers } from "ethers";
import HealthCard from "../../../assets/HealthCard.json";

const { addCID } = require("../../../utils/ipfsCrud.js");

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

  //change it in contract and fix the parameters
  // const result = await contract.getStorageLinkForHp(id);

  // console.log("Storage Link ya estez bchara:", result);
}

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const originalCid = getStorageLink("id1");
  console.log(originalCid);

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
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY"
    );
    const contractAddress = "0x8A5aa280e5B6C4b454b5cdfBdAD8dC5aFB992bfd";
    const wallet = new ethers.Wallet(
      "dba7659f137d3367f419e9f59822fabee8c7e4edf1b2477b6f6628d3130fd0be",
      provider
    );
    const contract = new ethers.Contract(
      contractAddress,
      HealthCard.abi,
      wallet
    );
    if (selectedFile) {
      const cid = await storeFiles(selectedFile);
      const cidO =
        "bafybeicfsidzxa4viekhleb4tethulgn5bmcbn7trslbqalg6rt2yhys34";
      const newLink = await addCID(cidO, cid, selectedValue);
      console.log("Uploading file:", selectedFile);
      await contract.changeStorageLink(newLink);
      console.log("successfully updated storage link");
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
