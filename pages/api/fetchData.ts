import axios from "axios";

// Function to get data for a specific Bitcoin address
export const getAddressData = async (address: string) => {
  if (!process.env.QUIK_NODE_HOST) {
    return;
  }

  const postData = {
    method: "bb_getaddress", // The RPC method for getting address data
    params: [address], // The parameters for the method, in this case, the Bitcoin address
    id: 1,
    jsonrpc: "2.0",
  };

  try {
    const response = await axios.post(process.env.QUIK_NODE_HOST, postData, {
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};

// TODO: change to other API
// Function to get Bitcoin fiat rates for a specific timestamp
export const getBitcoinFiatRates = async (timestampUnix: number) => {
  try {
    const response = await axios.get("/api/btcusd");
    return response.data[1].quote.USD;
  } catch (error) {
    console.error(error);
  }

  return { usd: 40000, eur: 40000, gbp: 400000 };
};

// Function to get the balance history for a Bitcoin address
export const getBalanceHistory = async (
  address: string,
  from: number,
  to: number,
  groupBy: string
) => {
  const postData = {
    method: "bb_getbalancehistory", // The RPC method for getting balance history
    params: [
      address, // The Bitcoin address
      {
        from: from.toString(), // Start of the time range as a string
        to: to.toString(), // End of the time range as a string
        fiatcurrency: "usd", // The fiat currency to get the balance in
        groupBy: groupBy, // The grouping interval for balance history
      },
    ],
    id: 1,
    jsonrpc: "2.0",
  };

  try {
    const response = await axios.post(BASE_URL, postData, {
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
