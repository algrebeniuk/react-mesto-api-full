import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        buttonText="Сохранить"
        onSubmit={handleSubmit}
      > 
        <input className="form__input form__input_field_name" id="profile-name" placeholder="Введите Ваше имя" type="text" name="name" minLength="2" maxLength="40" required onChange={handleChangeName} value={name || ""} />
            <span className="form__input-error" id="profile-name-error"></span>
        <input className="form__input form__input_field_activity" id="profile-activity" placeholder="Ведите Вашу сферу деятельности" type="text" name="about" minLength="2" maxLength="200" required onChange={handleChangeDescription} value={description || " "} />
            <span className="form__input-error" id="profile-activity-error"></span>
      </PopupWithForm>

          
    )
}

export default EditProfilePopup;