import * as types from '../../Constants/actions/Nomination';

export const fetchNominationsAction = payload => ({
  type: types.FETCH_NOMINATIONS_REQUEST,
  payload,
});

export const fetchNominationAction = payload => ({
  type: types.FETCH_NOMINATION_REQUEST,
  payload,
});

export const addNominationAction = payload => ({
  type: types.ADD_NOMINATION_REQUEST,
  payload,
});

export const updateNominationAction = payload => ({
  type: types.UPDATE_NOMINATION_REQUEST,
  payload,
});


export const deleteNominationAction = payload => ({
  type: types.DELETE_NOMINATION_REQUEST,
  payload,
});

export const toggleNominateCongratsModal = payload => ({
  type: types.TOGGLE_NOMINATE_CONGRATS_MODAL,
  payload,
});

export const toggleNominate = payload => ({
  type: types.TOGGLE_NOMINATE,
  payload,
});
