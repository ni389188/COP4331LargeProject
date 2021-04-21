import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function LoggedInName()
{    
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    //var userId = ud.id;    
    var firstName = ud.firstName;    
    var lastName = ud.lastName;    
    
    const doLogout = event =>     
    {    
        event.preventDefault();        
        localStorage.removeItem("user_data")        
        window.location.href = '/';    
    };      
    return(   
        <Card controlID="loggedInDiv">
            <Card.Text controlID="userName">
                Logged In As {firstName} {lastName} 
            </Card.Text>
            <Button type="button" controlID="logoutButton" className="buttons"
                onClick={doLogout}>
                    Log Out
            </Button>
        </Card>
    );
};

export default LoggedInName;