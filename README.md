# Flare Hedge

Flare Hedge is a web application inspired by trading terminals like MetaTrader5, designed to help users manage and hedge their Bitcoin (BTC) exposure using the Flare Network's powerful features.

The application provides live price feeds, on-chain order execution via Flare Smart Accounts, and a sophisticated automated hedging tool powered by AI.

## Key Features

- **Live Price Feeds**: Real-time prices for BTC, USDT, USDC, DAI, and XRP from the Flare Time Series Oracle (FTSO).
- **On-Chain Trading**: Place buy/sell orders that are executed as spot swaps on-chain using Flare Smart Accounts.
- **Automated Hedging**: Configure rules to automatically hedge your BTC position against downside risk.
- **AI-Powered Analysis**: An AI tool analyzes your hedging parameters and proposes or executes swaps to protect your portfolio.
- **History & Analytics**: Track your past hedge executions and monitor your portfolio's performance.

## How Hedging Works

The core concept is to protect your Bitcoin holdings from significant price drops.

1.  **You hold BTC** (or wrapped BTC on the Flare network).
2.  **You set a rule**: For example, "If my BTC position loses more than 10% of its value, I want to hedge 30% of it."
3.  **The system monitors**: Using reliable price data from FTSO, the app continuously checks your position's value against your rules.
4.  **Action is taken**: When a trigger condition is met, the system automatically builds a transaction to swap a portion of your BTC into more stable assets like USDT, USDC, or DAI. This is executed atomically on-chain using a Flare Smart Account.

Users can configure:
- **Trigger Condition**: The percentage drop that activates the hedge.
- **Hedge Size**: The amount of BTC to convert.
- **Target Assets**: Your choice of stablecoins to hedge into.
- **Execution Mode**: Choose between fully automated execution or manual confirmation for each hedge.

### A Note on XRP

XRP can be selected as a hedge asset. However, it is important to note that **XRP is not a stablecoin**. It is a volatile cryptocurrency, and using it as a hedge asset introduces different risk dynamics compared to stablecoins like USDT, USDC, and DAI.

## Getting Started

This is a Next.js application built with the App Router.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env.local` file in the root of the project and add your Genkit/Google AI credentials.

```
GOOGLE_API_KEY=your_google_ai_api_key
```

### Running the Development Server

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.
