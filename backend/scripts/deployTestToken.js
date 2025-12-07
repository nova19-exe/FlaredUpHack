const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory("TestToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const addr = await token.getAddress();
  console.log("✅ TestToken deployed to:", addr);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
