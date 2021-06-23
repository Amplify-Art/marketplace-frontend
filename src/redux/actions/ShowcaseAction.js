import * as types from '../../Constants/actions/Showcase';

export const fetchShowcasesAction = payload => ({
  type: types.FETCH_SHOWCASES_REQUEST,
  payload,
});

export const fetchShowcaseAction = payload => ({
  type: types.FETCH_SHOWCASE_REQUEST,
  payload,
});

export const addShowcaseAction = payload => ({
  type: types.ADD_SHOWCASE_REQUEST,
  payload,
});

export const updateShowcaseAction = payload => ({
  type: types.UPDATE_SHOWCASE_REQUEST,
  payload,
});


export const deleteShowcaseAction = payload => ({
  type: types.DELETE_SHOWCASE_REQUEST,
  payload,
});
