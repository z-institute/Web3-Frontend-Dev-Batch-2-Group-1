import { TonClient } from "@ton/ton";

const tonClient = new TonClient({
  endpoint: "https://toncenter.com/api/v2/jsonRPC",
});

export default tonClient;
