import { useEffect, useState } from "react";
import axios from "axios";

import AddressInput from "@/components/AddressInput";
import BalanceChart from "@/components/BalanceChart";
import PortfolioPieChart from "@/components/PortfolioPieChart";
import { WalletType } from "@/enums/WalletType";
import { FiatRate, Token } from "@/types";
import tonClient from "../config/tonClient";
import solanaConnection from "@/config/solanaClient";
import * as solanaWeb3 from '@solana/web3.js';

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
    btc: 1000,
    eth: 4000,
  },
  {
    name: "1 Feb",
    btc: 1000,
    eth: 3000,
    sol: 2000,
  },
  {
    name: "1 Mar",
    btc: 1000,
    eth: 2000,
    sol: 2000,
  },
  {
    name: "1 Apr",
    btc: 1000,
    eth: 2780,
    sol: 2000,
    ton: 1000,
  },
  {
    name: "1 May",
    btc: 1000,
    eth: 1890,
    ton: 1000,
  },
  {
    name: "1 Jun",
    btc: 1000,
    eth: 2390,
    ton: 1000,
  },
  {
    name: "1 Jul",
    btc: 1000,
    eth: 3490,
    ton: 1000,
  },
  {
    name: "1 Aug",
    btc: 1000,
    eth: 2780,
    sol: 2000,
    ton: 1000,
  },
  {
    name: "1 Sep",
    btc: 1000,
    eth: 1890,
    ton: 1000,
  },
  {
    name: "1 Oct",
    btc: 1000,
    eth: 2390,
    ton: 1000,
  },
  {
    name: "1 Nov",
    btc: 1000,
    eth: 3490,
    ton: 1000,
  },
  {
    name: "1 Dec",
    btc: 1000,
    eth: 3490,
    ton: 1000,
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

const getTonBalance = async (address: string) => {
  // Address: "EQCE0HgxgTE-GGP750FiitKIzuQKdbG9zOxVgy0kUNqgVQNI"
  try {
    const _bigNum = await tonClient.getBalance(address);
    const _balance = Number(_bigNum);

    return _balance / 1000000000;
  } catch (error) {
    console.error(error);
  }

  return;
};
const getSolanaBalance = async (address: string) => {
  console.log(process.env.NEXT_PUBLIC_ALCHEMY_SOLANA_API_KEY);
  try {
    const pubKey = new solanaWeb3.PublicKey(address);
    const balance = await solanaConnection.getBalance(pubKey);
    return balance;
  } catch (error) {
    console.error(error);
    
  }
  return;
}


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
      const eth = tokens.find((t: Token) => t.symbol === "ETH");

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
    } else if (walletType === WalletType.Ton) {
      const tokenBalance = await getTonBalance(address);
      const rate = fiatRates.find((r) => r.symbol === "TON");

      if (!rate) {
        return;
      }

      setPortfolioData((prev) => [
        ...prev,
        { name: "TON", value: tokenBalance * rate.price },
      ]);
    } else if (walletType === WalletType.Solana){
      const tokenBalance = await getSolanaBalance(address);
      const rate = fiatRates.find((r) => r.symbol === "SOL");

      if (!rate) {
        return;
      }

      setPortfolioData((prev) => [
        ...prev,
        { name: "SOL", value: tokenBalance * rate.price },
      ]);
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

        <div className="h-80">
          <PortfolioPieChart data={portfolioData} />
        </div>

        <div className="h-80">
          <BalanceChart data={mockBalanceHistoryData} />
        </div>
      </main>
    </div>
  );
}
