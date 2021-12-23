import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { fetchFollowersAction } from '../../redux/actions/FollowerAction';

import './UserDashboard.scss';
import UserAvatar from '../../Components/Common/UserAvatar/index';

function UserDashboard(props) {
  const token = jwt.decode(localStorage.getItem('amplify_app_token'))
  useEffect(() => {
    props.fetchFollowers({
      params: {
        'filter[follower_id]': token.id,
        'related': 'artist'
      }
    })
  }, []);

  const renderHeader = (title) => (
    <div className="album-header">
      <span className="header-title">{title}</span>
    </div>
  );

  return (
    <div id="user-dashboard" className="left-nav-pad right-player-pad">
      <div className="container">

        {renderHeader("Followed Artists", false)}
        <div className="album-block">
          {props.myFollowings.map((following, index) => (
            <UserAvatar avatarImg={following.artist.avatar} onClick={() => props.history.push(`/artist/${following.artist.near_account_id}`)} name={following.artist.name} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default connect(state => {
  return {
    myFollowings: state.followers.followers,
  }
},
  dispatch => {
    return {
      fetchFollowers: (data) => dispatch(fetchFollowersAction(data)),
    }
  })(withRouter(UserDashboard));
