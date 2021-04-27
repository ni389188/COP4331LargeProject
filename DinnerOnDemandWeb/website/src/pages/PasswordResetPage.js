import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavBar from '../components/NavBar' 

function ResetPassword() {

    const app_name = 'cop4331din'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    }

    var loginName;
    const [message, setMessage] = useState('');

    const doResetPassword = async event => {
        event.preventDefault();

        var obj = { Email: loginName.value};
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/reset'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            setMessage(`A password reset link was sent to ${loginName.value}, if an account exists.`);
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <div class="bg-secondary" style={{ height: "100vh" }}>
        <NavBar />
        <div className="container justify-content-center  ">
           <div class="card text-white text-center bg-dark pb-5  pt-5 pl-5 pr-5 mt-5" >
           <div class="card-header ">
           <h4>Looks like you forgot your password.</h4>
             </div>
            <Form onSubmit={doResetPassword}>
                <Form.Group controlId="loginName">
                    <Form.Control type="email" placeholder="Enter Email" ref={(c) => loginName = c} />
                </Form.Group>
                <Button variant="light" type="submit" controlId="resetPassword" onClick={doResetPassword}>Reset Password</Button>
                
                <span id="passwordResetResult">{message}</span>
                <br />
            </Form>
            </div>
            </div>
        </div>
    );
};

export default ResetPassword;