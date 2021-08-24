import { useEffect, useState } from 'react';
import moment from 'moment';
import './TransactionList.scss';

function TransactionList(props) {

  const textEllipsis = (txt) => {
    if (txt.length > 13) {
      return txt.substr(0, 9) + '...' + txt.substr(txt.length - 4, txt.length);
    }
    return txt;
  }
  return (
    <div className="transactionWrapper">
      <table className="transTable">
        {
          props.transactionList.length
            ?
            props.transactionList.map(transaction => (
              <tr className="transRow">
                <td className="transId">{textEllipsis(transaction.transaction_hash || '')}</td>
                <td className="transDate">{moment(transaction.created_at).format('MMM DD, YYYY')}</td>
                <td className="transAmt">
                  <div className={String(transaction.price).includes('-') ? 'redTxt' : 'greenTxt'}>{String(transaction.price).includes('-') ? + props.near && (transaction.price / (100 * props.near)).toFixed(4) + ' NEAR' : '+' + props.near && (transaction.price / (100 * props.near)).toFixed(4) + ' NEAR'}</div>
                  <div className="smallTxt">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(transaction.price) / 100)}</div>
                </td>
              </tr>
            ))
            : null
        }
      </table>
    </div>
  )
}

export default TransactionList;
