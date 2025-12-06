import { ethers } from "hardhat";

async function main() {
  // Compile contracts automatically before deployment
  const FTSOConsumer = await ethers.getContractFactory("FTSOConsumer");

  console.log("Deploying FTSOConsumer...");
  const ftsoConsumer = await FTSOConsumer.deploy();
  await ftsoConsumer.deployed();

  console.log(`FTSOConsumer deployed at: ${ftsoConsumer.address}`);

  // Example: Register BTC and XRP providers (replace with real FTSO addresses)
  const BTC_PROVIDER = "0x1234567890abcdef1234567890abcdef12345678"; // Example
  const XRP_PROVIDER = "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"; // Example

  console.log("Registering BTC provider...");
  let tx = await ftsoConsumer.registerPriceProvider("BTC", BTC_PROVIDER);
  await tx.wait();

  console.log("Registering XRP provider...");
  tx = await ftsoConsumer.registerPriceProvider("XRP", XRP_PROVIDER);
  await tx.wait();

  console.log("Providers registered successfully!");
}

// Boilerplate for Hardhat scripts
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});