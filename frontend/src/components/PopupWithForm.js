import cross from '../images/cross.svg';

function PopupWithForm({name, isOpen, onClose, title, children, buttonText, onSubmit}) {
    return(
      <div className={`popup popup_type_${name}`+ (isOpen && " popup_opened")}> 
        <div className="popup__conteiner">
          <button className="popup__close" type="button" onClick={onClose}>
            <img className="popup__close-cross" src={cross} alt="" />
          </button>
          <form className="form" name="{name}" onSubmit={onSubmit}>
            <h2 className="form__title">{title}</h2>
            {children}
            <button className="form__save" type="submit">{buttonText}</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm;