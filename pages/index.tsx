import { useEffect, useState } from "react";

// API functions to fetch various data
import { getBitcoinFiatRates } from "./api/fetchData";

import AddressInput from "@/components/AddressInput";
import BalanceChart from "@/components/BalanceChart";
import PortfolioPieChart from "@/components/PortfolioPieChart";
import { WalletType } from "@/enums/WalletType";

interface Wallet {
  address: string;
  type: WalletType;
}

export interface WalletData {
  balance: number;
  address: string;
  totalReceived: number;
}

const mockPortfolio = [
  { name: "BTC", value: 400 },
  { name: "ETH", value: 300 },
  { name: "SOL", value: 300 },
  { name: "TON", value: 200 },
];

const mockBalanceHistoryData = [
  {
    name: "1 Jan",
    eth: 4000,
  },
  {
    name: "1 Feb",
    eth: 3000,
  },
  {
    name: "1 Mar",
    eth: 2000,
  },
  {
    name: "1 Apr",
    eth: 2780,
  },
  {
    name: "1 May",
    eth: 1890,
  },
  {
    name: "1 Jun",
    eth: 2390,
  },
  {
    name: "1 Jul",
    eth: 3490,
  },
];

export default function Home() {
  // State hooks for various pieces of data and UI control
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [addressData, setAddressData] = useState<WalletData>();
  // Default fiat rates set to 0, will be updated via API call
  const [fiatRate, setFiatRate] = useState({ USD: 0, EUR: 0, GBP: 0 });

  // useEffect hook to fetch fiat rates on component mount
  useEffect(() => {
    fetchBitcoinFiatRates();
  }, []);

  // Function to handle address form submission
  const handleAddressSubmit = async (
    address: string,
    walletType: WalletType
  ) => {
    // add tag
    const newWalletsList = [...wallets];
    newWalletsList.push({ address, type: walletType });
    setWallets(newWalletsList);

    // const data = await getAddressData(address);
    // setAddressData(data);
  };

  // Function to fetch current Bitcoin fiat rates
  const fetchBitcoinFiatRates = async () => {
    // Assuming the API response structure matches what you provided
    const timestampNow = Math.floor(Date.now() / 1000);

    const fiatRates = await getBitcoinFiatRates(timestampNow);
    setFiatRate({ USD: fiatRates.usd, EUR: fiatRates.eur, GBP: fiatRates.gbp });
  };

  return (
    <div className="App bg-background min-h-screen flex flex-col items-center">
      <header className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">God Tier Wallet Analytics</a>
      </header>
      <main className="container">
        <AddressInput onAddWalletAddress={handleAddressSubmit} />
        {wallets.map(({ type, address }) => (
          <span key={`${type}:${address}`} className="badge">
            {type}: {address}
          </span>
        ))}

        {/* Display address data and Chart in a styled manner */}
        {/* ... */}
        {/* {balanceHistory && <BalanceChart historyData={balanceHistory} />} */}
        <div className="h-80">
          <BalanceChart data={mockBalanceHistoryData} />
        </div>
        <div className="h-80">
          <PortfolioPieChart data={mockPortfolio} />
        </div>
      </main>
    </div>
  );
}
