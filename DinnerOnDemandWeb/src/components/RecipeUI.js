import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

        // TO-DO: Get title from tittle array in search.
        var obj = {UserId:userId,Recipe:recipe.value};        
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
         
        var obj = {Ingredients:search.value};        
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
            else if (txt.error === 'zero or negative limit') {
                setRecipeList('The number of results requested is not valid');
            }

            else {
                var recipes = txt.obj; 
                
                var recipeIds = [];
                var recipeTitles = [];
                var recipeImage = [];
                
                for( var i=0; i<recipes.length; i++ )            
                {    
                    recipeIds.push(txt.obj[i].id);

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
        <Card id="accessUIDiv">
            <br/>
            <Form>
                <Form.Group controlId="searchText">
                    <Form.Control type="text" placeholder="What Recipe Are We Looking For..."
                        ref={(c) => search = c}/>
                </Form.Group>
                <Button type="button" controlI="searchRecipeButton" className="buttons"
                    onClick={searchRecipe}>
                        Search Recipe
                </Button>
                <span id="recipeSearchResult">{searchResults}</span>
            </Form>
            <Form>
                <Card.Text controlId="recipeList">
                    {recipeList}
                </Card.Text>
                <Form.Group controlId="recipeText">
                    <Form.Control type="text" placeholder="Recipe"
                        ref={(c) => recipe = c} />
                </Form.Group>
                <Button type="button" controlI="addRecipeButton" className="buttons"
                    onClick={addRecipe}>
                    Add Recipe
                </Button>
                <span id="recipeAddResult">{message}</span>
            </Form>
        </Card>
        
    );
}
export default RecipeUI;