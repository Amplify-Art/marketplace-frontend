import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SendModal = ({ onClose }) => {
  const [activeView, setActiveView] = useState('view1');
  const [nearToDollar, setNearToDollar] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('walletAddress');

  const handleNearToDollar = (e) => {
    
  };

  return (
    <div className="send-modal-wrapper">
      <div className="send-modal-top">
        <div className="send-modal-heading">Send NEAR</div>
        <div className="send-modal-close-button" onClick={onClose}>
          ⤫
        </div>
      </div>
      {
        activeView === 'view1' &&
        <>
          <div className="send-modal-middle">
            <div className="send-modal-subheading">Enter Amount</div>
            <div className="subheading-right-block">Use Max</div>
          </div>
          <div className="send-modal-near-input">
            <div>
              <input
                type="text"
                className="modal-textfield"
                placeholder='0 NEAR'
                onChange={handleNearToDollar}
              />
            </div>
            <div className="near-dollar">$0</div>
          </div>
          <div className="send-modal-detail">
            <div className="sm-detail-left">
              Available Balance
            </div>
            <div className="sm-detail-right">
              <div className="available-near">23.863 <span>NEAR</span></div>
              <div className="available-dollar">{`$${78.50927.toFixed(2)}`}</div>
            </div>
          </div>
          <div>
            <button
              className="nominate-button"
              onClick={() => setActiveView('view2')}
            >
              Next
            </button>
          </div>
        </>
      }

      {
        activeView === 'view2' &&
        <>
          <div className="send-modal-radio-btn-wrapper">
            <div className="radio-btn">
              <label className="radio">
                <input name="radio" type="radio" checked={selectedAddress === 'walletAddress'} onClick={() => setSelectedAddress('walletAddress')} />
                <span>Wallet Address</span>
              </label>
            </div>
            <div className="radio-btn">
              <label className="radio">
                <input name="radio" type="radio" checked={selectedAddress === 'userName'} onClick={() => setSelectedAddress('userName')} />
                <span>Username</span>
              </label>
            </div>
          </div>
          <div className="send-modal-vew2-input-wrapper">
            <input
              type="text"
              className="send-modal-vew2-input"
              placeholder={selectedAddress === 'userName' ? '@ Username' : 'Enter Recipient Address'}
            />
          </div>
          <div className="send-modal-view2-detail">
            Please make sure to send funds only to a NEAR wallet. 
          </div>
          <div>
            <button
              className="nominate-button"
              onClick={() => setActiveView('view3')}
            >
              Next
            </button>
          </div>
        </>
      }

      {
        activeView === 'view3' &&
        <>
          <div className="send-modal-view3-near">
            20.000 <span>NEAR</span>
          </div>
          <div className="send-modal-view3-dollar">{`$${73.321.toFixed(2)}`}</div>
          <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">To</div>
            <div className="send-modal-view3-detail">jonathon.NEAR</div>
          </div>
          <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">Network Fee</div>
            <div className="send-modal-view3-detail">2.25232 NEAR</div>
          </div>
          <div className="send-modal-view3-total-wrapper">
            <div className="send-modal-view3-heading">Total</div>
            <div className="send-modal-view3-detail">22.25232 NEAR</div>
          </div>
          <div>
            <button
              className="nominate-button"
            >
              Submit
            </button>
          </div>
        </>
      }
    </div>
  );
};

export default SendModal;