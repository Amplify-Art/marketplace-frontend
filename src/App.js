import React, { useState, useEffect } from "react";

import {
  Switch,
  Route,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as playListAction from "./redux/actions/PlaylistAction";

// Containers
import Header from "./Components/Parts/Header/index";
import Home from "./Containers/Home/index";
import SandBox from "./Containers/Sandbox/index";
import ArtistProfile from "./Containers/ArtistProfile/index";
import SecondaryMarketplace from "./Containers/SecondaryMarketplace";
import ArtistDashboard from "./Containers/ArtistDashbord";
import SupportCard from "./Containers/SupportCard";
import PageNotFound from "./Containers/PageNotFound";
import Nominate from "./Containers/Nominate";
import UserDashboard from "./Containers/UserDashboard";
import Artists from "./Containers/Artists";
import SearchResult from "./Containers/SearchResult";
import Wallet from "./Containers/Wallet";
import TransactionDetails from "./Containers/TransactionDetails";
import WalletSignTransaction from "./Containers/WalletSignTransaction";
import Settings from "./Containers/Settings";

// Auth Wrapper
import Auth from "./Containers/Auth";

//Auth
import NearSuccessLogin from "./Containers/Near/Success";

import Albums from "./Containers/Albums/index";
import MyProfile from "./Containers/MyProfile/index";

// Parts
import SideSocialNav from "./Components/Common/SideSocialNav/index";
import MainSideNav from "./Components/Common/MainSideNav/index";
import Player from "./Components/Common/Player/index";

// Global Loader
import GloablLoader from "./Components/Common/Loading/index";

import {
  showWalletAction,
  hideWalletAction,
} from "./redux/actions/GlobalAction";

function App(props) {
  let history = useHistory();
  let location = useLocation();
  const [path, setPath] = useState("");
  const [showLeftSidebar, toggleLeftSidebar] = useState(false);
  const [, togglePlayer] = useState(false);
  const [, setBannerImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [, setUserName] = useState("");
  // const [showWalletSidebar, toggleWalletSidebar] = useState(true);
  const user = localStorage.getItem("amplify_app_token");
  useEffect(() => {
    setPath(location.pathname);
    if (location.pathname === "/logout") {
      localStorage.removeItem("amplify_app_token");
      sessionStorage.removeItem("activePlaylist");
      props.clearCurrentPlayList();
      history.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // const activePlaylist = sessionStorage.getItem('activePlaylist');

  useEffect(() => {
    if (!path) return;
    // If not one of these pages, then dont show the sidebat
    // TODO: use this logic to render a sidebar for non logged in users
    if (!["/", "/auth/login"].includes(path)) {
      toggleLeftSidebar(true);
    } else {
      toggleLeftSidebar(false);
      togglePlayer(false);
    }
  }, [path]);

  useEffect(() => {
    const token = localStorage.getItem("amplify_app_token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.near_account_id);
      if (!decodedToken.near_connected) {
        toggleWalletSidebar(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleWalletSidebar = (bool) => {
    if (bool) {
      props.showWallet();
    } else {
      props.hideWallet();
    }
  };
  return (
    <>
      <GloablLoader>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Header
          path={path}
          toggleWalletSidebar={toggleWalletSidebar}
          showLoggedInSidebar={showLeftSidebar}
        />
        <SideSocialNav />
        <MainSideNav
          toggleWalletSidebar={toggleWalletSidebar}
          showMobileMenu={props.showMobileMenu}
          showLoggedInSidebar={showLeftSidebar}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (user ? <Redirect to="/user-dashboard" /> : <Home />)}
          />
          <Route path="/player" exact component={Auth(Player)} />
          <Route
            path="/auth/redirect"
            exact
            component={Auth(() => (
              <></>
            ))}
          />
          <Route
            path="/wallet"
            exact
            render={() => (
              <Wallet
                playerActive={props && props.currentPlaylists.length > 0}
              />
            )}
          />
          <Route path="/sandbox" exact component={Auth(SandBox)} />
          {/* <Route path="/auth/login" exact component={Login} /> */}
          <Route path="/near/success" exact component={NearSuccessLogin} />
          <Route
            path="/albums"
            exact
            render={() => (
              <Albums
                playerActive={props && props.currentPlaylists.length > 0}
              />
            )}
          />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route
            path="/my-profile"
            exact
            render={Auth(() => (
              <MyProfile
                playerActive={props && props.currentPlaylists.length > 0}
              />
            ))}
          />
          <Route path="/user/:id" exact component={MyProfile} />
          <Route
            path="/artist/:slug"
            exact
            render={() => (
              <ArtistProfile
                playerActive={props && props.currentPlaylists.length > 0}
              />
            )}
          />
          <Route path="/artists" exact component={Artists} />
          <Route
            path="/marketplace"
            exact
            component={Auth(SecondaryMarketplace)}
          />
          <Route
            path="/artist-dashboard"
            exact
            component={Auth(ArtistDashboard)}
          />
          <Route path="/support-card" exact component={Auth(SupportCard)} />
          <Route path="/nominate" exact component={Auth(Nominate)} />
          <Route path="/user-dashboard" exact component={Auth(UserDashboard)} />
          <Route
            path="/search-result"
            exact
            render={() => (
              <SearchResult
                playerActive={props && props.currentPlaylists.length > 0}
              />
            )}
          />
          <Route
            path="/transaction-list"
            exact
            component={Auth(TransactionDetails)}
          />
          <Route
            path="/transaction-sign"
            exact
            component={Auth(WalletSignTransaction)}
          />
          <Route path="/settings" exact component={Auth(Settings)} />

          <Route component={PageNotFound} />
        </Switch>
        {props.currentPlaylists.length ? (
          <Player
            avatar={profileImage}
            toggleWalletSidebar={toggleWalletSidebar}
          />
        ) : null}
      </GloablLoader>
    </>
  );
}

export default connect(
  (state) => {
    return {
      currentPlaylists: state.playlists.current_playlists,
      showMobileMenu: state.global.mobileMenu,
    };
  },
  (dispatch) => {
    return {
      showWallet: () => dispatch(showWalletAction()),
      hideWallet: () => dispatch(hideWalletAction()),
      clearCurrentPlayList: () =>
        dispatch(playListAction.clearCurrentPlayList()),
    };
  }
)(App);
