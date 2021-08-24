import React, { useState, useEffect } from 'react';

import TransactionList from '../../Components/Parts/TransactionList';
import Auth from '../../Containers/Auth';

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

function TransactionDetails(props) {
  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <TransactionList
        transactionList={testTransaction}
      />
    </div>
  );
}

export default Auth(TransactionDetails)