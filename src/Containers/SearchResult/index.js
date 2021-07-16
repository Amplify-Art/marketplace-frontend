import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleAlbum from '../../Components/Common/SingleAlbum';
import UserAvatar from '../../Components/Common/UserAvatar';
import SongList from '../../Components/Parts/SongList'; 
import Avatar from '../../assets/images/avatar.png';
import AvatarTwo from '../../assets/images/avatar2.png';
import AvatarThree from '../../assets/images/avatar3.png';
import AvatarFour from '../../assets/images/avatar4.png';

import { filter } from 'lodash';
import './SearchResult.scss';

function SearchResult(props) {
    const { results } = props.searchResult;
    const albumsData = filter(results, item => item.type === "albums")[0]?.data || [];
    const artistsData = filter(results, item => item.type === "artists")[0]?.data ||[];
    const songsData = filter(results, item => item.type === "songs")[0]?.data || [];

    {console.log("New filter data----->",albumsData,artistsData,songsData)}

    const albums = [
        {
            available_qty: 0,
            cid: "bafkreieyhdc7lihc3gyat4dbu5wb7cgq5folszpmphwvy6knggdjkg267y",
            cover_cid: "bafkreihlro7tpfyexvsfjqda7xuwrt2dlpa3dtmke56s5tpcrj3sbopfci",
            created_at: "2021-07-05T12:00:09.484Z",
            current_owner: 10,
            description: "The greatest of all time",
            has_copy: false,
            id: 83,
            is_deleted: false,
            is_purchased: false,
            price: 100,
            qty: "1",
            title: "RHCP Album",
            txn_hash: "HXc51kfQe9u5YKtuDu5tbWj5Da3Hy1YMepFCeKJDTV3C",
            updated_at: "2021-07-05T12:53:21.334Z",
            user_id: 11,
            Releases: "10/09/2020",

            user: {
                avatar: "http://pbs.twimg.com/profile_images/706372970021830656/8ZAh7dsF_400x400.jpg",
                banner: "https://pbs.twimg.com/profile_banners/706371877032349696/1623412185",
                connected_to_near: true,
                created_at: "2021-07-05T11:52:27.303Z",
                id: 11,
                is_deleted: false,
                name: "Jonathon Hammond",
                near_account_id: "1625485984118",
                near_public_key: "ed25519:12z1KvjqFmjj3UFWbrwaWQt7KCSQ6RN5wBan4nuh5N2B",
                twitter_id: "706371877032349696",
                type: "artist",
                updated_at: "2021-07-05T11:53:26.320Z",
                username: "im_dbl_j",
                songs: [
                    {
                        album_id: 83,
                        available_qty: 1,
                        cid: "bafkreiblay3u7przbtzzkuc3t5gxpme432wu33qvadlzwb2mw5dsevudtu",
                        created_at: "2021-07-05T12:00:29.413Z",
                        current_owner: 10,
                        genre: null,
                        has_copy: true,
                        id: 24,
                        is_deleted: false,
                        is_purchased: false,
                        lyricist: null,
                        price: null,
                        qty: "1",
                        released_year: "2021-07-05T00:00:00.000Z",
                        singer: null,
                        song_cid: "bafybeifkpbbibeegkqkshpux53j7j5p3objy5il6zxxjnlscf4ilkx7axm",
                        title: "Other side",
                        txn_hash: "CP7x1Hm8tzRJx2TpGUfnaHT2JrEvgEV8mrYyisRhAiAb",
                        updated_at: "2021-07-05T12:53:21.355Z",
                        user_id: 11,
                    }
                ]
            }
        },
        {
            available_qty: 0,
            cid: "bafkreieyhdc7lihc3gyat4dbu5wb7cgq5folszpmphwvy6knggdjkg267y",
            cover_cid: "bafkreihlro7tpfyexvsfjqda7xuwrt2dlpa3dtmke56s5tpcrj3sbopfci",
            created_at: "2021-07-05T12:00:09.484Z",
            current_owner: 10,
            description: "The greatest of all time",
            has_copy: false,
            id: 83,
            is_deleted: false,
            is_purchased: false,
            price: 100,
            qty: "1",
            title: "RHCP Album",
            txn_hash: "HXc51kfQe9u5YKtuDu5tbWj5Da3Hy1YMepFCeKJDTV3C",
            updated_at: "2021-07-05T12:53:21.334Z",
            user_id: 11,
            own: 4,
            user: {
                avatar: "http://pbs.twimg.com/profile_images/706372970021830656/8ZAh7dsF_400x400.jpg",
                banner: "https://pbs.twimg.com/profile_banners/706371877032349696/1623412185",
                connected_to_near: true,
                created_at: "2021-07-05T11:52:27.303Z",
                id: 11,
                is_deleted: false,
                name: "Jonathon Hammond",
                near_account_id: "1625485984118",
                near_public_key: "ed25519:12z1KvjqFmjj3UFWbrwaWQt7KCSQ6RN5wBan4nuh5N2B",
                twitter_id: "706371877032349696",
                type: "artist",
                updated_at: "2021-07-05T11:53:26.320Z",
                username: "im_dbl_j",
                songs: [
                    {
                        album_id: 83,
                        available_qty: 1,
                        cid: "bafkreiblay3u7przbtzzkuc3t5gxpme432wu33qvadlzwb2mw5dsevudtu",
                        created_at: "2021-07-05T12:00:29.413Z",
                        current_owner: 10,
                        genre: null,
                        has_copy: true,
                        id: 24,
                        is_deleted: false,
                        is_purchased: false,
                        lyricist: null,
                        price: null,
                        qty: "1",
                        released_year: "2021-07-05T00:00:00.000Z",
                        singer: null,
                        song_cid: "bafybeifkpbbibeegkqkshpux53j7j5p3objy5il6zxxjnlscf4ilkx7axm",
                        title: "Other side",
                        txn_hash: "CP7x1Hm8tzRJx2TpGUfnaHT2JrEvgEV8mrYyisRhAiAb",
                        updated_at: "2021-07-05T12:53:21.355Z",
                        user_id: 11,
                    }
                ]
            }
        },
        {
            available_qty: 0,
            cid: "bafkreieyhdc7lihc3gyat4dbu5wb7cgq5folszpmphwvy6knggdjkg267y",
            cover_cid: "bafkreihlro7tpfyexvsfjqda7xuwrt2dlpa3dtmke56s5tpcrj3sbopfci",
            created_at: "2021-07-05T12:00:09.484Z",
            current_owner: 10,
            description: "The greatest of all time",
            has_copy: false,
            id: 83,
            is_deleted: false,
            is_purchased: false,
            price: 100,
            qty: "1",
            title: "RHCP Album",
            txn_hash: "HXc51kfQe9u5YKtuDu5tbWj5Da3Hy1YMepFCeKJDTV3C",
            updated_at: "2021-07-05T12:53:21.334Z",
            user_id: 11,
            user: {
                avatar: "http://pbs.twimg.com/profile_images/706372970021830656/8ZAh7dsF_400x400.jpg",
                banner: "https://pbs.twimg.com/profile_banners/706371877032349696/1623412185",
                connected_to_near: true,
                created_at: "2021-07-05T11:52:27.303Z",
                id: 11,
                is_deleted: false,
                name: "Jonathon Hammond",
                near_account_id: "1625485984118",
                near_public_key: "ed25519:12z1KvjqFmjj3UFWbrwaWQt7KCSQ6RN5wBan4nuh5N2B",
                twitter_id: "706371877032349696",
                type: "artist",
                updated_at: "2021-07-05T11:53:26.320Z",
                username: "im_dbl_j",
                songs: [
                    {
                        album_id: 83,
                        available_qty: 1,
                        cid: "bafkreiblay3u7przbtzzkuc3t5gxpme432wu33qvadlzwb2mw5dsevudtu",
                        created_at: "2021-07-05T12:00:29.413Z",
                        current_owner: 10,
                        genre: null,
                        has_copy: true,
                        id: 24,
                        is_deleted: false,
                        is_purchased: false,
                        lyricist: null,
                        price: null,
                        qty: "1",
                        released_year: "2021-07-05T00:00:00.000Z",
                        singer: null,
                        song_cid: "bafybeifkpbbibeegkqkshpux53j7j5p3objy5il6zxxjnlscf4ilkx7axm",
                        title: "Other side",
                        txn_hash: "CP7x1Hm8tzRJx2TpGUfnaHT2JrEvgEV8mrYyisRhAiAb",
                        updated_at: "2021-07-05T12:53:21.355Z",
                        user_id: 11,
                    }
                ]
            }
        }
    ]

    const fakeAvatar = [
        { user_img: Avatar, name: "Imagine Dragons" },
        { user_img: AvatarTwo, name: "Kid Cudi" },
        { user_img: AvatarThree, name: "Eminem" },
        { user_img: AvatarFour, name: "John Mayer" },
    ]



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
        <div className="search-result left-nav-pad right-player-pad">
            <div>
                <div className="album-title">Album results</div>
                <div className="flex">
                    {albumsData && albumsData.map((album, index) => (
                        <SingleAlbum key={index} albumInfo={album} children={albumDetailRender(index)} />
                    ))}
                </div>
            </div>
            <div>
                <div className="songlist-title">song results</div>
                <SongList/>
            </div>
            <div className="songlist-title">artist result</div>
            <div className="flex f-jc-space-around">
                {fakeAvatar && fakeAvatar.map((avatar, index) => (
                    <UserAvatar avatarImg={avatar.user_img} name={avatar.name} />
                ))}
            </div>
        </div>
    )
}
export default connect(state => {
    return {
      searchResult: state.searchRes.searchResult,
    }
  })(withRouter(SearchResult));