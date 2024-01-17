const process = require("process");
const minimist = require("minimist");
const { Web3Storage, File } = require("web3.storage");
require("dotenv").config({ path: "../.env" });

const initializeStorage = async () => {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  // console.log(token);

  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }

  const storage = new Web3Storage({ token });

  const files = prepareFiles();
  const cid = await storage.put(files);

  // console.log("Content added with CID:", cid);
  return cid;
};

function prepareFiles() {
  const data = "";

  return [new File([data], "storage.txt")];
}

module.exports = { initializeStorage };
