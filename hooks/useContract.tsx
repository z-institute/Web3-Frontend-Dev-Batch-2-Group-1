import React from "react";

import SoulFactory from "@/artifacts/contracts/SoulFactory.sol/SoulFactory.json";
const useContract = () => {
  return {
    SoulFactory: {
      address: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
      abi: SoulFactory.abi,
    },
  };
};

export default useContract;
