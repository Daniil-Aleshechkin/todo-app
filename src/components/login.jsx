import React from 'react';
import './login.css'

const Login = ({ onLogin }) => {
    return (<div className="login">
        <input id="login-email" type="email" />
        <input id="login-pwd" type="password" />
        <button onClick={onLogin} className="btn btn-primary">Login</button>
    </div>);
}

export default Login;