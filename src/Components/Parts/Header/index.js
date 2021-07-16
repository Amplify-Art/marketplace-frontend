import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as nearAPI from "near-api-js";
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { createWallet } from '../../../Api/Near';
import MenuIcon from '../../../assets/images/menu-icon.svg';
import MenuIconNew from '../../../assets/images/menu-icon-new.svg';
import Logo from '../../../assets/images/logo.svg';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BellIcon from '../../../assets/images/bell-icon.svg';
import Wallet from '../../../assets/images/wallet-icon.svg';
import Harrison from '../../../assets/images/harrison.jpeg';
import Button from '../../Common/Button/index';
import { displayLoadingOverlayAction, toggleMobileMenuAction } from '../../../redux/actions/GlobalAction';
import {fetchSearchResult } from '../../../redux/actions/SearchResAction';
import './Header.scss';

const { keyStores, WalletConnection, utils } = nearAPI;

function Header(props) {
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));

  const [wallet, setWallet] = useState(null);
  const [isWalletSigned, setIsWalletSigned] = useState(user && user.near_connected);
  const [balance, setBalance] = useState(null);

  const { path, showWalletSidebar, toggleWalletSidebar, toggleMobileMenu } = props;

  useEffect(async () => {
    const config = {
      networkId: 'testnet',
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org'
    };
    const near = await nearAPI.connect(config);
    const wallet = new WalletConnection(near);
    setWallet(wallet)
  }, [])
  useEffect(async () => {
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
    if (wallet.isSignedIn()) {
      return
    } else
      wallet.requestSignIn(
        "test",     // at this time, , we dont have account, passing test
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
    return
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
  }, [isWalletSigned]);

  const setBreadCrumbs = () => {
    let currentPage = '';

    switch (path) {
      case '/albums':
        currentPage = 'Albums';
        break
      case '/my-profile':
        currentPage = 'My Profile';
        break
      case path.includes('/artist/'):
        // Need to pull this from the database response... leaving it hard-coded for now... TODO!!
        currentPage = 'Eminem';
        break;
    }
    return currentPage;
  }

  const handleSearch = async(e) => {
      console.log("search resulut=-------------------->",props)
      await props.searchRes(e.target.value)
      if(e.target.value)
        await props.history.push("/search-result")
      else
        await props.history.push("/")
  }

  const userToken = localStorage.getItem('amplify_app_token');

  let userDetails = {};

  if (userToken) {
    userDetails = jwt_decode(userToken);
  }
  return (
    <>
      <header>
        {/* <div className="menu">
          <img src={MenuIcon} alt="Menu Icon" />
        </div> */}
        <div className="logo">
          <Link to='/' >
            <img src={Logo} alt="Amplify.Art" />
          </Link>
        </div>

        <div className="search">
          <img src={SearchIcon} alt="Search" />
          <input type="text" placeholder="Search for songs, artists..." onChange={handleSearch} />
        </div>

        <div className="right">
          {userToken ? (
            <>
              <div className="bell"><img src={BellIcon} alt="Bell" /></div>
              <div className="wallet"><img src={Wallet} alt="wallet" onClick={() => toggleWalletSidebar(!showWalletSidebar)} /></div>
              <div className="mobile-menu" onClick={toggleMobileMenu}>
                <img src={MenuIconNew} />
              </div>
              <div className="user">
                <img src={userDetails.avatar} />
              </div>
            </>
          ) : (
            <Link to="/auth/login" className="top-login">
              <span>Login</span>
            </Link>
          )}
        </div>
      </header>

      {setBreadCrumbs() &&
        <div className="breadcrumbs left-nav-pad">
          <div className="container">
            Home / <span className="current">{path && setBreadCrumbs()}</span>
          </div>
        </div>
      }

      {showWalletSidebar && (
        <>
          <div className="wallet-info">
            <h4>Your Wallet:</h4>
            {user.near_connected && balance && <div className="details">
              <h3>Account Details</h3>
              <p>Available Balance: $200 / {balance && balance.available / 10 ** 24} <span className="near-icon">Ⓝ</span></p>
              <span>Total : <span>{Number(utils.format.formatNearAmount(balance.total)).toFixed(5)}</span></span>
              <br />
              <span>Available : <span>{Number(utils.format.formatNearAmount(balance.available)).toFixed(5)}</span> <span className="near-icon">Ⓝ</span></span>
            </div>
            }
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
          </div>

          <div className="sidebar-close-cover" onClick={() => toggleWalletSidebar(!showWalletSidebar)} />
        </>
      )}
    </>
  );
}

export default connect(null, dispatch => {
  return {
    displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
    toggleMobileMenu: () => dispatch(toggleMobileMenuAction()),
    searchRes: (payload) => dispatch(fetchSearchResult(payload))
  }
})(withRouter(Header));
