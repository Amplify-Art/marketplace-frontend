import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import q from "querystring";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";
import { fetchAlbumsAction } from "../../redux/actions/AlbumAction";
import { fetchFollowersAction } from "../../redux/actions/FollowerAction";
import { addTokenTransferAction } from "../../redux/actions/TokenTransferAction";
import { buyAlbumBundleNFTAction } from "../../redux/actions/NFTAction";
import "./UserDashboard.scss";
import UserAvatar from "../../Components/Common/UserAvatar/index";
import SingleAlbum from "../../Components/Common/SingleAlbum/index";
import NoFollowIcon from '../../assets/images/no-follow-icon.svg';
import NoReleasesIcon from '../../assets/images/no-releases-icon.svg';
// import "../Albums/Albums.scss";

const {
  utils: {
    format: { parseNearAmount },
  },
  keyStores,
} = nearAPI;

function UserDashboard(props) {
  const token = jwt.decode(localStorage.getItem("amplify_app_token"));
  useEffect(() => {
    props.fetchFollowers({
      params: {
        "filter[follower_id]": token.id,
        related: "artist",
      },
    });
  }, []);

  const renderFollowHeader = (title) => (
    <div className="followed-header">
      <span className="header-title">{title} - {props.myFollowings.length}</span>
    </div>
  );
  const renderReleaseHeader = (title) => (
    <div className="release-header">
      <span className="header-title">{title}</span>
    </div>
  );
  useEffect(() => {
    if (props.myFollowings.length) {
      props.fetchAlbums({
        params: {
          orderBy: "-available_qty",
          sort: "-created_at",
          related: "songs.[transfers,album],transfers,user",
          "filter[user_id]": props.myFollowings
            .map((m) => m.artist_id)
            .join(","),
        },
      });
    }
  }, [props.myFollowings]);

  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

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
      token.near_account_id
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

  const onBuy = async (album) => {
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
  };
  return (
    <div id="user-dashboard" className="left-nav-pad right-player-pad">
      <div className="container">
      <div className="followed-artists">
        {renderFollowHeader("Followed Artists", false)}
        {props.myFollowings.length ? (
          <div className="user-block">
            {props?.myFollowings?.map((following, index) => (
              <UserAvatar
                avatarImg={following?.artist?.avatar}
                onClick={() =>
                  props.history.push(
                    `/artist/${following?.artist?.near_account_id}`
                  )
                }
                name={following?.artist?.near_account_id}
              />
            ))}
          </div>
        ) : (
          <div className="not-following">
            <div className="placeholder-graphic"><img src={NoFollowIcon} alt="no following icon" /></div>
            <h5 className="not-following-text">Never miss a beat by following your favorite <a href="/artists">artists</a>.</h5>
          </div>
        )}
        </div>
        <div className="recently-released">
        {renderReleaseHeader("Recently Released", false)}
        <div>
          {props?.albums && props.albums?.length ? (
            <div className="album-grid">
              {props.albums.map((album, index) => (
                <SingleAlbum key={index} albumInfo={album} onBuy={onBuy} />
              ))}
            </div>
          ) : (
            <div className="no-releases">
              <div className="placeholder-graphic"><img src={NoReleasesIcon} alt="no releases icon" /></div>
              <h5 className="no-releases-text"><a href="/albums">Albums</a> released by the artists you follow will display here.</h5>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      myFollowings: state.followers.followers,
      albums: state.albums.albums,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      fetchAlbums: (data) => dispatch(fetchAlbumsAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      addTokenTransfer: (data) => dispatch(addTokenTransferAction(data)),
      buyAlbumBundleNFT: (data) => dispatch(buyAlbumBundleNFTAction(data)),
    };
  }
)(withRouter(UserDashboard));
