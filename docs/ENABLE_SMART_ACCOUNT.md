# Enabling Smart Account Features

Smart Account features have been enabled in your application! Here's what was done and how to use it.

## What Was Enabled

### 1. Backend Configuration
- **`walletService.ts`**: Updated to use SmartAccount when `USE_SMART_ACCOUNT=true`
- **`hedgeController.ts`**: Enhanced to accept `userAddress` parameter for SmartAccount operations
- All existing API endpoints now support SmartAccount when enabled

### 2. Frontend Integration
- **`hedging-tool.tsx`**: Automatically uses connected wallet address for SmartAccount
- **`smartAccountService.ts`**: New frontend service for SmartAccount API calls
- Wallet connection automatically populates SmartAccount address field

### 3. Configuration
- Created `.env.example` with all required environment variables
- SmartAccount features are enabled via `USE_SMART_ACCOUNT=true`

## Setup Instructions

### Step 1: Set Environment Variables

Add to your `.env` file (or create one):

```env
# Enable SmartAccount features
USE_SMART_ACCOUNT=true

# SmartAccount contract address (after deployment)
SMART_ACCOUNT_ADDRESS=0x...

# Other required variables
RPC_URL=https://flare-api.flare.network/ext/bc/C/rpc
PRIVATE_KEY=your_private_key
HEDGING_MANAGER_ADDRESS=0x...
```

### Step 2: Deploy SmartAccount Contract (if not already deployed)

```bash
npx hardhat run backend/scripts/deploySmartAccount.ts --network flare
```

Copy the deployed address to your `.env` file.

### Step 3: Compile Contracts (if needed)

```bash
npx hardhat compile
```

### Step 4: Restart Your Services

Restart both backend and frontend to pick up the new environment variables:

```bash
# Backend
cd backend
npm start  # or your start command

# Frontend (in another terminal)
npm run dev
```

## How It Works

### Automatic SmartAccount Usage

When `USE_SMART_ACCOUNT=true`:

1. **Hedging Operations**: All hedge swaps automatically use SmartAccount settlement
2. **Position Tracking**: Position queries can use SmartAccount collateral data
3. **User Address**: Frontend automatically uses connected wallet address

### API Endpoints

All existing endpoints work as before, but now support SmartAccount:

- `POST /api/hedge` - Now accepts `userAddress` in body (optional)
- `GET /api/status` - Now accepts `userAddress` query parameter (optional)

New SmartAccount-specific endpoints:

- `POST /api/smart-account/collateral/deposit`
- `POST /api/smart-account/collateral/withdraw`
- `GET /api/smart-account/collateral`
- `POST /api/smart-account/settlement/execute`
- `POST /api/smart-account/settlement/hedge`
- `GET /api/smart-account/settlements`

### Frontend Usage

The hedging tool now:
- Automatically detects connected wallet
- Pre-fills SmartAccount address field
- Uses SmartAccount for all hedge operations when enabled

## Testing

1. **Connect Wallet**: Connect your wallet in the frontend
2. **Check Hedging Tool**: The SmartAccount address should auto-populate
3. **Run Hedge Analysis**: The analysis will use your SmartAccount address
4. **View Collateral**: Use the new API endpoints to check collateral balances

## Disabling SmartAccount

To disable SmartAccount features (revert to original behavior):

```env
USE_SMART_ACCOUNT=false
```

Or simply remove the variable (defaults to `false`).

## Troubleshooting

### "SmartAccount contract not deployed" error
- Make sure `SMART_ACCOUNT_ADDRESS` is set in your `.env`
- Deploy the contract if you haven't already

### Wallet not connecting
- Check that `NEXT_PUBLIC_WC_PROJECT_ID` is set (for WalletConnect)
- Ensure MetaMask or your wallet is installed

### API errors
- Verify backend is running on the correct port
- Check `NEXT_PUBLIC_API_URL` matches your backend URL
- Ensure all environment variables are set correctly

## Next Steps

1. Deploy the SmartAccount contract to your network
2. Test collateral deposits and withdrawals
3. Test hedge settlements through SmartAccount
4. Monitor settlement history
5. Integrate SmartAccount features into other parts of your UI

For more details, see `docs/SMART_ACCOUNT_INTEGRATION.md`.

