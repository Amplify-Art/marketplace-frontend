import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector, connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import q from "querystring";
import * as nearAPI from "near-api-js";
import GeneralModal from "../GeneralModal/index.js";
import AlbumModalContent from "../AlbumModalContent/index.js";
import {
  setIsAlbumSelected,
  storeSelectedAlbum,
} from "../../../redux/actions/SearchResAction.js";
import { addTokenTransferAction } from "../../../redux/actions/TokenTransferAction";
import {
  hidePurchaseModalAction,
  displayLoadingOverlayAction,
} from "../../../redux/actions/GlobalAction";
import { buyAlbumBundleNFTAction } from "../../../redux/actions/NFTAction";
import "./SingleAlbum.scss";
import cdCover from "../../../assets/images/cd-img.svg";
import ConfettiImage from "../../../assets/images/confetti.png";

const {
  utils: {
    format: { parseNearAmount },
  },
  keyStores,
} = nearAPI;

function SingleAlbum(props) {
  const {
    albumInfo,
    isMint = true,
    isPlayList = false,
    children,
    history,
    hidePurchaseModal,
    showPurchaseModal,
    setDeletingId,
  } = props;
  const [isOpen, SetModalOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [albumCover, setAlbumCover] = useState(cdCover);
  const [showSticker, setShowSticker] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const dispatch = useDispatch();

  const getHeight = () => {
    let width = "300";
    const box = document.querySelector(".album-art");
    if (box) {
      width = box.clientWidth;
    }

    setHeight(width);
  };

  const handleModal = () => {
    SetModalOpen(true);
  };

  const handleCloseModal = () => {
    SetModalOpen(false);
    setViewDetails(false);
    dispatch(setIsAlbumSelected({ isAlbumSelected: false }));
    dispatch(storeSelectedAlbum({ albumData: {} }));
  };

  const checkImage = (url) => {
    // Trying to check if image exists here. If it doesn't, we should show some backup image.
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
      const theStatus = request.status;
    };
  };

  const onClose = () => {
    hidePurchaseModal();
    history.push("/");
  };

  // check for mint transactions from URL
  useEffect(() => {
    let albumBundleInfo = JSON.parse(localStorage.getItem("album_bundle_info"));
    if (props.history.location.search.includes("errorCode")) {
      let message = decodeURIComponent(
        q.parse(props.history.location.search).errorMessage
      );
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.removeItem("album_bundle_info");
      props.history.push("/albums");
    } else if (props.history.location.search.includes("transactionHashes")) {
      let txtId = decodeURIComponent(
        q.parse(props.history.location.search)["?transactionHashes"]
      );
      albumBundleInfo.hash = txtId;
      checkTxnStatus(albumBundleInfo);
    }
    if (props.isAlbumSelected && props.selectedAlbum.id === albumInfo.id) {
      SetModalOpen(true);
    }
  }, []);

  const checkTxnStatus = async (albumBundleInfo) => {
    let net =
      process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`,
    };
    const near = await nearAPI.connect(config);
    const response = await near.connection.provider.txStatus(
      albumBundleInfo.hash,
      user.near_account_id
    );
    if (response.receipts_outcome.some((f) => f.outcome.status.Failure)) {
      let error = response.receipts_outcome.find(
        (f) => f.outcome.status.Failure
      ).outcome.status.Failure.ActionError.kind.FunctionCallError
        .ExecutionError;
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      props.buyAlbumBundleNFT(albumBundleInfo);
    }
    localStorage.removeItem("album_bundle_info");
    props.history.push("/albums");
  };

  const handleBuy = async (albumInfo) => {
    props.displayLoadingOverlay();
    let album_bundle_info = {
      token_id: albumInfo.id,
      copy_number: parseInt(albumInfo.qty) - albumInfo.available_qty + 1,
    };
    let copy_no = albumInfo.qty - albumInfo.available_qty + 1;

    localStorage.setItem(
      "album_bundle_info",
      JSON.stringify(album_bundle_info)
    );
    await props.wallet.account().functionCall(
      process.env.REACT_APP_NEAR_MARKET_ACCOUNT || "market.aa-1-test.testnet",
      "offer_album",
      {
        nft_contract_id:
          process.env.REACT_APP_NFT_CONTRACT || "nft.aa-1-test.testnet",
        albumipfs_hash_copy: `${albumInfo.cover_cid}:${copy_no}`,
      },
      200000000000000,
      albumInfo.yocto_near_price
    );
    SetModalOpen(false);
  };

  useEffect(() => {
    let width;
    const box = document.querySelector(".album-art");
    if (!height) {
      if (box) {
        width = box.clientWidth;
        setHeight(width);
      }
    }

    const resizeListener = () => {
      // change width from the state object
      getHeight();
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  // checkImage(`https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`);

  useEffect(() => {
    // if this is rendered for playlist, we dont have cover for playlist, show CD cover

    if (isPlayList) {
      setAlbumCover(cdCover);
    } else if (albumInfo.cover_cid) {
      setAlbumCover(
        `https://gateway.pinata.cloud/ipfs/${albumInfo.cover_cid}`
      );
    } else if (
      albumInfo &&
      albumInfo.token &&
      albumInfo.token.album &&
      albumInfo.token.album.cover_cid
    ) {
      setAlbumCover(
        `https://gateway.pinata.cloud/ipfs/${albumInfo.token.album.cover_cid}`
      );
    } else {
      setAlbumCover(cdCover);
    }
    if (props.albumInfo?.hideSticker) {
      setShowSticker(false);
    } else if (props.history.location.pathname === "/my-profile") {
      setShowSticker(false);
    } else if (albumInfo && albumInfo.forSale !== false) {
      setShowSticker(true);
    }
  }, [albumInfo]);

  return (
    <>
      <div
        className="single-album1"
      >
        <img src={albumCover} onLoad={() => setImageLoaded(true)} style={{ display: 'none' }} />
        {imageLoaded ? (
          <div
            className="cd-case1"
            id="1169hh"
            onClick={props.onClick ? props.onClick : handleModal}
          >
            <div
              className={`album-art ${albumInfo.available_qty === 0 ? "sold" : "available"
                }`}
              style={{
                background: `url(${albumCover}) center center no-repeat`,
              }}
            >
            </div>
            {showSticker && (
              <div
                className={`mint-sticker ${albumInfo.available_qty === 0 ? "sold" : "available"
                  }`}
              >
                {/* In my profile, show the copy you own, in other UI, show the available qty to mint */}
                <span>
                  Mint #<br />
                  {albumInfo.copy_number ||
                    (albumInfo.available_qty === 0
                      ? albumInfo.available_qty
                      : albumInfo.qty - albumInfo.available_qty + 1)}
                  /
                  {albumInfo.qty ||
                    (albumInfo.token && albumInfo.token.album.qty)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="shimmer-custom rect"></div>
        )}
        {children ? (
          children
        ) : (
          <>
            <div className={`the-title ${isPlayList && "playlist-title"}`} onClick={props.onClick ? props.onClick : handleModal}>
              <h3 className="album-title">
                {albumInfo.title.substring(0, 29)}
                {albumInfo.title.length > 29 && "..."}
              </h3>
            </div>
            <Link to={`/artist/${(albumInfo?.user?.near_account_id) || (albumInfo?.token?.album?.user?.near_account_id)}`} className="artist-name">
              <h4>
                {(albumInfo?.user?.near_account_id) || (albumInfo?.token?.album?.user?.near_account_id)}
              </h4>
            </Link>
          </>
        )}
      </div>
      {showPurchaseModal && (
        <GeneralModal
          topIcon={ConfettiImage}
          headline="Thank You For Your Purchase!"
          buttons={[
            {
              type: "solid go-home",
              text: "Go Home",
              onClick: () => onClose(),
            },
          ]}
          className="centered"
        />
      )}
      <div className={`modal-album ${!isOpen ? "d-none" : "d-block"}`}>
        <GeneralModal
          isCloseButton="true"
          bodyChildren={
            <AlbumModalContent
              setDeletingId={setDeletingId}
              albumInfo={
                albumInfo.hasOwnProperty("copy_number")
                  ? {
                    copy_number: albumInfo.copy_number,
                    ...albumInfo.token.album,
                  }
                  : albumInfo
              }
              isOpen={isOpen}
              isPlayList={isPlayList}
              onBuy={handleBuy}
              viewDetails={viewDetails}
              setViewDetails={setViewDetails}
              onSingleSongClick={props.onSingleSongClick}
              token={albumInfo.token}
              closeModal={handleCloseModal}
            />
          }
          closeModal={handleCloseModal}
        />
      </div>
    </>
  );
}

export default connect(
  (state) => {
    return {
      isAlbumSelected: state.searchRes?.isAlbumSelected || false,
      selectedAlbum: state.searchRes?.selectedAlbum || {},
      showPurchaseModal: state.global && state.global.showPurchaseModal,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
      hidePurchaseModal: () => dispatch(hidePurchaseModalAction()),
      addTokenTransfer: (data) => dispatch(addTokenTransferAction(data)),
      buyAlbumBundleNFT: (data) => dispatch(buyAlbumBundleNFTAction(data)),
    };
  }
)(withRouter(SingleAlbum));
