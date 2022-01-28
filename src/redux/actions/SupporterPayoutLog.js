import * as types from '../../Constants/actions/SupporterPayoutLog';

export const fetchSupporterPayoutLogsAction = payload => ({
  type: types.FETCH_SUPPORTER_PAYOUT_LOGS_REQUEST,
  payload,
});

export const fetchSupporterPayoutLogAction = payload => ({
  type: types.FETCH_SUPPORTER_PAYOUT_LOG_REQUEST,
  payload,
});

export const addSupporterPayoutLogAction = payload => ({
  type: types.ADD_SUPPORTER_PAYOUT_LOG_REQUEST,
  payload,
});

export const updateSupporterPayoutLogAction = payload => ({
  type: types.UPDATE_SUPPORTER_PAYOUT_LOG_REQUEST,
  payload,
});

export const deleteSupporterPayoutLogAction = payload => ({
  type: types.DELETE_SUPPORTER_PAYOUT_LOG_REQUEST,
  payload,
});
