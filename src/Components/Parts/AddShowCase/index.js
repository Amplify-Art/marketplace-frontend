import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchNFTsAction } from "../../../redux/actions/NFTAction";
import {
  addShowcaseAction,
  updateShowcaseAction,
} from "../../../redux/actions/ShowcaseAction";
import "./AddShowCase.scss";
import CDImg from "../../../assets/images/cd-img.svg";
import { getTokens } from "../../../Utils/near";
function AddShowCase({
  showCaseData,
  songs,
  fetchNFTs,
  nfts,
  selectedSongs,
  addShowcase,
  isFetchingNFts,
  toggleShowCaseModal,
  isPlayList,
  addToPlaylist,
  updateShowcase,
  setFetchShowCases,
  fetchShowCases,
  wallet,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNFTs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNFTs = async () => {
    let tokens = await getTokens(wallet);
    let songtokens = tokens.map((t) => t.token_id.split(":")[2]);
    fetchNFTs({
      nft_tokens: songtokens,
      type: "showcase",
    });
  };
  const onAddingShowcase = async (nft) => {
    if (nft.action === "remove") {
      updateShowcase({
        album_id: null,
        user_id: null,
        is_deleted: true,
        id: nft.existing_id,
      });
      setFetchShowCases(!fetchShowCases);
    } else {
      addShowcase({
        album_id: nft.id,
      });
      setFetchShowCases(!fetchShowCases);
    }
    toggleShowCaseModal();
  };
  let data = [];
  const mappedSelectedIds = (selectedSongs || []).map((s) => s.id);
  if (isPlayList) {
    data = songs.filter((f) => !mappedSelectedIds.includes(f.id));
  } else {
    data = nfts || [];
  }
  const onLoadingImage = (i) => {
    if (data.length - 1 === i) {
      setLoading(false);
    }
  };
  return (
    <div id="addshowcase">
      <div className="scrollbar" id="style-4">
        {data?.length !== 0 ? (
          data.map((nft, item) => (
            <div className="row">
              <div className="playlist-cover-holder">
                <img
                  src={
                    isPlayList && !nft.is_album_cover_owner
                      ? CDImg
                      : `https://gateway.pinata.cloud/ipfs/${isPlayList
                        ? nft.album && nft.album.cover_cid
                        : nft.cover_cid
                      }`
                  }
                  onLoad={() => onLoadingImage(item)}
                  className={`cover ${loading && "hidden"}`}
                  onError
                  alt="cover"
                />
                {loading && <Skeleton width={60} height={60} />}
              </div>
              <div className="row-wrap">
                <div className="row-title">
                  {isPlayList ? nft && nft.title : nft.title}
                </div>
                {/* <div className="row-desc">
                  {isPlayList
                    ? nft.album &&
                    nft.album.description &&
                    nft.album.description.substring(0, 50)
                    : nft.description && nft.description.substring(0, 50)}
                  ...
                </div> */}
              </div>
              {/* Button for playlist  */}
              {isPlayList && (
                <button
                  className="add-btn"
                  type="button"
                  onClick={() => addToPlaylist(nft)}
                >
                  {selectedSongs.map((i) => i.id).includes(nft.id)
                    ? "Remove"
                    : "Add"}
                </button>
              )}
              {/* button for showcase */}
              {!isPlayList && (
                <button
                  className="add-btn"
                  type="button"
                  onClick={() => onAddingShowcase(nft)}
                >
                  {nft.action === "remove" ? "Remove" : "Add"}
                </button>
              )}
            </div>
          ))
        ) : songs?.length ? (
          <></>
        ) : isFetchingNFts ? (
          <div className="loading-skeleton">
            {[1, 2, 3, 4, 5].map(() => (
              <Skeleton width={`100%`} height={60} />
            ))}
          </div>
        ) : !isFetchingNFts && (!songs || songs.length === 0) ? (
          <div className="no-songs">
            You do not own any songs or albums to display.
          </div>
        ) : (
          <div className="loading-skeleton">
            {[1, 2, 3, 4, 5].map(() => (
              <Skeleton width={`100%`} height={60} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      nfts: state.nfts.nfts,
      isFetchingNFts: state.nfts.loading || state.songs.loading,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      fetchNFTs: (data) => dispatch(fetchNFTsAction(data)),
      addShowcase: (data) => dispatch(addShowcaseAction(data)),
      updateShowcase: (data) => dispatch(updateShowcaseAction(data)),
    };
  }
)(withRouter(AddShowCase));
