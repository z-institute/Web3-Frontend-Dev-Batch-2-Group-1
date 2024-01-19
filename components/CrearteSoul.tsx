import useContract from "@/hooks/useContract";
import React from "react";
import { useContractWrite } from "wagmi";

const CrearteSoul = ({ name }) => {
  const { SoulFactory } = useContract();
  const ContractWrite = useContractWrite({
    ...SoulFactory,
    functionName: "createSoul",
  });

  return (
    <button
      className="px-4 py-1 bg-sky-500/75 hover:bg-sky-500/50 rounded-lg"
      onClick={() => {
        ContractWrite.write({ args: [name] });
        console.log(
          ContractWrite.isLoading,
          ContractWrite.isSuccess,
          ContractWrite.data
        );
      }}
    >
      Create soul
    </button>
  );
};

export default CrearteSoul;
