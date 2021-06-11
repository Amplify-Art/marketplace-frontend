import React, { useState, useEffect, useCallback } from 'react';
import './GeneralModal.scss';

function GeneralModal(props) {
  const { topIcon, headline, buttons, className, closeModal, bodyText } = props;
  return (
    <div id="general-modal" className={`modal ${className}`}>
      <div className="cover" onClick={closeModal} />
      <div className="holder">
        {topIcon && <img src={topIcon} />}
        {headline && <h5>{headline}</h5>}
        {bodyText && <p>{bodyText}</p>}
        {buttons && buttons.length > 0 ? buttons.map((button, index) => (
          <button key={index} className={`${button.type}`}>{button.text}</button>
        )) : null}
      </div>
    </div>
  );
}

export default GeneralModal;
