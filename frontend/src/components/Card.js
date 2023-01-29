import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    function handleClick() {
      onCardClick(card.link, card.name);
    }
    
    function handleLike() {
      onCardLike(card);
    }

    function handleDeleteClick() {
      onCardDelete(card);
    }

    return(
        <article className="element">
              {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
              <img src={card.link}  alt={card.name} className="element__photo" onClick={handleClick} />
              <div className="element__description">  
                <h2 className="element__title">{card.name}</h2>
                  <div className="element__like-conteiner">
                    <button className={`element__like ${isLiked && "element__like_active"}`} type="button" onClick={handleLike}></button>
                      <span className="element__like-count">{card.likes.length}</span>
                  </div>  
              </div>  
        </article>
    )
}

export default Card;