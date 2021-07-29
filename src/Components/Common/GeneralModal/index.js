import React, { useState, useEffect, useCallback } from 'react';
import CloseIcon from '../../../assets/images/close.svg';
import './GeneralModal.scss';

function GeneralModal(props) {
  const { topIcon, headline, buttons, className, closeModal, bodyText, bodyChildren, contentClassName, isCloseButton } = props;
  return (
    <div id="general-modal" className={`modal ${className}`}>
      <div className="cover" onClick={closeModal} />
      <div className={`holder ${contentClassName}`}>
        {topIcon && <img src={topIcon} />}
        {headline && <h5>{headline}</h5>}
        {bodyText && <p>{bodyText}</p>}
        {bodyChildren && bodyChildren}
        {buttons && buttons.length > 0 ? buttons.map((button, index) => (
          <button key={index} className={`${button.type} ${button.className && button.className}`} onClick={button.onClick}>{button.text}</button>
        )) : null}
      </div>
      {isCloseButton &&
        <img src={CloseIcon} className="btn-close" onClick={closeModal} />
      }
    </div>
  );
}

export default GeneralModal;
