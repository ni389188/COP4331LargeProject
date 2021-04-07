const express = require('express');

const axios = require('axios');

const mongoose = require('mongoose');
require('../ServerComponents/dbConfig')

exports.setAppRecipe = function (app, MongoClient)
{
        app.get('/api/searchrecipe', async (req, res, next) =>
    {   
        var ingredientList = req.body.ingredients;

        var apiKey = '7bfd691826fd4d31834f7728f67c9b3e';

        // If a limit is not passed, then display 7
        var limit = '7' || req.body.limit;

        // Compare limit of results with 20 to avoid very large requests.
        var bigLimit = limit.localeCompare('20');

        // Compare limit of results with 1 to find if 0 or negative.
        var negativeLimit = limit.localeCompare('1');

        // Limit is biggerthan '20'
        if ( bigLimit === 1){limit = '20'}

        // Limit is 0 or smaller
        if ( negativeLimit == -1) {res.status(400).json({found:false, error:'zero or negative limit'});}
        
        // String for request with parameters.
        var request = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&apiKey=${apiKey}&number=${limit}`

        // Get response from request.
        const response = await axios.get(request);

        // Get only the data from response.
        var data = response.data;

        // If no recipes were found.
        if (data.length < 1) {res.status(404).json({found:false, error: 'no matches'});}

        var obj = [];

        // Add data to obj.
        for (i = 0; i < data.length; i++)
        {
            obj.push({"title":data[i].title, "image":data[i].image});
        }

        res.status(200).json({found:true, error:'none', obj: obj});
    });

}