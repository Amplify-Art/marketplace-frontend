import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import q from "querystring";
import "./Wallet.scss";
import Auth from "../../Containers/Auth";
import Button from "../../Components/Common/Button";
import TransactionList from "../../Components/Parts/TransactionList";
import { fetchTransactionsAction } from "../../redux/actions/TransactionAction";
import {
  showSendModalAction,
  hideSendModalAction,
  displayLoadingOverlayAction,
  hideLoadingOverlayAction,
} from "../../redux/actions/GlobalAction";
import { sendMoneyAction } from "../../redux/actions/NFTAction";
import GeneralModal from "../../Components/Common/GeneralModal/index";
import MoonPay from "./MoonPay";
import TransactionModal from "./Parts/TransactionModal";
import SendModal from "./Parts/SendModal";
import { getSignedKey } from "../../Api/Moonpay";
import jwt from "jsonwebtoken";

function Wallet(props) {
  const [near, setNear] = useState(null);
  const [amontToConvert, setAmontToConvert] = useState("");
  const [showMoonPay, setShowMoonPay] = useState(null);
  const [showTranactionModal, setShowTranactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [moonpayType, setMoonpayType] = useState(null);
  const [moonPaySignature, setMoonPaySignature] = useState(null);
  const [amontToConvertError, setAmontToConvertError] = useState(false);

  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  // check for any transactions
  useEffect(() => {
    let sendInfo = JSON.parse(localStorage.getItem("send_info"));
    if (props.history.location.search.includes("errorCode")) {
      let message = decodeURIComponent(
        q.parse(props.history.location.search).errorMessage
      );
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      localStorage.removeItem("send_info");
      props.history.push("/wallet");
    } else if (props.history.location.search.includes("transactionHashes")) {
      let txtId = decodeURIComponent(
        q.parse(props.history.location.search)["?transactionHashes"]
      );
      sendInfo.hash = txtId;
      props.sendMoney(sendInfo);
      localStorage.removeItem("send_info");
      props.history.push("/wallet");
    }
  }, []);

  const setShowSendModal = (bool) => {
    if (bool) {
      props.showSendModal();
    } else {
      props.hideSendModal();
    }
  };
  useEffect(() => {
    props.fetchTransactions({});
  }, []);
  const onAmountChange = (value) => {
    if (amontToConvertError) {
      setAmontToConvertError(false);
    }
    setAmontToConvert(value);
  };
  const getNearPrice = () => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD"
      )
      .then((res) => {
        setNear(res.data.USD);
      });
  };
  useEffect(() => {
    getNearPrice();
  }, []);

  const onWithDrawAmount = async (type) => {
    if (!amontToConvert) {
      setAmontToConvertError(true);
      return;
    }
    setMoonPaySignature(null);
    props.displayLoadingOverlay();
    setShowMoonPay(!showMoonPay);
    setMoonpayType(type);
    if (!showMoonPay) {
      const res = await getSignedKey({
        type: type === "withdraw" ? "sell" : "buy",
        amount: parseFloat(amontToConvert),
        near_account_id: user?.near_account_id,
        email: user?.email,
      });
      if (res.success) {
        setMoonPaySignature(res.data.url);
      }
      props.hideLoadingOverlay();
    } else {
      setMoonPaySignature(null);
    }
  };

  const onClickItem = (item) => {
    setSelectedTransaction(item);
    setShowTranactionModal(!showTranactionModal);
  };
  return (
    <div
      className={`containerOuter wallet-page left-nav-pad normal-right-pad mw-1200`}
    >
      <div className="white-box">
        <div className="left">
          <h4 className="balance">Total Balance </h4>
          {/* {user?.near_account_id && <h3>{user?.near_account_id}</h3>}*/}
          <div className="near-amount">
            <span>
              {props.user?.near_balance &&
                (props.user?.near_balance / 10 ** 24).toFixed(2)}
            </span>
            <span className="near-label">NEAR</span>
          </div>

          <div className="usd">
            {props.user?.near_balance &&
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format((props.user?.near_balance * near) / 10 ** 24)}
          </div>

          <div className="buttons">
            {user?.near_account_type && (
              <Button
                text="Send"
                className="btn black-outline"
                onClick={() => setShowSendModal(true)}
              />
            )}
            {/* <Button
              text="Withdraw"
              className="btn black-outline"
              onClick={() => onWithDrawAmount("withdraw")}
            /> */}
          </div>
        </div>

        <div className="right">
          <h4>Add funds to your balance</h4>
          <CurrencyInput
            placeholder="Enter Amount in USD"
            allowNegativeValue={false}
            prefix="$"
            decimalScale={2}
            decimalsLimit={2}
            onValueChange={onAmountChange}
            onKeyDown={(e) => e.key === "e" && e.preventDefault()}
            value={amontToConvert}
            maxLength={9}
          />
          {amontToConvertError && (
            <span className="conversion-to-near">
              Please enter valid USD amount.
            </span>
          )}
          {!amontToConvertError && (
            <span className={`conversion-to-near`}>
              {near && amontToConvert
                ? (amontToConvert / near).toFixed(3)
                : 0.0}{" "}
              Near
            </span>
          )}
          <Button
            text="Add Funds to Balance"
            className="btn solid-black"
            onClick={() => onWithDrawAmount("add_funds")}
          />
        </div>
      </div>

      <div className="transactionListWrapper">
        <div className="transactionList">
          <div className="heading">Recent Transactions</div>
          {props.total > 0 && (
            <Link
              className="viewFullLink"
              to={{ pathname: "/transaction-list" }}
            >
              View full list
            </Link>
          )}
        </div>
        <TransactionList
          transactionList={props.transactionList}
          near={near}
          onClickItem={onClickItem}
        />
      </div>
      {showMoonPay && moonPaySignature && (
        <GeneralModal
          headline={moonpayType === "withdraw" ? `Withdraw` : "Purchase"}
          contentClassName="moonpay centered "
          closeModal={() => setShowMoonPay(!showMoonPay)}
          bodyChildren={
            <MoonPay
              amontToConvert={amontToConvert}
              type={moonpayType === "withdraw" ? "sell" : "buy"}
              urlWithSignature={moonPaySignature}
            />
          }
        />
      )}
      {showTranactionModal && (
        <GeneralModal
          bodyChildren={
            <TransactionModal
              transaction={selectedTransaction || {}}
              onClose={() => setShowTranactionModal(!showTranactionModal)}
            />
          }
        />
      )}
      {props.displaySendModal && (
        <GeneralModal
          bodyChildren={
            <SendModal onClose={() => setShowSendModal(false)} near={near} />
          }
        />
      )}

      {/* <div className="transaction-modal">
        <GeneralModal
          headline="Transaction Details."
          bodyChildren={<TransactionModal />}
          isCloseButton={true}
        />
      </div> */}
    </div>
  );
}

export default connect(
  (state) => {
    return {
      transactionList: state.transactions.transactions,
      user: state.users.user,
      displaySendModal: state.global.showSendModal,
      total: state.transactions.total,
    };
  },
  (dispatch) => {
    return {
      fetchTransactions: (data) => dispatch(fetchTransactionsAction(data)),
      showSendModal: () => dispatch(showSendModalAction()),
      hideSendModal: (data) => dispatch(hideSendModalAction(data)),
      displayLoadingOverlay: (data) =>
        dispatch(displayLoadingOverlayAction(data)),
      hideLoadingOverlay: () => dispatch(hideLoadingOverlayAction()),
      sendMoney: (data) => dispatch(sendMoneyAction(data)),
    };
  }
)(Auth(withRouter(Wallet)));
