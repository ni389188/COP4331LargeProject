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
        var obj = {ingredients:search.value};        
        var js = JSON.stringify(obj);        
        try        
        {            
            const response = await fetch(buildPath('api/searchrecipe'),            
            {method:'POST',body:js, headers:{'Content-Type': 'application/json'}});            

            var txt = JSON.parse(await response.text()); 
            
            // Added Error handling for no matches.
            if (txt.error === 'no matches') {
                setRecipeList('Could not find a match');
            }
            else if (txt.error == 'zero or negative limit') {
                setRecipeList('The number of results requested is not valid');
            }

            else {
                var recipes = txt.obj; 
                        
                var recipeTitles = [];
                var recipeImage = [];          
                for( var i=0; i<recipes.length; i++ )            
                {    
                    recipeTitles.push(txt.obj[i].title);            
                    
                    recipeImage.push(txt.obj[i].image);
                }   

                setResults('Recipe(s) have been retrieved'); 
                
                // '\r' adds comma. Remove if needed.
                setRecipeList(recipeTitles + '\r');   
            }     
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