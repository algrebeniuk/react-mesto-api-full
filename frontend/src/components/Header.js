import { Link } from 'react-router-dom';
import headerLogo from '../images/Header-logo.svg';

function Header( {email, loggedIn, onLogout, registerPage, loginPage} ) {
    return(
      <header className="header">
        <img src={headerLogo} className="header__logo" alt="Логотип" />
        {loggedIn && 
          <div className="header__conteiner">
            <p className="header__email">{email}</p>
            <button className="header__button" onClick={onLogout}>Выйти</button>
          </div>
        }
        {registerPage &&
          <Link to="/sign-in" className="header__button header__button_type_register">
            Войти
          </Link>
        }
        {loginPage &&
          <Link to="/sign-un" className="header__button header__button_type_register">
            Регистрация
          </Link>
        }
      </header>
    )
}

export default Header;

