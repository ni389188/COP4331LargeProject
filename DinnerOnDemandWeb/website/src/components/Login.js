import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {

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
    var loginPassword;
    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();

        var obj = { Email: loginName.value, Password: loginPassword.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/login'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            // TO-DO add error handling.
            if (res.loggedIn === false) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { firstName: res.FirstName, lastName: res.LastName, id: res.ID }
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/pages/HomePageExtras/Home';
            }


        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (

        <div className="container justify-content-center  ">
            <div class="card text-white  text-center bg-dark mt-5" >
                <div class="card-header ">
                    <h4>Welcome Back. Log In Below!</h4>
                </div>
                <Form onSubmit={doLogin}>
                    <Form.Group controlId="loginName">
                        <Form.Control type="email" placeholder="Enter Email" ref={(c) => loginName = c} />
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Control type="password" placeholder="Enter Password" ref={(c) => loginPassword = c} />
                    </Form.Group>
                    <Button variant="light" type="submit" controlId="loginButton" onClick={doLogin}>Log In</Button>
                    <span id="loginResult">{message}</span>
                    <br />
                    <a className="text-white " href="../pages/RegisterPage" >Need to Register? Click Here</a> <br />
                    <a className="text-white" href="../pages/PasswordResetPage">Forgot Your Password? Click Here</a>
                </Form>
            </div>
        </div>

    );
};

export default Login;
