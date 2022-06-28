import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import useDebounce from "../../../Components/Common/UseDebounce";
import { fetchUsersAction } from "../../../redux/actions/UserAction";
import { sendNearAction } from "../../../redux/actions/GlobalAction";
import { displayLoadingOverlayAction } from "../../../redux/actions/GlobalAction";
import jwt from "jsonwebtoken";
import * as nearAPI from "near-api-js";

const {
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

const SendModal = ({
  onClose,
  user,
  near,
  fetchUsers,
  users,
  sendNear,
  displayLoadingOverlay,
  wallet,
}) => {
  const [activeView, setActiveView] = useState("view1");
  const [enteredNearAmt, setEnteredNearAmt] = useState(0);
  const [view1ErrorMessage, setView1ErrorMessage] = useState("");
  const [view2ErrorMessage, setView2ErrorMessage] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("walletAddress");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [networkFee, setNetworkFee] = useState(2);
  const [showDropDown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const currentUser = jwt.decode(localStorage.getItem("amplify_app_token"));

  const handleNearToDollar = (e) => {
    setEnteredNearAmt(e.target.value);
  };

  const onUseMax = () => {
    setEnteredNearAmt(
      (user.near_balance && (user.near_balance / 10 ** 24).toFixed(3)) || 0
    );
  };

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const onUserSearch = (e) => {
    const { value: nextValue } = e.target;
    if (selectedUser) {
      setSelectedUser(null);
    }
    setSearch(nextValue);
  };

  const getUsers = (s) => {
    fetchUsers({
      params: {
        search: s && s.replace("@", ""),
      },
    });
  };

  const onSelectUser = (user) => {
    setSelectedUser(user);
    setShowDropdown(false);
  };

  const onSelectType = (type) => {
    setSelectedAddress(type);
    if (type === "walletAddress" && selectedAddress) {
      setSearch("");
      setSelectedUser(null);
    }
  };

  const onSubmit = () => {
    let send_info = {
      near_price: parseNearAmount(enteredNearAmt),
      receiver_id:
        selectedAddress === "walletAddress" ? undefined : selectedUser.id,
      wallet: selectedAddress === "walletAddress" ? search : undefined,
      is_wallet: selectedAddress === "walletAddress",
    };
    localStorage.setItem("send_info", JSON.stringify(send_info));
    wallet.account().sendMoney(
      selectedAddress === "walletAddress"
        ? search
        : selectedUser.near_account_id, // receiver account
      parseNearAmount(enteredNearAmt) // amount in yoctoNEAR
    );
    displayLoadingOverlay();
    setView1ErrorMessage("");
    setView2ErrorMessage("");
  };

  const findError = (tab) => {
    switch (tab) {
      case "view2":
        if (parseFloat(enteredNearAmt) <= 0)
          setView1ErrorMessage("Please enter valid NEAR amount.");
        else if (
          parseFloat(enteredNearAmt) >
          parseFloat(
            (user.near_balance && (user.near_balance / 10 ** 24).toFixed(3)) ||
              0
          )
        )
          setView1ErrorMessage(
            "Entered amount is greater than available amount."
          );
        else setActiveView(tab);
        break;
      case "view3":
        if (selectedAddress === "walletAddress") {
          if (!search.trim())
            setView2ErrorMessage("Please enter wallet address.");
          else setActiveView(tab);
        } else {
          if (!selectedUser?.id)
            setView2ErrorMessage("Please select the user from dropdown.");
          else setActiveView(tab);
        }
        break;
      default:
        return true;
    }
  };

  const handleNext = (tab) => {
    findError(tab);
  };

  useEffect(() => {
    setView1ErrorMessage("");
    setView2ErrorMessage("");
  }, [search, enteredNearAmt, selectedUser, selectedAddress]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      (debouncedSearchTerm.length !== 0 || debouncedSearchTerm.trim() !== "") &&
      selectedAddress !== "walletAddress" &&
      debouncedSearchTerm !== "@"
    ) {
      getUsers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="send-modal-wrapper">
      <div className="send-modal-top">
        <div className="send-modal-heading">Send NEAR</div>
        <div className="send-modal-close-button" onClick={onClose}>
          ⤫
        </div>
      </div>
      {activeView === "view1" && (
        <>
          <div className="send-modal-middle">
            <div className="send-modal-subheading">Enter Amount</div>
            <div className="subheading-right-block" onClick={() => onUseMax()}>
              Use Max
            </div>
          </div>
          <div className="send-modal-near-input">
            <div>
              <input
                name="nearAmount"
                type="number"
                className="modal-textfield"
                placeholder="0 NEAR"
                value={enteredNearAmt}
                onChange={handleNearToDollar}
              />
            </div>
            <div className="near-dollar">
              ${(enteredNearAmt * near).toFixed(2)}
            </div>
          </div>
          <div className="errMsg">{view1ErrorMessage}</div>
          <div className="send-modal-detail">
            <div className="sm-detail-left">Available Balance</div>
            <div className="sm-detail-right">
              <div className="available-near">
                {user.near_balance && (user.near_balance / 10 ** 24).toFixed(3)}{" "}
                <span>NEAR</span>
              </div>
              <div className="available-dollar">{`$${
                user.near_balance &&
                ((user.near_balance * near) / 10 ** 24).toFixed(2)
              }`}</div>
            </div>
          </div>
          <div>
            <button
              className="nominate-button"
              onClick={() => handleNext("view2")}
            >
              Next
            </button>
          </div>
        </>
      )}

      {activeView === "view2" && (
        <>
          <div className="send-modal-radio-btn-wrapper">
            <div className="radio-btn">
              <label className="radio">
                <input
                  name="radio"
                  type="radio"
                  value="walletAddress"
                  checked={selectedAddress === "walletAddress"}
                  onClick={() => onSelectType("walletAddress")}
                />
                <span>Wallet Address</span>
              </label>
            </div>
            <div className="radio-btn">
              <label className="radio">
                <input
                  name="radio"
                  type="radio"
                  value="userName"
                  checked={selectedAddress === "userName"}
                  onClick={() => onSelectType("userName")}
                />
                <span>Username</span>
              </label>
            </div>
          </div>
          <div className="send-modal-vew2-input-wrapper" ref={wrapperRef}>
            <input
              type="text"
              name="address"
              className="send-modal-vew2-input"
              onChange={onUserSearch}
              value={
                selectedUser ? `@ ${selectedUser.near_account_id}` : search
              }
              placeholder={
                selectedAddress === "userName"
                  ? "@ Username"
                  : "Enter Recipient Address"
              }
              onClick={() => setShowDropdown(!showDropDown)}
            />
            <div className="errMsg">{view2ErrorMessage}</div>
            {users.length && selectedAddress === "userName" && showDropDown ? (
              <div className="send-modal-search-result">
                {users.map((u) => (
                  <div
                    className="send-modal-result-card"
                    onClick={() => onSelectUser(u)}
                  >
                    @{u.near_account_id}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="send-modal-view2-detail">
            Please make sure to send funds only to a NEAR wallet.
          </div>
          <div>
            <button
              className="nominate-button"
              onClick={() => handleNext("view3")}
            >
              Next
            </button>
          </div>
        </>
      )}

      {activeView === "view3" && (
        <>
          <div className="send-modal-view3-near">
            <div className="send-modal-view3-near-amount">
              {enteredNearAmt} <span>NEAR</span>
            </div>
            <div className="change" onClick={() => setActiveView("view1")}>
              Change
            </div>
          </div>
          <div className="send-modal-view3-dollar">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(enteredNearAmt * near)}
          </div>
          <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">To</div>
            <div className="send-modal-view3-detail">
              <div className="send-modal-view3-detail-left">
                {selectedUser ? selectedUser.near_account_id : search}
              </div>
              <div
                className="send-modal-view3-detail-right"
                onClick={() => setActiveView("view2")}
              >
                Change
              </div>
            </div>
          </div>
          {/* <div className="send-modal-view3-detail-wrapper">
            <div className="send-modal-view3-heading">Network Fee</div>
            <div className="send-modal-view3-detail">{networkFee} NEAR</div>
          </div> */}
          <div className="send-modal-view3-total-wrapper">
            <div className="send-modal-view3-heading">Total</div>
            <div className="send-modal-view3-detail">
              {parseFloat(enteredNearAmt)} NEAR
            </div>
          </div>
          <div>
            <button className="nominate-button" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default connect(
  (state) => {
    return {
      user: state.users.user,
      users: state.users.users,
      wallet: state.global.wallet,
    };
  },
  (dispatch) => {
    return {
      fetchUsers: (data) => dispatch(fetchUsersAction(data)),
      sendNear: (data) => dispatch(sendNearAction(data)),
      displayLoadingOverlay: () => dispatch(displayLoadingOverlayAction()),
    };
  }
)(SendModal);
