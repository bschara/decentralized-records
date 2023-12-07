const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const url =
    "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY";

  let artifacts = await hre.artifacts.readArtifact("HealthCard");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey =
    "270b40805f11ff0b423bdf04ab4b5669a37f98120cbf8bfd179a3a9857025144";

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let token = await factory.deploy(
    "0x368c5122C098b5875B7750b9904407cB974a4A5b"
  );

  console.log("Contract address:", token.address);

  await token.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
