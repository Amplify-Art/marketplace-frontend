import * as types from '../../Constants/actions/NominationVote';

export const fetchNominationVotesAction = payload => ({
  type: types.FETCH_NOMINATIONVOTES_REQUEST,
  payload,
});

export const fetchNominationVoteAction = payload => ({
  type: types.FETCH_NOMINATIONVOTE_REQUEST,
  payload,
});

export const addNominationVoteAction = payload => ({
  type: types.ADD_NOMINATIONVOTE_REQUEST,
  payload,
});

export const updateNominationVoteAction = payload => ({
  type: types.UPDATE_NOMINATIONVOTE_REQUEST,
  payload,
});


export const deleteNominationVoteAction = payload => ({
  type: types.DELETE_NOMINATIONVOTE_REQUEST,
  payload,
});
