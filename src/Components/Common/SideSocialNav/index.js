import React, { useState, useEffect, useCallback } from 'react';
import './SideSocialNav.scss';

function SideSocialNav(props) {
  return (
    <div id="side-social-nav">
      <ul>
        <li><a href="https://www.facebook.com/AmplifyArtNFT" target="_blank">Facebook</a></li>
        <li><a href="https://www.instagram.com/amplifyartofficial" target="_blank">Instagram</a></li>
        <li><a href="https://twitter.com/AmplifyArt" target="_blank">Twitter</a></li>
      </ul>
    </div>
  );
}

export default SideSocialNav;
