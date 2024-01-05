import React, { FormEvent, useState } from "react";

interface AddressInputProps {
  onAddressSubmit: (address: string) => void;
}
// Component for inputting a Bitcoin address, which calls the onAddressSubmit prop on form submission.
const AddressInput = ({ onAddressSubmit }: AddressInputProps) => {
  // State hook to store and set the Bitcoin address
  const [address, setAddress] = useState("");

  // Function to handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddressSubmit(address);
  };

  return (
    // Form container with styling for center alignment and padding
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-2">
          <label
            htmlFor="address"
            className="block text-gray-700 text-lg font-bold mb-2"
          >
            Balance and Chart of Bitcoin Addresses
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Bitcoin address"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInput;
