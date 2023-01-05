import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTransactionsAction } from '../../redux/actions/TransactionAction';

import TransactionList from '../../Components/Parts/TransactionList';
import GeneralModal from '../../Components/Common/GeneralModal';
import TransactionModal from '../Wallet/Parts/TransactionModal';
import Auth from '../../Containers/Auth';
import './TransactionDetails.scss';

function TransactionDetails(props) {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const onClickItem = (item) => {
    setSelectedTransaction(item)
    setShowTransactionModal(!showTransactionModal)
  }

  useEffect(() => {
    props.fetchTransactions({
      params: {
        perPage: 100000
      }
    })
  }, [])
  const data = _.groupBy(props.transactionList, (transaction) => {
    return `${moment(transaction.created_at).year()}-${moment(transaction.created_at).format('MMMM')}`
  })
  return (
    <>
      <div className={`containerOuter wallet-page trans-detail left-nav-pad normal-right-pad mw-1200`}>
        {
          Object.keys(data).length ? Object.entries(data).map(([month, lists]) =>
            <>
              <div className="monthText">{month.split('-')[1]}</div>
              <TransactionList
                transactionList={lists}
                onClickItem={onClickItem}
              />
            </>
          ) : null
        }
      </div>
      {showTransactionModal &&
        <GeneralModal
          bodyChildren={
            <TransactionModal
              transaction={selectedTransaction || {}}
              onClose={() => setShowTransactionModal(!showTransactionModal)}
            />
          }
        />
      }
    </>
  );
}

export default connect(state => {
  return {
    transactionList: state.transactions.transactions,
    user: state.users.user
  }
}, dispatch => {
  return {
    fetchTransactions: data => dispatch(fetchTransactionsAction(data))
  }
})(Auth(withRouter(TransactionDetails)));
