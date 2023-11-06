const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const generateRandomFile = () => {
  const randomFileName = `${uuidv4()}.txt`;

  fs.writeFile(randomFileName, "", (err) => {
    if (err) {
      console.error("Error creating the file:", err);
    } else {
      console.log("Empty file created with random name:", randomFileName);
    }
  });
};

function getAccessToken() {
  return process.env.WEB3_STORAGE_ACCESS_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const handleUpload = async () => {
  if (selectedFile) {
    try {
      const client = makeStorageClient();
      const cid = await client.put([selectedFile]);
      console.log("Stored files with CID:", cid);
      return cid;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    alert("Please select a file to upload.");
  }
};

export default { generateRandomFile, handleUpload };
