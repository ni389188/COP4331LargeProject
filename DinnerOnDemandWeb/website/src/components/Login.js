import React from 'react';

function Login() {
    const doLogin = async event => {
        event.preventDefault();

        alert('doIt()');
    };

    return (
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">
                    LOGIN BELOW:
                </span><br />
                <input type="text" id="loginName" placeholder="Username:" /><br />
                <input type="password" id="loginPassword" placeholder="Password:" /><br />
                <input type="submit" id="loginButton" class="buttons" value="Login" onClick={doLogin} /><br />
            </form>
            <span id="loginResult"></span>
        </div>
    );
};

export default Login;