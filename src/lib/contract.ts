import { ethers } from "ethers";
import SmartAccountABI from "./SmartAccountABI.json";

export const SMART_ACCOUNT_ADDRESS = "0x376Aa337Fd9B51D743F6c951ce0FF7C7C03b8be1";

export async function getSmartAccount() {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    SMART_ACCOUNT_ADDRESS,
    SmartAccountABI as any,
    signer
  );
  
}
