// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * FTSOConsumer
 * - Connects to Flare Time Series Oracle (FTSO)
 * - Provides secure price feeds for assets (BTC, XRP, etc.)
 * - Backend can call this contract to fetch latest prices
 */

interface IPriceProvider {
    function getCurrentPrice() external view returns (uint256 price, uint256 decimals);
}

contract FTSOConsumer {
    address public owner;

    // Mapping of asset symbols to their FTSO price provider contracts
    mapping(string => address) public priceProviders;

    event PriceProviderRegistered(string symbol, address provider);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// Register a new FTSO price provider for an asset
    function registerPriceProvider(string calldata symbol, address provider) external onlyOwner {
        priceProviders[symbol] = provider;
        emit PriceProviderRegistered(symbol, provider);
    }

    /// Get the current price of an asset from its FTSO provider
    function getPrice(string calldata symbol) external view returns (uint256 price, uint256 decimals) {
        address provider = priceProviders[symbol];
        require(provider != address(0), "Provider not registered");

        (price, decimals) = IPriceProvider(provider).getCurrentPrice();
        return (price, decimals);
    }
}