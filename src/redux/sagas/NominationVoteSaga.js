import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  addNominationVote,
  deleteNominationVote,
  getNominationVoteById,
  getNominationVotes,
  updateNominationVote,
} from "../../Api/NominationVote";
import * as types from "../../Constants/actions/NominationVote";
import { SET_NOTIFICATION } from "../../Constants/actions/Global";
import { ADD_NOMINATION_VOTE } from "../../Constants/actions/Nomination";

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(
    types.FETCH_NOMINATIONVOTES_REQUEST,
    fetchNominationVotesSaga
  );
  yield takeLatest(types.FETCH_NOMINATIONVOTE_REQUEST, fetchNominationVoteSaga);
  yield takeLatest(
    types.ADD_NOMINATIONVOTE_REQUEST,
    addNominationVoteSaga,
    context
  );
  yield takeLatest(
    types.UPDATE_NOMINATIONVOTE_REQUEST,
    updateNominationVoteSaga,
    context
  );
  yield takeLatest(
    types.DELETE_NOMINATIONVOTE_REQUEST,
    deleteNominationVoteSaga
  );
}

export function* fetchNominationVotesSaga({ payload }) {
  try {
    const res = yield call(getNominationVotes, payload);
    yield all([put({ type: types.FETCH_NOMINATIONVOTES_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_NOMINATIONVOTES_FAILED, error });
  }
}

export function* fetchNominationVoteSaga({ payload }) {
  try {
    const res = yield call(getNominationVoteById, payload);
    yield all([put({ type: types.FETCH_NOMINATIONVOTE_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_NOMINATIONVOTE_FAILED, error });
  }
}

export function* addNominationVoteSaga({ history }, { payload }) {
  try {
    const res = yield call(addNominationVote, payload);
    yield all([
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "Voted Successfully"
            : res.message || "Nomination Vote not added",
        },
      }),
    ]);
    if (res.success) {
      yield all([
        put({ type: types.ADD_NOMINATIONVOTE_SUCCESS, res }),
        put({
          type: ADD_NOMINATION_VOTE,
          res,
        }),
      ]);
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_NOMINATIONVOTE_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}

export function* updateNominationVoteSaga({ history }, { payload }) {
  try {
    const res = yield call(updateNominationVote, payload);
    yield all([
      put({ type: types.UPDATE_NOMINATIONVOTE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "NominationVote updated"
            : res.message || "NominationVote not updated",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_NOMINATIONVOTE_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}

export function* deleteNominationVoteSaga({ payload }) {
  try {
    const res = yield call(deleteNominationVote, payload);
    yield all([
      put({ type: types.DELETE_NOMINATIONVOTE_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "NominationVote deleted"
            : res.message || "NominationVote not deleted",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_NOMINATIONVOTE_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}
