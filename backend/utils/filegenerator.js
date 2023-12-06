const process = require("process");
const minimist = require("minimist");
const { Web3Storage, File } = require("web3.storage");
require("dotenv").config({ path: "../.env" });

async function generateFile(token) {
  // const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  console.log(token);

  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }

  const storage = new Web3Storage({ token });

  const files = prepareFiles();
  const cid = await storage.put(files);

  return "Content added with CID: " + cid;
}

function prepareFiles() {
  const data = "";

  return [new File([data], "/dir/data.txt")];
}

module.exports = generateFile;
