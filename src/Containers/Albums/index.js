import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";
import { store } from "react-notifications-component";
import q from "querystring";
import { fetchAlbumsAction } from "../../redux/actions/AlbumAction";
import "./Albums.scss";
import { addTokenTransferAction } from "../../redux/actions/TokenTransferAction";
import { buyAlbumBundleNFTAction } from "../../redux/actions/NFTAction";
import SingleAlbum from "../../Components/Common/SingleAlbum/index.js";

const {
  utils: {
    format: { parseNearAmount },
  },
  keyStores,
} = nearAPI;

function Albums(props) {
  useEffect(() => {
    props.fetchAlbums({
      params: {
        orderBy: "-id",
        related: "songs.[transfers,album],transfers,user",
      },
    });
  }, []);

  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const [albumInfo, setAlbumInfo] = useState(localStorage.getItem("album_bundle_info"))

  // check for mint transactions from URL
  useEffect(() => {
    let albumBundleInfo = JSON.parse(localStorage.getItem("album_bundle_info"));
    if (props.history.location.search.includes("errorCode")) {
      let message = decodeURIComponent(
        q.parse(props.history.location.search).errorMessage
      );
      store.addNotification({
        title: "Error",
        message: message,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
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
  }, [albumInfo]);

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
      store.addNotification({
        title: "Error",
        message: error,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      props.history.push("/albums");
    } else {
      props.history.push(`/my-profile?showId=${albumBundleInfo.token_id}`);

      props.buyAlbumBundleNFT(albumBundleInfo);
    }
    localStorage.removeItem("album_bundle_info");
  };

  const onBuy = async (album) => {
    if (user.near_account_type === "connected") {
      let album_bundle_info = {
        token_id: album.id,
      };
      let copy_no = album.qty - album.available_qty + 1;

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
          albumipfs_hash_copy: `${album.cover_cid}:${copy_no}`,
        },
        200000000000000,
        album.yocto_near_price
      );
    } else {
      props.addTokenTransfer({
        type: "album",
        token_id: album.id,
      });
    }
  };
  return (
    <div
      id="albums"
      className={`left-nav-pad ${props.playerActive ? "right-player-pad" : "normal-right-pad"
        }`}
    >
      <div className="container">
        <div className="album-grid">
          {props?.albums &&
            props.albums?.length > 0 &&
            props.albums.map((album, index) => (
              <SingleAlbum key={index} albumInfo={album} onBuy={onBuy} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      albums: state.albums.albums,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      fetchAlbums: (data) => dispatch(fetchAlbumsAction(data)),
      addTokenTransfer: (data) => dispatch(addTokenTransferAction(data)),
      buyAlbumBundleNFT: (data) => dispatch(buyAlbumBundleNFTAction(data)),
    };
  }
)(withRouter(Albums));
