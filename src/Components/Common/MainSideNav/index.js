import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from "react-router-dom";
import './MainSideNav.scss';
import jwt from 'jsonwebtoken';

function MainSideNav(props) {
  const { toggleWalletSidebar, showMobileMenu } = props;
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  return (
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
        <li><NavLink to="/nominate" activeClassName="current">Nominate</NavLink></li>
        <li onClick={toggleWalletSidebar}><span>Wallet</span></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
        {user && user.type === 'artist' &&
          <>
            <li className="nav-header">Artist</li>
            <li><NavLink to="/artist-dashboard">Dashboard</NavLink></li>
          </>
        }
      </ul>
    </div>
  );
}

export default MainSideNav;
