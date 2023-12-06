const express = require("express");
const app = express();
const port = 3000;
const { Web3Storage } = require("web3.storage");
const generateFile = require("./utils/filegenerator");
require("dotenv").config({ path: "./.env" });
const {
  generateName,
  postContent,
  retrieveContent,
  updateContent,
} = require("./utils/w3utils");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/store-files", async (req, res) => {
  const token = process.env.WEB3_STORAGE_ACCESS_TOKEN;
  console.log(token);
  try {
    const result = await generateFile(token);
    return res.json(result);
  } catch (error) {
    console.error("Error generating file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/try-w3", async (req, res) => {
  try {
    const name = await generateName();
    return res.json(name.toString());
  } catch (err) {
    return res.json(err);
  }
});

// app.post("/post-content", async (req, res) => {
//   try {
//     const { name } = req.query.name;
//     if (!name) {
//       return res
//         .status(400)
//         .json({ error: "Name is required in the request body." });
//     }
//     // await postContent(name);
//     return res.return(await postContent(name));
//   } catch (err) {
//     return res.json(err);
//   }
// });

app.post("/post-content", async (req, res) => {
  try {
    // console.log(req.query.name);
    const name = req.query.name;
    // console.log(name);

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name is required in the request parameters." });
    }

    const result = await postContent(name);

    return res.json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/get-content", async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res
        .status(400)
        .json({ error: "Name is required in the request body." });
    }
    const result = await retrieveContent(name);
    return res.json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
