import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { getAssetPrice, getHasPurchasedAsset, purchaseAsset, validateNetwork } from './VODAsset'

export default function Home() {
  const assetIds = [1, 2, 3];
  const [refresh, setRefresh] = useState(0);
  const [assetPrices, setAssetPrices] = useState<Record<number, number>>({});
  const [purchasedAssets, setPurchasedAssets] = useState<number[]>([]);

  const doPurchaseAsset = async (assetId: number) => {
    await purchaseAsset(assetId);
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    validateNetwork();
  });
  
  useEffect(() => {
    const updatePurchasedAssetState = async () => {
      const purchasedAssets: number[] = [];
      const allAssetPrices: Record<number, number> = {};
      for(const asset of assetIds) {        
        if (await getHasPurchasedAsset(asset)) {
          purchasedAssets.push(asset);
        }
        const price = await getAssetPrice(asset);
        allAssetPrices[asset] = price;
      }
      setPurchasedAssets(purchasedAssets);
      setAssetPrices(allAssetPrices);
    }
    updatePurchasedAssetState();
  }, [refresh, setPurchasedAssets, setAssetPrices]);

  return (
    <>
      <Head>
        <title>Assets</title>
      </Head>
      <main className={styles.main}>
        <table>
        <thead></thead>
        <tbody>
          <tr>
        {
        assetIds.map((asset, index) => {return (
          <td key={index}>
            <h1><img src={`./${asset}.png`} width="200"/></h1>
            <p>{`${assetPrices[asset]}`} Eth</p>
            {purchasedAssets.includes(asset) ? <button key="watch">Watch</button> : <button key="purchase" onClick={() => doPurchaseAsset(asset)}>Purchase</button> }
          </td>
        )}
        )}
        </tr>
        </tbody>
        </table>
      </main>
    </>
  )
}
