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
            
            var obj = {FirstName: firstName.value, LastName: lastName.value, Email: email.value, Password: password.value};  
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
                setMessage('Account was successfully created');          
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
                <Form.Group controlId="firstName" ref={(c) => firstName = c}>
                    <Form.Control type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group controlId="lastName" ref={(c) => lastName = c}>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group controlId="loginName" ref={(c) => email = c}>
                    <Form.Control type="text" placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="loginPassword" ref={(c) => password = c}>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="confirmPassword" ref={(c) => confirmPassword = c}>
                    <Form.Control type="password" placeholder="Please Re-Enter Password" />
                </Form.Group>
                <Button type="submit" controlId="loginButton" onClick={doRegister}>Register</Button>
                <span id="registerResult">{message}</span>
            </Form>
        </Card>
    );
};
    
export default Register;