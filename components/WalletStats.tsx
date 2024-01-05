import { WalletData } from "@/pages";
import React, { useState } from "react";

interface WalletStatsProps {
  walletData: WalletData;
  fiatRate: any;
}

// Converts satoshi unit to Bitcoin, fixing to 8 decimal places
const satoshiToBitcoin = (satoshi: number) => (satoshi / 100000000).toFixed(8);

// WalletStats component takes walletData and fiatRate as props
const WalletStats = ({ walletData, fiatRate }: WalletStatsProps) => {
  // State for toggling the display of transaction IDs
  const [showTxids, setShowTxids] = useState(false);
  // State for selecting the fiat currency for displaying Bitcoin's equivalent value
  const [fiatCurrency, setFiatCurrency] = useState("USD");

  if (!walletData) {
    return <p>No data available.</p>;
  }

  // Calculate the fiat equivalent of the wallet's balance using the selected fiat currency rate
  const fiatBalance = (
    satoshiToBitcoin(walletData.balance) * fiatRate[fiatCurrency]
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // The return statement contains the JSX for rendering the wallet information
  return (
    <div className="p-4 rounded-md shadow-md bg-white my-4">
      <h2 className="text-xl font-bold mb-4">Wallet Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <strong>Address:</strong> {walletData.address}
        </div>
        <div>
          <strong>Balance:</strong> {satoshiToBitcoin(walletData.balance)} BTC (
          {fiatCurrency} {fiatBalance})
        </div>
        <div>
          <strong>Total Received:</strong>{" "}
          {satoshiToBitcoin(walletData.totalReceived)} BTC
        </div>
        <div>
          <strong>Total Sent:</strong> {satoshiToBitcoin(walletData.totalSent)}{" "}
          BTC
        </div>
        <div>
          <strong>Total Transactions:</strong> {walletData.txs}
        </div>
        <div>
          <strong>Unconfirmed Balance:</strong>{" "}
          {satoshiToBitcoin(walletData.unconfirmedBalance)} BTC
        </div>
        <div>
          <strong>Unconfirmed Transactions:</strong> {walletData.unconfirmedTxs}
        </div>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <label
            htmlFor="fiat-currency"
            className="block text-gray-700 font-bold mr-2"
          >
            Select Fiat Currency:
          </label>
          <select
            id="fiat-currency"
            value={fiatCurrency}
            onChange={(e) => setFiatCurrency(e.target.value)}
            className="block shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        {walletData.txids && walletData.txids.length > 0 && (
          <div>
            <button
              onClick={() => setShowTxids(!showTxids)}
              className="text-blue-600 hover:underline"
            >
              {showTxids ? "Hide" : "Show"} Latest 10 Transactions
            </button>
            {showTxids && (
              <ul className="mt-4">
                {walletData.txids.slice(0, 10).map((txid, index) => (
                  <li key={index} className="truncate">
                    {txid}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletStats;
