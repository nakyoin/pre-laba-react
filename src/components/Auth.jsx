import React, { useState } from "react";
import '../App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alb from "./Alb.jsx";



export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'admin' && password === 'admin') {
            setIsAuth(true);
            setError('');
        } else {
            setError('Неверный логин или пароль! (Анна Александровна, попробуйте "admin ; admin"!)');
        }
    }

    return (
        <div className="auth">
            {isAuth ? (
                <div>
                    <div className="authorizated">
                        <h1>Вы авторизованы</h1>
                        <button className="exit" onClick={() => setIsAuth(false)}>Выйти</button>
                    </div>
                    <Alb />
                    <button className="exit" onClick={() => setIsAuth(false)}>Выйти</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Авторизация</h1>
                    <div className="inputs">
                        <input type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        <input type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        <button type="submit">Войти</button>
                        {error && <p>{error}</p>}
                    </div>
                </form>
            )}
        </div>
    )
}

