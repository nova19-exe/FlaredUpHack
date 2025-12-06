// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * HedgingManager
 * - Connects to FTSO price feeds
 * - Allows Smart Accounts to trigger hedging
 * - Executes swaps (via DEX integration)
 */

interface IFTSO {
    function getCurrentPrice(string calldata symbol) external view returns (uint256);
}

interface IDex {
    function swap(address fromToken, address toToken, uint256 amount) external returns (uint256);
}

contract HedgingManager {
    address public owner;
    IFTSO public ftso;
    IDex public dex;

    // Track positions
    mapping(address => uint256) public btcPositions;
    mapping(address => uint256) public xrpPositions;

    event HedgeExecuted(address indexed user, uint256 btcAmount, uint256 xrpAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _ftso, address _dex) {
        owner = msg.sender;
        ftso = IFTSO(_ftso);
        dex = IDex(_dex);
    }

    /// Deposit BTC position (simulated as ERC20)
    function depositBTC(uint256 amount) external {
        btcPositions[msg.sender] += amount;
    }

    /// Deposit XRP position (simulated as ERC20)
    function depositXRP(uint256 amount) external {
        xrpPositions[msg.sender] += amount;
    }

    /// Hedge BTC losses with XRP
    function executeHedge(address fromToken, address toToken, uint256 percent) external {
        uint256 btcPrice = ftso.getCurrentPrice("BTC");
        uint256 xrpPrice = ftso.getCurrentPrice("XRP");

        // Example: if BTC drops >10%, hedge
        if (btcPrice < (btcPrice * 90) / 100) {
            uint256 btcAmount = (btcPositions[msg.sender] * percent) / 100;
            uint256 xrpReceived = dex.swap(fromToken, toToken, btcAmount);

            btcPositions[msg.sender] -= btcAmount;
            xrpPositions[msg.sender] += xrpReceived;

            emit HedgeExecuted(msg.sender, btcAmount, xrpReceived);
        }
    }

    /// View positions
    function getPositions(address user) external view returns (uint256 btc, uint256 xrp) {
        return (btcPositions[user], xrpPositions[user]);
    }
}