const Name = require("w3name");
const fs = require("fs");
const nacl = require("tweetnacl");
const util = require("util");

const generateName = async () => {
  const name = await Name.create();
  return name;
};

const postContent = async () => {
  // const value = "bafybeidkshxgx433exhcjahofli2aqqa5iwyfuwpxlhyrkmlitfibpyuym";
  const value = "bafkreido357rutzd5a7p45qko45vxmr4327mzwq2eitfhov5cxo6writje";
  const name = await Name.create();
  console.log(name.toString());
  console.log(name.key);

  const revision = await Name.v0(name, value);
  await Name.publish(revision, name.key);

  console.log(revision);
  return revision;
};

// const postContent = async () => {
//   // const value = "bafybeidkshxgx433exhcjahofli2aqqa5iwyfuwpxlhyrkmlitfibpyuym";
//   const value = "bafkreido357rutzd5a7p45qko45vxmr4327mzwq2eitfhov5cxo6writje";
//   // const name = await Name.create();
//   // console.log(name.toString());
//   // console.log(JSON.stringify(name.key));
//   const name = Name.parse(
//     "k51qzi5uqu5dm3pmp5b46x2kfv5uvhttsqpvc1v0mcvj7zjwb5iq9d37rerbjm"
//   );
//   console.log(name);
//   const key = loadNewKey();
//   console.log("0");

//   console.log(key);
//   console.log("1");
//   const revision = await Name.v0(name, value);
//   console.log(revision);
//   console.log("2");

//   await Name.publish(revision, key);
//   console.log("3");

//   console.log(revision);
//   console.log("4");

//   return revision;
// };

const getUploadedContent = async () => {
  const name = Name.parse(
    "k51qzi5uqu5dlxrdn8cqys8dbnpj9r4ned078tgbj5f55m3406jh85rhi0eu2f"
  );
  const revision = await Name.resolve(name);
  console.log("Resolved value:", revision.value);
};

// const updateContent = async (name, value) => {
//   const nextValue = value;
//   const nextRevision = await Name.increment(revision, nextValue);
//   // const name = Name.parse(name);
//   await Name.publish(nextRevision, name.key);
// };

const saveSigningKey = async (outputFilename) => {
  const name = await Name.create();
  console.log(name.toString());
  const bytes = name.key.bytes;
  await fs.promises.writeFile(outputFilename, bytes);
};

async function loadSigningKey(filename) {
  const bytes = await fs.promises.readFile(filename);
  const name = await Name.from(bytes);
  console.log(name);
  return [name, name.key];
}

const saveNewKey = async () => {
  try {
    const name = await Name.create(); // Replace with your actual function for creating a Name
    console.log(name.toString());

    // Assuming name.key is an Ed25519PrivateKey instance
    const secretKeyBytes = new Uint8Array(name.key._key); // Assuming _key contains the secret key bytes
    const keyPair = nacl.sign.keyPair.fromSecretKey(secretKeyBytes);

    const privateKeyData = {
      _key: Array.from(keyPair.secretKey),
      _publicKey: Array.from(keyPair.publicKey),
    };

    const jsonString = JSON.stringify(privateKeyData, null, 2);
    fs.writeFileSync("privateKey.json", jsonString);

    console.log("Private key saved successfully.");
  } catch (error) {
    console.error("Error saving private key:", util.inspect(error));
  }
};
const loadNewKey = () => {
  try {
    const jsonString = fs.readFileSync("privateKey.json", "utf8");
    const privateKeyData = JSON.parse(jsonString);

    const secretKeyBytes = new Uint8Array(privateKeyData._secretKey);
    const publicKeyBytes = new Uint8Array(privateKeyData._publicKey);

    const reconstructedKeyPair = {
      _key: secretKeyBytes,
      _publicKey: publicKeyBytes,
    };

    console.log("Private key loaded successfully.");
    return reconstructedKeyPair;
  } catch (error) {
    console.error("Error loading private key:", util.inspect(error));
    throw error;
  }
};
postContent();
// saveNewKey();
// const loadedKeyPair = loadNewKey();
// console.log("Loaded Key Pair:", loadedKeyPair);
// getUploadedContent();
