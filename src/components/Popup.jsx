import React from 'react';
import './Popup.css';

const Popup = ({ message, onClose, language }) => {
  const buttonText = {
    'zh-CN': '确定',
    'zh-TW': '確定',
    'en': 'OK'
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <div className="popup-message">{message}</div>
        <button className="popup-button" onClick={onClose}>
          {buttonText[language]}
        </button>
      </div>
    </div>
  );
};

export default Popup; 