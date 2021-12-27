import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as nearAPI from 'near-api-js';
import { store } from 'react-notifications-component';
import q from 'querystring';
import {
  TwitterShareButton
} from "react-share";
import ConfettiImage from '../../assets/images/confetti.png';

import './MyProfile.scss';

import { fetchNFTsAction } from '../../redux/actions/NFTAction';
import { fetchTokenTransfersAction } from '../../redux/actions/TokenTransferAction';
import { fetchUserAction } from '../../redux/actions/UserAction';
import { fetchFollowersAction, updateFollowerAction, addFollowerAction } from '../../redux/actions/FollowerAction';
import ProfileHeader from '../../Components/Common/ProfileHeader';
import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import PurchasedSongs from '../../Components/Parts/PurchasedSongs';
import TwitterIcon from '../../assets/images/twitter-icon.svg';
import ShareIcon from '../../assets/images/share-icon.svg';
import copyLink from '../../assets/images/highblack copy 1.svg'
import defaultProfile from '../../assets/images/default-profile.jpg'
import { sellSongAction, showSellModalAction, hideSellModalAction, hideSellSongConfirmation } from '../../redux/actions/SongAction';
import { sellSongNFTAction } from '../../redux/actions/NFTAction';
import { fetchPlaylistsAction, deletePlaylistAction, hideDeletePlaylistAction, showPlaylistModalAction, hidePlaylistModalAction } from '../../redux/actions/PlaylistAction'
import { getUsers } from '../../Api/User';
import CreatePlayList from '../../Components/Parts/CreatePlayList';

const { utils: { format: { parseNearAmount } }, keyStores } = nearAPI;

function MyProfile(props) {

  const [bannerImage, setBannerImage] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [userName, setUserName] = useState('');
  const [userID, setID] = useState(0);
  const [sellingSong, setSellingSong] = useState(null);
  const [sellingCopy, setSellingCopy] = useState(null);
  const [openSharePopup, setSharePopup] = useState(false);
  const [selectedAlbumToken, setSelectedAlbumToken] = useState(null);
  const [isPublicProfile] = useState(props && props.location && props.location.pathname && props.location.pathname.includes('user'));
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem('amplify_app_token');
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    props.fetchPlaylists({
      params: {
        related: 'songs.[album, transfers]',
        orderBy: '-id',
        'filter[user_id]': decodedToken.id
      }
    });
    props.fetchFollowers({
      params: {
        'filter[follower_id]': decodedToken.id,
        'related': 'artist'
      }
    })
  }, []);

  const generateAlbumItem = (nft, index) => {
    return (
      <SingleAlbum key={index} albumInfo={nft} onSingleSongClick={(song) => onSingleSongClick(song, index)} index={index} zifi="sdfsf" />
    );
  }

  const onSingleSongClick = (song, index) => {
    console.log(song, props.token_transfers)
    props.showSellModal()
    setSellingSong(song)
    setSelectedAlbumToken(props.token_transfers[index])
    setSellingCopy(song.transfers.find(f => f.copy_number === props.token_transfers[index].copy_number))
  }

  const onSell = (token) => {
    setSellingCopy(token)
  }

  useEffect(() => {
    let sellingSong = JSON.parse(localStorage.getItem('selling_song'))
    if (props.history.location.search.includes('errorCode')) {
      let message = decodeURIComponent(q.parse(props.history.location.search).errorMessage)
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
          onScreen: true
        }
      });
      localStorage.removeItem('selling_song')
      props.history.push('/my-profile')
    } else if (props.history.location.search.includes('transactionHashes')) {
      let txtId = decodeURIComponent(q.parse(props.history.location.search)['?transactionHashes'])
      sellingSong.hash = txtId
      checkTxnStatus(sellingSong)
      props.sellSongNFT(sellingSong)
      localStorage.removeItem('selling_song')
      props.history.push('/my-profile')
    }
  }, [])

  const checkTxnStatus = async (sellingSong) => {
    let net = process.env.REACT_APP_CONTEXT === 'production' ? 'mainnet' : 'testnet'
    const config = {
      networkId: net,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
      nodeUrl: `https://rpc.${net}.near.org`,
      walletUrl: `https://wallet.${net}.near.org`,
      helperUrl: `https://helper.${net}.near.org`,
      explorerUrl: `https://explorer.${net}.near.org`
    };
    const near = await nearAPI.connect(config);
    const response = await near.connection.provider.txStatus(
      sellingSong.hash,
      decodedToken.near_account_id
    );
    if (response.receipts_outcome.some(f => f.outcome.status.Failure)) {
      let error = (response.receipts_outcome.find(f => f.outcome.status.Failure)).outcome.status.Failure.ActionError.kind.FunctionCallError.ExecutionError;
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
          onScreen: true
        }
      });
    } else {
      props.sellSongNFT(sellingSong)
    }
    localStorage.removeItem('selling_song')
    props.history.push('/my-profile')
  }
  const onListSong = async (e, songPrice) => {
    e.preventDefault()
    if (decodedToken.near_account_type === 'connected') {
      let price = songPrice && parseInt(songPrice.replace(/^\D+/g, '')) * 100
      let nearPrice = price / (props.nearPrice * 100)
      let selling_song = {
        id: sellingCopy.id,
        price,
        yocto_near_price: parseNearAmount(`${nearPrice}`)
      }
      let songtokenid = `${selectedAlbumToken.album.cover_cid}:${selectedAlbumToken.copy_number}:${sellingCopy.token}`

      localStorage.setItem('selling_song', JSON.stringify(selling_song))
      await (props.wallet.account()).functionCall(
        process.env.REACT_APP_NFT_CONTRACT || 'nft1.amplifybeta.testnet',
        'nft_approve',
        {
          token_id: songtokenid,
          account_id: process.env.REACT_APP_NEAR_MARKET_ACCOUNT || 'market1.amplifybeta.testnet',
          price: parseNearAmount(`${nearPrice}`),
        },
        300000000000000,
        parseNearAmount('0.01'),
      )
    } else {
      props.sellSong({
        id: sellingCopy.id,
        price: songPrice && parseInt(songPrice.replace(/^\D+/g, '')) * 100
      })
    }
  }
  const ArtistData = {
    cover: bannerImage,
    avatar: profileImage,
    name: userName
  };

  const copyProfileLink = (e) => {
    e.preventDefault();
    // const profileLink = document.getElementById("hidden-profile-link");

    // profileLink.select();
    // profileLink.setSelectionRange(0, 99999); /* For mobile devices */

    // document.execCommand("copy");

    const tempInput = document.createElement("input");
    tempInput.value = `https://amplifyart.netlify.app/user/${userName}`;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setSharePopup(false);
  }

  const onFollow = () => {
    // console.log(props.myFollowings, userID, decodedToken)
    let follow = props.myFollowings.find(f => f.artist_id === userID)
    console.log(follow)
    if (follow) {
      props.updateFollower({
        id: follow.id,
        is_deleted: true,
        artist_id: null,
        follower_id: null,
      })
    } else {
      props.addFollower({
        artist_id: userID,
        follower_id: decodedToken.id,
      })
    }
  }
  const renderBtnContent = () => {
    return (
      <>
        {/* {!isPublicProfile && <button >Set as <img src={TwitterIcon} alt="Twitter" /> Banner</button>} */}
        <div className="popup-container">
          {openSharePopup && <div className="popUp" >
            <a href='#' className="popup-div" onClick={copyProfileLink}><img src={copyLink} alt="Copy Link" className="popup-img" /><span>Copy Link</span></a>
            <TwitterShareButton
              className="popup-div"
              title="Check out my Amplify.art profile!"
              url={`https://amplfy.art/user/${userName}`}
              via="amplifyart"
            ><img src={TwitterIcon} alt="Twitter" className="popup-img" style={{ width: '32px' }} /><span>Tweet</span></TwitterShareButton>
          </div>}
          <button className="set_name" onClick={() => setSharePopup(!openSharePopup)} ><img src={ShareIcon} alt="Twitter" /> Share</button>
          <button className="edit-profile" onClick={() => props.history.push('/settings')} > Edit Profile</button>
        </div>

      </>
    )
  }

  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    if (isPublicProfile) {
      const nearId = props.match.params.id;
      const res = await getUsers({
        params: {
          'filter[near_account_id]': nearId
        }
      })
      if (res.data.success && res.data.results.length) {
        let { id, near_account_id } = res.data.results[0]
        props.fetchUser({
          id: id
        });
        props.fetchTokenTransfers({
          params: {
            'filter[type]': 'album_bundle',
            related: 'album.songs',
            orderBy: '-id',
            'filter[transfer_to]': id
          }
        });

        setID(parseInt(id));
        setUserName(near_account_id);
      }
    } else if (token) {
      setBannerImage(decodedToken.banner);
      setProfileImage(decodedToken.avatar);
      setUserName(decodedToken.near_account_id);
      setID(decodedToken.id);

      props.fetchTokenTransfers({
        params: {
          'filter[type]': 'album_bundle',
          related: 'album.[user,songs.transfers]',
          orderBy: '-id',
          'filter[transfer_to]': decodedToken.id
        }
      });
    }
  }

  useEffect(() => {
    if (isPublicProfile) {
      setBannerImage(props.user.banner);
      setProfileImage(props.user.avatar);
      setUserName(props.user.near_account_id);
      props.fetchFollowers({
        params: {
          'filter[follower_id]]': decodedToken.id,
          'filter[artist_id]]': props.user.id,
        }
      })
    }
  }, [props.user]);

  const closeModals = () => {
    setSellingCopy(null)
    setSellingSong(null)
    props.hideSellModal()
  }

  const onClose = () => {
    props.hideSellConfirmation();
    props.history.push('/')
    window.location.reload()
  }
  const renderHeader = (title, isCreateButton = false) => (
    <div className="album-header">
      <span className="header-title">{title}</span>
      <div>
        {isCreateButton && <button className="btn-wrap" onClick={() => togglePlayListModal()}>Create New</button>}
        {/* <button className="btn-wrap">View All</button> */}
      </div>
    </div>
  );

  const togglePlayListModal = () => {
    if (props.show_modal) {
      props.hidePlaylistModal();
    } else {
      props.showPlaylistModal();
    }
  }

  return (
    <div id="profile" className={`left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <ProfileHeader ArtistData={ArtistData} btnContent={renderBtnContent()} showShowcase={true} isPublicProfile={isPublicProfile} userId={props.match.params.id} />
      {renderHeader(`Playlists - ${props.totalPlaylists ? props.totalPlaylists : "0"}`, true)}

      {props.playlists && props.playlists.length > 0 ? (
        <div className="album-block">
          {props.playlists.map((album, index) => (
            <SingleAlbum key={index} albumInfo={{ ...album, hideSticker: true }} isMint={false} isPlayList setDeletingId={setDeletingId} onSingleSongClick={(song) => onSingleSongClick(song, index)} />
          ))}
        </div>
      ) : (
        <div className="no-records">
          <h5>No playlists found</h5>
        </div>
      )}
      {props.token_transfers.length ?
        <div className="recently-purchased">
          <div className="top">
            <h2>Recently Purchased</h2>
            {/* <button className="btn outlined">View All</button> */}
          </div>

          <div className="albums" className="album-grid">
            {props && props.token_transfers && props.token_transfers.length > 0 && props.token_transfers.filter(f => f.type !== null).map((token, index) => (
              generateAlbumItem({ token, copy_number: token.copy_number, hideSticker: false }, index)
            ))}
          </div>
        </div>
        :
        !props.loading ?
          <h4 className="large-white center-text">No items to show</h4>
          : null
      }
      {props.displaySellModal && <GeneralModal
        bodyChildren={<PurchasedSongs
          transfers={(sellingSong && sellingSong.transfers) || []}
          onSell={onSell}
          sellingCopy={sellingCopy}
          sellingSong={sellingSong}
          onListSong={onListSong}
          selectedAlbumToken={selectedAlbumToken}
        />}
        contentClassName="sellSong-modal"
        closeModal={() => closeModals()}
        isCloseButton={true}
      />
      }
      {props.showSellConfirmation && <GeneralModal
        topIcon={ConfettiImage}
        headline="Congrats, Your Song Has Been Listed!"
        buttons={[
          {
            type: 'solid go-home',
            text: 'Go Home',
            onClick: () => onClose()
          }
        ]}
        className="centered"
      />}
      {props.show_modal && <GeneralModal
        headline={<><span>Create New Playlist</span><span style={{ float: 'right', color: '#bcbcbc', cursor: 'pointer' }} onClick={() => togglePlayListModal()}> ⤫</span></>}
        bodyChildren={<CreatePlayList showCaseData={{}} togglePlayListModal={togglePlayListModal} />}
        contentClassName="playlist-modal"
      />
      }
      {
        props.show_delete_modal &&
        <GeneralModal
          // topIcon={ConfettiImage}
          headline="Are you sure to delete this playlist?"
          buttons={[
            {
              type: 'solid go-home',
              text: 'Yes',
              onClick: () => props.deletePlaylist({ id: deletingId })
            },
            {
              type: 'solid go-home',
              text: 'Cancel',
              onClick: () => props.hideDeletePlaylist()
            }
          ]}
          className="centered"
        />
      }
    </div>
  );
}


export default connect(state => {
  return {
    nfts: state.nfts.nfts,
    user: state.users.user,
    total: state.nfts.total,
    loading: state.nfts.loading,
    token_transfers: state.token_transfers.token_transfers,
    myFollowings: state.followers.followers,
    displaySellModal: state.songs.showSellModal,
    wallet: state.global.wallet,
    nearPrice: state.global.nearPrice,
    showSellConfirmation: state.songs.showSellConfirmation,
    playlists: state.playlists.playlists,
    totalPlaylists: state.playlists.total,
    show_delete_modal: state.playlists.show_delete_modal,
    show_modal: state.playlists.show_modal
  }
},
  dispatch => {
    return {
      fetchTokenTransfers: (data) => dispatch(fetchTokenTransfersAction(data)),
      fetchUser: (data) => dispatch(fetchUserAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      updateFollower: (data) => dispatch(updateFollowerAction(data)),
      addFollower: (data) => dispatch(addFollowerAction(data)),
      sellSong: (data) => dispatch(sellSongAction(data)),
      showSellModal: () => dispatch(showSellModalAction()),
      hideSellModal: () => dispatch(hideSellModalAction()),
      hideSellConfirmation: () => dispatch(hideSellSongConfirmation()),
      sellSongNFT: (data) => dispatch(sellSongNFTAction(data)),
      showPlaylistModal: () => dispatch(showPlaylistModalAction()),
      hidePlaylistModal: () => dispatch(hidePlaylistModalAction()),
      fetchPlaylists: (data) => dispatch(fetchPlaylistsAction(data)),
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
      deletePlaylist: (data) => dispatch(deletePlaylistAction(data)),
      hideDeletePlaylist: (data) => dispatch(hideDeletePlaylistAction(data)),
    }
  })(withRouter(MyProfile));