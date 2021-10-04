import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import './Wallet.scss';
import Auth from '../../Containers/Auth';
import Button from '../../Components/Common/Button';
import TransactionList from '../../Components/Parts/TransactionList';
import { fetchTransactionsAction } from '../../redux/actions/TransactionAction';
import { showSendModalAction, hideSendModalAction, displayLoadingOverlayAction } from '../../redux/actions/GlobalAction';
import GeneralModal from '../../Components/Common/GeneralModal/index';
import MoonPay from './MoonPay';
import TransactionModal from './Parts/TransactionModal';
import SendModal from './Parts/SendModal';
import { getSignedKey } from '../../Api/Moonpay'

function Wallet(props) {
  const [near, setNear] = useState(null);
  const [amontToConvert, setAmontToConvert] = useState('');
  const [showMoonPay, setShowMoonPay] = useState(null);
  const [showTranactionModal, setShowTranactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [moonpayType, setMoonpayType] = useState(null);
  const [moonPaySignature, setMoonPaySignature] = useState(null);

  const setShowSendModal = (bool) => {
    if (bool) {
      props.showSendModal()
    } else {
      props.hideSendModal()
    }
  }
  useEffect(() => {
    props.fetchTransactions({

    })
  }, [])
  const onAmountChange = (value) => {
    console.log(value, 'EE')
    setAmontToConvert(value)
  }
  const getNearPrice = () => {
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD').then(res => {
      setNear(res.data.USD);
    });
  }
  useEffect(() => {
    getNearPrice()
  }, [])

  const onWithDrawAmount = async (type) => {
    setShowMoonPay(!showMoonPay)
    setMoonpayType(type)
    if (!showMoonPay) {
      const res = await getSignedKey({});
      if (res.success) {
        setMoonPaySignature(res.data.signature)
      }
    } else {
      setMoonPaySignature(null)
    }
  }

  const onClickItem = (item) => {
    setSelectedTransaction(item)
    setShowTranactionModal(!showTranactionModal)
  }
  return (
    <div className={`container wallet-page left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <div className="white-box">
        <div className="left">
          <h4>Total Balance</h4>
          <div className="near-amount">
            <span>{props.user.near_balance && (props.user.near_balance / 10 ** 24).toFixed(2)}</span>
            <span className="near-label">NEAR</span>
          </div>

          <div className="usd">{props.user.near_balance && `$${(props.user.near_balance * near / (10 ** 24)).toFixed(3)}`}</div>

          <div className="buttons">
            <Button text="Send" className="btn black-outline" onClick={() => setShowSendModal(true)} />
            <Button text="Withdraw" className="btn black-outline" onClick={() => onWithDrawAmount('withdraw')} />
          </div>
        </div>

        <div className="right">
          <h4 >Add funds to your balance</h4>
          <CurrencyInput
            placeholder="Enter Amount in USD"
            allowNegativeValue={false}
            prefix="$"
            decimalScale={2}
            decimalsLimit={2}
            onValueChange={onAmountChange}
            onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
            value={amontToConvert}
          />
          <span className="conversion-to-near">{(near && amontToConvert) ? (amontToConvert / near).toFixed(3) : 0.00} Near</span>
          <Button text="Add Funds to Balance" className="btn solid-black" onClick={() => onWithDrawAmount('add_funds')} />
        </div>
      </div>

      <div className="transactionListWrapper">
        <div className="transactionList">
          <div className="heading">Recent Transactions</div>
          <Link className="viewFullLink" to={{ pathname: '/transaction-list' }}>
            View full list
          </Link>
        </div>
        <TransactionList
          transactionList={props.transactionList}
          near={near}
          onClickItem={onClickItem}
        />
      </div>
      {showMoonPay && <GeneralModal
        headline={moonpayType === 'withdraw' ? `Withdraw` : 'Purchase'}
        contentClassName="moonpay centered "
        closeModal={() => setShowMoonPay(!showMoonPay)}
        bodyChildren={<MoonPay
          amontToConvert={amontToConvert}
          type={moonpayType === 'withdraw' ? 'sell' : 'buy'}
          signature={moonPaySignature}
        />}
      />
      }
      {showTranactionModal &&
        <div className="transaction-modal">
          <GeneralModal
            headline={<><span>Transaction Details.</span><span className="close" onClick={() => setShowTranactionModal(!showTranactionModal)}> ⤫</span></>}
            contentClassName="transaction-modal"
            bodyChildren={<TransactionModal
              transaction={selectedTransaction || {}}
            />}
            closeModal={() => setShowTranactionModal(!showTranactionModal)}
          />
        </div>
      }
      {
        props.displaySendModal &&
        <GeneralModal
          bodyChildren={
            <SendModal
              onClose={() => setShowSendModal(false)}
              near={near}
            />
          }
        />
      }

      {/* <div className="transaction-modal">
        <GeneralModal
          headline="Transaction Details."
          bodyChildren={<TransactionModal />}
          isCloseButton={true}
        />
      </div> */}
    </div>
  )
}

export default connect(state => {
  return {
    transactionList: state.transactions.transactions,
    user: state.users.user,
    displaySendModal: state.global.showSendModal
  }
}, dispatch => {
  return {
    fetchTransactions: data => dispatch(fetchTransactionsAction(data)),
    showSendModal: () => dispatch(showSendModalAction()),
    hideSendModal: data => dispatch(hideSendModalAction(data)),
    displayLoadingOverlay: data => dispatch(displayLoadingOverlayAction(data))
  }
})(Auth(withRouter(Wallet)));
