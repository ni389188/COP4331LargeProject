import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {

    const app_name = 'cop4331din'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5000/' + route;
        }
    }

    var firstName;
    var lastName;
    var email;
    var password;
    var confirmPassword;
    const [message, setMessage] = useState('');

    const doRegister = async event => {
        // Stops the page from refreshing
        event.preventDefault();

        // If Passwords do not match try again
        if (password.value !== confirmPassword.value) {
            setMessage('passwords did not match');
        }

        // If passwords matched then continue
        else {

            var obj = { FirstName: firstName.value, LastName: lastName.value, Email: email.value, Password: password.value };
            var js = JSON.stringify(obj);

            try {
                const response = await fetch(buildPath('api/register'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                var res = JSON.parse(await response.text());

                // TO-DO add error handling.
                if (res.errors) {
                    // Validator found this email already exists.
                    if (res.errors.Email.name === 'ValidatorError') {
                        setMessage('This email already exists');
                    }
                    // Something else happened               
                    else {
                        setMessage('Could not create the account');
                    }
                }
                // The account was created.           
                else {
                    setMessage('Account was successfully created! Please Verify your Account. An email has been sent to ' + email.value);
                }

                //setMessage("the lenght is: " + JSON.stringify(res));
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        }
    };

    return (
        <div className="container justify-content-center ">
            <div class="card text-white text-center bg-dark pl-5 pr-5 mt-5" >
                 <div class="card-header ">
                    <h4>Need to Register? Sign Up Below!</h4>
                </div>
                <Form onSubmit={doRegister}>
                    <Form.Group controlId="firstName">
                        <Form.Control type="text" placeholder="First Name" ref={(c) => firstName = c} />
                    </Form.Group>
                    <Form.Group controlId="lastName" >
                        <Form.Control type="text" placeholder="Last Name" ref={(c) => lastName = c} />
                    </Form.Group>
                    <Form.Group controlId="loginName">
                        <Form.Control type="text" placeholder="Email" ref={(c) => email = c} />
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Control type="password" placeholder="Password" ref={(c) => password = c} />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Control type="password" placeholder="Please Re-Enter Password" ref={(c) => confirmPassword = c} />
                    </Form.Group>
                    <span id="registerResult">{message}</span>
                    <Button variant="light" type="submit" controlId="login==Button" onClick={doRegister}>Register</Button>
                    <br />
                    <a className="text-white " href="../pages/LoginPage">Already Registered? Click Here</a> <br />
                </Form>
            </div>
        </div>
    );
};

export default Register;
