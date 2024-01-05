import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  usd: number;
  eur: number;
  gbp: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    debugger;
    const response = await axios.get(
      `${process.env.COIN_MARKET_CAP_URL}/v2/cryptocurrency/quotes/latest`,
      {
        params: {
          id: 1,
          // USD: 2781, EUR: 2790, GBP: 2791
          // convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API,
        },
      }
    );
    res.status(200).json(response.data);
    return;
    // return response.data.result.rates;
  } catch (error) {
    console.error(error);
  }
  res.status(200).json({ usd: 40000, eur: 40000, gbp: 400000 });
}
