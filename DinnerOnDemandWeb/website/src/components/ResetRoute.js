import React from 'react';
import { useParams } from "react-router-dom";

const ResetRoute = () =>
{    
    var match = useParams();
    const app_name = 'cop4331din';
    const doReset = async event =>
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
        var js = JSON.stringify({Token:match.token});
        try        
        {                
            const response = await fetch(buildPath('api/reset'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if(res == "success")
            {
                window.location.href = '../../pages/PWresetPage/'+match.token;
            }
            else
            {
                window.location.href = '../..';
            }
        }
        catch(e)        
        {        
            // Removed alert due to project requirements.    
            console.log(e.toString());                 
        }
    }
    doReset()
    return null;
};

export default ResetRoute;