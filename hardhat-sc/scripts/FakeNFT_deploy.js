const { ethers } = require("hardhat");

async function main() {
  const fakeNFTMarketplaceContract = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );

  const deployFakeNFTMarketplace = await fakeNFTMarketplaceContract.deploy();

  await deployFakeNFTMarketplace.deployed();

  console.log("ADDRESS:::", deployFakeNFTMarketplace.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
