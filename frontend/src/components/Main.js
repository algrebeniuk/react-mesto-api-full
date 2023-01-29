import pen from '../images/pen.svg';
import plus from '../images/plus.svg';
import {useContext, useEffect, useState} from 'react';
import api from '../utils/Api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    return(
       <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
            <img className="profile__avatar-img" src={currentUser.avatar} alt="" /> 
          </div>
          <div className="profile__info">
            <div className="profile__info-conteiner">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                <img className="profile__edit-button-pen" src={pen} alt="" />
              </button>
            </div>  
            <p className="profile__activity">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}>
            <img className="profile__add-button-plus" src={plus} alt="" />
          </button>
        </section>

        <section className="elements">
          
          {cards.map((card) => (
            <Card 
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardClick={onCardClick}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            >
            </Card>
          ))}
          
        </section>

      </main>
    )
}

export default Main;