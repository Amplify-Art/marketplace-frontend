import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getNearPrice } from '../../Api/Near';
import * as types from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
	yield takeLatest(types.CURRENT_NEAR_PRICE_REQUEST, fetchNEarPriceSaga);
}

export function* fetchNEarPriceSaga() {
	const res = yield call(getNearPrice);
	yield all([
		put({ type: types.CURRENT_NEAR_PRICE_SUCCESS, res }),
	]);
}

