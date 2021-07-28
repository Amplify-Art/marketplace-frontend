import * as types from '../../Constants/actions/Follower';

export const fetchFollowersAction = payload => ({
  type: types.FETCH_FOLLOWERS_REQUEST,
  payload,
});

export const fetchFollowerAction = payload => ({
  type: types.FETCH_FOLLOWER_REQUEST,
  payload,
});

export const addFollowerAction = payload => ({
  type: types.ADD_FOLLOWER_REQUEST,
  payload,
});

export const updateFollowerAction = payload => ({
  type: types.UPDATE_FOLLOWER_REQUEST,
  payload,
});


export const deleteFollowerAction = payload => ({
  type: types.DELETE_FOLLOWER_REQUEST,
  payload,
});
