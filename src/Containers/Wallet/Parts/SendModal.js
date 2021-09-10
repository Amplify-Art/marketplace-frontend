import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import useDebounce from '../../../Components/Common/UseDebounce';
import { fetchUsersAction } from '../../../redux/actions/UserAction'


const SendModal = ({ onClose, user, near, fetchUsers, users }) => {
  const [activeView, setActiveView] = useState('view1');
  const [nearToDollar, setNearToDollar] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('walletAddress');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [networkFee, setNetworkFee] = useState(2)

  const handleNearToDollar = (e) => {
    setNearToDollar(e.target.value);
  };
  const onUseMax = () => {
    setNearToDollar(user.near_balance && (user.near_balance / (10 ** 24)).toFixed(3))
  }

  useEffect(() => {
    if ((debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== '') && selectedAddress !== 'walletAddress' && debouncedSearchTerm !== '@') {
      getUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const onUserSearch = (e) => {
    const { value: nextValue } = e.target;
    if (selectedUser) {
      setSelectedUser(null)
    }
    setSearch(nextValue);
  }
  const getUsers = (s) => {
    fetchUsers({
      params: {
        search: s && s.replace('@', '')
      }
    })
  };
  const onSelectUser = (user) => {
    setSelectedUser(user)
  }
  const onSelectType = (type) => {
    setSelectedAddress(type)
    if (type === 'walletAddress' && selectedAddress) {
      setSearch('')
      setSelectedUser(null)
    }
  }
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
            <div className="subheading-right-block" onClick={() => onUseMax()}>Use Max</div>
          </div>
          <div className="send-modal-near-input">
            <div>
              <input
                type="text"
                className="modal-textfield"
                placeholder='0 NEAR'
                value={nearToDollar}
                onChange={handleNearToDollar}
              />
            </div>
            <div className="near-dollar">${(nearToDollar * near).toFixed(2)}</div>
          </div>
          <div className="send-modal-detail">
            <div className="sm-detail-left">
              Available Balance
            </div>
            <div className="sm-detail-right">
              <div className="available-near">{user.near_balance && (user.near_balance / (10 ** 24)).toFixed(3)} <span>NEAR</span></div>
              <div className="available-dollar">{user.near_balance && (user.near_balance * near / (10 ** 24)).toFixed(2)}</div>
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
                <input name="radio" type="radio" checked={selectedAddress === 'walletAddress'} onClick={() => onSelectType('walletAddress')} />
                <span>Wallet Address</span>
              </label>
            </div>
            <div className="radio-btn">
              <label className="radio">
                <input name="radio" type="radio" checked={selectedAddress === 'userName'} onClick={() => onSelectType('userName')} />
                <span>Username</span>
              </label>
            </div>
          </div>
          <div className="send-modal-vew2-input-wrapper">
            <input
              type="text"
              className="send-modal-vew2-input"
              onChange={onUserSearch}
              value={selectedUser ? `@ ${selectedUser.username}` : search}
              placeholder={selectedAddress === 'userName' ? '@ Username' : 'Enter Recipient Address'}
            />
          </div>
          {
            users.length && selectedAddress === 'userName' ? <ul>
              {
                users.map(u => <li onClick={() => onSelectUser(u)}>{u.username}</li>)
              }
            </ul> :
              null
          }
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
            {nearToDollar} <span>NEAR</span>
          </div>
          <div className="send-modal-view3-dollar">${(nearToDollar * near).toFixed(2)}</div>
          <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">To</div>
            <div className="send-modal-view3-detail">{selectedUser ? selectedUser.near_account_id : search}.NEAR</div>
          </div>
          <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">Network Fee</div>
            <div className="send-modal-view3-detail">{networkFee} NEAR</div>
          </div>
          <div className="send-modal-view3-total-wrapper">
            <div className="send-modal-view3-heading">Total</div>
            <div className="send-modal-view3-detail">{parseFloat(networkFee) + parseFloat(nearToDollar)} NEAR</div>
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
    </div >
  );
};

export default connect(state => {
  return {
    user: state.users.user,
    users: state.users.users,
  }
}, dispatch => {
  return {
    fetchUsers: (data) => dispatch(fetchUsersAction(data)),
  }
})(SendModal);
