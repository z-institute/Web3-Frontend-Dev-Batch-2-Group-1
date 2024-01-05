import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Network, Alchemy, Utils } from "alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const DEFAULT_WALLET_ADDRESS = "0x220866B1A2219f40e72f5c628B65D54268cA3A9D";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const balances = await alchemy.core.getTokenBalances(
      DEFAULT_WALLET_ADDRESS
    );

    // Remove tokens with zero balance
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return parseInt(token.tokenBalance || "0", 16) !== 0;
    });

    // Loop through all tokens with non-zero balance
    const response = await Promise.all(
      nonZeroBalances.map(async (token) => {
        // Get balance of token
        let balance = parseInt(token.tokenBalance || "0");

        // Get metadata of token
        const metadata = await alchemy.core.getTokenMetadata(
          token.contractAddress
        );

        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata.decimals || 0);

        return {
          name: metadata.name,
          symbol: metadata.symbol,
          logo: metadata.logo,
          contractAddress: token.contractAddress,
          tokenBalance: balance.toFixed(4),
        };
      })
    );

    let balance = await alchemy.core.getBalance(
      DEFAULT_WALLET_ADDRESS,
      "latest"
    );
    response.unshift({
      name: "Ethereum",
      symbol: "ETH",
      logo: "",
      contractAddress: "",
      tokenBalance: Utils.formatEther(balance),
    });

    res.status(200).json(response);
    return;
  } catch (error) {
    console.error(error);
  }
}
