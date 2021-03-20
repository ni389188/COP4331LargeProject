import React from 'react';

function RecipeUI() {
    const addRecipe = async event => {
        event.preventDefault();
        alert('addRecipe()');
    };

    const searchRecipe = async event => {
        event.preventDefault();
        alert('searchRecipe');
    };

    return (
        <div id="accessUIDiv"><br />
            <input type="text" id="searchText" placeholder="What Recipe are we looking for ..." />
            <button type="button" id="searchRecipeButton" class="buttons" onClick={searchRecipe}>
                Search Recipe
            </button><br />
            <span id="recipeSearchResult" />
            <p id="recipeList" /><br /><br />
            <input type="text" id="recipeText" placeholder="Recipe To Add" />
            <button type="button" id="addRecipeButton" class="buttons" onClick={addRecipe}>
                Add Recipe
            </button><br />
            <span id="recipeAddResult" />
        </div>);
}
export default RecipeUI;