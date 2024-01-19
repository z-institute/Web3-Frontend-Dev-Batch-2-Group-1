import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ConnectKitButton, useChains } from "connectkit";
import { useSwitchNetwork, useContractRead } from "wagmi";

import CrearteSoul from "@/components/CrearteSoul";
const StageNames = dynamic(() => import("../components/StageNames"), {
  ssr: false,
});

export default function Identity() {
  const chains = useChains();
  const [name, setName] = useState("");
  const { switchNetwork } = useSwitchNetwork();

  return (
    <div>
      <header className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">God Tier Wallet Analytics</a>
        </div>
        <div className="flex-none">
          <select onChange={(e) => switchNetwork(e.target.value)}>
            {chains.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <ConnectKitButton />
        </div>
      </header>
      <StageNames />
      <div>
        <div className="flex justify-end px-3 py-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CrearteSoul name={name} />
        </div>
      </div>
    </div>
  );
}
