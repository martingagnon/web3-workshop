import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {expect} from 'chai';
import {ethers} from 'hardhat';
import { VODAssetsNFT, VODAssetsNFT__factory } from '../typechain-types';

describe('Test VODAssetNFT', function () {
  let owner: SignerWithAddress,
  user: SignerWithAddress,
  holder: SignerWithAddress,
  vodAssetContract: VODAssetsNFT;

  beforeEach(async function () {
    [owner, user, holder] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory('VODAssetsNFT');
    vodAssetContract = await contractFactory.deploy(holder.address) as VODAssetsNFT;
    await vodAssetContract.deployed(); 
  });

  it('Can create an asset', async function () {
    const assetId = 1;
    const assetPrice = ethers.utils.parseEther("2.0");

    await vodAssetContract.setAssetPrice(assetId, assetPrice);
    expect(await vodAssetContract.getAssetPrice(assetId)).to.equal(assetPrice);
  });

  // it('Only owner can set asset price', async function () {
  //   // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
  //
  //   await expect(vodAssetContract.connect(user).setAssetPrice(1, 1))
  //     .to.be.revertedWith("Ownable: caller is not the owner");
  // });

  // it('Asset can be purchased at the right price', async function () {
  //   // https://docs.openzeppelin.com/contracts/3.x/erc1155 (_mint / balanceOf)
  //   // https://docs.soliditylang.org/en/v0.4.25/control-structures.html#error-handling-assert-require-revert-and-exceptions
  //
  //   const assetId = 1;
  //   const assetPrice = ethers.utils.parseEther("2.0");
  //   await vodAssetContract.setAssetPrice(assetId, assetPrice);

  //   await vodAssetContract.connect(user).purchaseAsset(assetId, {value: assetPrice});

  //   // Validate that the user has purchased the asset
  //   expect(await vodAssetContract.hasPurchasedAsset(user.address, assetId)).to.equal(true);
  //   // Validate that we cannot purchase an asset with the wrong price
  //   await expect(vodAssetContract.connect(user).purchaseAsset(assetId, {value: 2}))
  //     .to.be.revertedWith("VODAsset: wrong asset price");
  // });

  // it('Asset purchase funds are transferred to the holder', async function () {
  //   const assetId = 1;
  //   const assetPrice = ethers.utils.parseEther("2.0");
  //   const initialFund = await holder.getBalance();

  //   await vodAssetContract.setAssetPrice(assetId, assetPrice);    
  //   await vodAssetContract.purchaseAsset(assetId, {value: assetPrice});

  //   expect(await holder.getBalance()).to.equal(initialFund.add(assetPrice));
  // });
});
