import React, { useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTransactionsAction } from '../../redux/actions/TransactionAction';

import TransactionList from '../../Components/Parts/TransactionList';
import Auth from '../../Containers/Auth';
import './TransactionDetails.scss';

function TransactionDetails(props) {
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
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      {
        Object.keys(data).length ? Object.entries(data).map(([month, lists]) =>
          <>
            <div className="monthText">{month.split('-')[1]}</div>
            <TransactionList
              transactionList={lists}
            />
          </>
        ) : null
      }
    </div >
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