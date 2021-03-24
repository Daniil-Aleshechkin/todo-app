import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import Todo from "./todo";
import Header from "./header";
import axios from "axios";
import "./todo-app.css";

class TodoApp extends Component {
  state = { token: null, loginPage: true, alerts: [] };
  onLogin = () => {
    var username = document.getElementById("login-email").value;
    var password = document.getElementById("login-pwd").value;
    axios
      .post("/api/account/login/", { username, password })
      .then((response) => {
        var token = response.data.token;
        axios
          .get("/api/account/get", {
            headers: { Authorization: `Token ${token}` },
          })
          .then((response) => {
            this.setState({ token, username: response.data.username });
          })
          .then((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e.response.data);
        var alerts = [];
        if (
          e.response.data.non_field_errors?.indexOf(
            "Unable to log in with provided credentials."
          ) !== -1 &&
          e.response.data.non_field_errors
        ) {
          alerts.push("Invalid credentials");
        }
        if (
          e.response.data.password?.indexOf("This field may not be blank.") !==
            -1 &&
          e.response.data.password
        ) {
          alerts.push("Password is required");
        }
        if (
          e.response.data.username?.indexOf("This field may not be blank.") !==
            -1 &&
          e.response.data.username
        ) {
          alerts.push("Email is required");
        }
        this.setState({ alerts });
      });
  };

  onRegister = () => {
    var email = document.getElementById("register-email").value;
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-pwd").value;
    var confirmPassword = document.getElementById("register-confirmPwd").value;
    console.log({ email, username, password, confirmPassword });

    axios
      .post("/api/account/register/", {
        email,
        username,
        password,
        confirmPassword,
      })
      .then((response) => {
        var token = response.data.token;
        axios
          .get("/api/account/get", {
            headers: { Authorization: `Token ${token}` },
          })
          .then((response) => {
            this.setState({ token, username: response.data.username });
          })
          .then((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
        var alerts = [];
        if (e.response.data.password === "Passwords must match") {
          alerts.push("Passwords must match");
        }
        if (
          e.response.data.username?.indexOf(
            "account with this username already exists."
          ) !== -1 &&
          e.response.data.username
        ) {
          alerts.push("Account with this username already exists.");
        }
        if (
          e.response.data.email?.indexOf(
            "account with this email already exists."
          ) !== -1 &&
          e.response.data.email
        ) {
          alerts.push("Account with this email already exists.");
        }
        if (
          e.response.data.email?.indexOf("Enter a valid email address.") !==
            -1 &&
          e.response.data.email
        ) {
          alerts.push("Enter a valid email address.");
        }
        if (
          e.response.data.email?.indexOf("This field may not be blank.") !==
            -1 &&
          e.response.data.email
        ) {
          alerts.push("You must have an email");
        }
        if (
          e.response.data.username?.indexOf("This field may not be blank.") !==
            -1 &&
          e.response.data.username
        ) {
          alerts.push("You must have a username");
        }

        this.setState({ alerts });
      });
  };
  btnOperations = {
    setRegister: () => {
      this.setState({ loginPage: false, alerts: [] });
    },
    setLogin: () => {
      this.setState({ loginPage: true, alerts: [] });
    },
    onLogout: () => {
      this.setState({ token: null });
    },
  };
  renderPage = () => {
    if (!this.state.token) {
      if (this.state.loginPage) {
        return (
          <Login
            key={"login" + this.state.alerts}
            alerts={this.state.alerts}
            onLogin={this.onLogin}
          />
        );
      } else {
        return (
          <Register
            key={"register" + this.state.alerts}
            alerts={this.state.alerts}
            onRegister={this.onRegister}
          />
        );
      }
    } else {
      return <Todo token={this.state.token} />;
    }
  };

  render() {
    return (
      <div className="container-md">
        <Header
          btnOperations={this.btnOperations}
          isLoggedIn={!(this.state.token === null)}
          username={this.state.username}
        />

        {this.renderPage()}
      </div>
    );
  }
}

export default TodoApp;
