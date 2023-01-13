import { put, call, takeLatest, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  addNFT,
  deleteNFT,
  getNFTById,
  getNFTs,
  updateNFT,
  mintNFT,
  buyAlbumBundleNFT,
  sellSongNFT,
  buySongNFT,
} from "../../Api/NFT";
import { sendMoney } from "../../Api/User";
import * as types from "../../Constants/actions/NFT";
import {
  SET_NOTIFICATION,
  SHOW_MINT_SUCCESS_MODAL,
  UNSET_OVERLAY_LOADER,
  SET_OVERLAY_LOADER,
} from "../../Constants/actions/Global";
import { UPDATE_ALBUM_SUCCESS } from "../../Constants/actions/Album";
/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_NFTS_REQUEST, fetchNFTsSaga);
  yield takeLatest(types.FETCH_NFT_REQUEST, fetchNFTSaga);
  yield takeLatest(types.ADD_NFT_REQUEST, addNFTSaga, context);
  yield takeLatest(types.UPDATE_SEND_MONEY_REQUEST, sendMoneySaga, context);
  yield takeLatest(types.MINT_NFT_REQUEST, mintNFTSaga, context);
  yield takeLatest(
    types.BUY_ALBUM_BUNDLE_NFT_REQUEST,
    buyAlbumBundleNFTSaga,
    context
  );
  yield takeLatest(types.SELL_SONG_NFT_REQUEST, sellSongNFTSaga, context);
  yield takeLatest(types.BUY_SONG_NFT_REQUEST, buySongNFTSaga, context);
  yield takeLatest(types.UPDATE_NFT_REQUEST, updateNFTSaga, context);
  yield takeLatest(types.DELETE_NFT_REQUEST, deleteNFTSaga);
}

export function* fetchNFTsSaga({ payload }) {
  try {
    const res = yield call(getNFTs, payload);
    yield all([put({ type: types.FETCH_NFTS_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_NFTS_FAILED, error });
  }
}

export function* fetchNFTSaga({ payload }) {
  try {
    const res = yield call(getNFTById, payload);
    yield all([put({ type: types.FETCH_NFT_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_NFT_FAILED, error });
  }
}

export function* addNFTSaga({ history }, { payload }) {
  try {
    const res = yield call(addNFT, payload);
    yield all([
      put({ type: types.ADD_NFT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? "NFT added" : res.message || "NFT not added",
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push("/nfts");
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_NFT_FAILED, error }),
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

export function* sendMoneySaga({ history }, { payload }) {
  try {
    const res = yield call(sendMoney, payload);
    yield all([
      put({ type: types.UPDATE_SEND_MONEY_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "NEAR sent successfully"
            : res.message || "Payment not added",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_SEND_MONEY_FAILED, error }),
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

export function* buyAlbumBundleNFTSaga({ history }, { payload }) {
  yield all([
    put({
      type: SET_OVERLAY_LOADER,
    }),
  ]);
  try {
    const res = yield call(buyAlbumBundleNFT, payload);
    let album = res.data;
    yield all([
      put({ type: UPDATE_ALBUM_SUCCESS, res }),
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: true,
          message: `You have successfully purchased ${album.title} Album - Mint Set #${
            parseInt(album.qty) - album.available_qty + 1
          }!`,
        },
      }),
    ]);
    // window.location.reload();
  } catch (error) {
    yield all([
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
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

export function* sellSongNFTSaga({ history }, { payload }) {
  yield all([
    put({
      type: SET_OVERLAY_LOADER,
    }),
  ]);
  try {
    const res = yield call(sellSongNFT, payload);
    yield all([
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: true,
          message: `You have successfully listed the song ${res.data.title} for sale!`,
        },
      }),
    ]);
    // window.location.reload();
  } catch (error) {
    yield all([
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
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

export function* buySongNFTSaga({ history }, { payload }) {
  yield all([
    put({
      type: SET_OVERLAY_LOADER,
    }),
  ]);
  try {
    const res = yield call(buySongNFT, payload);
    if (res.success) {
      toast.error(`You have successfully purchased the song ${res.data.title}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
    yield all([
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
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

export function* mintNFTSaga({ history }, { payload }) {
  yield all([
    put({
      type: SET_OVERLAY_LOADER,
    }),
  ]);
  try {
    const res = yield call(mintNFT, payload);
    yield all([
      put({ type: types.MINT_NFT_SUCCESS, res }),
      put({
        type: SHOW_MINT_SUCCESS_MODAL,
      }),
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.MINT_NFT_FAILED, error }),
      put({
        type: UNSET_OVERLAY_LOADER,
      }),
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

export function* updateNFTSaga({ history }, { payload }) {
  try {
    const res = yield call(updateNFT, payload);
    yield all([
      put({ type: types.UPDATE_NFT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "NFT updated"
            : res.message || "NFT not updated",
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push("/nfts");
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_NFT_FAILED, error }),
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

export function* deleteNFTSaga({ payload }) {
  try {
    const res = yield call(deleteNFT, payload);
    yield all([
      put({ type: types.DELETE_NFT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "NFT deleted"
            : res.message || "NFT not deleted",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_NFT_FAILED, error }),
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
