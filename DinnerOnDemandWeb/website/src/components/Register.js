import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

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
    const mg = mailgun({apiKey: "27353fd7ce350bedb70f14a2d14060c7-a09d6718-746f6e51", domain: DOMAIN});


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
        <CardDeck>
            <Card>
            <Card.Body>
                <div id="registerDiv">
                    <form onSubmit={doRegister}>
                        <Card.Title>
                            <span id="inner-title">Need to Register? Sign Up Below!</span><br />
                        </Card.Title>
                        <Card.Text>
                            <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
                            <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
                            <input type="text" id="loginName" placeholder="Email/Username" ref={(c) =>  email = c} /><br />
                            <input type="password" id="loginPassword" placeholder="Password" ref={(c) => password = c} /><br />
                            <input type="password" id="confirmPassword" placeholder="Plese Re-enter the Password" ref={(c) => confirmPassword = c} /><br />
                            <input type="submit" id="loginButton" class="buttons" value="Register" onClick={doRegister} /><br />
                        </Card.Text>
                    </form>
                    <span id="registerResult">{message}</span>
                </div>
            </Card.Body>
        </Card>
    </CardDeck>
    );
};
    
export default Register;