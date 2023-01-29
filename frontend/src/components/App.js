import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { register, authorize, checkToken } from '../utils/Auth';

function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState({});
  const[currentUser, setCurrentUser] = useState({});
  const[cards, setCards] = useState([]);
  const[loggedIn, setLoggedIn] = useState(false);
  const[email, setEmail] = useState('');
  const[registerPage, setRegisterPage] = useState(false);
  const[loginPage, setLoginPage] = useState(false);
  const[isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const[status, setStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  }, []); 

  useEffect(() =>{
    if (loggedIn) {
      api.getUserInfo()
        .then((name, about, avatar) => {
          setCurrentUser(name, about, avatar)
        })
        .catch((err) => console.log(err))

      api.getInitialCards()
        .then((data) =>{
          setCards(data);
        }) 
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});  
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      link: link,
      name: name
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
       .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
       .catch((err) => console.log(err))
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
       .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
       })
       .catch((err) => console.log(err))
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
       .then((updatedInfo) => {
          setCurrentUser(updatedInfo);
          closeAllPopups();
       })
       .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
       .then((updatedAvatar) => {
          setCurrentUser(updatedAvatar);
          closeAllPopups();
       })
       .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
       .then((newCard) => {
          setCards([newCard, ...cards]); 
          closeAllPopups();
       })
       .catch((err) => console.log(err))
  }

  function handleRegister(password, email) {
    register(password, email)
       .then((res) =>{
          if(res) {
            setIsInfoTooltipOpen(true);
            history.push('/sign-in');
            setStatus(true);
          }
       })
       .catch(() => {
          setIsInfoTooltipOpen(true);
          setStatus(false);
       });
  }
  
  function handleLogin(password, email) {
    authorize({password, email})
    .then((res) =>{
      if(res.token) {
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
        localStorage.setItem('jwt', res.token);   
      }
    })
    .catch(() => {
      setIsInfoTooltipOpen(true);
      setStatus(false);
    })
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      checkToken(jwt)
      .then((res) => {
        if(res) {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        };
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" >
        
        <Header 
          loggedIn={loggedIn}
          email={email}
          onLogout={handleLogout}
          registerPage={registerPage}
          loginPage={loginPage}
        />
        <Switch>
          <ProtectedRoute exact path="/" 
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
              component={Main}
          />
          <Route path="/sign-up">
            <Register 
              onRegister={handleRegister}
              buttonHeader={setRegisterPage}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              onLogin={handleLogin}
              buttonHeader={setLoginPage}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> :  <Redirect to="/sign-up"/>}
          </Route>
        </Switch>
        <Footer 
          loggedIn={loggedIn}
        />
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        >
        </EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        >
        </AddPlacePopup>

        <PopupWithForm 
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
        >
        </PopupWithForm> 

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          link={selectedCard}
          isOpen={selectedCard}
        >
        </ImagePopup>
        
        <InfoTooltip
          name="register"
          isOpen={isInfoTooltipOpen}
          status={status}
          onClose={closeAllPopups}
        >
        </InfoTooltip>

      </div>  
    </CurrentUserContext.Provider>
  );
}

export default App;
