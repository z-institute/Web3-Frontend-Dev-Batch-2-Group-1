import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const btcAddress = req.query.address as string;

  try {
    const apiUrl = `https://blockchain.info/balance?active=${btcAddress}`;
    const response = await axios.get(apiUrl);
    res.status(200).json({
      name: "Bitcoin",
      symbol: "BTC",
      logo: "",
      tokenBalance: response.data[btcAddress].final_balance / 100000000,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
}
