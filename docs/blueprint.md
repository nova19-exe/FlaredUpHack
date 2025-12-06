# **App Name**: Flare Hedge

## Core Features:

- Wallet Connection: Connect to a Flare wallet using web3 to manage assets.
- Live Price Feeds: Display real-time BTC, USDT, USDC, DAI, and XRP prices using FTSO.
- Order Placement: Allow users to place buy and sell orders for spot swaps executed on-chain via Flare Smart Accounts.
- Hedging Rule Configuration: Enable users to define rules that trigger automatic hedging actions, converting BTC to stablecoins (USDT, USDC, DAI) or XRP when conditions are met.
- Automated Hedging Tool: An LLM tool that analyzes BTC price data from FTSO.  When trigger conditions are met, the LLM automatically submits transactions through Smart Accounts to execute hedge swaps into user-selected assets (USDT, USDC, DAI, XRP).
- Hedge History Tracking: Record and display a log of past hedge executions, including before/after balances and transaction details.
- Performance Analytics: Monitor the performance and impact on your wallet using a dedicated display in the app

## Style Guidelines:

- Primary color: Deep blue (#1A237E) to evoke trust and stability, nodding to traditional finance.
- Background color: Very light gray (#F5F5F5), offering a clean and neutral backdrop for financial data.
- Accent color: Teal (#008080), contrasting and fresh to highlight interactive elements and key information.
- Body and headline font: 'Inter' for a modern, clean, and readable interface.
- Use clean, line-based icons to represent different asset types and actions, ensuring clarity and a professional look.
- Implement a trading terminal-like layout with clear sections for navigation, charts, order forms, and data tables.
- Use subtle animations and transitions to provide feedback and enhance user experience without being distracting.