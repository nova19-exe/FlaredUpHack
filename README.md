# 🚀 FlareTrade – Decentralized Collateral & Settlement Trading Platform

FlareTrade is a **next-generation decentralized trading and settlement platform** built on smart contracts. It allows users to securely lock collateral, open positions, and settle trades **trustlessly** using blockchain infrastructure — with real-time market visualization and Web3 wallet integration.

---

## 🎯 Project Vision

To build a **fully trustless, transparent, and automated trading & settlement system** where:
- Users control their own funds
- Trades are settled on-chain
- No intermediary can manipulate balances
- All actions are verifiable on the blockchain

---

## 📌 Key Features

✅ Trustless collateral locking  
✅ On-chain trade settlement  
✅ MetaMask wallet integration  
✅ Live BTC, ETH & SOL price charts  
✅ Built on Flare / EVM-compatible network  
✅ Fully decentralized execution  

---

## 🧠 System Architecture

User Interface (Next.js)
↓
MetaMask Wallet
↓
Ethers.js
↓
Smart Contracts (Flare / EVM)
↓
On-chain Collateral & Settlement

---

📊 Live Market Data → TradingView API → Frontend Charts

---

## 🔩 Core Components Explained

---

### 1️⃣ Smart Contracts (Solidity)

The **heart of the entire platform** – responsible for all financial logic.

**Responsibilities:**
- Locking and releasing collateral  
- Managing user positions  
- Executing settlements  
- Secure withdrawals  
- Access control  

**Core Contracts:**
- `FlareTrade.sol` – Main collateral & settlement logic  
- `Token.sol` – ERC20 test token  

**Tech Used:**
- Solidity ^0.8.x  
- Hardhat  
- Ethers.js  

---

### 2️⃣ Wallet Integration (MetaMask)

MetaMask acts as the **user authentication and transaction signer**.

**Functions:**
- Wallet connection  
- Network detection  
- Transaction signing  
- Collateral deposits  
- Secure withdrawals  

---

### 3️⃣ Frontend (Next.js + React)

The **complete user interaction layer**.

**Features:**
- Wallet connection interface  
- Live crypto charts  
- Collateral deposit & withdrawal UI  
- Open & close position dashboard  
- Transaction status updates  

**Tech Stack:**
- Next.js  
- React  
- TypeScript  
- Ethers.js  
- Tailwind CSS  

---

### 4️⃣ Live Market Data (TradingView API)

Used **only for visualization & decision making**.

- BTC  
- ETH  
- SOL  
- Real-time candle charts  

⚠️ **Settlement logic does NOT depend on these prices.**

---

### 5️⃣ Blockchain Network (Flare / EVM)

Your platform is deployed on an **EVM-compatible chain** which enables:
- Low gas fees  
- Fast confirmation  
- Seamless Solidity deployment  
- Oracle-friendly environment  

---

### 6️⃣ Backend (Optional / Future Expansion)

Currently the platform is **Frontend + Blockchain**, but future backend may include:
- Trade history indexing  
- Risk engine  
- Notifications  
- Analytics  
- Leaderboards  

---

## 📂 Project Structure
/contracts
└─ FlareTrade.sol
└─ Token.sol

/src
/app
/components
/lib
└─ contract.ts
└─ abi/

hardhat.config.ts
.env
README.md

---

## 🔐 Security Model

- ✅ No centralized custody  
- ✅ Users control private keys  
- ✅ All fund movement is on-chain  
- ✅ No backend can manipulate assets  
- ✅ Every transaction is verifiable  

---

## 🔄 Smart Contract Workflow

1. User connects wallet  
2. Deposits collateral  
3. Position is stored on-chain  
4. Trade logic executes  
5. Settlement is triggered  
6. User withdraws funds  

---

## ❓ Why Smart Contracts Are Required

✅ Trustless financial logic  
✅ Automated settlements  
✅ Transparent balance tracking  
✅ No third-party risk  
✅ Fully decentralized execution  

---

## 🛠 Tech Stack

- Solidity  
- Hardhat  
- Ethers.js  
- Next.js  
- TypeScript  
- MetaMask  
- TradingView API  

---

## 🏆 Hackathon Project

This project was built as part of **FlaredUpHack** with the goal of demonstrating:
- Decentralized finance infrastructure  
- Secure collateral management  
- On-chain settlements  
- Web3 user interaction  

---

## ✅ One-Line Summary

**FlareTrade is a decentralized collateral and settlement engine where smart contracts securely manage funds and execute trades without intermediaries.**

---

## 👥 Team – Infibytes

This project is proudly built by the **Infibytes** team:

**Harsh Abhinav** – https://github.com/harshabhinav  
**Mayank Bhatt** – https://github.com/Mayank-Bhatt-014
**Fayzan Mohammed** – https://github.com/nova19-exe  
**Mohammed Aman** – https://github.com/MohammedAman123

🤝 Together, we collaborated across **blockchain, frontend, system design, and deployment** to bring FlareTrade to life for **FlaredUpHack**.


<img src="./screenshot/1.jpg" width="200" />
