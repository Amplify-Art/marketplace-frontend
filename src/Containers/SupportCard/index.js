import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Card1A from "../../assets/images/Card_1_A.png";
import Card1B from "../../assets/images/Card_1_B.png";
import Card1C from "../../assets/images/Card_1_C.png";
import Card2A from "../../assets/images/Card_2_A.png";
import Card2B from "../../assets/images/Card_2_B.png";
import Card2C from "../../assets/images/Card_2_C.png";
import Card3A from "../../assets/images/Card_3_A.png";
import Card3B from "../../assets/images/Card_3_B.png";
import Card3C from "../../assets/images/Card_3_C.png";
import DownArrowIcon from "../../assets/images/Down_arrow.svg";
import CalanderIcon from "../../assets/images/CalanderIcon.svg";
import RightIcon from "../../assets/images/RightIcon.svg";
import RightIconDisable from "../../assets/images/RightIconDisable.svg";
import SupportCardCover from "../../assets/images/support-card.png";
import Vote from "../../assets/images/Vote.svg";
import { getNearConfig } from "../../Constants/near";
import {
  hideLoadingOverlayAction,
  displayLoadingOverlayAction,
} from "../../redux/actions/GlobalAction";
import "./SupportCard.scss";
import { fetchNominationsAction } from "../../redux/actions/NominationAction";
import {
  fetchNominationVotesAction,
  addNominationVoteAction,
} from "../../redux/actions/NominationVoteAction";

const {
  WalletConnection,
  utils: {
    format: { formatNearAmount },
  },
} = nearAPI;

function SupportCard(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  const [withdrawableAmount, setWithdrawableAmount] = useState("0");
  const [supporterCards, setSupporterCards] = useState([]);

  useEffect(() => {
    fetchSupportCards();
    props.fetchNominations({
      params: {
        related: "votedFor,votes",
        "filter[is_in_queue]": true,
      },
    });
  }, []);
  useEffect(() => {
    props.fetchNominationVotes({
      params: {
        "filter[voter_id]": user.id,
        "filterRelated[nomination.is_in_queue.=]": true,
      },
    });
  }, [user && user.id]);

  const deletePins = () => {
    const pins = [
      {
          "id": "42c6a233-8841-48c2-94a2-1ed24b17ec8a",
          "ipfs_pin_hash": "QmWmrGqp8pHfxCJogAZgQiPUQnQFAv7yV9d5p1EKzm1sRx",
          "size": 710886,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-30T19:04:08.900Z",
          "date_unpinned": null,
          "metadata": {
              "name": "pics",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "744ffcb1-fa8b-4be3-9d96-36ef4fca5d66",
          "ipfs_pin_hash": "QmXrmb2L29X6VAsnW1ErWkV7Lcuz5qUck2KxpWnEQwunPv",
          "size": 51730,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-30T19:03:51.886Z",
          "date_unpinned": null,
          "metadata": {
              "name": "pics",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "14f801fa-f6f0-438f-802a-4959c90c4f3c",
          "ipfs_pin_hash": "QmUTMBGHzKgV1YHrsN4Ez8gwLTpPjBbVDbLFip73Wx9wB1",
          "size": 47569,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-30T19:03:29.570Z",
          "date_unpinned": null,
          "metadata": {
              "name": "pics",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "ad48e8ee-3aac-4b84-a885-2c1b3db2212b",
          "ipfs_pin_hash": "QmaFnQJLaPfV1AnaUvbdWtfZQw2VfTSrEaYUCJpdr38sGG",
          "size": 446469,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:48:19.070Z",
          "date_unpinned": null,
          "metadata": {
              "name": "pics",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "0df7505f-7d47-4c2a-9287-b847bc5ff5d4",
          "ipfs_pin_hash": "Qmb4VWWxQL98YEsS25gpUNr5ZsrGYHy9z7rPzuhLbx7SM3",
          "size": 3175723,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:47:30.310Z",
          "date_unpinned": null,
          "metadata": {
              "name": "pics",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "47e6789c-8a9f-4c60-8dd0-15e2ee5128de",
          "ipfs_pin_hash": "QmeEFg72PHi5K23F5L3PNwrcWQVwiK3VSgKtpuKeyhkD6L",
          "size": 252,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:42:00.301Z",
          "date_unpinned": null,
          "metadata": {
              "name": "Middle Child- Info",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "0f09aef9-2989-4419-97c7-f476cbf0dcbe",
          "ipfs_pin_hash": "QmV6MfUrmnZ6QkZnYGsqG2KHT4kmEUsxFjuuohJCYUcZd6",
          "size": 253,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:42:00.272Z",
          "date_unpinned": null,
          "metadata": {
              "name": "No Role Model- Info",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "284123a5-38a9-4f7a-bd42-30524d707c54",
          "ipfs_pin_hash": "Qmc5gSiXpujs53RFpHyVRYLmrCBEavry572HvtRteEXXRY",
          "size": 8548320,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:41:17.337Z",
          "date_unpinned": null,
          "metadata": {
              "name": "middle-child.mp3",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "69062600-d9a7-4f76-8d51-92475606408f",
          "ipfs_pin_hash": "QmZ5CndHWDCDbJJcijDWx2YWBuKx9K5LJVHt3R5xdxCn8G",
          "size": 11866892,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:41:14.051Z",
          "date_unpinned": null,
          "metadata": {
              "name": "no-role.mp3",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      },
      {
          "id": "0feeff77-57d4-4bec-b95d-534b7e097fe1",
          "ipfs_pin_hash": "QmRGWDcPehLUCpjJNxYHFwvUmuPSNCisngYkCiZsZWFQHv",
          "size": 407274,
          "user_id": "d241ffcc-4a92-4e57-99da-b8d099e57a41",
          "date_pinned": "2022-11-28T17:40:55.332Z",
          "date_unpinned": null,
          "metadata": {
              "name": "undefined",
              "keyvalues": {}
          },
          "regions": [
              {
                  "regionId": "NYC1",
                  "currentReplicationCount": 1,
                  "desiredReplicationCount": 1
              }
          ]
      }
    ];

    // eslint-disable-next-line array-callback-return
    pins.map(pin => {
      setTimeout(
        axios.delete(`https://api.pinata.cloud/pinning/unpin/${pin.ipfs_pin_hash}`, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMjQxZmZjYy00YTkyLTRlNTctOTlkYS1iOGQwOTllNTdhNDEiLCJlbWFpbCI6ImpvbmF0aG9uQHBpeGVsOC5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkOGZkNTgwMmUyZjc4Y2YyYTNlYSIsInNjb3BlZEtleVNlY3JldCI6IjM5MGIwOGNkNzE4ODYzN2FmNGViMTlkNjNmNTU3ZDU1ZTI2MDIzNzE1NTZmZWYyY2Q5NWIxOTc3MzA2MDk4YzgiLCJpYXQiOjE2NzAyNzA2OTZ9.my4oSimEoZKC0YsW5hdCByVN_ay15MKZDYFodi8cHvQ"
          }
        }), 1000)
    })
  }

  const fetchSupportCards = async () => {
    let url =
      process.env.REACT_APP_CONTEXT === "production"
        ? "https://mintbase-mainnet.hasura.app/v1/graphql"
        : "https://mintbase-testnet.hasura.app/v1/graphql";

    let storeId =
      process.env.REACT_APP_CONTEXT === "production"
        ? "amplifytest.mintspace2.testnet"
        : "amplifytest.mintspace2.testnet";
    let res = await axios.post(`${url}`, {
      query: `query MyQuery {\n  token(where: {storeId: {_eq: "${storeId}"}, ownerId: {_eq: "${user.near_account_id}"}}) {\n    id\n    thingId\n  }\n}\n`,
      operationName: "MyQuery",
    });
    if (res.data.data) {
      let tokens = await Promise.all(
        res.data.data.token.map((t) =>
          axios.get(`https://arweave.net/${t.thingId.split(":")[0]}`)
        )
      );
      let mappedTokenMetadata = tokens.map((t) => t.data);
      setSupporterCards(mappedTokenMetadata);
    }
  };
  const CardData = [
    Card1A,
    Card1B,
    Card1C,
    Card2A,
    Card2B,
    Card2C,
    Card3A,
    Card3B,
    Card3C,
  ];
  const month_Data = [
    { month: "june", gwei: "gwei", isChecked: false },
    { month: "may", gwei: "gwei", isChecked: false },
    { month: "april", gwei: "gwei", isChecked: true },
    { month: "march", gwei: "gwei", isChecked: true },
  ];

  const mostPlayData = [
    { name: "Song Name", count: 13 },
    { name: "Song Name", count: 11 },
    { name: "Song Name", count: 10 },
    { name: "Song Name", count: 9 },
    { name: "Song Name", count: 8 },
    { name: "Song Name", count: 8 },
    { name: "Song Name", count: 5 },
    { name: "Song Name", count: 5 },
    { name: "Song Name", count: 4 },
    { name: "Song Name", count: 3 },
  ];

  const renderCards = () => {
    return supporterCards.map((card, index) => (
      <div className="card-img" key={index}>
        <img src={card.media} alt={card.title} />
      </div>
    ));
  };
  const renderSongList = () =>
    mostPlayData.map((song, index) => (
      <div className="song-content d-h-between">
        <div>{song.name}</div>
        <div>{song.votes}</div>
      </div>
    ));

  const renderVoteList = () =>
    (props.nominations || []).map((nomination, index) => (
      <div className="song-content d-h-between voter-list">
        <div>{nomination.votedFor && nomination.votedFor.near_account_id}</div>
        <div className="vote-actions">
          {<span>{(nomination.votes && nomination.votes.length) || 0}</span>}
          <img src={Vote} onClick={() => onVote(nomination)} />
        </div>
      </div>
    ));
  const onVote = (nomination) => {
    props.addNominationVote({
      nomination_id: nomination.id,
    });
  };

  useEffect(() => {
    if (user.near_account_id) fetchBalance();
  }, [user]);

  const fetchBalance = async () => {
    let near = await getNearConfig();
    const wallet = new WalletConnection(near, "amplify_art");
    const contract = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      "pay.amplifybeta.testnet",
      {
        viewMethods: ["get_payout_by_account"], // view methods do not change state but usually return a value
        changeMethods: ["withdraw"], // change methods modify state
        sender: wallet.account(), // account object to initialize and sign transactions.
      }
    );
  };
  const onWithDrawAmount = async () => {
    props.displayLoadingOverlay();
    let near = await getNearConfig();
    const wallet = new WalletConnection(near, "amplify_art");
    const contract = new nearAPI.Contract(
      wallet.account(), // the account object that is connecting
      "pay.amplifybeta.testnet",
      {
        viewMethods: ["get_payout_by_account"], // view methods do not change state but usually return a value
        changeMethods: ["withdraw"], // change methods modify state
        sender: wallet.account(), // account object to initialize and sign transactions.
      }
    );
    try {
      await contract.withdraw({});
      setWithdrawableAmount(formatNearAmount(0));
      props.hideLoadingOverlay();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="support-card" className="left-nav-pad right-player-pad">
      <div className="container">
        <div className="bal-wrapper">
          <div className="left-wrap">
            <div className="bal-title">Pending Award Balance</div>
            <div className="price">{withdrawableAmount.substring(0, 5)}</div>
            <div className="near">NEAR</div>
            <button className="withdraw-btn" onClick={onWithDrawAmount}>
              Withdraw To Balance
            </button>
            <div className="report-link">Export Earnings Report</div>
          </div>
          {/* <div className="supporter-wrapper">
            <div className="support-header d-h-between">
              <div className="support-title">Supporter Rev Share</div>
              <div className="support-cal">
                <img src={CalanderIcon} alt="" className="cal-img" />
                <span className="cal-font">2021</span>
                <img src={DownArrowIcon} alt="" className="cal-img" />
              </div>
            </div>
            <div className="support-content">
              {month_Data &&
                month_Data.map((item, index) => (
                  <div className="support-inner-content d-h-between">
                    <div className="text-month w-33">{item.month}</div>
                    <div className="text-gwei w-33">{item.gwei}</div>
                    <div className="w-33 text-align-right">
                      <img
                        src={item.isChecked ? RightIcon : RightIconDisable}
                        alt=""
                        className={`${
                          item.isChecked ? "icon-green" : "icon-gray"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div> */}
        </div>
        <div className="card-title">
          You own {supporterCards.length} Support Cards
        </div>
        <div className="card-content">{renderCards()}</div>
        <div className="container1">
          <div className="col1">
            <img src={SupportCardCover} />
            <div className="owned-cards">
              <p>
                {supporterCards.length} Cards Owned.{" "}
                <a href={`${supporterCards[0]?.external_url}`} target="_blank" rel="noreferrer">
                  View Card Gallery
                </a>
              </p>
            </div>
          </div>
          <div className="song-wrapper flex f-jc-space-between col2">
            <div className="w-100 song-inner-content">
              <div className="song-head d-h-between">
                <span className="song-head-title">Supporter Voting</span>
                {/* <div className="support-cal">
                  <img src={CalanderIcon} alt="" className="cal-img" />
                  <span className="cal-font">2021</span>
                  <img src={DownArrowIcon} alt="" className="cal-img" />
                </div> */}
              </div>
              <p>
                You have {supporterCards.length - props.nominationvotes?.length}{" "}
                Votes left for this voting period.
              </p>
              {renderVoteList()}
            </div>
          </div>
        </div>
        {/* <div className="song-title">Song Stats</div> */}
        {/* <div className="song-wrapper flex f-jc-space-between">
          <div className="w-50 song-inner-content">
            <div className="song-head d-h-between">
              <span className="song-head-title">Most Played</span>
              <span className="song-count-title"># of Plays</span>
            </div>
            {renderSongList()}
          </div>
          <div className="w-50 song-inner-content">
            <div className="song-head d-h-between">
              <span className="song-head-title">Most Purchased</span>
              <span className="song-count-title"># of Sales</span>
            </div>
            {renderSongList()}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      nominations: state.nominations.nominations,
      nominationvotes: state.nomination_votes.nominationvotes,
    };
  },
  (dispatch) => {
    return {
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
      hideLoadingOverlay: () => dispatch(hideLoadingOverlayAction()),
      fetchNominations: (data) => dispatch(fetchNominationsAction(data)),
      addNominationVote: (data) => dispatch(addNominationVoteAction(data)),
      fetchNominationVotes: (data) =>
        dispatch(fetchNominationVotesAction(data)),
    };
  }
)(withRouter(SupportCard));
