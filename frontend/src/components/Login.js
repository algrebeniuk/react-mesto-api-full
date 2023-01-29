import { useEffect } from "react";
import { useState } from "react";

function Login( { onLogin, buttonHeader } ) {

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
        onLogin(
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
            <h2 className="register__title">Вход</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" placeholder="Email" type="email" required name="email" onChange={handleChangeEmail} value={email || ''}></input>
                <input className="register__input" placeholder="Пароль" type="password" required name="password" onChange={handleChangePassword} value={password || ''}></input> 
                <button className="register__button" type="submit">Войти</button>
            </form>
          </div> 
        </>
    )
}
  
export default Login;