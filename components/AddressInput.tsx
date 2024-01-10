import React, { useState } from "react";
import AddWalletButton from "./AddWalletButton";
import { WalletType } from "@/enums/WalletType";

interface AddressInputProps {
  onAddWalletAddress: (address: string, walletType: WalletType) => void;
}
// Component for inputting a Bitcoin address, which calls the onAddressSubmit prop on form submission.
const AddressInput = ({
  onAddWalletAddress: onAddressSubmit,
}: AddressInputProps) => {
  // State hook to store and set the Bitcoin address
  const [address, setAddress] = useState("");

  // Function to handle form submission
  const handleSubmit = (walletType: WalletType) => {
    onAddressSubmit(address, walletType);
  };

  return (
    // Form container with styling for center alignment and padding
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-2">
        <div className="mt-1">
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input w-full"
            placeholder="Enter address"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <AddWalletButton onSelectWalletType={handleSubmit} />
      </div>
    </div>
  );
};

export default AddressInput;
