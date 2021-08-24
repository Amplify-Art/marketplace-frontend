import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wallet.scss';
import Auth from '../../Containers/Auth';
import Button from '../../Components/Common/Button';
import TransactionList from '../../Components/Parts/TransactionList';

const testTransaction = [ // TODO: need to remove
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
]

function Wallet(props) {
  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <div className="white-box">
        <div className="left">
          <h4>Total Balance</h4>
          <div className="near-amount">
            <span>222.53</span>
            <span className="near-label">NEAR</span>
          </div>

          <div className="usd">$968.91</div>

          <div className="buttons">
            <Button text="Send" className="btn black-outline" />
            <Button text="Withdraw" className="btn black-outline" />
          </div>
        </div>

        <div className="right">
          <h4>Add funds to your balance</h4>
          <input type="text" placeholder="Enter Amount in USD" />
          <span className="conversion-to-near">0.000 Near</span>
          <Button text="Add Funds to Balance" className="btn solid-black" />
        </div>
      </div>

      <div className="transactionListWrapper">
        <div className="transactionList">
          <div className="heading">Recent Transactions</div>
          <Link className="viewFullLink" to={{ pathname: '/' }}>
            View full list
          </Link>
        </div>
        <TransactionList
          transactionList={testTransaction}
        />
      </div>
    </div>
  )
}

export default Auth(Wallet);
