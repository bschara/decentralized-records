// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     sepolia: {
//       chainId: 11155111,
//       url: "https://sepolia.infura.io/v3/640bf850ee7f4b18b1c9555476655246",
//       accounts: [
//         "270b40805f11ff0b423bdf04ab4b5669a37f98120cbf8bfd179a3a9857025144",
//       ],
//     },
//   },
// };

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Ehr8P4YHSfptQ4ZzA3lpIANPZIdnsQQY",
      accounts: [
        `270b40805f11ff0b423bdf04ab4b5669a37f98120cbf8bfd179a3a9857025144`,
      ],
    },
  },
};
