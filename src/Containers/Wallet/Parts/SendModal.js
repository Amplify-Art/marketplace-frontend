import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SendModal = ({ onClose }) => {
  const [activeView, setActiveView] = useState('view1');
  const [nearToDollar, setNearToDollar] = useState(0);

  const handleNearToDollar = (e) => {
    
  };

  return (
    <div className="send-modal-wrapper">
      <div className="send-modal-top">
        <div className="send-modal-heading">Send NEAR</div>
        <div className="send-modal-close-button" onClick={onClose}>
          ⤫
        </div>
        {
          activeView === 'view1' &&
          <>
            <div className="send-modal-middle">
              <div className="send-modal-subheading">Enter Amount</div>
              <div className="subheading-right-block">Use Max</div>
            </div>
            <div className="send-modal-near-input">
              <input
                type="text"
                className="modal-textfield"
                placeholder='0 NEAR'
                onChange={handleNearToDollar}
              />
            </div>
          </>
        }

        {
          activeView === 'view2' &&
        }

        {
          activeView === 'view3' &&
        }
      </div>
    </div>
  );
};

export default SendModal;