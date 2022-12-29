import React from "react";
import moment from "moment";

import Image from "../../../Components/Common/Image";
import Greyface from "../../../assets/images/grey_face.gif";
import IconClose from "../../../assets/images/closeicon.svg";

const textEllipsis = (txt) => {
  if (txt.length > 13) {
    return txt.substr(0, 9) + "..." + txt.substr(txt.length - 4, txt.length);
  }
  return txt;
};

function TransactionModal({ transaction, onClose }) {
  return (
    <div className="transDetail-modal-wrapper">
      <div className="transDetail-top">
        <div className="transDetail-heading">Transaction Details</div>
        <div className="transDetail-close-button" onClick={onClose}>
        <Image src={IconClose}
        />
        </div>
      </div>
      <div className="transaction-modal-near-amount">
        {(transaction.price_in_yocto_near / 10 ** 24).toFixed("4")}{" "}
        <span>NEAR</span>
      </div>
      {/* REVISIT */}
      {/* <div className="transaction-modal-fee">Fee: 1 NEAR</div> */}

      <div className="transaction-modal-purchase-detail">
        <div className="purchase-headline">Purchased</div>
        <div className="purchase-date">
          {moment(transaction.created_at).format("MMM DD, YYYY")}
        </div>
      </div>
      <div className="transaction-modal-purchase-item-wrapper">
        <div className="cardWrapper">
          <div className="imageHolder">
            <Image
              className="image"
              src={`https://gateway.pinata.cloud/ipfs/${transaction.cover}`}
              alt=""
              fallbackImage={Greyface}
            />
          </div>
          <div className="content">
            <div className="content-heading">{transaction.title}</div>
            <div className="content-details"></div>
          </div>
          <div className="contentType">
            <div className="contentType-heading">
              {transaction.type === "song" ? "Song" : "Album"}
            </div>
            <div className="contentType-detail"></div>
          </div>
        </div>
      </div>

      <div className="transaction-modal-address-wrapper">
        <div className="transaction-modal-from">From</div>
        <div className="transaction-modal-heading">
          @{transaction.transferBy.near_account_id}
        </div>
      </div>
      <div className="transaction-modal-address-wrapper">
        <div className="transaction-modal-from">To</div>
        <div className="transaction-modal-heading">
          @{transaction.transferTo && transaction.transferTo.near_account_id}
        </div>
      </div>
    </div>
  );
}

export default TransactionModal;
