import React, { useRef, useEffect, useState } from "react";

import "./NominateModal.scss";
import CloseIcon from "../../../assets/images/close.svg";

const NominateModal = ({
  daysLeft,
  suggestion,
  inputValue,
  onClose,
  onChange,
  onClick,
  search,
  selected,
  currentUser,
  onSelect,
  nominations,
  nominationloading,
}) => {
  const [showDropDown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="nominate-modal-wrapper">
      <div className="nominate-top">
        <div className="nominate-heading">Nominate Artist</div>
        <div className="nominate-close-button" onClick={onClose}>
          ⤫
        </div>
      </div>
      <div className="nominate-subheading">{`${daysLeft} days left until the next nomination cycle`}</div>

      {!nominationloading ? (
        nominations.length ? (
          <span>
            You have already made your nomination for this month on:{" "}
            <b>{nominations[0]?.nominatedBy?.near_account_id}</b>
          </span>
        ) : (
          <>
            <div className="nominate-content">
              Nominate yourself for this month’s voting period. Enter early in
              the month for more exposure.
            </div>
            <div className="nominate-content-info">
              1 Submission per month per user
            </div>
            <div className="nominate-actions">
              <div className="nominate-input-wrapper" ref={wrapperRef}>
                <input
                  type="text"
                  className="nominate-input"
                  placeholder="@ Nominate New Artists"
                  onChange={onChange}
                  value={inputValue}
                  onClick={() => setShowDropdown(!showDropDown)}
                />
                {search.trim() !== "" && !selected && showDropDown ? (
                  <div className="nominate-search-result">
                    {suggestion
                      .filter((f) => f.id !== currentUser.id)
                      .map((u, idx) => (
                        <div
                          key={idx}
                          className="nominate-result-card"
                          onClick={() => onSelect(u)}
                        >
                          @{u.near_account_id}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
              <div className="">
                <button className="nominate-button" onClick={onClick}>
                  Submit Artist
                </button>
              </div>
            </div>
          </>
        )
      ) : null}
    </div>
  );
};

export default NominateModal;
