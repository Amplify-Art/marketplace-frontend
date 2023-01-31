import React, { useState, useRef, useEffect } from "react";
import { NavLink, withRouter, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

import "./MainSideNav.scss";
import * as playListAction from "../../../redux/actions/PlaylistAction";
import { toggleNominate } from "../../../redux/actions/NominationAction";
import { toggleMobileMenuAction } from "../../../redux/actions/GlobalAction";
import {
  fetchSearchResult,
  setIsSongSelected,
  storeSelectedAlbum,
  setIsAlbumSelected,
  showSearchResultAction,
  hideSearchResultAction,
} from "../../../redux/actions/SearchResAction";
import Nominate from "../../../Containers/Nominate";
import useDebounce from "../UseDebounce";
import SearchResultCard from "../../Parts/SearchResultCard";
import SearchIcon from "../../../assets/images/search-icon.svg";
import SideSocialNav from "../SideSocialNav";
import GeneralModal from "../GeneralModal/index.js";
import { getNearKeys } from "../../../Constants/near";

function MainSideNav(props) {
  const [showNominateModal, setShowNominateModal] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const wrapperRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { toggleWalletSidebar, showMobileMenu } = props;
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  let location = useLocation();

  const onLogout = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleNominate = () => {
    props.toggleNominate(true);
    setShowNominateModal(true);
  };
  const handleOnClick = () => {
    if (showMobileMenu) {
      props.toggleMobileMenu();
    }
  };

  const handleSubmit = (e) => {
    if (e.target.value && (e.key === "Enter" || e.keyCode === 13)) {
      props.searchRes(e.target.value);
      props.history.push(`/search-result?search=${search}`);
      props.toggleMobileMenu();
    }
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
    props.toggleMobileMenu();
  };

  useEffect(() => {
    if (
      props.history.location.pathname &&
      props.history.location.pathname !== "/search-result"
    ) {
      setSearch("");
    }
  }, [props.history.location.pathname]);

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
  }, [wrapperRef]);

  useEffect(() => {
    if (debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== "") {
      props.searchRes(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleCloseModal = async (bool) => {
    if (bool) {
      let nearKeys = await getNearKeys();
      for (const key in nearKeys) {
        localStorage.removeItem(nearKeys[key]);
      }
      sessionStorage.removeItem("activePlaylist");
      localStorage.removeItem("amplify_app_token");
      props.clearCurrentPlayList();
      props.history.push("/");
      window.location.reload();
    }
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (showMobileMenu) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [showMobileMenu])

  const renderMenu = () => {
    // TODO: move this out into its own file... this file is a little too big ATM
    const showLoggedInSidebar = props.showLoggedInSidebar;

    const loggedInMenu = (
      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li className="nav-header discover-icon">Discover</li>
        {/* <li><a href="#">New Releases</a></li> */}
        {/* <li><a href="#">Top Charts</a></li> */}
        <li>
          <NavLink
            to="/artists"
            onClick={handleOnClick}
            activeClassName="current"
          >
            Artists
          </NavLink>
        </li>

        <li className="nav-header">Store</li>
        {/* <li><NavLink to="#">Coming Soon</NavLink></li> */}
        <li>
          <NavLink
            to="/albums"
            onClick={handleOnClick}
            activeClassName="current"
          >
            Albums
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to="/marketplace"
                onClick={handleOnClick}
                activeClassName="current"
              >
                Singles
              </NavLink>
            </li>

            <li className="nav-header">Account</li>
            <li>
              <NavLink
                to="/my-profile"
                onClick={handleOnClick}
                activeClassName="current"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wallet"
                onClick={handleOnClick}
                activeClassName="current"
              >
                Wallet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                onClick={handleOnClick}
                activeClassName="current"
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={(e) => onLogout(e)}>
                Logout
              </NavLink>
            </li>
            <li className="nav-header">Artist</li>
          </>
        )}
        {user && user.type === "artist" && (
          <li>
            <NavLink to="/artist-dashboard" onClick={handleOnClick}>
              Dashboard
            </NavLink>
          </li>
        )}
        {user && (
          <li className="">
            <span onClick={() => handleNominate()}>Nominate</span>
          </li>
        )}
        {user && user.is_support_card_holder && (
          <>
            <li className="nav-header">Supporter</li>
            <li>
              <NavLink
                to="/support-card"
                onClick={handleOnClick}
                activeClassName="current"
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        {!user && showMobileMenu && (
          <>
            <li className="nav-header">Learn More</li>
            <li className="">
              <span>Who We're For</span>
            </li>
            <li className="">
              <span>How It Works</span>
            </li>
            <li className="">
              <span>Team & Supporters</span>
            </li>
          </>
        )}
      </ul>
    );

    // if (showLoggedInSidebar) return loggedInMenu;
    // else return;
    if (!showMobileMenu && location.pathname === '/') return;
    else return loggedInMenu;
  }

  return (
    <>
      <div id="main-side-nav" className={`${showMobileMenu && "mobile-open"} ${props.showLoggedInSidebar && 'loggedIn'}`}>
        {showMobileMenu && (
          <div ref={wrapperRef} className="mobileSearchWrapper">
            <div className="mobileSearch">
              <img src={SearchIcon} alt="Search" />
              <input
                type="text"
                placeholder="Search for artists, albums or tracks"
                onClick={() => props.showSearchResultFn()}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSubmit}
                value={search}
              />
            </div>
            {search.trim() !== "" && props.showSearchResult && (
              <div className="mobileScrollSearchResult">
                {props.searchLoading
                  ? "Loading..." // TODO: can add any animation
                  : props.searchResult &&
                  props.searchResult.results &&
                  props.searchResult.results.length && (
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

        {renderMenu()}

        {showMobileMenu ? <SideSocialNav /> : null}
      </div>
      {props.showNominate && (
        <Nominate
          showNominateModal={showNominateModal}
          setShowNominateModal={setShowNominateModal}
        />
      )}
      {showLogoutModal && (
        <GeneralModal
          // topIcon={ConfettiImage}
          headline="Are you sure you want to logout?"
          buttons={[
            {
              type: "solid go-home",
              text: "Yes",
              onClick: () => handleCloseModal(true),
            },
            {
              type: "solid go-home",
              text: "Cancel",
              onClick: () => handleCloseModal(false),
            },
          ]}
          className="centered"
        />
      )}
    </>
  );
}

export default connect(
  (state) => {
    return {
      showNominate: state.nominations?.showNominate,
      showMobileMenu: state.global.mobileMenu,
      searchResult: state.searchRes.searchResult,
      searchLoading: state.searchRes.loading,
      showSearchResult: state.searchRes.showSearchResult,
    };
  },
  (dispatch) => {
    return {
      clearCurrentPlayList: () =>
        dispatch(playListAction.clearCurrentPlayList()),
      toggleNominate: (data) => dispatch(toggleNominate(data)),
      toggleMobileMenu: () => dispatch(toggleMobileMenuAction()),
      searchRes: (payload) => dispatch(fetchSearchResult(payload)),
      setSelectedAlbum: (payload) => dispatch(storeSelectedAlbum(payload)),
      setIsSongSelected: () => dispatch(setIsSongSelected()),
      setIsAlbumSelected: (payload) => dispatch(setIsAlbumSelected(payload)),
      showSearchResultFn: () => dispatch(showSearchResultAction()),
      hideSearchResult: () => dispatch(hideSearchResultAction()),
    };
  }
)(withRouter(MainSideNav));
