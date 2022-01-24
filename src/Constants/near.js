import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";

const { keyStores, KeyPair } = nearAPI;

const user = jwt.decode(localStorage.getItem("amplify_app_token"));

export const getNearKeys = async () => {
  let keystore = `near-api-js:keystore:${user.near_account_id}:testnet`;
  let auth_key = "amplify_art_wallet_auth_key";

  return {
    keystore,
    auth_key,
  };
};

export const getNearConfig = async () => {
  try {
    let net =
      process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`,
      appKeyPrefix: "amplify_art",
    };

    const near = await nearAPI.connect(config);
    return near;
  } catch (e) {
    console.error(e);
  }
};
