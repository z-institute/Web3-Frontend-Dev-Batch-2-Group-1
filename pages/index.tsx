import { useEffect, useState } from "react";
import axios from "axios";

import AddressInput from "@/components/AddressInput";
import BalanceChart from "@/components/BalanceChart";
import PortfolioPieChart from "@/components/PortfolioPieChart";
import { WalletType } from "@/enums/WalletType";
import { FiatRate } from "@/types";

interface Wallet {
  address: string;
  type: WalletType;
}

interface PortfolioEntry {
  name: string;
  value: number;
}

export interface WalletData {
  balance: number;
  address: string;
  totalReceived: number;
}

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

// Function to get fiat rates
const getTokenFiatRates = async () => {
  try {
    const response = await axios.get("/api/quotes");
    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

const getBitcoinBalance = async (address: string) => {
  try {
    const response = await axios.get(`/api/btcBalance?address=${address}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  return;
};

const getEthereumBalance = async (address: string) => {
  try {
    const response = await axios.get(`/api/ethBalances?address=${address}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  return;
};

export default function Home() {
  // State hooks for various pieces of data and UI control

  // Default fiat rates, will be updated via API call
  const [fiatRates, setFiatRates] = useState<FiatRate[]>([
    {
      symbol: "BTC",
      price: 44942.9823160841,
    },
    {
      symbol: "ETH",
      price: 2364.7884136803264,
    },
    {
      symbol: "SOL",
      price: 95.29256099961371,
    },
    {
      symbol: "TON",
      price: 2.203259797928652,
    },
  ]);

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioEntry[]>([]);

  // useEffect hook to fetch fiat rates on component mount
  useEffect(() => {
    fetchFiatRates();
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

    if (walletType === WalletType.Bitcoin) {
      const { tokenBalance } = await getBitcoinBalance(address);
      const newPortfolioData = [...portfolioData];
      const rate = fiatRates.find((r) => r.symbol === "BTC");
      if (!rate) {
        return;
      }

      newPortfolioData.push({ name: "BTC", value: tokenBalance * rate.price });
      setPortfolioData(newPortfolioData);
      return;
    } else if (walletType === WalletType.Evm) {
      const tokens = await getEthereumBalance(address);
      const eth = tokens.find((t) => t.symbol === "ETH");

      const newPortfolioData = [...portfolioData];
      const rate = fiatRates.find((r) => r.symbol === "ETH");
      if (!rate) {
        return;
      }

      newPortfolioData.push({
        name: "ETH",
        value: eth.tokenBalance * rate.price,
      });
      setPortfolioData(newPortfolioData);
      return;
    }
  };

  // Function to fetch current token fiat rates
  const fetchFiatRates = async () => {
    const fiatRates = await getTokenFiatRates();
    setFiatRates(fiatRates);
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
          <PortfolioPieChart data={portfolioData} />
        </div>
      </main>
    </div>
  );
}
