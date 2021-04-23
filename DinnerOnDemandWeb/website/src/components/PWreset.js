import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import jwt_decode from 'jwt-decode';

function Reset({tok})
{    
    var ud = jwt_decode(tok);
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

    var password;    
    var cPassword;    
    const [state, setState] = useState(0);
    const [message,setMessage] = useState('');  

    const doReset = async event =>     
    {        
        event.preventDefault();
        if(password.value != cPassword.value)
        {
            setMessage("Passwords do not match");
            return;
        };
        if(isValid() != '')
        {
            setMessage('');
            alert(isValid());
            return;
        }
        var obj = {_id:ud.userId,Password:password.value};
        var js = JSON.stringify(obj);        
        try        
        {                
            const response = await fetch(buildPath('api/reset/confirm'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());  
        }
        catch(e)        
        {            
            alert(e.toString());                 
        }   
        // TO-DO add error handling.
        if(res != "Password updated successfully!")            
        {                
            alert(res);
            return;           
        }            
        else            
        {                                
            setState(1);                
            //window.location.href = '/pages/HomePageExtras/Home';            
        } 
    };

    const isValid = () =>
    {
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]){8,}/
        if(passwordRegex.test(password.value) == true)
        {
            return '';
        }
        return "Passwords must contain at least 8 characters and one of each of the following:\n-A lowercase letter\n-An uppercase letter\n-A number\n-A special character";
    };

    return (
        <Card>
            {
                state == 0
                ?
                <>
                    <Card.Title>
                        Change Password below!
                    </Card.Title>
                    <Form onSubmit={doReset}>
                        <Form.Group controlId="loginName">
                            <Form.Control type="password" placeholder="Enter New Password" ref={(c) => password = c} />
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Control type="password" placeholder="Confirm New Password" ref={(c) => cPassword = c}/>
                        </Form.Group>
                        <Button type="submit" controlId="loginButton" onClick={doReset}>Reset Password</Button>
                        <span id="loginResult">{message}</span>
                        <br />
                    </Form>
                </>
                :
                <Card.Title className="text-center">Password updated successfully!</Card.Title>
            }
        </Card >
    );
};
    
export default Reset;
