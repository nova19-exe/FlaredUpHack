# Smart Account Integration Guide

## Overview

A Smart Account contract has been created for managing collateral and settlement operations. This contract integrates seamlessly with your existing Web2 backend without disrupting current functionality.

## What Was Created

### 1. Smart Contract (`contracts/SmartAccount.sol`)
- **Collateral Management**: Deposit, withdraw, lock, and unlock collateral tokens
- **Settlement System**: Execute swaps and hedge settlements
- **Integration**: Works with your existing `HedgingManager` contract
- **Multi-Token Support**: Handles any ERC20 token

### 2. Backend Services
- **`backend/services/smartAccountService.ts`**: Service layer for SmartAccount operations
- **`backend/controllers/smartAccountController.ts`**: API controllers for all SmartAccount endpoints
- **Updated `backend/services/walletService.ts`**: Enhanced to optionally use SmartAccount (backward compatible)

### 3. API Routes (`backend/routes/api.ts`)
New endpoints added:
- `POST /api/smart-account/collateral/deposit` - Deposit collateral
- `POST /api/smart-account/collateral/withdraw` - Withdraw collateral
- `POST /api/smart-account/collateral/lock` - Lock collateral
- `POST /api/smart-account/collateral/unlock` - Unlock collateral
- `GET /api/smart-account/collateral` - Get collateral info
- `POST /api/smart-account/settlement/execute` - Execute a settlement
- `POST /api/smart-account/settlement/hedge` - Execute hedge settlement
- `GET /api/smart-account/settlements` - Get all settlements
- `GET /api/smart-account/settlement` - Get specific settlement

### 4. Deployment Script
- **`backend/scripts/deploySmartAccount.ts`**: Script to deploy the SmartAccount contract

## Setup Instructions

### 1. Compile the Contract
```bash
npx hardhat compile
```

This will generate the ABI in `artifacts/contracts/SmartAccount.sol/SmartAccount.json`. You may need to copy the ABI to `contracts/SmartAccount.json` or update the import path in `smartAccountService.ts`.

### 2. Deploy the Contract
```bash
npx hardhat run backend/scripts/deploySmartAccount.ts --network flare
```

Make sure to set `HEDGING_MANAGER_ADDRESS` in your environment variables before deploying.

### 3. Environment Variables
Add to your `.env` file:
```env
SMART_ACCOUNT_ADDRESS=<deployed_address>
USE_SMART_ACCOUNT=false  # Set to true to enable SmartAccount for swaps
```

### 4. Update Contract ABI
After compilation, update `contracts/SmartAccount.json` with the compiled ABI, or update the import in `backend/services/smartAccountService.ts` to point to the artifacts folder.

## Usage

### Backward Compatibility
The existing `walletService.swap()` and `walletService.getPositions()` functions continue to work as before. To enable SmartAccount features, set `USE_SMART_ACCOUNT=true` in your environment.

### Example API Calls

#### Deposit Collateral
```bash
POST /api/smart-account/collateral/deposit
{
  "userAddress": "0x...",
  "tokenAddress": "0x...",
  "amount": "1000000000000000000"  // 1 token (18 decimals)
}
```

#### Execute Settlement
```bash
POST /api/smart-account/settlement/execute
{
  "userAddress": "0x...",
  "fromToken": "0x...",
  "toToken": "0x...",
  "fromAmount": "1000000000000000000",
  "minToAmount": "950000000000000000",
  "dexAddress": "0x..."
}
```

#### Get Collateral Info
```bash
GET /api/smart-account/collateral?userAddress=0x...&tokenAddress=0x...
```

## Integration Points

### With HedgingManager
The SmartAccount contract integrates with your existing `HedgingManager`:
- Calls `hedgingManager.executeHedge()` for hedge settlements
- Maintains separate collateral tracking independent of HedgingManager positions

### With Frontend
The frontend can now:
- Display collateral balances
- Show settlement history
- Execute trades through SmartAccount
- Lock/unlock collateral for pending trades

## Security Considerations

1. **Access Control**: The contract has `onlyOwner` modifiers for sensitive operations
2. **Collateral Locking**: Prevents double-spending by locking collateral during trades
3. **Slippage Protection**: `executeSettlement` includes minimum amount checks
4. **Emergency Recovery**: Owner can recover tokens in emergency situations

## Next Steps

1. **Compile and Deploy**: Run the compilation and deployment steps above
2. **Test Integration**: Test the API endpoints with your frontend
3. **Update Frontend**: Add UI components to interact with SmartAccount features
4. **DEX Integration**: Update the `executeSettlement` function to work with your actual DEX contract

## Notes

- The contract uses a simplified DEX interface. You may need to adjust `executeSettlement` based on your actual DEX implementation.
- The service layer currently uses a single wallet for all operations. In production, users should sign their own transactions.
- Settlement history is stored on-chain, which may become expensive with many transactions. Consider off-chain storage for historical data.

