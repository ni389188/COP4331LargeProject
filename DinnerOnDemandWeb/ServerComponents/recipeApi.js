
const express = require('express');

const axios = require('axios');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')

const Recipe = require('./models/recipe.model');

// Search recipes by ingredients using Spoonacular.
exports.setAppRecipe = function (app, MongoClient)
{
        app.post('/api/searchrecipe', async (req, res, next) =>
    {   

        var ingredientList = req.body.ingredients;

        var apiKey = '7bfd691826fd4d31834f7728f67c9b3e'
        
        var limit = '7';

        var toInt = parseInt(req.body.limit);

        if (! isNaN(toInt)) {
            limit = toInt;
        }
        
        // Limit is biggerthan '20'
        if ( toInt > 20){limit = '20'}

        // Limit is 0 or smaller
        if ( toInt < 1) {res.status(400).json({found:false, error:'zero or negative limit'});}
        
        // String for request with parameters.
        var request = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&apiKey=${apiKey}&number=${limit}`

        // Get response from request.
        const response = await axios.get(request);

        // Get only the data from response.
        var data = response.data;

        // If no recipes were found.
        if (data.length < 1) {res.status(404).json({found:false, error: 'no matches'});}

        else {
            var obj = [];
            
            // Add data to obj.
            for (i = 0; i < data.length; i++)
            {

                var usedIngredients = [];
                var missedIngredients = [];

                for (k = 0; k < data[i].usedIngredients.length; k++) {
                    usedIngredients.push({
                    "id":data[i].usedIngredients[k].id,
                    "amount":data[i].usedIngredients[k].amount,
                    "unit":data[i].usedIngredients[k].unit,
                    "name:":data[i].usedIngredients[k].name,
                    "originalString":data[i].usedIngredients[k].originalString
                    });
                }

                for (k = 0; k < data[i].missedIngredients.length; k++) {
                    missedIngredients.push({
                    "id":data[i].missedIngredients[k].id,
                    "amount":data[i].missedIngredients[k].amount,
                    "unit":data[i].missedIngredients[k].unit,
                    "name:":data[i].missedIngredients[k].name,
                    "originalString":data[i].missedIngredients[k].originalString
                    });
                }

                obj.push({"id":data[i].id,
                "title":data[i].title,
                "image":data[i].image,
                "usedIngredients":usedIngredients,
                "missedIngredients":missedIngredients,

                });
            }

            res.status(200).json({found:true, error:'none', obj: obj});
        }
    });

    // Add a recipe to an user. Recipe ID is obtained from recipe search.
    app.post('/api/addrecipe', async (req, res, next) =>
    {   

        // recipeID is an int.
        if (Number.isInteger(req.body.recipeID)) {

            // Convert Int to String.
            var intRecipeID = String(req.body.recipeID);

            // Create new Recipe using the recipe model.
            const newRecipe = new Recipe({ 
                CompositeID: req.body.userID + intRecipeID,
                UserID: req.body.userID,
                RecipeID: req.body.recipeID,
                Title: req.body.title, 
            });
            
            // Stores into the DB.
            newRecipe.save().then(result => {
                
                // Success.
                res.status(200).json({
                    Added:true,
                    CompositeID: result.CompositeID,
                    UserID: result.UserID,
                    RecipeID: req.body.recipeID,
                    Title: result.Title
                });
            })
            // Catch Error.
            .catch(err => {
                // Display error.
                console.log(err);   

                // Respond with error.
                res.status(400).json(err);
    
            });
        }

        // ID is not an INT.
        else {
            console.log('Not a valid ID.');

            res.status(400).json({Inserted:false, error:'Not a valid ID value'});
        }
    });

    // Gets recipes the user has added.
    app.post('/api/getrecipes', async (req, res, next) => 
    {   

        if (null == req.body.userID) {
            res.status(400).json({found:false, errors:'userID required'});
        }

        else {
            var UserID = req.body.userID;

            // Stores into the DB.
            Recipe.find({UserID:UserID}).then(result => {
                
                if (result.length > 0) {
                    res.status(200).json({found:true, recipes: result});
                }
                else {
                    res.status(404).json({found:false, errors:'not found'});
                }
            })
            // Catch Error.
            .catch(err => {
                // Display error.
                console.log(err);   

                // Respond with error.
                res.status(400).json({found:false, err});
        
            });
        }
    });

}