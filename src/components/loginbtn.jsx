import React from 'react';

const LoginBtn = ({ isLoggedIn, btnOperations }) => {
    if (isLoggedIn) {
        return (<div>
            <button onClick={btnOperations.onLogout} className="btn btn-primary m-2">
                Logout
        </button>
        </div>);
    }
    else {
        return (<div>
            <button onClick={btnOperations.setLogin} className="btn btn-primary m-2">
                Login
        </button>
            <button onClick={btnOperations.setRegister} className="btn btn-primary m-2">
                Sign up
        </button>
        </div>)
    }
}

export default LoginBtn;