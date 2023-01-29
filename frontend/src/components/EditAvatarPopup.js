import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value="";
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
    } 

    return (
        <PopupWithForm 
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input className="form__input form__input_field_avatar" id="avatar-link" placeholder="Ссылка на картинку" type="url" name="avatar" required ref={avatarRef} />
                <span className="form__input-error" id="avatar-link-error"></span>
        </PopupWithForm> 
    )
}

export default EditAvatarPopup;