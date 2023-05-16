import {ethers} from 'hardhat';
import { VODAssetsNFT } from '../typechain-types';

const deploy = async () => {
  const contractFactory = await ethers.getContractFactory('VODAssetsNFT');

  const contract = await contractFactory.deploy("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC") as VODAssetsNFT;
  await contract.deployed();

  await (await contract.setAssetPrice(1, ethers.utils.parseEther("1.0"))).wait();
  await (await contract.setAssetPrice(2, ethers.utils.parseEther("2.0"))).wait();
  await (await contract.setAssetPrice(3, ethers.utils.parseEther("3.0"))).wait();

  console.log(`Contract deployed to: ${contract.address}`);
}

deploy()  
  .then(() => process.exit(0))
  .catch((error) => {
     console.error(error);
     process.exit(1);
  });

