import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as nearAPI from "near-api-js";
import axios from "axios";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { createWallet } from "../../../Api/Near";
import MenuIcon from "../../../assets/images/menu-icon.svg";
import Logo from "../../../assets/images/logo.svg";
import SearchIcon from "../../../assets/images/search-icon.svg";
import Wallet from "../../../assets/images/wallet-icon.svg";
import CDIcon from "../../../assets/images/cd-icon.svg";
import Button from "../../Common/Button/index";
import useDebounce from "../../Common/UseDebounce";
import SearchResultCard from "../SearchResultCard";
import {
  displayLoadingOverlayAction,
  toggleMobileMenuAction,
  setWalletAction,
  sendNotificationAction,
  setCurrentNearPrice,
  togglePlayingAction,
} from "../../../redux/actions/GlobalAction";
import {
  setNearBalanceAction,
  fetchUserAction,
} from "../../../redux/actions/UserAction";
import {
  fetchSearchResult,
  setIsSongSelected,
  storeSelectedAlbum,
  setIsAlbumSelected,
  showSearchResultAction,
  hideSearchResultAction,
} from "../../../redux/actions/SearchResAction";
import "./Header.scss";
import Login from "../../../Containers/Login";
import { togglePlayerAction } from "../../../redux/actions/GlobalAction";
import defaultProfile from "../../../assets/images/default-profile.svg";

const {
  keyStores,
  WalletConnection,
  utils,
  utils: {
    // eslint-disable-next-line no-unused-vars
    format: { parseNearAmount },
  },
} = nearAPI;

function Header(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  const [wallet, setWalletState] = useState(null);
  const [isWalletSigned,] = useState(
    user && user.near_connected
  );
  const [balance, setBalance] = useState(null);
  const [nearPrice, setNearPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (
      props.history.location.pathname &&
      props.history.location.pathname !== "/search-result"
    ) {
      setSearch("");
    }
    if (isWalletSigned) {
      getAccountDetails();
    }
    props.setCurrentNearPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history.location.pathname]);

  // useEffect(() => {
  //   if (props.history.location.search) {
  //     let querySearch = q.parse(props.history.location.search && props.history.location.search.replace('?', ''))
  //     setSearch(querySearch.search)
  //     props.searchRes(querySearch.search)
  //   }
  // }, [props.history.location.search])

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== "") {
      props.searchRes(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const {
    showWalletSidebar,
    toggleWalletSidebar,
    toggleMobileMenu,
    searchLoading,
    searchResult,
    showMobileMenu,
  } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
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
    const wallet = new WalletConnection(near, "amplify_art");
    setWalletState(wallet);
    props.setWallet(wallet);
    return () => {
      setWalletState(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let token = localStorage.getItem("amplify_app_token");
    if (
      wallet &&
      !wallet.isSignedIn() &&
      token &&
      user.near_account_type === "connected"
    ) {
      wallet.requestSignIn(
        user.near_account_id, // contract requesting access
        "Example App", // optional
        `${window.location.origin}/near/success`, // optional
        `${window.location.origin}/near/failure` // optional
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const onConnect = () => {
    if (wallet.isSignedIn()) {
      return;
    } else
      wallet.requestSignIn(
        process.env.REACT_APP_CONTEXT === "production"
          ? "amplifyapp.near"
          : "pay.amplifybeta.testnet", // at this time, , we dont have account, passing test
        "Example App", // optional
        `${window.location.origin}/near/success`, // optional
        `${window.location.origin}/near/failure` // optional
      );
  };

  const getAccountDetails = async () => {
    let net =
      process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`,
    };
    try {
      const near = await nearAPI.connect(config);
      const account = await near.account(user.near_account_id);
      let balances = await account.getAccountBalance();
      setBalance(balances);
      props.setNearBalance(balances.available);
    } catch (e) {
      console.error(e);
    }
  };

  const onCreate = async () => {
    props.displayLoadingOverlay();
    const create = await createWallet();
    if (create.data && create.data.success) {
      localStorage.setItem("amplify_app_token", create.data.token);
      toast.success("Your NEAR wallet has been created.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.reload();
    } else {
      toast.error("Error while creating your NEAR wallet.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (isWalletSigned) {
      getAccountDetails();
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWalletSigned]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    if (e.target.value && (e.key === "Enter" || e.keyCode === 13)) {
      props.searchRes(e.target.value);
      props.history.push(`/search-result?search=${search}`);
    }
  };
  const userToken = localStorage.getItem("amplify_app_token");
  useEffect(() => {
    if (userToken) {
      const { id } = jwt_decode(userToken);
      props.fetchUser({ id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNearPrice = () => {
    // https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD"
      )
      .then((res) => {
        setNearPrice(res.data.USD);
      });
  };

  const handleSearchClicked = (type, data) => {
    if (type === "Artist") {
      props.history.push(`/artist/${data.near_account_id}`);
      props.hideSearchResult();
    } else if (type === "Album") {
      props.history.push(`/search-result?search=${search}`);
      props.setSelectedAlbum({ albumData: data });
      props.setIsAlbumSelected({ isAlbumSelected: true });
      props.hideSearchResult();
    } else {
      props.history.push(`/search-result?search=${search}`);
      props.setIsSongSelected();
      props.hideSearchResult();
    }
  };

  const handleCloseWalletSidebar = () => {
    if (isWalletSigned) {
      toggleWalletSidebar(!showWalletSidebar);
    } else {
      props.sendNotificationAction({
        success: false,
        message: "Please create wallet",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        props.hideSearchResult();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperRef]);

  useEffect(() => {
    if (showWalletSidebar) {
      // fetch latest account balance
      if (isWalletSigned) {
        getAccountDetails();
      }
      getNearPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWalletSidebar]);

  const hasData = () => {
    if (searchResult.results) {
      if (!searchResult.results.some((d) => d.data.length)) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <header>
        <div className="mobile-menu" onClick={toggleMobileMenu}>
          <img src={MenuIcon} alt="menu" />
        </div>
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Amplify.Art" />
          </a>
        </div>
        {!showMobileMenu && (
          <div ref={wrapperRef} className="searchWrapper">
            <div className="search">
              <img src={SearchIcon} alt="Search" />
              <input
                type="text"
                placeholder="Search for artists, albums or tracks"
                onClick={() => props.showSearchResultFn()}
                onChange={handleSearch}
                onKeyDown={handleSubmit}
                value={search}
              />
            </div>
            {search.trim() !== "" && props.showSearchResult && (
              <div
                className={`scrollSearchResult ${hasData() && !searchLoading ? "p-0" : ""
                  }`}
              >
                {searchLoading
                  ? "Loading..." // TODO: can add any animation
                  : searchResult &&
                  searchResult.results &&
                  searchResult.results.length && (
                    <SearchResultCard
                      handleClick={(type, data) =>
                        handleSearchClicked(type, data)
                      }
                    />
                  )}
              </div>
            )}
          </div>
        )}
        <div className="right">
          {userToken ? (
            <>
              {props.currentPlaylists.length ? (
                <div className="cd" onClick={() => props.togglePlayer()}>
                  <img src={CDIcon} alt="wallet" className={props.isPlaying && 'endless-rotate'} />
                </div>
              ) : null}
              {/* <div className="bell"><img src={BellIcon} alt="Bell" /></div> */}
              <div className="wallet">
                <Link to="/wallet">
                  <img src={Wallet} alt="wallet" />
                </Link>
              </div>
              <div
                className="user"
                onClick={() => props.history.push("/my-profile")}
              >
                <div
                  className="profilePic"
                  style={{
                    backgroundImage: `url(${!props.userDetails.avatar
                      ? defaultProfile
                      : props.userDetails.avatar
                      })`,
                  }}
                />
                {/* <img
                  src={
                    !userDetails.avatar ? defaultProfile : userDetails.avatar
                  }
                  alt='avatar'
                /> */}
              </div>
            </>
          ) : (
            <>
              {!showMobileMenu &&
                <div className="lm-button" style={{ color: "white", marginRight: "20px", position: "relative", cursor: "pointer" }} onClick={() => setOpenPopup(!openPopup)}>
                  <span style={{ marginRight: "5px" }}>Learn More</span>
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                  {openPopup && (
                    <div className="popUp">
                      <div className="popup-div">
                        <a href="#we-are-for">Who We're For</a>
                      </div>
                      <div className="popup-div">
                        <a href="#how-it-works">How It Works</a>
                      </div>
                      <div className="popup-div">
                        <a href="#the-team">Team & Supporters</a>
                      </div>
                    </div>
                  )}
                </div>
              }
              <Login onConnect={onConnect} />
            </>
          )}
        </div>
      </header>

      {/* {setBreadCrumbs() && (
        <div className="breadcrumbs left-nav-pad">
          <div className="container">
            <span className="home" onClick={() => props.history.push("/")}>
              Home{" "}
            </span>
            / <span className="current">{path && setBreadCrumbs()}</span>
          </div>
        </div>
      )}*/}

      {false && (
        <>
          <div className="wallet-info">
            <h4>Your Wallet:</h4>
            {user.near_connected && balance && (
              <div className="details">
                <h3>Account Details</h3>
                {/* TODO: Convert NEAR to USD using API */}
                <div className="stat-holder">
                  <p>Available Balance:</p>
                  <div className="stat">
                    $
                    {(
                      nearPrice * (balance && balance.available / 10 ** 24)
                    ).toFixed(2)}{" "}
                    / <span className="near-icon">Ⓝ</span>{" "}
                    {balance && balance.available / 10 ** 24}
                  </div>
                </div>

                <div className="stat-holder">
                  <p>Total :</p>
                  <div className="stat">
                    {Number(
                      utils.format.formatNearAmount(balance.total)
                    ).toFixed(5)}
                  </div>
                </div>

                <div className="stat-holder">
                  <p>Available:</p>
                  <div className="stat">
                    {Number(
                      utils.format.formatNearAmount(balance.available)
                    ).toFixed(5)}
                  </div>
                </div>
                <a
                  href={`https://buy${process.env.REACT_APP_CONTEXT === "production"
                    ? ""
                    : "-staging"
                    }.moonpay.com?apiKey=pk_test_Atula0B14cvDEjG2VohLCsa2bmhInRk&currencyCode=eth&email=${encodeURIComponent(
                      user.email
                    )}&walletAddress=${user.near_account_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy More NEAR
                </a>
              </div>
            )}
            {user && !user.near_connected && (
              <div className="buttons">
                <Button
                  text="Connect to Near Wallet"
                  onClick={() => onConnect()}
                />
                <span>OR</span>
                <Button text="Create New Wallet" onClick={() => onCreate()} />
              </div>
            )}
          </div>

          <div
            className="sidebar-close-cover"
            onClick={handleCloseWalletSidebar}
          />
        </>
      )}
    </>
  );
}

export default connect(
  (state) => {
    return {
      showWalletSidebar: state.global.showWallet,
      showMobileMenu: state.global.mobileMenu,
      searchResult: state.searchRes.searchResult,
      searchLoading: state.searchRes.loading,
      wallet: state.global.wallet,
      currentPlaylists: state.playlists.current_playlists,
      showSearchResult: state.searchRes.showSearchResult,
      userDetails: state.users.user,
      isPlaying: state.global.isPlaying,
    };
  },
  (dispatch) => {
    return {
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
      toggleMobileMenu: () => dispatch(toggleMobileMenuAction()),
      sendNotificationAction: (payload) =>
        dispatch(sendNotificationAction(payload)),
      searchRes: (payload) => dispatch(fetchSearchResult(payload)),
      setNearBalance: (payload) => dispatch(setNearBalanceAction(payload)),
      setSelectedAlbum: (payload) => dispatch(storeSelectedAlbum(payload)),
      setIsSongSelected: () => dispatch(setIsSongSelected()),
      setIsAlbumSelected: (payload) => dispatch(setIsAlbumSelected(payload)),
      setWallet: (payload) => dispatch(setWalletAction(payload)),
      setCurrentNearPrice: () => dispatch(setCurrentNearPrice()),
      togglePlayer: () => dispatch(togglePlayerAction()),
      showSearchResultFn: () => dispatch(showSearchResultAction()),
      hideSearchResult: () => dispatch(hideSearchResultAction()),
      fetchUser: (data) => dispatch(fetchUserAction(data)),
      togglePlaying: () => dispatch(togglePlayingAction()),
    };
  }
)(withRouter(Header));
