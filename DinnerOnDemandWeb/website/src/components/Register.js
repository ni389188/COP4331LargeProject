import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register()
{    

    const app_name = 'cop4331din'
    function buildPath(route)
    {    
        if (process.env.NODE_ENV === 'production')     
        {        
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }    
        else    
        {                
            return 'http://localhost:5000/' + route;    
        }
    }

    var firstName;
    var lastName;
    var email;    
    var password;
    var confirmPassword;    
    const [message,setMessage] = useState('');  

    // Required for email verification
    const mailgun = require("mailgun-js");
    const DOMAIN = "sandboxef514b75a9714c9282339dd8b689bcb8.mailgun.org";
    const mg = mailgun({apiKey: "TODO", domain: DOMAIN});


    const doRegister = async event =>     
    {   
        // Stops the page from refreshing
        event.preventDefault(); 

        // If Passwords do not match try again
        if (password.value !== confirmPassword.value)
        {
            setMessage('passwords did not match');
        }
        
        // If passwords matched then continue
        else {
            
            var obj = {firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value};  
            var js = JSON.stringify(obj);
            
            try        
            {                
                const response = await fetch(buildPath('api/register'),                
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());        
            
            // TO-DO add error handling.
            if(res.errors)            
            {    
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
            else            
            {          
                // Setup email information to be sent to user
                const data = {
                    from: "Mailgun Sandbox <postmaster@sandboxef514b75a9714c9282339dd8b689bcb8.mailgun.org>",
                    to: email.value,
                    subject: "Email Verification",
                    text: "Please confirm your email to activate your account! https://cop4331din.herokuapp.com"
                };
                setMessage('Account was successfully created! Please Verify your Account. An email has been sent to ' + email.value);   
                // Send the email to the user
                mg.messages().send(data, function (error, body) {
                    console.log(body);
                });    
            } 
            
            //setMessage("the lenght is: " + JSON.stringify(res));
        }        
        catch(e)        
        {            
            alert(e.toString());            
            return;        
        }        
    }       
};

    return(     
        <Card>
            <Card.Title>
                Need to Register? Sign Up Below!
            </Card.Title>
            <Form onSubmit={doRegister}>
                <Form.Group controlId="firstName">
                    <Form.Control type="text" placeholder="First Name" ref={(c) => firstName = c}/>
                </Form.Group>
                <Form.Group controlId="lastName" >
                    <Form.Control type="text" placeholder="Last Name" ref={(c) => lastName = c}/>
                </Form.Group>
                <Form.Group controlId="loginName">
                    <Form.Control type="text" placeholder="Email" ref={(c) => email = c}/>
                </Form.Group>
                <Form.Group controlId="loginPassword">
                    <Form.Control type="password" placeholder="Password" ref={(c) => password = c}/>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Control type="password" placeholder="Please Re-Enter Password" ref={(c) => confirmPassword = c}/>
                </Form.Group>
                <Button type="submit" controlId="loginButton" onClick={doRegister}>Register</Button>
                <span id="registerResult">{message}</span>
            </Form>
        </Card>
    );
};
    
export default Register;
