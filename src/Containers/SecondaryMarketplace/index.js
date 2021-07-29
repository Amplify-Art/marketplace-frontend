import React, { useState, useEffect, useRef } from 'react';
import './SecondaryMarketplace.scss';

import SongList from '../../Components/Parts/SongList';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';
import CoverSix from '../../assets/images/cover6.png';

function SecondaryMarketplace(props) {
  const songs = [
    {

      "id": 133,

      "title": "9",

      "song_cid": "QmSAm6mks8XPBPcUCX6s9g9Q6ztW1Hx8ZmGFUEuayEdPNe",

      "album": {

          "id": 285,

          "title": "Relapse",

          "cover_cid": "QmTbN1Sm7Kq5ieKd5aX46Ur5QufSkWHtD9C2YoEkeBS3Qa",

          "qty": 2,

          "available_qty": 2

      },

      "artist": {

          "name": "Anil Test1",

          "avatar": "http://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",

          "banner": null

      },

      "available_qty": 2,

      "qty": 2,

      "transfers": [

          {

              "id": 49,

              "created_at": "2021-07-20T09:40:28.298Z",

              "copy_number": 1,

              "bidding_price": 200,

              "is_for_sale": true

          },

          {

              "id": 50,

              "created_at": "2021-07-20T09:45:07.568Z",

              "copy_number": 1,

              "bidding_price": 300,

              "is_for_sale": true

          }

      ],

      "mints_owned": []

  },

  {

      "id": 37,

      "title": "Anil Test",

      "song_cid": "bafkreif77x4l5xt2z2qljerqio2krbpfrhzo52kczy6qgw4hoj4234u5wa",

      "album": {

          "id": 196,

          "title": "Eminem Test Album",

          "cover_cid": "bafybeifxgqu3qmjynr2wp4nrj474vxtvrq7pm64gnw2f663xmuwglhqvlq",

          "qty": 1,

          "available_qty": 1

      },

      "artist": {

          "name": "anil kumar",

          "avatar": "http://pbs.twimg.com/profile_images/1385856326283137025/OQTTL-4P_400x400.png",

          "banner": "https://pbs.twimg.com/profile_banners/606871510/1619416227"

      },

      "available_qty": 1,

      "qty": 1,

      "transfers": [

          {

              "id": 51,

              "created_at": "2021-07-20T09:45:07.568Z",

              "copy_number": 3,

              "bidding_price": 500,

              "is_for_sale": true
          }

      ],

      "mints_owned": []

  }
  ];
  return (
    <div id="secondary-marketplace" className="left-nav-pad right-player-pad">
      <div className="container">
        <SongList songList={songs} />
      </div>
    </div>
  );
}

export default SecondaryMarketplace;
