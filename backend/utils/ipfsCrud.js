const process = require("process");
const minimist = require("minimist");
const { Web3Storage, File } = require("web3.storage");
require("dotenv").config({ path: "../.env" });

async function generateFile() {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }
  const storage = new Web3Storage({ token });
  const res = await storage.get(
    "bafybeig6ylojympoibx2azrigpihrchyosk6l2kgrtgebncleetsuob5g4"
  );
  const files = await res.files();
  for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
    const content = await file.text();
    return content;
  }
}

async function addCID(originalCID, cid, char) {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }
  const storage = new Web3Storage({ token });
  const res = await storage.get(originalCID);
  const files = await res.files();
  for (const file of files) {
    const content = await file.text();
    console.log(`Original Content:\n${content}`);
    const newContent = `${content.trim()}\n${cid}:${char}`;
    console.log(`New Content:\n${newContent}`);
    const updatedFile = new File([newContent], "updatedFile" + 1);
    const updatedFileCid = await storage.put([updatedFile]);
    console.log(`Added: ${cid}:${char}`);
    console.log(`Updated File CID: ${updatedFileCid}`);
  }
}

async function deleteByCID(originalCID, cidsToDelete) {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }
  const storage = new Web3Storage({ token });
  const fileCID = originalCID;
  try {
    const res = await storage.get(fileCID);
    const files = await res.files();
    const file = files[0];
    let content = await file.text();
    const cidsArray = Array.isArray(cidsToDelete)
      ? cidsToDelete
      : [cidsToDelete];
    cidsArray.forEach((cid) => {
      const regex = new RegExp(`${cid}:.*\n?`, "g");
      content = content.replace(regex, "");
    });
    const updatedFile = new File([content.trim()], file.name);
    const updatedFileCid = await storage.put([updatedFile]);
    console.log(`Deleted: ${cidsArray.join(", ")}`);
    console.log(`Updated File CID: ${updatedFileCid}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { generateFile, addCID, deleteByCID };
