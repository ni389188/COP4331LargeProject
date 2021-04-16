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