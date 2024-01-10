import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// BTC: 1, ETH: 1027, SOL: 5426, TON: 11419
const CoinMarketCapIds = [1, 1027, 5426, 11419];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // snapshot to prevent API calls limit
  res.status(200).json([
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
  return;

  const r = await Promise.all(
    CoinMarketCapIds.map(async (id) => {
      try {
        const response = await axios.get(
          `${process.env.COIN_MARKET_CAP_HOST}/v2/cryptocurrency/quotes/latest`,
          {
            params: {
              id,
              // USD: 2781, EUR: 2790, GBP: 2791
              // convert: "USD",
            },
            headers: {
              "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
            },
          }
        );
        return {
          symbol: response.data.data[id].symbol,
          price: response.data.data[id].quote.USD.price,
        };
        // return response.data.data[id].quote.USD;
      } catch (error) {
        console.error(error);
      }
      return;
    })
  );

  res.status(200).json(r);
}
