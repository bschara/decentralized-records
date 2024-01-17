const { Web3Storage, File } = require("web3.storage");

const initializeStorage = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEMyRTk5NzhBQjkyNzMyZjE5YTY1ODJDOTlhMzg2Q2Q4OTg1QzUxZUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE3MDA2ODI3MTkwMzMsIm5hbWUiOiJ0b2tlbjEifQ.RgoWADw1Ki8TshkcO3HbXBp4eer9inD9lnz4G6Z208U";

  if (!token) {
    console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
    return;
  }

  const storage = new Web3Storage({ token });

  const files = prepareFiles();
  const cid = await storage.put(files);

  console.log("Content added with CID:", cid);
  return cid;
};

function prepareFiles() {
  const data = " ";

  return [new File([data], "storage.txt")];
}

initializeStorage();

module.exports = { initializeStorage };
