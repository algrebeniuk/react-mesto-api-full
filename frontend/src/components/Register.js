import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register( { onRegister, buttonHeader } ) {

    useEffect(() => {
        buttonHeader(true);
        return () => {
            buttonHeader(false);
        }
    }, []);

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(
            password,
            email
        )
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    return(
        <>
          <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit} >
                <input className="register__input" placeholder="Email" type="email" required name="email" onChange={handleChangeEmail} value={email || ''}></input>
                <input className="register__input" placeholder="Пароль" type="password" required name="password" onChange={handleChangePassword} value={password || ''}></input> 
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          </div> 
        </>
    )
}
  
export default Register;