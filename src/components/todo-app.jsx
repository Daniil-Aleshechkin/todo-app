import React, { Component } from 'react';
import Login from './login'
import Register from './register'
import Todo from './todo'
import Header from './header'
import axios from 'axios';

class TodoApp extends Component {
    state = { token: null, loginPage: true }
    onLogin = () => {
        var username = document.getElementById("login-email").value
        var password = document.getElementById("login-pwd").value
        axios.post('http://127.0.0.1:8000/api/account/login/', { username, password }).then((response) => {
            var token = response.data.token
            axios.get('http://127.0.0.1:8000/api/account/get', { headers: { 'Authorization': `Token ${token}` } }).then((response) => {
                this.setState({ token, username: response.data.username })
            }).then((e) => {
                console.log(e)
            })
        }).then((e) => {
            console.log(e)
        })
    }

    onRegister = () => {
        var email = document.getElementById("register-email").value
        var username = document.getElementById("register-username").value
        var password = document.getElementById("register-pwd").value
        var confirmPassword = document.getElementById("register-confirmPwd").value
        console.log({ email, username, password, confirmPassword })

        axios.post('http://127.0.0.1:8000/api/account/register/', { email, username, password, confirmPassword }).then((response) => {
            var token = response.data.token
            console.log(token)
            axios.get('http://127.0.0.1:8000/api/account/get', { headers: { 'Authorization': `Token ${token}` } }).then((response) => {
                this.setState({ token, username: response.data.username })
            }).then((e) => {
                console.log(e)
            })
        }).then((e) => {
            console.log(e)
        })
    }
    btnOperations = {
        setRegister: () => {
            this.setState({ loginPage: false })
        },
        setLogin: () => {
            this.setState({ loginPage: true })
        },
        onLogout: () => {
            this.setState({ token: null })
        }
    }
    renderPage = () => {
        if (!this.state.token) {
            if (this.state.loginPage) {
                return <Login onLogin={this.onLogin} />
            } else {
                return <Register onRegister={this.onRegister} />
            }
        } else {
            return <Todo token={this.state.token} />
        }
    }

    render() {
        return (<div className="container-md">
            <Header btnOperations={this.btnOperations} isLoggedIn={!(this.state.token === null)} username={this.state.username} />

            {this.renderPage()}
        </div>);
    }
}

export default TodoApp;