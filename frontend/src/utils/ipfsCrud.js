const { Web3Storage, File } = require("web3.storage");

async function getContent(cid) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMyRTk5NzhBQjkyNzMyZjE5YTY1ODJDOTlhMzg2Q2Q4OTg1QzUxZUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE3MDA2ODI3MTkwMzMsIm5hbWUiOiJ0b2tlbjEifQ.RgoWADw1Ki8TshkcO3HbXBp4eer9inD9lnz4G6Z208U";
  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }
  const storage = new Web3Storage({ token });
  const res = await storage.get(cid);
  const files = await res.files();
  for (const file of files) {
    console.log(`${file.cid} ${file.name} ${file.size}`);
    const content = await file.text();
    console.log(content);
    return content;
  }
}

async function addCID(originalCID, cid, char) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMyRTk5NzhBQjkyNzMyZjE5YTY1ODJDOTlhMzg2Q2Q4OTg1QzUxZUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE3MDA2ODI3MTkwMzMsIm5hbWUiOiJ0b2tlbjEifQ.RgoWADw1Ki8TshkcO3HbXBp4eer9inD9lnz4G6Z208U";
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMyRTk5NzhBQjkyNzMyZjE5YTY1ODJDOTlhMzg2Q2Q4OTg1QzUxZUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE3MDA2ODI3MTkwMzMsIm5hbWUiOiJ0b2tlbjEifQ.RgoWADw1Ki8TshkcO3HbXBp4eer9inD9lnz4G6Z208U";
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

module.exports = { getContent, addCID, deleteByCID };
