import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

import './MainSideNav.scss';
import * as playListAction from '../../../redux/actions/PlaylistAction'
import { toggleMobileMenuAction } from '../../../redux/actions/GlobalAction';
import Nominate from '../../../Containers/Nominate';


function MainSideNav(props) {
  const [showNominateModal, setShowNominateModal] = useState(false);
  const { toggleWalletSidebar, showMobileMenu } = props;
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  // const isNominate = useSelector(state => state.searchRes?.isAlbumSelected || false);

  const onLogout = () => {
    localStorage.removeItem('amplify_app_token')
    sessionStorage.removeItem('activePlaylist')
    props.clearCurrentPlayList()
    // history.push("/")
  };

  const handleOnClick = () => {
    if (showMobileMenu) {
      props.toggleMobileMenu();
    }
  };

  return (
    <>
      <div id="main-side-nav" className={`${showMobileMenu && 'mobile-open'}`}>
        <ul>
          <li><a href="/">Home</a></li>

          <li className="nav-header">Discover</li>
          {/* <li><a href="#">New Releases</a></li> */}
          {/* <li><a href="#">Top Charts</a></li> */}
          <li><NavLink to="/artists" onClick={handleOnClick} activeClassName="current">Artists</NavLink></li>

          <li className="nav-header">Store</li>
          {/* <li><NavLink to="#">Coming Soon</NavLink></li> */}
          <li><NavLink to="/albums" onClick={handleOnClick} activeClassName="current">Albums</NavLink></li>
          <li><NavLink to="/marketplace" onClick={handleOnClick} activeClassName="current">Songs</NavLink></li>

          <li className="nav-header">Profile</li>
          <li><NavLink to="/my-profile" onClick={handleOnClick} activeClassName="current">Profile</NavLink></li>
          <li className=""><span onClick={() => setShowNominateModal(true)}>Nominate</span></li>
          <li><NavLink to="/wallet" onClick={handleOnClick} activeClassName="current">Wallet</NavLink></li>
          <li><NavLink to="/" onClick={() => onLogout()}>Logout</NavLink></li>
          {user && user.type === 'artist' &&
            <>
              <li className="nav-header">Artist</li>
              <li><NavLink to="/artist-dashboard" onClick={handleOnClick}>Dashboard</NavLink></li>
            </>
          }
        </ul>
      </div>
      {
        showNominateModal &&
        <Nominate
          showNominateModal={showNominateModal}
          setShowNominateModal={setShowNominateModal}
        />
      }
    </>
  );
}

export default connect(state => {
  return {
    showMobileMenu: state.global.mobileMenu
  }
}, dispatch => {
  return {
    clearCurrentPlayList: () => dispatch(playListAction.clearCurrentPlayList()),
    toggleMobileMenu: () => dispatch(toggleMobileMenuAction()),
  }
})(MainSideNav);
