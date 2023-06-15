
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {VODAssetsNFT, VODAssetsNFT__factory} from '../typechain-types';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";   
const chainId = 31337;
const chainUrl = "http://127.0.0.1:8546";

// VODAssetsNFT is the connected contract object (using provider and signer)
export const getContract = async (): Promise<VODAssetsNFT> => {
   const signer = await getSigner();
   return VODAssetsNFT__factory.connect(contractAddress, signer);
}

// Provider is the connection with the RPC Node
const getProvider = async (): Promise<Web3Provider> => {
   const ethereum = (window as unknown as {ethereum: ExternalProvider}).ethereum;
   // MetaMask injects a Web3 Provider as "web3.currentProvider"
   await (ethereum as any).request({ method: 'eth_requestAccounts' });

   return new Web3Provider(ethereum);
}

// Signer is the object that can sign transactions
const getSigner = async (): Promise<Signer> => (await getProvider()).getSigner() as unknown as Signer;


// Challenge #4   
export const getAssetPrice = async (assetId: number): Promise<number> => {
   return 0;
}

// Challenge #5
export const getHasPurchasedAsset = async (assetId: number): Promise<boolean> => {
   return false;   
}

// Challenge #6
export const purchaseAsset = async (assetId: number): Promise<void> => {
   return;
}

// This method ask metamask to automatically create and connect to a specific RPC node.
export const validateNetwork = async (): Promise<void> => {
   const provider = await getProvider();
   const localChainId = (await provider?.getNetwork())?.chainId;
   if (localChainId !== chainId) {
     const targetChainIdHex = `0x${chainId.toString(16)}`;
     const fullParameters = {
       chainId: targetChainIdHex,
       chainName: "Localhost - VODAsset",
       rpcUrls: [chainUrl],
     };

     await provider
       .send('wallet_switchEthereumChain', [{chainId: targetChainIdHex}])
       .catch((error: any) => {
         if (error.code === 4902) {
           return provider.send('wallet_addEthereumChain', [fullParameters]);
         }
       });
   }
}



