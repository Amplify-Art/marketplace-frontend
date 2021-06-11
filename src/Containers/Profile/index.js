import React, { useState, useEffect, useRef } from 'react';
import './Profile.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

import Shady from '../../assets/images/shady.jpg';
import TwitterIcon from '../../assets/images/twitter-icon.svg';
import ShareIcon from '../../assets/images/share-icon.svg';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';

function Profile(props) {
  const fakeAlbums = [
    {
      title: "A Cool Album",
      artist: "Jonathon",
      totalAvailable: 100,
      editionNumber: 75,
      coverArt: CoverOne
    },
    {
      title: "The Greatest",
      artist: "Russ",
      totalAvailable: 50,
      editionNumber: 2,
      coverArt: CoverTwo
    },
    {
      title: "Another One",
      artist: "Anil",
      forSale: false,
      coverArt: CoverThree
    },
    {
      title: "Here We Go",
      artist: "Mike",
      totalAvailable: 10,
      editionNumber: 5,
      coverArt: CoverFour
    },
    {
      title: "OH Yeah",
      artist: "Mike",
      forSale: false,
      coverArt: CoverFive
    }
  ];
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <div className="profile-cover" />
      <div className="profile-head-details">
        <div className="profile-image">
          <img src={Shady} alt="Shady" />
        </div>

        <div className="details">
          <h3>@Chasel3000</h3>
          <p>234 Songs Owned</p>
        </div>

        <div className="right-buttons">
          <button>Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>
          <button><img src={ShareIcon} alt="Twitter" /> Share</button>
        </div>
      </div>

      <div className="recently-purchased">
        <div className="top">
          <h2>Recently Purchased</h2>
          <button className="btn outlined">View All</button>
        </div>

        <div className="albums" className="album-grid">
          {fakeAlbums && fakeAlbums.length > 0 && fakeAlbums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
