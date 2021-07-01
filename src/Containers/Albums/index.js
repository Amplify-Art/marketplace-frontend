import React from 'react';
import './Albums.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';

function Albums(props) {
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
    },
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
    },
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
    <div id="albums" className="left-nav-pad right-player-pad">
      <div className="album-grid">
        {fakeAlbums && fakeAlbums.length > 0 && fakeAlbums.map((album, index) => (
          <SingleAlbum key={index} albumInfo={album} />
        ))}
      </div>
    </div>
  );
}

export default Albums;
