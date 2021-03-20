import React from 'react';

function LoggedInName(props) {
    var user = {}
    const doLogout = event => {
        event.preventDefault();
        alert('doLogout');
    };
    return (
        <div id="loggedInDiv">
            <span id="userName">
                Logged In As {props.name}
            </span><br />
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}>
                Log Out
            </button>
        </div>
    );
};

export default LoggedInName;