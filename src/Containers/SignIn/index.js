import React, { useState, useEffect } from 'react';
import * as nearAPI from "near-api-js";
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../Components/Common/Button/index';
import { createWallet } from '../../Api/Near';
import './SignIn.scss';
import { displayLoadingOverlayAction } from '../../redux/actions/GlobalAction'

const { keyStores, WalletConnection, utils } = nearAPI;


function SignIn(props) {
  const user = jwt.decode(localStorage.getItem('amplify_app_token'))

  const [wallet, setWallet] = useState(null)
  const [isWalletSigned, setIsWalletSigned] = useState(user.near_connected)
  const [balance, setBalance] = useState(null)
  useEffect(async () => {
    let net = process.env.REACT_APP_CONTEXT === 'production' ? 'mainnet' : 'testnet'
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`
    };
    const near = await nearAPI.connect(config);
    const wallet = new WalletConnection(near);
    setWallet(wallet)
  }, [])

  const onConnect = () => {
    props.displayLoadingOverlay();
    try {
      if (wallet.isSignedIn()) {
        wallet.requestSignIn()
        return
      } else {
        wallet.requestSignIn(
          "test", // by this time, we dont have the account to connect so just passing as test
          "Amplify App",
          `${window.location.origin}/near/success`,  // optional
          `${window.location.origin}/near/failure`
        );
      }
    } catch (e) {
      console.log(e)
    }

  }

  const getAccountDetails = async () => {
    let net = process.env.REACT_APP_CONTEXT === 'production' ? 'mainnet' : 'testnet'
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`
    };
    try {
      const near = await nearAPI.connect(config);
      const account = await near.account(user.near_account_id);

      let balances = await account.getAccountBalance();
      setBalance(balances)
    } catch (e) {
      console.error(e);
    }
  }
  const onCreate = async () => {
    props.displayLoadingOverlay();
    const create = await createWallet()
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
      {user && !user.near_connected &&
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

export default connect(null, dispatch => {
  return {
    displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction())
  }
})(withRouter(SignIn));
