import * as solanaWeb3 from '@solana/web3.js';

const solanaConnection = new solanaWeb3.Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_SOLANA_API_KEY}`);

export default solanaConnection;
