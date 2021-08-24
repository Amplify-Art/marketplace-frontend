import moment from 'moment';
import './TransactionList.scss';

function TransactionList(props) {

  const textEllipsis = (txt) => {
    if (txt.length > 13) {
      return txt.substr(0, 9) + '...' + txt.substr(txt.length - 4, txt.length);
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
            <tr className="transRow">
              <td className="transId">{textEllipsis(transaction.id)}</td>
              <td className="transDate">{moment(transaction.date).format('MMM DD, YYYY')}</td>
              <td className="transAmt">
                <div className={transaction.nearAmount.includes('-') ? 'redTxt' : 'greenTxt'}>{transaction.nearAmount}</div>
                <div className="smallTxt">{transaction.amount}</div>
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
