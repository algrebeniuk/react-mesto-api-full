import cross from '../images/cross.svg';

function ImagePopup({card, onClose}) {
    
    return(
      <div className={`popup popup_type_photo ${card.link && "popup_opened"}`}> 
        <div className="popup__conteiner-photo">
          <img className="popup__photo" src={card.link} alt={card.name}/>
          <button className="popup__close popup__close_type_photo" type="button" onClick={onClose}> 
            <img className="popup__close-cross" src={cross} alt="Закрыть" />
          </button>
          <h2 className="popup__title">{card.name}</h2>
        </div>
      </div>    
    )
}

export default ImagePopup;