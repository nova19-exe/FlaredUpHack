// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * SmartAccount
 * - Manages collateral deposits and withdrawals
 * - Handles settlement of trades and hedges
 * - Integrates with HedgingManager for automated hedging
 * - Supports multiple ERC20 tokens
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

interface IHedgingManager {
    function executeHedge(address fromToken, address toToken, uint256 percent) external;
    function depositBTC(uint256 amount) external;
    function depositXRP(uint256 amount) external;
    function getPositions(address user) external view returns (uint256 btc, uint256 xrp);
}

contract SmartAccount {
    address public owner;
    IHedgingManager public hedgingManager;
    
    // Collateral tracking
    mapping(address => mapping(address => uint256)) public collateral; // user => token => amount
    mapping(address => mapping(address => uint256)) public lockedCollateral; // user => token => locked amount
    
    // Settlement tracking
    struct Settlement {
        address fromToken;
        address toToken;
        uint256 fromAmount;
        uint256 toAmount;
        uint256 timestamp;
        bool executed;
    }
    
    mapping(address => Settlement[]) public settlements; // user => settlements
    mapping(address => uint256) public settlementCount; // user => count
    
    // Events
    event CollateralDeposited(address indexed user, address indexed token, uint256 amount);
    event CollateralWithdrawn(address indexed user, address indexed token, uint256 amount);
    event CollateralLocked(address indexed user, address indexed token, uint256 amount);
    event CollateralUnlocked(address indexed user, address indexed token, uint256 amount);
    event SettlementExecuted(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 fromAmount,
        uint256 toAmount,
        uint256 settlementId
    );
    event HedgeSettlement(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 fromAmount,
        uint256 toAmount
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "SmartAccount: Not authorized");
        _;
    }
    
    modifier onlyOwnerOrHedgingManager() {
        require(
            msg.sender == owner || msg.sender == address(hedgingManager),
            "SmartAccount: Not authorized"
        );
        _;
    }
    
    constructor(address _hedgingManager) {
        owner = msg.sender;
        hedgingManager = IHedgingManager(_hedgingManager);
    }
    
    /**
     * @notice Update the HedgingManager address
     */
    function setHedgingManager(address _hedgingManager) external onlyOwner {
        hedgingManager = IHedgingManager(_hedgingManager);
    }
    
    /**
     * @notice Deposit collateral tokens into the smart account
     * @param token The ERC20 token address
     * @param amount The amount to deposit
     */
    function depositCollateral(address token, uint256 amount) external {
        require(token != address(0), "SmartAccount: Invalid token");
        require(amount > 0, "SmartAccount: Amount must be greater than 0");
        
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        collateral[msg.sender][token] += amount;
        
        emit CollateralDeposited(msg.sender, token, amount);
    }
    
    /**
     * @notice Withdraw collateral tokens from the smart account
     * @param token The ERC20 token address
     * @param amount The amount to withdraw
     */
    function withdrawCollateral(address token, uint256 amount) external {
        require(token != address(0), "SmartAccount: Invalid token");
        require(amount > 0, "SmartAccount: Amount must be greater than 0");
        
        uint256 available = collateral[msg.sender][token] - lockedCollateral[msg.sender][token];
        require(available >= amount, "SmartAccount: Insufficient available collateral");
        
        collateral[msg.sender][token] -= amount;
        IERC20(token).transfer(msg.sender, amount);
        
        emit CollateralWithdrawn(msg.sender, token, amount);
    }
    
    /**
     * @notice Lock collateral for a trade or hedge
     * @param token The ERC20 token address
     * @param amount The amount to lock
     */
    function lockCollateral(address token, uint256 amount) external {
        require(token != address(0), "SmartAccount: Invalid token");
        require(amount > 0, "SmartAccount: Amount must be greater than 0");
        
        uint256 available = collateral[msg.sender][token] - lockedCollateral[msg.sender][token];
        require(available >= amount, "SmartAccount: Insufficient available collateral");
        
        lockedCollateral[msg.sender][token] += amount;
        
        emit CollateralLocked(msg.sender, token, amount);
    }
    
    /**
     * @notice Unlock collateral after a trade or hedge
     * @param token The ERC20 token address
     * @param amount The amount to unlock
     */
    function unlockCollateral(address token, uint256 amount) external {
        require(token != address(0), "SmartAccount: Invalid token");
        require(lockedCollateral[msg.sender][token] >= amount, "SmartAccount: Insufficient locked collateral");
        
        lockedCollateral[msg.sender][token] -= amount;
        
        emit CollateralUnlocked(msg.sender, token, amount);
    }
    
    /**
     * @notice Execute a settlement (swap) between two tokens
     * @param fromToken The token to swap from
     * @param toToken The token to swap to
     * @param fromAmount The amount to swap
     * @param minToAmount The minimum amount expected to receive
     * @param dexAddress The DEX contract address to execute the swap
     */
    function executeSettlement(
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 minToAmount,
        address dexAddress
    ) external returns (uint256 toAmount) {
        require(fromToken != address(0) && toToken != address(0), "SmartAccount: Invalid token");
        require(fromAmount > 0, "SmartAccount: Invalid amount");
        require(dexAddress != address(0), "SmartAccount: Invalid DEX");
        
        // Check and lock collateral
        uint256 available = collateral[msg.sender][fromToken] - lockedCollateral[msg.sender][fromToken];
        require(available >= fromAmount, "SmartAccount: Insufficient collateral");
        
        lockedCollateral[msg.sender][fromToken] += fromAmount;
        
        // Approve DEX to spend tokens
        IERC20(fromToken).approve(dexAddress, fromAmount);
        
        // Execute swap via DEX (assuming DEX has a swap function)
        // This is a simplified version - actual DEX integration may vary
        bytes memory swapData = abi.encodeWithSignature(
            "swap(address,address,uint256)",
            fromToken,
            toToken,
            fromAmount
        );
        
        (bool success, bytes memory returnData) = dexAddress.call(swapData);
        require(success, "SmartAccount: Swap failed");
        
        toAmount = abi.decode(returnData, (uint256));
        require(toAmount >= minToAmount, "SmartAccount: Slippage too high");
        
        // Update collateral balances
        collateral[msg.sender][fromToken] -= fromAmount;
        lockedCollateral[msg.sender][fromToken] -= fromAmount;
        collateral[msg.sender][toToken] += toAmount;
        
        // Record settlement
        uint256 settlementId = settlementCount[msg.sender]++;
        settlements[msg.sender].push(Settlement({
            fromToken: fromToken,
            toToken: toToken,
            fromAmount: fromAmount,
            toAmount: toAmount,
            timestamp: block.timestamp,
            executed: true
        }));
        
        emit SettlementExecuted(msg.sender, fromToken, toToken, fromAmount, toAmount, settlementId);
        
        return toAmount;
    }
    
    /**
     * @notice Execute a hedge settlement through HedgingManager
     * @param fromToken The token to hedge from (e.g., BTC)
     * @param toToken The token to hedge to (e.g., USDT, USDC, DAI, XRP)
     * @param percent The percentage of position to hedge
     */
    function executeHedgeSettlement(
        address fromToken,
        address toToken,
        uint256 percent
    ) external {
        require(fromToken != address(0) && toToken != address(0), "SmartAccount: Invalid token");
        require(percent > 0 && percent <= 100, "SmartAccount: Invalid percent");
        
        // This function would be called by the HedgingManager or authorized contract
        // For now, we'll allow the owner to call it directly
        // In production, you might want to add more access control
        
        // Execute hedge through HedgingManager
        hedgingManager.executeHedge(fromToken, toToken, percent);
        
        emit HedgeSettlement(msg.sender, fromToken, toToken, 0, 0);
    }
    
    /**
     * @notice Get available collateral balance for a user and token
     * @param user The user address
     * @param token The token address
     * @return The available (unlocked) collateral amount
     */
    function getAvailableCollateral(address user, address token) external view returns (uint256) {
        return collateral[user][token] - lockedCollateral[user][token];
    }
    
    /**
     * @notice Get total collateral balance for a user and token
     * @param user The user address
     * @param token The token address
     * @return The total collateral amount
     */
    function getTotalCollateral(address user, address token) external view returns (uint256) {
        return collateral[user][token];
    }
    
    /**
     * @notice Get locked collateral balance for a user and token
     * @param user The user address
     * @param token The token address
     * @return The locked collateral amount
     */
    function getLockedCollateral(address user, address token) external view returns (uint256) {
        return lockedCollateral[user][token];
    }
    
    /**
     * @notice Get settlement history for a user
     * @param user The user address
     * @param index The settlement index
     * @return The settlement details
     */
    function getSettlement(address user, uint256 index) external view returns (Settlement memory) {
        require(index < settlementCount[user], "SmartAccount: Invalid settlement index");
        return settlements[user][index];
    }
    
    /**
     * @notice Get all settlements count for a user
     * @param user The user address
     * @return The number of settlements
     */
    function getSettlementCount(address user) external view returns (uint256) {
        return settlementCount[user];
    }
    
    /**
     * @notice Emergency function to recover tokens (only owner)
     * @param token The token address
     * @param to The recipient address
     * @param amount The amount to recover
     */
    function emergencyRecover(address token, address to, uint256 amount) external onlyOwner {
        require(to != address(0), "SmartAccount: Invalid recipient");
        IERC20(token).transfer(to, amount);
    }
}

