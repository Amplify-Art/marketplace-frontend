import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import q from 'querystring'
import { LinkWallet, SignWallet } from '../../Api/Near';
import * as nearAPI from "near-api-js";
import axios from "axios";

const {
  keyStores,
  WalletConnection,
  utils,
  utils: {
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
  useEffect(async () => {
    let net =
      process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";
    if (auth_key && account_id) {
      let pk =
        localStorage.getItem(
          `near-api-js:keystore:${account_id}:${net}`
        );
      generateToken();
    }
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
