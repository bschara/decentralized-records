const hre = require("hardhat");

async function main() {
  // Assuming you have the contract factory
  const HealthCard = await hre.ethers.getContractFactory("HealthCard");

  // Deploy the contract
  const healthCard = await HealthCard.deploy(
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  );

  // Wait for deployment
  // await healthCard.deployed();

  console.log("HealthCard deployed to:", healthCard.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
