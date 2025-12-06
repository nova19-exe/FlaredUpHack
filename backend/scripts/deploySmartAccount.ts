import { ethers } from "hardhat";

async function main() {
  // Get the HedgingManager address from environment or use a placeholder
  const HEDGING_MANAGER_ADDRESS = process.env.HEDGING_MANAGER_ADDRESS || "";
  
  if (!HEDGING_MANAGER_ADDRESS) {
    console.warn("Warning: HEDGING_MANAGER_ADDRESS not set. Using placeholder address.");
    console.warn("You will need to update the contract after deployment.");
  }

  // Compile contracts automatically before deployment
  const SmartAccount = await ethers.getContractFactory("SmartAccount");

  console.log("Deploying SmartAccount...");
  const smartAccount = await SmartAccount.deploy(HEDGING_MANAGER_ADDRESS || ethers.ZeroAddress);
  await smartAccount.waitForDeployment();

  const address = await smartAccount.getAddress();
  console.log(`SmartAccount deployed at: ${address}`);

  // If HedgingManager address was provided, verify the connection
  if (HEDGING_MANAGER_ADDRESS) {
    const hedgingManager = await smartAccount.hedgingManager();
    console.log(`Connected to HedgingManager at: ${hedgingManager}`);
  } else {
    console.log("\n⚠️  IMPORTANT: Update the HedgingManager address after deployment:");
    console.log(`   smartAccount.setHedgingManager("YOUR_HEDGING_MANAGER_ADDRESS")`);
  }

  console.log("\n✅ Deployment complete!");
  console.log(`\nAdd this to your .env file:`);
  console.log(`SMART_ACCOUNT_ADDRESS=${address}`);
}

// Boilerplate for Hardhat scripts
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

