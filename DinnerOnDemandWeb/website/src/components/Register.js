import React, { useState } from 'react';

function Register() {

    return (
        <div id="registerDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">Need to Register? Sign Up Below!</span><br />
                <input type="text" id="firstName" placeholder="First Name" ref={(c) => loginName = c} />
                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => loginName = c} />
                <input type="text" id="loginName" placeholder="Email/Username" ref={(c) => loginName = c} />
                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
                <input type="submit" id="loginButton" class="buttons" value="Do It"
                    onClick={doLogin} />
            </form>
            <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;