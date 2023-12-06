const fs = require("fs").promises;

const filePath = "test.txt";

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

readDataFromFile().then((entries) => console.log(entries));

// updateEntry("ipfs2", "z");

// addEntry("ipfs3", "c");

// deleteEntry("ipfs3");
