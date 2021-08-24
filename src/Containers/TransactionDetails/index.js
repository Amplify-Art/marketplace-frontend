import React, { useState, useEffect } from 'react';

import TransactionList from '../../Components/Parts/TransactionList';
import Auth from '../../Containers/Auth';
import './TransactionDetails.scss';

const testTransaction = [ // TODO: need to remove
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '10/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '10/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '05/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '05/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '01/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '04/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '01/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '06/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '07/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '06/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '07/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '08/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '09/10/2020', nearAmount: '-$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '08/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '09/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '02/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
  {id: 'GDHsjdh734637g2357', date: '02/10/2020', nearAmount: '+$13.4545 NEAR', amount: '$2.12'},
]

function TransactionDetails(props) {

  const {
    janTransaction, febTransaction, marchTransaction, aprTransaction, mayTransaction, juneTransaction, julyTransaction, augTransaction, septTransaction, octTransaction, novTransaction, deceTransaction,
  } = testTransaction.reduce((target, item) => {
    if (new Date(item.date).getMonth() === 0) target.janTransaction.push(item);
    if (new Date(item.date).getMonth() === 1) target.febTransaction.push(item);
    if (new Date(item.date).getMonth() === 2) target.marchTransaction.push(item);
    if (new Date(item.date).getMonth() === 3) target.aprTransaction.push(item);
    if (new Date(item.date).getMonth() === 4) target.mayTransaction.push(item);
    if (new Date(item.date).getMonth() === 5) target.juneTransaction.push(item);
    if (new Date(item.date).getMonth() === 6) target.julyTransaction.push(item);
    if (new Date(item.date).getMonth() === 7) target.augTransaction.push(item);
    if (new Date(item.date).getMonth() === 8) target.septTransaction.push(item);
    if (new Date(item.date).getMonth() === 9) target.octTransaction.push(item);
    if (new Date(item.date).getMonth() === 10) target.novTransaction.push(item);
    if (new Date(item.date).getMonth() === 11) target.deceTransaction.push(item);
    return target;
  }, {
    janTransaction: [], febTransaction: [], marchTransaction: [], aprTransaction: [], mayTransaction: [], juneTransaction: [], julyTransaction: [], augTransaction: [], septTransaction: [], octTransaction: [], novTransaction: [], deceTransaction: [],
  });

  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      {
        janTransaction.length
        ?
        <>
          <div className="firstMonth">JANUARY</div>
          <TransactionList
            transactionList={janTransaction}
          />
        </>
        : null
      }

      {
        febTransaction.length
        ?
        <>
          <div className="monthText">FEBRUARY</div>
          <TransactionList
            transactionList={febTransaction}
          />
        </>
        : null
      }

      {
        marchTransaction.length
        ?
        <>
          <div className="monthText">MARCH</div>
          <TransactionList
            transactionList={marchTransaction}
          />
        </>
        : null
      }

      {
        aprTransaction.length
        ?
        <>
          <div className="monthText">APRIL</div>
          <TransactionList
            transactionList={aprTransaction}
          />
        </>
        : null
      }

      {
        mayTransaction.length
        ?
        <>
          <div className="monthText">MAY</div>
          <TransactionList
            transactionList={mayTransaction}
          />
        </>
        : null
      }

      {
        juneTransaction.length
        ?
        <>
          <div className="monthText">JUNE</div>
          <TransactionList
            transactionList={juneTransaction}
          />
        </>
        : null
      }

      {
        julyTransaction.length
        ?
        <>
          <div className="monthText">JULY</div>
          <TransactionList
            transactionList={julyTransaction}
          />
        </>
        : null
      }

      {
        augTransaction.length
        ?
        <>
          <div className="monthText">AUGUST</div>
          <TransactionList
            transactionList={augTransaction}
          />
        </>
        : null
      }

      {
        septTransaction.length
        ?
        <>
          <div className="monthText">SEPTEMBER</div>
          <TransactionList
            transactionList={septTransaction}
          />
        </>
        : null
      }

    {
        octTransaction.length
        ?
        <>
          <div className="monthText">OCTOBER</div>
          <TransactionList
            transactionList={octTransaction}
          />
        </>
        : null
      }

      {
        novTransaction.length
        ?
        <>
          <div className="monthText">NOVEMBER</div>
          <TransactionList
            transactionList={novTransaction}
          />
        </>
        : null
      }

      {
        deceTransaction.length
        ?
        <>
          <div className="monthText">DECEMBER</div>
          <TransactionList
            transactionList={deceTransaction}
          />
        </>
        : null
      }
    </div>
  );
}

export default Auth(TransactionDetails)