import React from 'react';
import moment from 'moment';

const textEllipsis = (txt) => {
  if (txt.length > 13) {
    return txt.substr(0, 9) + '...' + txt.substr(txt.length - 4, txt.length);
  }
  return txt;
}

function TransactionModal({ transaction }) {
  return (
    <div className="wrapper">
      <p className="near-price">{(transaction.price_in_yocto_near / 10 ** 24).toFixed('4')} <span>NEAR</span></p>
      <p className="fee">Fee: 1 Near</p>
      <div className="purchase">
        <h3>Purchased</h3>
        <p>{moment(transaction.created_at).format('MMM DD, YYYY')}</p>
      </div>
      <div className="item">
        <div>
          <img src={`https://amplify-dev.mypinata.cloud/ipfs/${transaction.cover}`} />
        </div>
        <div className="content">
          <span className="t1">{transaction.title}</span>
          <span className="t2">{transaction.description}</span>
        </div>
        <div className="type">{transaction.type === 'song' ? 'Song' : 'Album'}</div>
      </div>
      <div className="user-info">
        <div>From</div>
        <div className="name">@{transaction.transferBy.username}</div>
        <div>{textEllipsis(transaction.transaction_hash)}</div>
      </div>
      <div className="user-info">
        <div>To</div>
        <div>@{transaction.transferTo.username}</div>
        <div>{textEllipsis(transaction.transaction_hash)}</div>
      </div>
    </div>
  )
}

export default TransactionModal
