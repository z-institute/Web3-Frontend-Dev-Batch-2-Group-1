import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  usd: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await axios.get(
      `${process.env.COIN_MARKET_CAP_HOST}/v2/cryptocurrency/quotes/latest`,
      {
        params: {
          id: 1,
          // USD: 2781, EUR: 2790, GBP: 2791
          // convert: "USD",
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
    return;
    // return response.data.result.rates;
  } catch (error) {
    console.error(error);
  }
  res.status(500);
}
