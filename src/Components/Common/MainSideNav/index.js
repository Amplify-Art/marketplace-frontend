import React, { useState, useEffect, useCallback } from 'react';
import './MainSideNav.scss';

function MainSideNav(props) {
  return (
    <div id="main-side-nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li className="nav-header">Discover</li>
        <li><a href="#">New Releases</a></li>
        <li><a href="#">Top Charts</a></li>
        <li><a href="#">Artists</a></li>
        <li className="nav-header">Store</li>
        <li><a href="#">Coming Soon</a></li>
        <li><a href="#">Albums</a></li>
        <li><a href="#">Songs</a></li>
        <li className="nav-header">Profile</li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Nominate</a></li>
        <li><a href="#">Wallet</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>
  );
}

export default MainSideNav;
