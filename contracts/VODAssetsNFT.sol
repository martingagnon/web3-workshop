// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VODAssetsNFT is ERC1155, Ownable {
    // assetId => Price
    mapping(uint256 => uint256) private _assetPrices;
    
    address private _assetFundHolder;

    // constructor
    constructor(address assetFundHolder) ERC1155("http://localhost:3000/{id}.json") Ownable() {
        require(assetFundHolder != address(0x0), "VODAsset: Invalid holder");
        _assetFundHolder = assetFundHolder;
    }
    
    function setAssetPrice(uint256 assetId, uint256 assetPrice) external {
        _assetPrices[assetId] = assetPrice;
    }

    function getAssetPrice(uint256 assetId) public view returns(uint256 assetPrice) {
        assetPrice = _assetPrices[assetId];
    }

    function purchaseAsset(uint256 assetId) payable external {
        uint256 assetPrice =  getAssetPrice(assetId);
        require(msg.value == assetPrice, "VODAsset: wrong asset price");
        _mint(msg.sender, assetId, 1, "");
    }

    function hasPurchasedAsset(address account, uint256 assetId) public view returns(bool) {
        return balanceOf(account, assetId) > 0;
    }    
}