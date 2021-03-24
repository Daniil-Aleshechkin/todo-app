import React from 'react';
import './login.css'

const Login = ({ onRegister }) => {
    return (<div className="login">
        <input id="register-email" type="email" />
        <input id="register-username" type="text" />
        <input id="register-pwd" type="password" />
        <input id="register-confirmPwd" type="password" />
        <button onClick={onRegister} className="btn btn-primary">Register</button>
    </div>);
}

export default Login;