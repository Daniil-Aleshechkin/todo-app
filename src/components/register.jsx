import React from "react";
import "./login.css";

const Register = ({ alerts, onRegister }) => {
  return (
    <div className="login-container">
      {alerts.map((alert) => {
        return <div className="alert alert-danger">{alert}</div>;
      })}

      <div className="card login">
        <div>
          <span className="float-left">Email: </span>
          <input className="float-right" id="register-email" type="email" />
        </div>
        <div>
          <span className="float-left">Username: </span>
          <input className="float-right" id="register-username" type="text" />
        </div>
        <div>
          <span className="float-left">Password: </span>
          <input className="float-right" id="register-pwd" type="password" />
        </div>
        <div>
          <span className="float-left">Confirm Password:</span>
          <input
            className="float-right"
            id="register-confirmPwd"
            type="password"
          />
        </div>

        <button onClick={onRegister} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
