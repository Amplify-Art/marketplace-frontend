/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as nearAPI from "near-api-js";
import jwt from "jsonwebtoken";
const { keyStores, WalletConnection } = nearAPI;

function Header(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  const [wallet, setWallet] = useState(null);
  const [isWalletSigned] = useState(user && user.near_connected);
  const [, setBalance] = useState(null);
  const [, setShowSearchResult] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(async () => {
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const near = await nearAPI.connect(config);
    const wallet = new WalletConnection(near);
    setWallet(wallet);
  }, []);
  useEffect(async () => {
    if (wallet && !isWalletSigned) {
      wallet.requestSignIn(
        user.near_account_id, // contract requesting access
        "Example App", // optional
        `${window.location.origin}/near/success`, // optional
        `${window.location.origin}/near/failure` // optional
      );
    }
  }, [wallet]);

  const getAccountDetails = async () => {
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    try {
      const near = await nearAPI.connect(config);
      const account = await near.account(user.near_account_id);

      let balances = await account.getAccountBalance();
      setBalance(balances);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isWalletSigned) {
      getAccountDetails();
    }
  }, [isWalletSigned]);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setShowSearchResult(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickNFTMethod = () => {
    getAccountDetails();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handleClickNFTMethod}>Call NFT method</button>
    </div>
  );
}

export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {};
  }
)(withRouter(Header));
