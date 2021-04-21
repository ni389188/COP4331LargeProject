import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Verify()
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

    var loginName;    
    var verifyCode;    
    const [message,setMessage] = useState('');  

    const doVerify = async event =>     
    {        
        event.preventDefault();
        var obj = {email:loginName.value,VerificationCode:verifyCode.value};        
        var js = JSON.stringify(obj);        
        
        try        
        {                
            const response = await fetch(buildPath('api/verify'),                
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        var res = JSON.parse(await response.text());        
        
        // TO-DO add error handling.
        if(res.IsVerified === false)            
        {                
            setMessage('Verification failed');            
        }            
        else            
        {                
            var user = {firstName:res.FirstName,lastName:res.LastName,id:res.ID}                
            localStorage.setItem('user_data', JSON.stringify(user));                
            setMessage('');                
            window.location.href = '/pages/HomePageExtras/Home';            
        } 
        

    }        
    catch(e)        
    {            
        alert(e.toString());            
        return;        
    }        
};

    return (
        <Card>
            <Card.Title>
                Verify Account below!
            </Card.Title>
            <Form onSubmit={doVerify}>
                <Form.Group controlId="loginName">
                    <Form.Control type="email" placeholder="Enter Email" ref={(c) => loginName = c} />
                </Form.Group>
                <Form.Group controlId="verifyCode">
                    <Form.Control type="password" placeholder="Enter Verification Code" ref={(c) => verifyCode = c}/>
                </Form.Group>
                <Button type="submit" controlId="loginButton" onClick={doVerify}>Verify</Button>
                <span id="loginResult">{message}</span>
                <br />
                <a href="../pages/RegisterPage">Need to Register? Click Here</a>
            </Form>
        </Card >
    );
};
    
export default Verify;