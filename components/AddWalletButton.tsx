import React from "react";
import { WalletType } from "@/enums/WalletType";

interface AddWalletButtonProps {
  onSelectWalletType: (walletType: WalletType) => void;
}

const AddWalletButton = ({ onSelectWalletType }: AddWalletButtonProps) => {
  return (
    <details className="dropdown">
      <summary className="m1 btn btn-primary">Add Wallet</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <button onClick={() => onSelectWalletType(WalletType.Bitcoin)}>
            Bitcoin wallet
          </button>
        </li>
        <li>
          <button onClick={() => onSelectWalletType(WalletType.Evm)}>
            EVM wallet
          </button>
        </li>
        <li>
          <button onClick={() => onSelectWalletType(WalletType.Solana)}>
            Solana wallet
          </button>
        </li>
        <li>
          <button onClick={() => onSelectWalletType(WalletType.Ton)}>
            TON wallet
          </button>
        </li>
      </ul>
    </details>
  );
};

export default AddWalletButton;
