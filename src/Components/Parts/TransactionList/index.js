import { useEffect, useState } from 'react';
import moment from 'moment';
import './TransactionList.scss';

function TransactionList(props) {
  const textEllipsis = (txt) => {
    if (txt.length > 13) {
      return txt.substr(0, 7) + '...' + txt.substr(txt.length - 4, txt.length);
    }
    return txt;
  };

  return (
    <div className="transactionWrapper">
      <table className="transTable">
        {
          props.transactionList.length
            ?
            props.transactionList.map(transaction => (
              <tr className="transRow" onClick={() => props.onClickItem(transaction)}>
                <td className="transIdMobile">
                  <div className="transIdHolder">
                    {textEllipsis(transaction.transaction_hash || '')}
                  </div>
                  <div className="transDateHolder">
                    {moment(transaction.created_at).format('MMM DD, YYYY')}
                  </div>
                </td>
                <td className="transId">{textEllipsis(transaction.transaction_hash || '')}</td>
                <td className="transDate">{moment(transaction.created_at).format('MMM DD, YYYY')}</td>
                <td className="transAmt">
                  <div className={String(transaction.price).includes('-') ? 'redTxt' : 'greenTxt'}>{String(transaction.price).includes('-') ? (transaction.price_in_yocto_near / 10 ** 24).toFixed(4) + ' NEAR' : '+' + (transaction.price_in_yocto_near / 10 ** 24).toFixed(4) + ' NEAR'}</div>
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
