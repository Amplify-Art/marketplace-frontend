import React, { useState } from 'react'
import './LatestReleases.scss';
import '../../Common/SingleMargedAlbum/SingleAlbum.scss';
import cdCover from "../../../assets/images/cd-img.svg";
import AlbumModalContent from "../../Common/AlbumModalContent/index.js";
import SingleAlbumModal from "../../Common/SingleAlbumModal/index.js";
import AlbumImage from '../../../assets/images/album.png';
import GeneralModal from "../../Common/GeneralModal/index.js";
import shesTheSun from '../../../assets/images/sheshthesun.png';

function LatestReleases() {
  const [albumModalOpen, setAlbumModalOpen] = useState(false)
  const albumData = {
    // cover_cid: '',
    isOpen: true,
    coverArt: shesTheSun,
    title: 'Shes The Sun',
    user: {
      near_account_id: 'whereidraw.near'
    },
    songs: [
      {
        id: 6,
        title: "last resorttt",
        album_id: 3,
        cid: "QmSRdG9QVVoifFzbxG93hq9Mj8ypL3Y3rkjw2qtXcwnFTv",
        song_cid: "QmQsRjTU4cdpr2BbYB6RbwmjPxentjLEjiVD9seeHP7Fua",
        user_id: 1,
        current_owner: 1,
        available_qty: 2,
        qty: "2",
        duration: 200,
        transfers: [
          {
            id: 3,
            token: "QmQsRjTU4cdpr2BbYB6RbwmjPxentjLEjiVD9seeHP7Fua",
            copy_number: 1,
            is_deleted: false,
            type: "song",
            is_owner: true,
            bidding_price: null,
            yocto_near_price: "0",
            price_in_usd: 0
          },
        ],
        album: {
          created_at: "2022-12-09T15:54:52.468Z",
          id: 3,
          updated_at: "2022-12-12T05:13:13.491Z",
          title: "Test",
          description: "test 123",
          user_id: 1,
          is_deleted: false,
          cid: null,
          cover_cid: "QmZqTswXaTJogTnxsXbBpky6E249dcAiRsnnbsSLMQitxG",
          txn_hash: "F2uvun4QVaNd5g4Svw5HaiivD4kjpnJq7Hhh5ofwYWxg",
          qty: "2",
          current_owner: 3,
          available_qty: 0,
          has_copy: false,
          price: 1000,
          is_purchased: true,
          yocto_near_price: "5861664712778429000000000",
          minting_cost: 0
        }
      }
    ],
    description: 'This is a test album',
  }
  return (
    <div className="padding-section-large">
      <div className="padding-global">
        <div className="container-large">
          <div id="latest-releases">
            <div className="container">
              <div className="headers">
                <h2 className="large white">Latest</h2>
                <h2 className="large red">Release</h2>
              </div>
              <div className="album-contain">
              <div className="album">

                <div className="check-all">Click to Open</div>
              <div
                className="single-album1"
                onClick={() => setAlbumModalOpen(true)}
              >
                <div
                  className="cd-case1"
                  id="1169hh"
                  style={{
                    height: document.getElementById("1169hh")?.offsetWidth * 0.86,
                  }}
                >
                  <div
                    className="album-art"
                    style={{
                      background: `url(${shesTheSun}) center center no-repeat`,
                    }}
                  >
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-album ${albumModalOpen ? "d-block" : "d-none"
          }`}
      >
        <GeneralModal
          isCloseButton="true"
          bodyChildren={
            <SingleAlbumModal
              isOpen={albumModalOpen}
              albumData={albumData}
            />
          }
          closeModal={() => setAlbumModalOpen(false)}
        />
      </div>
    </div>
                  </div>
  );
}

export default LatestReleases;
