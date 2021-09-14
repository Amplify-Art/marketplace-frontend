import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';

import './MainSideNav.scss';
import * as playListAction from '../../../redux/actions/PlaylistAction'
import { toggleNominate } from '../../../redux/actions/NominationAction'
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

  const handleNominate = () => {
    props.toggleNominate(true);
    setShowNominateModal(true);
  }

  return (
    <>
      <div id="main-side-nav" className={`${showMobileMenu && 'mobile-open'}`}>
        <ul>
          <li><a href="/">Home</a></li>

          <li className="nav-header">Discover</li>
          {/* <li><a href="#">New Releases</a></li> */}
          {/* <li><a href="#">Top Charts</a></li> */}
          <li><NavLink to="/artists" activeClassName="current">Artists</NavLink></li>

          <li className="nav-header">Store</li>
          {/* <li><NavLink to="#">Coming Soon</NavLink></li> */}
          <li><NavLink to="/albums" activeClassName="current">Albums</NavLink></li>
          <li><NavLink to="/marketplace" activeClassName="current">Songs</NavLink></li>

          <li className="nav-header">Profile</li>
          <li><NavLink to="/my-profile" activeClassName="current">Profile</NavLink></li>
          <li className=""><span onClick={() => handleNominate()}>Nominate</span></li>
          <li><NavLink to="/wallet" activeClassName="current">Wallet</NavLink></li>
          <li><NavLink to="/" onClick={() => onLogout()}>Logout</NavLink></li>
          {user && user.type === 'artist' &&
            <>
              <li className="nav-header">Artist</li>
              <li><NavLink to="/artist-dashboard">Dashboard</NavLink></li>
            </>
          }
        </ul>
      </div>
      {
        props.showNominate &&
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
    showNominate: state.nominations?.showNominate,
  }
}, dispatch => {
  return {
    clearCurrentPlayList: () => dispatch(playListAction.clearCurrentPlayList()),
    toggleNominate: (data) => dispatch(toggleNominate(data)),
  }
})(MainSideNav);
