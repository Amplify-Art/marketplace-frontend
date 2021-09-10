import { put, call, takeLatest, all } from 'redux-saga/effects';
import { sendNear } from '../../Api/Near';
import { SET_NOTIFICATION, SEND_NEAR_SUCCESS, SEND_NEAR_FAILURE, SEND_NEAR_REQUEST, HIDE_SEND_MODAL, UNSET_OVERLAY_LOADER } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(SEND_NEAR_REQUEST, sendNearSaga, context);;
}
export function* sendNearSaga({ history }, { payload }) {
  try {
    const res = yield call(sendNear, payload);
    if (res.success) {
      yield all([
        put({ type: SEND_NEAR_SUCCESS, res }),
        put({ type: HIDE_SEND_MODAL }),
        put({ type: UNSET_OVERLAY_LOADER }),
        put({
          type: SET_NOTIFICATION,
          payload: {
            success: res.success,
            message: res.success ? 'NEAR sent successfully' : res.message || 'Something went wrong',
          },
        }),
      ]);
      window.location.reload()
    } else {
      throw {
        message: res.message,
        success: false
      }
    }
  } catch (error) {
    console.log(error)
    yield all([
      put({ type: SEND_NEAR_FAILURE, error }),
      put({ type: UNSET_OVERLAY_LOADER }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
}