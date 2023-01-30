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
        title: "Shes The Sun",
        song_cid: "QmfPUFSLpzV57q7EPQrw8JKUkbmRCyfWDFBRFUGhMf7H4S",
        duration: 196,
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
              limit={true}
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
