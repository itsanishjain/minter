const { ethers } = require("hardhat");

async function main() {
  const Web3RocksTokenContract = await ethers.getContractFactory(
    "Web3RocksToken"
  );

  const deployWeb3RocksTokenContract = await Web3RocksTokenContract.deploy(
    "0xECFE0b36566AbEE8326559ED5f08eF2071b59991"
  );

  await deployWeb3RocksTokenContract.deployed();
  console.log("Address", deployWeb3RocksTokenContract.address);

}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
