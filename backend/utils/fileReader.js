// const fs = require("fs").promises;

// const filePath = "test.txt";

// async function readDataFromFile() {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     const entries = data
//       .split("\n")
//       .filter((entry) => entry.trim() !== "")
//       .map((entry) => {
//         const [ipfsLink, char] = entry.split(":").map((item) => item.trim());
//         return { ipfsLink, char };
//       });
//     return entries;
//   } catch (error) {
//     console.error("Error reading data from file:", error.message);
//     return [];
//   }
// }

// async function updateEntry(ipfsLinkToUpdate, newChar) {
//   try {
//     let entries = await readDataFromFile();
//     const indexToUpdate = entries.findIndex(
//       (entry) => entry.ipfsLink === ipfsLinkToUpdate
//     );

//     if (indexToUpdate !== -1) {
//       entries[indexToUpdate].char = newChar;
//       await writeDataToFile(entries);
//       console.log("Entry updated successfully.");
//     } else {
//       console.log("Entry not found.");
//     }
//   } catch (error) {
//     console.error("Error updating entry:", error.message);
//   }
// }

// async function addEntry(ipfsLink, char) {
//   try {
//     const entries = await readDataFromFile();
//     entries.push({ ipfsLink, char });
//     await writeDataToFile(entries);
//     console.log("Entry added successfully.");
//   } catch (error) {
//     console.error("Error adding entry:", error.message);
//   }
// }

// async function deleteEntry(ipfsLinkToDelete) {
//   try {
//     let entries = await readDataFromFile();
//     entries = entries.filter((entry) => entry.ipfsLink !== ipfsLinkToDelete);
//     await writeDataToFile(entries);
//     console.log("Entry deleted successfully.");
//   } catch (error) {
//     console.error("Error deleting entry:", error.message);
//   }
// }

// async function writeDataToFile(entries) {
//   const formattedData = entries
//     .map((entry) => `${entry.ipfsLink}:${entry.char}`)
//     .join("\n");
//   await fs.writeFile(filePath, formattedData);
// }

// // Example usage:
// // Uncomment and modify the lines below as needed

// // readDataFromFile().then((entries) => console.log(entries));

// // updateEntry("ipfs2", "z");

// // addEntry("ipfs3", "c");

// // deleteEntry("ipfs3");

// module.exports = { readDataFromFile, updateEntry, addEntry, deleteEntry };

const process = require("process");
const { Web3Storage, File } = require("web3.storage");
require("dotenv").config({ path: "../.env" });

async function readDataFromFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const entries = data
      .split("\n")
      .filter((entry) => entry.trim() !== "")
      .map((entry) => {
        const [ipfsLink, char] = entry.split(":").map((item) => item.trim());
        return { ipfsLink, char };
      });
    return entries;
  } catch (error) {
    console.error("Error reading data from file:", error.message);
    return [];
  }
}

async function updateEntry(ipfsLinkToUpdate, newChar) {
  try {
    let entries = await readDataFromFile();
    const indexToUpdate = entries.findIndex(
      (entry) => entry.ipfsLink === ipfsLinkToUpdate
    );

    if (indexToUpdate !== -1) {
      entries[indexToUpdate].char = newChar;
      await writeDataToFile(entries);
      console.log("Entry updated successfully.");
    } else {
      console.log("Entry not found.");
    }
  } catch (error) {
    console.error("Error updating entry:", error.message);
  }
}

async function addEntry(ipfsLink, char) {
  try {
    const entries = await readDataFromFile();
    entries.push({ ipfsLink, char });
    await writeDataToFile(entries);
    console.log("Entry added successfully.");
  } catch (error) {
    console.error("Error adding entry:", error.message);
  }
}

async function deleteEntry(ipfsLinkToDelete) {
  try {
    let entries = await readDataFromFile();
    entries = entries.filter((entry) => entry.ipfsLink !== ipfsLinkToDelete);
    await writeDataToFile(entries);
    console.log("Entry deleted successfully.");
  } catch (error) {
    console.error("Error deleting entry:", error.message);
  }
}

async function writeDataToFile(entries) {
  const formattedData = entries
    .map((entry) => `${entry.ipfsLink}:${entry.char}`)
    .join("\n");
  await fs.writeFile(filePath, formattedData);
}

// Example usage:
// Uncomment and modify the lines below as needed

// readDataFromFile().then((entries) => console.log(entries));

// updateEntry("ipfs2", "z");

// addEntry("ipfs3", "c");

// deleteEntry("ipfs3");

module.exports = { readDataFromFile, updateEntry, addEntry, deleteEntry };

async function generateFile() {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  const contents = [];
  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }

  const storage = new Web3Storage({ token });
  const res = await storage.get(
    "bafybeic7c3kvy75te7zyjg66z26gxt45qi7ls2t7rkwnhglzxra6h7o5t4"
  );
  const files = await res.files();

  for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
    const content = await file.text();
    contents.push(content);
  }
  return contents;
}

async function getWhatever() {
  const content = await generateFile();
  console.log(content);
}

getWhatever();
