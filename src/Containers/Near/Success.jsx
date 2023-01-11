import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import q from 'querystring'
import { SignWallet } from '../../Api/Near';
import * as nearAPI from "near-api-js";

const {
  keyStores,
  utils: {
    // eslint-disable-next-line no-unused-vars
    format: { parseNearAmount },
  },
  KeyPair,
} = nearAPI;

const Success = ({ history }) => {
  let parsed = q.parse(history.location.search);
  let account_id = parsed['?account_id'];
  let auth_key =
    localStorage.getItem(
      `amplify_art_wallet_auth_key`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (auth_key && account_id) {
      generateToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account_id, auth_key]);

  const generateToken = async () => {
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
      let parsed = q.parse(history.location.search);
      const near = await nearAPI.connect(config);
      let pk = near.connection.signer.keyStore.localStorage[`near-api-js:keystore:${account_id}:${net}`]
      const keyPair = KeyPair.fromString(pk);

      const signedObj = keyPair.sign(Buffer.from(account_id));

      let signature = Array.from(signedObj.signature);
      const sign = await SignWallet({
        account_id: parsed['?account_id'],
        near_public_key: parsed['public_key'],
        signature: signature,
        pk,
      })
      if (sign.data.success) {
        localStorage.setItem('amplify_app_token', sign.data.token)
        history.push('/')
        window.location.reload()
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="display-none">Redirecting....</div>
  )
}

export default withRouter(Success)
