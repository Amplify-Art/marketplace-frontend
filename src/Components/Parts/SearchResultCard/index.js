import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { filter } from "lodash";
import { hideSearchResultAction } from "../../../redux/actions/SearchResAction";
import Image from "../../Common/Image";
import "./SearchResultCard.scss";
import cdCover from "../../../assets/images/cd-img.svg";
import greyFace from "../../../assets/images/grey_face.gif";

function SearchResultCard(props) {
  useEffect(() => {
    if (props.history?.location?.pathname === "/search-result")
      props.hideSearchResult();
  }, []);
  const { results } = props?.searchResult;
  const albumsData =
    filter(results, (item) => item.type === "albums")[0]?.data || [];
  const artistsData =
    filter(results, (item) => item.type === "artists")[0]?.data || [];
  const songsData =
    filter(results, (item) => item.type === "songs")[0]?.data || [];

  const findAlbumCover = (album) => {
    if (album.cover_cid)
      return `https://gateway.pinata.cloud/ipfs/${album.cover_cid}`;
    else if (
      album &&
      album.token &&
      album.token.album &&
      album.token.album.cover_cid
    )
      return `https://gateway.pinata.cloud/ipfs/${album.token.album.cover_cid}`;
    else return cdCover;
  };

  const findSongCover = (song) => {
    if (song.album && song.album.cover_cid)
      return `https://gateway.pinata.cloud/ipfs/${
        song.album && song.album.cover_cid
      }`;
    else return cdCover;
  };

  const ResultCard = ({
    cover,
    contentHeading,
    contentDetail,
    contentTypeHeading,
    contentTypeDetail,
    rowData,
  }) => {
    return (
      <div
        className="cardWrapper"
        onClick={() => props.handleClick(contentTypeHeading, rowData)}
      >
        <div className="imageHolder">
          <Image
            className="image"
            src={cover}
            alt=""
            fallbackImage={greyFace}
          />
        </div>
        <div className="content">
          <div className="content-heading">{contentHeading}</div>
          <div className="content-details">{contentDetail}</div>
        </div>
        <div className="contentType">
          <div className="contentType-heading">{contentTypeHeading}</div>
          {/* <div className="contentType-detail">{contentTypeDetail}</div> */}
        </div>
      </div>
    );
  };
  return (
    <>
      {songsData.length
        ? songsData.map((song) => (
            <ResultCard
              cover={findSongCover(song)}
              contentHeading={song.title}
              contentDetail={song.artist?.name}
              contentTypeHeading="Song"
              contentTypeDetail={
                song.mints_owned.length
                  ? `You Own: ${song.mints_owned.map((m) => "#" + m).join(",")}`
                  : ""
              }
              rowData={song}
            />
          ))
        : null}
      {albumsData.length
        ? albumsData.map((album) => (
            <ResultCard
              cover={findAlbumCover(album)}
              contentHeading={album.title}
              contentDetail={album.user?.near_account_id}
              contentTypeHeading="Album"
              contentTypeDetail={
                album.mints_owned?.length
                  ? `You Own: ${album.mints_owned
                      .map((m) => "#" + m)
                      .join(",")}`
                  : ""
              }
              rowData={album}
            />
          ))
        : null}
      {artistsData.length
        ? artistsData.map((artist) => (
            <ResultCard
              cover={artist.avatar}
              contentHeading={artist.name}
              contentDetail={
                artist.songs <= 0
                  ? "0 Songs"
                  : artist.songs === 1
                  ? "1 Song"
                  : `${artist.songs} Songs`
              }
              contentTypeHeading="Artist"
              contentTypeDetail=""
              rowData={artist}
            />
          ))
        : null}
    </>
  );
}

export default connect(
  (state) => {
    return {
      searchResult: state.searchRes.searchResult,
    };
  },
  (dispatch) => {
    return {
      hideSearchResult: () => dispatch(hideSearchResultAction()),
    };
  }
)(withRouter(SearchResultCard));
