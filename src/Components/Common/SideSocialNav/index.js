import React, { useState, useEffect, useCallback } from 'react';
import './SideSocialNav.scss';

function SideSocialNav(props) {
  return (
    <div id="side-social-nav">
      <ul>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Twitter</a></li>
      </ul>
    </div>
  );
}

export default SideSocialNav;
