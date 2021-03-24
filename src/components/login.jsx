import React from "react";
import "./login.css";

const Login = ({ alerts, onLogin }) => {
  return (
    <div className="login-container">
      {alerts.map((alert) => {
        return <div className="alert alert-danger">{alert}</div>;
      })}

      <div className="card login">
        <div>
          <span className="float-left">Email:</span>
          <input className="float-right" id="login-email" type="email" />
        </div>
        <div>
          <span className="float-left">Password:</span>
          <input className="float-right" id="login-pwd" type="password" />
        </div>

        <button onClick={onLogin} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
