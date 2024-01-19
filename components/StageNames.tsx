import React from "react";
import { useContractRead } from "wagmi";

import useContract from "@/hooks/useContract";
import { useRouter } from "next/router";

const StageNames = () => {
  const router = useRouter();
  const { SoulFactory } = useContract();
  const { data, isLoading, refetch } = useContractRead({
    ...SoulFactory,
    functionName: "getSouls",
  });

  return (
    <div>
      <h2>Souls</h2>
      {isLoading ? (
        <></>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((el) => (
            <div key={el.addr} className="flex">
              <div
                className="w-[100px] cursor-pointer"
                onClick={() =>
                  router.push(`/profile?name=${el.name}&address=${el.addr}}`)
                }
              >
                {el.name}
              </div>
              <div>{el.addr}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StageNames;
