const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  const SmartAccount = await ethers.getContractFactory("SmartAccount");

  // ✅ Pass constructor argument (temporary hedging manager)
  const smartAccount = await SmartAccount.deploy(deployer.address);

  // ✅ Ethers v6 correct deploy wait
  await smartAccount.waitForDeployment();

  const contractAddress = await smartAccount.getAddress();

  console.log("✅ SmartAccount deployed to:", contractAddress);
  console.log("✅ Temporary HedgingManager set to:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
