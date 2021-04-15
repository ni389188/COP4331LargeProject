
const express = require('express');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')

const CustomRecipe = require('./models/customRecipe.model');

// Search recipes by ingredients using Spoonacular.
exports.setAppCustomRecipe = function (app, MongoClient)
{
    // User adds a custom Recipe to the DB.
    app.post('/api/addcustomrecipe', async (req, res, next) =>
    {   

        // Create new Recipe using the recipe model.
        const newCustomRecipe = new CustomRecipe({ 
            _id: new mongoose.Types.ObjectId(),
            UserID: req.body.userID,
            Title: req.body.title,
            Image: req.body.image,
            Ingredients: req.body.ingredients,
            Units: req.body.units,
            Instructions: req.body.instructions
        });
        
        // Stores into the DB.
        newCustomRecipe.save().then(result => {
            
            // Success.
            res.status(200).json({
                Added:true,
                recipeID: result._id,
                UserID: result.UserID,
                Title: result.Title,
                Image: result.Image,
                Ingredients: result.Ingredients,
                Units: result.Units,
                Instructions: result.Instructions
            });
        })
        // Catch Error.
        .catch(err => {
            // TO-DO: add error handling.
            // Display error.
            console.log(err);   

            // Respond with error.
            res.status(400).json(err);

        });
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