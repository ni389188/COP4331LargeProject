import React, { useState } from 'react';

function RecipeUI() {

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

    var recipe = '';    
    var search = '';    
    
    const [message,setMessage] = useState('');    
    const [searchResults,setResults] = useState('');    
    const [recipeList,setRecipeList] = useState('');

//**************************************************************************************** 
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var userId = ud.id;    
    var firstName = ud.firstName;    
    var lastName = ud.lastName;    
    
    const addRecipe = async event =>     
    {    
        event.preventDefault();        
        
        var obj = {userId:userId,recipe:recipe.value};        
        var js = JSON.stringify(obj);        
        
        try        
        {            
            const response = await fetch(buildPath('api/addrecipe'),            
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});            
            
            var txt = await response.text();            
            var res = JSON.parse(txt);            
            
            if( res.error.length > 0 )            
            {                
                setMessage( "API Error:" + res.error );            
            }            
            else            
            {                
                setMessage('Recipe has been added');            
            }        
        }
        catch(e)        
        {            
            setMessage(e.toString());        
        }
    };    
    const searchRecipe = async event =>     
    {        
        event.preventDefault();        
        var obj = {userId:userId,search:search.value};        
        var js = JSON.stringify(obj);        
        try        
        {            
            const response = await fetch(buildPath('api/searchrecipe'),            
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});            
            var txt = await response.text();            
            var res = JSON.parse(txt);            
            var _results = res.results;            
            var resultText = '';            
            for( var i=0; i<_results.length; i++ )            
            {                
                resultText += _results[i];                
                if( i < _results.length - 1 )                
                {                    
                    resultText += ', ';                
                }            
            }            
            setResults('Recipe(s) have been retrieved');            
            setRecipeList(resultText);        
        }        
        catch(e)        
        {            
            alert(e.toString());            
            setResults(e.toString());        
        }    
    };
//*******************************************************************************************
    return (
    <div id="accessUIDiv">  
        <br />  
        <input type="text" id="searchText" placeholder="What Recipe are we looking for ..."     
            ref={(c) => search = c} />  
        <button type="button" id="searchRecipeButton" class="buttons"     
            onClick={searchRecipe}> Search Recipe</button><br />
        <span id="recipeSearchResult">{searchResults}</span>  
        <p id="recipeList">{recipeList}</p><br /><br />  
        <input type="text" id="recipeText" placeholder="Recipe To Add"     
            ref={(c) => recipe = c} />  
        <button type="button" id="addRecipeButton" class="buttons"     
            onClick={addRecipe}> Add Recipe </button><br />  
        <span id="recipeAddResult">{message}</span>
    </div>
    );
}
export default RecipeUI;