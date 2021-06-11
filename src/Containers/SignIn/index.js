import React, { useState, useEffect } from 'react';
import * as nearAPI from "near-api-js";
import jwt from 'jsonwebtoken';
import Button from '../../Components/Common/Button/index';
import { createWallet } from '../../Api/Near';
import './SignIn.scss';

const { keyStores, connect, WalletConnection, utils } = nearAPI;


function SignIn(props) {
  const user = jwt.decode(localStorage.getItem('amplify_app_token'))
  console.log(user, 'user')
  const [wallet, setWallet] = useState(null)
  const [isWalletSigned, setIsWalletSigned] = useState(user.near_connected)
  const [balance, setBalance] = useState(null)
  useEffect(async () => {
    const config = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org'
    };
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    setWallet(wallet)
  }, [])
  useEffect(async () => {
    console.log(user, wallet)
    if (wallet && !isWalletSigned) {
      wallet.requestSignIn(
        // user.near_account_id,     // contract requesting access 
        "Example App",                  // optional
        `${window.location.origin}/near/success`,  // optional
        `${window.location.origin}/near/failure`   // optional
      );
    }
  }, [wallet])
  const onConnect = () => {
    console.log("COMES", wallet)
    if (wallet.isSignedIn()) {
      console.log('Its already signed in')
      return
    } else
      wallet.requestSignIn(
        user.near_account_id,     // contract requesting access 
        "Example App",                  // optional
        `${window.location.origin}/near/success`,  // optional
        `${window.location.origin}/near/failure`   // optional
      );
  }

  const getAccountDetails = async () => {
    const config = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org'
    };
    try {
      const near = await connect(config);
      const account = await near.account(user.near_account_id);
      console.log(account, 'account')
      let balances = await account.getAccountBalance();
      setBalance(balances)
    } catch (e) {
      console.error(e);
    }
  }
  const onCreate = async () => {
    const create = await createWallet()
    console.log(create, 'create')
    if (create.data.success) {
      localStorage.setItem('amplify_app_token', create.data.token)
      window.location.reload()
    }
  }
  useEffect(() => {
    if (isWalletSigned) {
      getAccountDetails()
    }
  }, [isWalletSigned])
  return (
    <div className="sign-in-contain">
      <h1>Welcome</h1>
      {!user.near_connected &&
        < div className="buttons">
          <Button
            text="Connect to Near Wallet"
            onClick={() => onConnect()}
          />

          <Button
            text="Create New Wallet"
            onClick={() => onCreate()}
          />
        </div>
      }
      {user.near_connected && balance && <div className="details">
        <h3>Account Details</h3>
        <span>Total : <span>{Number(utils.format.formatNearAmount(balance.total)).toFixed(5)}</span></span>
        <br />
        <span>Available : <span>{Number(utils.format.formatNearAmount(balance.available)).toFixed(5)}</span></span>
      </div>
      }
    </div >
  );
}

export default SignIn;
