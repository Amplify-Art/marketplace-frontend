import * as types from '../../Constants/actions/User';

export const fetchUsersAction = payload => ({
  type: types.FETCH_USERS_REQUEST,
  payload,
});

export const fetchUserAction = payload => ({
  type: types.FETCH_USER_REQUEST,
  payload,
});

export const addUserAction = payload => ({
  type: types.ADD_USER_REQUEST,
  payload,
});

export const updateUserAction = payload => ({
  type: types.UPDATE_USER_REQUEST,
  payload,
});


export const deleteUserAction = payload => ({
  type: types.DELETE_USER_REQUEST,
  payload,
});
