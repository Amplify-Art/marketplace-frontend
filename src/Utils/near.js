import * as nearAPI from "near-api-js";
export const getTokens = async (wallet) => {
  const contract = new nearAPI.Contract(
    wallet.account(), // the account object that is connecting
    process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
    {
      // name of contract you're connecting to
      viewMethods: ["nft_tokens_for_owner"], // view methods do not change state but usually return a value
      changeMethods: ["addMessage"], // change methods modify state
      sender: wallet.account(), // account object to initialize and sign transactions.
    }
  );

  let result = await contract.nft_tokens_for_owner({
    account_id: wallet.getAccountId(),
    from_index: "0",
    limit: 1000,
  });
  return result;
};
