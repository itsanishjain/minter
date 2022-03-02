const { ethers } = require("hardhat");

async function main() {
  // const whitelistContract = await ethers.getContractFactory("Whitelist");
  // const whitelistContract = await ethers.getContractFactory("Arrays");
  // const signersArray = await ethers.getSigners();

  // const [owner1,owner2,owner3,addr1] = await ethers.getSigners();

  // console.log(">>>>>>>>>>>>>>>",addr1)

  // console.log(owner1.address)

  // console.log(signersArray.length);
  // let addressList = [];

  // signersArray.map((item) => {
  //   addressList.push(item["address"]);
  // });

  // console.log("ADDRESS", addressList);

  // const deployWhitelistContract = await whitelistContract.deploy(addressList);
  // await deployWhitelistContract.deployed();
  // console.log(deployWhitelistContract.address);

  const CheckContract = await ethers.getContractFactory("CheckContract");
  const deployCheckContract = await CheckContract.deploy();
  await deployCheckContract.deployed();
  await deployCheckContract.isContract();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
