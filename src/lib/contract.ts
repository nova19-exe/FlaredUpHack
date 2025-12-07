import { ethers } from "ethers";
import SmartAccountABI from "@/lib/abi/SmartAccount.json";

export const SMART_ACCOUNT_ADDRESS =
  "0x020Eb17D49D366b07352E7EDe68c2f3cA31f79D1";

export async function getSmartAccount() {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(
    (window as any).ethereum
  );
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    SMART_ACCOUNT_ADDRESS,
    SmartAccountABI,
    signer
  );

  return contract;
}

// ✅ READ USER COLLATERAL
export async function getUserCollateral(
  user: string,
  token: string
) {
  const provider = new ethers.BrowserProvider(
    (window as any).ethereum
  );

  const contract = new ethers.Contract(
    SMART_ACCOUNT_ADDRESS,
    SmartAccountABI,
    provider
  );

  return await contract.getTotalCollateral(user, token);
}
