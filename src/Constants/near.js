import jwt from "jsonwebtoken";

export const getNearKeys = async () => {
  let user = jwt.decode(localStorage.getItem("amplify_app_token"));
  let keystore = `near-api-js:keystore:${user.near_account_id}:testnet`;
  let auth_key = "amplify_art_wallet_auth_key";

  return {
    keystore,
    auth_key,
  };
};
