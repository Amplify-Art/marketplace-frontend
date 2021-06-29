import React, { useState, useEffect, useCallback } from 'react';
import './MainSideNav.scss';

function MainSideNav(props) {
  const { toggleWalletSidebar } = props;
  return (
    <div id="main-side-nav">
      <ul>
        <li><a href="/">Home</a></li>
        
        <li className="nav-header">Discover</li>
        <li><a href="#">New Releases</a></li>
        <li><a href="#">Top Charts</a></li>
        <li><a href="/artist/1">Artists</a></li>
        
        <li className="nav-header">Store</li>
        <li><a href="#">Coming Soon</a></li>
        <li><a href="/albums">Albums</a></li>
        <li><a href="#">Songs</a></li>
        
        <li className="nav-header">Profile</li>
        <li><a href="/my-profile">Profile</a></li>
        <li><a href="/nominate">Nominate</a></li>
        <li onClick={toggleWalletSidebar}><span>Wallet</span></li>
        <li><a href="/logout">Logout</a></li>
        
        <li className="nav-header">Artist</li>
        <li><a href="/artist-dashboard">Dashboard</a></li>
      </ul>
    </div>
  );
}

export default MainSideNav;
