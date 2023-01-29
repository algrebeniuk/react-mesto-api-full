import cross from '../images/cross.svg';
import React from 'react';
import successImg from '../images/successful-img.svg';
import failImg from '../images/fail-img.svg';

function InfoTooltip( {name, isOpen, onClose, status} ) {   
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}>
      <div className="popup__conteiner">
        <button className="popup__close" type="button" onClick={onClose}>
          <img className="popup__close-cross" src={cross} alt="" />
        </button>
        <img className="popup__register-image" src={status ? successImg : failImg} />
        <p className="popup__register-text">{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;