import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const[cardName, setCardName] = useState("");
  const[cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSetCardName(evt) {
    setCardName(evt.target.value);
  }

  function handleSetCardLink(evt) {
    setCardLink(evt.target.value);
  } 

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
        name: cardName,
        link: cardLink,
    })
  }

  return (
    <PopupWithForm 
        name="add-card"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        buttonText="Сохранить"
        onSubmit={handleSubmit}
    >
        <input className="form__input form__input_field_place" id="card-name" placeholder="Название" type="text" name="name" minLength="2" maxLength="30" required onChange={handleSetCardName} value={cardName} />
            <span className="form__input-error" id="card-name-error"></span>
        <input className="form__input form__input_field_link" id="card-link" placeholder="Ссылка на картинку" type="url" name="link" required onChange={handleSetCardLink} value={cardLink} />
            <span className="form__input-error" id="card-link-error"></span>
    </PopupWithForm> 
  )
}

export default AddPlacePopup;