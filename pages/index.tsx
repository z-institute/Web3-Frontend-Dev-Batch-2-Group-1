import { useEffect, useState } from "react";

// API functions to fetch various data
import {
  getAddressData,
  getBalanceHistory,
  getBitcoinFiatRates,
} from "./api/fetchData";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AddressInput from "@/components/AddressInput";
import WalletStats from "@/components/WalletStats";
import BalanceChart from "@/components/BalanceChart";
import PortfolioPieChart from "@/components/PortfolioPieChart";

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
  const [addressData, setAddressData] = useState<WalletData>();
  const [balanceHistory, setBalanceHistory] = useState<unknown>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Default interval for balance history in seconds
  const [interval, setInterval] = useState("3600"); // Default to 3600 seconds (1 hour)
  // Default fiat rates set to 0, will be updated via API call
  const [fiatRate, setFiatRate] = useState({ USD: 0, EUR: 0, GBP: 0 });

  // useEffect hook to fetch fiat rates on component mount
  useEffect(() => {
    fetchBitcoinFiatRates();
  }, []);

  // Function to handle address form submission
  const handleAddressSubmit = async (address: string) => {
    const data = await getAddressData(address);
    setAddressData(data);
  };

  // Function to fetch balance history based on selected dates and interval
  const fetchBalanceHistory = async () => {
    if (!addressData) {
      return;
    }

    // Convert dates to timestamps
    const startTimestamp = Math.floor(startDate.getTime() / 1000);
    const endTimestamp = Math.floor(endDate.getTime() / 1000);

    const history = await getBalanceHistory(
      addressData.address,
      startTimestamp,
      endTimestamp,
      interval
    );
    setBalanceHistory(history);
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
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Bitcoin Explorer</h1>
        </div>
      </header>
      <main className="container">
        <AddressInput onAddressSubmit={handleAddressSubmit} />
        {addressData && (
          <div>
            <WalletStats walletData={addressData} fiatRate={fiatRate} />
            <div className="container mx-auto p-6">
              <h2 className="text-2xl font-bold text-center my-6">
                Bitcoin Balance Chart
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-6 shadow-lg p-6 rounded-lg bg-white">
                <div className="flex flex-col mb-3">
                  <label htmlFor="start-date" className="font-semibold mb-2">
                    Starting Date
                  </label>
                  <DatePicker
                    id="start-date"
                    selected={startDate}
                    onChange={(date) => date && setStartDate(date)}
                    className="w-full max-w-xs h-12 rounded-lg text-lg shadow-inner"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="end-date" className="font-semibold mb-2">
                    Ending Date
                  </label>
                  <DatePicker
                    id="end-date"
                    selected={endDate}
                    onChange={(date) => date && setEndDate(date)}
                    className="w-full max-w-xs h-12 rounded-lg text-lg shadow-inner border"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="time-interval" className="font-semibold mb-2">
                    Time Interval
                  </label>
                  <select
                    id="time-interval"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    className="w-full max-w-xs h-12 rounded-lg text-lg shadow-inner border"
                  >
                    <option value="3600">1 Hour</option>
                    <option value="14400">4 Hours</option>
                    <option value="86400">Daily</option>
                    <option value="604800">Weekly</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={fetchBalanceHistory}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Load History
                </button>
              </div>
            </div>
          </div>
        )}

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
