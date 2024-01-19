import React from "react";

import SoulFactory from "@/artifacts/contracts/SoulFactory.sol/SoulFactory.json";
const useContract = () => {
  return {
    SoulFactory: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: SoulFactory.abi,
    },
  };
};

export default useContract;
