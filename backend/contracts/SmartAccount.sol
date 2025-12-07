// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

interface IHedgingManager {
    function executeHedge(address fromToken, address toToken, uint256 percent) external;
}

contract SmartAccount {
    address public owner;
    IHedgingManager public hedgingManager;

    mapping(address => mapping(address => uint256)) public collateral;
    mapping(address => mapping(address => uint256)) public lockedCollateral;

    struct Settlement {
        address fromToken;
        address toToken;
        uint256 fromAmount;
        uint256 toAmount;
        uint256 timestamp;
        bool executed;
    }

    mapping(address => Settlement[]) public settlements;
    mapping(address => uint256) public settlementCount;

    // ✅ EVENTS (FRONTEND + HISTORY COMPATIBLE)
    event CollateralDeposited(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event CollateralWithdrawn(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event CollateralLocked(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event CollateralUnlocked(address indexed user, address indexed token, uint256 amount, uint256 timestamp);

    event SettlementExecuted(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 fromAmount,
        uint256 toAmount,
        uint256 settlementId,
        uint256 timestamp
    );

    event HedgeSettlement(
        address indexed user,
        address indexed fromToken,
        address indexed toToken,
        uint256 fromAmount,
        uint256 toAmount,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyOwnerOrHedgingManager() {
        require(
            msg.sender == owner || msg.sender == address(hedgingManager),
            "Not authorized"
        );
        _;
    }

    constructor(address _hedgingManager) {
        owner = msg.sender;
        hedgingManager = IHedgingManager(_hedgingManager);
    }

    function setHedgingManager(address _hedgingManager) external onlyOwner {
        hedgingManager = IHedgingManager(_hedgingManager);
    }

    // ✅ DEPOSIT (TRACKABLE IN FRONTEND)
    function depositCollateral(address token, uint256 amount) external {
        require(token != address(0), "Invalid token");
        require(amount > 0, "Amount 0");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        collateral[msg.sender][token] += amount;

        emit CollateralDeposited(msg.sender, token, amount, block.timestamp);
    }

    function withdrawCollateral(address token, uint256 amount) external {
        uint256 available = collateral[msg.sender][token] - lockedCollateral[msg.sender][token];
        require(available >= amount, "Insufficient");

        collateral[msg.sender][token] -= amount;
        IERC20(token).transfer(msg.sender, amount);

        emit CollateralWithdrawn(msg.sender, token, amount, block.timestamp);
    }

    function lockCollateral(address token, uint256 amount) external onlyOwnerOrHedgingManager {
        uint256 available = collateral[msg.sender][token] - lockedCollateral[msg.sender][token];
        require(available >= amount, "Not enough");

        lockedCollateral[msg.sender][token] += amount;

        emit CollateralLocked(msg.sender, token, amount, block.timestamp);
    }

    function unlockCollateral(address token, uint256 amount) external onlyOwnerOrHedgingManager {
        require(lockedCollateral[msg.sender][token] >= amount, "Not locked");

        lockedCollateral[msg.sender][token] -= amount;

        emit CollateralUnlocked(msg.sender, token, amount, block.timestamp);
    }

    function executeSettlement(
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 minToAmount,
        address dexAddress
    ) external returns (uint256 toAmount) {

        uint256 available = collateral[msg.sender][fromToken] - lockedCollateral[msg.sender][fromToken];
        require(available >= fromAmount, "Insufficient");

        lockedCollateral[msg.sender][fromToken] += fromAmount;
        IERC20(fromToken).approve(dexAddress, fromAmount);

        bytes memory swapData = abi.encodeWithSignature(
            "swap(address,address,uint256)",
            fromToken,
            toToken,
            fromAmount
        );

        (bool success, bytes memory returnData) = dexAddress.call(swapData);
        require(success, "Swap failed");

        toAmount = abi.decode(returnData, (uint256));
        require(toAmount >= minToAmount, "Slippage");

        collateral[msg.sender][fromToken] -= fromAmount;
        lockedCollateral[msg.sender][fromToken] -= fromAmount;
        collateral[msg.sender][toToken] += toAmount;

        uint256 settlementId = settlementCount[msg.sender]++;
        settlements[msg.sender].push(Settlement(
            fromToken,
            toToken,
            fromAmount,
            toAmount,
            block.timestamp,
            true
        ));

        emit SettlementExecuted(
            msg.sender,
            fromToken,
            toToken,
            fromAmount,
            toAmount,
            settlementId,
            block.timestamp
        );

        return toAmount;
    }

    function executeHedgeSettlement(
        address fromToken,
        address toToken,
        uint256 percent
    ) external {

        uint256 fromBal = collateral[msg.sender][fromToken];
        uint256 hedgeAmount = (fromBal * percent) / 100;

        hedgingManager.executeHedge(fromToken, toToken, percent);

        emit HedgeSettlement(
            msg.sender,
            fromToken,
            toToken,
            hedgeAmount,
            0,
            block.timestamp
        );
    }

    function getAvailableCollateral(address user, address token) external view returns (uint256) {
        return collateral[user][token] - lockedCollateral[user][token];
    }

    function getSettlement(address user, uint256 index) external view returns (Settlement memory) {
        return settlements[user][index];
    }

    function getSettlementCount(address user) external view returns (uint256) {
        return settlementCount[user];
    }

    function emergencyRecover(address token, address to, uint256 amount) external onlyOwner {
        IERC20(token).transfer(to, amount);
    }
}
