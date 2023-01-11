import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    props.fetchNominationVotes({
      params: {
        "filter[voter_id]": user.id,
        "filterRelated[nomination.is_in_queue.=]": true,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user && user.id]);

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

  const renderCards = () => {
    return supporterCards.map((card, index) => (
      <div className="card-img" key={index}>
        <img src={card.media} alt={card.title} />
      </div>
    ));
  };

  const renderVoteList = () =>
    (props.nominations || []).map((nomination, index) => (
      <div className="song-content d-h-between voter-list">
        <div>{nomination.votedFor && nomination.votedFor.near_account_id}</div>
        <div className="vote-actions">
          {<span>{(nomination.votes && nomination.votes.length) || 0}</span>}
          <img src={Vote} onClick={() => onVote(nomination)} alt="vote" />
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
            <img src={SupportCardCover} alt="support" />
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
