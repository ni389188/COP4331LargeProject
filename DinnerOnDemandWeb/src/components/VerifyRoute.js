import React from 'react';
import { useParams } from "react-router-dom";

const VerifyRoute = () =>
{    
    var match = useParams();
    const app_name = 'cop4331din';
    const doVerify = async event =>
    {
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
        var js = JSON.stringify({Token:match.token, VerificationCode:match.verificationCode});
        try        
        {                
            const response = await fetch(buildPath('api/verify'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res == "success")
            {
                window.location.href = '../../pages/VerifyPage';
            }
            else
            {
                window.location.href = '../..';
            }
        }
        catch(e)        
        {            
            alert(e.toString());                 
        }
    }
    doVerify()
    return null;
};

export default VerifyRoute;