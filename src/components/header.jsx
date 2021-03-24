import React from 'react';
import LoginBtn from "./loginbtn"

const Header = ({ isLoggedIn, username, btnOperations }) => {
    function renderWelcome() {
        if (isLoggedIn) {
            return <h2>Welcome {username}</h2>
        } else {
            return <h2>Please log in to view todo-list</h2>
        }
    }
    return (<div className="header">
        <h1>Todo</h1>
        <div className="title">{renderWelcome()}</div>
        <LoginBtn btnOperations={btnOperations} isLoggedIn={isLoggedIn} />
    </div>
    );
}

export default Header;