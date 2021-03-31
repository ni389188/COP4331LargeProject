import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

function Login()
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
    var loginPassword;    
    const [message,setMessage] = useState('');  

    const doLogin = async event =>     
    {        
        event.preventDefault();        
        var obj = {login:loginName.value,password:loginPassword.value};        
        var js = JSON.stringify(obj);        
        
        try        
        {                
            const response = await fetch(buildPath('api/login'),                
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        var res = JSON.parse(await response.text());            
        if( res.id <= 0 )            
        {                
            setMessage('User/Password combination incorrect');            
        }            
        else            
        {                
            var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}                
            localStorage.setItem('user_data', JSON.stringify(user));                
            setMessage('');                
            window.location.href = '/COP4331LargeProject';            
        }        
    }        
    catch(e)        
    {            
        alert(e.toString());            
        return;        
    }        
};

    return (
        <CardDeck>
            <Card>
                <Card.Body>
                    <div id="loginDiv">
                        <form onSubmit={doLogin}>
                            <Card.Title>
                                <span id="inner-title">Welcome Back. Log In Below!</span><br />
                            </Card.Title>
                            <Card.Text>
                                <input type="text" id="loginName" placeholder="Email/Username" ref={(c) => loginName = c} /><br />
                                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                                <input type="submit" id="loginButton" class="buttons" value="Log In" onClick={doLogin} /><br />
                            </Card.Text>
                        </form>
                        <span id="loginResult">{message}</span>
                    </div>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <div id="registerDiv">
                        <form onSubmit={doLogin}>
                            <Card.Title>
                                <span id="inner-title">Need to Register? Sign Up Below!</span><br />
                            </Card.Title>
                            <Card.Text>
                                <input type="text" id="firstName" placeholder="First Name" ref={(c) => loginName = c} /><br />
                                <input type="text" id="lastName" placeholder="Last Name" ref={(c) => loginName = c} /><br />
                                <input type="text" id="loginName" placeholder="Email/Username" ref={(c) => loginName = c} /><br />
                                <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                                <input type="submit" id="loginButton" class="buttons" value="Register" onClick={doLogin} /><br />
                            </Card.Text>
                        </form>
                        <span id="registerResult">{message}</span>
                    </div>
                </Card.Body>
            </Card>
        </CardDeck>
    );
};
    
export default Login;
