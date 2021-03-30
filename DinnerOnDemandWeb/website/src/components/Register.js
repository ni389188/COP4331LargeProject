import React, { useState } from 'react';

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
        if (password.value != confirmPassword.value)
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
                if (res.errors.Email.name == 'ValidatorError') {
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
        <div id="registerDiv">        
            <form onSubmit={doRegister}>        
            <span id="inner-title">PLEASE LOG IN</span><br />        
            <input type="text" id="firstName" placeholder="First Name"   ref={(c) => firstName = c} />  
            <input type="text" id="lastName" placeholder="Last Name"   ref={(c) => lastName = c} />  
            <input type="text" id="email" placeholder="Email"   ref={(c) => email = c} />  
            <input type="password" id="Password" placeholder="Password"   ref={(c) => password = c} /> 
            <input type="password" id="confirmPassword" placeholder="Re-Enter Your Password"   ref={(c) => confirmPassword = c} />         
            <input type="submit" id="RegisterButton" class="buttons" value = "Register"          
                onClick={doRegister} />        
            </form>        
            <span id="RegisterResult">{message}</span>   
        </div>    
    );
};
    
export default Register;
