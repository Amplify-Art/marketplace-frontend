import * as types from '../../Constants/actions/Transaction';

export const fetchTransactionsAction = payload => ({
  type: types.FETCH_TRANSACTIONS_REQUEST,
  payload,
});

export const fetchTransactionAction = payload => ({
  type: types.FETCH_TRANSACTION_REQUEST,
  payload,
});
