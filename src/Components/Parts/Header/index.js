import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as nearAPI from "near-api-js";
import axios from 'axios';
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
import { fetchSearchResult } from '../../../redux/actions/SearchResAction';
import './Header.scss';
import q from 'querystring';
import { store } from 'react-notifications-component';

const { keyStores, WalletConnection, utils } = nearAPI;

function Header(props) {
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));

  const [wallet, setWallet] = useState(null);
  const [isWalletSigned, setIsWalletSigned] = useState(user && user.near_connected);
  const [balance, setBalance] = useState(null);
  const [nearPrice, setNearPrice] = useState(0);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (props.history.location.pathname && props.history.location.pathname !== '/search-result') {
      setSearch('')
    }
  }, [props.history.location.pathname])

  useEffect(() => {
    if (props.history.location.search) {
      let querySearch = q.parse(props.history.location.search && props.history.location.search.replace('?', ''))
      setSearch(querySearch.search)
      props.searchRes(querySearch.search)
    }
  }, [props.history.location.search])

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
    const create = await createWallet()
    if (create.data.success) {
      localStorage.setItem('amplify_app_token', create.data.token)
      store.addNotification({
        title: "Success",
        message: 'NEAR wallet has been created',
        type: "success",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      window.location.reload()
    }
    else {
      store.addNotification({
        title: "Error",
        message: 'Error while creating NEAR wallet',
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
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

  const handleSearch = async (e) => {
    setSearch(e.target.value)
  }
  const handleSubmit = (e) => {
    if (e.target.value && (e.key === 'Enter' || e.keyCode === 13)) {
      props.searchRes(e.target.value)
      props.history.push(`/search-result?search=${search}`)
    }
  }
  const userToken = localStorage.getItem('amplify_app_token');

  let userDetails = {};

  if (userToken) {
    userDetails = jwt_decode(userToken);
  }

  const getNearPrice = () => {
    // https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD').then(res => {
      setNearPrice(res.data.USD);
    });
  }

  useEffect(() => {
    if (showWalletSidebar) {
      console.log('nearPrice')
      getNearPrice()
    }
  }, [showWalletSidebar])

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
          <input type="text" placeholder="Search for songs, artists..." onChange={handleSearch} onKeyDown={handleSubmit} value={search} />
        </div>

        <div className="right">
          {userToken ? (
            <>
              {/* <div className="bell"><img src={BellIcon} alt="Bell" /></div> */}
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
              {/* TODO: Convert NEAR to USD using API */}
              <div className="stat-holder">
                <p>Available Balance:</p>
                <div className="stat">
                  ${(nearPrice * (balance && balance.available / 10 ** 24)).toFixed(2)} / <span className="near-icon">Ⓝ</span> {balance && balance.available / 10 ** 24}
                </div>
              </div>

              <div className="stat-holder">
                <p>Total :</p>
                <div className="stat">
                  {Number(utils.format.formatNearAmount(balance.total)).toFixed(5)}
                </div>
              </div>

              <div className="stat-holder">
                <p>Available:</p>
                <div className="stat">
                  {Number(utils.format.formatNearAmount(balance.available)).toFixed(5)}
                </div>
              </div>
              <a href={`https://buy-staging.moonpay.com?apiKey=pk_test_Atula0B14cvDEjG2VohLCsa2bmhInRk&currencyCode=eth&email=${encodeURIComponent(user.email)}&walletAddress=${user.near_account_id}`} target="_blank" rel="noopener noreferrer">Buy More NEAR</a>
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

export default connect(state => {
  return {
    showWalletSidebar: state.global.showWallet
  }
}, dispatch => {
  return {
    displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
    toggleMobileMenu: () => dispatch(toggleMobileMenuAction()),
    searchRes: (payload) => dispatch(fetchSearchResult(payload))
  }
})(withRouter(Header));
