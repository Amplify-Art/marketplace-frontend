import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SideSocialNav.scss';

function SideSocialNav(props) {
  const screenWidth = window.screen.availWidth;
  return (
    <>
      {
        (props.showMobileMenu)
          ? (
            <div id="mobile-side-social-nav">
              <ul className={props.isErrorPage ? 'socialbar-color' : null} >
                <li><a href="https://www.facebook.com/AmplifyArtNFT" target="_blank">Facebook</a></li>
                <li><a href="https://www.instagram.com/amplifyartofficial" target="_blank">Instagram</a></li>
                <li><a href="https://twitter.com/AmplifyArt" target="_blank">Twitter</a></li>
              </ul>
            </div>
          )
          : null
      }
      <div id="side-social-nav">
        <ul className={props.isErrorPage ? 'socialbar-color' : null} >
          <li className={props.isLoading ? "overlay-color" : ""}><a href="https://www.facebook.com/AmplifyArtNFT" target="_blank">Facebook</a></li>
          <li className={props.isLoading ? "overlay-color" : ""}><a href="https://www.instagram.com/amplifyartofficial" target="_blank">Instagram</a></li>
          <li className={props.isLoading ? "overlay-color" : ""}><a href="https://twitter.com/AmplifyArt" target="_blank">Twitter</a></li>
        </ul>
      </div>
    </>
  );
}

export default connect(state => {
  return {
    isErrorPage: state.global.isErrorPage,
    showMobileMenu: state.global.mobileMenu,
    isLoading: state.global.loading_overlay
  }
})(withRouter(SideSocialNav));

