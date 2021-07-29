import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleAlbum from '../../Components/Common/SingleAlbum';
import UserAvatar from '../../Components/Common/UserAvatar';
import SongList from '../../Components/Parts/SongList';

import { filter } from 'lodash';
import './SearchResult.scss';

function SearchResult(props) {
    const { results } = props?.searchResult;
    console.log(results, '')
    const albumsData = filter(results, item => item.type === "albums")[0]?.data || [];
    const artistsData = filter(results, item => item.type === "artists")[0]?.data || [];
    const songsData = filter(results, item => item.type === "songs")[0]?.data || [];
    console.log('result', songsData)

    const albumDetailRender = (albumNo) => (
        albumsData.map((album, index) => albumNo === index && (
            <div className="album-detail">
                <div>{album.title}</div>
                <div>{album.artist || ""}</div>
                <div>{album.Releases || album.own}</div>
            </div>
        ))
    )

    return (
        <div className="container search-result left-nav-pad right-player-pad">
            <div>
                <div className="album-title">Album results</div>
                {albumsData && albumsData.length ? <div className="" id="search-album">
                    <div className="album-grid">
                        {albumsData && albumsData.map((album, index) => (
                            <SingleAlbum key={index} albumInfo={album} children={albumDetailRender(index)} />
                        ))}
                    </div>
                </div> :
                    <NoResult />
                }
            </div>
            <div>
                <div className="songlist-title">song results</div>
                {songsData.length ? <SongList songList={songsData} /> : <NoResult />}

            </div>
            <div className="songlist-title">artist result</div>
            <div className="artist-holder">
                {artistsData.length > 0 ? artistsData.map((artist, index) => (
                    <UserAvatar avatarImg={artist.avatar} name={artist.name} key={`${index}art`} onClick={() => props.history.push(`/artist/${artist.id}`)} />
                )) : (
                    <NoResult />
                )}
            </div>
        </div>
    )
}
export default connect(state => {
    return {
        searchResult: state.searchRes.searchResult,
    }
})(withRouter(SearchResult));

const NoResult = () => <h4 className="no-result">No Results!</h4>